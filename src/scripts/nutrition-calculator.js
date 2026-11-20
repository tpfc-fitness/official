import '@css/nutrition-calculator.css';

import { mountResourcePage } from '_resourcePage.js';
import { ACTIVITY, GOAL, MODE, LIMITS, parseField, calculate } from '_nutrition.js';

/* 記住上次輸入。只存表單本身，不存結果 —— 結果每次都由公式重算 */
const STORAGE_KEY = 'tpfc-nutrition-calculator';
const FORM_KEYS = ['sex', 'age', 'height', 'weight', 'goal', 'activity', 'mode'];

/*
 * localStorage 在無痕模式、被封鎖或容量滿時會直接拋錯，
 * 讀寫都包起來：記不住只是少一個方便，計算機本身要照常能用。
 */
const loadForm = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '{}');
    const form = {};
    FORM_KEYS.forEach((key) => {
      if (typeof saved[key] === 'string') form[key] = saved[key];
    });
    return form;
  } catch (err) {
    return {};
  }
};

const saveForm = (form) => {
  try {
    const data = {};
    FORM_KEYS.forEach((key) => {
      data[key] = form[key];
    });
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    /* 存不了就算了，見 loadForm 的說明 */
  }
};

/*
 * GA4「產生結果」事件。
 *
 * 一次停留只送一次，而且要等輸入停下來 1.5 秒、結果仍然有效才送 ——
 * 打字打到一半（體重打了 6、還沒打 4）就可能先湊出一組有效但不是本人的結果，
 * 每打一個字送一次的話，事件數會是實際使用人數的好幾倍。
 *
 * 一打開頁面就看到的結果（localStorage 帶回上次的輸入）不算：
 * 那是回訪，不是這次真的算了一次。所以只由 onEdit（使用者動了欄位）觸發。
 *
 * 不送身高體重年齡：分析用不到，也沒必要把身體數據送給第三方。
 */
const RESULT_DELAY = 1500;
let resultTracked = false;
let resultTimer = null;

const scheduleResultEvent = (vm) => {
  if (resultTracked) return;

  window.clearTimeout(resultTimer);
  resultTimer = window.setTimeout(() => {
    if (resultTracked || !vm.result || typeof window.gtag !== 'function') return;

    window.gtag('event', 'nutrition_calc_result', {
      goal: vm.form.goal,
      activity_level: vm.form.activity,
      difficulty: vm.form.mode,
      calories_clamped: vm.result.clamped ? 'yes' : 'no',
    });
    resultTracked = true;
  }, RESULT_DELAY);
};

const NUMBER_FIELDS = Object.keys(LIMITS);
const CHOICE_LABELS = { sex: '性別', goal: '目標', activity: '活動程度', mode: '難度模式' };

mountResourcePage({
  /*
   * 難度模式預設輕鬆：FAQ 也建議不確定就先用輕鬆模式。
   * 性別、目標、活動程度不給預設 —— 預設值很容易沒看就算下去，算錯了也不知道。
   */
  form: {
    sex: '',
    age: '',
    height: '',
    weight: '',
    goal: '',
    activity: '',
    mode: 'easy',
    ...loadForm(),
  },

  /* 離開過欄位才顯示超出範圍的提示，不然身高打第一個「1」就跳錯誤 */
  touched: { age: false, height: false, weight: false },

  get fields() {
    const fields = {};
    NUMBER_FIELDS.forEach((name) => {
      fields[name] = parseField(name, this.form[name]);
    });
    return fields;
  },

  errorOf(name) {
    return this.touched[name] ? this.fields[name].error : '';
  },

  /* 從 localStorage 帶回來的值沒有 blur 過，也要直接檢查，不然帶回錯的值卻不知道為什麼沒結果 */
  onMounted() {
    NUMBER_FIELDS.forEach((name) => {
      if (this.form[name]) this.touched[name] = true;
    });
  },

  /* 還沒填或填錯的欄位，顯示在結果區的空狀態 */
  get missing() {
    const list = [];
    if (!this.form.sex) list.push(CHOICE_LABELS.sex);
    NUMBER_FIELDS.forEach((name) => {
      if (this.fields[name].value === null) list.push(LIMITS[name].label);
    });
    ['goal', 'activity', 'mode'].forEach((key) => {
      if (!this.form[key]) list.push(CHOICE_LABELS[key]);
    });
    return list;
  },

  get result() {
    const { form, fields } = this;
    const choicesValid =
      ['male', 'female'].includes(form.sex) &&
      GOAL[form.goal] &&
      ACTIVITY[form.activity] &&
      MODE[form.mode];

    if (!choicesValid || NUMBER_FIELDS.some((name) => fields[name].value === null)) return null;

    return calculate({
      sex: form.sex,
      age: fields.age.value,
      height: fields.height.value,
      weight: fields.weight.value,
      goal: form.goal,
      activity: form.activity,
      mode: form.mode,
    });
  },

  get goalLabel() {
    return GOAL[this.form.goal] ? GOAL[this.form.goal].label : '';
  },

  get modeLabel() {
    return MODE[this.form.mode] ? MODE[this.form.mode].label : '';
  },

  get activityLabel() {
    return ACTIVITY[this.form.activity] ? ACTIVITY[this.form.activity].label : '';
  },

  get adjustmentText() {
    const value = this.result ? this.result.adjustment : 0;
    if (value > 0) return `+${value} 大卡`;
    if (value < 0) return `−${Math.abs(value)} 大卡`;
    return '不調整';
  },

  /* 只有畫面顯示時取整數；計算一律用原始數字（見 _nutrition.js） */
  fmt(value) {
    return Math.round(value).toLocaleString('en-US');
  },

  /* 活動程度對照彈窗。showModal 才有背景遮罩與焦點鎖定，show 沒有 */
  openGuide() {
    const dialog = document.getElementById('nutri-guide');
    if (dialog && typeof dialog.showModal === 'function') dialog.showModal();
  },

  closeGuide() {
    const dialog = document.getElementById('nutri-guide');
    if (dialog) dialog.close();
  },

  /*
   * 點到遮罩才關。<dialog> 的遮罩算在 dialog 元素本身，
   * 內容包在 .m-nutri-dialog-inner 裡，所以 target 是 dialog 自己時就是點在框外。
   */
  closeGuideOnBackdrop(e) {
    if (e.target === e.currentTarget) e.currentTarget.close();
  },

  onEdit() {
    saveForm(this.form);
    scheduleResultEvent(this);
  },
});
