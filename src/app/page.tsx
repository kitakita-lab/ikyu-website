import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { LinkButton } from "@/components/ui/LinkButton";
import { Petals } from "@/components/features/Petals";
import { news, upcomingEvent, formatDate } from "@/content/news";
import { site } from "@/content/site";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * ファーストビューの写真。より強い一枚(例:耳元×アクセサリー×自然光)が
 * 撮影できたら、このオブジェクトを差し替えるだけでHOMEが更新されます。
 * 写真は必ず全身が写る実写を使うこと(トリミングで作品を切らない)。
 */
const heroImage = {
  src: "/images/product-stand.webp",
  alt: "白い布を背景に、アクリルスタンドで揺れるikyuのピアス。金の花びらから、白い小花と細いゴールドのラインが垂れる",
  width: 1400,
  height: 1316,
};

/*
 * トップページ = 「小さなアクセサリーブランドの、静かな写真編集」。
 * 各セクションは同じ型を繰り返さず、写真の大きさ・置き方(端まで/余白の中)・
 * 背景の面を意図して変える。強:ヒーロー(右端まで)/作品(左端まで)
 * 弱:つくり手(余白の中の一枚)/ CARE・NEWS(文字だけの間)
 */
export default function HomePage() {
  const latestNews = news.slice(0, 3);

  return (
    <>
      {/* ───────── ヒーロー:言葉と作品をひとつの面に ───────── */}
      <section className="hero relative overflow-hidden">
        <div className="hero__photo absolute inset-y-0 right-0 z-0 hidden w-[min(54vw,860px)] md:block">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            priority
            sizes="(min-width: 768px) 54vw, 100vw"
            className="object-cover object-[58%_50%]"
          />
        </div>

        <Petals />

        <Container className="relative z-20">
          <div className="pt-12 md:flex md:min-h-[min(78vh,760px)] md:items-center md:pt-0">
            {/* 見出しは写真の溶ける縁に寄せて、ひとつの構図にする */}
            <div className="md:w-[46%] md:pl-[10%]">
              <h1 className="text-[27px] font-normal leading-[1.75] tracking-[0.08em] md:text-[36px]">
                暮らしに花が
                <br />
                咲きますように。
              </h1>
              <div className="mt-7 hidden md:block">
                <ArrowLink href="/collection">作品を見る</ArrowLink>
              </div>
            </div>
          </div>

          {/* スマホ:写真は画面の両端まで、縁はぼかさずそのまま置く */}
          <div className="-mx-6 mt-7 md:hidden">
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              width={heroImage.width}
              height={heroImage.height}
              priority
              sizes="100vw"
              className="h-auto w-full"
            />
          </div>
          <div className="mt-5 pb-14 md:hidden">
            <ArrowLink href="/collection">作品を見る</ArrowLink>
          </div>
        </Container>
      </section>

      {/* ───────── CONCEPT:言葉だけの間 ───────── */}
      <section aria-labelledby="concept-heading" className="py-16 md:py-24">
        <Container width="narrow">
          <Eyebrow>Concept</Eyebrow>
          <Heading as="h2" id="concept-heading" className="mt-4">
            ここでいう「花」は、
            <br />
            植物のことではありません。
          </Heading>
          <div className="mt-7 space-y-5 text-[15px] leading-[2.3]">
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
          <div className="mt-8">
            <ArrowLink href="/about">ikyuとつくり手のこと</ArrowLink>
          </div>
        </Container>
      </section>

      {/* ───────── 作品:大きな一枚と、添える一枚 ───────── */}
      <section aria-labelledby="collection-heading" className="relative overflow-hidden">
        {/* PC:金の花を左端まで伸ばす。右端だけを紙へ溶かす */}
        <div className="bleed-left__photo absolute inset-y-0 left-0 z-0 hidden w-[min(50vw,760px)] md:block">
          <Image
            src="/images/product-hoops.webp"
            alt="白いサテンの上に並ぶ、金の花びらのフープピアス2組。花芯にはドライフラワーをとじこめた透明な球と、透明ビーズの飾りが揺れる"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover object-center"
          />
        </div>

        <Container className="relative z-10">
          {/* スマホ:大きな一枚は画面の両端まで */}
          <Link
            href="/collection"
            aria-label="COLLECTION 作品のことを見る"
            className="-mx-6 block md:hidden"
          >
            <Image
              src="/images/product-hoops.webp"
              alt="白いサテンの上に並ぶ、金の花びらのフープピアス2組。花芯にはドライフラワーをとじこめた透明な球と、透明ビーズの飾りが揺れる"
              width={1200}
              height={1500}
              loading="eager"
              sizes="100vw"
              className="h-auto w-full"
            />
          </Link>

          <div className="py-12 md:ml-[54%] md:flex md:min-h-[min(88vh,820px)] md:flex-col md:justify-center md:py-20">
            {/* 添える一枚:小さく、右へ寄せて */}
            <div className="mb-8 hidden md:block md:w-[46%]">
              <Image
                src="/images/product-soap-bubble.webp"
                alt="波形のアクリルスタンドに揺れるsoap bubble。しゃぼん玉のような虹色の透明ビーズに、窓の光と影が差す"
                width={1200}
                height={1500}
                sizes="(min-width: 768px) 22vw, 60vw"
                className="h-auto w-full"
              />
            </div>
            <Eyebrow>Each piece, one of a kind.</Eyebrow>
            <Heading as="h2" id="collection-heading" className="mt-4">
              その日の気持ちに、
              <br />
              そっと華やぎを。
            </Heading>
            <p className="mt-5 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
              光をすくいあげる透明、肌になじむ金、とじこめた季節の花。
              ふとした瞬間に、心をほどく作品たちです。
            </p>
            <div className="mt-8">
              <LinkButton href="/collection">作品を見る</LinkButton>
            </div>
            {/* スマホ:添える一枚は右へ寄せて小さく */}
            <div className="mt-12 ml-auto w-[62%] md:hidden">
              <Image
                src="/images/product-soap-bubble.webp"
                alt="波形のアクリルスタンドに揺れるsoap bubble。しゃぼん玉のような虹色の透明ビーズに、窓の光と影が差す"
                width={1200}
                height={1500}
                sizes="62vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ───────── つくり手:余白の中の一枚と、言葉を段違いに ───────── */}
      <Section tone="soft" aria-labelledby="maker-heading">
        <Container>
          <div className="md:grid md:grid-cols-12 md:gap-x-10">
            <div className="md:col-span-6">
              <Image
                src="/images/top-gift.webp"
                alt="金の花のピアスを留めたブランドカードを、お客様へ手渡すように掲げた作り手の手元"
                width={1400}
                height={1050}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <div className="mt-8 md:col-span-5 md:col-start-8 md:mt-0 md:self-end md:pb-6">
              <Eyebrow>About</Eyebrow>
              <Heading as="h2" id="maker-heading" className="mt-4">
                作り手の手から、
                <br />
                あなたの手へ。
              </Heading>
              <p className="mt-5 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                花屋さんで選んだ生花を、ドライフラワーに育て、
                ひとつずつ手しごとで仕上げる。
                イベント会場では、つくり手と直接お会いいただける日もあります。
              </p>
              <div className="mt-7">
                <ArrowLink href="/about">つくり手に会いにいく</ArrowLink>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ───────── CARE:文字だけの、短い間 ───────── */}
      <section aria-labelledby="care-heading" className="py-16 md:py-24">
        <Container width="narrow" className="text-center">
          <Heading as="h2" id="care-heading" display>
            永く、そばに。
          </Heading>
          <p className="mt-6 text-[14px] leading-[2.2] text-ink-soft md:text-[15px]">
            ikyuの作品は、お手入れやお直しのご相談をいつでも承っています。
            お迎えいただいた日から、おつきあいが始まります。
          </p>
          <div className="mt-7">
            <ArrowLink href="/care">お手入れとお直しのこと</ArrowLink>
          </div>
        </Container>
      </section>

      {/* ───────── NEWS ───────── */}
      <section aria-labelledby="news-heading" className="border-t border-line py-14 md:py-20">
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
          <ul className="mt-8 divide-y divide-line border-y border-line">
            {latestNews.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/news/${post.slug}`}
                  className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:gap-8"
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
      </section>

      {/* ───────── Instagram:いちばん近い場所へ ───────── */}
      <section aria-labelledby="instagram-heading" className="border-t border-line py-14 md:py-20">
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
          <div className="mt-7 flex flex-wrap items-baseline gap-x-6 gap-y-3">
            <LinkButton href={site.instagram.url} external>
              Instagramでフォローする
            </LinkButton>
            <p className="font-display text-[13px] tracking-[0.1em] text-ink-soft">
              @{site.instagram.handle}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
