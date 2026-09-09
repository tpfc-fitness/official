import { tns } from 'tiny-slider/src/tiny-slider';
import AOS from 'aos';
import 'aos/dist/aos.css';
import 'tiny-slider/dist/tiny-slider.css';
import '@css/index.css';

import { svgRequire, lazyLoadFun, deviceType, hdScroll } from '_prototype.js';
import store from '_store.js';

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
      vm.slider = tns({
        container: '.env-slider',
        controlsContainer: '.m-slider-ctrl',
        items: 1,
        slideBy: 1,
        center: true,
        autoplay: false,
        nav: false,
        mouseDrag: true,
        gutter: 10,
        edgePadding: 50, // 較小的邊緣填充
        responsive: {
          640: {
            items: 1,
          },
          700: {
            edgePadding: 50, // 螢幕寬度介於700px至900px
            items: 1,
          },
          900: {
            edgePadding: 100, // 螢幕寬度大於900px時的設定
            gutter: 34,
            items: 1,
          },
        },
        onInit: () => {
          AOS.init({
            offset: 120,
            duration: 800,
            easing: 'ease-in-out',
            once: true,
          });
        },
      });
    }, 300);

    store.load.finish();
  },
}).mount('.jWrap');
