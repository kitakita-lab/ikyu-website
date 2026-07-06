import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** soft = 淡い砂色の面で静かに区切る(罫線や影は使わない) */
  tone?: "base" | "soft";
  /** 余白はここで一元管理。ページ側での恣意的な指定を避ける */
  space?: "default" | "compact";
  className?: string;
  "aria-labelledby"?: string;
};

export function Section({
  children,
  tone = "base",
  space = "default",
  className = "",
  ...rest
}: Props) {
  const bg = tone === "soft" ? "bg-base-soft" : "";
  const py = space === "compact" ? "py-16 md:py-24" : "py-24 md:py-36";
  return (
    <section className={`${bg} ${py} ${className}`} {...rest}>
      {children}
    </section>
  );
}
