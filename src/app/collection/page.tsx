import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { BuyButton } from "@/components/ui/BuyButton";
import { products, formatPrice } from "@/content/products";

/*
 * COLLECTION = Instagram→HP→STORES の購入導線を観測するための最小ページ。
 * 構成は「タイトル+商品グリッド」のみ。読み物・特集はここに足さない
 * (ブランド体験はTOP/ABOUTが担い、決済はSTORESが担う)。
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
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={p.image}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <h2 className="mt-5 text-[16px] leading-[1.8] tracking-[0.06em]">
                {p.name}
              </h2>
              <p className="mt-1 font-sans text-[13px] tracking-[0.08em] text-ink-soft">
                {formatPrice(p.price)}
              </p>
              <div className="mt-5">
                <BuyButton href={p.storesUrl} item={p.slug} />
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
