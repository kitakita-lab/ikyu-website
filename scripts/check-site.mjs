// ビルド後の静的サイト(out/)の検査。`npm run build` の後に実行する。
// 検索・共有・リンク・アクセシビリティのうち、生成された HTML から機械的に判定できる問題だけを見る。
// 見た目・写真・文言の良し悪しは判定しない(docs/brand-review.md の人間チェックで扱う)。
//
// 実行: npm run check:site   (失敗があれば一覧を出して終了コード 1)
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "out");
const { site } = await import("../src/content/site.ts");
const SITE = site.url;

if (!existsSync(OUT)) {
  console.error("out/ がありません。先に npm run build を実行してください。");
  process.exit(1);
}

const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

// ───────── HTML の簡易解析(Next.js が出力する整形済み HTML が対象) ─────────
const attrsOf = (tag) =>
  Object.fromEntries([...tag.matchAll(/([a-zA-Z:-]+)(?:="([^"]*)")?/g)].slice(1).map((m) => [m[1], m[2] ?? ""]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "g"))].map((m) => attrsOf(m[0]));
const meta = (html, key) =>
  tags(html, "meta").find((a) => a.name === key || a.property === key)?.content;
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");
const stripScripts = (html) => html.replace(/<script\b[\s\S]*?<\/script>/g, "").replace(/<style\b[\s\S]*?<\/style>/g, "");
const textOf = (html) => decode(stripScripts(html).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

// out/about.html → /about、out/index.html → /
const routeOf = (file) => {
  const rel = path.relative(OUT, file).replace(/\\/g, "/").replace(/\.html$/, "");
  return rel === "index" ? "/" : `/${rel.replace(/\/index$/, "")}`;
};
const htmlFiles = walk(OUT).filter((f) => f.endsWith(".html") && !f.includes(`${path.sep}_next${path.sep}`));
const NOT_FOUND = new Set(["/404", "/_not-found"]);
const pages = htmlFiles
  .map((file) => ({ file, route: routeOf(file), html: readFileSync(file, "utf8") }))
  .filter((p) => !NOT_FOUND.has(p.route));
const routes = new Set(pages.map((p) => p.route));
const urlFor = (route) => (route === "/" ? SITE : `${SITE}${route}`);

/** サイト内リンク(/about#x など)が存在するページ・ファイルを指しているか */
function resolveInternal(href) {
  const [pathPart, hash] = href.split("#");
  const clean = decodeURIComponent(pathPart.split("?")[0]) || "/";
  const route = clean.length > 1 ? clean.replace(/\/$/, "") : clean;
  if (routes.has(route)) return { ok: true, route, hash };
  const file = path.join(OUT, clean);
  return { ok: existsSync(file) && statSync(file).isFile(), route: null, hash };
}
const idsOf = (html) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

// ───────── ページごとの検査 ─────────
const titles = new Map();
const canonicals = new Set();

for (const { route, html } of pages) {
  const where = route;
  const body = stripScripts(html);

  if (!/<html[^>]*\blang="ja"/.test(html)) fail(where, '<html lang="ja"> がない');

  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "").trim();
  if (!title) fail(where, "title が空");
  else if (titles.has(title)) fail(where, `title が ${titles.get(title)} と重複「${title}」`);
  else titles.set(title, route);

  if (!meta(html, "description")?.trim()) fail(where, "meta description が空");

  const canonical = tags(html, "link").find((a) => a.rel === "canonical")?.href;
  const expected = urlFor(route);
  if (canonical !== expected && !(route === "/" && canonical === `${SITE}/`)) {
    fail(where, `canonical が自ページを指していない(${canonical ?? "なし"} / 期待: ${expected})`);
  }
  if (canonical) canonicals.add(canonical.replace(/\/$/, ""));
  if (meta(html, "og:url") !== canonical) fail(where, `og:url(${meta(html, "og:url")})が canonical と異なる`);
  if (!meta(html, "og:title")) fail(where, "og:title がない");
  const ogImage = meta(html, "og:image");
  if (!ogImage) fail(where, "og:image がない");
  else if (!ogImage.startsWith(`${SITE}/`)) fail(where, `og:image が ${SITE} の絶対URLではない: ${ogImage}`);
  else if (!existsSync(path.join(OUT, ogImage.slice(SITE.length)))) fail(where, `og:image のファイルがない: ${ogImage}`);
  if (/noindex/.test(meta(html, "robots") ?? "")) fail(where, "公開ページなのに noindex になっている");

  const h1 = (body.match(/<h1\b/g) ?? []).length;
  if (h1 !== 1) fail(where, `h1 が ${h1} 個(1個であるべき)`);

  for (const img of tags(body, "img")) {
    if (!("alt" in img)) fail(where, `img に alt がない: ${img.src}`);
    if (img.src?.startsWith("/") && !resolveInternal(img.src).ok) fail(where, `画像がない: ${img.src}`);
  }

  const ids = idsOf(html);
  for (const m of body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)) {
    const a = attrsOf(`<a ${m[1]}>`);
    const href = a.href ?? "";
    const name =
      textOf(m[2]) ||
      a["aria-label"] ||
      [...m[2].matchAll(/<img\b[^>]*\balt="([^"]+)"/g)].map((x) => x[1]).join(" ");
    if (!name.trim()) fail(where, `リンクに読み上げ可能な名前がない: ${href}`);
    if (a.target === "_blank" && !/\bnoopener\b/.test(a.rel ?? "")) fail(where, `target="_blank" に rel="noopener" がない: ${href}`);
    if (href.startsWith("#")) {
      if (href.length > 1 && !ids.has(href.slice(1))) fail(where, `ページ内リンク先 ${href} がない`);
    } else if (href.startsWith("/") && !href.startsWith("//")) {
      const r = resolveInternal(href);
      if (!r.ok) fail(where, `リンク切れ: ${href}`);
      else if (r.hash && r.route) {
        const target = pages.find((p) => p.route === r.route);
        if (target && !idsOf(target.html).has(r.hash)) fail(where, `リンク先 ${href} の #${r.hash} がない`);
      }
    } else if (/^http:\/\//.test(href)) {
      fail(where, `外部リンクが https ではない: ${href}`);
    }
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch {
      fail(where, "構造化データ(JSON-LD)が JSON として読めない");
    }
  }

  // 仮の値・ブランド表記(ブランド名は小文字の ikyu)
  const visible = `${textOf(body)} ${tags(html, "meta").map((t) => t.content ?? "").join(" ")} ${tags(body, "img").map((t) => t.alt ?? "").join(" ")}`;
  if (/X{4,}/.test(body)) fail(where, "XXXX のような仮の値が残っている");
  if (/lorem ipsum|localhost|example\.(com|jp)/i.test(body)) fail(where, "仮の文言・URL が残っている");
  if (/\b(IKYU|Ikyu)\b/.test(visible)) fail(where, "ブランド名が小文字の ikyu になっていない箇所がある");

  // 作品ページには外部の購入リンクがあること(購入導線の消失を防ぐ。リンク先の内容は人間が判断)
  if (/^\/collection\/[^/]+$/.test(route)) {
    const buy = [...body.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)].find((x) => textOf(x[2]).includes("購入"));
    if (!buy) fail(where, "購入リンクがない");
    else if (!/href="https:\/\//.test(buy[1])) fail(where, "購入リンクが https の外部URLではない");
  }
}

// ───────── サイト全体 ─────────
const sitemap = existsSync(path.join(OUT, "sitemap.xml")) ? readFileSync(path.join(OUT, "sitemap.xml"), "utf8") : "";
if (!sitemap) fail("/sitemap.xml", "ない");
const locs = new Set([...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/\/$/, "")));
for (const loc of locs) if (!canonicals.has(loc)) fail("/sitemap.xml", `存在しないページを載せている: ${loc}`);
for (const c of canonicals) if (!locs.has(c)) fail("/sitemap.xml", `ページが載っていない: ${c}`);

const robots = existsSync(path.join(OUT, "robots.txt")) ? readFileSync(path.join(OUT, "robots.txt"), "utf8") : "";
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("/robots.txt", "sitemap の場所が書かれていない");
if (/^Disallow:\s*\/\s*$/m.test(robots)) fail("/robots.txt", "サイト全体のクロールを禁止している");

const notFound = path.join(OUT, "404.html");
if (!existsSync(notFound)) fail("/404", "404.html がない");
else if (!/noindex/.test(meta(readFileSync(notFound, "utf8"), "robots") ?? "")) fail("/404", "noindex になっていない");

// ───────── 結果 ─────────
if (errors.length) {
  console.error(`サイト検査: ${errors.length} 件の問題(${pages.length} ページを検査)`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`サイト検査: 問題なし(${pages.length} ページ・sitemap ${locs.size} 件)`);
