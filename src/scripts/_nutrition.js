/*
 * 營養計算機的計算核心（純函式，不碰 DOM）。
 *
 * 寫成 CommonJS：頁面的 bundle 會 import 它，本機驗算時也能直接用 node require，
 * 兩邊跑的是同一份公式，不會出現「網頁算的跟驗算的不一樣」。
 *
 * ⚠️ 這裡回傳的都是「未四捨五入」的數字，取整數只在畫面顯示時做。
 *    例如 BMR 1137.75 先進位成 1138 再往下算，碳水會差 1～2 克，
 *    跟教練手算的結果對不起來。
 */

/*
 * 活動程度。factor 是 TDEE 的活動係數（男女共用同一組），
 * protein 是蛋白質的體重倍數。
 * 舊版女生用另一組較低的係數，那是錯的：Mifflin-St Jeor 已經用 −161 處理性別差異，
 * 活動係數再打折等於扣兩次。
 */
const ACTIVITY = {
  sedentary: { label: '趨於靜態', factor: 1.2, protein: 1.2 },
  light: { label: '低', factor: 1.375, protein: 1.4 },
  moderate: { label: '正常', factor: 1.55, protein: 1.6 },
  active: { label: '高', factor: 1.725, protein: 1.8 },
  extreme: { label: '激烈', factor: 1.9, protein: 2.0 },
};

const GOAL = {
  maintain: { label: '維持' },
  cut: { label: '減脂' },
  bulk: { label: '增肌' },
};

/*
 * 難度模式：熱量調整幅度與脂肪佔總熱量的比例一起變，
 * 地獄模式把脂肪比例壓低，省下的熱量讓給碳水。
 */
const MODE = {
  easy: { label: '輕鬆模式', fatRatio: 0.35, adjust: { maintain: 0, cut: -300, bulk: 200 } },
  hell: { label: '地獄模式', fatRatio: 0.25, adjust: { maintain: 0, cut: -400, bulk: 300 } },
};

/* 增肌時蛋白質至少這個倍數：活動量低的人照表只有 1.2～1.4，不夠支撐肌肉增長 */
const BULK_PROTEIN_MIN = 1.6;

/* 脂肪至少體重這個倍數：熱量很低又是地獄模式時，照比例算會少到不夠身體基本需要 */
const FAT_MIN = 0.6;

/*
 * 數字欄位的合理範圍。超出就不算 ——
 * Mifflin-St Jeor 是用一般成人的資料推出來的，範圍外的結果沒有參考價值。
 */
const LIMITS = {
  age: { label: '年齡', unit: '歲', min: 16, max: 80, integer: true },
  height: { label: '身高', unit: 'cm', min: 120, max: 220 },
  weight: { label: '體重', unit: 'kg', min: 30, max: 200 },
};

/*
 * 檢查一個數字欄位。回傳 { value, error }：
 *   - 空白：value 為 null、沒有 error（還沒填，不必急著罵人）
 *   - 不合格：value 為 null、error 是要顯示的提示
 * 全形數字與小數點先轉半形 —— 中文輸入法下很容易打成全形。
 */
const parseField = (name, raw) => {
  const limit = LIMITS[name];
  const text = String(raw == null ? '' : raw)
    .trim()
    .replace(/[０-９．]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0xfee0));

  if (!text) return { value: null, error: '' };

  const pattern = limit.integer ? /^\d+$/ : /^\d+(\.\d+)?$/;
  if (!pattern.test(text)) {
    return {
      value: null,
      error: limit.integer ? `${limit.label}請填整數` : `${limit.label}請填數字`,
    };
  }

  const value = Number(text);
  if (value < limit.min || value > limit.max) {
    return {
      value: null,
      error: `${limit.label}請填 ${limit.min}–${limit.max} ${limit.unit}，超出這個範圍公式不準，所以不計算`,
    };
  }

  return { value, error: '' };
};

/*
 * 主計算。input 的數字欄位要先經過 parseField。
 * 回傳每一步的原始數字，畫面才能把「怎麼算出來的」逐步列出來。
 */
const calculate = ({ sex, age, height, weight, goal, activity, mode }) => {
  const level = ACTIVITY[activity];
  const plan = MODE[mode];

  const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === 'male' ? 5 : -161);
  const tdee = bmr * level.factor;
  const adjustment = plan.adjust[goal];
  const target = tdee + adjustment;

  /*
   * 減脂熱量不低於 BMR。長期吃得比基礎代謝還少，容易掉肌肉、撐不久。
   * 只有減脂會碰到：TDEE 一定大於 BMR，維持與增肌不可能低於它。
   */
  const clamped = goal === 'cut' && target < bmr;
  const calories = clamped ? bmr : target;

  const raisedForBulk = goal === 'bulk' && level.protein < BULK_PROTEIN_MIN;
  const proteinFactor = raisedForBulk ? BULK_PROTEIN_MIN : level.protein;
  const protein = weight * proteinFactor;

  /* 脂肪照總熱量的比例算（拉回 BMR 時用拉回後的熱量），再跟體重下限比，取大的 */
  const fatByRatio = (calories * plan.fatRatio) / 9;
  const fatFloor = weight * FAT_MIN;
  const raisedToFloor = fatByRatio < fatFloor;
  const fat = raisedToFloor ? fatFloor : fatByRatio;

  /* 碳水吃剩下的熱量；拉回 BMR 時用拉回後的熱量算。體重很重、熱量很低時可能是負的，最少給 0 */
  const carbs = Math.max(0, (calories - protein * 4 - fat * 9) / 4);

  return {
    bmr,
    tdee,
    activityFactor: level.factor,
    adjustment,
    target,
    calories,
    clamped,
    protein: { grams: protein, factor: proteinFactor, raisedForBulk },
    fat: { grams: fat, ratio: plan.fatRatio, raisedToFloor },
    carbs: { grams: carbs },
  };
};

module.exports = {
  ACTIVITY,
  GOAL,
  MODE,
  LIMITS,
  BULK_PROTEIN_MIN,
  FAT_MIN,
  parseField,
  calculate,
};
