import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { LinkButton } from "@/components/ui/LinkButton";
import { news, upcomingEvent, formatDate } from "@/content/news";
import { site } from "@/content/site";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const latestNews = news.slice(0, 3);

  return (
    <>
      {/*
       * ヒーロー:言葉と「金の花」(ブランドを代表する作品)を最初の一画面に並べる。
       * 写真はすべて実際の作品写真(AI生成画像は使わない)。
       * 構図は撮影されたままの2組(4輪)を尊重し、作品を絶対に途中で切らない。
       * 4:5の全身が1366x768のノートPCでも初画面に収まるよう、50:50で組む
       */}
      <Section space="compact">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <p className="font-display text-[12px] uppercase tracking-[0.3em] text-rose">
                Handmade in Sapporo
              </p>
              {/* 2行で組む前提の見出し(1行に詰めると列幅で中途半端に折れる) */}
              <h1 className="mt-6 text-[26px] font-normal leading-[1.7] tracking-[0.08em] md:text-[36px]">
                暮らしに花が
                <br />
                咲きますように。
              </h1>
              <p className="mt-6 max-w-[560px] text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                ikyuは、北海道札幌でうまれる
                ハンドメイドアクセサリーのブランドです。
                身につけるたび、気持ちがすこし明るくなる。
                そんな「花」をお届けしています。
              </p>
              <div className="mt-9">
                <ArrowLink href="/collection">作品を見る</ArrowLink>
              </div>
            </div>
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/product-hoops.webp"
                alt="白いサテンの上に並ぶ、金の花びらのフープピアス2組。花芯には押し花をとじこめた透明な球と、透明ビーズの飾りが揺れる"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
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
              お気に入りのピアスをつけた朝、鏡の前で背筋が伸びる。
              いつもの装いに、ひとつぶの光が加わる。
              今日という日が、ちょっとだけ好きになる。
            </p>
            <p>
              ikyuの「花」は、そんな気持ちの動きのこと。
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
            {/* 写真自体も /collection へのリンクにする(押せる場所を増やす) */}
            <Link
              href="/collection"
              className="relative order-2 block aspect-[2841/2670] w-full md:order-1"
              aria-label="COLLECTION 作品のことを見る"
            >
              <Image
                src="/images/product-stand.webp"
                alt="白い布を背景に、アクリルスタンドで揺れるikyuのピアス。金の花びらから、白い小花と細いゴールドのラインが垂れる"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </Link>
            <div className="order-1 md:order-2">
              <Eyebrow>Collection</Eyebrow>
              <Heading as="h2" id="collection-heading" className="mt-4">
                その日の気持ちに、
                <br />
                そっと華やぎを。
              </Heading>
              <p className="mt-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                光をすくいあげる透明、肌になじむ金、とじこめた季節の花。
                ふとした瞬間に、心をほどく作品たちです。
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
                作り手の手から、
                <br />
                あなたの手へ。
              </Heading>
              <p className="mt-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                花屋さんで選んだ生花を、ドライフラワーに育て、
                ひとつずつ手しごとで仕上げる。
                イベント会場では、つくり手と直接お会いいただける日もあります。
              </p>
              <div className="mt-9">
                <ArrowLink href="/about">つくり手に会いにいく</ArrowLink>
              </div>
            </div>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/top-gift.webp"
                alt="金の花のピアスを留めたブランドカードを、お客様へ手渡すように掲げた作り手の手元"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/*
       * CARE:長く愛されるブランドであることの宣言。
       * ここだけ英字ラベルを外し、大きな一行だけを置く「見せ場」にする
       * (同型セクションの反復を断ち、お直しの相談窓口=ikyuの差別化を最も静かな形で立てる)
       */}
      <Section tone="soft" aria-labelledby="care-heading">
        <Container width="narrow" className="text-center">
          <Heading as="h2" id="care-heading" display>
            永く、そばに。
          </Heading>
          <p className="mt-7 text-[14px] leading-[2.2] text-ink-soft md:text-[15px]">
            ikyuの作品は、お手入れやお直しのご相談をいつでも承っています。
            お迎えいただいた日から、おつきあいが始まります。
          </p>
          <div className="mt-9">
            <ArrowLink href="/care">お手入れとお直しのこと</ArrowLink>
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
          {/* 「これから」の気配:次の出店をTOPにも一行だけ */}
          {upcomingEvent && (
            <p className="mt-6 text-[13px] leading-[2] tracking-[0.04em] text-ink-soft">
              <span className="mr-3 border border-rose/50 px-2 py-0.5 font-sans text-[11px] tracking-[0.12em] text-rose">
                次の出店・{upcomingEvent.status}
              </span>
              {upcomingEvent.name}({upcomingEvent.dateText})
            </p>
          )}
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

      {/*
       * Instagram:いちばん近い場所への誘導。
       * 直前のCARE(中央揃えの見せ場)と形を変え、左揃えで静かに結ぶ。
       * アンダースコア入りのIDはボタンから外し、添え書きに退げる
       */}
      <Section tone="soft" space="compact" aria-labelledby="instagram-heading">
        <Container width="narrow">
          <Eyebrow>Instagram</Eyebrow>
          <Heading as="h2" id="instagram-heading" className="mt-4">
            制作の日々は、
            <br className="sm:hidden" />
            Instagramで。
          </Heading>
          <p className="mt-5 text-[14px] leading-[2.2] text-ink-soft md:text-[15px]">
            作品のこと、出店のこと、制作の途中のこと。
            いちばん近くでikyuを感じていただける場所です。
          </p>
          <div className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-3">
            <LinkButton href={site.instagram.url} external>
              Instagramでフォローする
            </LinkButton>
            <p className="font-display text-[13px] tracking-[0.1em] text-ink-soft">
              @{site.instagram.handle}
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
