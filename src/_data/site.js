/*
 * 商家資料單一來源（結構化資料 JSON-LD 用）
 *
 * 這裡的內容會直接被 Google 讀成「這間店的事實」，
 * 所以每一欄都必須與實際營業狀況、以及 Google 商家檔案上的資料完全一致。
 * 不一致會削弱本地搜尋的實體辨識。
 *
 * ⚠️ 不可以依賴 window / document（build 期會被 EJS require）。
 */
module.exports = {
  name: '頭等倉運動空間',
  alternateName: 'First Class 頭等倉運動空間',
  description:
    '位於台北市中山區、鄰近民權西路的私人教練運動工作室，提供一對一與一對二私人教練課程及自主訓練。',
  telephone: '+886-2-2522-2330',
  email: 'tpfc.fit@gmail.com',
  address: {
    streetAddress: '中山北路二段128巷32號1樓',
    addressLocality: '中山區',
    addressRegion: '台北市',
    postalCode: '10449',
    addressCountry: 'TW',
  },
  hasMap: 'https://maps.app.goo.gl/XJrhGD2UgVfA9BrC6',
  /* 場館座標。取得方式：Google Maps 網頁版對店家圖釘按右鍵，第一列即為經緯度。
     （網址列 @ 後面那組是地圖畫面中心，不是店家位置，別抓錯） */
  geo: {
    latitude: 25.0617244,
    longitude: 121.5212425,
  },
  /* 營業時間：週一至週六 13:00–22:00，週日公休（來源：footer 與 information 頁） */
  openingHours: [
    {
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      opens: '13:00',
      closes: '22:00',
    },
  ],
  /* 官方社群帳號，用來讓 Google 把網站與社群綁成同一個實體 */
  sameAs: [
    'https://www.facebook.com/profile.php?id=61558998428490',
    'https://www.instagram.com/tpfc.fitness/',
    /* TikTok 帳號當初註冊時就是 tpcf（非 tpfc），這不是筆誤，請勿「訂正」 */
    'https://www.tiktok.com/@tpcf.fit',
  ],
};
