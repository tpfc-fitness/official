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
  /* 把計數器、說明文字與「置中那一張」同步到目前選中的項目 */
  syncGallery(info) {
    const index = info.displayIndex - 1;
    const counter = document.querySelector('.jGalleryIndex');

    if (counter) counter.textContent = String(info.displayIndex).padStart(2, '0');

    document
      .querySelectorAll('.m-gallery-caption > *')
      .forEach((elem, i) => elem.classList.toggle('is-active', i === index));

    /* 三張並排時只有置中的是選中的，tiny-slider 沒有對應的 class，自己標 */
    if (info.slideItems) {
      Array.prototype.forEach.call(info.slideItems, (elem, i) =>
        elem.classList.toggle('is-current', i === info.index)
      );
    }
  },

  /*
   * 點擊側邊的大圖即可切換到那一張。
   * 這個輪播開著 mouseDrag，拖曳結束時也會觸發 click，
   * 所以比對按下與放開的位移，超過門檻就視為拖曳、不做切換。
   *
   * 鍵盤操作由下方的縮圖／標籤按鈕負責，這裡純粹是滑鼠的便利性。
   */
  bindSlideClick() {
    const DRAG_THRESHOLD = 8;
    const container = document.querySelector('.env-slider');

    if (!container || !this.slider) return;

    const info = this.slider.getInfo();
    let startX = 0;

    Array.prototype.forEach.call(info.slideItems, (elem, index) => {
      elem.addEventListener('pointerdown', (event) => {
        startX = event.clientX;
      });

      elem.addEventListener('click', (event) => {
        if (Math.abs(event.clientX - startX) > DRAG_THRESHOLD) return;
        if (index === this.slider.getInfo().index) return;

        this.slider.goTo(index);
      });
    });
  },

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
       * 環境導覽（設計規範 A 型）：以縮圖列當導覽，不使用左右箭頭。
       * navContainer 指向縮圖列，tiny-slider 會自動幫當前縮圖
       * 加上 tns-nav-active。
       */
      vm.slider = tns({
        container: '.env-slider',
        navContainer: '.env-thumbs',
        navAsThumbnails: true,
        /*
         * 桌機與平板一次並排三張，置中的那一張才是「目前選中」，
         * 計數器與說明文字都跟著它走。
         * 平板另外給 edgePadding，讓左右兩側各露出一角，
         * 暗示前後還有內容。手機維持單張。
         */
        items: 3,
        center: true,
        gutter: 12,
        slideBy: 1,
        responsive: {
          0: { items: 1, center: false, edgePadding: 0, gutter: 0 },
          740: { items: 3, center: true, edgePadding: 48, gutter: 12 },
          1001: { items: 3, center: true, edgePadding: 60, gutter: 16 },
        },
        autoplay: false,
        loop: false,
        rewind: true,
        controls: false,
        nav: true,
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

      if (vm.slider) {
        vm.slider.events.on('indexChanged', vm.syncGallery);
        vm.syncGallery(vm.slider.getInfo());
        vm.bindSlideClick();
      }
    }, 300);

    store.load.finish();
  },
}).mount('.jWrap');
