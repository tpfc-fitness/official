/*
 * 預約頁：訓練方針、學員成果、評論
 *
 * 這份資料在 build 期由 EJS 直接讀取並渲染成靜態 HTML，
 * 讓文字與圖片（含 alt）都能被搜尋引擎索引。
 *
 * ⚠️ 不可以依賴 window / document，否則 build 期 require 會壞掉。
 */
module.exports = {
  trainingRules: [
    {
      subTitle: '方針一',
      title: '即時動作修正優化',
      content: ['依個人身體調整', '基礎動作確實到位', '每一下都有效率'],
    },
    {
      subTitle: '方針二',
      title: '個人化週期訓練',
      content: ['依 InBody 與目標規劃', '每週課表不盲練', '訓練方向清楚有效'],
    },
    {
      subTitle: '方針三',
      title: '漸進式強度設計',
      content: ['精準選擇訓練重量', '循序增加訓練強度', '刺激成長不只假累', '安全訓練不易受傷'],
    },
    {
      subTitle: '方針四',
      title: '練後成效追蹤',
      content: ['紀錄體態與訓練', '即時調整訓練計畫', '建立長期運動習慣', '打造健康身體狀態'],
    },
  ],
  comments: [
    require('@imgs/resevation/comment_1.jpg'),
    require('@imgs/resevation/comment_2.jpg'),
    require('@imgs/resevation/comment_3.jpg'),
    require('@imgs/resevation/comment_4.jpg'),
    require('@imgs/resevation/comment_5.jpg'),
    require('@imgs/resevation/comment_6.jpg'),
  ],
  inbody: [
    {
      img: require('resevation/inbody_1.jpg'),
      alt: '3個月內體脂下降4%',
      text: '3個月內體脂下降4％、肌肉量上升1公斤',
    },
    {
      img: require('resevation/inbody_2.jpg'),
      alt: '6個月內體脂下降11%',
      text: '6個月體脂下降11%、體重下降9公斤',
    },
    {
      img: require('resevation/inbody_3.jpg'),
      alt: '3個月內體脂下降10%',
      text: '6個月體脂下降8%、肌肉量上升1.5公斤',
    },
  ],
  bodyShape: [
    {
      before: {
        img: require('resevation/body_shape_before_1.jpg'),
        alt: '翼狀肩胛調整前',
      },
      after: {
        img: require('resevation/body_shape_after_1.jpg'),
        alt: '翼狀肩胛調整後',
      },
      text: '體驗課結束後翼狀肩胛就消失了',
    },
    {
      before: {
        img: require('resevation/body_shape_before_2.jpg'),
        alt: '3個月體重消失5kg',
      },
      after: {
        img: require('resevation/body_shape_after_2.jpg'),
        alt: '3個月體重消失5kg',
      },
      text: '3個月每周1次訓練，體重消失5kg',
    },
    {
      before: {
        img: require('resevation/body_shape_before_3.jpg'),
        alt: '3個月內體脂下降10%',
      },
      after: {
        img: require('resevation/body_shape_after_3.jpg'),
        alt: '3個月內體脂下降10%',
      },
      text: '一個孩子的媽，半年時間恢復少女體態',
    },
  ],
};
