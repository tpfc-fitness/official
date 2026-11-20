/*
 * 免費資源頁共用的啟動流程。
 *
 * 每一頁資源（計算機、計畫表…）只要把自己的狀態與方法傳進來，
 * AOS、loading、header 捲動、CTA 點擊事件都在這裡統一處理，
 * 新增一頁時不用再複製一份 faq.js 那樣的啟動碼。
 */
import AOS from 'aos';
import 'aos/dist/aos.css';

import { svgRequire, lazyLoadFun, deviceType, hdScroll } from '_prototype.js';
import store from '_store.js';

/*
 * CTA 點擊 → GA4 cta_click。
 * cta_location 讀區塊上的 data-cta-location，同一個事件名稱可以比較各頁的 CTA。
 * gtag 送事件預設走 beacon，就算點下去馬上換頁也送得出去。
 */
const trackCta = () => {
  document.querySelectorAll('.jResourceCta').forEach((link) => {
    link.addEventListener('click', () => {
      if (typeof window.gtag !== 'function') return;

      const section = link.closest('[data-cta-location]');
      window.gtag('event', 'cta_click', {
        cta_location: section ? section.dataset.ctaLocation : '',
        link_url: link.href,
      });
    });
  });
};

/*
 * page：要合併進 petite-vue 根狀態的物件（可以有 getter 與方法）。
 * page.onMounted 選填，在共用流程跑完之後呼叫。
 *
 * ⚠️ 用 Object.defineProperties 複製，不用展開運算子 ——
 *    展開會把 getter 當下算一次變成普通值，計算結果就不會跟著輸入更新。
 */
export const mountResourcePage = (page = {}) => {
  svgRequire();

  const app = { store };
  Object.defineProperties(app, Object.getOwnPropertyDescriptors(page));

  app.mounted = function mounted() {
    const vm = this;

    lazyLoadFun();
    store.load.init();

    setTimeout(() => {
      AOS.init({
        offset: 120,
        duration: 800,
        easing: 'ease-in-out',
        once: true,
      });
      if (deviceType() !== 'p') hdScroll();
    }, 300);

    trackCta();
    if (typeof page.onMounted === 'function') page.onMounted.call(vm);

    store.load.finish();
  };

  window.PetiteVue.createApp(app).mount('.jWrap');
};

export default mountResourcePage;
