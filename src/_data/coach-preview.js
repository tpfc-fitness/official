/*
 * 首頁的教練團隊摘要。
 *
 * 與 _data/coach.js（教練團隊頁的完整資料）刻意分開：
 * 首頁只放三位、文案較短，且「一句話定位」的寫法與內頁不同。
 *
 * ⚠️ 不可以依賴 window / document，否則 build 期 require 會壞掉。
 */
module.exports = [
  {
    name: 'Benson',
    title: '創辦人 | 耐心魔人',
    skills: ['耐心親切', '動作優化', '個人化訓練'],
    img: require('ourteam/coach_benson.jpg'),
  },
  {
    name: 'Elain',
    title: '私人教練 | 激勵魔人',
    skills: ['熱情嚴謹', '肌力提升', '體態雕塑'],
    img: require('ourteam/coach_elain.jpg'),
  },
  {
    name: '阿圓',
    title: '私人教練 | 誇誇魔人',
    skills: ['正向鼓勵', '新手訓練', '增肌減脂'],
    img: require('ourteam/coach_ayuan.jpg'),
  },
];
