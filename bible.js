/*
 * 묵상 말씀 읽기
 *  - "겔 34-35, 시 17, 빌 3" / "Ezekiel 34-35, Psalms 17" / "Ezequiel 34-35, Salmo 17" → 성경 구절 목록
 *  - 한국어: 이 사이트에 있는 개역한글(bible/krv) 본문을 바로 보여 줌
 *  - 영어·스페인어: Bible Gateway에서 NKJV / RVR1960으로 한 페이지에 모두 보여 줌
 *    (성구암송에 쓰인 번역본과 같은 판)
 */
(function (root) {
  'use strict';

  // [영어(Bible Gateway 검색), 파일명, 한국어, 한국어 약어, 스페인어]
  var BOOKS = [
    ['Genesis', 'Genesis', '창세기', '창', 'Génesis'], ['Exodus', 'Exodus', '출애굽기', '출', 'Éxodo'],
    ['Leviticus', 'Leviticus', '레위기', '레', 'Levítico'], ['Numbers', 'Numbers', '민수기', '민', 'Números'],
    ['Deuteronomy', 'Deuteronomy', '신명기', '신', 'Deuteronomio'], ['Joshua', 'Joshua', '여호수아', '수', 'Josué'],
    ['Judges', 'Judges', '사사기', '삿', 'Jueces'], ['Ruth', 'Ruth', '룻기', '룻', 'Rut'],
    ['1 Samuel', '1Samuel', '사무엘상', '삼상', '1 Samuel'], ['2 Samuel', '2Samuel', '사무엘하', '삼하', '2 Samuel'],
    ['1 Kings', '1Kings', '열왕기상', '왕상', '1 Reyes'], ['2 Kings', '2Kings', '열왕기하', '왕하', '2 Reyes'],
    ['1 Chronicles', '1Chronicles', '역대상', '대상', '1 Crónicas'], ['2 Chronicles', '2Chronicles', '역대하', '대하', '2 Crónicas'],
    ['Ezra', 'Ezra', '에스라', '스', 'Esdras'], ['Nehemiah', 'Nehemiah', '느헤미야', '느', 'Nehemías'],
    ['Esther', 'Esther', '에스더', '에', 'Ester'], ['Job', 'Job', '욥기', '욥', 'Job'],
    ['Psalm', 'Psalms', '시편', '시', 'Salmos'], ['Proverbs', 'Proverbs', '잠언', '잠', 'Proverbios'],
    ['Ecclesiastes', 'Ecclesiastes', '전도서', '전', 'Eclesiastés'], ['Song of Solomon', 'SongofSolomon', '아가', '아', 'Cantares'],
    ['Isaiah', 'Isaiah', '이사야', '사', 'Isaías'], ['Jeremiah', 'Jeremiah', '예레미야', '렘', 'Jeremías'],
    ['Lamentations', 'Lamentations', '예레미야애가', '애', 'Lamentaciones'], ['Ezekiel', 'Ezekiel', '에스겔', '겔', 'Ezequiel'],
    ['Daniel', 'Daniel', '다니엘', '단', 'Daniel'], ['Hosea', 'Hosea', '호세아', '호', 'Oseas'],
    ['Joel', 'Joel', '요엘', '욜', 'Joel'], ['Amos', 'Amos', '아모스', '암', 'Amós'],
    ['Obadiah', 'Obadiah', '오바댜', '옵', 'Abdías'], ['Jonah', 'Jonah', '요나', '욘', 'Jonás'],
    ['Micah', 'Micah', '미가', '미', 'Miqueas'], ['Nahum', 'Nahum', '나훔', '나', 'Nahúm'],
    ['Habakkuk', 'Habakkuk', '하박국', '합', 'Habacuc'], ['Zephaniah', 'Zephaniah', '스바냐', '습', 'Sofonías'],
    ['Haggai', 'Haggai', '학개', '학', 'Hageo'], ['Zechariah', 'Zechariah', '스가랴', '슥', 'Zacarías'],
    ['Malachi', 'Malachi', '말라기', '말', 'Malaquías'], ['Matthew', 'Matthew', '마태복음', '마', 'Mateo'],
    ['Mark', 'Mark', '마가복음', '막', 'Marcos'], ['Luke', 'Luke', '누가복음', '눅', 'Lucas'],
    ['John', 'John', '요한복음', '요', 'Juan'], ['Acts', 'Acts', '사도행전', '행', 'Hechos'],
    ['Romans', 'Romans', '로마서', '롬', 'Romanos'], ['1 Corinthians', '1Corinthians', '고린도전서', '고전', '1 Corintios'],
    ['2 Corinthians', '2Corinthians', '고린도후서', '고후', '2 Corintios'], ['Galatians', 'Galatians', '갈라디아서', '갈', 'Gálatas'],
    ['Ephesians', 'Ephesians', '에베소서', '엡', 'Efesios'], ['Philippians', 'Philippians', '빌립보서', '빌', 'Filipenses'],
    ['Colossians', 'Colossians', '골로새서', '골', 'Colosenses'], ['1 Thessalonians', '1Thessalonians', '데살로니가전서', '살전', '1 Tesalonicenses'],
    ['2 Thessalonians', '2Thessalonians', '데살로니가후서', '살후', '2 Tesalonicenses'], ['1 Timothy', '1Timothy', '디모데전서', '딤전', '1 Timoteo'],
    ['2 Timothy', '2Timothy', '디모데후서', '딤후', '2 Timoteo'], ['Titus', 'Titus', '디도서', '딛', 'Tito'],
    ['Philemon', 'Philemon', '빌레몬서', '몬', 'Filemón'], ['Hebrews', 'Hebrews', '히브리서', '히', 'Hebreos'],
    ['James', 'James', '야고보서', '약', 'Santiago'], ['1 Peter', '1Peter', '베드로전서', '벧전', '1 Pedro'],
    ['2 Peter', '2Peter', '베드로후서', '벧후', '2 Pedro'], ['1 John', '1John', '요한일서', '요일', '1 Juan'],
    ['2 John', '2John', '요한이서', '요이', '2 Juan'], ['3 John', '3John', '요한삼서', '요삼', '3 Juan'],
    ['Jude', 'Jude', '유다서', '유', 'Judas'], ['Revelation', 'Revelation', '요한계시록', '계', 'Apocalipsis'],
  ];

  function key(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/^san\s+/, '').replace(/[\s.]/g, '').replace(/^i{1,3}(?=[a-z])/, function (m) { return String(m.length); });
  }
  var INDEX = {};
  BOOKS.forEach(function (b, i) {
    [b[0], b[1], b[2], b[3], b[4]].forEach(function (n) { INDEX[key(n)] = i; });
  });
  // 자주 쓰는 다른 이름들
  [['psalms', 18], ['ps', 18], ['psa', 18], ['salmo', 18], ['songofsongs', 21], ['song', 21], ['cantardeloscantares', 21],
   ['revelations', 65], ['apoc', 65], ['matt', 39], ['mt', 39], ['mk', 40], ['lk', 41], ['jn', 42], ['rom', 44],
   ['gen', 0], ['ex', 1], ['isa', 22], ['jer', 23], ['ezek', 25], ['dan', 26], ['phil', 49], ['heb', 57], ['rev', 65]]
    .forEach(function (p) { INDEX[p[0]] = p[1]; });

  /* "겔 34-35, 시 17, 빌 3" → [{book, c1, c2, v1, v2}] */
  function parse(str) {
    var out = [];
    String(str || '').split(/[,;，]/).forEach(function (part) {
      part = part.trim();
      if (!part) return;
      var m = part.match(/^((?:[1-3]\s*)?[^\d]+?)\s*(\d{1,3})(?:\s*(?:장|편))?(?:\s*[:：]\s*(\d{1,3}))?(?:\s*(?:절)?\s*[-~–—]\s*(\d{1,3})(?:\s*[:：]\s*(\d{1,3}))?)?\s*(?:장|편|절)?$/);
      if (!m) {
        // "34-35"처럼 책 이름 없이 이어지는 경우: 앞 책을 이어 씀
        var n = part.match(/^(\d{1,3})(?:\s*[-~–]\s*(\d{1,3}))?$/);
        if (n && out.length) out.push({ book: out[out.length - 1].book, c1: +n[1], c2: +(n[2] || n[1]) });
        return;
      }
      var bi = INDEX[key(m[1])];
      if (bi == null) return;
      var c1 = +m[2], v1 = m[3] ? +m[3] : null, c2 = c1, v2 = null;
      if (m[4]) {
        if (m[5]) { c2 = +m[4]; v2 = +m[5]; }       // 3:16-4:2
        else if (v1) { v2 = +m[4]; }                // 3:16-18
        else { c2 = +m[4]; }                        // 34-35 (장)
      }
      out.push({ book: bi, c1: c1, c2: c2, v1: v1, v2: v2 });
    });
    return out;
  }

  function label(ref, lang) {
    var b = BOOKS[ref.book];
    var name = lang === 'ko' ? b[2] : lang === 'es' ? b[4] : (b[0] === 'Psalm' ? 'Psalms' : b[0]);
    var r = ref.c1 + (ref.v1 ? ':' + ref.v1 : '') + (ref.v2 ? '-' + (ref.c2 !== ref.c1 ? ref.c2 + ':' : '') + ref.v2 : (ref.c2 !== ref.c1 ? '-' + ref.c2 : ''));
    return name + ' ' + r + (lang === 'ko' && !ref.v1 ? (b[0] === 'Psalm' ? '편' : '장') : '');
  }

  var VERSION = { en: 'NKJV', es: 'RVR1960' };
  function gatewayUrl(refs, lang) {
    var q = refs.map(function (r) {
      var b = BOOKS[r.book][0];
      return b + ' ' + r.c1 + (r.v1 ? ':' + r.v1 : '') + (r.v2 ? '-' + (r.c2 !== r.c1 ? r.c2 + ':' : '') + r.v2 : (r.c2 !== r.c1 ? '-' + r.c2 : ''));
    }).join('; ');
    return 'https://www.biblegateway.com/passage/?search=' + encodeURIComponent(q) + '&version=' + (VERSION[lang] || 'NKJV');
  }

  /* 개역한글 본문 불러오기 */
  var cache = {};
  function loadBook(i) {
    var f = BOOKS[i][1];
    if (!cache[f]) {
      cache[f] = fetch('bible/krv/' + f + '.json').then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
      cache[f].catch(function () { delete cache[f]; });
    }
    return cache[f];
  }
  /* → Promise<[{title, chapters:[{c, verses:[{n, t}]}]}]> */
  function loadKorean(refs) {
    return Promise.all(refs.map(function (r) {
      return loadBook(r.book).then(function (book) {
        var chs = [];
        for (var c = r.c1; c <= r.c2 && c <= book.length; c++) {
          var vs = book[c - 1] || [];
          var from = c === r.c1 && r.v1 ? r.v1 : 1;
          var to = c === r.c2 && r.v2 ? r.v2 : (r.v1 && !r.v2 && r.c1 === r.c2 ? r.v1 : vs.length);
          var list = [];
          for (var n = from; n <= Math.min(to, vs.length); n++) list.push({ n: n, t: vs[n - 1] });
          chs.push({ c: c, verses: list });
        }
        return { title: label(r, 'ko'), book: BOOKS[r.book][2], chapters: chs };
      });
    }));
  }

  var api = { parse: parse, label: label, gatewayUrl: gatewayUrl, loadKorean: loadKorean, VERSION: VERSION, BOOKS: BOOKS };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.BibleReader = api;
})(typeof window !== 'undefined' ? window : this);
