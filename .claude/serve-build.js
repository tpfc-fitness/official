// 預覽 build 結果：把 build/ 掛在 /official/ 底下，跟 GitHub Pages 的路徑一樣
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '../build');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml' };

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]).replace(/^\/official/, '');
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(root, p);
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); return res.end('404'); }
    res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(8766);
