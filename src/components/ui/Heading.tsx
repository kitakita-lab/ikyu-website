import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3";
  id?: string;
  className?: string;
};

/**
 * 見出しは控えめなサイズ+広い余白で品位を出す。
 * サイズ階層はここで固定し、ページ間の不揃いを防ぐ。
 */
export function Heading({ children, as: Tag = "h2", id, className = "" }: Props) {
  const size =
    Tag === "h1"
      ? "text-[27px] leading-[1.8] md:text-[38px]"
      : Tag === "h2"
        ? "text-[22px] leading-[1.9] md:text-[28px]"
        : "text-[18px] leading-[1.9] md:text-[20px]";
  return (
    <Tag id={id} className={`font-normal tracking-[0.06em] ${size} ${className}`}>
      {children}
    </Tag>
  );
}
