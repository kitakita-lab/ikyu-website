/**
 * サイト全体の基本情報。
 * URL・アカウント・文言の変更はこのファイルだけで完結します。
 */
export const site = {
  name: "ikyu",
  tagline: "暮らしに花が咲きますように。",
  description:
    "ikyu(イキュウ)は、北海道札幌のハンドメイドアクセサリーブランド。生花から育てたドライフラワーや透明感のある素材を、ひとつずつ手しごとで仕上げています。暮らしに花が咲きますように。",
  /** 本番ドメイン確定後は環境変数 NEXT_PUBLIC_SITE_URL で上書きしてください */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ikyu-website.vercel.app",
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

export const nav = [
  { href: "/about", label: "ABOUT", ja: "ikyuとつくり手のこと" },
  { href: "/collection", label: "COLLECTION", ja: "作品のこと" },
  { href: "/news", label: "NEWS", ja: "お知らせ・出店情報" },
  { href: "/care", label: "CARE", ja: "お手入れとお直しのこと" },
  { href: "/contact", label: "CONTACT", ja: "お問い合わせ" },
] as const;
