/*
 * 社群媒體連結
 *
 * 這份資料在 build 期由 EJS 直接讀取並渲染成靜態 HTML，
 * 讓文字與圖片（含 alt）都能被搜尋引擎索引。
 *
 * ⚠️ 不可以依賴 window / document，否則 build 期 require 會壞掉。
 */
module.exports = [
  {
    icon: 'logo_fb',
    label: 'Facebook',
    url: 'https://www.facebook.com/profile.php?id=61558998428490',
  },
  {
    icon: 'logo_ig',
    label: 'Instagram',
    url: 'https://www.instagram.com/tpfc.fitness/',
  },
  {
    icon: 'logo_tiktok',
    label: 'TikTok',
    url: 'https://www.tiktok.com/@tpcf.fit',
  },
];
