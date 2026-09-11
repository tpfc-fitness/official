/*
 * 課程項目。
 *
 * 順序：私人教練課程 → 團體訓練 → 自主訓練。
 * 第一組有兩種上課形式，以分頁切換呈現。
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
    imgs: [
      require('@imgs/service/pt_01.jpg'),
      require('@imgs/service/pt_02.jpg'),
      require('@imgs/service/pt_03.jpg'),
      require('@imgs/service/pt_04.jpg'),
    ],
  },
  {
    no: '02',
    en: 'GROUP TRAINING',
    title: '團體訓練',
    lead: '除了重訓，加入更多心肺與體能挑戰',
    body: '團體訓練以重量訓練為基礎，加入心肺與體能訓練元素，透過不同訓練方式提升整體體能與運動表現。課程可能運用雪橇車、戰繩、腳踏車等訓練器材，讓每次訓練不只練力量，也能挑戰心肺與體能。',
    featureTitle: '重量訓練 × 心肺體能',
    features: ['重量訓練', '心肺訓練', '體能挑戰'],
    imgs: [
      require('@imgs/service/group_01.jpg'),
      require('@imgs/service/group_02.jpg'),
      require('@imgs/service/group_03.jpg'),
      require('@imgs/service/group_04.jpg'),
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
    imgs: [
      require('@imgs/service/self_01.jpg'),
      require('@imgs/service/self_02.jpg'),
      require('@imgs/service/self_03.jpg'),
      require('@imgs/service/self_04.jpg'),
    ],
  },
];
