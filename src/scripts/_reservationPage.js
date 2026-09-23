/*
 * 免費體驗／預約頁的共用行為。
 *
 * 免費體驗頁的 slider 初始化與 AOS 設定。
 * contact.js 只負責載入自己的 CSS 後呼叫這裡的 init()。
 */
import AOS from 'aos';
import 'aos/dist/aos.css';

import { svgRequire, lazyLoadFun, hdScroll, deviceType } from '_prototype.js';
import store from '_store.js';
import { createSlider } from '_slider.js';
import kvVariant from '_kvVariant.js';

export default function initReservationPage() {
  /* 一次載入使用到的 svg */
  svgRequire();

  /* 在掛載之前換好 KV 標題，載入遮罩還蓋著，不會看到文字跳動 */
  kvVariant();

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
          this.syncBonusAccordion();
          this._lastWidth = window.innerWidth;
          window.addEventListener('resize', this.debouncedResize);

          setTimeout(() => {
            AOS.refreshHard();
          }, 300);
        }, 300);
      });

      store.load.finish();
    },

    /*
     * resize 只在「寬度」真的變了才重建輪播。
     *
     * 手機瀏覽器捲動時網址列會收合，這會觸發 resize，但變的只有高度。
     * 不擋掉的話輪播每捲一下就被 destroy 再 create，正在看的那一張
     * 會跳回第一張。
     */
    debouncedResize() {
      if (window.innerWidth === this._lastWidth) return;

      this._lastWidth = window.innerWidth;

      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(() => {
        this.initSliders();
        this.syncBonusAccordion();
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

          /*
           * 評論清單只在手機輪播，桌機與平板是並排的三欄。
           *
           * preventScrollOnTouch: 'auto' 讓 tiny-slider 判定是橫向滑動時
           * 擋掉頁面捲動 —— 預設是 false，手指稍微斜一點就會同時帶動
           * 上下捲動，卡片跟著頁面一起晃，很難切換。
           */
          this.commentSlider = createSlider('.testimonial-slider', 'd', {
            controlsContainer: '.testimonial-slider-ctrl',
            items: 1,
            slideBy: 'page',
            gutter: 12,
            preventScrollOnTouch: 'auto',
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

    /*
     * 課堂之外：手機收合成一列一項，桌機與平板一律展開。
     *
     * 標記裡預設帶 open，所以沒有 JS 也讀得到全部內容，
     * 這裡只負責在手機把它收起來。
     *
     * 另外擋掉在桌機用鍵盤按 Enter 把區塊收掉 —— 那裡的 summary
     * 看起來就不是可以點的東西，收掉了使用者也不知道怎麼還原。
     */
    syncBonusAccordion() {
      const items = document.querySelectorAll('[data-bonus-item]');

      if (!items.length) return;

      const expanded = deviceType() !== 'm';

      items.forEach((el) => {
        if (!el.dataset.bonusBound) {
          el.dataset.bonusBound = '1';
          el.addEventListener('toggle', () => {
            if (deviceType() !== 'm' && !el.open) el.open = true;
          });
        }

        el.open = expanded;
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
  }).mount('.jWrap');
}
