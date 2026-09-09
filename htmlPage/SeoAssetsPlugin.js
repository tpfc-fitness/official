/*
 * SeoAssetsPlugin
 *
 * 依據 config.js 的 siteUrl 與 htmlPage/index.js 的頁面清單，
 * 在 build 時自動產出 sitemap.xml 與 robots.txt。
 * 新增頁面時只要在 htmlPage/index.js 加一筆，兩個檔案都會自動跟著更新。
 *
 * 標記 noindex: true 的頁面不會寫進 sitemap。
 */
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
        }
      );
    });
  }
}

module.exports = SeoAssetsPlugin;
