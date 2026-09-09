/*
 * 教練團隊
 *
 * 這份資料在 build 期由 EJS 直接讀取並渲染成靜態 HTML，
 * 讓文字與圖片（含 alt）都能被搜尋引擎索引。
 *
 * ⚠️ 不可以依賴 window / document，否則 build 期 require 會壞掉。
 */
module.exports = [
  {
    name: 'Benson',
    job: '創辦人/體能教練',
    certificate: [
      'NASM Certified Personal Trainer',
      '美國國家運動醫學會認證私人教練',
      '體適能C級證照',
      '運動按摩技術員研習證書',
      '壺鈴教學技巧KTS1研習證書',
      'CPR+AED心肺復甦術',
    ],
    skill: [
      '重量訓練指導',
      '體態評估調整',
      '健力式訓練',
      '個人運動週期規劃',
      '肌肉筋膜放鬆',
      '功能性訓練',
      '銀髮族肌力訓練',
      '身體活動度改善',
      '動作控制',
      'OPT模組週期課表規劃',
      '運動表現強化',
    ],
    img: require('ourteam/coach_benson.jpg'),
  },
  {
    name: 'Allen',
    job: '儲備經理/體能教練',
    certificate: [
      'NASM Certified Personal Trainer',
      '美國國家運動醫學會認證私人教練',
      '體適能C級證照',
      'CPR+AED心肺復甦術',
    ],
    skill: [
      '重量訓練指導',
      '體態評估及雕塑',
      '健美式訓練',
      '減脂規劃',
      '體態雕塑規劃',
      '個人週期化肌力訓練',
      '肌力與肌耐力訓練',
      '客製化週期訓練',
    ],
    img: require('ourteam/coach_allen.jpg'),
  },
  {
    name: 'Alex',
    job: '體能教練',
    certificate: ['體適能C級證照', 'CPR+AED心肺復甦術'],
    skill: [
      '重量訓練指導',
      '增肌減脂客製化訓練',
      '肌肥大週期性訓練',
      '體態評估調整',
      '健美式訓練',
      '超負荷肌力訓練',
      '肌力與肌耐力訓練',
    ],
    img: require('ourteam/coach_alex.jpg'),
  },
  {
    name: 'Roy',
    job: '體能教練',
    certificate: [
      'NASM Certified Personal Trainer',
      '美國國家運動醫學會認證私人教練',
      '體適能C級證照',
      'CPR+AED心肺復甦術',
    ],
    skill: [
      '一對一阻力訓練',
      '體態評估調整',
      '肌肉筋膜放鬆',
      '身體活動度改善',
      '核心訓練',
      '個人運動規劃課程',
      '徒手肌力訓練',
      '肌力訓練規劃',
    ],
    img: require('ourteam/coach_roy.jpg'),
  },
];
