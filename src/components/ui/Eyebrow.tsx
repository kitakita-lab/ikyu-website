type Props = {
  children: string;
  id?: string;
};

/** セクション冒頭の英字ラベル(視線の起点をつくる) */
export function Eyebrow({ children, id }: Props) {
  return (
    <p
      id={id}
      className="font-display text-[13px] uppercase tracking-[0.28em] text-rose"
    >
      {children}
    </p>
  );
}
