import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { LinkButton } from "@/components/ui/LinkButton";
import { CtaBand } from "@/components/features/CtaBand";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "COLLECTION 作品のこと",
  description:
    "透明感のあるガラスやレジン、肌になじむゴールド、とじこめた季節の花。ikyuのハンドメイドアクセサリーの世界をご紹介します。作品のお迎えはminneにて。",
  alternates: { canonical: "/collection" },
  openGraph: {
    title: "COLLECTION 作品のこと | ikyu",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
};

/**
 * 作品ギャラリー。文章は写真の余韻に一行だけ添える(写真が主役)。
 * 耳元の着用カットが撮影でき次第、この配列に1枠追加する。
 */
const works = [
  {
    src: "/images/product-hoops.webp",
    alt: "白いサテンの上に並ぶ、金の花びらのフープピアス2組。花芯には押し花をとじこめた透明な球",
    caption: "金の光を、まとう",
  },
  {
    src: "/images/product-cluster.webp",
    alt: "グレージュの背景の中、アクリルスタンドで揺れる透明ビーズのクラスターピアス",
    caption: "透明を、かさねる",
  },
  {
    src: "/images/product-ring.webp",
    alt: "白いシアーな袖の手元。押し花をとじこめたレジンと細いゴールドのリングに、窓からの光の筋が差す",
    caption: "指先にも、花をひとつ",
  },
  {
    src: "/images/product-blooms.webp",
    alt: "白い陶器のトレイの上、ブランドカードに留められた小さな白いかすみ草のスタッドピアス",
    caption: "季節を、とじこめる",
  },
  {
    src: "/images/product-bangles.webp",
    alt: "ヴィンテージのガラスの器に掛かる2本のバングル。ゴールドのツイストと、押し花をとじこめた透明なレジン",
    caption: "暮らしの景色になじむ",
  },
  {
    src: "/images/wear-necklace.webp",
    alt: "白いキャミソールとブラウンのカーディガンの首もとに、華奢なゴールドのチョーカー",
    caption: "いつもの装いのそばに",
  },
] as const;

const categories = [
  "ピアス / イヤリング",
  "ネックレス",
  "リング",
  "バングル / ブレスレット",
] as const;

export default function CollectionPage() {
  return (
    <>
      <Section space="compact" className="pb-0 md:pb-0">
        <Container width="narrow">
          <Eyebrow>Collection</Eyebrow>
          <Heading as="h1" className="mt-4">
            作品のこと
          </Heading>
          <p className="mt-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
            ひとつずつ手しごとでうまれる作品は、同じものがふたつとありません。
            その日の装いに、ちいさな華やぎを添える一点ものたちです。
          </p>
        </Container>
        {/* 主役の1枚:作品を「もの」ではなく「手から手へ」の気配で見せる */}
        <Container className="mt-14 md:mt-20">
          <div className="relative mx-auto aspect-[2137/2256] w-full max-w-[640px]">
            <Image
              src="/images/collection-hands.webp"
              alt="ゴールドのチューリップと、すずらんのように連なる白い小花のロングピアスを、指先でそっと掲げた手元"
              fill
              priority
              sizes="(min-width: 720px) 640px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </Section>

      {/* 作品ギャラリー:写真が主役。言葉はキャプション一行に退く */}
      <Section aria-labelledby="works-heading">
        <Container>
          <h2 id="works-heading" className="sr-only">
            作品のいろいろ
          </h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-10 md:gap-y-14">
            {works.map((work) => (
              <figure key={work.src}>
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={work.src}
                    alt={work.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-4 text-center text-[13px] tracking-[0.1em] text-ink-soft">
                  {work.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      {/* アイテムとお迎えの案内 */}
      <Section tone="soft" aria-labelledby="items-heading">
        <Container width="narrow">
          <Eyebrow>Items</Eyebrow>
          <Heading as="h2" id="items-heading" className="mt-4">
            主なアイテム
          </Heading>
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {categories.map((c) => (
              <li key={c} className="py-5 text-[15px] tracking-[0.06em]">
                {c}
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <p className="text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
              作品のお迎えは、minneのギャラリーからどうぞ。
              一点ものが多いため、出会いはいつも一期一会です。
              新作のお知らせは、Instagramがいちばん早くお届けできます。
            </p>
            <div className="mt-8 flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8">
              <LinkButton href={site.minne.url} external>
                minneで作品を見る
              </LinkButton>
              <LinkButton href={site.instagram.url} external variant="line">
                Instagramで新作を見る
              </LinkButton>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        tone="base"
        eyebrow="Story"
        title="一輪が作品になるまでのこと。"
        body="花屋さんで選んだ生花を乾かし、いちばん表情のいい瞬間をとじこめる。その手しごとと、つくり手のことをご紹介しています。"
        links={[{ href: "/about", label: "ikyuとつくり手のこと" }]}
      />
    </>
  );
}
