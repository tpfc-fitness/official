module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2022: true,
    node: true,
    /* hdScroll() 還在用 jQuery 的 $ */
    jquery: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    /*
     * 用內建的 espree，並把 ecmaVersion 拉到 2022。
     * 原本掛的 babel-eslint 早已停止維護，而且寫在 parserOptions 底下
     * 只有 vue-eslint-parser 才讀得到，實際上一直沒生效 ——
     * 於是 ecmaVersion 跟著 env.es6 停在 2015，
     * _reservationPage.js 的 ?. 解析不了，整個檔案都沒被檢查。
     */
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: [],
  rules: {
    'no-console': 0,
    'import/no-unresolved': 0,
    /*
     * 第一個值是嚴重度，'never' 是選項。
     * 原本只寫了選項、少了嚴重度，整份設定因此無效 ——
     * eslint 連跑都跑不起來，等於這個專案從來沒被 lint 過。
     */
    'import/extensions': ['off', 'never'],
    'global-require': 0,
    /* 專案在 macOS 上開發，Prettier 也一律寫 LF */
    'linebreak-style': ['error', 'unix'],
    'no-param-reassign': ['error', { props: false }],
    'no-script-url': 0,
    /* petite-vue 的內部狀態習慣用底線開頭 */
    'no-underscore-dangle': 0,

    /*
     * 以下排版規則由 Prettier 負責。
     * 留著的話兩邊會互相推翻：eslint 要求換行、prettier 收回同一行，
     * 每跑一次 format 就製造一批 lint 錯誤。
     * eslint 在這個專案只負責抓「會壞掉」的問題，不管長相。
     */
    'max-len': 0,
    indent: 0,
    quotes: 0,
    'comma-dangle': 0,
    'object-curly-newline': 0,
    'object-curly-spacing': 0,
    'function-paren-newline': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    'arrow-parens': 0,
  },
};
