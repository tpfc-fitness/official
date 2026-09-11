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
    }, 300);

    store.load.finish();
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
