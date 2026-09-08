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
      cnt: '台北市中山區中山北路二段128巷32號1樓'
    },
    {
      title: 'PARKING 鄰近停車資訊',
      cnt: '城市車旅停車場 (捷運民權西路站停車場) 步行至場館約 3 分鐘<br/>成淵高中地下停車場步行至場館約 5 分鐘'
    },
    {
      title: 'MRT 大眾運輸交通資訊',
      cnt: '捷運民權西路站一號出口 步行約3分鐘'
    },
    {
      title: '營業時間: <br class="p:hidden"/>週一至週六 下午 01:00 至 晚上 10:00',
      cnt: 'EMAIL: <a href="mailto:tpfc.fit@gmail.com" class="underline font-bold">tpfc.fit@gmail.com</a><br/>聯絡電話：<a class="underline font-bold" href="tel:+886-2-25222330">02-2522-2330</a>'
    },
  ],
  env: [{
    title: '頭等倉運動空間外觀',
    img: require('common/firstclass_fitness_outdoor.jpg'),
    cnt: '訓練區有自由重量、機械器材及啞鈴壺鈴。'
  }, {
    title: '內部訓練空間',
    img: require('common/firstclass_fitness_outdoor.jpg'),
    cnt: '訓練區有自由重量、機械器材及啞鈴壺鈴。'
  }, {
    title: '內部訓練空間',
    img: require('common/firstclass_fitness_outdoor.jpg'),
    cnt: '訓練區有自由重量、機械器材及啞鈴壺鈴。'
  }]
};
