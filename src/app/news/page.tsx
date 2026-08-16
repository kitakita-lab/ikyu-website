import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { CtaBand } from "@/components/features/CtaBand";
import { news, upcomingEvent, formatDate } from "@/content/news";
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

          {/* 次の出店(常設枠)。未定の期間も空白ではなく「約束」を見せる */}
          <div className="mt-14 border border-line px-7 py-8 md:px-10">
            <p className="font-display text-[12px] uppercase tracking-[0.24em] text-rose">
              Next Event
            </p>
            {upcomingEvent ? (
              <dl className="mt-4 space-y-2">
                <dt className="text-[16px] tracking-[0.06em]">
                  {upcomingEvent.name}
                  {/* 「予定」と「確定」を必ず区別して表示する */}
                  <span className="ml-3 align-middle border border-rose/50 px-2 py-0.5 font-sans text-[11px] tracking-[0.12em] text-rose">
                    出店{upcomingEvent.status}
                  </span>
                </dt>
                <dd className="text-[14px] leading-[2.1] text-ink-soft">
                  {upcomingEvent.dateText}
                  {upcomingEvent.venue && (
                    <>
                      <span className="mx-2" aria-hidden="true">
                        /
                      </span>
                      {upcomingEvent.venue}
                    </>
                  )}
                  {upcomingEvent.status === "予定" && (
                    <span className="mt-1 block text-[13px]">
                      くわしくは決まり次第、こちらとInstagramでお知らせします。
                    </span>
                  )}
                </dd>
              </dl>
            ) : (
              <p className="mt-4 text-[14px] leading-[2.1] text-ink-soft">
                次の出店は、ただいま準備中です。
                決まり次第、この場所とInstagramでお知らせします。
              </p>
            )}
            <div className="mt-5">
              <ArrowLink href="/events">これまでのイベントの記録</ArrowLink>
            </div>
          </div>

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
            label: "Instagramでフォローする",
            external: true,
          },
        ]}
      />
    </>
  );
}
