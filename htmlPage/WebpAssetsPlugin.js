/*
 * WebpAssetsPlugin
 *
 * 為每一張輸出的 jpg / png 再產一份同名的 .webp，放在原圖旁邊。
 * img.ejs 會把它接成 <picture><source type="image/webp">，
 * 支援的瀏覽器拿 webp，不支援的仍然拿到原本的 jpg／png。
 *
 * 為什麼不是用 webpack 的 image-minimizer loader：
 * 那條路會把 webp 當成「另一個 module」，網址得靠 JS 在執行期換掉
 * （專案裡原本那段 data-srcset 就是這樣，所以一直沒有真的生效）。
 * 在這裡直接產檔，輸出的是靜態 <source srcset>，不需要 JS 也成立 ——
 * 爬蟲跟關掉 JS 的瀏覽器都拿得到。
 *
 * 轉檔在 PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE 之後才跑，
 * 讀到的是 imagemin 壓過的結果，不會拿原始大檔去轉。
 *
 * quality 82 是量過的折衷：再往下壓，深色照片的漸層會開始出現色帶
 * （這個網站的照片大多是暗色健身房場景，最容易看出來）。
 * effort 5 是壓縮耗時與檔案大小的平衡，build 期多幾秒換小一點的檔。
 *
 * 轉出來比原圖還大的就丟掉 —— 少數已經壓很兇的小圖會這樣，
 * 那種情況留著 webp 只是多送一個檔。
 */
const SHARP = require('sharp');

/*
 * ⚠️ 資產名稱會帶著查詢字串。
 * webpack 這邊的 generator.filename 是 '[path][name][ext]?[hash:8]'，
 * 所以 compilation 裡的名字長得像 assets/img/index/kv.jpg?1a2b3c4d
 * ——「?hash」是名字的一部分，寫到磁碟時才被切掉。
 * 比對副檔名前一定要先把 ? 之後的東西拿掉，否則 $ 錨點永遠不會中。
 */
const stripQuery = (name) => name.split('?')[0];
const IMAGE_RE = /\.(jpe?g|png)$/i;

class WebpAssetsPlugin {
  constructor(options = {}) {
    this.quality = options.quality || 82;
    this.effort = typeof options.effort === 'number' ? options.effort : 5;
    /* 只處理圖片資料夾底下的檔案，避免掃到 static/ 裡的圖示 */
    this.include = options.include || /assets\/img\//;
  }

  /*
   * 把 CSS 中引用到圖片的宣告複製成 image-set() 版本。
   * 回傳改寫的宣告條數。
   *
   * 作法是從 url() 的位置往前找到宣告的開頭（上一個 ; { 或 }）、
   * 往後找到結尾（下一個 ; 或 }），整條複製後替換 url()。
   * 用邊界字元切而不是解析 CSS，是因為這裡處理的是壓縮後的輸出，
   * 屬性值裡不會出現沒被括號包住的分號。
   */
  rewriteCss(compilation, RawSource) {
    const URL_RE = /url\((['"]?)([^'")]*?assets\/img\/[^'")]+?\.(?:jpe?g|png))((?:\?[^'")]*)?)\1\)/gi;
    let count = 0;

    compilation
      .getAssets()
      .filter(({ name }) => /\.css$/i.test(stripQuery(name)))
      .forEach(({ name, source }) => {
        const css = source.source().toString();
        /* 先確認這支 CSS 真的引用到我們轉過的圖，沒有就別動它 */
        if (!URL_RE.test(css)) return;
        URL_RE.lastIndex = 0;

        const spans = [];
        let match = URL_RE.exec(css);

        while (match) {
          const webpAsset = `${match[2].replace(IMAGE_RE, '.webp')}`;
          /* 只有真的產出 webp 的圖才改寫 */
          const exists = compilation
            .getAssets()
            .some(({ name: n }) => stripQuery(n) === webpAsset.replace(/^.*?(assets\/img\/)/, '$1'));

          if (exists) {
            let start = match.index;
            while (start > 0 && !';{}'.includes(css[start - 1])) start -= 1;
            let end = match.index + match[0].length;
            while (end < css.length && !';}'.includes(css[end])) end += 1;
            spans.push({ start, end, decl: css.slice(start, end) });
          }
          match = URL_RE.exec(css);
        }

        if (!spans.length) return;

        /* 由後往前插入，前面的 index 才不會被位移 */
        let out = css;
        spans
          .sort((a, b) => b.start - a.start)
          .forEach(({ end, decl }) => {
            const swapped = decl.replace(
              URL_RE,
              (_m, q, file, query) =>
                `image-set(url(${q}${file.replace(IMAGE_RE, '.webp')}${query}${q}) type("image/webp"), url(${q}${file}${query}${q}) type("image/${
                  /\.png$/i.test(file) ? 'png' : 'jpeg'
                }"))`
            );
            out = `${out.slice(0, end)};${swapped}${out.slice(end)}`;
            count += 1;
          });

        compilation.updateAsset(name, new RawSource(out));
      });

    return count;
  }

  /*
   * 拿掉指向不存在 webp 的 <source>。
   *
   * img.ejs 是無條件輸出 <source type="image/webp"> 的 —— 它在樣板階段
   * 沒辦法知道這支外掛後來會不會真的產出那張 webp。
   * 而 <picture> 的規則是：<source> 一旦被選中，圖片載入失敗就是失敗，
   * 瀏覽器不會退回同層的 <img>，使用者看到的是破圖。
   *
   * 會沒有 webp 的情況有兩種，兩種都得擋：
   *   1. 轉出來比原圖大，上面主動略過（例如已經很小的 PNG logo）
   *   2. sharp 轉檔失敗，走了 catch
   *
   * 回傳移除的條數。
   */
  pruneHtml(compilation, RawSource) {
    const SOURCE_RE = /\s*<source\s+srcset="([^"]+?\.webp)(\?[^"]*)?"\s+type="image\/webp">/gi;
    let removed = 0;

    compilation
      .getAssets()
      .filter(({ name }) => /\.html$/i.test(stripQuery(name)))
      .forEach(({ name, source }) => {
        const html = source.source().toString();
        if (!/image\/webp/.test(html)) return;

        const out = html.replace(SOURCE_RE, (tag, url) => {
          /* HTML 裡是含 publicPath 的網址，資產名稱則是相對的 assets/… */
          const assetName = url.replace(/^.*?(assets\/img\/)/, '$1');
          const exists = compilation
            .getAssets()
            .some(({ name: n }) => stripQuery(n) === assetName);

          if (exists) return tag;
          removed += 1;
          return '';
        });

        if (out !== html) compilation.updateAsset(name, new RawSource(out));
      });

    return removed;
  }

  apply(compiler) {
    const { webpack } = compiler;
    const { RawSource } = webpack.sources;
    const NAME = 'WebpAssetsPlugin';

    compiler.hooks.thisCompilation.tap(NAME, (compilation) => {
      compilation.hooks.processAssets.tapPromise(
        {
          name: NAME,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_SIZE + 1,
        },
        async () => {
          const targets = compilation
            .getAssets()
            .filter(
              ({ name }) => IMAGE_RE.test(stripQuery(name)) && this.include.test(stripQuery(name))
            );

          let made = 0;
          let saved = 0;

          await Promise.all(
            targets.map(async ({ name, source }) => {
              /* 保留原本的 ?hash，webp 才會跟原圖一起失效 */
              const [file, query] = name.split('?');
              const webpName =
                file.replace(IMAGE_RE, '.webp') + (query ? `?${query}` : '');

              /* 已經有人放了同名的 .webp 就不要覆蓋 */
              if (compilation.getAsset(webpName)) return;

              try {
                const input = source.buffer();
                const output = await SHARP(input)
                  .webp({ quality: this.quality, effort: this.effort })
                  .toBuffer();

                if (output.length >= input.length) return;

                compilation.emitAsset(webpName, new RawSource(output));
                made += 1;
                saved += input.length - output.length;
              } catch (err) {
                /*
                 * 單張轉檔失敗不該讓整個 build 掛掉 ——
                 * 沒有 webp 的那張就只是回頭用原圖，頁面仍然正常。
                 */
                compilation.warnings.push(
                  new webpack.WebpackError(`${NAME}: ${webpName} 轉檔失敗，改用原圖。${err.message}`)
                );
              }
            })
          );

          /*
           * CSS 裡的背景圖也要吃到 webp。
           *
           * 這些 url() 沒辦法在來源端改寫 —— webp 是這支外掛在建置期才產出的，
           * 檔案只存在於輸出目錄，css-loader 在解析階段找不到它。
           * 所以改在這裡處理已經產生的 CSS：把含有圖片 url() 的那條宣告
           * 原樣複製一份放在後面，並把 url() 換成 image-set()。
           *
           * 順序就是後備機制：舊瀏覽器看不懂 image-set()，整條宣告會被丟掉，
           * 於是沿用前一條的 jpg；看得懂的則用後面那條、拿 webp。
           * 兩條都在，所以沒有任何瀏覽器會拿不到背景圖。
           *
           * 不寫 -webkit-image-set：那個舊語法不支援 type()，
           * 沒辦法標示格式，混進來只會讓判斷變得不可靠。
           */
          const rewritten = this.rewriteCss(compilation, RawSource);

          if (made) {
            const mb = (saved / 1048576).toFixed(2);
            const note = rewritten ? `，另改寫 ${rewritten} 條 CSS 背景宣告` : '';
            if (compilation.logger) {
              compilation.logger.info(`產出 ${made} 張 webp，省下 ${mb} MB${note}`);
            }
          }
        }
      );

      /*
       * HTML 的清理得另外掛一個更晚的階段。
       * html-webpack-plugin（以及後面的 beautify）要到這之後才把 HTML
       * 放進 compilation，上面那個 OPTIMIZE_SIZE 階段根本還看不到它。
       * REPORT 是 processAssets 的最後一段，這時候 HTML 與 webp 都齊了。
       */
      compilation.hooks.processAssets.tap(
        {
          name: `${NAME}:pruneHtml`,
          stage: webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
        },
        () => {
          const pruned = this.pruneHtml(compilation, RawSource);
          if (pruned && compilation.logger) {
            compilation.logger.info(`移除 ${pruned} 個沒有對應 webp 的 <source>`);
          }
        }
      );
    });
  }
}

module.exports = WebpAssetsPlugin;
