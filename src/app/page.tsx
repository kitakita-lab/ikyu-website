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
       * ヒーロー:オーナー制作のブランドシート(v9)をそのまま最上部に掲げる。
       * ロゴ・コピー・3枚の写真はシート内に焼き込まれているため、
       * h1は検索エンジンとスクリーンリーダー向けに不可視で置く。
       * PC=横長版 / スマホ=縦長版 を出し分ける(どちらも無加工)
       */}
      <Section space="compact">
        <Container>
          <h1 className="sr-only">暮らしに花が咲きますように。</h1>
          <Image
            src="/images/hero-sheet-wide-v2.webp"
            alt="ikyuのブランドシート。「暮らしに花が咲きますように。Each piece, one of a kind.」の言葉と、木のスツールのバングル・手首で揺れるバングル・かすみ草のカードの3枚の写真"
            width={2000}
            height={1666}
            priority
            sizes="(min-width: 768px) 1000px, 100vw"
            className="hidden h-auto w-full md:block"
          />
          <Image
            src="/images/hero-sheet-tall-v2.webp"
            alt="ikyuのブランドシート。「Each piece, one of a kind. ひとつひとつが、一点もの。」の言葉と、バングルやかすみ草のイヤリングの3枚の写真"
            width={1500}
            height={2102}
            priority
            sizes="100vw"
            className="h-auto w-full md:hidden"
          />
          <div className="mt-8">
            <ArrowLink href="/collection">作品を見る</ArrowLink>
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
