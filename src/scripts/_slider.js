/*
 * 輪播的共用設定。
 *
 * 站上的輪播依設計規範分成四種樣式，差別只在「導覽方式」：
 *
 *   A 環境導覽型  大圖 + 縮圖切換（無箭頭）      information
 *   B 焦點展示型  大圖 + 箭頭 + 分頁數字          service
 *   C 多圖預覽型  多張卡片 + 箭頭（無分頁）        ourteam
 *   D 極簡輪播型  大圖 + 橫條分頁（＋箭頭）        contact
 *
 * 其餘設定（items、edgePadding、gutter、responsive）由各處自行決定，
 * 這裡只負責把四種樣式的差異與共通行為收在一個地方。
 */
import { tns } from 'tiny-slider/src/tiny-slider';
import 'tiny-slider/dist/tiny-slider.css';

/*
 * 共通行為。
 * mouseDrag 一律關閉：桌機以箭頭或縮圖操作，拖曳只會跟點擊互相干擾；
 * 觸控滑動由 tiny-slider 的 touch 選項負責，預設就是開啟的。
 */
const BASE = {
  autoplay: false,
  loop: false,
  rewind: true,
  mouseDrag: false,
};

/* 四種樣式在導覽方式上的差異 */
const PRESETS = {
  a: { controls: false, nav: true, navAsThumbnails: true },
  b: { controls: true, nav: false },
  c: { controls: true, nav: false },
  d: { controls: true, nav: true, navPosition: 'bottom' },
};

/*
 * 建立輪播。容器不存在時回傳 null，呼叫端不必各自檢查。
 * preset 為 'a' | 'b' | 'c' | 'd'，options 可覆寫任何設定。
 */
export function createSlider(container, preset, options = {}) {
  if (!document.querySelector(container)) return null;

  return tns({
    ...BASE,
    ...(PRESETS[preset] || {}),
    ...options,
    container,
  });
}

/*
 * B 樣式的分頁數字（01 / 06）。
 * 總數在 build 期就寫進標記裡，這裡只更新當前的編號。
 */
export function bindCounter(slider, currentSelector) {
  const current = document.querySelector(currentSelector);

  if (!slider || !current) return;

  const sync = (info) => {
    current.textContent = String(info.displayIndex).padStart(2, '0');
  };

  slider.events.on('indexChanged', sync);
  sync(slider.getInfo());
}
