/*
 * LA 중앙교회 주보 양식 전용 분석기
 *  - 영어 주보 (English)            → { en }
 *  - 한국어/스페인어 주보 (한 파일)  → { ko, es }
 * 구글 문서의 글(표는 칸 순서대로 줄바꿈)을 받아 항목별로 나눕니다.
 * 브라우저(window.LACCParser)와 Node(module.exports) 둘 다에서 동작합니다.
 */
(function (root) {
  'use strict';

  var HANGUL = /[가-힣]/;
  var DATE_RE = /(\d{1,2})\/(\d{1,2})\/(\d{4})\s*(?:\(([^)]*)\))?/;
  var KO_DAY = { dom: '일', lun: '월', mar: '화', mie: '수', mié: '수', jue: '목', vie: '금', sab: '토', sáb: '토', sun: '일', mon: '월', tue: '화', wed: '수', thu: '목', thurs: '목', fri: '금', sat: '토' };

  function clean(s) { return String(s == null ? '' : s).replace(/[ 　\t\r]/g, ' ').replace(/\s+/g, ' ').trim(); }
  function linesOf(t) { return String(t || '').split(/\n/).map(clean).filter(Boolean); }
  function isKo(s) { return HANGUL.test(s); }
  function stripMark(s) { return clean(String(s).replace(/^[\s※☞∗*\-•·]+/, '')); }
  function find(L, re, from, to) {
    for (var i = Math.max(0, from || 0); i < (to == null ? L.length : to); i++) if (re.test(L[i])) return i;
    return -1;
  }
  function tidyList(s) { return clean(s).replace(/\s*,\s*/g, ', ').replace(/[,/\s]+$/, ''); }

  // "식사봉사 / Servicio de Comida"  또는  "일요일 (Dom)"  →  {ko, es}
  function bi(s) {
    s = clean(s);
    if (s.indexOf('/') !== -1) {
      var parts = s.split('/').map(clean).filter(Boolean);
      var ko = parts.filter(isKo).join(' / ');
      var es = parts.filter(function (p) { return !isKo(p); }).join(' / ');
      if (ko && es) return { ko: ko, es: es };
    }
    var m = s.match(/^(.*[가-힣].*?)\s*\(([^)가-힣]+)\)\s*$/);
    if (m) return { ko: clean(m[1]), es: clean(m[2]) };
    return { ko: s, es: s };
  }

  function fmtDate(s, lang) {
    var m = String(s).match(DATE_RE);
    if (!m) return clean(s);
    var md = Number(m[1]) + '/' + Number(m[2]);
    var day = m[4] ? clean(m[4]) : '';
    if (day.indexOf('/') !== -1) { var b = bi(day); day = lang === 'ko' ? b.ko : b.es; }
    else if (lang === 'ko' && day) day = KO_DAY[day.toLowerCase()] || day;
    return md + (day ? ' (' + day + ')' : '');
  }

  function splitTopic(t) {
    t = clean(t);
    var p = t.split(/\s+[-–—]\s+/);
    return { scripture: clean(p[0]), title: clean(p.slice(1).join(' - ')) || clean(p[0]) };
  }
  function afterColon(s) { s = stripMark(s); var i = s.search(/[:：]/); return i === -1 ? s : clean(s.slice(i + 1)); }

  function empty() {
    return {
      sermonTitle: '', scripture: '', preacher: '', sermonLocation: '', fellowship: '', serviceTimes: [], hymns: [],
      memoryVerseRef: '', memoryVerseText: '', memoryVerseTheme: '', memoryNextRef: '', memoryNextText: '',
      announcements: [], schedule: [], meetings: [], volunteers: [], volunteersNext: [], readings: [],
      address: '', phone: '',
    };
  }

  /* ───────────── 주일 말씀 ───────────── */
  function sermon(L, mode, out) {
    var iTop = find(L, /^(today.s sermon|오늘의 말씀)/i);
    var iP = find(L, /^(P\.|Pastor|Rev\.?|B\.)\s/i, iTop < 0 ? 0 : iTop);
    var iMark = iP < 0 ? -1 : find(L, /^※/, iP);
    if (iP >= 0 && iMark > iP) {
      var mid = L.slice(iP + 1, iMark);
      each(out, function (o) { o.preacher = L[iP]; });
      if (mode === 'en') {
        out.en.sermonLocation = mid[0] || '';
        out.en.fellowship = mid.slice(1).join(' ');
      } else {
        out.ko.sermonLocation = mid[0] || '';
        var rest = mid.slice(1);
        if (rest[0] && /^\(.*\)$/.test(rest[0])) { out.es.sermonLocation = rest[0].replace(/^\(|\)$/g, ''); rest = rest.slice(1); }
        else out.es.sermonLocation = mid[0] || '';
        out.ko.fellowship = rest.filter(isKo).join(' ');
        out.es.fellowship = rest.filter(function (x) { return !isKo(x); }).join(' ');
      }
    }
    function topic(o, idx) {
      if (idx < 0) return;
      var t = splitTopic(afterColon(L[idx]));
      o.scripture = t.scripture; o.sermonTitle = t.title;
      var h = L[idx + 1];
      if (h && /(hymn|himn|찬송|찬양|\d)/i.test(h) && !/^※/.test(h)) o.hymns = [stripMark(h)];
    }
    if (mode === 'en') topic(out.en, find(L, /(sermon topic|ending praise)/i));
    else { topic(out.ko, find(L, /말씀\s*주제/)); topic(out.es, find(L, /tema de palabra/i)); }

    var iT = find(L, /^※.*(adult|성인).*\d{1,2}:\d{2}/i);
    if (iT >= 0) {
      var s = stripMark(L[iT]);
      var toList = function (x) { return x.split('/').map(clean).filter(Boolean).map(function (p) { return p.replace(/\s*:\s*/, ' : '); }); };
      if (mode === 'en') out.en.serviceTimes = toList(s);
      else {
        out.ko.serviceTimes = toList(s.replace(/\s*\([^)]*\)/g, ''));
        out.es.serviceTimes = toList(s.replace(/[가-힣\s]+\(([^)]*)\)/g, ' $1'));
      }
    }
  }

  /* ───────────── 수련회/세미나 안내 → 교회 소식 ───────────── */
  var FEE_TXT = {
    en: function (a) { return 'Fees: Adults ' + a[0] + ' (KR) / ' + a[1] + ' (LT/CH) · Youth Group ' + a[2] + ' / ' + a[3] + ' · Elementary ' + a[4] + ' / ' + a[5] + ' · Evangelism guests & newcomers: Free'; },
    ko: function (a) { return '회비: 성인 ' + a[0] + ' (한인) / ' + a[1] + ' (라티노·중국인) · 중고등부 ' + a[2] + ' / ' + a[3] + ' · 초등부 ' + a[4] + ' / ' + a[5] + ' · 전도대상·미취학·처음 참석자 무료'; },
    es: function (a) { return 'Cuota: Adulto ' + a[0] + ' (KR) / ' + a[1] + ' (LT/CH) · Jóvenes ' + a[2] + ' / ' + a[3] + ' · Primarios ' + a[4] + ' / ' + a[5] + ' · Evangelistas, niños y primeros asistentes: gratis'; },
  };
  var LBL = {
    speaker: { en: 'Speaker', ko: '강사', es: 'Predicador' },
    meditation: { en: 'This Week’s Meditation', ko: '이번 주 묵상 말씀', es: 'Lectura de la semana' },
  };

  function retreat(L, mode, out) {
    var iR = find(L, /^(upcoming seminars?|동계수련회\s*안내|수련회\s*안내|.*anuncios del retiro)/i);
    if (iR < 0) return;
    var iG = find(L, /^(fellowship guide|교제\s*안내)/i, iR);
    var stop = iG < 0 ? L.length : iG;
    var d1 = find(L, DATE_RE, iR, stop), d2 = d1 < 0 ? -1 : find(L, DATE_RE, d1 + 1, stop);
    var hEnd = find(L, /^(location|\(lugares\))$/i, iR, d1 < 0 ? stop : d1);
    var iMat = find(L, /^※.*(materials|준비물)/i, iR, stop);
    var pre = hEnd >= 0 && d1 > hEnd ? L.slice(hEnd + 1, d1) : [];
    var loc = iMat > 0 ? L[iMat - 1] : '';
    var head = mode === 'en' ? { en: L[iR] } : bi(L[iR]);

    each(out, function (o, lang) {
      var parts = [];
      if (d1 >= 0) parts.push(fmtDate(L[d1], lang) + (d2 >= 0 ? ' ~ ' + fmtDate(L[d2], lang) : ''));
      if (loc && !/^(location|\(lugares\))$/i.test(loc)) parts.push(loc);
      var who = mode === 'en' ? pre.join(' ') : lang === 'ko' ? pre.filter(isKo).join(' ') : pre.filter(function (x) { return !isKo(x); }).join(' ').replace(/\s+y$/, ' y otros');
      if (who) parts.push(LBL.speaker[lang] + ': ' + who);
      o.announcements.push(head[lang].replace(/\s*\/\s*$/, '') + ' — ' + parts.join(' · '));
    });

    if (iMat >= 0) {
      var s = stripMark(L[iMat]);
      var c = s.search(/[:：]/);
      var label = clean(s.slice(0, c)), val = clean(s.slice(c + 1));
      if (mode === 'en') out.en.announcements.push(label + ': ' + val);
      else {
        var lb = bi(label);
        var esVal = (val.match(/\(([^)]*)\)\s*$/) || [])[1];
        out.ko.announcements.push(lb.ko + ': ' + clean(val.replace(/\([^)]*\)\s*$/, '')));
        out.es.announcements.push(lb.es + ': ' + clean(esVal || val));
      }
    }
    var iF = find(L, /^※.*(fees|회비|cuota)/i, iR, stop);
    if (iF >= 0) {
      var amts = [];
      for (var k = iF + 1; k < stop; k++) if (/^(\$\s?\d[\d,]*|free|무료.*)$/i.test(L[k])) amts.push(/^\$/.test(L[k]) ? L[k].replace(/\s/g, '') : L[k]);
      if (amts.length >= 6) each(out, function (o, lang) { o.announcements.push(FEE_TXT[lang](amts)); });
    }
  }

  /* ───────────── 교제 안내 → 일정 / 기타 ※ 알림 ───────────── */
  function fellowship(L, mode, out) {
    var iG = find(L, /^(fellowship guide|교제\s*안내)/i);
    if (iG < 0) return;
    var iAg = find(L, /^monthly agenda/i, iG);
    var end = find(L, /^※/, iG, iAg < 0 ? L.length : iAg);
    var hEnd = find(L, /^(location|장\s*소)/i, iG, end < 0 ? L.length : end);
    var seg = L.slice((hEnd < 0 ? iG : hEnd) + 1, end < 0 ? (iAg < 0 ? L.length : iAg) : end);
    seg.forEach(function (line, i) {
      if (!DATE_RE.test(line)) return;
      if (mode === 'en') {
        out.en.schedule.push(fmtDate(line, 'en') + ' | ' + (seg[i - 1] || '') + (seg[i + 1] ? ' | ' + seg[i + 1] : ''));
      } else {
        var koN = seg[i - 2] && isKo(seg[i - 2]) ? seg[i - 2] : seg[i - 1];
        var esN = seg[i - 1] && !isKo(seg[i - 1]) ? seg[i - 1] : koN;
        var place = seg[i + 1] && !DATE_RE.test(seg[i + 1]) ? ' | ' + seg[i + 1] : '';
        out.ko.schedule.push(fmtDate(line, 'ko') + ' | ' + koN + place);
        out.es.schedule.push(fmtDate(line, 'es') + ' | ' + esN + place);
      }
    });
    // 교제 안내 아래의 ※ 알림 (예: 건축헌금)
    var stop = iAg < 0 ? L.length : iAg;
    for (var k = (end < 0 ? stop : end); k < stop; k++) {
      if (!/^※/.test(L[k])) continue;
      var txt = stripMark(L[k]);
      if (mode === 'en') out.en.announcements.push(txt);
      else if (isKo(txt)) {
        out.ko.announcements.push(txt);
        var nx = L[k + 1];
        if (nx && !isKo(nx) && !/^※/.test(nx) && k + 1 < stop) out.es.announcements.push(nx);
      } else out.es.announcements.push(txt);
    }
  }

  /* ───────────── 정기 모임 + 주소 ───────────── */
  function meetings(L, mode, out) {
    var iM = find(L, /^(sermons?\s*&\s*fellowships?\s*guide|모임\s*안내)/i);
    if (iM < 0) return;
    var end = find(L, /^(address|주소)/i, iM);
    var stop = end < 0 ? L.length : end;
    for (var k = iM + 1; k < stop - 1; k++) {
      if (!/\d{1,2}:\d{2}/.test(L[k + 1]) || /\d{1,2}:\d{2}/.test(L[k])) continue;
      var name = L[k], time = L[k + 1];
      if (mode === 'en') out.en.meetings.push(name + ' | ' + time);
      else {
        var n = bi(name), t = bi(time);
        var clock = (time.match(/\d{1,2}:\d{2}\s*[AP]M/i) || [''])[0];
        var koT = t.ko.indexOf(':') === -1 && clock ? t.ko + ' ' + clock : t.ko;
        out.ko.meetings.push(n.ko + ' | ' + koT);
        out.es.meetings.push(n.es + ' | ' + t.es);
      }
      k++;
    }
    if (end >= 0) {
      var line = L.slice(end, end + 2).join(' ');
      var addr = (line.match(/(?:address|dirección|direccion)\s*:\s*(.+?)(?:\s+tel\b|$)/i) || [])[1];
      var tel = (line.match(/tel\s*:?\s*(\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]\d{4})/i) || [])[1];
      each(out, function (o) { o.address = clean(addr || ''); o.phone = clean(tel || ''); });
    }
  }

  /* ───────────── 봉사 안내 (이번 주 / 다음 주) + 월간 담당 ───────────── */
  function ministries(L, mode, out) {
    var iV = find(L, /^(ministries|봉사\s*안내)/i);
    if (iV < 0) return;
    var start = find(L, /^☞/, iV);
    var iMV = find(L, /(memory verse$|성구암송\s*\/\s*recitaci)/i, iV);
    if (start < 0) return;
    var end = iMV < 0 ? L.length : iMV;
    var blocks = [];
    for (var k = start; k < end; k++) {
      var l = L[k];
      if (/^☞/.test(l)) blocks.push({ title: stripMark(l), entries: [] });
      else if (!blocks.length) continue;
      else if (/^[*∗\-•]/.test(l) || !blocks[blocks.length - 1].entries.length) blocks[blocks.length - 1].entries.push(stripMark(l));
      else { var e = blocks[blocks.length - 1].entries; e[e.length - 1] += ' ' + l; }
    }
    var split = -1;
    for (var b = 1; b < blocks.length; b++) if (blocks[b].title === blocks[0].title) { split = b; break; }
    if (split < 0) split = blocks.length;
    var conv = function (list, lang) {
      var items = [];
      list.forEach(function (bl) {
        var title = mode === 'en' ? bl.title : bi(bl.title)[lang];
        bl.entries.forEach(function (en) {
          en = tidyList(en);
          var m = en.match(/^([^:：]{1,25}?)\s*[:：]\s*(.+)$/);
          if (m && !/^[A-Z]\.\s/.test(m[1])) {
            var lab = m[1];
            if (mode !== 'en') {
              if (/^(trastes|dishes)$/i.test(lab)) lab = lang === 'ko' ? '설거지' : 'Trastes';
              else lab = bi(lab)[lang];
            }
            items.push(title + ' · ' + lab + ' | ' + m[2]);
          } else items.push(title + ' | ' + en);
        });
      });
      return items;
    };
    each(out, function (o, lang) {
      o.volunteers = conv(blocks.slice(0, split), lang);
      o.volunteersNext = conv(blocks.slice(split), lang);
    });

    if (iMV < 0) return;
    // 이번 달 성구암송 담당
    var mHead = mode === 'en' ? { en: L[iMV] } : bi(L[iMV]);
    var iK = find(L, /^(korean|한국어)\s*:/i, iMV + 1);
    var iGr = find(L, /(greeting service$|안내봉사\s*\/)/i, iMV + 1);
    if (iK >= 0 && (iGr < 0 || iK < iGr)) {
      var who = L[iK] + (L[iK + 1] && /^(english|spanish|español)\s*:/i.test(L[iK + 1]) ? ' ' + L[iK + 1] : '');
      who = clean(who).replace(/\s*\/\s*/g, ' / ').replace(/[\s/]+$/, '');
      each(out, function (o, lang) { o.volunteers.push(mHead[lang] + ' | ' + who); });
    }
    // 이번 달 안내봉사
    if (iGr >= 0) {
      var gHead = mode === 'en' ? { en: L[iGr] } : bi(L[iGr]);
      var dayHdr = find(L, /^(sun|일\/dom)$/i, iGr);
      var gEnd = dayHdr < 0 ? find(L, /^(this week.s meditation|memory verses|성구암송\s*\/\s*memoriz)/i, iGr) : dayHdr;
      var ent = [];
      for (var g = iGr + 2; g < (gEnd < 0 ? L.length : gEnd); g++) {
        if (/^[∗*•\-]/.test(L[g])) ent.push(stripMark(L[g]));
        else if (ent.length && !/(greeting service|안내봉사)/i.test(L[g])) ent[ent.length - 1] += ', ' + L[g];
      }
      var seen = {};
      ent.forEach(function (x) {
        var m = x.match(/^([^:：]{1,25}?)\s*[:：]\s*(.+)$/);
        if (!m || seen[m[1]]) { if (m) seen.__stop = true; return; }
        if (seen.__stop) return;
        seen[m[1]] = true;
        each(out, function (o, lang) {
          var lab = m[1];
          if (lang === 'ko') lab = { entrada: '정문', santuario: '본당' }[lab.toLowerCase()] || lab;
          o.volunteers.push(gHead[lang] + ' · ' + lab + ' | ' + tidyList(m[2]));
        });
      });
    }
  }

  /* ───────────── 이번 주 묵상 말씀 ───────────── */
  function readings(L, mode, out) {
    var memI = find(L, /^(memory verses|성구암송\s*\/\s*memoriz)/i);
    for (var i = 0; i < L.length - 8; i++) {
      if (!/^(sun|일\/dom)$/i.test(L[i]) || /^\d+$/.test(L[i + 7])) continue;
      var days = L.slice(i, i + 7);
      var body = L.slice(i + 7, memI > i ? memI : L.length);
      var groups = [];
      if (mode === 'en') {
        var cur = [];
        body.forEach(function (x) { cur.push(x); if (!/,$/.test(x)) { groups.push({ en: cur.join(' ') }); cur = []; } });
      } else {
        body.forEach(function (x) {
          if (isKo(x)) groups.push({ ko: x, es: [] });
          else if (groups.length) groups[groups.length - 1].es.push(x);
        });
        groups = groups.map(function (g) { return { ko: g.ko, es: g.es.join(' ') }; });
      }
      groups.slice(0, 7).forEach(function (g, d) {
        each(out, function (o, lang) {
          var dl = mode === 'en' ? days[d] : bi(days[d])[lang];
          if (g[lang]) o.readings.push(dl + ' | ' + tidyList(g[lang]));
        });
      });
      return;
    }
  }

  /* ───────────── 성구암송 (이번 주 / 다음 주) ───────────── */
  function memory(L, mode, out) {
    var iM = find(L, /^(memory verses|성구암송\s*\/\s*memoriz)/i);
    if (iM < 0) return;
    var end = find(L, /^(sermons?\s*&\s*fellowships?\s*guide|모임\s*안내)/i, iM);
    var seg = L.slice(iM + 1, end < 0 ? L.length : end);
    var blocks = {}, cur = null;
    seg.forEach(function (x) {
      var m = x.match(/^(last week|this week|next week|지난주|이번주|다음주)/i);
      if (m) { cur = { which: /last|지난/i.test(m[1]) ? 'last' : /this|이번/i.test(m[1]) ? 'this' : 'next', head: x, lines: [] }; blocks[cur.which] = cur; }
      else if (cur) cur.lines.push(x);
    });
    function theme(head, lang) {
      if (mode === 'en') return clean(head.replace(/^(last|this|next) week/i, ''));
      var m = head.match(/-\s*([가-힣\s]+?)\s+([A-Za-zÀ-ÿ].*)$/);
      return m ? clean(lang === 'ko' ? m[1] : m[2]) : '';
    }
    function verse(bl, lang) {
      if (!bl) return { text: '', ref: '' };
      var lines = bl.lines;
      if (mode === 'en' || lang === 'es') {
        var pick = mode === 'en' ? lines : lines.filter(function (x) { return !isKo(x); });
        var joined = clean(pick.join(' '));
        var m = joined.match(/\(([^()]+)\)\s*$/);
        return { text: clean(m ? joined.slice(0, m.index) : joined), ref: m ? clean(m[1]) : '' };
      }
      var ko = lines.filter(isKo);
      var refLine = ko.filter(function (x) { return /^\(.*\)$/.test(x); })[0];
      var text = ko.filter(function (x) { return x !== refLine; }).join(' ');
      return { text: clean(text), ref: refLine ? refLine.replace(/^\(|\)$/g, '') : '' };
    }
    each(out, function (o, lang) {
      var t = verse(blocks['this'], lang), n = verse(blocks['next'], lang);
      o.memoryVerseText = t.text; o.memoryVerseRef = t.ref;
      o.memoryNextText = n.text; o.memoryNextRef = n.ref;
      if (blocks['this']) o.memoryVerseTheme = theme(blocks['this'].head, lang);
    });
  }

  function each(out, fn) { Object.keys(out).forEach(function (k) { fn(out[k], k); }); }

  function detect(text) {
    var hasKo = (String(text).match(/[가-힣]/g) || []).length > 30;
    if (/말씀\s*주제|오늘의 말씀/.test(text) && hasKo) return 'bi';
    if (/sermon topic|today.s sermon/i.test(text)) return 'en';
    return null;
  }

  function parse(text) {
    var mode = detect(text);
    if (!mode) return null;
    var L = linesOf(text);
    var out = mode === 'en' ? { en: empty() } : { ko: empty(), es: empty() };
    [sermon, retreat, fellowship, ministries, readings, memory, meetings].forEach(function (fn) {
      try { fn(L, mode, out); } catch (e) { if (root.console) console.warn('LACCParser', fn.name, e); }
    });
    return { mode: mode, data: out };
  }

  /* API 응답의 bulletin({date, ko, en, es}) → 언어별 결과. 양식이 아니면 null */
  function fromBulletin(b) {
    if (!b) return null;
    var res = {}, found = false;
    ['ko', 'en', 'es'].forEach(function (col) {
      var src = b[col];
      if (!src || !src.raw) return;
      var p = parse(src.raw);
      if (!p) return;
      found = true;
      Object.keys(p.data).forEach(function (lang) {
        var o = p.data[lang];
        o.raw = src.raw; o.fileUrl = src.fileUrl || ''; o.fileName = src.fileName || '';
        o.sourceMode = p.mode;
        if (!res[lang]) res[lang] = o;
      });
    });
    return found ? res : null;
  }

  var api = { parse: parse, fromBulletin: fromBulletin, detect: detect };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.LACCParser = api;
})(typeof window !== 'undefined' ? window : this);
