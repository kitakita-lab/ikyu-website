// CI のビルドで使う Google Fonts の CSS(tests/fixtures/google-fonts-css.json)を取り直す。
//
// なぜ必要か:Google Fonts は取得元によって CSS の形式を変えることがあり、GitHub Actions では
// フォントの URL に「?kit=…&skey=…」が付いた形式が返って、Next.js(Turbopack)のビルドが
// 「next/font/google queries have exactly one entry」で失敗した(2026-10、PR #14)。
// CI では、Cloudflare Pages の本番ビルドと同じ形式の CSS をこのファイルから読ませる
// (Next.js の NEXT_FONT_GOOGLE_MOCKED_RESPONSES。フォントファイル自体は Google から取得する)。
//
// src/app/layout.tsx のフォント(種類・太さ)を変えたら、URLS を合わせてから実行する:
//   node scripts/update-font-fixture.mjs
// URL が合っていないと、CI のビルドが「Missing mocked response for URL: …」で止まり、必要な URL が表示される。
import { writeFileSync } from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const URLS = [
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&display=swap",
  "https://fonts.googleapis.com/css2?family=Zen+Old+Mincho:wght@400&display=swap",
];
// Next.js が Google Fonts から CSS を取得するときと同じ User-Agent(woff2 の CSS が返る)
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36";

const out = {};
for (const url of URLS) {
  // プロキシ環境でも動くよう curl を使う
  const css = execFileSync("curl", ["-sS", "--fail", "--max-time", "30", "-A", UA, url], { encoding: "utf8" });
  if (!css.includes("@font-face")) throw new Error(`@font-face がない応答: ${url}`);
  if (/fonts\.gstatic\.com\/[^)]*\?/.test(css)) {
    throw new Error(`フォントの URL にクエリが付いた形式が返った(この形式ではビルドできない): ${url}`);
  }
  out[url] = css;
}
const file = path.resolve(import.meta.dirname, "../tests/fixtures/google-fonts-css.json");
writeFileSync(file, `${JSON.stringify(out, null, 2)}\n`);
console.log(`更新しました: ${path.relative(process.cwd(), file)}(${URLS.length} 件)`);
