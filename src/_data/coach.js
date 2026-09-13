/*
 * 教練團隊。
 *
 * 每位教練有三組內容，對應頁面上的三個分頁：
 *   certificates  研習 & 證照
 *   suitableFor   適合學生
 *   approach      專長 & 訓練方式
 *
 * 任一陣列留空時，該分頁會顯示「內容整理中」而不是空白區塊。
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
    certificates: [
      'CPR-AED',
      '銀髮族體適能指導員',
      '幼兒體適能指導員',
      '中華民國C級體適能指導員',
      'NASM-CPT',
      'TRX-STC研習',
      '中華民國足球協會C級教練證',
      '中華民國足球協會C級裁判證',
    ],
    suitableFor: ['新手，需要情緒價值才能堅定訓練決心的人'],
    approach: ['在說說笑笑之中，不小心力量就變大了，體態就變好了'],
  },
  {
    name: 'Roy',
    job: '私人教練',
    tagline: '調整魔 × 功能型',
    img: require('ourteam/coach_roy.jpg'),
    certificates: [
      'NASM-CPT',
      'TBMM-CES 矯正運動專家',
      '中華民國健身運動協會c級指導員',
      '功能性藥球訓練',
      'AirFit懸吊系統訓練',
      '亞洲體適能教育協會 內臟筋膜呼吸鬆動術',
      '亞洲體適能教育協會 筋膜刀筋膜鬆動專家',
    ],
    suitableFor: ['身體有特殊疾病限制者', '不喜聊天，就想認真訓練者'],
    approach: ['調整、調整再調整，呼吸、呼吸再呼吸', '不聊天，我們就是認真把身體功能搞好'],
  },
  {
    name: 'Elain',
    job: '私人教練',
    tagline: '健美魔 × 體態型',
    img: require('ourteam/coach_elain.png'),
    /* ⚠️ 尚未提供證照清單 */
    certificates: [],
    suitableFor: ['女孩、新手', '想要瘦卻有線條的人'],
    approach: ['雖然整堂課都在笑，但第二天起床絕對讓你痠', '嚴格，但你的體態會很快有變化'],
  },
  {
    name: '阿圓',
    job: '私人教練',
    tagline: '肌肉魔 × 體態型',
    img: require('ourteam/coach_ayuan.jpg'),
    certificates: [
      'FISAF TAIWAN 培育體適能指導員',
      '體適能C級證照',
      'CPR+AED心肺復甦術',
      'Ifbb 健體公開組第四名',
    ],
    suitableFor: ['最怕空氣凝結', '需要誇誇才能鼓起勇氣繼續訓練'],
    approach: [
      '被肌肉控制的人類，人生只有吃睡練，最懂怎麼把肌肉變出來、把脂肪變不見',
      '訓練可以高強度也可以溫和，反正不管怎樣就是會把你的肌肉變出來',
    ],
  },
  {
    name: 'Runa',
    job: '私人教練',
    tagline: '調整魔 × 功能型',
    img: require('ourteam/coach_runa.jpg'),
    certificates: [
      'NASM-CPT',
      '美國國家運動醫學會私人教練認證',
      'AFAA CPI 國際皮拉提斯教練證',
      '預防及延緩失能照護師資',
      'C級游泳教練證',
      'C級幼兒體適能指導員',
      '銀髮族功能性體適能指導員',
      '銀髮族體適能檢測員',
      'CPR 與急救認證',
    ],
    suitableFor: ['身體有特殊疾病或限制者'],
    approach: ['調整、調整再調整，呼吸、呼吸再呼吸', '鄰家妹妹陪你沒壓力的一起進步'],
  },
];
