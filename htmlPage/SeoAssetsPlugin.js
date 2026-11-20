/*
 * SeoAssetsPlugin
 *
 * 依據 config.js 的 siteUrl 與 htmlPage/index.js 的頁面清單，
 * 在 build 時自動產出 sitemap.xml 與 robots.txt。
 * 新增頁面時只要在 htmlPage/index.js 加一筆，兩個檔案都會自動跟著更新。
 *
 * 標記 noindex: true 的頁面不會寫進 sitemap。
 *
 * 另外把 src/llms.txt 原樣複製到輸出的根目錄。這個檔的慣例位置就是
 * 網站根目錄；放在 src/static/ 底下會變成 /static/llms.txt，
 * 沒有工具會去那裡找。原始檔因此也不放在 src/static/ ——
 * 那個資料夾會整包複製，會多出一份沒人用的。
 */
const FS = require('fs');
const PATH = require('path');

const LLMS_SOURCE = PATH.join(__dirname, '../src/llms.txt');

class SeoAssetsPlugin {
  constructor(options = {}) {
    // 結尾斜線一律去掉，統一由 page.path（以 / 開頭）補上
    this.siteUrl = (options.siteUrl || '').replace(/\/+$/, '');
    this.pages = options.pages || [];
  }

  /* 一個頁面設定 → 完整網址 */
  urlOf(page) {
    const path = page.path || `/${page.filename || ''}`.replace(/^\/+/, '/');
    return `${this.siteUrl}${path}`;
  }

  /*
   * 要進 sitemap 的頁面：{ url, lastmod }。
   * lastmod 只有文章類的頁面有（來自文章的 updated）；其他頁沒有可靠的日期，
   * 就不給 —— 給一個每次 build 都變的日期，搜尋引擎會學到「這個欄位不可信」。
   */
  get entries() {
    return this.pages
      .filter((page) => !page.noindex)
      .map((page) => ({ url: this.urlOf(page), lastmod: page.lastmod }))
      .filter((entry, index, all) => all.findIndex((item) => item.url === entry.url) === index);
  }

  buildSitemap() {
    const locs = this.entries
      .map(({ url, lastmod }) => {
        const mod = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
        return `  <url>\n    <loc>${url}</loc>${mod}\n  </url>`;
      })
      .join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${locs}
</urlset>
`;
  }

  buildRobots() {
    /*
     * 注意：不要在這裡 Disallow 掉 thankyou.html。
     * 被 robots.txt 擋住的頁面，爬蟲反而讀不到頁內的 noindex 標籤，
     * 那頁就有可能以「無說明」的形式留在索引裡。noindex 才是正確做法。
     */
    return `User-agent: *
Allow: /

Sitemap: ${this.siteUrl}/sitemap.xml
`;
  }

  /*
   * 接在 llms.txt 最後的文章清單。
   *
   * 自動產生而不是手寫進 src/llms.txt：文章會一直增加，
   * 手寫的清單一定會有一天漏掉新的那篇。
   * 每篇附上 description，讓 AI 不用點進去也知道這篇在回答什麼問題。
   */
  buildArticleList() {
    const articles = this.pages.filter((page) => page.article && !page.noindex);
    if (!articles.length) return '';

    const lines = articles.map(
      (page) => `* [${page.title}](${this.urlOf(page)})：${page.description}`
    );

    return `
## 健身知識文章

由頭等倉教練撰寫，內容來自課堂上實際遇到的訓練問題。文章列表：${this.siteUrl}/article/

${lines.join('\n')}
`;
  }

  /*
   * 接在 llms.txt 最後的免費資源清單。跟文章一樣自動產生，新增資源頁不用回來手改。
   * 總覽頁（path 是 /resources/）不在 resource 欄位裡，用來當這段的入口網址。
   */
  buildResourceList() {
    const resources = this.pages.filter((page) => page.resource && !page.noindex);
    if (!resources.length) return '';

    const lines = resources.map(
      (page) => `* [${page.title}](${this.urlOf(page)})：${page.description}`
    );

    return `
## 免費資源

頭等倉教練整理的免費工具，在瀏覽器裡直接使用，不需要註冊、不會送出資料。總覽：${this.siteUrl}/resources/

${lines.join('\n')}
`;
  }

  apply(compiler) {
    const { webpack } = compiler;
    const { RawSource } = webpack.sources;
    const NAME = 'SeoAssetsPlugin';

    compiler.hooks.thisCompilation.tap(NAME, (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: NAME,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_ADDITIONAL,
        },
        () => {
          compilation.emitAsset('sitemap.xml', new RawSource(this.buildSitemap()));
          compilation.emitAsset('robots.txt', new RawSource(this.buildRobots()));

          /* 沒有這個檔也不該讓 build 失敗 —— 它是選用的 */
          if (FS.existsSync(LLMS_SOURCE)) {
            const llms =
              FS.readFileSync(LLMS_SOURCE, 'utf8') +
              this.buildArticleList() +
              this.buildResourceList();
            compilation.emitAsset('llms.txt', new RawSource(llms));
          }
        }
      );
    });
  }
}

module.exports = SeoAssetsPlugin;
