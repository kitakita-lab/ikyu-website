import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BuyButton } from "@/components/ui/BuyButton";
import { JsonLd } from "@/components/features/JsonLd";
import { products, getProduct, formatPrice } from "@/content/products";
import { site } from "@/content/site";

/*
 * 作品詳細ページ(全作品共通テンプレート)。
 * 役割は「作品を理解し、好きになってもらう」こと。決済はSTORESに任せる。
 * 構成: メイン写真→作品名→価格→説明→ギャラリー→サイズ→素材→購入ボタン。
 * 商品の追加は src/content/products.ts に1件足すだけで、このページが自動生成される。
 */

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/collection/${product.slug}` },
    openGraph: {
      title: `${product.name} | ikyu`,
      description: product.description,
      images: [{ url: product.images[0].src }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const [main, ...gallery] = product.images;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "TOP", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "COLLECTION",
        item: `${site.url}/collection`,
      },
      { "@type": "ListItem", position: 3, name: product.name },
    ],
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${site.url}${main.src}`,
    brand: { "@type": "Brand", name: "ikyu" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "JPY",
      url: product.storesUrl,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <Section space="compact">
      <Container width="narrow">
        {/* ① メイン写真 */}
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={main.src}
            alt={main.alt}
            fill
            priority
            sizes="(min-width: 800px) 720px, 100vw"
            className="object-cover"
          />
        </div>

        {/* ② 作品名 ③ 価格 */}
        <div className="mt-10">
          <Eyebrow>Collection</Eyebrow>
          <Heading as="h1" className="mt-4">
            {product.name}
          </Heading>
          <p className="mt-3 font-sans text-[14px] tracking-[0.08em] text-ink-soft">
            {formatPrice(product.price)}
          </p>
        </div>

        {/* ④ 作品説明(短く。物語はここに書かない) */}
        <p className="mt-8 text-[15px] leading-[2.4]">{product.description}</p>

        {/* ⑤ ギャラリー(2枚目以降がある場合のみ表示。工事中の枠は見せない) */}
        {gallery.length > 0 && (
          <div className="mt-12 grid grid-cols-2 gap-5 md:gap-8">
            {gallery.map((img) => (
              <div key={img.src} className="relative aspect-[4/5] w-full">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 800px) 360px, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* ⑥ サイズ ⑦ 素材 */}
        <dl className="mt-12 divide-y divide-line border-y border-line">
          <div className="flex gap-8 py-5">
            <dt className="w-20 shrink-0 font-sans text-[12px] tracking-[0.2em] text-ink-soft">
              サイズ
            </dt>
            <dd className="text-[14px] leading-[2] tracking-[0.04em]">
              {product.size}
            </dd>
          </div>
          <div className="flex gap-8 py-5">
            <dt className="w-20 shrink-0 font-sans text-[12px] tracking-[0.2em] text-ink-soft">
              素材
            </dt>
            <dd className="text-[14px] leading-[2] tracking-[0.04em]">
              {product.material}
            </dd>
          </div>
        </dl>

        {/* ⑧ STORESで購入する */}
        <div className="mt-12">
          <BuyButton href={product.storesUrl} item={product.slug} />
          <p className="mt-4 text-[12px] leading-[2] tracking-[0.06em] text-ink-soft">
            ご購入のお手続きは、STORESにて承ります。
          </p>
        </div>

        <div className="mt-16">
          <ArrowLink href="/collection">作品の一覧へ戻る</ArrowLink>
        </div>
      </Container>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={productJsonLd} />
    </Section>
  );
}
