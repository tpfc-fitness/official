import { tns } from 'tiny-slider/src/tiny-slider';
import 'tiny-slider/dist/tiny-slider.css';
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

        this.testimonialSlider = tns({
          container: '.testimonial-slider',
          items: 1,
          slideBy: 'page',
          autoplay: false,
          loop: false,
          rewind: true,
          controls: false,
          nav: true,
          navPosition: 'bottom',
          mouseDrag: true,
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
