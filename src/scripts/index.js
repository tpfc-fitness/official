import AOS from 'aos';
import 'aos/dist/aos.css';
import '@css/index.css';

import { svgRequire, lazyLoadFun, hdScroll, deviceType } from '_prototype.js';
import store from '_store.js';
import kvSpotlight from '_kvSpotlight.js';
import { createSlider } from '_slider.js';

// const $ = window.jQuery;

/* 一次載入使用到的 svg */
svgRequire();

window.PetiteVue.createApp({
  store, // 加入 store
  testimonialSlider: null,
  onInit() {
    const vm = this;
  },
  async mounted() {
    const vm = this;
    lazyLoadFun();
    kvSpotlight();
    this.syncTestimonialSlider();
    window.addEventListener('resize', this.debouncedResize);
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

      /*
       * 輪播初始化會改變版面高度，AOS 先前算好的座標因此失效，
       * 位在輪播之後的區塊會永遠不觸發、停在 opacity: 0。重算一次。
       */
      AOS.refreshHard();
    }, 300);

    store.load.finish();
  },

  /*
   * 學員推薦只在手機輪播，桌機與平板是並排的三欄。
   * tiny-slider 初始化後會在容器外包一層 .tns-outer，
   * 所以尺寸切換時必須真的銷毀，不能只用 CSS 藏起來。
   */
  syncTestimonialSlider() {
    this.$nextTick(() => {
      const shouldSlide = deviceType() === 'm';

      if (shouldSlide && !this.testimonialSlider) {
        if (!document.querySelector('.testimonial-slider')) return;

        /* 學員推薦走 D 樣式（橫條分頁），這一區沒有箭頭標記，因此關閉 controls */
        this.testimonialSlider = createSlider('.testimonial-slider', 'd', {
          controls: false,
          items: 1,
          slideBy: 'page',
          gutter: 12,
        });
      } else if (!shouldSlide && this.testimonialSlider) {
        this.testimonialSlider.destroy();
        this.testimonialSlider = null;
      }
    });
  },

  debouncedResize() {
    clearTimeout(this._resizeTimer);
    this._resizeTimer = setTimeout(() => {
      this.syncTestimonialSlider();
    }, 150);
  },
}).mount('.jWrap');
