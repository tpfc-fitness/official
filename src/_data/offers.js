/*
 * 課程與方案的價格（給結構化資料用）。
 *
 * 這一份是 hasOfferCatalog 的來源，目的是讓價格變成「機器讀得懂」的
 * 資料 —— 生成式搜尋回答「台北中山區私人教練多少錢」時才引用得到。
 *
 * ⚠️ 同樣的數字在頁面上也有顯示，改價格時這幾處要一起改：
 *      _data/service.js       服務項目頁的價格方案（pricing）與團課、自主訓練費用
 *      _data/faq.js           「價格與交通」第一題的價目
 *      _data/contact-faq.js   Q5 新生優惠結束後的價格
 *      _data/newbie-plan.js   新生 10 堂（首頁 CTA 與方案區塊）
 *      llms.txt               6.2 Pricing
 *
 * ⚠️ 服務項目頁的 Service 節點（_components/mJsonLd.ejs 的 PT_OFFER_NAMES）
 *    用「name 完全比對」從這裡挑出私人教練的方案。所以：
 *      - 改某一筆的 name，那邊的清單要跟著改，不然會找不到而讓 build 失敗
 *      - 新增私人教練方案時，要把 name 加進那份清單才會出現在 Service 節點裡
 *
 * price 是定價；minPrice / maxPrice 是單堂價的區間（依購買堂數而不同）。
 *
 * ⚠️ 場租不列在這裡 —— 對外只留一行連到 Instagram 的說明，不公布價格。
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
      '首購方案，一對一 10 堂 NT$8,000，平均一堂 800 元，使用期限三個月；完課期間到館自主訓練免費。',
    price: 8000,
  },
  {
    name: '新生 10 堂訓練計畫（一對二）',
    description:
      '首購方案，一對二 10 堂 NT$13,000，為兩人合計，平均一堂 1,300 元，使用期限三個月。',
    price: 13000,
  },
  {
    name: '新手組合 10＋8 堂',
    description: '首購限定，一對一新生 10 堂加 8 堂，共 18 堂，平均每堂約 1,244 元。',
    price: 22400,
  },
  {
    name: '16＋1 堂',
    description: '一對一正式方案，每堂 1,600 元，另贈 1 堂。',
    price: 25600,
  },
  {
    name: '32＋2 堂',
    description: '一對一正式方案，每堂 1,500 元，另贈 2 堂。',
    price: 48000,
  },
  {
    name: '48＋3 堂',
    description: '一對一正式方案，每堂 1,300 元，另贈 3 堂。',
    price: 62400,
  },
  {
    name: '一對一私人教練課',
    description:
      '新生方案結束後的正式方案單堂價格，依購買堂數而不同：16＋1 堂每堂 1,600 元、32＋2 堂每堂 1,500 元、48＋3 堂每堂 1,300 元。',
    minPrice: 1300,
    maxPrice: 1600,
    unitText: '堂',
  },
  {
    name: '一對二私人教練課',
    description:
      '兩人一起訓練，適合程度與目標相近的人；價格為兩人合計，依購買堂數與當期優惠而不同。',
    minPrice: 1700,
    maxPrice: 2100,
    unitText: '堂',
  },
  {
    name: '團體課程',
    description:
      '小班制團體課程，使用 TRX、雪橇車、戰繩、腳踏車等器材，結合重量訓練與心肺耐力，單堂 6 至 8 人，由 Benson 教練帶課。',
    minPrice: 428,
    maxPrice: 500,
    unitText: '堂',
  },
];
