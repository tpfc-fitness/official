/*
 * 產生文章封面（自動）。
 *
 * 平常不用手動跑：npm run dev / build / deploy 之前會先自動執行這支
 * （package.json 的 predev / prebuild / predeploy）。
 *
 * 哪些文章要畫：JSON 沒寫 cover 的文章（_data/articles.js 會把它們標成
 * cover.generated）。寫了 cover 的是實拍照片，這支不會碰。
 *
 * 只畫「需要畫」的：每張封面依「標題、分類、色系、模板」算一個指紋，
 * 記在 article-cover/manifest.json。指紋沒變、圖片也在，就跳過 ——
 * 所以平常 build 幾乎不花時間，也不需要開 Chrome。
 * 會重畫的情況：新文章、改了標題或分類、改了 themes.js 的色系、改了 template.html。
 *
 * 手動用法：
 *   npm run covers                      跟自動執行一樣，只畫需要畫的
 *   npm run covers -- --force           全部重畫
 *   npm run covers -- weight-selection  強制重畫指定的幾篇（檔名，不含 .json）
 *
 * 在 GitHub Actions 上（環境變數 CI）不畫：部署不依賴 Chrome 與 Google 字型，
 * 一律用 commit 進來的圖片。缺圖就讓部署失敗並說明原因；圖片過期只警告。
 *
 * ⚠️ 產生的 jpg 與 manifest.json 都要 commit。
 * ⚠️ 需要本機有 Chrome。路徑預設是 macOS 的位置，其他系統用 CHROME_PATH 指定。
 */
/* eslint-disable no-await-in-loop, no-restricted-syntax -- 封面要一張一張畫：同一個 Chrome 分頁不能同時畫兩張 */
const { spawn } = require('child_process');
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { pathToFileURL } = require('url');

const articles = require('../src/_data/articles.js');
const { themes, DEFAULT } = require('./article-cover/themes.js');

const CHROME =
  process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const TEMPLATE = pathToFileURL(path.join(__dirname, 'article-cover/template.html')).href;
const IMG_ROOT = path.join(__dirname, '../src/assets/img/article');
const MANIFEST = path.join(__dirname, 'article-cover/manifest.json');
const TEMPLATE_FILE = path.join(__dirname, 'article-cover/template.html');
const WIDTH = 1600;
const HEIGHT = 900;

const sleep = (ms) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/* 開一個 headless Chrome，回傳送 DevTools 指令的函式 */
const launch = async () => {
  const port = 9400 + Math.floor(Math.random() * 500);
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'tpfc-cover-'));
  const proc = spawn(
    CHROME,
    [
      '--headless=new',
      '--disable-gpu',
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profile}`,
      'about:blank',
    ],
    {
      stdio: 'ignore',
    }
  );

  let target;
  for (let i = 0; i < 50 && !target; i += 1) {
    await sleep(200);
    try {
      const list = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      target = list.find((item) => item.type === 'page');
    } catch (err) {
      /* Chrome 還沒起來，再等一下 */
    }
  }
  if (!target) throw new Error(`開不起 Chrome：${CHROME}（可以用 CHROME_PATH 指定路徑）`);

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve) => {
    ws.addEventListener('open', resolve);
  });

  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      pending.get(msg.id)(msg);
      pending.delete(msg.id);
    }
  });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      id += 1;
      pending.set(id, (msg) => {
        if (msg.error) reject(new Error(msg.error.message));
        else resolve(msg.result);
      });
      ws.send(JSON.stringify({ id, method, params }));
    });

  /* 等 Chrome 真的結束才刪暫存的設定檔資料夾 —— 還在寫檔時刪會失敗 */
  const close = async () => {
    ws.close();
    const exited = new Promise((resolve) => {
      proc.once('exit', resolve);
    });
    proc.kill();
    await Promise.race([exited, sleep(3000)]);
    try {
      fs.rmSync(profile, { recursive: true, force: true });
    } catch (err) {
      /* 刪不掉就留在系統暫存區，系統會自己清，不影響封面 */
    }
  };

  return { send, close };
};

/* 畫一張封面，存成 jpg。回傳標題最後的字級與行數，方便在終端機上確認 */
const render = async (send, { title, category }, outFile) => {
  const theme = themes[category] || DEFAULT;
  const data = JSON.stringify({ title, category, accent: theme.accent, label: theme.label });

  await send('Page.navigate', { url: TEMPLATE });
  /* 等網頁字型真的載完才量標題 —— 用後備字型量到的寬度，換字型後會跑版 */
  await send('Runtime.evaluate', {
    awaitPromise: true,
    expression:
      'new Promise((r) => (document.readyState === "complete" ? r() : addEventListener("load", r))).then(() => document.fonts.ready)',
  });
  /*
   * 中文網頁字型是依字切成很多小檔，標題填進去之後，用到的字才開始下載 ——
   * 頁面載入時的 fonts.ready 管不到它們。字還沒到時標題是隱形的（display=block），
   * 用後備字型量的寬度也不準。所以：填字 → 等這批字型載完 → 用真正的字型重新量一次。
   */
  const fit = await send('Runtime.evaluate', {
    returnByValue: true,
    awaitPromise: true,
    expression: `(async () => {
      window.COVER = ${data};
      window.renderCover();
      await document.fonts.ready;
      await new Promise((r) => setTimeout(r, 300));
      await document.fonts.ready;
      return window.renderCover();
    })()`,
  });
  await sleep(200);

  const shot = await send('Page.captureScreenshot', {
    format: 'jpeg',
    quality: 88,
    clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT, scale: 1 },
  });

  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, Buffer.from(shot.data, 'base64'));

  return fit.result.value;
};

/* 給其他腳本用（例如一次預覽四種色系），不經過 articles 清單 */
module.exports = { launch, render, WIDTH, HEIGHT };

/*
 * 指紋：畫面上會出現的東西（標題、分類、色系）加上模板本身。
 * 任何一個變了，封面就該重畫。
 */
const templateHash = crypto.createHash('sha1').update(fs.readFileSync(TEMPLATE_FILE)).digest('hex');
const fingerprint = ({ title, category }) =>
  crypto
    .createHash('sha1')
    .update(JSON.stringify({ title, category, theme: themes[category] || DEFAULT, templateHash }))
    .digest('hex')
    .slice(0, 12);

const readManifest = () => {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  } catch (err) {
    return {};
  }
};

if (require.main === module) {
  (async () => {
    const args = process.argv.slice(2);
    const force = args.includes('--force');
    const only = args.filter((arg) => !arg.startsWith('--'));

    const manifest = readManifest();
    const generated = articles.filter((item) => item.cover.generated);

    /* 每一篇：圖片在不在、指紋有沒有變 */
    const status = generated.map((article) => {
      const outFile = path.join(IMG_ROOT, article.cover.img);
      const hash = fingerprint(article);
      const exists = fs.existsSync(outFile);
      const stale = manifest[article.cover.img] !== hash;
      const wanted = force || only.includes(article.slug) || !exists || stale;
      return { article, outFile, hash, exists, stale, wanted };
    });

    const todo = status.filter((item) => item.wanted);

    /*
     * 寫回 manifest。只留現存文章的紀錄 —— 刪掉的文章不留殘骸；
     * key 排序，讓 git diff 只顯示真的有變的那幾行。
     * 「全部都是最新的」時也要寫：刪掉一篇文章時通常不會有東西要畫，
     * 只在有畫圖時才寫的話，那篇的紀錄就會一直留著。
     */
    const writeManifest = () => {
      const keep = new Set(generated.map((item) => item.cover.img));
      const next = {};
      Object.keys(manifest)
        .filter((key) => keep.has(key))
        .sort()
        .forEach((key) => {
          next[key] = manifest[key];
        });
      const text = `${JSON.stringify(next, null, 2)}\n`;
      /* 內容一樣就不寫，避免每次 build 都動到檔案時間 */
      if (!fs.existsSync(MANIFEST) || fs.readFileSync(MANIFEST, 'utf8') !== text) {
        fs.writeFileSync(MANIFEST, text);
      }
    };

    /* GitHub Actions 上不畫，只檢查 */
    if (process.env.CI) {
      const missing = status.filter((item) => !item.exists);
      const stale = status.filter((item) => item.exists && item.stale);
      stale.forEach(({ article }) =>
        console.warn(
          `⚠️  封面可能過期（標題或分類改過）：${article.cover.img} —— 請在本機跑 npm run covers 後 commit`
        )
      );
      if (missing.length) {
        throw new Error(
          `缺少文章封面：${missing.map(({ article }) => article.cover.img).join('、')}\n` +
            '請在本機跑 npm run build（或 npm run covers），把產生的圖片與 tools/article-cover/manifest.json 一起 commit。'
        );
      }
      console.log(`封面檢查完畢（${status.length} 張，CI 不重畫）`);
      return;
    }

    if (!todo.length) {
      writeManifest();
      console.log(`封面都是最新的（${status.length} 張）`);
      return;
    }

    const { send, close } = await launch();
    await send('Emulation.setDeviceMetricsOverride', {
      width: WIDTH,
      height: HEIGHT,
      deviceScaleFactor: 1,
      mobile: false,
    });

    try {
      for (const { article, outFile, hash, exists } of todo) {
        const fit = await render(send, article, outFile);
        manifest[article.cover.img] = hash;
        console.log(
          `✓ ${exists ? '重畫' : '新增'} ${path.relative(process.cwd(), outFile)}  標題 ${fit.size}px・${fit.lines} 行`
        );
      }
    } finally {
      await close();
    }

    writeManifest();
  })().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
