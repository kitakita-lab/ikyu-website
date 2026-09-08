"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ファーストビューに、少数の花びらがゆっくり風に運ばれ、ときどき舞い続ける演出。
 *
 * - 「間隔を空けて1枚ずつ現れる」方式。一斉出現・一斉消滅はしない
 * - 1枚は 14〜22 秒かけて斜めに漂い、途中で薄れて消える(消えた要素は取り除く)
 * - 同時表示の上限あり。ときどき長めの「花びらのない間」も入れる
 * - ヒーローが画面外・タブが非表示の間は、出現を止め、漂っている花びらも
 *   その場で静止(戻ったときに一斉発生や高速の追いつきは起きない)
 * - CSSアニメーション(transform / opacity)のみ。依存パッケージなし
 * - 装飾なので aria-hidden、pointer-events: none
 * - prefers-reduced-motion では描画しない
 *
 * 調整は PETAL_CONFIG で行う(枚数・間隔・速度・大きさ・色)。
 */
export const PETAL_CONFIG = {
  /**
   * 同時に表示する上限。
   * スマホは1枚の滞在時間が長い(落下距離が長い)ため、間隔を詰めると上限3では
   * 出現の約2割が捨てられて見た目が変わらない。そのため4にしている(PCは4で足りる)
   */
  maxConcurrent: { desktop: 4, mobile: 4 },
  /** 次の1枚が現れるまでの間隔(秒)。この範囲でランダム(以前は 6〜12) */
  gapSec: { min: 4.5, max: 9 },
  /** ときどき入れる長めの間(秒)と、その確率(以前は 14〜22 秒・30%) */
  restSec: { min: 11, max: 17 },
  restChance: 0.2,
  /** 初回表示:最初の1枚が現れるまでの秒数(ページを開いた直後だけ) */
  firstDelaySec: 0.15,
  /** 初回表示:2枚目が現れるまでの秒数(最初の1枚から) */
  secondGapSec: { min: 3, max: 5 },
  /** 漂う速さ(ビューポート高さ%/秒)。距離が変わっても速度はこの範囲に保つ */
  speedVhPerSec: { min: 2.2, max: 3.0 },
  /** 漂う縦距離(ビューポート高さに対する%)。スマホは写真の上を通過できる長さに */
  fallVh: { desktop: [40, 56], mobile: [56, 74] },
  /** 出現する横位置の範囲(%)。作品の中央を避け、余白・写真の背景側から */
  spawnX: {
    desktop: [[4, 58]],
    mobile: [
      [4, 28],
      [72, 96],
    ],
  },
  /** 花びらの幅(px)。高さは自動で約1.6倍 */
  sizePx: { min: 10, max: 17 },
  /** 色はサイトのパレットから(ロゼ淡・生成りピンク・砂・くすみ紫) */
  colors: ["#b08a8f", "#cdb4b6", "#e2cfbf", "#b6a5b3"],
  /** 不透明度の上限(作品より目立たせない) */
  opacity: 0.55,
} as const;

/** 花びらの形(3種)。viewBox 20x32 の縦長の花弁 */
const SHAPES = [
  "M10 0 C16 7 17 18 10 32 C3 18 4 7 10 0Z",
  "M9 0 C17 6 18 19 11 32 C2 20 2 8 9 0Z",
  "M10 0 C18 8 18 22 10 32 C2 22 2 8 10 0Z",
];

type Petal = {
  id: number;
  left: number;
  travel: number;
  fallVh: number;
  size: number;
  driftX: number;
  swaySec: number;
  spinSec: number;
  spinDir: 1 | -1;
  tilt: number;
  color: string;
  shape: string;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(arr: readonly T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

function makePetal(
  id: number,
  spawnX: readonly (readonly [number, number])[],
  fall: readonly [number, number],
): Petal {
  const band = pick(spawnX);
  const fallVh = rand(fall[0], fall[1]);
  // 速度を一定範囲に保つため、距離から所要時間を決める(距離が長いほど時間も長い)
  const travel =
    fallVh /
    rand(PETAL_CONFIG.speedVhPerSec.min, PETAL_CONFIG.speedVhPerSec.max);
  return {
    id,
    left: rand(band[0], band[1]),
    travel,
    fallVh,
    size: rand(PETAL_CONFIG.sizePx.min, PETAL_CONFIG.sizePx.max),
    driftX: rand(40, 110) * (Math.random() > 0.5 ? 1 : -1),
    swaySec: rand(3.2, 4.8),
    spinSec: rand(7, 11),
    spinDir: Math.random() > 0.5 ? 1 : -1,
    tilt: rand(-40, 40),
    color: pick(PETAL_CONFIG.colors),
    shape: pick(SHAPES),
  };
}

export function Petals() {
  const rootRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const [enabled, setEnabled] = useState(false); // reduced-motion でなければ true
  const [desktop, setDesktop] = useState(false);
  const [active, setActive] = useState(false); // ヒーローが見えていて、タブも表示中
  const [petals, setPetals] = useState<Petal[]>([]);

  // 初期化はクライアントのみ。reduced-motion では何もしない
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const raf = requestAnimationFrame(() => {
      setDesktop(window.matchMedia("(min-width: 768px)").matches);
      setEnabled(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // 画面外・非表示タブでは止める
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !enabled) return;
    let inView = false;
    const sync = () => setActive(inView && !document.hidden);
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0.1 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [enabled]);

  // 出現のスケジューラ:active の間だけ、間隔を空けて1枚ずつ足す
  useEffect(() => {
    if (!active) return;
    const max = desktop
      ? PETAL_CONFIG.maxConcurrent.desktop
      : PETAL_CONFIG.maxConcurrent.mobile;
    const spawnX = desktop
      ? PETAL_CONFIG.spawnX.desktop
      : PETAL_CONFIG.spawnX.mobile;
    const fall = desktop
      ? PETAL_CONFIG.fallVh.desktop
      : PETAL_CONFIG.fallVh.mobile;
    let timer = 0;
    const nextGap = () =>
      Math.random() < PETAL_CONFIG.restChance
        ? rand(PETAL_CONFIG.restSec.min, PETAL_CONFIG.restSec.max)
        : rand(PETAL_CONFIG.gapSec.min, PETAL_CONFIG.gapSec.max);
    const schedule = (sec: number) => {
      timer = window.setTimeout(() => {
        const id = nextId.current++;
        setPetals((prev) =>
          prev.length >= max ? prev : [...prev, makePetal(id, spawnX, fall)],
        );
        // 初回表示の2枚目だけ早め(3〜5秒)。以降は通常の間隔
        schedule(
          id === 0
            ? rand(PETAL_CONFIG.secondGapSec.min, PETAL_CONFIG.secondGapSec.max)
            : nextGap(),
        );
      }, sec * 1000);
    };
    // ページを開いた直後だけ素早く1枚目を出す。
    // 画面外・非表示タブから戻ったときは通常の間隔から始める(一斉発生しない)
    schedule(nextId.current === 0 ? PETAL_CONFIG.firstDelaySec : nextGap());
    return () => window.clearTimeout(timer);
  }, [active, desktop]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className={`petals pointer-events-none absolute inset-0 z-10 overflow-hidden ${
        active ? "" : "petals--paused"
      }`}
    >
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size * 1.6,
              "--petal-drift": `${p.driftX}px`,
              "--petal-fall": `${p.fallVh}vh`,
              "--petal-opacity": PETAL_CONFIG.opacity,
              animationDuration: `${p.travel}s`,
            } as React.CSSProperties
          }
          onAnimationEnd={(e) => {
            // 漂い終えた花びらだけを取り除く(揺れ・回転は無限なので end は来ない)
            if (e.animationName === "petal-drift") {
              setPetals((prev) => prev.filter((q) => q.id !== p.id));
            }
          }}
        >
          {/* 現れ方は移動時間と切り離し、常に短い(0.7秒)フェードインにする */}
          <div className="petal__fade">
            <div
              className="petal__sway"
              style={{ animationDuration: `${p.swaySec}s` }}
            >
              <svg
                viewBox="0 0 20 32"
                className="petal__spin block h-full w-full"
                style={{
                  animationDuration: `${p.spinSec}s`,
                  animationDirection: p.spinDir === 1 ? "normal" : "reverse",
                  rotate: `${p.tilt}deg`,
                }}
              >
                <path d={p.shape} fill={p.color} />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
