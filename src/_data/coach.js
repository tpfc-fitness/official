/*
 * 教練團隊。
 *
 * 每位教練有三組內容，對應頁面上的三個分頁：
 *   certificates  研習 & 證照
 *   suitableFor   適合學生
 *   approach      專長 & 訓練方式
 *
 * ⚠️ 目前只有 Benson 的內容是完整的，其餘五位待補。
 *    三個陣列留空時，頁面會顯示「內容整理中」而不是空白區塊。
 *
 * ⚠️ 不可以依賴 window / document，否則 build 期 require 會壞掉。
 */
module.exports = [
  {
    name: 'Benson',
    job: '創辦人',
    tagline: '耐心魔 × 全能型',
    img: require('ourteam/coach_benson.jpg'),
    certificates: [
      'NASM-CPT',
      '美國國家運動醫學會認證私人教練',
      '中華民國C級體適能指導員',
      '運動按摩技術員研習證書',
      '壺鈴教學技巧KTS1研習證書',
      'CPR+AED心肺復甦術',
      'FPS功能性運動表現專家L1',
      '運動科學訓練專家Lv1',
    ],
    suitableFor: ['新手、中手、老人', '想要培養運動習慣、學習動作與訓練方法、有特殊身體疾病者'],
    approach: [
      '10分鐘內絕對讓你學會動作',
      '「你的身體結構沒辦法做這個動作」，這種說法絕對不存在',
      '從最基礎的徒手，慢慢進步到器械，最後自由重量',
      '讓你把訓練的動作應用到日常生活中，不只練體態，還要提升生活品質',
    ],
  },
  {
    name: 'Jeffery',
    job: '店長',
    tagline: '誇誇魔 × 全能型',
    img: require('ourteam/coach_jeffery.jpg'),
    certificates: [],
    suitableFor: [],
    approach: [],
  },
  {
    name: 'Roy',
    job: '私人教練',
    tagline: '調整魔 × 功能型',
    img: require('ourteam/coach_roy.jpg'),
    certificates: [],
    suitableFor: [],
    approach: [],
  },
  {
    name: 'Elain',
    job: '私人教練',
    tagline: '健美魔 × 體態型',
    img: require('ourteam/coach_elain.jpg'),
    certificates: [],
    suitableFor: [],
    approach: [],
  },
  {
    name: '阿圓',
    job: '私人教練',
    tagline: '肌肉魔 × 體態型',
    img: require('ourteam/coach_ayuan.jpg'),
    certificates: [],
    suitableFor: [],
    approach: [],
  },
  {
    name: 'Runa',
    job: '私人教練',
    tagline: '調整魔 × 功能型',
    img: require('ourteam/coach_runa.jpg'),
    certificates: [],
    suitableFor: [],
    approach: [],
  },
];
