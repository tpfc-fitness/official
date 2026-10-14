import AOS from 'aos';
import 'aos/dist/aos.css';
import '@css/faq.css';

import { svgRequire, lazyLoadFun, deviceType, hdScroll } from '_prototype.js';
import store from '_store.js';

/* 一次載入使用到的 svg */
svgRequire();

/*
 * 元素在頁面上的絕對位置。用 offsetTop 一路往上加，不用 getBoundingClientRect ——
 * 題目外層有 AOS 的 fade-up，動畫還沒跑時整塊被 transform 往下推，
 * getBoundingClientRect 會量到推過之後的位置，捲過去就差一截。
 */
const pageTop = (el) => {
  let top = 0;
  let node = el;

  while (node) {
    top += node.offsetTop;
    node = node.offsetParent;
  }

  return top;
};

/*
 * 網址帶 #<id> 時（例如服務項目頁連過來的 faq.html#choose-plan）：
 * 展開那一題，再捲到它的位置。
 *
 * 光靠瀏覽器原生的錨點跳轉不夠 —— 那只會捲過去，<details> 仍然是收合的，
 * 使用者看到的只有一行題目。
 *
 * 扣掉固定 header 的高度再留 20px，題目才不會被 header 蓋住（做法同 ourteam.js）。
 */
const openFromHash = () => {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const target = id && document.getElementById(id);
  const details = target && target.querySelector('details');

  if (!details) return;

  details.open = true;

  const hd = document.querySelector('.jHd');
  const hdHeight = hd && !hd.classList.contains('--hide') ? hd.offsetHeight : 0;

  window.scrollTo({
    top: pageTop(target) - hdHeight - 20,
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
  });
};

window.PetiteVue.createApp({
  store, // 加入 store
  data: '',
  onInit() {
    const vm = this;

    vm.data = 'FAQ Init!!';
  },
  async mounted() {
    const vm = this;
    lazyLoadFun();
    vm.onInit();
    store.load.init();

    setTimeout(() => {
      AOS.init({
        offset: 120,
        duration: 800,
        easing: 'ease-in-out',
        once: true,
      });
      if (deviceType() !== 'p') hdScroll();

      /* 等 loading 收掉、版面定下來再捲，不然位置會量錯 */
      openFromHash();
    }, 300);

    /* 同一頁內換 #（例如從瀏覽器上一頁回來）也要能展開 */
    window.addEventListener('hashchange', openFromHash);

    store.load.finish();
  },
}).mount('.jWrap');
