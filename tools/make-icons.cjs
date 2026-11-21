// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、コンセントのプラグと回る矢印。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <path d="M30 70 A26 26 0 1 1 72 74" fill="none" stroke="#7fc4ef" stroke-width="6" stroke-linecap="round"/><path d="M64 70 L74 76 L74 64" fill="#7fc4ef"/><rect x="38" y="34" width="24" height="22" rx="4" fill="#fffdf7"/><rect x="43" y="22" width="4" height="13" fill="#f6d77a"/><rect x="53" y="22" width="4" height="13" fill="#f6d77a"/><path d="M50 56 L50 70" stroke="#fffdf7" stroke-width="5" stroke-linecap="round"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
