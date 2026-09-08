const htmlPage = require('./htmlPage/index.js');

module.exports = {
  port: 65534,
  ieVersion: 10, // 10 或 0
  // 全站唯一的正式網址來源：canonical / og:url / og:image / sitemap 都由這裡組出來。
  // ⚠️ 結尾「不要」加斜線 —— 組法是 siteUrl + path，而 path 已經以 / 開頭。
  // 之後若接上自訂網域，改成 'https://tpfc.fitness' 並把下面 rootDirectory 改回 '/'。
  siteUrl: 'https://tpfc-fitness.github.io/official',
  projectName: 'first class 頭等倉運動空間',
  copyright: 'FIRST CLASS FITNESS © 2022 ALL RIGHT RESERVED.',
  desktopMinWidth: 1366,
  mobileMaxWidth: 740,
  basicMobileWidth: 375,
  copyStatic: true,
  docker: false,
  https: true,
  // webpack publicPath：資產路徑前綴，是「直接字串相接」，
  // ⚠️ 結尾「一定要」加斜線，否則會變成 /officialscripts/index.js。
  // 必須與 siteUrl 的子目錄一致（部署在 GitHub Pages 的 official 專案底下）。
  rootDirectory: '/official/',
  jsMinifyExclude: /\/static/,
  buildJSExtension: null,
  component: '_components/',
  js: 'scripts/',
  css: 'assets/css/',
  imgs: 'assets/img/',
  fonts: null,
  static: 'static/',
  svg: '_svg',
  commonPlugins: {
    jquery: 'static/scripts/plugin/jquery-3.7.0.min.js?[fullhash:8]',
    'petite-vue': 'static/scripts/plugin/petite-vue@0.4.1/petite-vue.iife.js?[fullhash:8]',
  },
  plugins: () => {
    const def = [];
    const publish = def.concat(
      htmlPage.HtmlWebpackPlugin,
    );

    return publish;
  },
};
