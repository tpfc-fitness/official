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
  /* 把計數器與說明文字同步到目前這一張 */
  syncGallery(info) {
    const index = info.displayIndex - 1;
    const counter = document.querySelector('.jGalleryIndex');

    if (counter) counter.textContent = String(info.displayIndex).padStart(2, '0');

    document
      .querySelectorAll('.m-gallery-caption > *')
      .forEach((elem, i) => elem.classList.toggle('is-active', i === index));
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
        items: 1,
        slideBy: 1,
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
      }
    }, 300);

    store.load.finish();
  },
}).mount('.jWrap');
