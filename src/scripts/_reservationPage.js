/*
 * 免費體驗／預約頁的共用行為。
 *
 * contact 與 resevation 兩頁渲染同一組區塊，因此共用同一套
 * slider 初始化與 AOS 設定。各頁的 entry 只負責載入自己的 CSS
 * 後呼叫這裡的 init()。
 */
import AOS from 'aos';
import 'aos/dist/aos.css';

import { svgRequire, lazyLoadFun, hdScroll, deviceType } from '_prototype.js';
import store from '_store.js';
import { createSlider } from '_slider.js';

export default function initReservationPage() {
  /* 一次載入使用到的 svg */
  svgRequire();

  window.PetiteVue.createApp({
    store,
    slider: null,
    commentSlider: null,
    inbodySlider: null,
    bodyShapeSlider: null,
    mounted() {
      lazyLoadFun();
      store.load.init();
      this.$nextTick(() => {
        setTimeout(() => {
          AOS.init({
            offset: 120,
            duration: 800,
            easing: 'ease-in-out',
            once: true,
          });

          if (deviceType() !== 'p') hdScroll();

          this.initSliders();
          window.addEventListener('resize', this.debouncedResize);

          setTimeout(() => {
            AOS.refreshHard();
          }, 300);
        }, 300);
      });

      store.load.finish();
    },

    // 📌 debounce for resize
    debouncedResize() {
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => {
        this.initSliders();
      }, 150);
    },

    initSliders() {
      this.$nextTick(() => {
        this.destroySliders();

        // 📱 平板 / 手機 only
        if (deviceType() !== 'p') {
          this.slider = createSlider('.training-rules-slider', 'd', {
            controlsContainer: '.training-rules-slider-ctrl',
            items: 1,
            slideBy: 'page',
            edgePadding: 40,
            gutter: 20,
            responsive: {
              740: {
                items: 2,
                edgePadding: 60,
                gutter: 20,
              },
            },
          });

          this.commentSlider = createSlider('.comments-slider', 'd', {
            controlsContainer: '.comments-slider-ctrl',
            slideBy: 'page',
            items: 1,
            edgePadding: 40,
            gutter: 10,
            responsive: {
              740: {
                items: 2,
                edgePadding: 20,
              },
            },
          });
        }

        // 💬 評價區輪播（全裝置都用）
        this.inbodySlider = createSlider('.inbody-slider', 'd', {
          controlsContainer: '.inbody-slider-ctrl',
          items: 1,
          slideBy: 1,
          center: true,
          gutter: 10,
        });
        this.bodyShapeSlider = createSlider('.body-shape-slider', 'd', {
          controlsContainer: '.body-shape-slider-ctrl',
          items: 1,
          slideBy: 1,
          center: true,
          gutter: 10,
        });
      });
    },

    destroySliders() {
      this.slider?.destroy();
      this.commentSlider?.destroy();
      this.inbodySlider?.destroy();
      this.bodyShapeSlider?.destroy();

      this.slider = null;
      this.commentSlider = null;
      this.inbodySlider = null;
      this.bodyShapeSlider = null;
    },

    scrollToResevation() {
      document.querySelector('#resevation').scrollIntoView({
        behavior: 'smooth', // 平滑滾動
      });
    },
  }).mount('.jWrap');
}
