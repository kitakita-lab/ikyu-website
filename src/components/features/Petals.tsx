"use client";

import { useEffect, useState } from "react";

/**
 * ファーストビューに、数枚の花びらが一度だけふわっと流れて消える演出。
 *
 * - 初回表示で始まり、5秒以内にすべて消えて自然に終わる(ループしない)
 * - 終了後は要素ごと取り除く(スクロールで出入りしても再生しない)
 * - CSSアニメーションのみ(transform / opacity)。依存パッケージなし
 * - 装飾なので aria-hidden、pointer-events: none
 * - prefers-reduced-motion では描画しない
 *
 * 調整は PETAL_CONFIG で行う(枚数・速度・大きさ・色)。
 */
export const PETAL_CONFIG = {
  /** 流れる花びらの枚数 */
  count: { desktop: 5, mobile: 4 },
  /** 出現する横位置の範囲(%)。PCは写真のない左側の余白を中心に */
  spawnX: { desktop: [4, 46], mobile: [6, 94] },
  /** 現れてから消えるまでの秒数(この範囲でランダム) */
  travelSec: { min: 3.0, max: 3.8 },
  /** 出現のずらし(秒)。travel と合わせて 5 秒以内に収める */
  maxDelaySec: 1.1,
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
  delay: number;
  travel: number;
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
const pick = <T,>(arr: readonly T[]) => arr[Math.floor(Math.random() * arr.length)];

function makePetals(count: number, spawnX: readonly [number, number]): Petal[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: rand(spawnX[0], spawnX[1]),
    delay: rand(0, PETAL_CONFIG.maxDelaySec),
    travel: rand(PETAL_CONFIG.travelSec.min, PETAL_CONFIG.travelSec.max),
    size: rand(PETAL_CONFIG.sizePx.min, PETAL_CONFIG.sizePx.max),
    driftX: rand(-70, 70),
    swaySec: rand(2.2, 3.4),
    spinSec: rand(3.5, 5.5),
    spinDir: Math.random() > 0.5 ? 1 : -1,
    tilt: rand(-40, 40),
    color: pick(PETAL_CONFIG.colors),
    shape: pick(SHAPES),
  }));
}

export function Petals() {
  const [petals, setPetals] = useState<Petal[] | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const desktop = window.matchMedia("(min-width: 768px)").matches;
    // 描画後の次フレームで生成(初回描画を妨げない)
    const raf = requestAnimationFrame(() =>
      setPetals(
        desktop
          ? makePetals(PETAL_CONFIG.count.desktop, PETAL_CONFIG.spawnX.desktop)
          : makePetals(PETAL_CONFIG.count.mobile, PETAL_CONFIG.spawnX.mobile),
      ),
    );
    // 最長 (maxDelay + travel.max) 秒で全て消えるので、その後に要素を取り除く
    const doneMs = (PETAL_CONFIG.maxDelaySec + PETAL_CONFIG.travelSec.max) * 1000 + 200;
    const timer = window.setTimeout(() => setPetals(null), doneMs);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
    };
  }, []);

  if (!petals) return null;

  return (
    <div
      aria-hidden="true"
      className="petals pointer-events-none absolute inset-0 z-10 overflow-hidden"
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
              "--petal-opacity": PETAL_CONFIG.opacity,
              animationDuration: `${p.travel}s`,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties
          }
        >
          <div className="petal__sway" style={{ animationDuration: `${p.swaySec}s` }}>
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
      ))}
    </div>
  );
}
