/*
 * petite-vue 的執行期 store。
 *
 * 所有「內容」資料都放在 src/_data/ 底下，由 EJS 在 build 期讀取並渲染成靜態 HTML，
 * 因此不需要再進入 JS bundle。這裡只保留真正需要在瀏覽器端互動的狀態：
 *   - nav  ：手機版選單的開合（導覽連結本身已是 build 期產生的靜態 <a>）
 *   - load ：loading 動畫的顯示狀態
 */
module.exports = window.PetiteVue.reactive({
  nav: {
    active: null,
    onClick(e) {
      const vm = this;

      vm.active = !vm.active;
      console.log(e);
    },
  },
  load: {
    isDone: false,
    init() {
      const vm = this;

      vm.isDone = false;
    },
    finish() {
      const vm = this;

      vm.isDone = true;
    },
  },
});
