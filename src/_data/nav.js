/*
 * 全站導覽列資料（唯一來源）
 *
 * - build 期：mNav.ejs / mFt.ejs 直接 require 它，把連結輸出成靜態 <a href>，
 *   讓爬蟲不必執行 JS 就能抓到全站內部連結。
 * - 瀏覽器：_store.js require 它，供手機選單開合等互動使用。
 *
 * ⚠️ url 是「站內路徑」，不帶 ./ —— 元件會自己在前面接上部署子目錄
 *    （process.env.ROOT_DIRECTORY，例如 /official/）。
 *    不能寫成相對路徑：文章頁在 /article/ 底下，./contact.html 會解析成
 *    /article/contact.html；也不能寫成 /contact.html，那會掉出子目錄。
 *
 * ⚠️ 這個檔案不可以依賴 window / document，否則 EJS 在 build 期 require 會壞掉。
 */
module.exports = [
  {
    label: '首頁',
    url: '',
    navShow: false,
  },
  {
    label: '免費體驗',
    url: 'contact.html',
    navShow: true,
  },
  {
    label: '關於我們',
    url: 'about.html',
    navShow: true,
  },
  {
    label: '服務項目',
    url: 'service.html',
    navShow: true,
  },
  {
    label: '教練團隊',
    url: 'ourteam.html',
    navShow: true,
  },
  {
    label: '交通與環境',
    url: 'information.html',
    navShow: true,
  },
  {
    /* 文章列表。指向資料夾而不是 index.html，網址才會是乾淨的 /article/ */
    label: '健身知識',
    url: 'article/',
    navShow: true,
  },
  {
    label: '常見問題',
    url: 'faq.html',
    navShow: true,
  },
  {
    label: '人才招募',
    url: 'careers.html',
    navShow: true,
  },
];
