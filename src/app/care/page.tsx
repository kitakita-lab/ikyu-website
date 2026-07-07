import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { JsonLd } from "@/components/features/JsonLd";
import { CtaBand } from "@/components/features/CtaBand";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "CARE お手入れとお直しのこと",
  description:
    "ikyuのアクセサリーを永く楽しんでいただくための、日々のお手入れ方法と、金具のお取り替えなどお直しのご案内。花やレジンの移ろいとのつきあい方も。ご相談はInstagramのDMからどうぞ。",
  alternates: { canonical: "/care" },
};

const careTips = [
  {
    title: "身につけたあとは、ひと拭き",
    body: "やわらかい布で皮脂や汗をやさしく拭き取ってください。それだけで、輝きの持ちが変わります。",
  },
  {
    title: "水と香りものは、すこし遠ざけて",
    body: "水濡れ・香水・ヘアスプレーは、変色やくもりの原因になります。身支度のいちばん最後に、アクセサリーを。",
  },
  {
    title: "保管は、光を避けて",
    body: "直射日光の当たらない場所で保管してください。強い紫外線は、レジンの黄変やドライフラワーの退色を早めます。",
  },
  {
    title: "金属パーツは、空気から守る",
    body: "長く使わないときは、チャック付きの小袋に入れると輝きが長持ちします。",
  },
] as const;

/*
 * 「修理」という言葉は使わない(ブランドオーナーの意向)。
 * 花やレジンは経年で表情を変えるため「元どおりに直す」約束はできない。
 * できること(金具のお取り替えなど)と、できないことを正直に書く。
 */
const repairSteps = [
  {
    step: "01",
    title: "ご相談",
    body: "InstagramのDMから、作品の状態がわかるお写真を添えてご連絡ください。",
  },
  {
    step: "02",
    title: "お返事",
    body: "拝見したうえで、できること・できないことを正直にお伝えします。費用がかかる場合は、事前に必ずご案内します。",
  },
  {
    step: "03",
    title: "お直し",
    body: "金具のお取り替えなどは、イベント会場での対面でも承っています。ひとつずつ丁寧に対応します。",
  },
] as const;

const faq = [
  {
    q: "花の色や風合いは、変わっていきますか?",
    a: "はい。天然の花やレジンを使っているため、時間とともにゆっくりと表情を変えていきます。お迎えいただいたときと同じ状態を保つことはできませんが、その移ろいも、花と暮らす楽しみのひとつとして寄り添っていただけたらうれしいです。直射日光を避けるなど、日々のお手入れで変化をゆるやかにできます。",
  },
  {
    q: "壊れてしまいました。直せますか?",
    a: "まずは状態のわかるお写真を添えて、DMでご相談ください。金具のゆるみやお取り替えなどは対応できることが多いです。拝見したうえで、できること・できないことを正直にお伝えします。",
  },
  {
    q: "お直しに料金はかかりますか?",
    a: "内容によって異なります。お写真を拝見したうえで、費用がかかる場合は事前に必ずご案内し、ご了承をいただいてから対応します。",
  },
  {
    q: "イヤリングからピアスへの変更などはできますか?",
    a: "金具の仕様により承れる場合があります。ご希望の内容を添えて、DMでご相談ください。",
  },
] as const;

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function CarePage() {
  return (
    <>
      <Section space="compact">
        <Container width="narrow">
          <Eyebrow>Care</Eyebrow>
          <Heading as="h1" className="mt-4">
            お手入れとお直しのこと
          </Heading>
          <p className="mt-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
            ikyuの作品は、永く身につけていただくことを前提につくっています。
            日々のちいさなお手入れと、なにかあったときのご相談。
            どちらも、作品とのおつきあいの一部です。
          </p>
        </Container>
      </Section>

      {/* 日々のお手入れ */}
      <Section tone="soft" aria-labelledby="dailycare-heading">
        <Container width="narrow">
          <Eyebrow>Daily Care</Eyebrow>
          <Heading as="h2" id="dailycare-heading" className="mt-4">
            日々のお手入れ
          </Heading>
          <dl className="mt-10 space-y-10">
            {careTips.map((tip) => (
              <div key={tip.title}>
                <dt>
                  <Heading as="h3">{tip.title}</Heading>
                </dt>
                <dd className="mt-3 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                  {tip.body}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      {/* お直しのご相談 */}
      <Section aria-labelledby="repair-heading">
        <Container width="narrow">
          <Eyebrow>Consultation</Eyebrow>
          <Heading as="h2" id="repair-heading" className="mt-4">
            お直しのご相談
          </Heading>
          <p className="mt-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
            金具のゆるみやお取り替えなど、できる範囲でのお直しをお受けしています。
            まずはお気軽にご相談ください。
          </p>
          <ol className="mt-12 space-y-10">
            {repairSteps.map((item) => (
              <li key={item.step} className="flex gap-7">
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 font-display text-[15px] tracking-[0.2em] text-rose"
                >
                  {item.step}
                </span>
                <div>
                  <Heading as="h3">{item.title}</Heading>
                  <p className="mt-2 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-12 border-t border-line pt-8 text-[13px] leading-[2.2] text-ink-soft">
            ドライフラワーやレジンは、時間とともにすこしずつ表情を変えていきます。
            お迎えいただいたときとまったく同じ状態へ戻すことは、お約束できません。
            また、作品の状態により承れない場合や、ikyu以外の作品のお直しは
            お受けできないことを、あらかじめご了承ください。
          </p>
        </Container>
      </Section>

      {/* FAQ */}
      <Section tone="soft" aria-labelledby="faq-heading">
        <Container width="narrow">
          <Eyebrow>Q & A</Eyebrow>
          <Heading as="h2" id="faq-heading" className="mt-4">
            よくあるご質問
          </Heading>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {faq.map((item) => (
              <details key={item.q} className="faq group py-2">
                <summary className="flex items-center justify-between py-4 text-[15px] leading-[2] transition-colors duration-300 hover:text-rose">
                  {item.q}
                </summary>
                <p className="pb-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand
        tone="base"
        eyebrow="Contact"
        title="迷ったら、まずご相談を。"
        body="お手元の作品のお写真を添えて、InstagramのDMからお気軽にどうぞ。"
        links={[
          { href: site.instagram.dmUrl, label: "DMで相談する", external: true },
          { href: "/contact", label: "お問い合わせについて" },
        ]}
      />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
