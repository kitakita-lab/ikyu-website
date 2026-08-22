import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { events } from "@/content/events";

/*
 * イベント実績のページ。読者はお客様・ファン・イベント主催者。
 * 営業レポートではなく「体験の楽しさと空気」を伝える。
 * イベントの追加は src/content/events.ts に1件足すだけ(このファイルは触らない)。
 */

export const metadata: Metadata = {
  title: "EVENT イベントのこと",
  description:
    "ikyuのワークショップ・展示のこれまでの記録。季節のドライフラワーで「自分だけの一本」をつくるフラワーボトルワークショップなど、花にふれる時間をお届けしています。",
  alternates: { canonical: "/events" },
};

export default function EventsPage() {
  return (
    <>
      <Section space="compact" className="pb-0 md:pb-0">
        <Container width="narrow">
          <Eyebrow>Event</Eyebrow>
          <Heading as="h1" className="mt-4">
            イベントのこと
          </Heading>
          {/* アクセサリーとワークショップを、ABOUTと同じ「花を選ぶ」の思想でつなぐ */}
          <p className="mt-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
            ikyuの制作は、花を選ぶところから始まります。
            その始まりの時間をお客様にひらいたワークショップと、
            これまでのイベントの記録です。
          </p>
        </Container>
      </Section>

      {events.map((ev, i) => (
        <Section
          key={ev.slug}
          tone={i % 2 === 0 ? "base" : "soft"}
          aria-labelledby={`event-${ev.slug}`}
        >
          <Container width="narrow">
            <article>
              <header>
                <Heading as="h2" id={`event-${ev.slug}`}>
                  {ev.name}
                </Heading>
                <p className="mt-3 font-display text-[13px] leading-[2] tracking-[0.12em] text-ink-soft">
                  {ev.dateText}
                  <span className="mx-2" aria-hidden="true">
                    /
                  </span>
                  {ev.venue}
                </p>
              </header>

              <p className="mt-8 text-[15px] leading-[2.4]">{ev.lead}</p>

              {ev.photos[0] && (
                <Image
                  src={ev.photos[0].src}
                  alt={ev.photos[0].alt}
                  width={ev.photos[0].width}
                  height={ev.photos[0].height}
                  sizes="(min-width: 800px) 720px, 100vw"
                  className="mt-10 h-auto w-full"
                />
              )}

              <div className="mt-10 space-y-6 text-[14px] leading-[2.3] text-ink-soft md:text-[15px]">
                {ev.body.map((paragraph, j) => (
                  <p key={j}>{paragraph}</p>
                ))}
              </div>

              {ev.photos.slice(1).map((photo) => (
                <Image
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  sizes="(min-width: 800px) 720px, 100vw"
                  className="mt-8 h-auto w-full"
                />
              ))}

              {ev.quote && (
                <blockquote className="mt-10 border-l-2 border-rose-soft pl-6">
                  <p className="text-[15px] leading-[2.2] tracking-[0.04em]">
                    「{ev.quote}」
                  </p>
                  <cite className="mt-2 block font-sans text-[12px] not-italic tracking-[0.12em] text-ink-soft">
                    参加してくださった方の言葉
                  </cite>
                </blockquote>
              )}

              <dl className="mt-12 divide-y divide-line border-y border-line">
                {ev.record.map((row) => (
                  <div key={row.label} className="flex gap-8 py-4">
                    <dt className="w-28 shrink-0 font-sans text-[12px] leading-[2.2] tracking-[0.16em] text-ink-soft">
                      {row.label}
                    </dt>
                    <dd className="text-[14px] leading-[2.2] tracking-[0.04em]">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-6 text-[12px] leading-[2] tracking-[0.06em] text-ink-soft">
                {ev.credit}
              </p>
              {ev.photos.length > 0 && (
                <p className="mt-2 text-[11px] leading-[2] tracking-[0.06em] text-ink-soft/80">
                  ※写真は、ご参加のみなさまのプライバシーに配慮し、一部を加工して掲載しています。
                </p>
              )}
            </article>
          </Container>
        </Section>
      ))}
    </>
  );
}
