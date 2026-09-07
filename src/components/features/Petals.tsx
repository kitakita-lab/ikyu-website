"use client";

import { useEffect, useRef, useState } from "react";

/**
 * ファーストビューに、数枚の花びらがときどき風に運ばれるように漂う演出。
 *
 * - CSSアニメーションのみ(transform / opacity)。依存パッケージなし
 * - 装飾なので aria-hidden、pointer-events: none(クリック・スクロールを妨げない)
 * - 画面外・非表示タブ・prefers-reduced-motion では停止/非表示
 * - 右下に小さな停止/再開ボタン
 *
 * 調整はすべて PETAL_CONFIG で行う(枚数・速度・大きさ・色)。
 */
export const PETAL_CONFIG = {
  /** 同時に存在する花びらの枚数 */
  count: { desktop: 4, mobile: 3 },
  /** 出現する横位置の範囲(%)。PCは写真のない左側の余白を中心に */
  spawnX: { desktop: [4, 46], mobile: [4, 96] },
  /** 1枚が現れてから消えるまでの秒数(この範囲でランダム) */
  travelSec: { min: 9, max: 15 },
  /** 消えてから次に現れるまでの「間」の秒数 */
  restSec: { min: 4, max: 10 },
  /** 花びらの幅(px)。高さは自動で約1.6倍 */
  sizePx: { min: 10, max: 17 },
  /** 色はサイトのパレットから(ロゼ淡・生成りピンク・砂・くすみ紫) */
  colors: ["#b08a8f", "#cdb4b6", "#e2cfbf", "#b6a5b3"],
  /** 不透明度の上限(文字・写真の視認性を優先し控えめに) */
  opacity: 0.6,
} as const;

/** 花びらの形(3種)。viewBox 20x32 の縦長の花弁 */
const SHAPES = [
  "M10 0 C16 7 17 18 10 32 C3 18 4 7 10 0Z",
  "M9 0 C17 6 18 19 11 32 C2 20 2 8 9 0Z",
  "M10 0 C18 8 18 22 10 32 C2 22 2 8 10 0Z",
];

type Petal = {
  id: number;
  left: number; // %
  delay: number; // s
  travel: number; // s
  rest: number; // s
  size: number; // px
  driftX: number; // px(斜めに流れる量)
  swaySec: number; // 揺れの周期
  spinSec: number; // 回転の周期
  spinDir: 1 | -1;
  tilt: number; // deg 初期の向き
  color: string;
  shape: string;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

function makePetals(count: number, spawnX: readonly [number, number]): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: rand(spawnX[0], spawnX[1]),
    delay: rand(0, 8),
    travel: rand(PETAL_CONFIG.travelSec.min, PETAL_CONFIG.travelSec.max),
    rest: rand(PETAL_CONFIG.restSec.min, PETAL_CONFIG.restSec.max),
    size: rand(PETAL_CONFIG.sizePx.min, PETAL_CONFIG.sizePx.max),
    driftX: rand(-90, 90),
    swaySec: rand(2.6, 4.2),
    spinSec: rand(5, 9),
    spinDir: Math.random() > 0.5 ? 1 : -1,
    tilt: rand(-40, 40),
    color: pick(PETAL_CONFIG.colors),
    shape: pick(SHAPES),
  }));
}

export function Petals() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [petals, setPetals] = useState<Petal[] | null>(null);
  const [userPaused, setUserPaused] = useState(false);
  const [autoPaused, setAutoPaused] = useState(false);

  // 初期化はクライアントのみ(ランダム値による SSR 不一致を避ける)。
  // reduced-motion の環境では何も描画しない
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    // 描画後の次フレームで生成(初回描画を妨げない)
    const id = requestAnimationFrame(() =>
      setPetals(
        desktop
          ? makePetals(PETAL_CONFIG.count.desktop, PETAL_CONFIG.spawnX.desktop)
          : makePetals(PETAL_CONFIG.count.mobile, PETAL_CONFIG.spawnX.mobile),
      ),
    );
    return () => cancelAnimationFrame(id);
  }, []);

  // 画面外・非表示タブでは止める(無駄な描画を避ける)
  useEffect(() => {
    const el = rootRef.current;
    if (!el || !petals) return;
    let inView = true;
    const sync = () => setAutoPaused(document.hidden || !inView);
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    io.observe(el);
    document.addEventListener("visibilitychange", sync);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, [petals]);

  if (!petals) return null;
  const paused = userPaused || autoPaused;

  return (
    <>
      <div
        ref={rootRef}
        aria-hidden="true"
        className={`petals pointer-events-none absolute inset-0 z-10 overflow-hidden ${
          paused ? "petals--paused" : ""
        }`}
      >
        {petals.map((p) => {
          const total = p.travel + p.rest;
          // 「消えたまま待つ」区間の割合を keyframe に渡す
          const visibleEnd = Math.round((p.travel / total) * 100);
          return (
            <div
              key={p.id}
              className="petal"
              style={
                {
                  left: `${p.left}%`,
                  width: p.size,
                  height: p.size * 1.6,
                  "--petal-drift": `${p.driftX}px`,
                  "--petal-visible-end": `${visibleEnd}%`,
                  "--petal-opacity": PETAL_CONFIG.opacity,
                  animationDuration: `${total}s`,
                  animationDelay: `${p.delay}s`,
                } as React.CSSProperties
              }
            >
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
          );
        })}
      </div>

      {/* 停止/再開。世界観を邪魔しない小さなテキストボタン */}
      <button
        type="button"
        onClick={() => setUserPaused((v) => !v)}
        aria-pressed={userPaused}
        aria-label={userPaused ? "花びらの演出を再開する" : "花びらの演出を止める"}
        className="absolute right-5 bottom-3 z-30 flex h-11 items-center gap-1.5 px-2 font-sans text-[11px] tracking-[0.16em] text-ink-soft transition-colors duration-300 hover:text-rose md:right-8 md:bottom-4"
      >
        <span aria-hidden="true" className="text-[13px] leading-none">
          {userPaused ? "◌" : "✿"}
        </span>
        {userPaused ? "花びらを流す" : "花びらを止める"}
      </button>
    </>
  );
}
