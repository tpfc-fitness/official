import AOS from 'aos';
import 'aos/dist/aos.css';
import '@css/index.css';

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
       * 課程圖片走 B 樣式：大圖 + 左右箭頭 + 分頁數字，不用橫條分頁。
       * 三組課程各有自己的輪播與計數器，用索引區分。
       */
      document.querySelectorAll('[class*="class-slider-"]').forEach((elem, idx) => {
        const slider = createSlider(`.class-slider-${idx}`, 'b', {
          controlsContainer: `.m-slider-ctrl-${idx}`,
          items: 1,
          slideBy: 'page',
          edgePadding: 0,
          gutter: 0,
        });

        bindCounter(slider, `.jCounter-${idx}`);
      });
    }, 300);

    store.load.finish();
  },
}).mount('.jWrap');
