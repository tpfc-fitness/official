/*
 * 首頁「想先了解更多？」的常見問題。
 *
 * 這份資料在 build 期由 EJS 渲染成靜態 HTML（<details>／<summary>），
 * 收合狀態不影響索引，內容一律讀得到。
 *
 * ⚠️ 不可以依賴 window / document，否則 build 期 require 會壞掉。
 */
const rental = require('_data/rental.js');

module.exports = [
  {
    no: '01',
    question: '免費體驗課在做什麼？',
    /* 預設展開，其餘收合 */
    open: true,
    body: '第一次來不需要先知道怎麼練。體驗課會依照你的狀況，從了解身體狀態開始，帶你實際體驗訓練，並給予後續建議。',
    steps: [
      '基本狀況了解（訓練經驗、目標、身體狀態）',
      '基礎動作教學與實際操作',
      '動作調整與問題分析',
      '訓練觀念說明',
      '後續訓練方向建議',
    ],
    cta: {
      label: '預約免費體驗課',
      link: './contact.html',
    },
  },
  {
    no: '02',
    question: '新生 10 堂 8,000 元方案',
    /* ⚠️ 草稿：改寫自跑馬燈的既有文案，請確認或改寫 */
    body: '凡首次購買，一對一私人教練課 10 堂 8,000 元。完課期間到館自主訓練免費，適合想先把基礎打好、再決定長期訓練方向的人。',
  },
  {
    no: '03',
    question: '場租方案怎麼算？',
    /* 價目與服務項目頁共用同一份，見 _data/rental.js */
    body: `${rental.lead}詳細費用如下：`,
    plans: rental.plans,
    notes: rental.notes,
  },
];
