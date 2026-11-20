# 健身知識（文章列表頁）實作規格

最後更新：2026-10-16
設計稿：https://claude.ai/artifact/8GeNrUqfzJ2F5HaQdRDMQ4 （「第二版」桌機＋手機兩張）
設計稿原始檔（給程式參考樣式用）：`docs/design/article-list/V2-desktop.dc.html`、`V2-mobile.dc.html`

> 設計稿檔案裡是 inline style 與假資料，只當「長相」的參考。
> 實作要改寫成專案慣例：EJS 元件 + `_modules/` CSS + `m:` / `t:` / `p:` 斷點 + `color.css` 的 token。

---

## 一、現在的狀態（重要：先讀）

第一版（一大兩小的排版）已經寫進專案，**還沒 commit**。

### 保留，不用重做
- `htmlPage/index.js`：列表頁設定（`/article/`、title、description、`lastmod`）
- `src/_data/nav.js`：導覽加上「健身知識」→ `article/`
- `src/_components/mNav.ejs`、`mFt.ejs`：`isActive` 處理資料夾網址（`article/` 對 `article/index.html`）
- `src/App.ejs`：傳 `IS_ARTICLE_INDEX`、`DESCRIPTION` 給結構化資料
- `src/_components/mJsonLd.ejs`：列表頁 `CollectionPage + ItemList`；文章頁麵包屑三層（首頁 › 健身知識 › 文章）
- `htmlPage/SeoAssetsPlugin.js`：sitemap 加 `lastmod`；llms.txt 結尾自動附文章清單
- `src/llms.txt`：網站架構加上 `/article/`

### 要照新設計重做
- `src/views/articles/index.ejs` 與 `_components/`
- `src/assets/css/_modules/m-article-list.css`
- `src/scripts/articles.js`

### 可以刪
- `build/_preview/`（之前預覽用的暫存，下次 `npm run build` 也會被清掉）

---

## 二、頁面結構（由上到下）

1. **頁首**：小標 `FITNESS KNOWLEDGE`（螢光色）、H1「健身知識」、一句內文：
   「蒐集百位學員在課堂上最常問的問題，頭等倉整理成你自己也看得懂的文章，不用等教練在現場也能自己先解決!」
2. **推薦文章輪播**
   - 桌機：寬版大圖（16:7），左下角疊一塊黑底文字區：「推薦閱讀」螢光標籤＋紅色分類、標題（H2）、摘要（lead）、「閱讀全文 →」
   - 下方：`01` ── 橫條進度 ── `03`，右側左右箭頭
   - 手機：圖片 4:3 在上、文字在下；右邊露出下一則圖片的一小條（提示可以滑）；下方進度條＋左右箭頭（44px）
3. **分類 tab**：`全部` + 各分類，每個 tab 右上角有篇數小標籤
   - 選中：文字 #B3FFF5、粗體、底部 3px 螢光線帶微光暈（`box-shadow: 0 0 12px rgba(179,255,245,.6)`）、篇數標籤螢光底黑字
   - 未選：#8a8a8a，hover 變白
   - 手機：一排可左右滑，隱藏捲軸
4. **文章卡片**：桌機 3×3（一頁 9 篇），手機一欄
   - 卡片：圖（16:10）、紅色分類、標題（H3）、摘要兩行截斷、日期＋閱讀時間
   - 桌機 hover 圖片微放大
5. **分頁器**：`←` 頁碼 `→`，方形按鈕（桌機 48px、手機 44px），目前頁螢光底黑字
6. **頭等倉是誰**：沿用 `views/article/_components/04-brand.ejs`
   - 文案「一對一私人教練工作室」改成「健身工作室」（文章頁也會一起改，這是對的）

### 顏色分工
- 紅 `--xe120`：品牌、跑馬燈、分類標籤
- 螢光藍綠 **#B3FFF5**：只用在「可以點／目前在哪裡」——tab、輪播進度、分頁目前頁、導覽列目前頁、箭頭 hover
- `color.css` 目前沒有這個色，新增 token（依現有命名慣例，例如 `--xb3ff: #b3fff5;`）

---

## 三、資料：推薦文章記在 JSON

每篇文章的 JSON 加一個選填欄位：

```json
"featured": true
```

- 有 `featured: true` 的文章進輪播，依 `updated` 由新到舊，最多 5 則
- 一篇都沒有 → 整塊輪播不輸出
- 推薦的文章**仍然**出現在下面的卡片列表（列表是完整清單）
- `_TEMPLATE.json` 補上 `_featured` 說明
- 目前唯一一篇（squat-knee-pain）先設 `true`，畫面才看得到輪播

---

## 四、分類 tab 與分頁的運作（已決定）

**所有文章都輸出在同一頁的 HTML 裡，由前端 JS 篩選與分頁。**

- 理由：Google／AI 一次就看到全部文章與連結；新增文章不必多做事
- 不做 `/article/page/2/`、`/article/category/xxx/` 這類靜態頁（文章超過約 60 篇再考慮）
- 卡片用 `hidden` 屬性隱藏，不要用 JS 動態產生 DOM
- 沒有 JS 時：全部文章都顯示，tab 與分頁器不顯示（tab／分頁器預設加 `hidden`，JS 啟動後才打開）
- 一頁 9 篇；篇數 ≤ 9 時不顯示分頁器
- 切換 tab → 回到第 1 頁
- 換頁時捲回 tab 列頂端（扣掉固定 header 高度，做法同 `faq.js`）
- 狀態寫進網址（`?category=動作教學&page=2`，用 `history.replaceState`），重新整理或分享連結時保持同一頁
- tab 用 `role="tablist"` / `role="tab"` / `aria-selected`；分頁目前頁 `aria-current="page"`
- 只有一個分類時：tab 列仍然顯示（設計就是這樣），只會有「全部」和那一個分類

---

## 五、輪播

- 用專案現有的 `src/scripts/_slider.js`（tiny-slider），對應其中的 **D 極簡輪播型**（大圖＋橫條分頁＋箭頭）
- 手機露出下一則：用 tiny-slider 的 `edgePadding`
- 不自動播放
- 輪播裡的文字、連結都在初始 HTML 裡（不是 JS 產生）

---

## 六、SEO / AEO 要維持的

- 全頁只有一個 H1；輪播標題 H2、卡片標題 H3
- 每張卡片只有一個連結（標題那個），用 `::after` 撐滿整張卡可點
- 第一張輪播圖 `eager: true`，其他圖片延遲載入
- 圖片沿用 `@component/articleImg.ejs`
- 結構化資料、sitemap、llms.txt 已在第一版做好，不用動

---

## 七、工作規則

- 不要 commit、不要 push（Amy 自己處理）
- 程式命名用英文；註解用中文，寫「為什麼」
- 完成後跑 `npm run build` 確認可以建置
- 規格不清楚的地方先停下來問，附一個建議答案
