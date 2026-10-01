/*
 * 服務項目。
 *
 * 順序：私人教練課程 → 團體訓練 → 自主訓練。
 * 第一組有兩種上課形式，以分頁切換呈現。
 *
 * ⚠️ prices 的數字必須與 _data/offers.js（結構化資料）、_data/newbie-plan.js
 *    與 llms.txt 完全一致，改價格時四處都要動。
 *
 * ⚠️ 每張照片的 alt 各自描述畫面內容，不要改回同一句 ——
 *    同一句 alt 對螢幕閱讀器與搜尋引擎都等於沒有資訊。
 *
 * ⚠️ 不可以依賴 window / document，否則 build 期 require 會壞掉。
 */
module.exports = [
  {
    no: '01',
    en: 'PERSONAL TRAINING',
    title: '私人教練課程',
    subtitle: '一對一／一對二 ｜ 學會動作，建立訓練能力',
    tabs: [
      {
        label: '一對一',
        lead: '專屬指導，從動作到訓練安排都有人帶。',
        body: '依照你的身體狀況、訓練經驗與目標，安排適合自己的訓練內容。從動作學習、重量選擇到訓練安排，教練會在每一次訓練中給予指導與調整，讓你不只是完成今天的課程，也逐漸知道自己該怎麼訓練。',
      },
      {
        label: '一對二',
        lead: '和熟悉的人一起訓練，也有人帶著你們練。',
        body: '適合朋友、伴侶或家人一起上課，在共同訓練的同時，由教練依照兩人的能力與目標安排訓練內容。如果兩人的訓練程度相近，會更適合一起進行；若能力差距較大，訓練強度與課程安排也可能有所不同。',
      },
    ],
    featureTitle: '個人化訓練安排',
    features: ['動作指導', '重量調整', '訓練規劃'],
    priceTitle: '新生方案',
    prices: [
      { name: '一對一', value: '10 堂 NT$8,000', note: '平均一堂 800 元・使用期限三個月' },
      { name: '一對二', value: '10 堂 NT$13,000', note: '兩人合計，平均一堂 1,300 元' },
    ],
    imgs: [
      { path: require('@imgs/service/pt_01.jpg'), alt: '兩位學員在深蹲架前，各自扛著槓鈴做背蹲舉' },
      {
        path: require('@imgs/service/pt_02.jpg'),
        alt: '教練在臥推架旁托著槓鈴，協助學員完成槓鈴臥推',
      },
      {
        path: require('@imgs/service/pt_03.jpg'),
        alt: '學員在軟墊上採跪姿，雙手拉繩索訓練機的握把訓練上背',
      },
      {
        path: require('@imgs/service/pt_04.jpg'),
        alt: '教練在旁觀察，學員扛槓鈴蹲向標示 02 的軟墊跳箱做箱式深蹲',
      },
    ],
  },
  {
    no: '02',
    en: 'GROUP TRAINING',
    title: '團體訓練',
    lead: '除了重訓，加入更多心肺與體能挑戰',
    /*
     * ⚠️ 這一段與 _data/offers.js 的「團體課程」、llms.txt 的團課描述
     *    是同一套說法，改動時三處要一起改。
     */
    body: '小班制團體課程，使用 TRX、雪橇車、戰繩、腳踏車等器材，結合重量訓練與心肺耐力，單堂 6 到 8 人。團課在另一間教室上課，位於捷運民權西路站 9 號出口附近。',
    featureTitle: '重量訓練 × 心肺體能',
    features: ['重量訓練', '心肺訓練', '體能挑戰'],
    priceTitle: '課程費用',
    prices: [{ value: '每堂 NT$428–500', note: '單堂 6 到 8 人' }],
    imgs: [
      {
        path: require('@imgs/service/group_01.jpg'),
        alt: '團課學員站在瑜伽墊上，雙手握 TRX 懸吊帶做側向伸展',
      },
      {
        path: require('@imgs/service/group_02.jpg'),
        alt: '團課學員仰躺在瑜伽墊上，雙腳抵牆、雙手向上伸直訓練核心',
      },
      {
        path: require('@imgs/service/group_03.jpg'),
        alt: '團課學員分站在瑜伽墊上，分別使用 TRX、藥球與壺鈴進行訓練',
      },
      {
        path: require('@imgs/service/group_04.jpg'),
        alt: '兩排團課學員雙手抱著壺鈴蹲到底，做高腳杯深蹲',
      },
    ],
  },
  {
    no: '03',
    en: 'SELF TRAINING',
    title: '自主訓練',
    lead: '把課堂上學到的東西，帶進自己的訓練。',
    body: '購課學員可於課程結束前自由使用訓練器材，將課堂上學到的動作與訓練方式實際運用在自己的訓練中。若現場狀況允許，巡場教練也會適時提供協助與指導，讓剛開始接觸健身房的學員，也能慢慢熟悉自主訓練。',
    featureTitle: '自主訓練支援',
    features: ['課後自主訓練', '器材自由使用', '巡場教練協助'],
    priceTitle: '費用',
    prices: [{ value: '購課學員完課期間免費', note: '使用方式於體驗課時說明' }],
    imgs: [
      { path: require('@imgs/service/self_01.jpg'), alt: '學員獨自在深蹲架內扛槓鈴蹲到底' },
      { path: require('@imgs/service/self_02.jpg'), alt: '學員獨自躺在臥推椅上推起槓鈴' },
      { path: require('@imgs/service/self_03.jpg'), alt: '學員俯身握住地上的槓鈴，準備做硬舉' },
    ],
  },
];
