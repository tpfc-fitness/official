/*
 * 免費資源（計算機、訓練計畫表等工具頁）
 *
 * 一筆 ＝ 一頁：htmlPage/index.js 讀這份清單，產生 /resources/<slug>.html，
 * sitemap、總覽頁（/resources/）、麵包屑也都吃這一份，新增一頁不用回去改那些地方。
 *
 * 新增一頁資源要做三件事：
 *   1. 這裡加一筆
 *   2. 內容（說明文字、FAQ、注意事項、CTA）寫在 _data/resources/<slug>.js
 *   3. 頁面本身放 views/resources/<slug>/index.ejs，互動寫在 scripts/<slug>.js
 *      共用的段落（頁首、說明、FAQ、注意事項、CTA）在 views/resources/_components/，
 *      每頁只需要自己寫工具那一塊
 *
 * ⚠️ slug 就是網址，已經發布過的不要改。
 * ⚠️ 這支會被 Node（htmlPage）與 webpack（EJS）兩邊 require，不要依賴 window。
 *
 * 欄位：
 *   slug         網址與檔名
 *   title        頁面 <title> 與搜尋結果標題（後面會自動接品牌名）
 *   name         短名稱：麵包屑、總覽頁卡片、footer 用
 *   description  meta description，80～120 字
 *   summary      總覽頁卡片上的一句話介紹
 *   updated      最後更新日（YYYY-MM-DD），sitemap 的 lastmod
 */
module.exports = [
  {
    slug: 'nutrition-calculator',
    title: '營養計算機｜TDEE、蛋白質、碳水、脂肪一次算',
    name: '營養計算機',
    description:
      '輸入性別、年齡、身高、體重與活動程度，算出 BMR、TDEE 與每日建議熱量，以及蛋白質、脂肪、碳水各吃幾克。可依增肌、減脂或維持調整，每一步怎麼算都列出來。民權西路頭等倉教練整理。',
    summary:
      '算出每日熱量，以及蛋白質、脂肪、碳水各吃幾克。增肌、減脂、維持都能算，每一步怎麼來都看得到。',
    updated: '2026-11-04',
  },
  {
    slug: 'full-body-workout',
    title: '新手重訓課表｜基礎全身 A、B 兩版輪流練',
    name: '基礎重訓課表',
    description:
      '深蹲、臥推、硬舉、划船等基本動作排成 A、B 兩版全身課表，照順序輪流練，組數次數照表做。附重量怎麼抓、什麼時候加重，可下載圖片在健身房看。民權西路頭等倉教練整理。',
    summary: '全身練、兩個版本輪流做，組數次數都排好了。',
    updated: '2026-11-24',
  },
  {
    slug: 'glute-workout',
    title: '翹臀課表｜練臀 5 個動作，組數、次數、疲勞度照表做',
    name: '翹臀基礎課表',
    description:
      '槓鈴深蹲、羅馬尼亞硬舉、保加利亞分腿蹲、臀推等 5 個練臀動作排成一份課表，組數、次數、疲勞度都寫好。附臀部兩側凹陷怎麼練、屁股沒感覺怎麼辦，可下載圖片。民權西路頭等倉教練整理。',
    summary: '5 個練臀動作，組數、次數、每組做到多累都排好了。附臀部兩側凹陷要選哪個動作。',
    updated: '2026-11-24',
  },
  {
    slug: 'back-workout',
    title: '女生練背課表｜直臂下壓開始，4 個動作練出背部線條',
    name: '薄肌美背課表',
    description:
      '直臂下壓、寬把滑輪下拉、坐姿划船、面拉 4 個背部動作排成一份課表，組數、次數、疲勞度都寫好。附直臂下壓與面拉的常見錯誤和正確做法，練背沒感覺、圓肩的人先看這裡，可下載圖片。民權西路頭等倉教練整理。',
    summary: '4 個背部動作，直臂下壓開始、面拉收尾。附練背沒感覺、圓肩的常見錯誤與做法。',
    updated: '2026-11-24',
  },
];
