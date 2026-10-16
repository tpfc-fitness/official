/*
 * 每頁的設定。
 * filename 是產出的網址檔名，view 是 src/views/ 底下的資料夾名稱，
 * 兩者刻意分開，改網址或搬動頁面時不會互相牽動。
 *
 * 文章頁不逐筆寫在這裡：由 _data/articles.js 依陣列產生，
 * 新增一篇文章只要加資料，頁面與 sitemap 都會自動跟上。
 */
const articles = require('../src/_data/articles.js');

/* 一篇文章 → 一個頁面設定 */
const articlePages = articles.map((article) => ({
  title: article.title,
  filename: `article/${article.slug}.html`,
  view: 'article',
  path: `/article/${article.slug}.html`,
  template: 'App.ejs',
  action: 'article',
  description: article.description,
  /* sitemap 的 lastmod：讓搜尋引擎知道這篇改過了，值得回來重新爬 */
  lastmod: article.updated,
  /* 哪一篇 —— App.ejs 會把它傳進 view，view 再從 articles.js 取內容 */
  article: article.slug,
  chunks: ['article'],
}));

module.exports = {
  HtmlWebpackPlugin: [
    {
      title: '頭等倉運動空間 First Class｜中山區民權西路健身工作室',
      /*
       * 這一頁的 title 自己就含品牌名了，所以不要再接
       * 「| First Class 頭等倉運動空間」—— 接了會變成品牌名出現兩次，
       * 而且長度直接超出搜尋結果會顯示的範圍。其他頁維持接後綴。
       */
      titleExact: true,
      filename: 'index.html',
      view: 'home',
      path: '/',
      template: 'App.ejs',
      action: 'index',
      description:
        '讓你真正學會訓練，不用一輩子靠教練。頭等倉是中山區民權西路的健身工作室，提供一對一、一對二教練課，捷運民權西路站4號出口步行3分鐘。',
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
      title: '民權西路一對一私人教練',
      filename: 'service.html',
      view: 'service',
      path: '/service.html',
      template: 'App.ejs',
      action: 'service',
      description:
        '頭等倉運動空間位於台北中山區、捷運民權西路站步行約 3 分鐘，提供一對一私人教練課程。從動作學習、重量訓練到菜單安排，第一堂課後就能自己練，最後學會自己訓練。',
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
        'First Class 頭等倉運動空間的教練團隊，對於增肌減脂、體態雕塑、肌力訓練、健美、健力都保持著專業知識，不斷精進自我能力，只為了提供學生更安全有效率的健身教學內容。',
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
      title: '常見問題',
      filename: 'faq.html',
      view: 'faq',
      path: '/faq.html',
      template: 'App.ejs',
      action: 'faq',
      description:
        '第一次找私人教練會想問的問題：沒經驗可以嗎、很久沒運動適合嗎、台北中山區私人教練課多少錢、民權西路附近好停車嗎。頭等倉運動空間位於捷運民權西路站四號出口步行 3 分鐘，提供免費體驗課。',
      chunks: ['faq'],
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
    {
      /*
       * 健身知識（文章列表）。
       * filename 是 article/index.html，對外網址是資料夾 /article/ ——
       * 跟單篇文章同一層，麵包屑「首頁 › 健身知識 › 文章」也順著網址走。
       */
      title: '健身知識｜教練整理的訓練與動作問題',
      filename: 'article/index.html',
      view: 'articles',
      path: '/article/',
      template: 'App.ejs',
      action: 'articles',
      description:
        '頭等倉教練把課堂上最常被問的訓練問題整理成文章：深蹲膝蓋痛、動作怎麼自己判斷與調整、什麼時候該找教練看動作。中山區民權西路健身工作室的教練實際教學經驗。',
      /* 清單頁的更新日 ＝ 最新一篇文章的日期 */
      lastmod: articles.length ? articles[0].updated : undefined,
      chunks: ['articles'],
    },
    ...articlePages,
  ],
};
