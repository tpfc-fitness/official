import AOS from 'aos';
import 'aos/dist/aos.css';
import '@css/thankyou.css';

import { svgRequire, lazyLoadFun } from '_prototype.js';
import store from '_store.js';

/* 落地時存下來的廣告來源，見 App.ejs */
function campaign() {
  try {
    return JSON.parse(sessionStorage.getItem('tpfc-campaign') || '{}');
  } catch (err) {
    return {};
  }
}

/* KV 的切角由 _kvVariant.js 決定，網址沒帶 type 時是隨機挑的 */
function kvType() {
  try {
    return sessionStorage.getItem('tpfc-kv-type') || '';
  } catch (err) {
    return '';
  }
}

/*
 * 轉換事件。
 *
 * Meta 與 GA4 各自記自己的旗標：兩邊的程式碼載入速度不一樣，
 * 綁在一起的話先到的那一個會被還沒到的那一個拖著一起漏掉。
 *
 * 另外用 sessionStorage 擋重整 —— 使用者重新整理感謝頁不該再算一筆。
 */
const sent = { meta: false, ga: false };

function trackLead() {
  if (sessionStorage.getItem('lead_fired')) return true;

  const c = campaign();
  const type = kvType();

  if (!sent.meta && typeof window.fbq === 'function') {
    window.fbq('track', 'Lead', {
      content_name: '免費體驗課預約',
      content_category: type,
    });
    sent.meta = true;
  }

  if (!sent.ga && typeof window.gtag === 'function') {
    window.gtag('event', 'generate_lead', {
      kv_type: type,
      ad_campaign: c.utm_campaign || '',
      ad_content: c.utm_content || '',
      ad_source: c.utm_source || '',
    });
    sent.ga = true;
  }

  if (sent.meta && sent.ga) {
    try {
      sessionStorage.setItem('lead_fired', '1');
    } catch (err) {
      /* 同上，忽略 */
    }

    return true;
  }

  return false;
}

function init() {
  /* 一次載入使用到的 svg */
  svgRequire();

  /*
   * 兩邊的 script 都是 async 載入的，掛載當下不一定就緒。
   * 每 200ms 重試一次，最多等 5 秒 —— 再等下去使用者早就離開了，
   * 而被擋掉的那一邊（廣告攔截器）本來就等不到。
   */
  if (!trackLead()) {
    const timer = setInterval(() => {
      if (trackLead()) clearInterval(timer);
    }, 200);

    setTimeout(() => clearInterval(timer), 5000);
  }

  window.PetiteVue.createApp({
    store,
    mounted() {
      lazyLoadFun();
      this.$nextTick(() => {
        setTimeout(() => {
          AOS.init({
            offset: 120,
            duration: 800,
            easing: 'ease-in-out',
            once: true,
          });

          setTimeout(() => {
            AOS.refreshHard();
          }, 300);
        }, 300);
      });

      store.load.finish();
    },
  }).mount('.jWrap');
}

/*
 * Tally 的表單是嵌在 contact 頁的 iframe 裡，它送出後的導向只會換掉
 * iframe 自己，感謝頁因此被關在那個 500px 的小框裡 —— 看起來就像
 * 表單沒有反應。偵測到就把最上層視窗換成自己。
 *
 * 這裡刻意什麼事都不做就結束：在框裡送轉換事件的話，去重旗標會被
 * 設起來，跳出去之後那一次反而送不出去。
 *
 * top 是 contact 頁、與這一頁同網域，所以改 top.location 是允許的。
 */
if (window.top !== window.self) {
  window.top.location.replace(window.location.href);
} else {
  init();
}
