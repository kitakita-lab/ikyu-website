import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  /** solid はページに1〜2個まで。第二の選択肢は line を使う */
  variant?: "solid" | "line";
  external?: boolean;
  className?: string;
};

export function LinkButton({
  href,
  children,
  variant = "solid",
  external = false,
  className = "",
}: Props) {
  const base =
    "inline-block font-sans text-[13px] tracking-[0.16em] transition-colors duration-300";
  const style =
    variant === "solid"
      ? "bg-ink px-10 py-4 text-base hover:bg-rose"
      : "border-b border-ink/50 pb-1.5 text-ink hover:border-rose hover:text-rose";
  const cls = `${base} ${style} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <span aria-hidden="true" className="ml-2">
          ↗
        </span>
        <span className="sr-only">(外部サイトが開きます)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
