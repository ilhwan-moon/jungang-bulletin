/**
 * LA 중앙교회 모바일 주보 — Google Apps Script 백엔드
 *
 * 하는 일
 *  1) 매주 토·일요일 (LA 시간) 매시간 구글 드라이브 주보 폴더를 확인합니다.
 *  2) 새로 올라온/수정된 주보 파일(PDF, 이미지, 구글문서, Word)의 글자를 읽어
 *     설교 제목·본문·찬양·암송·소식·일정·봉사·기도제목을 자동으로 찾아냅니다.
 *  3) 결과를 구글 시트(주차별 탭)에 정리합니다. → 사무실에서 틀린 부분만 고치면 됩니다.
 *  4) 웹앱(doGet)으로 JSON을 공개하여 모바일 주보 페이지가 읽어 갑니다.
 *
 * 처음 한 번: setup() 실행 → 권한 허용 → [배포 > 새 배포 > 웹 앱] (실행: 나, 액세스: 모든 사용자)
 */

const CONFIG = {
  FOLDER_ID: '19HEEkhf4BLC8tjOvx7Lg3dJsVbKHyFn9', // 주보 폴더
  START_DATE: '2026-11-08',                       // 이 날짜(주일)부터 표시
  TIMEZONE: 'America/Los_Angeles',
  CHURCH_NAME: { ko: 'LA 중앙교회', en: 'LA Central Church', es: 'LA Central Church' },
  SHARE_FILES_PUBLICLY: true, // 원본 주보 파일을 "링크가 있는 모든 사용자 보기"로 공유 (원본 보기 버튼용)
  CHECK_DAYS: [6, 0],         // 확인 요일: 6=토, 0=일
  CACHE_SECONDS: 120,
};

const LANGS = ['ko', 'en', 'es'];
const LANG_COL = { ko: 3, en: 4, es: 5 }; // 시트 열: C=한국어, D=English, E=Español

// 시트 행 구성 (key, 사무실용 설명)
const FIELDS = [
  ['sermonTitle', '설교 제목'],
  ['scripture', '성경 본문 (예: 요한복음 3:16-18)'],
  ['scriptureText', '본문 말씀 (선택)'],
  ['preacher', '설교자'],
  ['hymns', '찬양/찬송 — 한 줄에 하나'],
  ['memoryVerseRef', '암송 구절 (장:절)'],
  ['memoryVerseText', '암송 말씀 내용'],
  ['announcements', '교회 소식 — 한 줄에 하나'],
  ['schedule', '일정 — "날짜 | 내용" 한 줄에 하나'],
  ['volunteers', '봉사 — "역할 | 이름" 한 줄에 하나'],
  ['prayer', '기도 제목 — 한 줄에 하나'],
  ['worshipOrder', '예배 순서 — "순서 | 내용 | 담당" 한 줄에 하나'],
  ['fileUrl', '원본 파일 링크 (자동)'],
  ['fileName', '원본 파일 이름 (자동)'],
  ['locked', '잠금 — Y 입력 시 자동 덮어쓰기 안 함'],
  ['raw', '주보 전체 글 (자동 추출)'],
];
const LIST_FIELDS = ['hymns', 'announcements', 'schedule', 'volunteers', 'prayer', 'worshipOrder'];

/* ======================================================================
 * 설치 / 트리거
 * ==================================================================== */

function setup() {
  getSpreadsheet_(); // 데이터 시트 생성
  ScriptApp.getProjectTriggers().forEach(t => {
    if (t.getHandlerFunction() === 'scheduledCheck') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('scheduledCheck').timeBased().everyHours(1).create();
  const result = checkForUpdates(true);
  Logger.log('설치 완료. 데이터 시트: ' + getSpreadsheet_().getUrl());
  Logger.log(JSON.stringify(result, null, 2));
}

/** 매시간 실행되지만, 토·일요일(LA 시간)에만 실제로 확인합니다. */
function scheduledCheck() {
  const day = Number(Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'u')) % 7; // 1=월..7=일 → 0=일
  if (CONFIG.CHECK_DAYS.indexOf(day) === -1) return;
  checkForUpdates(false);
}

/** 지금 바로 확인 (수동 실행용) */
function checkNow() { return checkForUpdates(false); }

/** 전체 다시 읽기 (잠금되지 않은 칸은 다시 채워짐) */
function reprocessAll() { return checkForUpdates(true); }

/* ======================================================================
 * 폴더 확인 → 추출 → 시트 기록
 * ==================================================================== */

function checkForUpdates(force) {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(30000)) return { skipped: 'busy' };
  const props = PropertiesService.getScriptProperties();
  const report = { processed: [], skipped: 0, errors: [] };
  try {
    const files = listFilesRecursive_(DriveApp.getFolderById(CONFIG.FOLDER_ID), '');
    files.forEach(item => {
      const f = item.file;
      const key = 'f_' + f.getId();
      const stamp = f.getLastUpdated().toISOString();
      if (!force && props.getProperty(key) === stamp) { report.skipped++; return; }
      try {
        const week = detectWeek_(f.getName() + ' ' + item.path, f.getDateCreated());
        if (!week || week < CONFIG.START_DATE) { props.setProperty(key, stamp); report.skipped++; return; }
        const hintLang = detectLangFromName_(f.getName() + ' ' + item.path);
        const text = extractText_(f, hintLang);
        if (!text || text.trim().length < 10) { report.errors.push(f.getName() + ': 글자를 읽지 못함'); return; }
        const lang = hintLang || detectLangFromText_(text);
        const parsed = parseBulletin(text, lang);
        if (CONFIG.SHARE_FILES_PUBLICLY) {
          try { f.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) { /* 도메인 정책상 불가할 수 있음 */ }
        }
        parsed.fileUrl = 'https://drive.google.com/file/d/' + f.getId() + '/view';
        parsed.fileName = f.getName();
        writeWeek_(week, lang, parsed);
        props.setProperty(key, stamp);
        report.processed.push({ file: f.getName(), week: week, lang: lang });
      } catch (e) {
        report.errors.push(f.getName() + ': ' + e.message);
      }
    });
    if (report.processed.length) {
      props.setProperty('lastUpdated', new Date().toISOString());
      CacheService.getScriptCache().removeAll(['weeks', 'latest']);
    }
    props.setProperty('lastChecked', new Date().toISOString());
  } finally {
    lock.releaseLock();
  }
  return report;
}

function listFilesRecursive_(folder, path) {
  const out = [];
  const it = folder.getFiles();
  while (it.hasNext()) {
    const f = it.next();
    const mt = f.getMimeType();
    if (/pdf|image\/|google-apps\.document|wordprocessingml|msword|google-apps\.presentation|text\/plain/.test(mt)) {
      out.push({ file: f, path: path });
    }
  }
  const sub = folder.getFolders();
  while (sub.hasNext()) {
    const s = sub.next();
    Array.prototype.push.apply(out, listFilesRecursive_(s, path + ' ' + s.getName()));
  }
  return out;
}

function extractText_(file, hintLang) {
  const mt = file.getMimeType();
  if (mt === MimeType.GOOGLE_DOCS) return DocumentApp.openById(file.getId()).getBody().getText();
  if (mt === MimeType.GOOGLE_SLIDES) return slidesText_(file.getId());
  if (mt === MimeType.PLAIN_TEXT) return file.getBlob().getDataAsString('UTF-8');
  // PDF · 이미지 · Word → 구글 문서로 임시 변환(OCR) 후 글자 추출
  const copy = Drive.Files.copy(
    { name: '__tmp_ocr_' + file.getName(), mimeType: MimeType.GOOGLE_DOCS },
    file.getId(),
    { ocrLanguage: hintLang || 'ko' }
  );
  try {
    return DocumentApp.openById(copy.id).getBody().getText();
  } finally {
    try { DriveApp.getFileById(copy.id).setTrashed(true); } catch (e) {}
  }
}

function slidesText_(id) {
  const lines = [];
  SlidesApp.openById(id).getSlides().forEach(slide => {
    slide.getShapes().forEach(sh => {
      try { lines.push(sh.getText().asString()); } catch (e) {}
    });
    slide.getTables().forEach(tb => {
      for (let r = 0; r < tb.getNumRows(); r++) {
        const cells = [];
        for (let c = 0; c < tb.getNumColumns(); c++) {
          try { cells.push(tb.getCell(r, c).getText().asString().trim()); } catch (e) {}
        }
        lines.push(cells.join(' | '));
      }
    });
  });
  return lines.join('\n');
}

/* ======================================================================
 * 시트
 * ==================================================================== */

function getSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('sheetId');
  if (id) { try { return SpreadsheetApp.openById(id); } catch (e) {} }
  const ss = SpreadsheetApp.create('LA중앙교회 모바일주보 데이터');
  const guide = ss.getSheets()[0];
  guide.setName('사용법');
  guide.getRange(1, 1, 8, 1).setValues([
    ['■ 모바일 주보 데이터 시트'],
    ['주차마다 탭(예: 2026-11-08)이 자동으로 생깁니다.'],
    ['C열=한국어, D열=English, E열=Español 내용이 모바일 주보에 그대로 표시됩니다.'],
    ['자동 추출이 틀린 곳은 이 칸에서 바로 고치세요. 약 2분 안에 반영됩니다.'],
    ['고친 뒤 원본 파일이 다시 올라와도 덮어쓰지 않으려면 "잠금" 행에 Y 를 입력하세요.'],
    ['여러 항목은 한 줄에 하나씩 (칸 안에서 줄바꿈: Ctrl+Enter / ⌘+Enter).'],
    ['일정은 "11/15(일) | 추수감사주일", 봉사는 "안내 | 김OO, 이OO" 처럼 | 로 구분합니다.'],
    ['탭을 삭제하면 그 주는 표시되지 않습니다.'],
  ]);
  guide.setColumnWidth(1, 700);
  guide.getRange(1, 1).setFontWeight('bold').setFontSize(14);
  props.setProperty('sheetId', ss.getId());
  try { DriveApp.getFileById(ss.getId()).moveTo(DriveApp.getFolderById(CONFIG.FOLDER_ID)); } catch (e) {}
  return ss;
}

function getWeekSheet_(week) {
  const ss = getSpreadsheet_();
  let sh = ss.getSheetByName(week);
  if (!sh) {
    sh = ss.insertSheet(week);
    const rows = [['key', '항목', '한국어', 'English', 'Español']]
      .concat(FIELDS.map(f => [f[0], f[1], '', '', '']));
    sh.getRange(1, 1, rows.length, 5).setValues(rows);
    sh.getRange(1, 1, 1, 5).setFontWeight('bold').setBackground('#e8eef7');
    sh.hideColumns(1);
    sh.setColumnWidth(2, 210);
    [3, 4, 5].forEach(c => sh.setColumnWidth(c, 380));
    sh.getRange(2, 3, FIELDS.length, 3).setWrap(true).setVerticalAlignment('top');
    sh.setFrozenRows(1);
    // 최신 주가 앞으로 오도록 정렬
    const tabs = ss.getSheets().filter(s => /^\d{4}-\d{2}-\d{2}$/.test(s.getName()));
    const pos = tabs.map(s => s.getName()).sort().reverse().indexOf(week);
    ss.setActiveSheet(sh);
    ss.moveActiveSheet(2 + Math.max(0, pos));
  }
  return sh;
}

function writeWeek_(week, lang, parsed) {
  const sh = getWeekSheet_(week);
  const col = LANG_COL[lang] || LANG_COL.ko;
  const data = sh.getRange(1, 1, sh.getLastRow(), 5).getValues();
  const rowOf = {};
  data.forEach((r, i) => { rowOf[r[0]] = i + 1; });
  const locked = String(data[rowOf.locked - 1][col - 1]).trim().toUpperCase() === 'Y';
  FIELDS.forEach(f => {
    const k = f[0];
    if (k === 'locked') return;
    if (locked && k !== 'raw' && k !== 'fileUrl' && k !== 'fileName') return;
    let v = parsed[k];
    if (Array.isArray(v)) v = v.join('\n');
    v = String(v == null ? '' : v);
    if (v.length > 45000) v = v.slice(0, 45000);
    sh.getRange(rowOf[k], col).setValue(v);
  });
}

/* ======================================================================
 * 웹앱 (JSON 공개)
 *   ?            → 최신 주보 + 주차 목록
 *   ?week=YYYY-MM-DD → 해당 주
 * ==================================================================== */

function doGet(e) {
  const week = (e && e.parameter && e.parameter.week) || '';
  const cache = CacheService.getScriptCache();
  const ck = week ? 'w_' + week : 'latest';
  let body = cache.get(ck);
  if (!body) {
    body = JSON.stringify(buildResponse_(week));
    if (body.length < 95000) cache.put(ck, body, CONFIG.CACHE_SECONDS);
  }
  const cb = e && e.parameter && e.parameter.callback;
  if (cb && /^[\w$.]+$/.test(cb)) {
    return ContentService.createTextOutput(cb + '(' + body + ')').setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(body).setMimeType(ContentService.MimeType.JSON);
}

function buildResponse_(week) {
  const ss = getSpreadsheet_();
  const weeks = ss.getSheets().map(s => s.getName())
    .filter(n => /^\d{4}-\d{2}-\d{2}$/.test(n) && n >= CONFIG.START_DATE)
    .sort().reverse();
  const props = PropertiesService.getScriptProperties();
  const target = week && weeks.indexOf(week) !== -1 ? week : weeks[0];
  return {
    church: CONFIG.CHURCH_NAME,
    weeks: weeks,
    lastUpdated: props.getProperty('lastUpdated'),
    lastChecked: props.getProperty('lastChecked'),
    bulletin: target ? readWeek_(ss.getSheetByName(target), target) : null,
  };
}

function readWeek_(sh, week) {
  const data = sh.getRange(1, 1, sh.getLastRow(), 5).getDisplayValues();
  const out = { date: week };
  LANGS.forEach(lang => {
    const col = LANG_COL[lang] - 1;
    const obj = {};
    let filled = false;
    data.slice(1).forEach(r => {
      const k = r[0];
      if (!k || k === 'locked') return;
      const v = String(r[col] || '').trim();
      if (v && k !== 'fileUrl' && k !== 'fileName' && k !== 'raw') filled = true;
      obj[k] = LIST_FIELDS.indexOf(k) !== -1 ? v.split(/\n+/).map(s => s.trim()).filter(Boolean) : v;
    });
    out[lang] = (filled || obj.raw) ? obj : null;
  });
  return out;
}

/* ======================================================================
 * 날짜 / 언어 감지
 * ==================================================================== */

function detectWeek_(name, created) {
  const s = String(name);
  let m, y, mo, d;
  if ((m = s.match(/(20\d{2})[.\-_\/\s년]*(\d{1,2})[.\-_\/\s월]*(\d{1,2})/))) { y = +m[1]; mo = +m[2]; d = +m[3]; }
  else if ((m = s.match(/(\d{1,2})[.\-_\/](\d{1,2})[.\-_\/](20\d{2}|\d{2})(?!\d)/))) { mo = +m[1]; d = +m[2]; y = +m[3] < 100 ? 2000 + +m[3] : +m[3]; }
  else if ((m = s.match(/(?:^|\D)(\d{2})(\d{2})(\d{2})(?!\d)/))) { y = 2000 + +m[1]; mo = +m[2]; d = +m[3]; }
  else if ((m = s.match(/(\d{1,2})\s*월\s*(\d{1,2})\s*일/))) { mo = +m[1]; d = +m[2]; }
  if (mo >= 1 && mo <= 12 && d >= 1 && d <= 31) {
    if (!y) {
      const now = new Date();
      y = now.getFullYear();
      if (mo === 1 && now.getMonth() === 11) y++;
    }
    return nextSunday_(new Date(Date.UTC(y, mo - 1, d)));
  }
  // 파일 이름에 날짜가 없으면: 만든 날짜(LA) 기준 다가오는 주일
  const local = Utilities.formatDate(created, CONFIG.TIMEZONE, 'yyyy-MM-dd').split('-').map(Number);
  return nextSunday_(new Date(Date.UTC(local[0], local[1] - 1, local[2])));
}

function nextSunday_(utcDate) {
  const add = (7 - utcDate.getUTCDay()) % 7;
  const t = new Date(utcDate.getTime() + add * 86400000);
  return t.toISOString().slice(0, 10);
}

function detectLangFromName_(name) {
  const s = ' ' + String(name).toLowerCase().replace(/[_\-.()\[\]]/g, ' ') + ' ';
  if (/(spanish|español|espanol|spa|esp|스페인|스페니쉬|스패니쉬|서반아| es )/.test(s)) return 'es';
  if (/(english|eng|영어|영문| en )/.test(s)) return 'en';
  if (/(korean|kor|한국어|한글|국문| ko | kr )/.test(s)) return 'ko';
  return '';
}

function detectLangFromText_(text) {
  const hangul = (text.match(/[가-힣]/g) || []).length;
  const latin = (text.match(/[a-zA-Z]/g) || []).length;
  if (hangul > latin * 0.3) return 'ko';
  const t = ' ' + text.toLowerCase() + ' ';
  const es = (t.match(/ (el|la|los|las|de|del|y|para|iglesia|domingo|señor|dios) /g) || []).length + (t.match(/[ñáéíóú¿¡]/g) || []).length;
  const en = (t.match(/ (the|and|of|for|church|sunday|lord|god|with|will) /g) || []).length;
  return es > en ? 'es' : 'en';
}

/* ======================================================================
 * 주보 글 분석 (언어 공통)
 * ==================================================================== */

const SECTION_KEYS = [
  ['memoryVerse', ['성구암송', '금주의 암송', '이번주 암송', '이번 주 암송', '암송 말씀', '암송구절', '암송', 'memory verse', 'verse of the week', 'scripture memory', 'memorize', 'versículo para memorizar', 'versiculo para memorizar', 'versículo de memoria', 'versículo de la semana', 'texto para memorizar', 'memorizar']],
  ['worshipOrder', ['예배순서', '예배 순서', '주일예배', '주일 예배', 'order of worship', 'order of service', 'worship order', 'worship service', 'orden del culto', 'orden de culto', 'orden de servicio', 'orden del servicio']],
  ['prayer', ['기도제목', '기도 제목', '중보기도', '함께 기도', 'prayer requests', 'prayer request', 'prayer list', 'pray for', 'peticiones de oración', 'peticiones de oracion', 'motivos de oración', 'motivos de oracion', 'oremos por']],
  ['volunteers', ['봉사자', '봉사 안내', '봉사안내', '이번주 봉사', '금주 봉사', '봉사', '섬기는 이', '섬기는 분', '섬김이', 'volunteers', 'volunteer', 'serving team', 'serving this week', 'ministry team', 'voluntarios', 'servidores', 'equipo de servicio']],
  ['schedule', ['교회 일정', '교회일정', '이번주 일정', '이번 주 일정', '금주 일정', '행사 일정', '일정', 'upcoming events', 'schedule', 'calendar', 'this week', 'events', 'calendario', 'próximos eventos', 'proximos eventos', 'eventos', 'horario', 'agenda']],
  ['announcements', ['교회소식', '교회 소식', '광고', '알림', '소식', 'announcements', 'announcement', 'church news', 'news', 'anuncios', 'avisos', 'noticias']],
  ['scripture', ['성경봉독', '성경 봉독', '성경말씀', '본문', 'scripture reading', 'scripture', 'bible reading', 'lectura bíblica', 'lectura biblica', 'texto bíblico', 'texto biblico', 'lectura']],
  ['sermon', ['설교', '말씀', 'sermon', 'message', 'sermón', 'predicación', 'predicacion', 'mensaje']],
  ['hymns', ['찬송', '찬양', 'hymns', 'hymn', 'songs', 'praise', 'himnos', 'himno', 'alabanzas', 'alabanza', 'cantos']],
];

const BOOKS_KO = '창세기|출애굽기|레위기|민수기|신명기|여호수아|사사기|룻기|사무엘상|사무엘하|열왕기상|열왕기하|역대상|역대하|에스라|느헤미야|에스더|욥기|시편|잠언|전도서|아가|이사야|예레미야애가|예레미야|에스겔|다니엘|호세아|요엘|아모스|오바댜|요나|미가|나훔|하박국|스바냐|학개|스가랴|말라기|마태복음|마가복음|누가복음|요한복음|사도행전|로마서|고린도전서|고린도후서|갈라디아서|에베소서|빌립보서|골로새서|데살로니가전서|데살로니가후서|디모데전서|디모데후서|디도서|빌레몬서|히브리서|야고보서|베드로전서|베드로후서|요한일서|요한이서|요한삼서|유다서|요한계시록';
const BOOKS_EN = 'Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|Samuel|Kings|Chronicles|Ezra|Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Song of Solomon|Song of Songs|Isaiah|Jeremiah|Lamentations|Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|Malachi|Matthew|Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|Colossians|Thessalonians|Timothy|Titus|Philemon|Hebrews|James|Peter|Jude|Revelation|Gen|Exod?|Lev|Num|Deut|Josh|Judg|Sam|Kgs|Chron|Neh|Esth|Ps|Psa|Prov|Eccl|Isa|Jer|Lam|Ezek|Dan|Hos|Obad|Mic|Hab|Zeph|Hag|Zech|Mal|Matt|Mt|Mk|Lk|Jn|Rom|Cor|Gal|Eph|Phil|Col|Thess|Tim|Phlm|Heb|Jas|Pet|Rev';
const BOOKS_ES = 'Génesis|Genesis|Éxodo|Exodo|Levítico|Levitico|Números|Numeros|Deuteronomio|Josué|Josue|Jueces|Rut|Samuel|Reyes|Crónicas|Cronicas|Esdras|Nehemías|Nehemias|Ester|Job|Salmos?|Proverbios|Eclesiastés|Eclesiastes|Cantares|Isaías|Isaias|Jeremías|Jeremias|Lamentaciones|Ezequiel|Daniel|Oseas|Joel|Amós|Amos|Abdías|Abdias|Jonás|Jonas|Miqueas|Nahúm|Nahum|Habacuc|Sofonías|Sofonias|Hageo|Zacarías|Zacarias|Malaquías|Malaquias|Mateo|Marcos|Lucas|Juan|Hechos|Romanos|Corintios|Gálatas|Galatas|Efesios|Filipenses|Colosenses|Tesalonicenses|Timoteo|Tito|Filemón|Filemon|Hebreos|Santiago|Pedro|Judas|Apocalipsis';

const VERSE_TAIL = '\\s*\\d{1,3}\\s*(?::|장|편|,)\\s*\\d{1,3}(?:\\s*절)?(?:\\s*[-~–—]\\s*(?:\\d{1,3}\\s*(?::|장)\\s*)?\\d{1,3}(?:\\s*절)?)?(?:\\s*[,;]\\s*\\d{1,3}(?:\\s*[-~–—]\\s*\\d{1,3})?)*';
const REF_RE = new RegExp(
  '(?:(?:' + BOOKS_KO + ')' + VERSE_TAIL + ')' +
  '|(?:(?<![A-Za-zÀ-ÿ])(?:(?:[1-3]|I{1,3})\\s*)?(?:' + BOOKS_EN + '|' + BOOKS_ES + ')\\.?' + VERSE_TAIL + ')',
  'i'
);
const REF_RE_G = new RegExp(REF_RE.source, 'gi');

const PREACHER_RE = /(목사|전도사|강도사|장로|선교사|pastor|rev\.?|reverend|elder|minister|pr\.|hno\.|hermano|obispo|evangelista)/i;
const LEADER_RE = /^(다같이|다 같이|일동|회중|성가대|찬양대|사회자|인도자|all|congregation|everyone|choir|todos|congregación|coro)$/i;
const BULLET_RE = /^\s*(?:\d{1,2}\s*[.)]|[①-⑳]|[•·\-\*▪■●◆◇▶▷☞✓✔○◎□❖➤►]|\(\d{1,2}\))\s*/;
const SPLIT_RE = /\s*(?:\.{2,}|·{2,}|…+|_{2,}|-{3,}|—{2,}|\t|\s{3,}|\s\|\s|\|)\s*/;
const DATE_START_RE = /^\s*((?:\d{1,2}\s*[\/.]\s*\d{1,2}(?:\s*[\/.]\s*\d{2,4})?|\d{1,2}\s*월\s*\d{1,2}\s*일|(?:jan|feb|mar|apr|may|jun|jul|aug|sep|sept|oct|nov|dec)[a-z]*\.?\s+\d{1,2}|\d{1,2}\s+de\s+[a-záéíóú]+)(?:\s*[(（][^)）]{1,6}[)）])?(?:\s*[-~–]\s*\d{1,2}(?:\s*[\/.]\s*\d{1,2})?(?:\s*[(（][^)）]{1,6}[)）])?)?(?:\s*(?:오전|오후|am|pm)?\s*\d{1,2}(?::\d{2})?\s*(?:am|pm|시)?)?)\s*[:：\-–]?\s*(.*)$/i;

function normalizeLine_(s) {
  return String(s).replace(/[ 　]/g, ' ').replace(/[ \t]+$/g, '').replace(/^\s+/, '');
}

const FILLER_RE = /^(?:\s*(?:순서|말씀|구절|안내|위원|일정|소식|제목|내용|성경|및|와|this week|of the week|verse|verses|schedule|news|list|team|requests?|de la semana|del culto|semanal)\s*)+$/i;

function headingOf_(line) {
  const clean = line.replace(/^[\s■●◆◇▶▷☞※★☆♣♠◎○□\[\]【】<>《》〈〉「」『』"“”'*#|\d.)]+/, '').trim();
  if (!clean) return null;
  const lower = clean.toLowerCase();
  for (let i = 0; i < SECTION_KEYS.length; i++) {
    const keys = SECTION_KEYS[i][1];
    for (let j = 0; j < keys.length; j++) {
      const k = keys[j];
      if (lower.indexOf(k) !== 0) continue;
      const rest = clean.slice(k.length);
      const sep = /^\s*[:：\-–—|\]】>》〉」』)]/.test(rest);
      // 제목 줄로 인정: 짧은 줄 + (뒤가 비었거나 / 구분기호 / 짧은 꼬리), 또는 "키워드:" 로 시작하는 줄
      const short = clean.length <= 40 && (/^\s*$/.test(rest) || sep || (rest.length < 12 && !/[가-힣a-z]{3,}\s+[가-힣a-z]{3,}/i.test(rest)));
      if (short || (sep && /^\s*[:：]/.test(rest))) {
        let remainder = rest.replace(/^\s*[:：\-–—|\]】>》〉」』)]+\s*/, '').trim();
        if (FILLER_RE.test(remainder)) remainder = '';
        return { section: SECTION_KEYS[i][0], rest: remainder };
      }
    }
  }
  return null;
}

function stripQuotes_(s) {
  return String(s).replace(/^[\s"“”'‘’「」『』《》<>«»]+|[\s"“”'‘’「」『』《》<>«»]+$/g, '').trim();
}

function itemsFrom_(lines) {
  const items = [];
  const hasBullets = lines.some(l => BULLET_RE.test(l));
  lines.forEach(l => {
    if (!l.trim()) return;
    if (!hasBullets || BULLET_RE.test(l) || !items.length) items.push(l.replace(BULLET_RE, '').trim());
    else items[items.length - 1] += ' ' + l.trim();
  });
  return items.filter(Boolean);
}

function isHymnLine_(l) {
  return /(찬송|찬양|hymn|himno|song|canto|alabanza|praise)/i.test(l) && /\d/.test(l);
}

function parseBulletin(text, lang) {
  const lines = String(text).split(/\r?\n/).map(normalizeLine_);
  const sections = {};
  let current = 'intro';
  sections[current] = [];
  lines.forEach(line => {
    if (!line.trim()) return;
    const h = headingOf_(line);
    if (h) {
      current = h.section;
      sections[current] = sections[current] || [];
      if (h.rest) sections[current].push(h.rest);
    } else {
      sections[current].push(line);
    }
  });

  const out = {
    sermonTitle: '', scripture: '', scriptureText: '', preacher: '', hymns: [],
    memoryVerseRef: '', memoryVerseText: '', announcements: [], schedule: [],
    volunteers: [], prayer: [], worshipOrder: [], raw: String(text).trim(),
  };

  // 예배 순서: "설교 ...... 제목 ...... 설교자"
  (sections.worshipOrder || []).forEach(l => {
    const parts = l.split(SPLIT_RE).map(s => s.trim()).filter(Boolean);
    out.worshipOrder.push(parts.join(' | '));
    const head = (parts[0] || '').toLowerCase();
    if (/^(설교|말씀|sermon|message|sermón|predicación|mensaje)/i.test(head)) {
      const rest = parts.slice(1);
      const ref = rest.join(' ').match(REF_RE);
      if (ref && !out.scripture) out.scripture = ref[0].trim();
      const t = rest.filter(p => !REF_RE.test(p) && !PREACHER_RE.test(p));
      if (t[0] && !out.sermonTitle) out.sermonTitle = stripQuotes_(t[0]);
      const p = rest.filter(x => PREACHER_RE.test(x));
      if (p[0] && !out.preacher) out.preacher = p[0];
    } else if (/^(본문|성경|scripture|bible|lectura|texto)/i.test(head)) {
      const ref = l.match(REF_RE);
      if (ref && !out.scripture) out.scripture = ref[0].trim();
    } else if (/^(찬송|찬양|hymn|song|praise|himno|canto|alabanza)/i.test(head)) {
      const h = parts.slice(1).filter(p => !LEADER_RE.test(p)).join(' ');
      if (h) out.hymns.push(h);
    }
  });

  // 설교 단락
  (sections.sermon || []).forEach(l => {
    const ref = l.match(REF_RE);
    if (ref && !out.scripture) out.scripture = ref[0].trim();
    const rest = l.replace(REF_RE, '').replace(/[()（）]/g, ' ').trim();
    if (PREACHER_RE.test(l) && rest.length < 30) { if (!out.preacher) out.preacher = rest; return; }
    if (rest && !out.sermonTitle && rest.length <= 80) out.sermonTitle = stripQuotes_(rest);
  });

  // 성경 본문 단락
  const scr = sections.scripture || [];
  if (scr.length) {
    const ref = scr.join(' ').match(REF_RE);
    if (ref && !out.scripture) out.scripture = ref[0].trim();
    const body = scr.join(' ').replace(REF_RE, '').trim();
    if (body.length > 15) out.scriptureText = body;
  }

  // 찬양
  (sections.hymns || []).forEach(l => out.hymns.push(l.replace(BULLET_RE, '').trim()));
  if (!out.hymns.length) lines.filter(isHymnLine_).slice(0, 6).forEach(l => out.hymns.push(l.split(SPLIT_RE).join(' ').trim()));
  out.hymns = out.hymns.filter((v, i, a) => v && a.indexOf(v) === i);

  // 암송
  const mv = (sections.memoryVerse || []).join(' ').trim();
  if (mv) {
    const ref = mv.match(REF_RE);
    out.memoryVerseRef = ref ? ref[0].trim() : '';
    out.memoryVerseText = stripQuotes_(mv.replace(REF_RE, '').replace(/[()（）\[\]]\s*[()（）\[\]]/g, '').trim());
  }

  out.announcements = itemsFrom_(sections.announcements || []);
  out.prayer = itemsFrom_(sections.prayer || []);

  out.schedule = (sections.schedule || []).map(l => {
    const s = l.replace(BULLET_RE, '').trim();
    const m = s.match(DATE_START_RE);
    return m && m[2] ? m[1].trim() + ' | ' + m[2].trim() : s;
  }).filter(Boolean);

  out.volunteers = (sections.volunteers || []).map(l => {
    const s = l.replace(BULLET_RE, '').trim();
    const m = s.match(/^([^:：|]{1,20})\s*[:：|]\s*(.+)$/);
    if (m) return m[1].trim() + ' | ' + m[2].trim();
    const parts = s.split(SPLIT_RE).filter(Boolean);
    return parts.length > 1 ? parts[0] + ' | ' + parts.slice(1).join(', ') : s;
  }).filter(Boolean);

  // 마지막 보정: 본문 구절이 없으면 전체에서 첫 성경 구절(암송 구절 제외)
  if (!out.scripture) {
    const all = String(text).match(REF_RE_G) || [];
    const cand = all.find(r => r.trim() !== out.memoryVerseRef);
    if (cand) out.scripture = cand.trim();
  }
  return out;
}

/* ======================================================================
 * 테스트용 (편집기에서 실행해 로그 확인)
 * ==================================================================== */
function testLatestFile() {
  const files = listFilesRecursive_(DriveApp.getFolderById(CONFIG.FOLDER_ID), '');
  files.sort((a, b) => b.file.getLastUpdated() - a.file.getLastUpdated());
  const f = files[0].file;
  const hint = detectLangFromName_(f.getName());
  const text = extractText_(f, hint);
  Logger.log('파일: ' + f.getName() + ' / 주일: ' + detectWeek_(f.getName(), f.getDateCreated()) + ' / 언어: ' + (hint || detectLangFromText_(text)));
  Logger.log(JSON.stringify(parseBulletin(text, hint), null, 2));
}
