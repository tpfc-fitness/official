/*
 * 每頁的設定。
 * filename 是產出的網址檔名，view 是 src/views/ 底下的資料夾名稱，
 * 兩者刻意分開，改網址或搬動頁面時不會互相牽動。
 */
module.exports = {
  HtmlWebpackPlugin: [
    {
      filename: 'index.html',
      view: 'home',
      path: '/',
      template: 'App.ejs',
      action: 'index',
      description:
        'First Class 頭等倉運動空間推出多元運動為方向的規劃，除了一對一私人教練課、體態評估、團體課程等，也歡迎自由教練場租，另提供教練新媒體行銷推廣。',
      chunks: ['index'],
    },
    {
      title: '關於頭等倉',
      filename: 'about.html',
      view: 'about',
      path: '/about.html',
      template: 'App.ejs',
      action: 'about',
      description:
        '頭等倉運動空間成立於 2022 年，位於台北市中山區。我們希望提供的不只是一次訓練，而是讓你學會運動、理解自己的身體，最後能把運動留在生活裡——即使沒有教練在旁邊，也知道該怎麼練。',
      chunks: ['about'],
    },
    {
      title: '私人教練課',
      filename: 'service.html',
      view: 'service',
      path: '/service.html',
      template: 'App.ejs',
      action: 'service',
      description:
        'First Class 頭等倉運動空間推出多元運動為方向的規劃，除了一對一及一對二私人教練課，也歡迎自由教練場租。',
      chunks: ['service'],
    },
    {
      title: '教練招募',
      filename: 'careers.html',
      view: 'careers',
      path: '/careers.html',
      template: 'App.ejs',
      action: 'careers',
      description:
        'First Class 頭等倉運動空間正在招募新血! 對於健身有想法、教學有熱忱，擁有健談外向人格特質的你，快來投遞履歷!',
      chunks: ['careers'],
    },
    {
      title: '專業教練團隊',
      filename: 'ourteam.html',
      view: 'ourteam',
      path: '/ourteam.html',
      template: 'App.ejs',
      action: 'ourteam',
      description:
        'First Class 頭等倉運動空間目前有四位教練，對於增肌減脂、體態雕塑、肌力訓練、健美、健力都保持著專業知識，不斷精進自我能力，只為了提供學生更安全有效率的健身教學內容。',
      chunks: ['ourteam'],
    },
    {
      title: '免費體驗課・民權西路私人教練',
      filename: 'contact.html',
      view: 'contact',
      path: '/contact.html',
      template: 'App.ejs',
      action: 'contact',
      description:
        '位於台北市中山區、捷運民權西路站四號出口步行 3 分鐘的私人教練工作室。免費體驗課含 InBody 檢測、體態評估與基礎動作教學，另有新生優惠前 10 堂 8,000 元，歡迎預約。',
      chunks: ['contact'],
    },
    {
      title: '交通與環境',
      filename: 'information.html',
      view: 'information',
      path: '/information.html',
      template: 'App.ejs',
      action: 'information',
      description:
        'First Class 頭等倉運動空間位於民權西路捷運站四號出口步行約三分鐘處，附近有兩大停車場，方便的交通與地理位置，讓您不再因為距離因素而放棄健身的熱情。',
      chunks: ['information'],
    },
    {
      title: '感謝您的預約!',
      filename: 'thankyou.html',
      view: 'thankyou',
      path: '/thankyou.html',
      // 轉換完成頁沒有搜尋價值：不進索引、也不進 sitemap
      noindex: true,
      template: 'App.ejs',
      // 不輸出 header／選單／完整 footer，只有內容本身
      action: 'bare',
      description: '感謝您預約 First Class 頭等倉運動空間免費體驗課程',
      chunks: ['thankyou'],
    },
  ],
};
