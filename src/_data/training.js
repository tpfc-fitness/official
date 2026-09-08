/*
 * 訓練流程三步驟（教練團隊頁）
 *
 * 這份資料在 build 期由 EJS 直接讀取並渲染成靜態 HTML，
 * 讓文字與圖片（含 alt）都能被搜尋引擎索引。
 *
 * ⚠️ 不可以依賴 window / document，否則 build 期 require 會壞掉。
 */
module.exports = [
  {
    title: '專業諮詢評估',
    cnt: '透過初步的諮詢了解您的運動目標與動機，<br class="tm:hidden"/>制定您的訓練目標。'
  },
  {
    title: '規劃專屬課程',
    cnt: '根據您的目標，規劃專屬於您的訓練。'
  },
  {
    title: '安全性把關',
    cnt: '根據您在執行訓練計畫的過程中，會依據您的訓練品質<br class="tm:hidden"/>去調整您的課表，在安全的狀態下把關每一次的訓練。'
  },
];
