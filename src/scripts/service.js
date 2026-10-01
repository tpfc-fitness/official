import AOS from 'aos';
import 'aos/dist/aos.css';
import '@css/service.css';

import { svgRequire, lazyLoadFun, deviceType, hdScroll } from '_prototype.js';
import store from '_store.js';
import { createSlider, bindCounter } from '_slider.js';

// const $ = window.jQuery;

/* 一次載入使用到的 svg */
svgRequire();

window.PetiteVue.createApp({
  store, // 加入 store
  data: '',
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

      /*
       * 課程圖片走 B 樣式：大圖 + 左右箭頭 + 分頁數字，並依設計稿加上橫條分頁。
       * 三組課程各有自己的輪播與計數器，用索引區分。
       */
      document.querySelectorAll('[class*="class-slider-"]').forEach((elem, idx) => {
        const slider = createSlider(`.class-slider-${idx}`, 'b', {
          /* B 樣式本身不帶分頁，這一頁依設計稿再加上橫條 */
          nav: true,
          navPosition: 'bottom',
          controlsContainer: `.m-slider-ctrl-${idx}`,
          items: 1,
          slideBy: 'page',
          edgePadding: 0,
          gutter: 0,
        });

        bindCounter(slider, `.jCounter-${idx}`);
      });

      /*
       * 輪播初始化會改變版面高度，AOS 先前算好的座標因此失效，
       * 位在輪播之後的區塊會永遠不觸發、停在 opacity: 0。重算一次。
       */
      AOS.refreshHard();
    }, 300);

    store.load.finish();
  },
}).mount('.jWrap');
