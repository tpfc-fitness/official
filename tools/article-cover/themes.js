/*
 * 文章封面的分類色系。
 *
 * 底色全部一樣是接近黑的深灰（跟網站一樣），只換「強調色」——
 * 分類字、左上的色條、右側的光暈與 logo 浮水印都用這個顏色。
 * 整張圖還是頭等倉的黑底白字，只是不同分類一眼分得出來，
 * 不會像換了一個網站。
 *
 * 紅與螢光藍綠是網站本來就有的顏色（--xe120、--xb3ff）；
 * 黃與綠是新加的，彩度刻意壓低，放在黑底上不會比紅色搶眼。
 *
 * 新增分類時在這裡加一行；沒列到的分類會用 DEFAULT（灰白）。
 */
module.exports = {
  themes: {
    動作教學: { accent: '#e12020', label: 'MOVEMENT' },
    訓練觀念: { accent: '#b3fff5', label: 'TRAINING' },
    新手入門: { accent: '#f2c14e', label: 'BEGINNER' },
    飲食營養: { accent: '#9bd47a', label: 'NUTRITION' },
  },
  DEFAULT: { accent: '#c7c7c7', label: 'FITNESS KNOWLEDGE' },
};
