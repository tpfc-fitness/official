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

  get urls() {
    return this.pages
      .filter((page) => !page.noindex)
      .map((page) => {
        const path = page.path || `/${page.filename || ''}`.replace(/^\/+/, '/');
        return `${this.siteUrl}${path}`;
      })
      .filter((url, index, all) => all.indexOf(url) === index);
  }

  buildSitemap() {
    const locs = this.urls.map((url) => `  <url>\n    <loc>${url}</loc>\n  </url>`).join('\n');

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
            compilation.emitAsset('llms.txt', new RawSource(FS.readFileSync(LLMS_SOURCE, 'utf8')));
          }
        }
      );
    });
  }
}

module.exports = SeoAssetsPlugin;
