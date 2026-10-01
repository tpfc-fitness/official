/*
 * 一對一私人教練頁的內容來源。
 *
 * 整頁只有這一個檔要改 —— 各區塊的 .ejs 只負責排版，文字與圖片都在這裡。
 *
 * ⚠️ 價格必須與 _data/offers.js（結構化資料）、_data/newbie-plan.js
 *    與 llms.txt 完全一致，改價格時四處要一起改。
 *
 * ⚠️ 一對一是主推，一對二是次要選項 ——
 *    版面上一對一的卡較寬並帶「建議從這裡開始」標記，順序不要對調。
 *
 * ⚠️ 每張照片的 alt 各自描述畫面內容，不要改回同一句；
 *    純氛圍用的滿版底圖才走 decorative（輸出 alt=""）。
 *
 * ⚠️ 不可以依賴 window / document，否則 build 期 require 會壞掉。
 */

/* 兩個區塊會用到：連結與按鈕都指向同一個預約頁 */
const CONTACT = './contact.html';

module.exports = {
  /* ---- KV ---- */
  kv: {
    /* ⚠️ 佔位圖。換成正式主視覺時，alt 也要跟著改成描述該張照片的內容。 */
    img: require('@imgs/service/kv.jpg'),
    alt: 'KV 佔位圖，待換上正式主視覺',
  },

  /* ---- 導言 ---- */
  hero: {
    eyebrow: 'PERSONAL TRAINING',
    title: '民權西路一對一私人教練',
    lead: '頭等倉運動空間位於台北市中山區，捷運民權西路站 4 號出口步行約 3 分鐘，提供一對一私人教練課程。我們不只陪你完成每一堂課，更希望你學會訓練，最後能自己走進健身房。',
    place: '捷運民權西路站 4 號出口步行約 3 分鐘',
    cta: { label: '預約免費體驗', link: CONTACT },
  },

  /* ---- 我們怎麼帶你訓練 ---- */
  approach: {
    eyebrow: 'OUR APPROACH',
    title: '私人教練怎麼帶你訓練？',
    bg: require('@imgs/service/firstclass_fitness_equipment.jpeg'),
    steps: [
      {
        no: '01',
        title: '第一堂課後，就能自己來練',
        body: '複習課堂上學的動作，用課堂上的重量練習。',
      },
      {
        no: '02',
        title: '基礎動作學完一輪，教練開菜單',
        body: '動作穩定之後，教練會依照你的狀況開訓練菜單，讓你自主訓練時有方向可以照著練。',
      },
      {
        no: '03',
        title: '上課重量進步，自主訓練同步加重',
        body: '每次上課重量提升，你自己練的時候也跟著加重。',
      },
      {
        no: '04',
        title: '最後學會自己安排菜單',
        body: '知道最基礎、也最夠用的動作要怎麼交叉安排。',
      },
    ],
    /* 兩個追問：是「怎麼帶你訓練」的延伸，所以層級是 h3 */
    notes: [
      {
        title: '動作做不好時，教練會怎麼處理？',
        body: '教練會先觀察你的動作，再給你針對性的指令。如果是身體緊繃、活動度不足，或是特定肌肉啟動不順，讓動作做不出來，會先做放鬆、活動度調整與誘發性的熱身動作，再回到主要訓練動作練習。',
      },
      {
        title: '上完課，你可以做到',
        body: '自己上健身房訓練、幫自己安排訓練課表、判斷自己能不能加重、懂得怎麼吃並和食物和平相處，以及練到你想練的肌肉，往你的期望進展。',
      },
    ],
  },

  /* ---- 一對一還是一對二 ---- */
  courses: {
    eyebrow: 'OUR SERVICE',
    title: '一對一還是一對二？',
    lead: '我們建議從一對一開始。教練的注意力完全在你身上，動作調整和重量安排都能依照你的進度走，進步也最快。',
    items: [
      {
        no: '01',
        name: '一對一私人教練',
        badge: '建議從這裡開始',
        lead: '專屬指導，從動作到訓練安排都有人帶。',
        body: '依照你的身體狀況、訓練經驗與目標，安排適合自己的訓練內容。從動作學習、重量選擇到訓練安排，教練會在每一次訓練中給予指導與調整，讓你不只是完成今天的課程，也逐漸知道自己該怎麼訓練。',
        img: require('@imgs/service/pt_02.jpg'),
        alt: '教練在臥推架旁托著槓鈴，協助學員完成槓鈴臥推',
      },
      {
        no: '02',
        name: '一對二私人教練',
        lead: '一對二適合程度相近、而且上課時間能固定配合的兩個人。',
        body: '如果兩人程度差距較大，或時間常常湊不上，課程進度就會受影響，這種情況還是建議各自上一對一。',
        img: require('@imgs/service/pt_01.jpg'),
        alt: '兩位學員在深蹲架前，各自扛著槓鈴做背蹲舉',
      },
    ],
  },

  /* ---- 適合什麼人 ---- */
  audience: {
    eyebrow: 'FOR WHO',
    title: '私人教練適合什麼人？',
    items: [
      {
        icon: 'icon_book',
        title: '健身新手',
        body: '從器材使用和基礎動作開始學。第一堂課後，就能用課堂上學的動作和重量自己練習。',
        img: require('@imgs/service/pt_04.jpg'),
        alt: '教練在旁觀察，學員扛槓鈴蹲向標示 02 的軟墊跳箱做箱式深蹲',
      },
      {
        icon: 'icon_growth',
        title: '已經有訓練經驗',
        body: '想確認動作對不對，或是卡在停滯期。教練會先找出動作做不好的原因，看是緊繃、活動度不足，還是肌肉啟動不順，再調整訓練。',
        img: require('@imgs/service/self_03.jpg'),
        alt: '學員俯身握住地上的槓鈴，準備做硬舉',
      },
      {
        icon: 'icon_posture',
        title: '想增肌減脂、改善體態',
        body: '除了訓練，也會教你怎麼吃，學會和食物和平相處。',
        links: [
          { label: '認識 Elain 教練', href: './ourteam.html#coach-elain' },
          { label: '認識阿圓教練', href: './ourteam.html#coach-ayuan' },
        ],
        img: require('@imgs/service/self_02.jpg'),
        alt: '學員獨自躺在臥推椅上推起槓鈴',
      },
      {
        /* ⚠️ icon_mobility 是這次新畫的，現有圖庫沒有對應的復健／活動度圖示 */
        icon: 'icon_mobility',
        title: '結束復健後想回到訓練',
        body: '從放鬆、活動度調整與誘發動作開始，再逐步回到重量訓練。建議先確認你的治療師同意你恢復訓練。',
        img: require('@imgs/service/pt_03.jpg'),
        alt: '學員在軟墊上採跪姿，雙手拉繩索訓練機的握把訓練上背',
      },
      {
        icon: 'icon_dumbbel_hand',
        title: '想學會自己訓練',
        body: '從照著教練開的菜單練，到最後懂得自己交叉安排菜單。',
        img: require('@imgs/service/self_01.jpg'),
        alt: '學員獨自在深蹲架內扛槓鈴蹲到底',
      },
    ],
  },

  /* ---- 費用 ---- */
  pricing: {
    eyebrow: 'PRICING',
    title: '私人教練課程費用',
    /* 新生方案收進一對一卡：它本來就是一對一的首購價 */
    plans: [
      {
        name: '一對一私人教練',
        badge: '新生方案',
        unit: '10 堂',
        price: 'NT$8,000',
        note: '平均每堂 800 元',
        features: [
          '使用期限三個月',
          '完課期間可到館自主訓練',
          '新生方案結束後，每堂 NT$1,200–1,600，依購買堂數與優惠方案而定',
        ],
      },
      {
        name: '一對二私人教練',
        unit: '每堂',
        price: 'NT$1,700–2,100',
        note: '兩人合計',
        features: ['依購買堂數與優惠方案而定', '適合程度相近、上課時間能固定配合的兩個人'],
      },
    ],
    cta: { label: '預約免費體驗', link: CONTACT },
  },

  /* ---- 第一次來頭等倉 ---- */
  firstVisit: {
    eyebrow: 'FIRST VISIT',
    title: '第一次來頭等倉',
    body: [
      '不需要任何健身經驗，第一次可以先預約免費體驗課。體驗課約 60 分鐘，包含 InBody 測量、身體狀況了解、基礎動作教學與後續訓練建議，不需要當場購買課程。',
      '一對一私人教練課位於台北市中山區中山北路二段，捷運民權西路站 4 號出口步行約 3 分鐘。',
    ],
    links: [
      { label: '查看體驗課流程', href: './faq.html' },
      { label: '交通與環境', href: './information.html' },
    ],
    place: ['台北市中山區中山北路二段', '捷運民權西路站 4 號出口步行約 3 分鐘'],
    cta: { label: '預約免費體驗', link: CONTACT },
  },

  /* ---- 其他服務 ---- */
  other: {
    eyebrow: 'OTHER SERVICE',
    title: '其他服務',
    items: [
      {
        name: '團體訓練',
        /*
         * ⚠️ 這一段與 _data/offers.js 的「團體課程」、llms.txt 的團課描述
         *    是同一套說法，改動時三處要一起改。
         */
        body: '小班制團體課程，使用 TRX、雪橇車、戰繩、腳踏車等器材，結合重量訓練與心肺耐力，單堂 6 到 8 人，每堂 NT$428–500。團課在另一間教室上課，位於捷運民權西路站 9 號出口附近。',
        img: require('@imgs/service/group_01.jpg'),
        alt: '團課學員站在瑜伽墊上，雙手握 TRX 懸吊帶做側向伸展',
      },
      {
        name: '教練場租',
        /* ⚠️ 場租不公布價格，對外只留這一行連到 Instagram 的說明 */
        body: '自由教練場租方案，請見 Instagram 說明。',
        link: {
          label: '場租說明',
          href: 'https://www.instagram.com/p/Czc3d1_P1yS/?img_index=1',
        },
        img: require('@imgs/service/firstclass_fitness_indoor.jpg'),
        alt: '頭等倉運動空間室內場地，深灰地墊、深蹲架與成排彩色槓片',
      },
    ],
  },

  /* ---- 結尾行動呼籲 ---- */
  closing: {
    eyebrow: 'READY TO START',
    title: ['不知道自己適合怎麼開始？', '先來體驗一次，再決定適不適合你。'],
    place: '台北市中山區｜捷運民權西路站 4 號出口步行約 3 分鐘',
    bg: require('@imgs/common/firstclass_fitness_indoor2.jpg'),
    cta: { label: '預約免費體驗', link: CONTACT },
  },
};
