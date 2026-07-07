import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  /** ページに1回だけ使う「見せ場」用の大きな階調 */
  display?: boolean;
  id?: string;
  className?: string;
};

/**
 * 見出しは控えめなサイズ+広い余白で品位を出す。
 * サイズ階層はここで固定し、ページ間の不揃いを防ぐ。
 * 本文(行間2.0台)に対して見出しは行間を詰め、余白の中で「立てる」。
 */
export function Heading({
  children,
  as: Tag = "h2",
  display = false,
  id,
  className = "",
}: Props) {
  const size = display
    ? "text-[22px] leading-[1.6] md:text-[32px]"
    : Tag === "h1"
      ? "text-[24px] leading-[1.6] md:text-[34px]"
      : Tag === "h2"
        ? "text-[19px] leading-[1.7] md:text-[25px]"
        : "text-[16px] leading-[1.8] md:text-[18px]";
  return (
    <Tag id={id} className={`font-normal tracking-[0.06em] ${size} ${className}`}>
      {children}
    </Tag>
  );
}
