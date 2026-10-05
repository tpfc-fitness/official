/*
 * 文章（部落格）
 *
 * 這一支不放內容，只負責把 _data/articles/ 底下的 JSON 收集起來。
 * 一個 .json ＝ 一篇文章 ＝ 一頁：htmlPage/index.js 讀這份清單，
 * 自動產生 /article/<檔名>.html，sitemap 也會跟著收錄，不必另外登記。
 *
 * 新增一篇文章 = 丟一個 JSON 進 _data/articles/ + 圖片放
 * assets/img/article/<資料夾>/。格式見 _data/articles/_TEMPLATE.json。
 *
 * ⚠️ 檔名就是網址。squat-knee-pain.json → /article/squat-knee-pain.html，
 *    所以檔名只用小寫英數與連字號，不要用中文或空白。
 *    改檔名等於改網址，已經發布過的文章不要隨手改。
 *
 * ⚠️ 底線開頭的檔案會被跳過（_TEMPLATE.json 是空白表單，不是文章）。
 *
 * ⚠️ 這份清單在 webpack 啟動前就要算出來，所以 dev server 開著的時候
 *    新增 JSON 不會自動出現，要重跑一次。改既有 JSON 的內容則會。
 */
const fs = require('fs');
const path = require('path');

/*
 * 這支模組會被兩邊 require：
 *   1. Node 直接讀（htmlPage/index.js 要先知道有哪些頁）
 *   2. webpack 打包後在 EJS 裡讀（mJsonLd 與 views/article 要取內容）
 * 第二種情況 __dirname 會被改寫成 '/'，所以兩個候選路徑都試。
 *
 * ⚠️ 第二個候選不要改成 process.cwd() —— webpack 端沒有 process 這個物件，
 *    只有 DefinePlugin 事先替換掉的 process.env.XXX 會變成字串常數。
 */
const DIR = [
  path.join(__dirname, 'articles'),
  `${process.env.PROJECT_ROOT}/src/_data/articles`,
].find((dir) => fs.existsSync(dir));

/*
 * 中文閱讀時間：以每分鐘 350 字估算，不足一分鐘算一分鐘。
 * 自動算而不是手填 —— 手填的數字在內容改過之後就不準了，
 * 而且沒人會記得回來改。
 */
const readingTime = (article) => {
  const text = [article.lead, article.directAnswer]
    .concat(article.blocks.map((block) => block.h2 || block.h3 || block.p || ''))
    .join('')
    .replace(/<[^>]+>/g, '');

  return Math.max(1, Math.round(text.length / 350));
};

/*
 * 必填欄位。缺了就直接在 build 時說清楚是哪個檔少了什麼 ——
 * 不檢查的話會變成 EJS 裡一句 Cannot read properties of undefined，
 * 看不出是哪一篇寫錯。
 */
const REQUIRED = [
  'category',
  'title',
  'lead',
  'description',
  'updated',
  'cover',
  'author',
  'directAnswer',
  'blocks',
];

module.exports = fs
  .readdirSync(DIR)
  .filter((file) => file.endsWith('.json') && !file.startsWith('_'))
  .map((file) => {
    const raw = JSON.parse(fs.readFileSync(path.join(DIR, file), 'utf8'));

    /*
     * 底線開頭的鍵一律丟掉 —— _TEMPLATE.json 的說明文字就是寫成
     * _category、_blocks 這樣，忘記刪也不會被當成內容渲染出來。
     */
    const article = {};
    Object.keys(raw).forEach((key) => {
      if (!key.startsWith('_')) article[key] = raw[key];
    });

    const missing = REQUIRED.filter((key) => !article[key]);
    if (missing.length) {
      throw new Error(`[articles] _data/articles/${file} 缺少欄位：${missing.join('、')}`);
    }

    /* slug 不寫在 JSON 裡：檔名是唯一來源，兩邊都有就會有一天對不上 */
    return {
      ...article,
      slug: path.basename(file, '.json'),
      readingTime: readingTime(article),
    };
  })
  /* 新的排前面。文章清單頁與「延伸閱讀」都直接吃這個順序 */
  .sort((a, b) => (a.updated < b.updated ? 1 : -1));
