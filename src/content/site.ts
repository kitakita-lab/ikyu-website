import type { Metadata } from "next";

/**
 * サイト全体の基本情報。
 * URL・アカウント・文言の変更はこのファイルだけで完結します。
 */
export const site = {
  name: "ikyu",
  tagline: "暮らしに花が咲きますように。",
  description:
    "ikyu(イキュウ)は、北海道札幌のハンドメイドアクセサリーブランド。生花から育てたドライフラワーや透明感のある素材を、ひとつずつ手しごとで仕上げています。暮らしに花が咲きますように。",
  /** 正規URL(wwwなし)。環境変数 NEXT_PUBLIC_SITE_URL で上書きできます */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ikyumakes.com",
  instagram: {
    handle: "___ikyu___",
    url: "https://www.instagram.com/___ikyu___",
    /** Instagram DM への公式ディープリンク */
    dmUrl: "https://ig.me/m/___ikyu___",
  },
  minne: {
    url: "https://minne.com/@ikyu-0116",
  },
  address: {
    locality: "札幌市",
    region: "北海道",
    country: "JP",
  },
} as const;

/** 共有時に使う既定のOGP画像 */
export const ogImage = {
  url: "/images/og.jpg",
  width: 1200,
  height: 630,
  alt: "白い布を背景に、アクリルスタンドで揺れるikyuのピアス。金の花びらと白い小花、細いゴールドのライン",
} as const;

/** 全ページ共通のOGP既定値 */
export const openGraphDefaults = {
  type: "website",
  locale: "ja_JP",
  siteName: site.name,
  images: [ogImage],
} satisfies Metadata["openGraph"];

/**
 * ページ固有の正規URLを canonical と og:url の両方に与える。
 *
 * パスは相対のまま渡す。layout.tsx の metadataBase(= site.url) が絶対URLへ解決するため、
 * ページ側にドメインを書かずに済み、ドメイン変更は site.url の1箇所で完結する。
 * Next.js は openGraph をページ側で上書きすると継承しないので、既定値をここで土台にする。
 */
export function pageMetadata(
  path: string,
  openGraph: Metadata["openGraph"] = {},
): Pick<Metadata, "alternates" | "openGraph"> {
  return {
    alternates: { canonical: path },
    openGraph: { ...openGraphDefaults, url: path, ...openGraph },
  };
}

export const nav = [
  { href: "/about", label: "ABOUT", ja: "ikyuとつくり手のこと" },
  { href: "/collection", label: "COLLECTION", ja: "作品のこと" },
  { href: "/news", label: "NEWS", ja: "お知らせ・出店情報" },
  { href: "/events", label: "EVENT", ja: "イベントのこと" },
  { href: "/care", label: "CARE", ja: "お手入れとお直しのこと" },
  { href: "/contact", label: "CONTACT", ja: "お問い合わせ" },
] as const;
