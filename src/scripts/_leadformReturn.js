/*
 * 從臉書潛在客戶表單回來的人：把預約表單換成「已收到」。
 *
 * 臉書表單最後一步的連結帶著 ?from=leadform。這些人已經在臉書留過資料，
 * 再填一次 Tally 只會讓教練收到重複的名單，所以表單收起來，
 * 改顯示「已收到」與 LINE 按鈕。KV 與課程介紹照常顯示。
 *
 * 記在 sessionStorage：同一個瀏覽階段裡點到別頁再從選單回到 contact.html，
 * 網址上已經沒有參數了，不記的話表單又會冒出來。
 * 不用 localStorage —— 隔幾個月同一支手機真的要再預約，表單應該要在。
 *
 * 必須在 petite-vue 掛載前執行：載入遮罩蓋著的時候換好，不會看到表單閃一下。
 */
const STORAGE_KEY = 'tpfc-from-leadform';

const isFromLeadform = () => {
  if (new URLSearchParams(window.location.search).get('from') === 'leadform') {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (err) {
      /* 無痕模式或封鎖儲存時會拋錯，這次照網址判斷就好 */
    }
    return true;
  }

  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch (err) {
    return false;
  }
};

export default function leadformReturn() {
  if (!isFromLeadform()) return;

  const form = document.querySelector('[data-booking="form"]');
  const done = document.querySelector('[data-booking="done"]');

  if (!form || !done) return;

  /*
   * iframe 直接拿掉而不只是藏起來：Chrome 對隱藏的 lazy iframe 仍會載入，
   * 留著等於白白載一份 Tally。
   */
  form.querySelector('iframe')?.remove();
  form.hidden = true;
  done.hidden = false;
}
