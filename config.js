// ─────────────────────────────────────────────────────────────
//  모바일 주보 설정  (이 파일만 고치면 됩니다)
// ─────────────────────────────────────────────────────────────
window.BULLETIN_CONFIG = {
  // Google Apps Script 웹앱 주소 (배포 후 받은 https://script.google.com/macros/s/..../exec)
  // 비워 두면 예시 데이터(sample-data.json)로 화면을 보여 줍니다.
  API_URL: 'https://script.google.com/macros/s/AKfycby_bK84XkJNhSuO4eb6KMV1RGGuZdv7bPvbfh4ZxMVkhE87T1g9Ux0Fs92ZjfNJ4XMhYw/exec',

  // 처음 열었을 때 기본 언어: 'auto'(휴대폰 언어 따라감) | 'ko' | 'en' | 'es'
  DEFAULT_LANG: 'auto',

  CHURCH_NAME: { ko: 'LA 중앙교회', en: 'LA Central Church', es: 'Iglesia Central de LA' },

  // 하단에 보일 교회 정보 (비워 두면 숨김)
  ADDRESS: '',
  PHONE: '',
  WEBSITE: '',
};
