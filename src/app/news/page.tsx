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
          <div
            id="next-event"
            className="mt-14 scroll-mt-24 border border-line px-7 py-8 md:px-10"
          >
            <p className="font-display text-[12px] uppercase tracking-[0.24em] text-rose">
              Next Event
            </p>
            {upcomingEvent ? (
              <div className="mt-4">
                <p className="text-[16px] tracking-[0.06em]">
                  {upcomingEvent.name}
                  {/* 「予定」と「確定」を必ず区別して表示する */}
                  <span className="ml-3 align-middle border border-rose/50 px-2 py-0.5 font-sans text-[11px] tracking-[0.12em] text-rose">
                    出店{upcomingEvent.status}
                  </span>
                </p>
                {/* 「ikyuが出店する日」と「イベント全体の開催日」を分けて示す */}
                <dl className="mt-5 space-y-3 text-[14px] leading-[2] sm:space-y-1.5">
                  {[
                    {
                      label: "ikyuの出店日",
                      value: (
                        <time dateTime={upcomingEvent.exhibitDate}>
                          {upcomingEvent.exhibitDate.slice(0, 4)}年
                          {upcomingEvent.exhibitDateText}
                        </time>
                      ),
                      strong: true,
                    },
                    { label: "イベント開催", value: upcomingEvent.eventDateText },
                    ...(upcomingEvent.venue
                      ? [{ label: "会場", value: upcomingEvent.venue }]
                      : []),
                  ].map((row) => (
                    // スマホでは見出しと値を縦に、広い画面では横に並べる(日付を途中で折らない)
                    <div key={row.label} className="sm:flex sm:gap-6">
                      <dt className="shrink-0 font-sans text-[12px] leading-[2] tracking-[0.14em] text-ink-soft sm:w-[7em]">
                        {row.label}
                      </dt>
                      <dd className={row.strong ? "" : "text-ink-soft"}>{row.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[13px] leading-[2.1] text-ink-soft">
                  ikyuの出店は{upcomingEvent.exhibitDateText}です。
                  ご来場の際は、日にちにご注意ください。
                  {upcomingEvent.status === "予定" && (
                    <span className="block">
                      会場などくわしくは決まり次第、こちらとInstagramでお知らせします。
                    </span>
                  )}
                </p>
              </div>
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
