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

      /*
       * 輪播初始化會改變版面高度，AOS 先前算好的座標因此失效，
       * 位在輪播之後的區塊會永遠不觸發、停在 opacity: 0。重算一次。
       */
      AOS.refreshHard();
      vm.openCoachFromHash();
      vm.bindCoachToggle();
      window.addEventListener('hashchange', () => vm.openCoachFromHash());
    }, 300);

    store.load.finish();
  },
  /*
   * 從首頁／免費體驗頁點某一位教練過來時，直接展開那一位。
   *
   * 用 JS 而不是 CSS 的 :target —— :target 一旦成立就一直成立，
   * 那張卡之後就再也關不掉，等於把手風琴鎖死一格。
   */
  /*
   * 展開指定的那一位，其他人收起來 —— 一次只能開一位。
   *
   * 面板的位置是用 grid-row 明確指定的，而同一列的幾位教練共用
   * 同一個面板列（桌機三欄：前三位的面板都在第 2 列，且橫跨整行）。
   * 兩位同時展開時，兩個面板會疊在同一個格子裡，只看得到 DOM 上
   * 最後那一個 —— 但三張卡片都會顯示成展開的樣子，對不起來。
   *
   * 手機一欄時每位都有自己的面板列，理論上可以同時展開，
   * 但行為不該隨斷點改變，所以三個斷點一律單選。
   *
   * 仍然用 checkbox 而不是改成 radio：radio 選了就取消不掉，
   * 想收起來只能改去開另一位。checkbox 再點一次就能收合。
   */
  openCoach(input) {
    document.querySelectorAll('.m-coach-grid > input').forEach((other) => {
      other.checked = other === input;
    });
  },

  openCoachFromHash() {
    const id = decodeURIComponent(window.location.hash.slice(1));

    if (!id.startsWith('coach-')) return;

    const input = document.getElementById(id);

    if (!input || input.type !== 'checkbox') return;

    this.openCoach(input);

    /* 捲到卡片而不是 input —— input 只有 1px，捲過去會偏掉 */
    document.querySelector(`label[for="${CSS.escape(id)}"]`)?.scrollIntoView({ block: 'center' });
  },

  /*
   * 展開某位教練時，把那張卡捲到畫面上緣。
   *
   * 不捲的話展開的面板是長在卡片下面的，而卡片可能已經在畫面中段，
   * 內容一出來就有一半在視窗外，得再自己往下找。桌機與平板還多一層：
   * 收起上一位時版面會往上縮，不捲的話畫面等於自己跳掉。
   *
   * 扣掉固定 header 的高度再留 20px —— 直接對齊視窗頂端的話，
   * 卡片會被 header 蓋住。header 被 hdScroll() 收起來時就不用扣。
   */
  scrollCoachToTop(input) {
    const card = document.querySelector(`label[for="${CSS.escape(input.id)}"]`);

    if (!card) return;

    const hd = document.querySelector('.jHd');
    const hdHeight = hd && !hd.classList.contains('--hide') ? hd.offsetHeight : 0;

    /* 等面板撐開、上一位收起來，版面定下來再量位置 */
    window.requestAnimationFrame(() => {
      window.scrollTo({
        top: window.pageYOffset + card.getBoundingClientRect().top - hdHeight - 20,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
    });
  },

  bindCoachToggle() {
    document.querySelectorAll('.m-coach-grid > input').forEach((input) => {
      input.addEventListener('change', () => {
        /* 收合不必捲動 —— 使用者看的還是同一張卡 */
        if (!input.checked) return;

        this.openCoach(input);
        this.scrollCoachToTop(input);
      });
    });
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
