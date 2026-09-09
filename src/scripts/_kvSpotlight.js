/*
 * KV 的滑鼠光暈。
 *
 * 只把游標位置寫進 --kv-x / --kv-y 兩個 CSS 變數，實際的漸層畫在
 * .kv::after，瀏覽器只需重繪那一層，不會觸發版面重排。
 * 觸控裝置沒有 hover，跑了也看不到，所以直接跳過不掛監聽器。
 */
export default function kvSpotlight(selector = '.kv') {
  const elem = document.querySelector(selector);

  if (!elem) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  let frame = null;
  let position = null;

  const paint = () => {
    frame = null;
    if (!position) return;

    elem.style.setProperty('--kv-x', `${position.x}%`);
    elem.style.setProperty('--kv-y', `${position.y}%`);
  };

  elem.addEventListener('mousemove', (event) => {
    const rect = elem.getBoundingClientRect();

    position = {
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    };

    /* 一個影格最多更新一次，滑鼠事件本身的頻率遠高於畫面更新率 */
    if (!frame) frame = window.requestAnimationFrame(paint);
  });

  elem.addEventListener('mouseenter', () => elem.classList.add('is-spotlight'));

  elem.addEventListener('mouseleave', () => {
    elem.classList.remove('is-spotlight');

    if (frame) {
      window.cancelAnimationFrame(frame);
      frame = null;
    }
  });
}
