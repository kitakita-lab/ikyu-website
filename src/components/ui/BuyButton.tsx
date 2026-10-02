"use client";

type Props = {
  href: string;
  /** 計測イベントで商品を区別するための識別子 */
  item: string;
};

/**
 * STORESの商品個別ページへ遷移する購入ボタン。
 * 見た目は LinkButton(solid) と同一に保つ(新しいデザイン言語を持ち込まない)。
 * item は計測用の商品識別子(現在は未使用。計測ツール導入時にイベント送信へ使う)。
 */
export function BuyButton({ href, item }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-item={item}
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
