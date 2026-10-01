/*
 * stylelint 設定。
 *
 * 改成 .js 而不是 .json 是為了能寫註解 —— 下面每一條都是刻意關掉或放寬的，
 * 沒有理由的話下一個人只會再把它打開一次，然後再被同一批誤報淹掉。
 * （.eslintrc.js 也是 .js，格式一致。）
 */
module.exports = {
  extends: 'stylelint-config-standard',
  rules: {
    /* postcss-mixins / postcss-for / tailwind 的 @screen 都不是標準 at-rule */
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['mixin', 'define-mixin', 'each', 'if', 'else', 'for', 'include', 'screen'],
      },
    ],

    /* 字型堆疊統一在 _common 裡定義，各處不重複補 generic family */
    'font-family-no-missing-generic-family-keyword': [
      true,
      {
        ignoreFontFamilies: ['/.*/'],
      },
    ],

    /*
     * 類名一律 kebab-case，但允許 --modifier 這種修飾子
     * （CSS 裡要寫成跳脫過的 .\-\-modifier）。
     *
     * 這是全站用了幾十處的慣例：.m-btn.--border、.m-tab.--stack-m、
     * .m-bg-photo.--cta…… 標記與樣式表兩邊都是這樣寫，
     * 改成 kebab-case 等於要動每一支 view。
     */
    'selector-class-pattern': [
      '^(\\\\?-\\\\?-)?[a-z][a-z0-9]*(-[a-z0-9]+)*$',
      {
        message: '類名請用 kebab-case；修飾子可以用 --modifier（CSS 裡寫成 .\\-\\-modifier）',
      },
    ],

    /*
     * 關掉：這條規則是為「扁平 CSS」設計的，碰到巢狀寫法幾乎只剩誤報。
     *
     * 它只看選擇器的最後一段，所以會把兩組互不相干的規則湊成一對，例如
     * .m-faq > li:first-child 與 .m-faq-steps > li —— 兩者選到的是不同
     * 容器底下的 li，永遠不可能套到同一個元素，卻因為都以 li 結尾被點名。
     *
     * 另一種是巢狀的必然結果：.m-btn 裡面寫 &.--contain .m-btn-cnt，
     * 它一定出現在獨立的 .m-btn-cnt 之前。要讓規則滿意就得把子元素的
     * 定義搬到父層上面，檔案反而更難讀。
     *
     * 這些情況的權重本來就不同，層疊順序沒有模糊空間，所以關掉整條，
     * 而不是在七個地方各寫一行 stylelint-disable。
     */
    'no-descending-specificity': null,
  },
};
