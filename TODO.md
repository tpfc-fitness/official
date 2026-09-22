# 待辦清單

未完成、被擱置、或需要外部素材的事項。
問「我們還有什麼事沒做嗎？」時請讀這個檔。

最後更新：2026-09-23

---

## 一、需要你提供素材（我無法自己產生）

- [ ] **首頁 KV 背景照** — `src/assets/img/index/kv.jpg` 目前是佔位圖
      （複製自 `firstclass_fitness_indoor4.jpg`）。
      建議寬 1600–1920px、JPEG 品質 75、300KB 以內。

- [ ] **Elain 的照片** — `src/assets/img/ourteam/coach_elain.jpg` 目前是佔位圖
      （複製自 `coach_allen.jpg`）。

- [ ] **阿圓的照片** — `src/assets/img/ourteam/coach_ayuan.jpg` 目前是佔位圖
      （複製自 `coach_alex.jpg`）。

- [ ] **教練卡可能需要兩種裁切** — 桌機／平板的卡是寬扁比例（約 1.67:1），
      手機是正方形縮圖。同一張正方形原圖在桌機會被切掉上下約三成，
      目前先用 `object-top` 對齊上緣避免切到頭。
      正式照片到位後，可以改成準備「寬版 + 方版」兩種裁切。

      註：`img.ejs` **已經有多尺寸的機制**（`path` 傳
      `{ p: 寬版, m: 方版 }` 會輸出 `<picture>`），但目前是死的，
      復用前需要修兩處：
      1. `<source>` 用的是 `data-srcset`（給 vanilla-lazyload 用），
         但已改用原生 lazy load，所以永遠不會生效，要改成 `srcset`
      2. 斷點寫死 `max-width: 428px`，與專案的 740px 不一致

- [ ] **新生 10 堂訓練計畫的四張配圖** — contact／resevation 頁
      「10 堂課，你會帶走 4 種能力」四張卡片，設計稿裡每張卡片有一張情境照
      （基礎動作／健身房器材／飲食筆記／自主訓練），目前沒有放。
      版面沒有圖也成立，編號是視覺重心，所以不是缺陷，而是還沒做滿。
      要放的話檔名用 `src/assets/img/contact/plan_01~04.jpg`，
      建議寬 720px、橫幅比例（約 4:3），JPEG 品質 75。
      放進去之後告訴我，我再接上 `_data/newbie-plan.js` 的 img 欄位。

## 二、教練名單需要整批更新（有兩位教練已離職）

首頁的教練團隊區塊已改為 Benson / Elain / 阿圓，但其他兩處還是舊名單，
使用者從首頁點進去會看到不同的人：

- [ ] `src/_data/coach.js`（**教練團隊頁**）仍列 Benson / Allen / Alex / Roy。
      需要 Elain 與阿圓的**證照清單**與**專長清單**才能更新。
- [ ] `src/_data/coach-stories.js`（**contact / resevation 頁**的 Before/After
      故事）仍有 Allen 的段落，需確認是否移除或替換。
- [ ] 離職教練的照片檔（`coach_allen.jpg` / `coach_alex.jpg` / `coach_roy.jpg`）
      在名單更新後可一併清掉。

## 三、上線前必做

- [ ] **確認 `config.js` 的 `siteUrl` 與 `rootDirectory`** 與實際部署位置一致。
      目前設為 `https://tpfc-fitness.github.io/official` 與 `/official/`。
      兩者必須同時對應，否則 canonical 會指向不存在的網址，或資產全部 404。

- [ ] **Search Console 提交 sitemap**：以「網址前置字元」新增
      `https://tpfc-fitness.github.io/official/`（不能選「網域」，那需要 DNS 權限），
      驗證後提交 `sitemap.xml`。
      註：GitHub Pages 子路徑下的 `robots.txt` 不會被讀取（爬蟲只讀 host 根目錄），
      所以 sitemap 必須手動提交。等之後接上自訂網域到根目錄就會自動生效。

## 四、待你決定

- [x] ~~structure.md 規劃、但首頁還沒做的區塊~~ —— 已全部完成：
      「預約 CTA」以結尾行動呼籲區塊實作；「品牌／服務特色」併入
      品牌理念區塊，以直式流程圖呈現「動作學習 → 實際操作 →
      訓練安排 → 自主訓練」，不另開區塊避免與品牌理念重複。
- [x] ~~structure.md 沒有、但首頁現有的區塊要保留還是拿掉~~ —— 已處理：
      Instagram 貼文改為「想先了解更多？」FAQ、場館環境照片改為結尾
      行動呼籲、學員推薦依設計稿改版保留。

- [ ] **結尾行動呼籲的背景是沿用既有環境照** —
      `firstclass_fitness_indoor2.jpg`。若要換成專門拍攝的圖，
      改 `_modules/m-bg-photo.css` 裡 `.--cta` 的 background-image 一行即可。

- [ ] **首頁 FAQ 第 02、03 題的內文是我起草的**，請確認或改寫
      （`src/_data/home-faq.js`）：
      - 02 新生 10 堂 8,000 元方案 —— 改寫自跑馬燈的既有文案
      - 03 場租方案怎麼算？ —— 改寫自 Instagram 的場租貼文
      第 01 題是你提供的原文，未改動。

- [ ] **首頁 FAQ 背景可考慮加平板／手機直幅裁切** — 目前三個斷點共用
      `qa-bg.png`（1536x1024 橫幅）。設計稿建議 tablet 1024x1365、
      mobile 768x1365。要加的話把檔案命名為 `qa-bg_t.png`、`qa-bg_m.png`
      放進同一資料夾，再把 `_modules/m-faq.css` 裡註解掉的兩個
      `@screen` 區塊解開即可。
- [ ] **`09-price-compare.ejs`**（學習渠道比價）目前停用但檔案保留在
      `src/views/contact/_components/`，未被任何頁面 require。
- [ ] **contact 頁的 h1 位置偏深** — 「預約免費體驗」在第 7 個區塊。
      KV 區（`01-kv.ejs`）是純圖片沒有文字，若那張圖上本來就有標題，
      標準做法是在該處放一個 `sr-only` 的 h1，並把表單那個降為 h2。

## 四之二、圖片過大（影響很直接）

預約頁的四張底圖沒有針對網頁最佳化，即使經過 build 壓縮後仍然很大：

| 檔案 | 原始 | build 後 |
|---|---|---|
| `resevation/bg-02.png` | 14 MB | **3.9 MB** |
| `resevation/kv.png` | 4.8 MB | **1.7 MB** |
| `resevation/bg-04.jpg` | 984 KB | 984 KB |
| `resevation/bg-03.png` | 2.7 MB | 732 KB |

- [ ] **把這四張改存成 JPEG** —— 它們是照片，用 PNG 是錯的格式。
      對照組：`index/qa-bg.png` 1.6MB 壓到 136KB，那張顏色單純所以
      PNG 還撐得住；這四張撐不住。轉成品質 75 的 JPEG 大約會落在
      200–400KB，也就是現在的十分之一。
- [ ] 整個 `dist` 目前 24MB，其中 19MB 是圖片。

## 五、技術債

- [ ] **jQuery 只為了一個函式而載入** — `_prototype.js` 的 `hdScroll()`
      （手機版捲動時隱藏 header）是全站唯一還在用 jQuery 的地方，
      卻要為它在每頁同步載入 90KB。改寫成原生 JS 約 20 行，可直接移除 jQuery。
- [ ] **`vanilla-lazyload` 已無作用** — 圖片改用瀏覽器原生 `loading="lazy"` 後，
      `lazyLoadFun()` 沒有任何 `data-src` 可處理，可以移除。
- [ ] **Vue 相關依賴是死的** — `vue-loader` / `vue-template-compiler` /
      `vue-style-loader` / `vue-eslint-parser`，但專案內 0 個 `.vue` 檔，
      且 Vue 2 已於 2023-12 EOL。
- [ ] **`imagemin-*` 系列**（`jpegtran-bin@4`、`optipng-bin@5`、`gifsicle@4`）
      在安裝期下載原生 binary，在新版 Node / Apple Silicon 上容易失敗。
      建議改用 `sharp`。
- [ ] **Tailwind 3 → 4**。
- [ ] **`img.ejs` 的 alt 自動接品牌名** — 全站每張圖的 alt 都以
      「| first class 頭等倉運動空間」結尾，重複性偏高。
- [ ] **`.vscode/settings.json`** 最後一個屬性有多餘的逗號。

- [ ] **「查看所有 Google 評論」連到的是地標頁，不是評論頁** — 目前用
      `_data/site.js` 的 `hasMap`。若有直接開啟評論列表的網址會更精準。

- [ ] **`_modules/m-slider.css` 有幾行沒有作用的宣告** —
      `.m-slider-prev/next::before` 先寫了 `width: 20px; height: 2px;`，
      緊接著的 `@apply` 又設了 `h-[1px]` 與斷點寬度並覆蓋掉它們。
      無害，但會誤導閱讀。

## 六、效能觀察

- [ ] **首頁 KV 背景可能是 LCP 元素** — CSS `background-image` 要等 CSS 解析完
      才會被發現，比 `<img>` 晚。若 Lighthouse 判定它是 LCP，需要加
      `<link rel="preload" as="image">`；但 webpack 會在檔名後掛 hash，
      要多寫一點東西才拿得到正確網址。

---

## 已完成（供對照，不用再做）

- SEO：每頁專屬 canonical / og:url / title / description、`zh-Hant-TW`、
  導覽列改為 build 期輸出的靜態連結、sitemap 與 robots 自動產生、
  `HealthClub` / `WebSite` / `BreadcrumbList` 結構化資料、每頁獨立 h1
- 內容從 petite-vue 客戶端渲染改為 build 期渲染（HTML 內圖片 43 → 70 張）
- 圖片真實像素尺寸（修 CLS）、首屏 `eager` + `fetchpriority`、原生 lazy load
- `<main>` landmark 與 skip link
- contact 承接預約頁完整內容，與 resevation 共用同一組區塊；
  resevation 設為 noindex 專供廣告落地
- 全站表單統一為 Tally，Google 表單已移除
- view 改為每頁一資料夾 + `_components/` 區塊拆分
- 格式化工具修復（Prettier + js-beautify）與 `npm run format` 系列指令
