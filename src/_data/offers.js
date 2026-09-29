/*
 * 課程與方案的價格（給結構化資料用）。
 *
 * 這一份是 hasOfferCatalog 的來源，目的是讓價格變成「機器讀得懂」的
 * 資料 —— 生成式搜尋回答「台北中山區私人教練多少錢」時才引用得到。
 *
 * ⚠️ 同樣的數字在頁面上也有顯示，改價格時這幾處要一起改：
 *      _data/newbie-plan.js   新生 10 堂（首頁 CTA 與方案區塊）
 *      _data/faq.js           Q10 的價格級距
 *      _data/contact-faq.js   Q5 一對一單堂
 *      _data/rental.js        場租價目（首頁 FAQ 與服務項目頁共用）
 *      _data/faq.js           Q11 也列了團體課程單堂價
 *
 * price 是定價；minPrice / maxPrice 是級距（搭配當期優惠會落在區間內）。
 *
 * ⚠️ 不可以依賴 window / document，否則 build 期 require 會壞掉。
 */
module.exports = [
  {
    name: '免費體驗課',
    description:
      '約 60 分鐘，含 InBody 測量、身體狀況評估、基礎動作教學與後續訓練方向建議，不需當場購買課程。',
    price: 0,
  },
  {
    name: '新生 10 堂訓練計畫',
    description:
      '首購方案，10 堂 NT$8,000，平均一堂 800 元，使用期限三個月；完課期間到館自主訓練免費。',
    price: 8000,
  },
  {
    name: '一對一私人教練課',
    description: '新生方案結束後的單堂價格，依購買堂數與當期優惠而不同。',
    minPrice: 1200,
    maxPrice: 1600,
    unitText: '堂',
  },
  {
    name: '一對二私人教練課',
    description: '兩人一起訓練，適合程度與目標相近的人；依購買堂數與當期優惠而不同。',
    minPrice: 1700,
    maxPrice: 2100,
    unitText: '堂',
  },
  {
    name: '團體課程',
    description: 'TRX、心肺耐力、基礎與進階重訓，單堂 6 至 8 人，由 Benson 教練帶課。',
    minPrice: 428,
    maxPrice: 500,
    unitText: '堂',
  },
  {
    name: '教練場租・月租',
    description: '自由教練場地租借，不限堂數 30 天。',
    price: 10000,
  },
  {
    name: '教練場租・計次',
    description: '自由教練場地租借，10 堂 NT$3,000、20 堂 NT$5,000、40 堂 NT$8,000。',
    minPrice: 200,
    maxPrice: 300,
    unitText: '堂',
  },
];
