import { getImageProps } from "next/image";

type Source = {
  src: string;
  width: number;
  height: number;
};

type Props = {
  alt: string;
  /** モバイル(〜639px)用。ファイル自体を4:5等に切り出したものを渡す */
  mobile: Source;
  /** 640px以上用 */
  desktop: Source;
};

/**
 * ページ冒頭のフルブリード写真。
 * ブレークポイントごとに実比率の異なるファイルを出し分ける(アートディレクション)。
 * 表示比率とファイル比率を一致させることで、CLSゼロと画質の両立を図る。
 */
export function HeroImage({ alt, mobile, desktop }: Props) {
  const common = { alt, sizes: "100vw" };
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({ ...common, ...desktop });
  // priority: ヒーローはLCP要素なので eager + fetchpriority=high で先読みさせる
  const { props: imgProps } = getImageProps({
    ...common,
    ...mobile,
    priority: true,
  });

  const mobileRatio = `${mobile.width} / ${mobile.height}`;
  const desktopRatio = `${desktop.width} / ${desktop.height}`;

  return (
    <picture>
      <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- alt は imgProps に含まれる */}
      <img
        {...imgProps}
        className="block h-auto w-full object-cover [aspect-ratio:var(--hero-m)] sm:[aspect-ratio:var(--hero-d)]"
        style={
          {
            "--hero-m": mobileRatio,
            "--hero-d": desktopRatio,
          } as React.CSSProperties
        }
      />
    </picture>
  );
}
