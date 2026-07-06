import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { CtaBand } from "@/components/features/CtaBand";
import { news, formatDate } from "@/content/news";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "NEWS お知らせ・出店情報",
  description:
    "ikyuのお知らせ、イベント出店情報、新作のご案内の一覧です。最新の情報はInstagramでもお届けしています。",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <Section space="compact">
        <Container width="narrow">
          <Eyebrow>News</Eyebrow>
          <Heading as="h1" className="mt-4">
            お知らせ・出店情報
          </Heading>
          <p className="mt-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
            出店のご案内や新作のお知らせをお届けします。
            イベントでお会いできるのを、楽しみにしています。
          </p>

          <ul className="mt-14 divide-y divide-line border-y border-line">
            {news.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/news/${post.slug}`}
                  className="group flex flex-col gap-1 py-7 sm:flex-row sm:items-baseline sm:gap-8"
                >
                  <time
                    dateTime={post.date}
                    className="shrink-0 font-display text-[13px] tracking-[0.14em] text-ink-soft"
                  >
                    {formatDate(post.date)}
                  </time>
                  <span className="shrink-0 font-sans text-[11px] tracking-[0.14em] text-rose">
                    {post.category}
                  </span>
                  <span className="text-[15px] leading-[2] transition-colors duration-300 group-hover:text-rose">
                    {post.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand
        eyebrow="Instagram"
        title="最新のお知らせは、Instagramでも。"
        body="出店の速報や制作の様子は、Instagramでいちばん早くお届けしています。"
        links={[
          {
            href: site.instagram.url,
            label: `@${site.instagram.handle} をフォローする`,
            external: true,
          },
        ]}
      />
    </>
  );
}
