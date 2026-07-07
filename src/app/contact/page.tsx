import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { LinkButton } from "@/components/ui/LinkButton";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "CONTACT お問い合わせ",
  description:
    "ikyuへのお問い合わせはInstagramのDMからどうぞ。作品のこと、お直しのこと、イベント出店のこと、お気軽にご連絡ください。",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Section space="compact">
        <Container width="narrow">
          <Eyebrow>Contact</Eyebrow>
          <Heading as="h1" className="mt-4">
            お問い合わせ
          </Heading>
          <p className="mt-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
            作品のこと、お直しのこと、イベントのこと。
            どんなことでも、お気軽にお声がけください。
          </p>
        </Container>
      </Section>

      <Section tone="soft" space="compact" aria-labelledby="dm-heading">
        <Container width="narrow" className="text-center">
          <Heading as="h2" id="dm-heading">
            InstagramのDMから、どうぞ。
          </Heading>
          <p className="mx-auto mt-5 max-w-[480px] text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
            ikyuへのご連絡は、InstagramのDM(ダイレクトメッセージ)で承っています。
            お直しのご相談は、作品のお写真を添えていただけるとスムーズです。
          </p>
          <div className="mt-9">
            <LinkButton href={site.instagram.dmUrl} external>
              DMを送る
            </LinkButton>
          </div>
          <p className="mt-6 text-[13px] tracking-[0.06em] text-ink-soft">
            アカウント:
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-rose underline decoration-rose/40 underline-offset-4 transition-colors duration-300 hover:decoration-rose"
            >
              @{site.instagram.handle}
              <span className="sr-only">(外部サイトが開きます)</span>
            </a>
          </p>
        </Container>
      </Section>

      <Section aria-labelledby="notes-heading">
        <Container width="narrow">
          <h2 id="notes-heading" className="sr-only">
            お問い合わせにあたって
          </h2>
          <dl className="space-y-10">
            <div>
              <dt>
                <Heading as="h3">お返事について</Heading>
              </dt>
              <dd className="mt-3 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                制作やイベント出店の状況により、お返事まで数日いただくことがあります。
                ゆっくりですが、必ずお返事しますので、どうぞ気長にお待ちください。
              </dd>
            </div>
            <div>
              <dt>
                <Heading as="h3">minneをご利用の方</Heading>
              </dt>
              <dd className="mt-3 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                minneでご購入いただいた作品については、minneのメッセージ機能からも
                ご連絡いただけます。
              </dd>
            </div>
            <div>
              <dt>
                <Heading as="h3">お直しのご相談</Heading>
              </dt>
              <dd className="mt-3 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                ご相談の流れやよくあるご質問は、CAREのページにまとめています。
                <span className="mt-3 block">
                  <ArrowLink href="/care">お手入れとお直しのこと</ArrowLink>
                </span>
              </dd>
            </div>
          </dl>
        </Container>
      </Section>
    </>
  );
}
