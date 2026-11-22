(function () {
  'use strict';
  var CFG = window.BULLETIN_CONFIG || {};
  var LANGS = ['ko', 'en', 'es'];
  var LANG_NAME = { ko: '한국어', en: 'English', es: 'Español' };

  var T = {
    ko: {
      bulletin: '주일 모바일 소식지', textSize: '글씨 크기', settings: '언어·글씨 설정', setTitle: '설정', welcome: '처음 오셨네요! 편한 언어와 글씨 크기를 골라 주세요.', langLbl: '언어', screenLbl: '화면', done: '완료', themeShort: { auto: '자동', light: '밝게', dark: '어둡게' }, sizeHint: '글씨가 작으면 오른쪽 위 「가 가 가」에서 큰 글씨를 누르세요', ok: '알겠어요', themeN: { auto: '화면: 자동', light: '화면: 밝게', dark: '화면: 어둡게' }, textSizeN: ['보통 글씨', '큰 글씨', '아주 큰 글씨'],
      prev: '지난주', next: '다음주', latest: '최신 소식지', thisWeek: '이번 주일',
      sermon: '주일 말씀', scripture: '본문', preacher: '설교', hymns: '찬양', order: '예배 순서 전체 보기',
      memory: '이번 주 암송 말씀', present: '발표', presentTip: '대강당 스크린용 발표 화면 (새 창)', practice: '암송 연습', practiceHint: '가려진 단어를 눌러서 확인해 보세요.',
      news: '교회 소식', schedule: '일정', serve: '봉사 안내', prayer: '기도 제목', original: '원본 소식지',
      openOriginal: '{lang} 원본 보기', rawText: '소식지 전체 글 보기', findName: '내 이름 찾기', findPh: '이름으로 찾기 (예: 김영희)',
      share: '공유하기', qr: 'QR 코드', qrTitle: '휴대폰 카메라로 찍으면 소식지가 열립니다', close: '닫기', toTop: '맨 위로',
      copied: '링크를 복사했습니다', updated: '마지막 업데이트', checked: '마지막 확인',
      nav: { sermon: '말씀', memory: '암송', readings: '묵상', news: '소식', schedule: '일정', serve: '봉사', prayer: '기도' },
      none: '이번 주에는 내용이 없습니다.', noBulletin: '이번 주 소식지가 아직 올라오지 않았습니다. 토요일·주일에 자동으로 업데이트됩니다.',
      fallback: '{lang} 소식지가 아직 없어 {other}(으)로 보여 드립니다.', demo: '예시 화면입니다. 실제 소식지가 연결되면 자동으로 바뀝니다.',
      offline: '인터넷 연결이 없어 저장된 소식지를 보여 드립니다.', loading: '불러오는 중…', noName: '찾는 이름이 없습니다.',
      fromLang: '({lang})', sundayFmt: '{date} 주일',
      location: '장소', serviceTimes: '예배 시간', fellowship: '예배 후 교제', memoryNext: '다음 주 암송 미리 보기', memoryLast: '지난주 암송 다시 보기', readings: '이번 주 묵상 말씀', readHint: '요일을 누르면 그날 말씀 전체를 <b>개역한글</b>로 바로 읽을 수 있어요', readBtn: '읽기', readerClose: '닫기 ✕', readerSource: '성경전서 개역한글판 · 대한성서공회', readerFail: '말씀을 불러오지 못했습니다. 인터넷 연결을 확인해 주세요.', readerTip: '👇 읽을 장을 <b>누르면</b> 말씀이 펼쳐집니다', rcOpen: '눌러서 읽기', rcClose: '접기', rcNext: '다음 읽기', verses: '절', updatedReload: '새 내용으로 바뀌었습니다', loadingShort: '불러오는 중…',
      meetings: '정기 모임', installTitle: '휴대폰 홈 화면에 소식지 추가', installSub: '앱처럼 한 번에 열 수 있어요', installed: '홈 화면에 추가되었습니다',
      iosTitle: '🍎 아이폰: 홈 화면에 추가하기', iosSteps: ['사파리 아래 <b>주소창 왼쪽 아이콘</b> {menu} 을 누르세요', '메뉴에서 <b>「공유」</b>를 누르세요', '목록을 위로 올려 <b>「홈 화면에 추가」</b>를 누르세요', '오른쪽 위 <b>「추가」</b>를 누르면 끝!'],
      andTitle: '🤖 안드로이드: 홈 화면에 추가하기', andSteps: ['크롬 오른쪽 위 <b>⋮ (점 3개)</b> 를 누르세요', '<b>「홈 화면에 추가」</b> 또는 <b>「앱 설치」</b>를 누르세요', '<b>「설치」</b>(또는 「추가」)를 누르면 끝!'],
      inappTitle: '먼저 사파리/크롬으로 열어 주세요', inappSteps: ['오른쪽 위(또는 아래) <b>메뉴</b>를 누르세요', '<b>「다른 브라우저로 열기」</b> 또는 <b>「Safari로 열기」</b>를 누르세요', '열린 화면에서 이 버튼을 다시 누르세요'], watchVideo: '주일말씀 영상 보기', watchLive: '지금 라이브로 보기', ytChannel: '교회 유튜브 채널 보기', ytOpen: '누르면 유튜브로 연결됩니다', monthlyServe: '이달의 봉사', thisWeekServe: '이번 주', nextWeekServe: '다음 주', today: '오늘',
    },
    en: {
      bulletin: 'Sunday Mobile Newsletter', textSize: 'Text size', settings: 'Language & text size', setTitle: 'Settings', welcome: 'Welcome! Choose your language and text size.', langLbl: 'Language', screenLbl: 'Display', done: 'Done', themeShort: { auto: 'Auto', light: 'Light', dark: 'Dark' }, sizeHint: 'Text too small? Tap a bigger “A” at the top right.', ok: 'Got it', themeN: { auto: 'Theme: Auto', light: 'Theme: Light', dark: 'Theme: Dark' }, textSizeN: ['Normal text', 'Large text', 'Extra large'],
      prev: 'Prev', next: 'Next', latest: 'Latest newsletter', thisWeek: 'This Sunday',
      sermon: "Sunday Message", scripture: 'Scripture', preacher: 'Speaker', hymns: 'Hymns & Songs', order: 'Full order of worship',
      memory: 'Memory Verse of the Week', present: 'Present', presentTip: 'Presentation for the sanctuary screen (new window)', practice: 'Practice', practiceHint: 'Tap a hidden word to reveal it.',
      news: 'Announcements', schedule: 'Schedule', serve: 'Volunteers', prayer: 'Prayer Requests', original: 'Original Newsletter',
      openOriginal: 'Open {lang} original', rawText: 'Show full newsletter text', findName: 'Find my name', findPh: 'Search by name',
      share: 'Share', qr: 'QR code', qrTitle: 'Scan with your phone camera to open', close: 'Close', toTop: 'Top',
      copied: 'Link copied', updated: 'Last updated', checked: 'Last checked',
      nav: { sermon: 'Message', memory: 'Memory', readings: 'Reading', news: 'News', schedule: 'Schedule', serve: 'Serve', prayer: 'Prayer' },
      none: 'Nothing this week.', noBulletin: "This week's newsletter isn't posted yet. It updates automatically on Saturday and Sunday.",
      fallback: 'No {lang} newsletter yet — showing {other}.', demo: 'Sample preview. It will switch to the real newsletter once connected.',
      offline: "You're offline — showing the saved newsletter.", loading: 'Loading…', noName: 'No matching name.',
      fromLang: '({lang})', sundayFmt: '{date}',
      location: 'Location', serviceTimes: 'Service times', fellowship: 'After service', memoryNext: 'Preview next week’s verse', memoryLast: 'Review last week’s verse', readings: 'This Week’s Meditation Chapters', readHint: 'Tap a day to read all of that day’s chapters (<b>NKJV</b>) on Bible Gateway', readBtn: 'Read', readerClose: 'Close ✕', readerSource: '', readerFail: 'Could not load the passage.', readerTip: '', rcOpen: 'Tap to read', rcClose: 'Close', rcNext: 'Next', verses: 'verses', updatedReload: 'Updated to the latest version', loadingShort: 'Loading…',
      meetings: 'Regular meetings', installTitle: 'Add newsletter to Home Screen', installSub: 'Open it like an app, in one tap', installed: 'Added to Home Screen',
      iosTitle: '🍎 iPhone: Add to Home Screen', iosSteps: ['Tap the <b>icon on the left of the address bar</b> {menu} at the bottom of Safari', 'Tap <b>“Share”</b> in the menu', 'Scroll up and tap <b>“Add to Home Screen”</b>', 'Tap <b>“Add”</b> at the top right. Done!'],
      andTitle: '🤖 Android: Add to Home Screen', andSteps: ['Tap <b>⋮ (3 dots)</b> at the top right of Chrome', 'Tap <b>“Add to Home screen”</b> or <b>“Install app”</b>', 'Tap <b>“Install”</b> (or “Add”). Done!'],
      inappTitle: 'Please open in Safari/Chrome first', inappSteps: ['Tap the <b>menu</b> at the top (or bottom) right', 'Tap <b>“Open in browser”</b> or <b>“Open in Safari”</b>', 'Then tap this button again'], watchVideo: 'Watch the sermon', watchLive: 'Watch live now', ytChannel: 'Church YouTube channel', ytOpen: 'Opens in YouTube', monthlyServe: 'This month', thisWeekServe: 'This week', nextWeekServe: 'Next week', today: 'Today',
    },
    es: {
      bulletin: 'Boletín Dominical Móvil', textSize: 'Tamaño de letra', settings: 'Idioma y letra', setTitle: 'Ajustes', welcome: '¡Bienvenido! Elija su idioma y tamaño de letra.', langLbl: 'Idioma', screenLbl: 'Pantalla', done: 'Listo', themeShort: { auto: 'Auto', light: 'Claro', dark: 'Oscuro' }, sizeHint: '¿Letra pequeña? Toque una “A” más grande arriba a la derecha.', ok: 'Entendido', themeN: { auto: 'Tema: automático', light: 'Tema: claro', dark: 'Tema: oscuro' }, textSizeN: ['Letra normal', 'Letra grande', 'Letra muy grande'],
      prev: 'Anterior', next: 'Siguiente', latest: 'Boletín más reciente', thisWeek: 'Este domingo',
      sermon: 'Mensaje Dominical', scripture: 'Texto', preacher: 'Predicador', hymns: 'Himnos y alabanzas', order: 'Orden del culto completo',
      memory: 'Versículo para memorizar', present: 'Presentar', presentTip: 'Presentación para la pantalla del santuario (nueva ventana)', practice: 'Practicar', practiceHint: 'Toca una palabra oculta para verla.',
      news: 'Anuncios', schedule: 'Calendario', serve: 'Voluntarios', prayer: 'Peticiones de oración', original: 'Boletín original',
      openOriginal: 'Ver original en {lang}', rawText: 'Ver todo el texto del boletín', findName: 'Buscar mi nombre', findPh: 'Buscar por nombre',
      share: 'Compartir', qr: 'Código QR', qrTitle: 'Escanea con la cámara del teléfono', close: 'Cerrar', toTop: 'Arriba',
      copied: 'Enlace copiado', updated: 'Última actualización', checked: 'Última revisión',
      nav: { sermon: 'Mensaje', memory: 'Memorizar', readings: 'Lectura', news: 'Anuncios', schedule: 'Calendario', serve: 'Servir', prayer: 'Oración' },
      none: 'Nada esta semana.', noBulletin: 'El boletín de esta semana aún no está publicado. Se actualiza automáticamente sábado y domingo.',
      fallback: 'Aún no hay boletín en {lang}; se muestra en {other}.', demo: 'Vista de ejemplo. Cambiará al boletín real cuando esté conectado.',
      offline: 'Sin conexión: se muestra el boletín guardado.', loading: 'Cargando…', noName: 'No se encontró el nombre.',
      fromLang: '({lang})', sundayFmt: '{date}',
      location: 'Lugar', serviceTimes: 'Horario', fellowship: 'Después del culto', memoryNext: 'Ver versículo de la próxima semana', memoryLast: 'Repasar versículo de la semana pasada', readings: 'Lectura de la semana', readHint: 'Toque un día para leer todos los capítulos (<b>RVR1960</b>) en Bible Gateway', readBtn: 'Leer', readerClose: 'Cerrar ✕', readerSource: '', readerFail: 'No se pudo cargar el pasaje.', readerTip: '', rcOpen: 'Toque para leer', rcClose: 'Cerrar', rcNext: 'Siguiente', verses: 'versículos', updatedReload: 'Actualizado a la última versión', loadingShort: 'Cargando…',
      meetings: 'Reuniones regulares', installTitle: 'Agregar boletín a la pantalla de inicio', installSub: 'Ábralo como una app, con un toque', installed: 'Agregado a la pantalla de inicio',
      iosTitle: '🍎 iPhone: Agregar a inicio', iosSteps: ['Toque el <b>ícono a la izquierda de la barra de dirección</b> {menu} abajo en Safari', 'Toque <b>«Compartir»</b> en el menú', 'Deslice y toque <b>«Agregar a inicio»</b>', 'Toque <b>«Agregar»</b> arriba a la derecha. ¡Listo!'],
      andTitle: '🤖 Android: Agregar a inicio', andSteps: ['Toque <b>⋮ (3 puntos)</b> arriba a la derecha en Chrome', 'Toque <b>«Agregar a la pantalla principal»</b> o <b>«Instalar app»</b>', 'Toque <b>«Instalar»</b> (o «Agregar»). ¡Listo!'],
      inappTitle: 'Primero ábralo en Safari/Chrome', inappSteps: ['Toque el <b>menú</b> arriba (o abajo) a la derecha', 'Toque <b>«Abrir en el navegador»</b> o <b>«Abrir en Safari»</b>', 'Luego toque este botón otra vez'], watchVideo: 'Ver el sermón', watchLive: 'Ver en vivo ahora', ytChannel: 'Canal de YouTube de la iglesia', ytOpen: 'Se abre en YouTube', monthlyServe: 'Este mes', thisWeekServe: 'Esta semana', nextWeekServe: 'Próxima semana', today: 'Hoy',
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
    sun: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2.5M12 19.5V22M4.2 4.2l1.8 1.8M18 18l1.8 1.8M2 12h2.5M19.5 12H22M4.2 19.8L6 18M18 6l1.8-1.8"/></svg>',
    moon: '<svg viewBox="0 0 24 24"><path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11z"/></svg>',
    auto: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>',
    play: '<svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" fill="currentColor" stroke="none"/></svg>',
    phone: '<svg viewBox="0 0 24 24"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M12 8v6M9 11l3 3 3-3M10.5 18.5h3"/></svg>',
    pageMenu: '<svg viewBox="0 0 24 24"><rect x="3" y="4.5" width="6.5" height="6.5" rx="1.2"/><path d="M13 6h8M13 9.5h8M3 14.5h18M3 19h12"/></svg>',
    iosShare: '<svg viewBox="0 0 24 24"><path d="M12 3v12M8 7l4-4 4 4"/><path d="M7 10H5.5v10.5h13V10H17"/></svg>',
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
    videos: null,
    sample: null,
  };

  // 언어 기억: localStorage + 쿠키(1년) 두 곳에 저장. 하나가 지워져도 기억합니다.
  function saveLang(l) {
    store('bb_lang', l);
    try { document.cookie = 'bb_lang=' + l + '; max-age=31536000; path=/; SameSite=Lax'; } catch (e) {}
  }
  function savedLang() {
    var s = store('bb_lang');
    if (LANGS.indexOf(s) !== -1) return s;
    var m = (document.cookie || '').match(/(?:^|;\s*)bb_lang=(ko|en|es)/);
    return m ? m[1] : null;
  }
  // 우선순위: ① 언어 링크(/ko/ /en/ /es/ 또는 ?lang=) → ② 내가 전에 고른 언어 → ③ 설정 → ④ 휴대폰 언어
  // 언어 링크로 들어오면 그 언어를 기억합니다. 주소창의 lang 표시는 바로 지워서 북마크가 언어를 고정하지 않게 합니다.
  // 홈 화면 앱으로 열었는지 (아이폰은 홈 화면 앱의 저장 공간이 사파리와 따로라서 주소의 lang으로 첫 언어를 정함)
  function launchedFromHome() {
    return params.get('source') === 'home' || (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true;
  }
  function pickLang() {
    var p = params.get('lang');
    if (LANGS.indexOf(p) !== -1) {
      // 홈 화면 앱: 앱 안에서 고른 언어가 있으면 그것을 우선 (처음엔 추가할 때의 언어로 열림)
      var sv = launchedFromHome() ? savedLang() : null;
      if (sv) return sv;
      saveLang(p); return p;
    }
    var s = savedLang();
    if (s) { saveLang(s); return s; }
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
  /* ── 화면 모드: 자동(휴대폰 설정 따름) → 밝게 → 어둡게 ── */
  function themeMode() { var m = store('bb_theme') || ((document.cookie.match(/(?:^|;\s*)bb_theme=(light|dark|auto)/) || [])[1]); return m === 'light' || m === 'dark' ? m : 'auto'; }
  function applyTheme(m) {
    if (m === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', m);
    var dark = m === 'dark' || (m === 'auto' && window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches);
    var meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.setAttribute('content', dark ? '#08294a' : '#005599');
    $('themeIco').innerHTML = ICONS[m === 'light' ? 'sun' : m === 'dark' ? 'moon' : 'auto'];
    $('themeLabel').textContent = T[state.lang].themeN[m];
    $('themeBtn').setAttribute('title', T[state.lang].themeN[m]);
    $('themeBtn').setAttribute('aria-label', T[state.lang].themeN[m]);
  }

  /* ── 아래 메뉴: 지금 보고 있는 칸 표시 ── */
  var activeSec = 'sec-sermon', secObserver = null;
  function observeSections(items) {
    if (!('IntersectionObserver' in window)) return;
    if (secObserver) secObserver.disconnect();
    secObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        activeSec = en.target.id;
        document.querySelectorAll('#bottomnav a').forEach(function (a) {
          if (a.getAttribute('data-sec') === activeSec) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    items.forEach(function (n) { secObserver.observe($(n[1])); });
  }

  /* ── 유튜브: 그 주일의 설교 영상 찾기 (videos.json은 GitHub Actions가 자동 갱신) ── */
  var YT_CHANNEL = 'https://www.youtube.com/@jbchlacentral';
  function loadVideos() {
    fetch('videos.json?t=' + Math.floor(Date.now() / 600000)).then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d && d.videos) { state.videos = d.videos; render(); } }).catch(function () {});
  }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim(); }
  function findVideo(b) {
    if (!b || !state.videos) return null;
    var start = Date.parse(b.date + 'T00:00:00Z'), end = start + 3 * 86400000;  // 주일 ~ 화요일 사이에 올라온 영상
    var v = state.view || {};
    var titles = LANGS.map(function (l) { return v[l] && norm(v[l].sermonTitle); }).filter(function (x) { return x && x.length > 2; });
    var preacher = norm((v.es || v.en || v.ko || {}).preacher || '').replace(/^p\.\s*/, '');
    var last = preacher.split(' ').pop();
    var best = null, bestScore = 0;
    state.videos.forEach(function (vd) {
      var t = Date.parse(vd.published);
      if (!(t >= start && t < end)) return;
      var nt = norm(vd.title), score = 0;
      titles.forEach(function (x) { if (nt.indexOf(x) !== -1) score += 3; });
      if (last && last.length > 1 && nt.indexOf(last) !== -1) score += 2;
      if (/ - (p|pr|pastor|rev)\.? /.test(nt + ' ')) score += 1;
      if (score >= 2 && score > bestScore) { best = vd; bestScore = score; }
    });
    return best;
  }
  function renderVideo(b) {
    var el = $('videoBlock');
    var vd = findVideo(b);
    if (vd) {
      el.innerHTML = '<a class="yt-card" href="https://www.youtube.com/watch?v=' + encodeURIComponent(vd.id) + '" target="_blank" rel="noopener">' +
        '<span class="yt-thumb"><img src="https://i.ytimg.com/vi/' + encodeURIComponent(vd.id) + '/mqdefault.jpg" alt="" loading="lazy"><span class="yt-play">' + ICONS.play + '</span></span>' +
        '<span class="yt-text"><b>' + esc(t('watchVideo')) + '</b><span class="yt-title">' + esc(vd.title) + '</span><small>YouTube ↗</small></span></a>';
      return;
    }
    // 주일 예배 시간(LA 오전 10시~오후 2시)에는 라이브 바로가기
    var la = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
    var todayISO = la.getFullYear() + '-' + String(la.getMonth() + 1).padStart(2, '0') + '-' + String(la.getDate()).padStart(2, '0');
    if (b && b.date === todayISO && la.getHours() >= 10 && la.getHours() < 14) {
      el.innerHTML = '<a class="yt-live" href="' + YT_CHANNEL + '/live" target="_blank" rel="noopener"><span class="dot"></span>' + esc(t('watchLive')) + ' <small>YouTube ↗</small></a>';
      return;
    }
    el.innerHTML = '';   // 관련 영상이 없으면 아무것도 표시하지 않음
  }

  function renderStatic() {
    var L = state.lang;
    applyTheme(themeMode());
    document.documentElement.lang = L;
    var church = CFG.CHURCH_NAME || (state.resp && state.resp.church) || {};
    var cname = church[L] || church.ko || '';
    document.title = cname;
    // 홈 화면 바로가기 이름도 언어에 맞게: 한국어 → LA 중앙교회 / English·Español → LA Central Church
    var appName = L === 'ko' ? 'LA 중앙교회' : 'LA Central Church';
    var mf = document.querySelector('link[rel="manifest"]');
    var mfHref = L === 'ko' ? 'manifest.webmanifest' : 'manifest.' + L + '.webmanifest';
    if (mf && mf.getAttribute('href') !== mfHref) mf.setAttribute('href', mfHref);
    var at = document.querySelector('meta[name="apple-mobile-web-app-title"]');
    if (at) at.setAttribute('content', appName);
    document.querySelectorAll('[data-church]').forEach(function (el) { el.textContent = cname; });
    document.querySelectorAll('[data-i18n]').forEach(function (el) { el.textContent = t(el.getAttribute('data-i18n')); });
    document.querySelectorAll('[data-ico]').forEach(function (el) { el.innerHTML = ICONS[el.getAttribute('data-ico')] || ''; el.setAttribute('aria-hidden', 'true'); });
    document.querySelectorAll('#langSeg button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === L)); });
    $('serveSearch').placeholder = t('findPh');
    $('sizeSeg').setAttribute('aria-label', T[L].textSize);
    $('sizeSeg').setAttribute('title', T[L].textSize);
    document.querySelectorAll('#sizeSeg button').forEach(function (bt) {
      var n = Number(bt.getAttribute('data-size'));
      bt.setAttribute('aria-pressed', String(n === state.size));
      bt.setAttribute('aria-label', T[L].textSizeN[n - 1]);
      bt.querySelector('.g').textContent = L === 'ko' ? '가' : 'A';
    });
    $('sizeHintText').textContent = T[L].sizeHint;
    $('presentBtn').title = T[L].presentTip; $('presentBtn').setAttribute('aria-label', T[L].presentTip);
    $('setFlag').innerHTML = FLAGS[L]; $('setG').textContent = L === 'ko' ? '가' : 'A';
    $('setBtn').setAttribute('aria-label', T[L].settings); $('setBtn').title = T[L].settings;
    if ($('setDialog').open) renderSettings();
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
    renderVideo(b);
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
    $('practiceBtn').hidden = !has(mt.v); $('presentBtn').hidden = !has(mt.v);
    var th = field('memoryVerseTheme');
    $('memoryTheme').textContent = th.v || '';
    $('memoryTheme').hidden = !has(th.v);
    var lt = field('memoryLastText'), lr = field('memoryLastRef');
    $('memoryLastBlock').hidden = !has(lt.v);
    $('memoryLastText').textContent = lt.v || '';
    $('memoryLastRef').textContent = has(lr.v) ? '— ' + nbh(lr.v) : '';
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
      var refsTxt = p.slice(1).join(' ');
      var refs = window.BibleReader ? BibleReader.parse(refsTxt) : [];
      var inner = '<span class="r-day">' + esc(p[0]) + (cur ? ' <em>' + esc(t('today')) + '</em>' : '') + '</span><span class="r-txt">' + esc(refsTxt) + '</span>';
      if (!refs.length) return '<li' + (cur ? ' class="today"' : '') + '>' + inner + '</li>';
      var go = '<span class="r-go">' + esc(t('readBtn')) + ' ' + (readLang() === 'ko' ? '›' : '↗') + '</span>';
      return '<li' + (cur ? ' class="today"' : '') + '>' + (readLang() === 'ko'
        ? '<button type="button" class="r-link" data-day="' + esc(p[0]) + '" data-refs="' + esc(refsTxt) + '">' + inner + go + '</button>'
        : '<a class="r-link" href="' + esc(BibleReader.gatewayUrl(refs, readLang())) + '" target="_blank" rel="noopener">' + inner + go + '</a>') + '</li>';
    });
    $('readHint').innerHTML = has(field('readings').v) && window.BibleReader ? t('readHint') : '';


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

    renderServe(b);
    list('prayer', 'prayer', 'sec-prayer', function (s) { return '<li>' + esc(s) + '</li>'; });


    // 바로가기 (위쪽 + 아래쪽 메뉴)
    var navItems = NAV.filter(function (n) { return !$(n[1]).hidden; });
    $('quicknav').innerHTML = navItems.map(function (n) {
      return '<a href="#' + n[1] + '">' + ico(n[2]) + '<span>' + esc(T[L].nav[n[0]]) + '</span></a>';
    }).join('');
    $('bottomnav').innerHTML = navItems.map(function (n) {
      return '<a href="#' + n[1] + '" data-sec="' + n[1] + '"' + (n[1] === activeSec ? ' aria-current="true"' : '') + '>' + ico(n[2]) + '<span>' + esc(T[L].nav[n[0]]) + '</span></a>';
    }).join('');
    observeSections(navItems);

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

  /* ── 봉사 안내: 역할마다 이번 주 / 다음 주를 함께 표시 ── */
  function shortDate(iso, add) {
    if (!iso) return '';
    var d = new Date(iso + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + add);
    return (d.getUTCMonth() + 1) + '/' + d.getUTCDate();
  }
  // 봉사 종류별 색·아이콘 (한국어·영어·스페인어 이름 모두 인식)
  var SERVE_CATS = [
    ['memory', '📖', /암송|memory verse|recitaci|versícul|versicul/i],
    ['meal', '🍚', /식사|설거지|lunch|dishes|comida|trastes|meal|kitchen|cocina/i],
    ['child', '👶', /유아|영아|toddler|nursery|child|guarder|niños|ninos/i],
    ['safety', '🛡️', /안전|주차|security|parking|seguridad|estacionamiento/i],
    ['guide', '🙋', /안내|정문|본당|greet|usher|entrance|main hall|guía|guia|entrada|santuario|bienvenida/i],
  ];
  function serveCat(role) {
    for (var i = 0; i < SERVE_CATS.length; i++) if (SERVE_CATS[i][2].test(role)) return SERVE_CATS[i];
    return ['other', '🤝'];
  }

  /* ── 묵상 말씀 읽기 ── */
  function readLang() { var l = langData().lang; return l === 'ko' || l === 'es' ? l : 'en'; }
  function openReader(day, refsTxt) {
    var refs = BibleReader.parse(refsTxt);
    $('readerDay').textContent = day;
    $('readerRefs').textContent = refs.map(function (r) { return BibleReader.label(r, 'ko'); }).join(' · ');
    $('readerClose').textContent = t('readerClose');
    $('readerBody').innerHTML = '<p class="reader-loading">' + esc(t('loadingShort')) + '</p>';
    $('readerDialog').showModal();
    $('readerBody').scrollTop = 0;
    BibleReader.loadKorean(refs).then(function (parts) {
      // 장마다 접어 두고, 누르면 그 장만 펼침 (한 번에 한 장)
      var items = [];
      parts.forEach(function (part) {
        part.chapters.forEach(function (ch) { items.push({ name: part.book + ' ' + ch.c + (part.book === '시편' ? '편' : '장'), ch: ch }); });
      });
      var html = items.map(function (it, i) {
        var next = items[i + 1];
        return '<details class="rc" data-i="' + i + '">' +
          '<summary><span class="rc-num">' + (i + 1) + '</span><span class="rc-name">' + esc(it.name) +
          '<small>' + it.ch.verses.length + t('verses') + '</small></span>' +
          '<span class="rc-act"><span class="rc-open">' + esc(t('rcOpen')) + ' ▼</span><span class="rc-close">' + esc(t('rcClose')) + ' ▲</span></span></summary>' +
          '<div class="rc-body"><p>' + it.ch.verses.map(function (v) { return '<span class="vn">' + v.n + '</span>' + esc(v.t); }).join(' ') + '</p>' +
          '<div class="rc-foot">' + (next ? '<button type="button" class="rc-next" data-next="' + (i + 1) + '">' + esc(t('rcNext')) + ': ' + esc(next.name) + ' ▶</button>' : '') +
          '<button type="button" class="rc-fold" data-fold="' + i + '">' + esc(t('rcClose')) + ' ▲</button></div></div></details>';
      }).join('');
      $('readerBody').innerHTML = (t('readerTip') ? '<p class="reader-tip">' + t('readerTip') + '</p>' : '') + html + '<p class="reader-src">' + esc(t('readerSource')) + '</p>';
    }).catch(function () {
      $('readerBody').innerHTML = '<p class="reader-loading">' + esc(t('readerFail')) + '</p>';
    });
  }

  function renderServe(b) {
    var cur = field('volunteers').v || [], nxt = field('volunteersNext').v || [], mon = field('volunteersMonthly').v || [];
    var order = [], map = {};
    function add(list, which) {
      list.forEach(function (s) {
        var p = split(s);
        var role = p.length > 1 ? p[0] : '', names = p.length > 1 ? p.slice(1).join(', ') : s;
        if (!map[role]) { map[role] = { cur: '', nxt: '' }; order.push(role); }
        map[role][which] = map[role][which] ? map[role][which] + ', ' + names : names;
      });
    }
    add(cur, 'cur'); add(nxt, 'nxt');
    var hasNext = nxt.length > 0;
    var dCur = b ? shortDate(b.date, 0) : '', dNxt = b ? shortDate(b.date, 7) : '';
    var lblCur = esc(t('thisWeekServe')) + (dCur ? ' <b>' + dCur + '</b>' : '');
    var lblNxt = esc(t('nextWeekServe')) + (dNxt ? ' <b>' + dNxt + '</b>' : '');
    $('serve').innerHTML = order.map(function (role) {
      var m = map[role];
      var s = (role + ' ' + m.cur + ' ' + m.nxt).toLowerCase();
      var cat = serveCat(role);
      return '<li class="serve-item sc-' + cat[0] + '" data-s="' + esc(s) + '">' +
        (role ? '<div class="si-role"><span class="si-emoji" aria-hidden="true">' + cat[1] + '</span><span class="hl">' + esc(role) + '</span></div>' : '') +
        '<div class="si-weeks' + (hasNext ? '' : ' one') + '">' +
        '<div class="si-row cur"><span class="wk">' + lblCur + '</span><span class="si-names hl">' + esc(m.cur || '—') + '</span></div>' +
        (hasNext ? '<div class="si-row nxt"><span class="wk">' + lblNxt + '</span><span class="si-names hl">' + esc(m.nxt || '—') + '</span></div>' : '') +
        '</div></li>';
    }).join('');
    $('serveMonthlyBlock').hidden = !mon.length;
    $('serveMonthly').innerHTML = mon.map(function (s) {
      var p = split(s);
      var cat = serveCat(p[0]);
      return '<li class="sc-' + cat[0] + '" data-s="' + esc(s.toLowerCase()) + '"><span class="serve-role"><span class="si-emoji" aria-hidden="true">' + cat[1] + '</span><span class="hl">' + esc(p[0]) + '</span></span><span class="serve-names hl">' + esc(p.slice(1).join(', ')) + '</span></li>';
    }).join('');
    $('sec-serve').hidden = !order.length && !mon.length;
    $('serveSearchWrap').hidden = order.length + mon.length < 5;
    filterServe();
  }

  function filterServe() {
    var q = ($('serveSearch').value || '').trim().toLowerCase();
    var any = false;
    document.querySelectorAll('#serve > li, #serveMonthly > li').forEach(function (li) {
      var hit = !q || li.getAttribute('data-s').indexOf(q) !== -1;
      li.hidden = !hit; if (hit) any = true;
      li.querySelectorAll('.hl').forEach(function (sp) {
        var txt = sp.textContent;
        sp.innerHTML = q && hit ? esc(txt).replace(new RegExp(q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), '<mark>$&</mark>') : esc(txt);
      });
    });
    var msg = $('serve').querySelector('.nomatch'); if (msg) msg.remove();
    if (q && !any) $('serve').insertAdjacentHTML('beforeend', '<li class="full nomatch"><span class="empty">' + esc(t('noName')) + '</span></li>');
  }

  function syncUrl() {
    // 보고 있는 언어를 주소에 남겨 둠: 카톡 → 사파리/크롬으로 열기, 홈 화면에 추가할 때 언어가 그대로 따라감
    var p = new URLSearchParams(location.search);
    p.set('lang', state.lang);
    p.delete('source');
    if (state.week && state.weeks[0] !== state.week) p.set('week', state.week); else p.delete('week');
    p.delete('size');
    var q = p.toString();
    var u = location.pathname + (q ? '?' + q : '') + location.hash;
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
    return location.origin + location.pathname;
  }

  /* ── 이벤트 ── */
  /* ── 언어 · 글씨 크기 · 화면 설정 (위쪽 버튼과 설정 창이 함께 씀) ── */
  var FLAGS = {"ko": "<svg class=\"flag\" width=\"26\" height=\"17\" viewBox=\"0 0 30 20\" aria-hidden=\"true\"><rect width=\"30\" height=\"20\" fill=\"#fff\"/><g transform=\"translate(15 10) rotate(33.7)\"><path d=\"M-5 0a5 5 0 0 1 10 0z\" fill=\"#cd2e3a\"/><path d=\"M-5 0a5 5 0 0 0 10 0z\" fill=\"#0047a0\"/><circle cx=\"-2.5\" r=\"2.5\" fill=\"#cd2e3a\"/><circle cx=\"2.5\" r=\"2.5\" fill=\"#0047a0\"/></g><g fill=\"#111\"><g transform=\"translate(6.3 4.3) rotate(-56.3)\"><rect x=\"-2.2\" y=\"-1.6\" width=\"4.4\" height=\".8\"/><rect x=\"-2.2\" y=\"-0.3\" width=\"4.4\" height=\".8\"/><rect x=\"-2.2\" y=\"1.0\" width=\"4.4\" height=\".8\"/></g><g transform=\"translate(23.7 15.7) rotate(-56.3)\"><rect x=\"-2.2\" y=\"-1.6\" width=\"1.9\" height=\".8\"/><rect x=\".3\" y=\"-1.6\" width=\"1.9\" height=\".8\"/><rect x=\"-2.2\" y=\"-0.3\" width=\"1.9\" height=\".8\"/><rect x=\".3\" y=\"-0.3\" width=\"1.9\" height=\".8\"/><rect x=\"-2.2\" y=\"1.0\" width=\"1.9\" height=\".8\"/><rect x=\".3\" y=\"1.0\" width=\"1.9\" height=\".8\"/></g><g transform=\"translate(23.7 4.3) rotate(56.3)\"><rect x=\"-2.2\" y=\"-1.6\" width=\"1.9\" height=\".8\"/><rect x=\".3\" y=\"-1.6\" width=\"1.9\" height=\".8\"/><rect x=\"-2.2\" y=\"-0.3\" width=\"4.4\" height=\".8\"/><rect x=\"-2.2\" y=\"1.0\" width=\"1.9\" height=\".8\"/><rect x=\".3\" y=\"1.0\" width=\"1.9\" height=\".8\"/></g><g transform=\"translate(6.3 15.7) rotate(56.3)\"><rect x=\"-2.2\" y=\"-1.6\" width=\"4.4\" height=\".8\"/><rect x=\"-2.2\" y=\"-0.3\" width=\"1.9\" height=\".8\"/><rect x=\".3\" y=\"-0.3\" width=\"1.9\" height=\".8\"/><rect x=\"-2.2\" y=\"1.0\" width=\"4.4\" height=\".8\"/></g></g></svg>", "en": "<svg class=\"flag\" width=\"26\" height=\"17\" viewBox=\"0 0 30 20\" aria-hidden=\"true\"><rect width=\"30\" height=\"20\" fill=\"#fff\"/><rect y=\"0.00\" width=\"30\" height=\"1.54\" fill=\"#b22234\"/><rect y=\"3.08\" width=\"30\" height=\"1.54\" fill=\"#b22234\"/><rect y=\"6.15\" width=\"30\" height=\"1.54\" fill=\"#b22234\"/><rect y=\"9.23\" width=\"30\" height=\"1.54\" fill=\"#b22234\"/><rect y=\"12.31\" width=\"30\" height=\"1.54\" fill=\"#b22234\"/><rect y=\"15.38\" width=\"30\" height=\"1.54\" fill=\"#b22234\"/><rect y=\"18.46\" width=\"30\" height=\"1.54\" fill=\"#b22234\"/><rect width=\"13\" height=\"10.77\" fill=\"#3c3b6e\"/><circle cx=\"1.6\" cy=\"1.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"4.0\" cy=\"1.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"6.4\" cy=\"1.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"8.8\" cy=\"1.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"11.2\" cy=\"1.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"2.8\" cy=\"3.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"5.2\" cy=\"3.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"7.6\" cy=\"3.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"10.0\" cy=\"3.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"1.6\" cy=\"5.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"4.0\" cy=\"5.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"6.4\" cy=\"5.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"8.8\" cy=\"5.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"11.2\" cy=\"5.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"2.8\" cy=\"7.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"5.2\" cy=\"7.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"7.6\" cy=\"7.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"10.0\" cy=\"7.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"1.6\" cy=\"9.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"4.0\" cy=\"9.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"6.4\" cy=\"9.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"8.8\" cy=\"9.4\" r=\".45\" fill=\"#fff\"/><circle cx=\"11.2\" cy=\"9.4\" r=\".45\" fill=\"#fff\"/></svg>", "es": "<svg class=\"flag\" width=\"26\" height=\"17\" viewBox=\"0 0 30 20\" aria-hidden=\"true\"><rect width=\"10\" height=\"20\" fill=\"#006847\"/><rect x=\"10\" width=\"10\" height=\"20\" fill=\"#fff\"/><rect x=\"20\" width=\"10\" height=\"20\" fill=\"#ce1126\"/><circle cx=\"15\" cy=\"10\" r=\"2.7\" fill=\"#8c5a2b\"/><path d=\"M12.6 11.4q2.4 2.2 4.8 0\" fill=\"none\" stroke=\"#2e7d32\" stroke-width=\".7\"/></svg>"};
  function setLang(l) {
    state.lang = l; saveLang(l); store('bb_setup', '1');
    if (goWithLang()) return;   // 카톡 등 앱 안 브라우저: 주소를 실제로 바꿔 다시 열기
    render();
  }
  function setSize(n) {
    state.size = n; store('bb_size', String(n)); store('bb_hint', '1'); store('bb_setup', '1');
    $('sizeHint').hidden = true;
    renderStatic(); measure();
    if (!$('setDialog').open) toast(T[state.lang].textSizeN[n - 1]);
  }
  function setTheme(m) {
    store('bb_theme', m);
    try { document.cookie = 'bb_theme=' + m + '; max-age=31536000; path=/; SameSite=Lax'; } catch (e) {}
    applyTheme(m); if ($('setDialog').open) renderSettings();
  }
  function renderSettings() {
    var L = T[state.lang], g = state.lang === 'ko' ? '가' : 'A';
    $('setTitle').textContent = L.setTitle; $('setWelcome').textContent = L.welcome;
    $('setHLang').textContent = L.langLbl; $('setHSize').textContent = L.textSize; $('setHTheme').textContent = L.screenLbl;
    $('setDone').textContent = L.done;
    $('setLangs').innerHTML = LANGS.map(function (l) { return '<button type="button" data-lang="' + l + '" lang="' + l + '" aria-pressed="' + (l === state.lang) + '">' + FLAGS[l] + '<span>' + LANG_NAME[l] + '</span></button>'; }).join('');
    $('setSizes').innerHTML = [1, 2, 3].map(function (n) { return '<button type="button" data-size="' + n + '" aria-pressed="' + (n === state.size) + '"><span class="sz" style="font-size:' + [18, 25, 33][n - 1] + 'px">' + g + '</span><span>' + esc(L.textSizeN[n - 1]) + '</span></button>'; }).join('');
    var tm = themeMode();
    $('setThemes').innerHTML = ['auto', 'light', 'dark'].map(function (m) { return '<button type="button" data-theme="' + m + '" aria-pressed="' + (m === tm) + '">' + ICONS[m === 'light' ? 'sun' : m === 'dark' ? 'moon' : 'auto'] + '<span>' + esc(L.themeShort[m]) + '</span></button>'; }).join('');
  }
  function openSettings(first) { $('setWelcome').hidden = !first; renderSettings(); if (!$('setDialog').open) $('setDialog').showModal(); }
  $('setBtn').addEventListener('click', function () { openSettings(false); });
  $('setDone').addEventListener('click', function () { $('setDialog').close(); });
  $('setDialog').addEventListener('close', function () { store('bb_setup', '1'); store('bb_hint', '1'); });
  $('setDialog').addEventListener('click', function (e) { if (e.target === $('setDialog')) $('setDialog').close(); });
  $('setLangs').addEventListener('click', function (e) { var b = e.target.closest('[data-lang]'); if (b) setLang(b.getAttribute('data-lang')); });
  $('setSizes').addEventListener('click', function (e) { var b = e.target.closest('[data-size]'); if (b) { setSize(Number(b.getAttribute('data-size'))); renderSettings(); } });
  $('setThemes').addEventListener('click', function (e) { var b = e.target.closest('[data-theme]'); if (b) setTheme(b.getAttribute('data-theme')); });
  document.querySelectorAll('#langSeg button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  document.querySelectorAll('#sizeSeg button').forEach(function (bt) {
    bt.addEventListener('click', function () { setSize(Number(bt.getAttribute('data-size'))); });
  });
  // 처음 방문한 분께만 설정 창을 한 번 열어 언어와 글씨 크기를 고르게 함 (예전 안내를 이미 본 분은 제외)
  if (!store('bb_setup') && !store('bb_hint')) setTimeout(function () { openSettings(true); }, 700);
  $('sizeHintClose').addEventListener('click', function () { $('sizeHint').hidden = true; store('bb_hint', '1'); });
  $('prevWeek').addEventListener('click', function () { var i = state.weeks.indexOf(state.week); if (i < state.weeks.length - 1) load(state.weeks[i + 1]); });
  $('nextWeek').addEventListener('click', function () { var i = state.weeks.indexOf(state.week); if (i > 0) load(state.weeks[i - 1]); });
  // 대강당 스크린용 발표 화면 (새 창): 한국어 → 스페인어 → 영어
  $('presentBtn').addEventListener('click', function () {
    var p = new URLSearchParams(); if (state.week) p.set('week', state.week); p.set('which', 'this'); p.set('lang', state.lang);
    var w = window.open('present.html?' + p.toString(), 'lacc-present');
    if (!w) location.href = 'present.html?' + p.toString();
  });
  $('practiceBtn').addEventListener('click', function () { state.practice = !state.practice; renderVerse(field('memoryVerseText').v || ''); });
  $('memoryText').addEventListener('click', function (e) { if (e.target.classList.contains('h')) e.target.classList.remove('h'); });
  $('memoryText').addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('h')) { e.preventDefault(); e.target.classList.remove('h'); } });
  $('serveSearch').addEventListener('input', filterServe);
  $('readings').addEventListener('click', function (e) {
    var bt = e.target.closest('button.r-link');
    if (bt) openReader(bt.getAttribute('data-day'), bt.getAttribute('data-refs'));
  });
  $('readerClose').addEventListener('click', function () { $('readerDialog').close(); });
  function openChapter(i) {
    var all = $('readerBody').querySelectorAll('details.rc');
    all.forEach(function (d, k) { d.open = k === i; });
    var d = all[i];
    if (d) setTimeout(function () { d.scrollIntoView({ block: 'start', behavior: 'smooth' }); }, 30);
  }
  $('readerBody').addEventListener('click', function (e) {
    var sm = e.target.closest('details.rc > summary');
    if (sm) {
      e.preventDefault();
      var d = sm.parentElement, i = Number(d.getAttribute('data-i'));
      if (d.open) d.open = false; else openChapter(i);
      return;
    }
    var nx = e.target.closest('.rc-next');
    if (nx) { openChapter(Number(nx.getAttribute('data-next'))); return; }
    var fd = e.target.closest('.rc-fold');
    if (fd) { var dd = $('readerBody').querySelectorAll('details.rc')[Number(fd.getAttribute('data-fold'))]; dd.open = false; dd.scrollIntoView({ block: 'nearest' }); }
  });
  $('readerDialog').addEventListener('click', function (e) { if (e.target === $('readerDialog')) $('readerDialog').close(); });
  $('themeBtn').addEventListener('click', function () {
    var next = { auto: 'light', light: 'dark', dark: 'auto' }[themeMode()];
    setTheme(next);
    toast(T[state.lang].themeN[next]);
  });
  if (window.matchMedia) { var mq = matchMedia('(prefers-color-scheme: dark)'); if (mq.addEventListener) mq.addEventListener('change', function () { applyTheme(themeMode()); }); }
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
  /* ── 다시 열었을 때 자동 새로고침 ──
   * 홈 화면 앱은 닫아도 메모리에 남아 있다가 그대로 다시 보여서, 바뀐 내용이 안 보일 수 있습니다.
   * 앱으로 돌아올 때마다 ① 사이트 파일이 바뀌었는지 확인해 바뀌었으면 페이지를 다시 불러오고
   * ② 소식지·영상 데이터는 항상 새로 가져옵니다. */
  var APP_FILES = ['index.html', 'app.js', 'styles.css', 'lacc-parser.js', 'bible.js'];
  var fileSigs = null, lastResume = Date.now();
  function readSigs() {
    return Promise.all(APP_FILES.map(function (f) {
      return fetch(f + '?v=' + Date.now(), { method: 'HEAD', cache: 'no-store' }).then(function (r) {
        return r.ok ? (r.headers.get('etag') || r.headers.get('last-modified') || '') : '';
      }).catch(function () { return ''; });
    })).then(function (a) { return a.join('|'); });
  }
  function checkForNewVersion() {
    return readSigs().then(function (sig) {
      if (!sig.replace(/\|/g, '')) return false;            // 오프라인 등
      if (fileSigs === null) { fileSigs = sig; return false; }
      if (sig !== fileSigs) { store('bb_updated', '1'); location.reload(); return true; }
      return false;
    });
  }
  function onResume() {
    if (document.hidden) return;
    var away = Date.now() - lastResume; lastResume = Date.now();
    checkForNewVersion().then(function (reloaded) {
      if (reloaded) return;
      if (!state.week || state.weeks[0] === state.week || away > 6 * 3600 * 1000) load(away > 6 * 3600 * 1000 ? '' : state.week === state.weeks[0] ? '' : state.week);
      loadVideos();
    });
  }
  document.addEventListener('visibilitychange', onResume);
  window.addEventListener('pageshow', function (e) { if (e.persisted) onResume(); });
  window.addEventListener('focus', function () { if (Date.now() - lastResume > 60000) onResume(); });
  setTimeout(function () { readSigs().then(function (s) { fileSigs = s; }); }, 1500);
  if (store('bb_updated')) { store('bb_updated', ''); try { localStorage.removeItem('bb_updated'); } catch (e) {} setTimeout(function () { toast(t('updatedReload')); }, 600); }

  /* ── 홈 화면에 추가 ── */
  var deferredPrompt = null;
  var UA = navigator.userAgent || '';
  var isIOS = /iPhone|iPad|iPod/.test(UA) || (/Macintosh/.test(UA) && navigator.maxTouchPoints > 1);
  var isKakao = /KAKAOTALK/i.test(UA);
  var isInApp = isKakao || /FBAN|FBAV|Instagram|Line\/|NAVER\(inapp|DaumApps|Band\//i.test(UA);
  /* 카톡 등 앱 안 브라우저는 주소를 조용히 바꾸면(replaceState) 새 주소를 모릅니다.
   * 「다른 브라우저로 열기」에 언어가 따라가도록, 주소의 lang이 지금 언어와 다르면 그 주소로 실제로 다시 엽니다. */
  function goWithLang() {
    if (!isInApp) return false;
    var p = new URLSearchParams(location.search);
    if (p.get('lang') === state.lang) return false;
    p.set('lang', state.lang); p.delete('source');
    location.replace(location.pathname + '?' + p.toString() + location.hash);
    return true;
  }
  function isStandalone() { return (window.matchMedia && matchMedia('(display-mode: standalone)').matches) || navigator.standalone === true; }
  function updateInstallBtn() { $('installBtn').hidden = isStandalone(); }
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferredPrompt = e; updateInstallBtn(); });
  window.addEventListener('appinstalled', function () { deferredPrompt = null; $('installBtn').hidden = true; toast(t('installed')); });
  function showGuide(kind) {
    var L = T[state.lang];
    $('insTitle').textContent = L[kind + 'Title'];
    $('insSteps').innerHTML = L[kind + 'Steps'].map(function (s) {
      return '<li>' + s.replace('{share}', '<span class="ins-ico">' + ICONS.iosShare + '</span>').replace('{menu}', '<span class="ins-ico">' + ICONS.pageMenu + '</span>') + '</li>';
    }).join('');
    $('installDialog').showModal();
  }
  $('installBtn').addEventListener('click', function () {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function () { deferredPrompt = null; }).catch(function () {});
      return;
    }
    if (isKakao) { location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(location.href.split('#')[0]); setTimeout(function () { showGuide('inapp'); }, 800); return; }
    if (isInApp) { showGuide('inapp'); return; }
    showGuide(isIOS ? 'ios' : 'and');
  });
  $('insClose').addEventListener('click', function () { $('installDialog').close(); });
  updateInstallBtn();
  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js', { updateViaCache: 'none' }).then(function (reg) { if (reg && reg.update) reg.update(); }).catch(function () {});
    });
  }

  if (goWithLang()) return;
  renderStatic();
  load(state.week);
  loadVideos();
})();
