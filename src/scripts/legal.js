import AOS from 'aos';
import 'aos/dist/aos.css';
import '@css/legal.css';

import { svgRequire, lazyLoadFun, deviceType, hdScroll } from '_prototype.js';
import store from '_store.js';

/* 一次載入使用到的 svg */
svgRequire();

window.PetiteVue.createApp({
  store, // 加入 store
  data: '',
  onInit() {
    const vm = this;

    vm.data = 'Legal Init!!';
  },
  async mounted() {
    const vm = this;
    lazyLoadFun();
    vm.onInit();
    store.load.init();

    setTimeout(() => {
      /*
       * 這一頁本身沒有動畫，但 footer 帶 data-aos，
       * 不跑 init 的話 footer 會停在 opacity: 0 看不見。
       */
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
