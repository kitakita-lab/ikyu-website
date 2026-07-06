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

const highlights = [
  {
    title: "透明を、かさねる",
    body: "ガラスやレジンの粒が、光をすくいあげてやわらかくきらめく。派手ではないのに、ふと目をひく透明感。ikyuの作品のいちばんの持ち味です。",
  },
  {
    title: "金の光を、まとう",
    body: "肌になじむ細いゴールドのライン。カジュアルな装いにも、きれいめの日にも。毎日そばに置きたくなる、ちょうどいい輝きを選んでいます。",
  },
  {
    title: "季節を、とじこめる",
    body: "生花から育てたドライフラワーを、いちばん美しい姿のままレジンの中へ。その季節、その一輪だけの色が、あなたの毎日に寄り添います。",
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
        {/* 作品写真は全幅で引き伸ばさず、余白の中に「一皿」として置く */}
        <Container className="mt-14 md:mt-20">
          <div className="relative mx-auto aspect-[1600/1000] w-full max-w-[720px]">
            <Image
              src="/images/flatlay-still.webp"
              alt="白い布の上に並ぶikyuの作品。ゴールドのスネークチェーンネックレス、バングル、虹色の透明ビーズのイヤリング、刺繍レースのカフ"
              fill
              priority
              sizes="(min-width: 800px) 720px, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </Section>

      {/* 作品の3つの持ち味 */}
      <Section aria-labelledby="highlights-heading">
        <Container>
          <h2 id="highlights-heading" className="sr-only">
            ikyuの作品の持ち味
          </h2>
          <div className="grid gap-14 md:grid-cols-3 md:gap-10">
            {highlights.map((item, i) => (
              <div key={item.title}>
                <p
                  aria-hidden="true"
                  className="font-display text-[15px] tracking-[0.24em] text-rose"
                >
                  {String(i + 1).padStart(2, "0")}
                </p>
                <Heading as="h3" className="mt-3">
                  {item.title}
                </Heading>
                <p className="mt-4 text-[14px] leading-[2.3] text-ink-soft">
                  {item.body}
                </p>
              </div>
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
        body="市場で選んだ生花を乾かし、いちばん表情のいい瞬間をとじこめる。その手しごとと、つくり手のことをご紹介しています。"
        links={[{ href: "/about", label: "ikyuとつくり手のこと" }]}
      />
    </>
  );
}
