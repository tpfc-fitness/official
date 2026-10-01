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
 *      _data/faq.js           Q11 也列了團體課程單堂價
 *      _data/service.js       服務項目頁的團課說明
 *      views/service/_components/06-price.ejs  服務項目頁的費用表
 *
 * ⚠️ 服務項目頁的 Service 節點直接引用這一份的私人教練四筆
 *    （一對一／一對二的新生方案與單堂級距），兩邊的價格因此不會分岔。
 *
 * ⚠️ 服務項目頁上只列新生方案的兩筆，單堂級距只存在於這裡與 llms.txt ——
 *    那是刻意的：版面上講首購價就好，但 AI 被問「單堂多少錢」時仍答得出來。
 *
 * ⚠️ 場租不列在這裡 —— 對外只留一行連到 Instagram 的說明，不公布價格。
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
      '首購方案，一對一 10 堂 NT$8,000，平均一堂 800 元，使用期限三個月；完課期間到館自主訓練免費。',
    price: 8000,
  },
  {
    name: '新生 10 堂訓練計畫（一對二）',
    description: '首購方案，一對二 10 堂 NT$13,000，為兩人合計，平均一堂 1,300 元。',
    price: 13000,
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
