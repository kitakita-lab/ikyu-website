import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Noto_Sans_JP,
  Zen_Old_Mincho,
} from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/features/JsonLd";
import { site } from "@/content/site";
import "./globals.css";

const zenOldMincho = Zen_Old_Mincho({
  weight: ["400", "500"],
  variable: "--font-zen-old-mincho",
  display: "swap",
  preload: false,
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  weight: ["400", "500"],
  variable: "--font-noto-sans-jp",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ikyu | 札幌のハンドメイドアクセサリー",
    template: "%s | ikyu",
  },
  description: site.description,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "ikyu",
    title: "ikyu | 札幌のハンドメイドアクセサリー",
    description: site.description,
    images: [
      {
        url: "/images/og.jpg",
        width: 1200,
        height: 630,
        alt: "ikyuのアクセサリー。ゴールドのネックレスやバングル、透明感のあるピアス",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#faf8f5",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ikyu",
  url: site.url,
  logo: `${site.url}/images/logo.png`,
  description: site.description,
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    addressCountry: site.address.country,
  },
  sameAs: [site.instagram.url, site.minne.url],
};

const webSiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ikyu",
  url: site.url,
  inLanguage: "ja",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${zenOldMincho.variable} ${cormorant.variable} ${notoSansJp.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-2 focus:font-sans focus:text-[13px] focus:text-base"
        >
          本文へスキップ
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={webSiteJsonLd} />
      </body>
    </html>
  );
}
