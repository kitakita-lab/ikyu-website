// デザイントークン(src/app/globals.css の @theme)の文字色と背景色の組み合わせが、
// WCAG AA(通常の文字で 4.5:1)を満たしているかを確認する。
// globals.css に「コントラストは全組み合わせで WCAG AA 以上を維持すること」と定めている方針の機械チェック。
// 色そのものの良し悪し(ブランドとしての美しさ)は判定しない。
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";

const css = readFileSync(path.resolve(import.meta.dirname, "../src/app/globals.css"), "utf8");
const theme = css.match(/@theme\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
const colors = Object.fromEntries(
  [...theme.matchAll(/--color-([a-z-]+):\s*(#[0-9a-fA-F]{6})\s*;/g)].map((m) => [m[1], m[2]]),
);

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}
function contrast(a, b) {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
}

// サイトで文字に使っている組み合わせ(text-* × bg-*)。
// rose-soft・line は罫線や花びらなど文字以外にだけ使うので対象外。
const PAIRS = [
  ["ink", "base"],
  ["ink-soft", "base"],
  ["rose", "base"],
  ["ink", "base-soft"],
  ["ink-soft", "base-soft"],
  ["rose", "base-soft"],
  ["base", "ink"], // 濃茶のボタン
  ["base", "rose"], // ボタンのホバー
];

test("トークンを読み取れている", () => {
  for (const name of ["base", "base-soft", "ink", "ink-soft", "rose"]) {
    assert.ok(colors[name], `--color-${name} が @theme に見つからない`);
  }
});

for (const [fg, bg] of PAIRS) {
  test(`文字 ${fg} × 背景 ${bg} が 4.5:1 以上`, () => {
    const ratio = contrast(colors[fg], colors[bg]);
    assert.ok(ratio >= 4.5, `${fg}(${colors[fg]}) × ${bg}(${colors[bg]}) = ${ratio.toFixed(2)}:1`);
  });
}
