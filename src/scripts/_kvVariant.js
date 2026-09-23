/*
 * KV 標題的切角切換。
 *
 * 網站是靜態產生的，網址參數只能在瀏覽器端讀，所以 HTML 裡輸出的是
 * 預設那一組（維持單一 h1，搜尋引擎看到的主題才不會分歧），
 * 這裡再依 ?type= 抽換文字。
 *
 * 沒有帶參數時隨機挑一個，並記在 sessionStorage 裡 ——
 * 不記的話同一個人按上一頁再回來會看到不同標題，像壞掉一樣。
 *
 * 必須在 petite-vue 掛載之前執行：載入遮罩會蓋住畫面直到掛載完成，
 * 在那之前換完字就不會看到文字跳動。
 */
import { VARIANTS, DEFAULT, splitTitle } from '_data/contact-kv.js';

const STORAGE_KEY = 'tpfc-kv-type';

const pickType = () => {
  const fromUrl = new URLSearchParams(window.location.search).get('type');

  if (fromUrl && VARIANTS[fromUrl]) return fromUrl;

  /* 同一個瀏覽階段裡維持同一個切角 */
  try {
    const saved = window.sessionStorage.getItem(STORAGE_KEY);
    if (saved && VARIANTS[saved]) return saved;
  } catch (err) {
    /* 無痕模式或封鎖儲存時會拋錯，忽略即可 */
  }

  const keys = Object.keys(VARIANTS);
  const picked = keys[Math.floor(Math.random() * keys.length)];

  try {
    window.sessionStorage.setItem(STORAGE_KEY, picked);
  } catch (err) {
    /* 同上 */
  }

  return picked;
};

export default function kvVariant() {
  const title = document.querySelector('[data-kv-title]');
  const lead = document.querySelector('[data-kv-lead]');

  if (!title || !lead) return;

  const type = pickType();

  /* 已經是預設那一組就不用動 DOM */
  if (type === DEFAULT) return;

  /*
   * 標題要在逗號後斷行，所以用節點組回去而不是 textContent。
   * 不用 innerHTML：文案雖然是自己人寫的，但沒有必要為了一個 <br>
   * 開一條會解析字串的路。
   */
  const [head, tail] = splitTitle(VARIANTS[type].title);

  title.textContent = '';
  title.append(head, document.createElement('br'), tail);

  lead.textContent = VARIANTS[type].lead;
}
