/*
 * 交通與環境資訊
 *
 * 這份資料在 build 期由 EJS 直接讀取並渲染成靜態 HTML，
 * 讓文字與圖片（含 alt）都能被搜尋引擎索引。
 *
 * ⚠️ 不可以依賴 window / document，否則 build 期 require 會壞掉。
 */
module.exports = {
  location: [
    {
      title: '場館位置',
      cnt: '台北市中山區中山北路二段128巷32號1樓',
    },
    {
      title: 'PARKING 鄰近停車資訊',
      cnt: '城市車旅停車場 (捷運民權西路站停車場) 步行至場館約 3 分鐘<br/>成淵高中地下停車場步行至場館約 5 分鐘',
    },
    {
      title: 'MRT 大眾運輸交通資訊',
      cnt: '捷運民權西路站四號出口 步行約3分鐘',
    },
    {
      title: '營業時間: <br class="p:hidden"/>週一至週六 下午 01:00 至 晚上 10:00',
      cnt: '✉️ EMAIL: <a href="mailto:tpfc.fit@gmail.com" class="underline font-bold">tpfc.fit@gmail.com</a><br/>☎️ 聯絡電話：<a class="underline font-bold" href="tel:+886-2-25222330">02-2522-2330</a>',
    },
  ],
  env: [
    {
      title: '店面與入口',
      img: require('common/firstclass_fitness_outdoor.jpg'),
      cnt: '從入口就能看到頭等倉的訓練空間，玻璃門面讓整體空間保持開闊，也能清楚看見館內的訓練環境。',
    },
    {
      title: '整體訓練空間',
      img: require('common/firstclass_fitness_indoor.jpg'),
      cnt: '空間以重量訓練為核心，從自由重量、槓鈴架到固定式器材，依照不同訓練需求配置，讓教練課與自主訓練都能使用。',
    },
    {
      title: '自由重量訓練區',
      img: require('common/firstclass_fitness_indoor2.jpg'),
      cnt: '提供不同重量的啞鈴與壺鈴，搭配訓練椅及其他自由重量設備，適合進行肌力、增肌與體態訓練。',
    },
    {
      title: '固定式訓練器材',
      img: require('common/firstclass_fitness_indoor5.jpg'),
      cnt: '提供滑輪與固定式訓練器材，搭配自由重量訓練使用，依照不同訓練目標與動作需求安排適合的訓練方式。',
    },
    {
      title: '盥洗空間',
      img: require('common/firstclass_fitness_bathroom.jpg'),
      cnt: '設有獨立盥洗空間，提供訓練後整理使用，讓你完成運動後可以直接整理再離開。',
    },
  ],
};
