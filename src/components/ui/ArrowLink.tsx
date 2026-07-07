import Link from "next/link";

type Props = {
  href: string;
  children: string;
  external?: boolean;
  className?: string;
};

/**
 * 本文中の誘導リンク。
 * 下線を常時表示し、hover前から「押せる場所」だと分かるようにする
 */
export function ArrowLink({ href, children, external = false, className = "" }: Props) {
  const cls = `group inline-flex items-center gap-2 font-sans text-[13px] tracking-[0.14em] text-rose underline decoration-rose/40 underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-ink/40 ${className}`;
  const arrow = (
    <span
      aria-hidden="true"
      className="inline-block transition-transform duration-300 group-hover:translate-x-1"
    >
      →
    </span>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        {arrow}
        <span className="sr-only">(外部サイトが開きます)</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  );
}
