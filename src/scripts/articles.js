import AOS from 'aos';
import 'aos/dist/aos.css';
import '@css/articles.css';

import { svgRequire, lazyLoadFun, deviceType, hdScroll } from '_prototype.js';
import { createSlider } from '_slider.js';
import store from '_store.js';

/* 一次載入使用到的 svg */
svgRequire();

/* 一頁幾篇。桌機排成 3×3 */
const PER_PAGE = 9;

/*
 * 推薦輪播（D 極簡輪播型：大圖＋橫條分頁＋箭頭）。
 *
 * 進度條與箭頭都是頁面上現成的按鈕（navContainer / controlsContainer），
 * 不讓 tiny-slider 自己產生 —— 它產生的圓點長得跟設計不一樣。
 * 只有一則推薦時頁面不會輸出控制項，這裡找不到就不啟動。
 */
const initFeatured = () => {
  const ctrl = document.querySelector('.jFeaturedCtrl');

  if (!ctrl) return;

  const slider = createSlider('.jFeaturedSlider', 'd', {
    items: 1,
    slideBy: 1,
    /* 兩則之間的縫。手機上下一則從右邊露出來，靠的就是這個縫加上 CSS 的可視寬度 */
    gutter: 12,
    controlsContainer: '.jFeaturedArrows',
    navContainer: '.jFeaturedNav',
  });

  if (!slider) return;

  ctrl.hidden = false;

  /* 左邊的 01：跟著目前這則走 */
  const no = document.querySelector('.jFeaturedNo');
  const sync = (info) => {
    no.textContent = String(info.displayIndex).padStart(2, '0');
  };

  slider.events.on('indexChanged', sync);
  sync(slider.getInfo());
};

/*
 * 分類 tab 與分頁。
 *
 * 所有卡片一直都在 HTML 裡，這裡只決定哪些要加 hidden ——
 * 爬蟲不執行 JS 也看得到全部文章，這支壞掉頂多是一次全部顯示。
 *
 * 狀態寫進網址（?category=動作教學&page=2）：重新整理、按上一頁、
 * 把網址分享給別人，都會停在同一個分類的同一頁。
 * 用 replaceState 不用 pushState —— 換一次頁就多一筆上一頁紀錄的話，
 * 想離開這一頁要按很多次上一頁。
 */
const initList = () => {
  const list = document.querySelector('.jAlist');

  if (!list) return;

  const tabList = list.querySelector('.jAlistTabs');
  const tabs = [...list.querySelectorAll('.jAlistTab')];
  const panel = list.querySelector('[role="tabpanel"]');
  const items = [...list.querySelectorAll('.jAlistItem')];
  const pager = list.querySelector('.jAlistPager');
  const pages = list.querySelector('.jPagerPages');
  const prev = list.querySelector('.jPagerPrev');
  const next = list.querySelector('.jPagerNext');

  const state = { category: '', page: 1 };

  /* 網址上的分類必須真的存在，頁碼在 render 時再夾到範圍內 */
  const params = new URLSearchParams(window.location.search);
  const fromUrl = params.get('category') || '';
  if (tabs.some((tab) => tab.dataset.category === fromUrl)) state.category = fromUrl;
  state.page = Math.max(1, parseInt(params.get('page'), 10) || 1);

  const writeUrl = () => {
    const query = new URLSearchParams(window.location.search);

    /* 預設值不寫進網址：「全部」的第 1 頁就是乾淨的 /article/ */
    if (state.category) query.set('category', state.category);
    else query.delete('category');
    if (state.page > 1) query.set('page', String(state.page));
    else query.delete('page');

    const search = query.toString();
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}${search ? `?${search}` : ''}${window.location.hash}`
    );
  };

  const render = () => {
    const matched = items.filter(
      (item) => !state.category || item.dataset.category === state.category
    );
    const pageCount = Math.max(1, Math.ceil(matched.length / PER_PAGE));

    state.page = Math.min(state.page, pageCount);

    const start = (state.page - 1) * PER_PAGE;
    const visible = new Set(matched.slice(start, start + PER_PAGE));
    items.forEach((item) => {
      item.hidden = !visible.has(item);
    });

    /* roving tabindex：Tab 鍵只停在目前這個分類，左右鍵在分類之間移動 */
    tabs.forEach((tab) => {
      const selected = tab.dataset.category === state.category;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected) panel.setAttribute('aria-labelledby', tab.id);
    });

    /* 不超過一頁就不需要分頁器 */
    pager.hidden = pageCount <= 1;
    pages.innerHTML = '';
    for (let num = 1; num <= pageCount; num += 1) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'm-alist-page';
      button.textContent = num;
      button.setAttribute('aria-label', `第 ${num} 頁`);
      if (num === state.page) button.setAttribute('aria-current', 'page');
      button.dataset.page = num;
      pages.appendChild(button);
    }
    prev.disabled = state.page === 1;
    next.disabled = state.page === pageCount;

    writeUrl();
  };

  /*
   * 換頁後捲回 tab 列頂端，不然新的一頁會從畫面中間開始看。
   * 扣掉固定 header 的高度再留 20px（做法同 faq.js）。
   */
  const scrollToTabs = () => {
    const hd = document.querySelector('.jHd');
    const hdHeight = hd && !hd.classList.contains('--hide') ? hd.offsetHeight : 0;

    window.scrollTo({
      top: window.pageYOffset + tabList.getBoundingClientRect().top - hdHeight - 20,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  const goToPage = (page) => {
    state.page = page;
    render();
    scrollToTabs();
  };

  const selectTab = (tab) => {
    state.category = tab.dataset.category;
    /* 換分類一律回第 1 頁 —— 留在第 3 頁的話，新分類可能根本沒有第 3 頁 */
    state.page = 1;
    render();
    /* 手機上 tab 列可以橫向滑，選到的那個要整個露出來 */
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  };

  tabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', (event) => {
      const step = { ArrowRight: 1, ArrowLeft: -1 }[event.key];

      if (!step) return;

      event.preventDefault();
      const target = tabs[(idx + step + tabs.length) % tabs.length];
      target.focus();
      selectTab(target);
    });
  });

  pages.addEventListener('click', (event) => {
    const button = event.target.closest('[data-page]');
    if (button) goToPage(Number(button.dataset.page));
  });
  prev.addEventListener('click', () => goToPage(state.page - 1));
  next.addEventListener('click', () => goToPage(state.page + 1));

  /* 有 JS 才打開 tab 列；分頁器在 render 裡依篇數決定 */
  tabList.hidden = false;
  render();
};

window.PetiteVue.createApp({
  store, // 加入 store
  data: '',
  onInit() {
    const vm = this;

    vm.data = 'Articles Init!!';
  },
  async mounted() {
    const vm = this;
    lazyLoadFun();
    vm.onInit();
    store.load.init();
    initList();
    initFeatured();

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
}).mount('.jWrap');
