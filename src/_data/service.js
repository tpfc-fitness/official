/*
 * 服務項目。
 *
 * 順序：私人教練課程 → 團體訓練 → 自主訓練。
 * 第一組有兩種上課形式，以分頁切換呈現。
 *
 * 價格有兩種寫法，模板依欄位決定畫哪一種：
 *   pricing           可收合的「價格方案」（私人教練課程用，方案多）
 *   priceTitle/prices 直接列出的價目（團體訓練、自主訓練用，只有一兩列）
 *
 * ⚠️ pricing 與 prices 的數字必須與 _data/offers.js（結構化資料）、
 *    _data/faq.js、_data/contact-faq.js、_data/newbie-plan.js 與 llms.txt
 *    完全一致，改價格時這幾處都要動。
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
    /*
     * 價格方案（收合）。
     *
     * 主視覺是單堂價（value），總價放在 term 當附註 ——
     * 比較方案時大家看的是「一堂多少」，總價是決定買哪個之後才看的。
     *
     * ⚠️ 期限只寫在新生 10 堂上。新手組合與正式方案刻意不寫期限，
     *    也刻意不寫「新生＋正式方案」的組合平均價，不要自己補上去。
     */
    pricing: {
      summary: '價格方案',
      hint: '',
      groups: [
        {
          title: '新生方案 10堂優惠',
          note: '限購一次・先試試看',
          rows: [
            {
              name: '一對一',
              term: '總價 NT$8,000・使用期限三個月',
              unit: '每堂',
              value: '800',
            },
            {
              name: '一對二',
              term: '兩人合計 NT$13,000・使用期限三個月',
              unit: '每堂',
              value: '1,300',
            },
            {
              name: '新手組合 10＋8 堂',
              badge: '推薦',
              term: '一對一共 18 堂・總價 NT$22,400',
              unit: '平均',
              value: '1,244',
            },
          ],
        },
        {
          title: '正式方案（一對一）',
          note: '確定適合再續',
          rows: [
            {
              name: '16＋1 堂',
              term: '總價 NT$25,600・含贈堂每堂約 1,506',
              unit: '每堂',
              value: '1,600',
            },
            {
              name: '32＋2 堂',
              term: '總價 NT$48,000・含贈堂每堂約 1,412',
              unit: '每堂',
              value: '1,500',
            },
            {
              name: '48＋3 堂',
              term: '總價 NT$62,400・含贈堂每堂約 1,224',
              unit: '每堂',
              value: '1,300',
            },
          ],
        },
      ],
      footnote: '付款方式：匯款或現金',
      /*
       * 連到 faq 頁「要買幾堂？」那一題，faq 頁會自動展開並捲過去。
       * ⚠️ #choose-plan 是 _data/faq.js 裡那一題的 id，兩邊要一起改。
       */
      link: { label: '不知道怎麼選？看各方案適合誰', href: './faq.html#choose-plan' },
    },
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
    prices: [{ value: '1對1/1對2購課期間免費', note: '使用方式於體驗課時說明' }],
    imgs: [
      { path: require('@imgs/service/self_01.jpg'), alt: '學員獨自在深蹲架內扛槓鈴蹲到底' },
      { path: require('@imgs/service/self_02.jpg'), alt: '學員獨自躺在臥推椅上推起槓鈴' },
      { path: require('@imgs/service/self_03.jpg'), alt: '學員俯身握住地上的槓鈴，準備做硬舉' },
    ],
  },
];
