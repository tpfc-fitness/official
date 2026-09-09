/*
 * 格式化 src/ 底下所有 .ejs 檔。
 *
 * 為什麼不用 Prettier：Prettier 沒有 EJS 支援，社群外掛 prettier-plugin-ejs
 * 會把 <% %> 當成一般文字重新斷行，導致其中的 JS 字串被從中間切斷而無法編譯。
 * js-beautify 的 erb 模式（<% %> 與 EJS 同語法）會把標籤視為不可分割的整體，
 * 是目前唯一安全的選擇。
 *
 * 用法：npm run format:ejs           格式化
 *       npm run format:ejs -- --check 只檢查、不寫入（給 CI 用）
 */
const fs = require('fs');
const path = require('path');
const beautify = require('js-beautify').html;

const CHECK = process.argv.includes('--check');
const CONFIG = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', '.jsbeautifyrc'), 'utf8')
).html;
const ROOT = path.join(__dirname, '..', 'src');

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith('.ejs') ? [full] : [];
  });

const files = walk(ROOT);
const changed = [];

files.forEach((file) => {
  const source = fs.readFileSync(file, 'utf8');
  const output = beautify(source, CONFIG);

  if (source === output) return;
  changed.push(path.relative(path.join(__dirname, '..'), file));
  if (!CHECK) fs.writeFileSync(file, output);
});

if (CHECK && changed.length) {
  console.error(`以下 ${changed.length} 個檔案需要格式化：`);
  changed.forEach((f) => console.error(`  ${f}`));
  console.error('\n執行 npm run format:ejs 修正。');
  process.exit(1);
}

console.log(
  CHECK
    ? `${files.length} 個 .ejs 檔的格式都正確。`
    : `已檢查 ${files.length} 個 .ejs 檔${changed.length ? `，格式化了 ${changed.length} 個` : '，全部已是正確格式'}。`
);
