"use client";

import { track } from "@vercel/analytics";

type Props = {
  href: string;
  /** 計測イベントで商品を区別するための識別子 */
  item: string;
};

/**
 * STORESの商品個別ページへ遷移する購入ボタン。
 * 見た目は LinkButton(solid) と同一に保つ(新しいデザイン言語を持ち込まない)。
 * クリック時に Vercel Analytics のカスタムイベント `buy_click` を送信し、
 * どの商品のボタンが押されたかを item プロパティで区別する。
 */
export function BuyButton({ href, item }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("buy_click", { item })}
      className="inline-block bg-ink px-10 py-4 font-sans text-[13px] tracking-[0.16em] text-base transition-colors duration-300 hover:bg-rose"
    >
      STORESで購入する
      <span aria-hidden="true" className="ml-2">
        ↗
      </span>
      <span className="sr-only">(外部サイトが開きます)</span>
    </a>
  );
}
