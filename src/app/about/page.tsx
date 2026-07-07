import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { CtaBand } from "@/components/features/CtaBand";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "ikyuとつくり手のこと",
  description:
    "「暮らしに花が咲きますように。」ikyuのコンセプトと、生花からドライフラワーを育てて作品にするまでの手しごと、札幌のアトリエでつくる作り手のことをご紹介します。",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "ikyuとつくり手のこと | ikyu",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
};

export default function AboutPage() {
  return (
    <>
      <Section space="compact">
        <Container>
          <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <div>
              <Eyebrow>About</Eyebrow>
              <Heading as="h1" className="mt-4">
                ikyuとつくり手のこと
              </Heading>
              <p className="mt-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                「暮らしに花が咲きますように。」——
                ikyuは、その願いをかたちにするために生まれた、
                札幌のハンドメイドアクセサリーブランドです。
              </p>
            </div>
            <div className="relative aspect-square w-full">
              <Image
                src="/images/about-hands.webp"
                alt="白いニットの袖の手元が、ゴールドとシルバーの大ぶりのフープを光にかざしている"
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* コンセプト */}
      <Section aria-labelledby="philosophy-heading">
        <Container width="narrow">
          <Heading as="h2" id="philosophy-heading">
            「花」は、気持ちのこと。
          </Heading>
          <div className="mt-8 space-y-6 text-[15px] leading-[2.4]">
            <p>
              ikyuの作品には、花をとじこめたものがたくさんあります。
              けれど、ほんとうに届けたいのは、花そのものではありません。
            </p>
            <p>
              身につけた人の気持ちが、ほんの一瞬、上を向く。
              わたしたちはそれを「花が咲く」と呼んでいます。
            </p>
            <p>
              だから、花を使っていない作品も、ikyuの大切な「花」のひとつです。
              主役はいつも、身につけてくださるあなたの気持ちです。
            </p>
          </div>
        </Container>
      </Section>

      {/*
       * 制作のこと。
       * 制作風景の実写がまだないため、いまは言葉だけで語る
       * (撮影リスト管理中。8月の撮影後に写真を追加する)
       */}
      <Section tone="soft" aria-labelledby="process-heading">
        <Container width="narrow">
          <Eyebrow>Process</Eyebrow>
          <Heading as="h2" id="process-heading" className="mt-4">
            花を選ぶところから、
            <br />
            制作は始まる。
          </Heading>
          <div className="mt-6 space-y-5 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
            <p>
              花屋さんで選んだ生花を、アトリエでゆっくりとドライフラワーへ。
              いちばん表情のいい瞬間を見きわめて、レジンにとじこめます。
            </p>
            <p>
              色あわせも、配置も、金具の仕上げも、ひとつずつ手作業。
              小さな作業の積みかさねが、日常で永く身につけられる丈夫さと、
              上品な佇まいをつくります。
            </p>
          </div>
        </Container>
      </Section>

      {/* つくり手の言葉 */}
      <Section aria-labelledby="maker-heading">
        <Container>
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
            <div className="order-2 md:order-1">
              <Eyebrow>Maker</Eyebrow>
              <Heading as="h2" id="maker-heading" className="mt-4">
                はじめまして、ikyuです。
              </Heading>
              <blockquote className="mt-6 border-l-2 border-rose-soft pl-6 text-[15px] leading-[2.4]">
                <p>
                  アクセサリーを手にとってくださった方が、
                  鏡の前でふっと笑顔になる。
                  その瞬間がいちばん好きで、ものづくりを続けています。
                </p>
                <p className="mt-4">
                  イベントでお会いできたら、ぜひ気軽に声をかけてください。
                  あなたの今日に、小さな花を添えられますように。
                </p>
              </blockquote>
              <p className="mt-6 text-[13px] tracking-[0.08em] text-ink-soft">
                ikyu つくり手より
              </p>
            </div>
            <div className="relative order-1 aspect-[4/3] w-full md:order-2">
              <Image
                src="/images/about-blooms.webp"
                alt="白い陶器のトレイに置かれた2枚のブランドカード。それぞれに、かすみ草のスタッドピアスが留められている"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Meet"
        title="会いに来てください。"
        body="ikyuの作品は、minneでのお迎えのほか、イベント出店でも直接ご覧いただけます。出店のご案内はNEWSとInstagramでお知らせしています。"
        links={[
          { href: "/news", label: "出店情報を見る" },
          {
            href: site.instagram.url,
            label: "Instagramでフォローする",
            external: true,
          },
        ]}
      />
    </>
  );
}
