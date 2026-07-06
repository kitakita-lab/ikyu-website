import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { JsonLd } from "@/components/features/JsonLd";
import { news, getPost, formatDate } from "@/content/news";
import { site } from "@/content/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return news.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.body[0],
    alternates: { canonical: `/news/${post.slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} | ikyu`,
      description: post.body[0],
      images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
    },
  };
}

export default async function NewsPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "TOP", item: site.url },
      { "@type": "ListItem", position: 2, name: "NEWS", item: `${site.url}/news` },
      { "@type": "ListItem", position: 3, name: post.title },
    ],
  };

  const eventJsonLd = post.event
    ? {
        "@context": "https://schema.org",
        "@type": "Event",
        name: post.event.name,
        startDate: post.event.startDate,
        endDate: post.event.endDate,
        eventStatus: "https://schema.org/EventScheduled",
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        location: {
          "@type": "Place",
          name: post.event.venue,
          address: {
            "@type": "PostalAddress",
            addressLocality: post.event.addressLocality,
            addressCountry: "JP",
          },
        },
        organizer: { "@type": "Organization", name: "ikyu", url: site.url },
      }
    : null;

  return (
    <Section space="compact">
      <Container width="narrow">
        <article>
          <header>
            <div className="flex items-baseline gap-6">
              <time
                dateTime={post.date}
                className="font-display text-[13px] tracking-[0.14em] text-ink-soft"
              >
                {formatDate(post.date)}
              </time>
              <span className="font-sans text-[11px] tracking-[0.14em] text-rose">
                {post.category}
              </span>
            </div>
            <Heading as="h1" className="mt-5">
              {post.title}
            </Heading>
          </header>
          <div className="mt-10 space-y-6 border-t border-line pt-10 text-[15px] leading-[2.4]">
            {post.body.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>

        <div className="mt-16">
          <ArrowLink href="/news">お知らせの一覧へ戻る</ArrowLink>
        </div>
      </Container>
      <JsonLd data={breadcrumbJsonLd} />
      {eventJsonLd && <JsonLd data={eventJsonLd} />}
    </Section>
  );
}
