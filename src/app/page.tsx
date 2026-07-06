import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { LinkButton } from "@/components/ui/LinkButton";
import { news, formatDate } from "@/content/news";
import { site } from "@/content/site";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const latestNews = news.slice(0, 3);

  return (
    <>
      {/* ヒーロー:コピーが先、写真があとに続く(言葉のブランドであることを最初に示す) */}
      <Section space="compact" className="pb-0 md:pb-0">
        <Container>
          <div className="animate-fade-rise">
            <p className="font-display text-[13px] uppercase tracking-[0.3em] text-rose">
              ikyu — handmade accessories
            </p>
            <h1 className="mt-6 text-[30px] font-medium leading-[1.9] tracking-[0.08em] md:text-[44px]">
              暮らしに花が
              <br className="md:hidden" />
              咲きますように。
            </h1>
            <p className="mt-6 max-w-[560px] text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
              ikyuは、北海道札幌のアトリエからうまれる
              ハンドメイドアクセサリーのブランドです。
              身につけるたび、気持ちがすこし明るくなる。
              そんな「花」をお届けしています。
            </p>
          </div>
        </Container>
        <div className="animate-fade-rise-delay mt-14 md:mt-20">
          <div className="relative aspect-[4/5] w-full sm:aspect-[3/2]">
            <Image
              src="/images/atelier-flowers.webp"
              alt="アトリエの作業台。籠いっぱいのドライフラワーのそばで、ピンセットで小さな花を選ぶ作り手の手元"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[62%_50%]"
            />
          </div>
        </div>
      </Section>

      {/* ブランド導入:「花」の再定義 */}
      <Section aria-labelledby="concept-heading">
        <Container width="narrow">
          <Eyebrow id="concept-eyebrow">Concept</Eyebrow>
          <Heading as="h2" id="concept-heading" className="mt-4">
            ここでいう「花」は、
            <br />
            植物のことではありません。
          </Heading>
          <div className="mt-8 space-y-6 text-[15px] leading-[2.4]">
            <p>
              お気に入りのピアスをつけた朝、鏡の前で、すこし背筋が伸びる。
              いつもの装いに、ひとつぶの光が加わる。
              今日という日が、ちょっとだけ好きになる。
            </p>
            <p>
              ikyuの「花」は、そんな気持ちの動きのことです。
              アクセサリーは、そのための小さなきっかけ。
              あなたの毎日に、花が咲きますように。
            </p>
          </div>
          <div className="mt-10">
            <ArrowLink href="/about">ikyuとつくり手のこと</ArrowLink>
          </div>
        </Container>
      </Section>

      {/* COLLECTION:作品の華やぎを見せる */}
      <Section tone="soft" aria-labelledby="collection-heading">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="relative order-2 aspect-square w-full md:order-1">
              <Image
                src="/images/flatlay.webp"
                alt="白い布の上に並ぶikyuの作品。ゴールドのネックレスとバングル、虹色にきらめく透明なビーズのイヤリング"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <Eyebrow>Collection</Eyebrow>
              <Heading as="h2" id="collection-heading" className="mt-4">
                その日の気持ちに、
                <br />
                そっと華やぎを。
              </Heading>
              <p className="mt-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                光をすくいあげる透明なガラスやレジン。肌になじむ金の細いライン。
                いちばん美しい姿でとじこめた、季節の花。
                日常になじみながら、ふとした瞬間に心をほどく作品たちです。
              </p>
              <div className="mt-9">
                <LinkButton href="/collection">作品を見る</LinkButton>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* つくり手:ブランドを「人」として好きになってもらう */}
      <Section aria-labelledby="maker-heading">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow>About</Eyebrow>
              <Heading as="h2" id="maker-heading" className="mt-4">
                つくる人の顔が見える
                <br />
                ブランドでありたい。
              </Heading>
              <p className="mt-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                市場で生花を選び、アトリエでドライフラワーに育て、
                ひとつずつ手しごとで仕上げる。
                ikyuの作品は、作り手の手から、あなたの手へ。
                イベント会場では、直接お会いできる日もあります。
              </p>
              <div className="mt-9">
                <ArrowLink href="/about">つくり手に会いにいく</ArrowLink>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/event-booth.webp"
                alt="イベント出店の様子。ドライフラワーと作品が並ぶブースで、お客様と笑顔で言葉を交わす作り手"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* CARE:長く愛されるブランドであることの宣言 */}
      <Section tone="soft" space="compact" aria-labelledby="care-heading">
        <Container width="narrow" className="text-center">
          <Eyebrow>Care</Eyebrow>
          <Heading as="h2" id="care-heading" className="mt-4">
            永く、そばに。
          </Heading>
          <p className="mt-5 text-[14px] leading-[2.2] text-ink-soft md:text-[15px]">
            ikyuの作品は、お手入れやお直しのご相談をいつでも承っています。
            お迎えいただいた日から、おつきあいが始まります。
          </p>
          <div className="mt-8">
            <ArrowLink href="/care">お手入れと修理のこと</ArrowLink>
          </div>
        </Container>
      </Section>

      {/* NEWS */}
      <Section aria-labelledby="news-heading">
        <Container width="narrow">
          <div className="flex items-baseline justify-between">
            <div>
              <Eyebrow>News</Eyebrow>
              <Heading as="h2" id="news-heading" className="mt-4">
                お知らせ
              </Heading>
            </div>
            <ArrowLink href="/news">一覧へ</ArrowLink>
          </div>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {latestNews.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/news/${post.slug}`}
                  className="group flex flex-col gap-1 py-6 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <time
                    dateTime={post.date}
                    className="font-display text-[13px] tracking-[0.14em] text-ink-soft"
                  >
                    {formatDate(post.date)}
                  </time>
                  <span className="font-sans text-[11px] tracking-[0.14em] text-rose">
                    {post.category}
                  </span>
                  <span className="text-[15px] transition-colors duration-300 group-hover:text-rose">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Instagram:いちばん近い場所への誘導 */}
      <Section tone="soft" space="compact" aria-labelledby="instagram-heading">
        <Container width="narrow" className="text-center">
          <Eyebrow>Instagram</Eyebrow>
          <Heading as="h2" id="instagram-heading" className="mt-4">
            日々の制作と新作は、
            <br className="sm:hidden" />
            Instagramで。
          </Heading>
          <p className="mt-5 text-[14px] leading-[2.2] text-ink-soft md:text-[15px]">
            作品のこと、出店のこと、アトリエの日々。
            いちばん近くでikyuを感じていただける場所です。
          </p>
          <div className="mt-8">
            <LinkButton href={site.instagram.url} external>
              @{site.instagram.handle} をフォローする
            </LinkButton>
          </div>
        </Container>
      </Section>
    </>
  );
}
