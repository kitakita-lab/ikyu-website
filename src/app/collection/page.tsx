import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { products, formatPrice } from "@/content/products";

/*
 * COLLECTION = 作品一覧。導線は Collection → 作品詳細 → STORES(決済)。
 * カード全体が詳細ページへのリンク。購入ボタンはここには置かない(詳細ページの役割)。
 * 商品の追加・差し替えは src/content/products.ts だけで完結します。
 */

export const metadata: Metadata = {
  title: "COLLECTION 作品のこと",
  description:
    "ikyuのハンドメイドアクセサリーの一覧。ひとつずつ手しごとでうまれる一点ものを、STORESからお迎えいただけます。",
  alternates: { canonical: "/collection" },
  openGraph: {
    title: "COLLECTION 作品のこと | ikyu",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
};

export default function CollectionPage() {
  return (
    <Section space="compact">
      <Container>
        <Eyebrow>Collection</Eyebrow>
        <Heading as="h1" className="mt-4">
          作品のこと
        </Heading>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 md:mt-20">
          {products.map((p) => (
            <li key={p.slug}>
              <Link href={`/collection/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={p.images[0].src}
                    alt={p.images[0].alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h2 className="mt-5 text-[16px] leading-[1.8] tracking-[0.06em] transition-colors duration-300 group-hover:text-rose">
                  {p.name}
                </h2>
                <p className="mt-1 font-sans text-[13px] tracking-[0.08em] text-ink-soft">
                  {formatPrice(p.price)}
                </p>
                <span className="mt-3 inline-flex items-center gap-2 font-sans text-[13px] tracking-[0.14em] text-rose underline decoration-rose/40 underline-offset-4">
                  詳しく見る
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
