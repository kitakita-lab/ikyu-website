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
            その日の気持ちに、そっと寄り添う華やぎを。
            ひとつずつ手しごとでうまれる、一点ものの作品たちです。
          </p>
        </Container>
        <div className="mt-14 md:mt-20">
          <div className="relative aspect-[4/5] w-full sm:aspect-[16/9]">
            <Image
              src="/images/flatlay.webp"
              alt="ikyuの作品の集合。ゴールドのスネークチェーンネックレス、バングル、虹色の透明ビーズのイヤリング、刺繍レースのリボン"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
        </div>
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
                  className="font-display text-[15px] tracking-[0.24em] text-rose-soft"
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
        title="作品のうしろには、物語があります。"
        body="花を選ぶところから始まる、ikyuの手しごとのこと。つくり手のことも、ぜひ知ってください。"
        links={[{ href: "/about", label: "ikyuとつくり手のこと" }]}
      />
    </>
  );
}
