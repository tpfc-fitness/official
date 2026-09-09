import { tns } from 'tiny-slider/src/tiny-slider';
import 'tiny-slider/dist/tiny-slider.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '@css/index.css';

import { svgRequire, lazyLoadFun, deviceType, hdScroll } from '_prototype.js';
import store from '_store.js';

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
      document.querySelectorAll('[class*="class-slider-"]').forEach((elem, idx) => {
        tns({
          container: `.class-slider-${idx}`,
          controlsContainer: `.m-slider-ctrl-${idx}`,
          items: 1,
          slideBy: 'page',
          autoplay: false,
          edgePadding: 0,
          gutter: 0,
          nav: true,
          navPosition: 'bottom',
          mouseDrag: true,
          onInit: () => {
            AOS.init({
              offset: 120,
              duration: 800,
              easing: 'ease-in-out',
              once: true,
            });
          },
        });
      });
    }, 300);

    store.load.finish();
  },
}).mount('.jWrap');
