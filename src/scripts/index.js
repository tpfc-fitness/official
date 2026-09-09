import AOS from 'aos';
import 'aos/dist/aos.css';
import '@css/index.css';

import { svgRequire, lazyLoadFun, hdScroll, deviceType } from '_prototype.js';
import store from '_store.js';
import kvSpotlight from '_kvSpotlight.js';

// const $ = window.jQuery;

/* 一次載入使用到的 svg */
svgRequire();

window.PetiteVue.createApp({
  store, // 加入 store
  onInit() {
    const vm = this;
  },
  async mounted() {
    const vm = this;
    lazyLoadFun();
    kvSpotlight();
    vm.onInit();
    // loading 開始
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

    store.load.finish();
  },
}).mount('.jWrap');
