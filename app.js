(function () {
  'use strict';
  var CFG = window.BULLETIN_CONFIG || {};
  var LANGS = ['ko', 'en', 'es'];
  var LANG_NAME = { ko: '한국어', en: 'English', es: 'Español' };

  var T = {
    ko: {
      bulletin: '주일 모바일 주보', textSize: '큰 글씨', textSizeN: ['보통 글씨', '큰 글씨', '아주 큰 글씨'],
      prev: '지난주', next: '다음주', latest: '최신 주보', thisWeek: '이번 주일',
      sermon: '주일 말씀', scripture: '본문', preacher: '설교', hymns: '찬양', order: '예배 순서 전체 보기',
      memory: '이번 주 암송 말씀', practice: '암송 연습', practiceHint: '가려진 단어를 눌러서 확인해 보세요.',
      news: '교회 소식', schedule: '일정', serve: '봉사 안내', prayer: '기도 제목', original: '원본 주보',
      openOriginal: '{lang} 원본 보기', rawText: '주보 전체 글 보기', findName: '내 이름 찾기', findPh: '이름으로 찾기 (예: 김영희)',
      share: '공유하기', qr: 'QR 코드', qrTitle: '휴대폰 카메라로 찍으면 주보가 열립니다', close: '닫기', toTop: '맨 위로',
      copied: '링크를 복사했습니다', updated: '마지막 업데이트', checked: '마지막 확인',
      nav: { sermon: '말씀', memory: '암송', readings: '묵상', news: '소식', schedule: '일정', serve: '봉사', prayer: '기도' },
      none: '이번 주에는 내용이 없습니다.', noBulletin: '이번 주 주보가 아직 올라오지 않았습니다. 토요일·주일에 자동으로 업데이트됩니다.',
      fallback: '{lang} 주보가 아직 없어 {other}(으)로 보여 드립니다.', demo: '예시 화면입니다. 실제 주보가 연결되면 자동으로 바뀝니다.',
      offline: '인터넷 연결이 없어 저장된 주보를 보여 드립니다.', loading: '불러오는 중…', noName: '찾는 이름이 없습니다.',
      fromLang: '({lang})', sundayFmt: '{date} 주일',
      location: '장소', serviceTimes: '예배 시간', fellowship: '예배 후 교제', memoryNext: '다음 주 암송 미리 보기', readings: '이번 주 묵상 말씀',
      meetings: '정기 모임', thisWeekServe: '이번 주', nextWeekServe: '다음 주', today: '오늘',
    },
    en: {
      bulletin: 'Sunday Mobile Bulletin', textSize: 'Large text', textSizeN: ['Normal text', 'Large text', 'Extra large'],
      prev: 'Prev', next: 'Next', latest: 'Latest bulletin', thisWeek: 'This Sunday',
      sermon: "Sunday Message", scripture: 'Scripture', preacher: 'Speaker', hymns: 'Hymns & Songs', order: 'Full order of worship',
      memory: 'Memory Verse of the Week', practice: 'Practice', practiceHint: 'Tap a hidden word to reveal it.',
      news: 'Announcements', schedule: 'Schedule', serve: 'Volunteers', prayer: 'Prayer Requests', original: 'Original Bulletin',
      openOriginal: 'Open {lang} original', rawText: 'Show full bulletin text', findName: 'Find my name', findPh: 'Search by name',
      share: 'Share', qr: 'QR code', qrTitle: 'Scan with your phone camera to open', close: 'Close', toTop: 'Top',
      copied: 'Link copied', updated: 'Last updated', checked: 'Last checked',
      nav: { sermon: 'Message', memory: 'Memory', readings: 'Reading', news: 'News', schedule: 'Schedule', serve: 'Serve', prayer: 'Prayer' },
      none: 'Nothing this week.', noBulletin: "This week's bulletin isn't posted yet. It updates automatically on Saturday and Sunday.",
      fallback: 'No {lang} bulletin yet — showing {other}.', demo: 'Sample preview. It will switch to the real bulletin once connected.',
      offline: "You're offline — showing the saved bulletin.", loading: 'Loading…', noName: 'No matching name.',
      fromLang: '({lang})', sundayFmt: '{date}',
      location: 'Location', serviceTimes: 'Service times', fellowship: 'After service', memoryNext: 'Preview next week’s verse', readings: 'This Week’s Meditation Chapters',
      meetings: 'Regular meetings', thisWeekServe: 'This week', nextWeekServe: 'Next week', today: 'Today',
    },
    es: {
      bulletin: 'Boletín Dominical Móvil', textSize: 'Letra grande', textSizeN: ['Letra normal', 'Letra grande', 'Letra muy grande'],
      prev: 'Anterior', next: 'Siguiente', latest: 'Boletín más reciente', thisWeek: 'Este domingo',
      sermon: 'Mensaje Dominical', scripture: 'Texto', preacher: 'Predicador', hymns: 'Himnos y alabanzas', order: 'Orden del culto completo',
      memory: 'Versículo para memorizar', practice: 'Practicar', practiceHint: 'Toca una palabra oculta para verla.',
      news: 'Anuncios', schedule: 'Calendario', serve: 'Voluntarios', prayer: 'Peticiones de oración', original: 'Boletín original',
      openOriginal: 'Ver original en {lang}', rawText: 'Ver todo el texto del boletín', findName: 'Buscar mi nombre', findPh: 'Buscar por nombre',
      share: 'Compartir', qr: 'Código QR', qrTitle: 'Escanea con la cámara del teléfono', close: 'Cerrar', toTop: 'Arriba',
      copied: 'Enlace copiado', updated: 'Última actualización', checked: 'Última revisión',
      nav: { sermon: 'Mensaje', memory: 'Memorizar', readings: 'Lectura', news: 'Anuncios', schedule: 'Calendario', serve: 'Servir', prayer: 'Oración' },
      none: 'Nada esta semana.', noBulletin: 'El boletín de esta semana aún no está publicado. Se actualiza automáticamente sábado y domingo.',
      fallback: 'Aún no hay boletín en {lang}; se muestra en {other}.', demo: 'Vista de ejemplo. Cambiará al boletín real cuando esté conectado.',
      offline: 'Sin conexión: se muestra el boletín guardado.', loading: 'Cargando…', noName: 'No se encontró el nombre.',
      fromLang: '({lang})', sundayFmt: '{date}',
      location: 'Lugar', serviceTimes: 'Horario', fellowship: 'Después del culto', memoryNext: 'Ver versículo de la próxima semana', readings: 'Lectura de la semana',
      meetings: 'Reuniones regulares', thisWeekServe: 'Esta semana', nextWeekServe: 'Próxima semana', today: 'Hoy',
    },
  };

  var ICONS = {
    bible: '<svg viewBox="0 0 24 24"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 0 6.5 21H20v-3"/><path d="M12 7v6M9.5 9.5h5"/></svg>',
    music: '<svg viewBox="0 0 24 24"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>',
    heart: '<svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.5-9.3C1 8 3.3 4.5 6.9 4.5c2 0 3.6 1.1 5.1 3 1.5-1.9 3.1-3 5.1-3 3.6 0 5.9 3.5 4.4 7.2C19.5 16.4 12 21 12 21z"/></svg>',
    bell: '<svg viewBox="0 0 24 24"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/></svg>',
    calendar: '<svg viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M16 2.5v4M8 2.5v4M3 10h18"/></svg>',
    hands: '<svg viewBox="0 0 24 24"><path d="M12 21c-3-2-8-5.5-8-10a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 4.5-5 8-8 10z"/><path d="M8.5 12.5h7M12 9v7"/></svg>',
    pray: '<svg viewBox="0 0 24 24"><path d="M12 3v7l-4 5v6M12 10l4 5v6"/><path d="M8 15l-3 2M16 15l3 2"/></svg>',
    file: '<svg viewBox="0 0 24 24"><path d="M14 3H6.5A2.5 2.5 0 0 0 4 5.5v13A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></svg>',
    share: '<svg viewBox="0 0 24 24"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/></svg>',
    qr: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM20 14v.01M14 20h.01M17 20h4v-3"/></svg>',
    clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M2 5.5c3-1.5 7-1.5 10 1 3-2.5 7-2.5 10-1V19c-3-1.5-7-1.5-10 1-3-2.5-7-2.5-10-1z"/><path d="M12 6.5V20"/></svg>',
    up: '<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    ext: '<svg viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-9 9M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/></svg>',
  };

  var NAV = [
    ['sermon', 'sec-sermon', 'bible'], ['memory', 'sec-memory', 'heart'], ['readings', 'sec-readings', 'book'], ['news', 'sec-news', 'bell'],
    ['schedule', 'sec-schedule', 'calendar'], ['serve', 'sec-serve', 'hands'], ['prayer', 'sec-prayer', 'pray'],
  ];

  /* ── 저장소 (실패해도 동작) ── */
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  var $ = function (id) { return document.getElementById(id); };
  var params = new URLSearchParams(location.search);

  var state = {
    lang: pickLang(),
    size: Number(params.get('size') || store('bb_size') || 1),
    weeks: [],
    week: params.get('week') || '',
    resp: null,
    demo: false,
    offline: false,
    practice: false,
    serveWeek: 'this',
    view: null,
    sample: null,
  };

  function pickLang() {
    var p = params.get('lang');
    if (LANGS.indexOf(p) !== -1) return p;
    var s = store('bb_lang');
    if (LANGS.indexOf(s) !== -1) return s;
    if (CFG.DEFAULT_LANG && CFG.DEFAULT_LANG !== 'auto') return CFG.DEFAULT_LANG;
    var n = (navigator.language || 'ko').slice(0, 2).toLowerCase();
    return LANGS.indexOf(n) !== -1 ? n : 'ko';
  }

  function t(key) { var v = T[state.lang][key]; return v == null ? T.ko[key] : v; }
  function fmt(s, o) { return String(s).replace(/\{(\w+)\}/g, function (_, k) { return o[k] == null ? '' : o[k]; }); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ico(name) { return '<span class="ico" aria-hidden="true">' + (ICONS[name] || '') + '</span>'; }

  function formatSunday(iso, lang) {
    if (!iso) return '';
    var p = iso.split('-').map(Number);
    var d = new Date(Date.UTC(p[0], p[1] - 1, p[2]));
    var loc = { ko: 'ko-KR', en: 'en-US', es: 'es-US' }[lang];
    var opts = lang === 'ko' ? { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }
      : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    var s = new Intl.DateTimeFormat(loc, opts).format(d);
    if (lang === 'es') s = s.charAt(0).toUpperCase() + s.slice(1);
    return fmt(T[lang].sundayFmt, { date: s });
  }
  function upcomingSundayISO() {
    var now = new Date();
    var la = new Date(now.toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    la.setDate(la.getDate() + ((7 - la.getDay()) % 7));
    return la.getFullYear() + '-' + String(la.getMonth() + 1).padStart(2, '0') + '-' + String(la.getDate()).padStart(2, '0');
  }

  /* ── 데이터 불러오기 ── */
  function load(week) {
    document.body.classList.add('loading');
    var cacheKey = 'bb_cache_' + (week || 'latest');
    var cached = store(cacheKey);
    if (cached) { try { apply(JSON.parse(cached), false); } catch (e) {} }

    var req;
    if (CFG.API_URL) {
      req = fetch(CFG.API_URL + (CFG.API_URL.indexOf('?') === -1 ? '?' : '&') + (week ? 'week=' + encodeURIComponent(week) + '&' : '') + 't=' + Date.now(), { redirect: 'follow' })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
    } else {
      state.demo = true;
      req = (state.sample ? Promise.resolve(state.sample) : fetch('sample-data.json').then(function (r) { return r.json(); }))
        .then(function (all) {
          state.sample = all;
          var wk = week && all.bulletins[week] ? week : all.weeks[0];
          return { church: all.church, weeks: all.weeks, lastUpdated: all.lastUpdated, lastChecked: all.lastChecked, bulletin: all.bulletins[wk] };
        });
    }
    return req.then(function (data) {
      state.offline = false;
      store(cacheKey, JSON.stringify(data));
      apply(data, true);
    }).catch(function () {
      state.offline = true;
      if (!cached) apply({ weeks: [], bulletin: null }, true); else render();
    });
  }

  function apply(data, fresh) {
    state.resp = data;
    state.weeks = data.weeks || [];
    if (data.bulletin) state.week = data.bulletin.date;
    state.view = buildView(data);
    if (fresh) document.body.classList.remove('loading');
    render();
  }

  /* ── 언어별 데이터 만들기 ──
   * 1) LA 중앙교회 주보 양식이면 원문(raw)을 이 페이지에서 직접 분석 (lacc-parser.js)
   * 2) apiVersion >= 2 이면 시트에 사람이 직접 입력한 값이 우선
   * 3) 양식이 아니면 시트(Apps Script)가 보낸 값 그대로 사용 */
  function buildView(data) {
    var b = data && data.bulletin;
    if (!b) return null;
    var parsed = window.LACCParser ? window.LACCParser.fromBulletin(b) : null;
    var manual = (data.apiVersion || 0) >= 2;
    var view = {};
    LANGS.forEach(function (l) {
      var base = parsed ? parsed[l] || null : b[l] || null;
      if (parsed && manual && b[l]) {
        base = base ? Object.assign({}, base) : {};
        Object.keys(b[l]).forEach(function (k) { if (has(b[l][k]) && k !== 'raw') base[k] = b[l][k]; });
      }
      view[l] = base;
    });
    view.date = b.date;
    return view;
  }
  function langData() {
    var v = state.view;
    if (!v) return { data: null, lang: state.lang, fallback: false };
    if (v[state.lang]) return { data: v[state.lang], lang: state.lang, fallback: false };
    var order = state.lang === 'ko' ? ['ko', 'es', 'en'] : state.lang === 'es' ? ['es', 'en', 'ko'] : ['en', 'ko', 'es'];
    for (var i = 0; i < order.length; i++) if (v[order[i]]) return { data: v[order[i]], lang: order[i], fallback: true };
    return { data: null, lang: state.lang, fallback: false };
  }
  function field(key) {
    var v = state.view;
    var ld = langData();
    var val = ld.data && ld.data[key];
    if (has(val)) return { v: val, from: ld.fallback ? ld.lang : null };
    if (!v || ld.fallback) return { v: Array.isArray(val) ? [] : '', from: null };
    for (var i = 0; i < LANGS.length; i++) {
      var o = v[LANGS[i]];
      if (o && has(o[key])) return { v: o[key], from: LANGS[i] };
    }
    return { v: Array.isArray(val) ? [] : '', from: null };
  }
  function has(v) { return Array.isArray(v) ? v.length > 0 : !!(v && String(v).trim()); }
  function fromTag(from) { return from && from !== state.lang ? ' <small class="from">' + esc(fmt(t('fromLang'), { lang: LANG_NAME[from] })) + '</small>' : ''; }
  // 성경 구절의 '-' 에서 줄이 끊기지 않도록 (5:16-18)
  function nbh(s) { return String(s || '').replace(/(\d)\s*[-–]\s*(\d)/g, '$1\u2011$2'); }
  function split(s) { return String(s).split(/\s*\|\s*/); }

  /* ── 화면 그리기 ── */
  function renderStatic() {
    var L = state.lang;
    document.documentElement.lang = L;
    var church = (state.resp && state.resp.church) || CFG.CHURCH_NAME || {};
    var cname = church[L] || church.ko || '';
    document.title = cname + ' · ' + T[L].bulletin;
    document.querySelectorAll('[data-church]').forEach(function (el) { el.textContent = cname; });
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-ico]').forEach(function (el) { el.innerHTML = ICONS[el.getAttribute('data-ico')] || ''; el.setAttribute('aria-hidden', 'true'); });
    document.querySelectorAll('#langSeg button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === L)); });
    $('serveSearch').placeholder = t('findPh');
    var sb = $('sizeBtn');
    sb.querySelector('.size-glyph').setAttribute('data-plus', state.size === 1 ? '' : state.size === 2 ? '+' : '++');
    sb.querySelector('.size-glyph').textContent = L === 'ko' ? '가' : 'A';
    sb.querySelector('.size-label').textContent = T[L].textSizeN[state.size % 3];
    sb.setAttribute('aria-label', T[L].textSizeN[state.size - 1] + ' → ' + T[L].textSizeN[state.size % 3]);
    document.documentElement.setAttribute('data-size', String(state.size));
  }

  function render() {
    renderStatic();
    var L = state.lang;
    var b = state.resp && state.resp.bulletin;
    var ld = langData();

    // 주차
    $('weekDate').textContent = b ? formatSunday(b.date, L) : '—';
    var idx = state.weeks.indexOf(state.week);
    $('prevWeek').disabled = idx === -1 || idx >= state.weeks.length - 1;
    $('nextWeek').disabled = idx <= 0;
    $('weekTag').textContent = b ? (b.date === upcomingSundayISO() ? t('thisWeek') : idx === 0 ? t('latest') : '') : '';

    // 알림
    var notes = [];
    if (state.demo) notes.push(t('demo'));
    if (state.offline) notes.push(t('offline'));
    if (!b && !document.body.classList.contains('loading')) notes.push(t('noBulletin'));
    if (ld.fallback) notes.push(fmt(t('fallback'), { lang: LANG_NAME[L], other: LANG_NAME[ld.lang] }));
    $('notice').hidden = !notes.length;
    $('notice').innerHTML = notes.map(esc).join('<br>');

    // 주일 말씀
    var title = field('sermonTitle'), scr = field('scripture'), pre = field('preacher'), scrText = field('scriptureText');
    $('sermonTitle').innerHTML = has(title.v) ? esc(title.v) + fromTag(title.from) : (b ? '<span class="empty">' + esc(t('none')) + '</span>' : '');
    $('scripture').innerHTML = esc(nbh(scr.v)) + fromTag(scr.from);
    $('scriptureRow').hidden = !has(scr.v);
    $('preacher').innerHTML = esc(pre.v) + fromTag(pre.from);
    $('preacherRow').hidden = !has(pre.v);
    var loc = field('sermonLocation'), fel = field('fellowship'), tm = field('serviceTimes');
    $('sermonLocation').innerHTML = esc(loc.v) + fromTag(loc.from);
    $('locationRow').hidden = !has(loc.v);
    $('fellowship').innerHTML = esc(fel.v) + fromTag(fel.from);
    $('fellowshipRow').hidden = !has(fel.v);
    $('timesBlock').hidden = !has(tm.v);
    $('serviceTimes').innerHTML = (tm.v || []).map(function (x) {
      var p = String(x).split(/\s+:\s+/);
      return '<li><span class="t-k">' + esc(p[0]) + '</span><span class="t-v">' + esc(p.slice(1).join(' : ')) + '</span></li>';
    }).join('');
    $('scriptureText').hidden = !has(scrText.v);

    $('scriptureText').textContent = scrText.v || '';

    var hy = field('hymns');
    $('hymnsBlock').hidden = !has(hy.v);
    $('hymns').innerHTML = (hy.v || []).map(function (h) {
      var m = String(h).match(/^(?:새\s*)?(?:찬송가?|찬양|hymn(?:al)?|himnario|himno|no\.?|#)?\s*(?:no\.?|#)?\s*(\d{1,4})\s*(장|번)?\s*[.:\-–]?\s*(.*)$/i);
      if (m) {
        var num = L === 'ko' || m[2] ? m[1] + (m[2] || '장') : '#' + m[1];
        return '<li><span class="hymn-num">' + esc(num) + '</span><span>' + esc(m[3] || '') + '</span></li>';
      }
      return '<li><span>' + esc(h) + '</span></li>';
    }).join('');

    var ord = field('worshipOrder');
    $('orderBlock').hidden = !has(ord.v);
    $('order').innerHTML = (ord.v || []).map(function (line) {
      var p = split(line);
      return '<li><span class="o-k">' + esc(p[0]) + '</span><span>' + esc(p.length > 2 ? p.slice(1, -1).join(' · ') : (p[1] || '')) + '</span><span class="o-who">' + esc(p.length > 2 ? p[p.length - 1] : '') + '</span></li>';
    }).join('');

    // 암송
    var mt = field('memoryVerseText'), mr = field('memoryVerseRef');
    var showMem = has(mt.v) || has(mr.v);
    $('sec-memory').hidden = !showMem;
    renderVerse(mt.v || '');
    $('memoryRef').innerHTML = has(mr.v) ? '— ' + esc(nbh(mr.v)) + fromTag(mr.from || mt.from) : '';
    $('practiceBtn').hidden = !has(mt.v);
    var th = field('memoryVerseTheme');
    $('memoryTheme').textContent = th.v || '';
    $('memoryTheme').hidden = !has(th.v);
    var nt = field('memoryNextText'), nr = field('memoryNextRef');
    $('memoryNextBlock').hidden = !has(nt.v);
    $('memoryNextText').textContent = nt.v || '';
    $('memoryNextRef').textContent = has(nr.v) ? '— ' + nbh(nr.v) : '';

    // 이번 주 묵상 말씀: 주보 주일부터 토요일까지, 오늘 요일 강조
    var laNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    var todayIdx = laNow.getDay();
    var weekStart = b ? new Date(b.date + 'T00:00:00') : null;
    var diff = weekStart ? Math.floor((new Date(laNow.getFullYear(), laNow.getMonth(), laNow.getDate()) - weekStart) / 86400000) : -1;
    var inWeek = diff >= 0 && diff < 7;
    list('readings', 'readings', 'sec-readings', function (s, i) {
      var p = split(s);
      var cur = inWeek && i === todayIdx;
      return '<li' + (cur ? ' class="today"' : '') + '><span class="r-day">' + esc(p[0]) + (cur ? ' <em>' + esc(t('today')) + '</em>' : '') + '</span><span class="r-txt">' + esc(p.slice(1).join(' ')) + '</span></li>';
    });


    // 소식 / 일정 / 봉사 / 기도
    list('news', 'announcements', 'sec-news', function (s) { return '<li>' + linkify(esc(s)) + '</li>'; });
    list('schedule', 'schedule', 'sec-schedule', function (s) {
      var p = split(s);
      return p.length > 1 ? '<li><span class="sched-when">' + esc(p[0]) + '</span><span class="sched-what">' + esc(p.slice(1).join(' · ')) + '</span></li>'
        : '<li><span class="sched-what">' + esc(s) + '</span></li>';
    });
    var mt2 = field('meetings');
    $('meetingsBlock').hidden = !has(mt2.v);
    $('meetings').innerHTML = (mt2.v || []).map(function (s) {
      var p = split(s);
      return '<li><span class="m-name">' + esc(p[0]) + '</span><span class="m-time">' + esc(p.slice(1).join(' ')) + '</span></li>';
    }).join('');
    if (has(mt2.v)) $('sec-schedule').hidden = false;

    var hasNext = has(field('volunteersNext').v);
    $('serveTabs').hidden = !hasNext;
    if (!hasNext) state.serveWeek = 'this';
    document.querySelectorAll('#serveTabs button').forEach(function (bt) { bt.setAttribute('aria-selected', String(bt.getAttribute('data-week') === state.serveWeek)); });
    list('serve', state.serveWeek === 'next' ? 'volunteersNext' : 'volunteers', 'sec-serve', function (s) {
      var p = split(s);
      return p.length > 1 ? '<li data-s="' + esc(s.toLowerCase()) + '"><span class="serve-role">' + esc(p[0]) + '</span><span class="serve-names">' + esc(p.slice(1).join(', ')) + '</span></li>'
        : '<li class="full" data-s="' + esc(s.toLowerCase()) + '"><span class="serve-names">' + esc(s) + '</span></li>';
    });
    $('serveSearchWrap').hidden = (field('volunteers').v || []).length < 5;
    if (has(field('volunteers').v)) $('sec-serve').hidden = false;
    filterServe();
    list('prayer', 'prayer', 'sec-prayer', function (s) { return '<li>' + esc(s) + '</li>'; });

    // 원본
    var btns = '';
    var seenUrl = {};
    if (state.view) LANGS.forEach(function (l) {
      var o = state.view[l];
      if (!o || !o.fileUrl || seenUrl[o.fileUrl]) return;
      seenUrl[o.fileUrl] = true;
      if (o.sourceMode === 'bi') { btns += '<a class="btn' + (state.lang !== 'en' ? ' primary' : '') + '" href="' + esc(o.fileUrl) + '" target="_blank" rel="noopener">' + ico('ext') + esc(fmt(t('openOriginal'), { lang: '한국어 · Español' })) + '</a>'; return; }
      if (o.fileUrl) btns += '<a class="btn' + (l === state.lang ? ' primary' : '') + '" href="' + esc(o.fileUrl) + '" target="_blank" rel="noopener">' + ico('ext') + esc(fmt(t('openOriginal'), { lang: LANG_NAME[l] })) + '</a>';
    });
    $('origBtns').innerHTML = btns;
    var raw = ld.data && ld.data.raw;
    $('rawBlock').hidden = !raw;
    $('rawText').textContent = raw || '';
    $('sec-original').hidden = !btns && !raw;

    // 바로가기
    $('quicknav').innerHTML = NAV.filter(function (n) { return !$(n[1]).hidden; }).map(function (n) {
      return '<a href="#' + n[1] + '">' + ico(n[2]) + '<span>' + esc(T[L].nav[n[0]]) + '</span></a>';
    }).join('');

    // 하단
    var r = state.resp || {};
    var upd = r.lastUpdated ? new Date(r.lastUpdated) : null;
    $('updated').textContent = upd && !isNaN(upd) ? t('updated') + ': ' + upd.toLocaleString({ ko: 'ko-KR', en: 'en-US', es: 'es-US' }[L], { dateStyle: 'medium', timeStyle: 'short' }) : '';
    var ldd = langData().data || {};
    var addr = CFG.ADDRESS || ldd.address, phone = CFG.PHONE || ldd.phone;
    $('churchInfo').innerHTML = [addr, phone ? '<a href="tel:' + esc(phone.replace(/[^\d+]/g, '')) + '">' + esc(phone) + '</a>' : '', CFG.WEBSITE ? '<a href="' + esc(CFG.WEBSITE) + '" target="_blank" rel="noopener">' + esc(CFG.WEBSITE.replace(/^https?:\/\//, '')) + '</a>' : ''].filter(Boolean).join(' · ');

    syncUrl();
    measure();
  }

  function list(elId, key, secId, tpl) {
    var f = field(key);
    var items = f.v || [];
    $(secId).hidden = !items.length;
    $(elId).innerHTML = items.map(tpl).join('');
    var h = $(secId).querySelector('.eyebrow');
    var old = h.querySelector('.from'); if (old) old.remove();
    if (f.from && f.from !== state.lang) h.insertAdjacentHTML('beforeend', fromTag(f.from));
  }

  function linkify(s) {
    return s.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')
      .replace(/(\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4})/g, function (m) { return '<a href="tel:' + m.replace(/\D/g, '') + '">' + m + '</a>'; });
  }

  /* ── 암송 연습: 단어 일부를 가리고 눌러서 확인 ── */
  function renderVerse(text) {
    var el = $('memoryText');
    el.classList.toggle('practice', state.practice);
    $('practiceBtn').setAttribute('aria-pressed', String(state.practice));
    $('practiceHint').hidden = !state.practice;
    if (!state.practice) { el.textContent = text; return; }
    var words = text.split(/(\s+)/);
    var n = 0;
    el.innerHTML = words.map(function (w) {
      if (/^\s+$/.test(w) || !w) return w;
      n++;
      var hide = n % 2 === 0 || n % 5 === 0;
      return '<span class="w' + (hide ? ' h' : '') + '"' + (hide ? ' role="button" tabindex="0"' : '') + '>' + esc(w) + '</span>';
    }).join('');
  }

  function filterServe() {
    var q = ($('serveSearch').value || '').trim().toLowerCase();
    var any = false;
    document.querySelectorAll('#serve li').forEach(function (li) {
      var hit = !q || li.getAttribute('data-s').indexOf(q) !== -1;
      li.hidden = !hit; if (hit) any = true;
      li.querySelectorAll('span').forEach(function (sp) {
        var txt = sp.textContent;
        sp.innerHTML = q && hit ? esc(txt).replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '<mark>$&</mark>') : esc(txt);
      });
    });
    var msg = $('serve').querySelector('.nomatch'); if (msg) msg.remove();
    if (q && !any) $('serve').insertAdjacentHTML('beforeend', '<li class="full nomatch"><span class="empty">' + esc(t('noName')) + '</span></li>');
  }

  function syncUrl() {
    var p = new URLSearchParams(location.search);
    p.set('lang', state.lang);
    if (state.week && state.weeks[0] !== state.week) p.set('week', state.week); else p.delete('week');
    p.delete('size');
    var u = location.pathname + '?' + p.toString() + location.hash;
    try { history.replaceState(null, '', u); } catch (e) {}
  }

  function measure() {
    var h = document.querySelector('.topbar').offsetHeight;
    document.documentElement.style.setProperty('--topbar-h', h + 'px');
  }

  function toast(msg) {
    var el = $('toast'); el.textContent = msg; el.classList.add('show');
    clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove('show'); }, 2200);
  }

  function shareUrl() {
    var p = new URLSearchParams(); p.set('lang', state.lang);
    return location.origin + location.pathname + '?' + p.toString();
  }

  /* ── 이벤트 ── */
  document.querySelectorAll('#langSeg button').forEach(function (b) {
    b.addEventListener('click', function () { state.lang = b.getAttribute('data-lang'); store('bb_lang', state.lang); render(); });
  });
  $('sizeBtn').addEventListener('click', function () {
    state.size = state.size % 3 + 1; store('bb_size', String(state.size)); renderStatic(); measure();
    toast(T[state.lang].textSizeN[state.size - 1]);
  });
  $('prevWeek').addEventListener('click', function () { var i = state.weeks.indexOf(state.week); if (i < state.weeks.length - 1) load(state.weeks[i + 1]); });
  $('nextWeek').addEventListener('click', function () { var i = state.weeks.indexOf(state.week); if (i > 0) load(state.weeks[i - 1]); });
  $('practiceBtn').addEventListener('click', function () { state.practice = !state.practice; renderVerse(field('memoryVerseText').v || ''); });
  $('memoryText').addEventListener('click', function (e) { if (e.target.classList.contains('h')) e.target.classList.remove('h'); });
  $('memoryText').addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('h')) { e.preventDefault(); e.target.classList.remove('h'); } });
  $('serveSearch').addEventListener('input', filterServe);
  document.querySelectorAll('#serveTabs button').forEach(function (bt) {
    bt.addEventListener('click', function () { state.serveWeek = bt.getAttribute('data-week'); render(); });
  });
  $('shareBtn').addEventListener('click', function () {
    var url = shareUrl();
    var title = document.title;
    if (navigator.share) { navigator.share({ title: title, url: url }).catch(function () {}); return; }
    (navigator.clipboard ? navigator.clipboard.writeText(url) : Promise.reject()).then(function () { toast(t('copied')); }, function () { prompt('URL', url); });
  });
  $('qrBtn').addEventListener('click', function () {
    var url = shareUrl();
    $('qrUrl').textContent = url;
    var box = $('qrCode');
    var draw = function () { box.innerHTML = ''; new window.QRCode(box, { text: url, width: 440, height: 440, correctLevel: window.QRCode.CorrectLevel.M }); };
    if (window.QRCode) draw();
    else {
      var s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
      s.onload = draw; document.head.appendChild(s);
    }
    $('qrDialog').showModal();
  });
  $('qrClose').addEventListener('click', function () { $('qrDialog').close(); });
  window.addEventListener('resize', measure);
  document.addEventListener('visibilitychange', function () {
    // 앱을 다시 열면 최신 주보 확인
    if (!document.hidden && (!state.week || state.weeks[0] === state.week)) load('');
  });

  renderStatic();
  load(state.week);
})();
