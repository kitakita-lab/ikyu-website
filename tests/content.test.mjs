// コンテンツデータ(src/content/*.ts)の整合性テスト。
// 手で更新するデータのうち、間違えても画面では気づきにくく、機械なら確実に判定できるものだけを確認する。
// 実行: npm test(Node 22.18 以上。.ts の読み込みに Node の型除去機能を使う)
import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const { upcomingEvent, news } = await import("../src/content/news.ts");
const { products } = await import("../src/content/products.ts");
const { events } = await import("../src/content/events.ts");
const { site } = await import("../src/content/site.ts");

const PUBLIC = path.resolve(import.meta.dirname, "../public");
const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isValidIsoDate(s) {
  if (!ISO_DATE.test(s)) return false;
  const [y, m, d] = s.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return dt.getUTCFullYear() === y && dt.getUTCMonth() === m - 1 && dt.getUTCDate() === d;
}

/**
 * 「2026年11月22日(日)・23日(月・祝)」のような表記の曜日が、実際の日付と合っているかを調べる。
 * 年・月は直前に書かれたものを引き継ぐ(書かれていなければ defaultYear を使う)。
 * 戻り値は問題の一覧(空なら問題なし)。
 */
export function weekdayProblems(text, defaultYear) {
  const problems = [];
  const re = /(?:(\d{4})年)?(?:(\d{1,2})月)?(\d{1,2})日\s*[(（]([日月火水木金土])/g;
  let year = defaultYear;
  let month;
  for (const m of text.matchAll(re)) {
    if (m[1]) year = Number(m[1]);
    if (m[2]) month = Number(m[2]);
    const day = Number(m[3]);
    if (!year || !month) {
      problems.push(`「${m[0]}」の年または月が分からない`);
      continue;
    }
    const dt = new Date(Date.UTC(year, month - 1, day));
    if (dt.getUTCMonth() !== month - 1) {
      problems.push(`${year}年${month}月${day}日は存在しない`);
      continue;
    }
    const actual = WEEKDAYS[dt.getUTCDay()];
    if (actual !== m[4]) problems.push(`${year}年${month}月${day}日は(${actual})だが(${m[4]})と書かれている`);
  }
  return problems;
}

test("曜日チェック自体が正しく動く", () => {
  assert.deepEqual(weekdayProblems("2026年11月22日(日)・23日(月・祝)"), []);
  assert.equal(weekdayProblems("2026年11月22日(月)").length, 1);
  assert.equal(weekdayProblems("11月23日(月)のみ").length, 1, "年が分からない表記は問題として扱う");
  assert.deepEqual(weekdayProblems("11月23日(月)のみ", 2026), []);
  assert.equal(weekdayProblems("2026年2月30日(月)").length, 1);
});

test("次の出店(upcomingEvent):日付と表記が一致している", { skip: !upcomingEvent }, () => {
  const ev = upcomingEvent;
  assert.ok(isValidIsoDate(ev.exhibitDate), `exhibitDate が日付として正しくない: ${ev.exhibitDate}`);
  const year = Number(ev.exhibitDate.slice(0, 4));
  const [, sm, sd] = ev.exhibitDate.split("-").map(Number);
  assert.ok(ev.exhibitDateText.includes(`${sm}月${sd}日`), `exhibitDateText に初日(${sm}月${sd}日)が書かれていない`);
  if (ev.exhibitEndDate) {
    assert.ok(isValidIsoDate(ev.exhibitEndDate), `exhibitEndDate が日付として正しくない: ${ev.exhibitEndDate}`);
    assert.ok(ev.exhibitEndDate > ev.exhibitDate, "exhibitEndDate が exhibitDate より後になっていない");
    const [, em, ed] = ev.exhibitEndDate.split("-").map(Number);
    const endText = em === sm ? `${ed}日` : `${em}月${ed}日`;
    assert.ok(ev.exhibitDateText.includes(endText), `exhibitDateText に最終日(${endText})が書かれていない`);
  }
  assert.deepEqual(weekdayProblems(ev.exhibitDateText, year), [], "exhibitDateText の曜日");
  assert.deepEqual(weekdayProblems(ev.eventDateText, year), [], "eventDateText の曜日");
});

test("イベント実績(events):曜日・slug・写真", async () => {
  const slugs = new Set();
  for (const ev of events) {
    assert.match(ev.slug, SLUG, `slug の形式: ${ev.slug}`);
    assert.ok(!slugs.has(ev.slug), `slug が重複: ${ev.slug}`);
    slugs.add(ev.slug);
    assert.deepEqual(weekdayProblems(ev.dateText), [], `${ev.slug} の dateText の曜日`);
    for (const ph of ev.photos) {
      const file = path.join(PUBLIC, ph.src);
      assert.ok(existsSync(file), `${ev.slug}: 写真がない ${ph.src}`);
      assert.ok(ph.alt.trim().length > 0, `${ev.slug}: ${ph.src} の alt が空`);
      // width/height は表示枠の縦横比に使われる。実画像と比率がずれると写真が歪む・切れる
      const meta = await sharp(file).metadata();
      const declared = ph.width / ph.height;
      const actual = meta.width / meta.height;
      assert.ok(
        Math.abs(declared / actual - 1) < 0.01,
        `${ev.slug}: ${ph.src} の width/height(${ph.width}x${ph.height})が実画像(${meta.width}x${meta.height})と比率が合わない`,
      );
    }
  }
});

test("お知らせ(news):slug・日付・イベント構造化データ用の日時", () => {
  const slugs = new Set();
  for (const post of news) {
    assert.match(post.slug, SLUG, `slug の形式: ${post.slug}`);
    assert.ok(!slugs.has(post.slug), `slug が重複: ${post.slug}`);
    slugs.add(post.slug);
    assert.ok(isValidIsoDate(post.date), `${post.slug}: date が日付として正しくない ${post.date}`);
    assert.ok(post.title.trim() && post.body.length > 0, `${post.slug}: タイトルか本文が空`);
    if (post.event) {
      const s = Date.parse(post.event.startDate);
      const e = Date.parse(post.event.endDate);
      assert.ok(!Number.isNaN(s) && !Number.isNaN(e), `${post.slug}: event の日時を解釈できない`);
      assert.ok(e >= s, `${post.slug}: event の終了が開始より前`);
    }
  }
});

test("作品(products):slug・価格・写真・購入先URL", () => {
  const slugs = new Set();
  for (const p of products) {
    assert.match(p.slug, SLUG, `slug の形式: ${p.slug}`);
    assert.ok(!slugs.has(p.slug), `slug が重複: ${p.slug}`);
    slugs.add(p.slug);
    assert.ok(Number.isInteger(p.price) && p.price > 0, `${p.slug}: 価格が正の整数でない`);
    assert.ok(p.images.length > 0, `${p.slug}: 写真が1枚もない`);
    for (const img of p.images) {
      assert.ok(existsSync(path.join(PUBLIC, img.src)), `${p.slug}: 写真がない ${img.src}`);
      assert.ok(img.alt.trim().length > 0, `${p.slug}: ${img.src} の alt が空`);
    }
    if (p.minneUrl !== undefined) {
      assert.match(p.minneUrl, /^https:\/\/minne\.com\/\S+$/, `${p.slug}: minneUrl が minne の URL ではない`);
    }
  }
});

test("サイト基本情報(site):URL の形式", () => {
  assert.match(site.url, /^https:\/\/[^/]+$/, "site.url は https で始まり、末尾にスラッシュを付けない");
  for (const url of [site.instagram.url, site.instagram.dmUrl, site.minne.url]) {
    assert.match(url, /^https:\/\//, `外部URLが https ではない: ${url}`);
  }
});

test("コンテンツに仮の値が残っていない", () => {
  const all = JSON.stringify({ upcomingEvent, news, products, events, site });
  // 過去に本番へ出た仮URL(https://ikyu.stores.jp/items/XXXXXXXXXXXX)のような値を検出する
  for (const [label, re] of [
    ["XXXX のような仮の文字列", /X{4,}/],
    ["example.com", /example\.(com|jp)/],
    ["localhost", /localhost/],
    ["lorem ipsum", /lorem ipsum/i],
  ]) {
    assert.doesNotMatch(all, re, `${label} が残っている`);
  }
});
