/*
 * 課程項目內容
 *
 * 這份資料在 build 期由 EJS 直接讀取並渲染成靜態 HTML，
 * 讓文字與圖片（含 alt）都能被搜尋引擎索引。
 *
 * ⚠️ 不可以依賴 window / document，否則 build 期 require 會壞掉。
 */
module.exports = [
  {
    title: '一對一私人教練課程 ',
    cnt: '我們的一對一私人教練課程為你提供專屬的健身計劃，讓每一次的訓練都精準符合你的個人需求。無論你是健身初學者，還是希望進一步提升體能的資深運動愛好者，我們的專業教練都會根據你的身體狀況、健康目標，以及個人偏好，量身定制一套完美的訓練方案。<br>從力量訓練、有氧運動到靈活性和平衡的提升，每個環節都將經過精心規劃和調整，確保你在安全的環境中達到最佳效果。我們的專業教練不僅提供技術指導，更是你再健身路上的策略顧問和好朋友，陪伴你一步步向目標前進。',
    imgs: [require('@imgs/service/firstclass_fitness_equipment.jpeg'), require('@imgs/service/firstclass_fitness_equipment.jpeg'), require('@imgs/service/firstclass_fitness_equipment.jpeg')]
  },
  {
    title: '一對二小組訓練課程',
    cnt: '想要和你的好閨蜜一起甩肉瘦身蛻變成全新的自我嗎？快來加入我們的一對二小組訓練課程，和好友一起開啟人生的新篇章！在這個專為朋友間設計的課程裡，你們可以共同揮灑汗水，享受每一次突破的喜悅。<br>無論你們希望燃燒脂肪、增強肌力，還是雕塑身形，我們都將依據你們的需求量身定制訓練計劃。多樣的設施和器械讓你們的健身之旅更加豐富多彩，絕不無聊單調！<br><br><span class="italic">*小提醒：一對二較適合程度相似者一起上課，若某一方肌力較差，另一方結束後較不會有訓練感唷‼</span>',
    imgs: [require('@imgs/service/firstclass_fitness_equipment.jpeg'), require('@imgs/service/firstclass_fitness_equipment.jpeg'), require('@imgs/service/firstclass_fitness_equipment.jpeg')]
  },
  {
    title: '課後自主訓練',
    cnt: '我們提供有購課的學員們在課程結束前自由使用訓練器材，貫徹我們的品牌理念—讓每一位學生不但培養出運動的興趣，更能愛上每一次運動的體驗，我們相信只要培養出興趣、適應健身房的環境與氣氛、獲得健身的基礎知識，每一位來上過課的學員都能過持之以恆的繼續健身之旅。<br>健身新手不緊張！若時間允許，巡場教練也會在學員自主訓練時適時提供協助與指導，免除初上健身房慌亂的心情。',
    imgs: [require('@imgs/service/firstclass_fitness_equipment.jpeg'), require('@imgs/service/firstclass_fitness_equipment.jpeg'), require('@imgs/service/firstclass_fitness_equipment.jpeg')]
  },
];
