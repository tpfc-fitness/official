import AOS from 'aos';
import 'aos/dist/aos.css';
import '@css/ourteam.css';

import { svgRequire, lazyLoadFun, deviceType, hdScroll } from '_prototype.js';
import store from '_store.js';
import { createSlider } from '_slider.js';

// const $ = window.jQuery;

/* 一次載入使用到的 svg */
svgRequire();

window.PetiteVue.createApp({
  store, // 加入 store
  data: '',
  slider: null,
  onInit() {
    const vm = this;
    vm.data = 'Home Init!!';
  },
  async mounted() {
    const vm = this;
    lazyLoadFun();
    vm.onInit();
    store.load.init();

    setTimeout(() => {
      if (deviceType() !== 'p') hdScroll();
      /*
       * AOS 必須無條件初始化。
       * 帶 data-aos 的元素在 aos.css 裡預設 opacity: 0，
       * 沒跑 init 就整片看不見 —— 因此不能掛在輪播的 onInit 裡，
       * 那等於「輪播不存在就整頁消失」。
       */
      AOS.init({
        offset: 120,
        duration: 800,
        easing: 'ease-in-out',
        once: true,
      });
      vm.windowResize();
      window.addEventListener('resize', vm.windowResize);

      /*
       * 輪播初始化會改變版面高度，AOS 先前算好的座標因此失效，
       * 位在輪播之後的區塊會永遠不觸發、停在 opacity: 0。重算一次。
       */
      AOS.refreshHard();
      vm.openCoachFromHash();
      window.addEventListener('hashchange', vm.openCoachFromHash);
    }, 300);

    store.load.finish();
  },
  /*
   * 從首頁／免費體驗頁點某一位教練過來時，直接展開那一位。
   *
   * 用 JS 而不是 CSS 的 :target —— :target 一旦成立就一直成立，
   * 那張卡之後就再也關不掉，等於把手風琴鎖死一格。
   */
  openCoachFromHash() {
    const id = decodeURIComponent(window.location.hash.slice(1));

    if (!id.startsWith('coach-')) return;

    const input = document.getElementById(id);

    if (!input || input.type !== 'checkbox') return;

    input.checked = true;

    /* 捲到卡片而不是 input —— input 只有 1px，捲過去會偏掉 */
    document.querySelector(`label[for="${CSS.escape(id)}"]`)?.scrollIntoView({ block: 'center' });
  },

  windowResize() {
    const vm = this;
    this.$nextTick(() => {
      if (vm.slider && vm.slider.destroy) vm.slider.destroy();
      if (deviceType() !== 'p') {
        /* 教練卡走 C 樣式：多張卡片 + 左右箭頭，不用分頁 */
        vm.slider = createSlider('.coach-slider', 'c', {
          controlsContainer: '.m-slider-ctrl',
          items: 1,
          slideBy: 'page',
          edgePadding: 40,
          gutter: 20,
          responsive: {
            740: {
              items: 2,
              edgePadding: 60,
              gutter: 40,
            },
          },
        });
      }
    });
  },
}).mount('.jWrap');
