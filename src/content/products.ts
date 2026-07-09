/**
 * COLLECTION の商品一覧と作品詳細ページのデータ。
 * 商品の追加はこの配列に1件足すだけで、一覧カードと
 * /collection/[slug] の詳細ページが自動生成されます。
 *
 * ★★ 公開前に必ず差し替えること(現在はプレースホルダー)★★
 * - storesUrl: STORESの「商品個別ページ」のURL(ショップトップではない)
 * - price: soap bubble / ネックカフ の正式価格
 * - size: 実測値(現在は「—」表示)
 * - material: 金具の正式表記(例: 真鍮・K16GP など)
 * - description: 作り手の言葉で要確認(下書きとして記載)
 * - images: 2枚目以降(別角度・着用・花のアップ)は撮影後に追加すると
 *   詳細ページのギャラリーが自動で現れます
 */
export type ProductImage = { src: string; alt: string };

export type Product = {
  /** URLと計測イベントに使う識別子(半角英数とハイフン) */
  slug: string;
  name: string;
  /** 税込価格(円) */
  price: number;
  /** 短い作品説明(2〜3文まで。ブランドストーリーは書かない) */
  description: string;
  /** 1枚目がメイン写真。2枚目以降はギャラリーに表示 */
  images: ProductImage[];
  /** サイズ表記(未計測は「—」) */
  size: string;
  /** 素材表記 */
  material: string;
  /** STORESの商品個別ページURL */
  storesUrl: string;
};

export const products: Product[] = [
  {
    slug: "flower-bangle",
    name: "flower bangle(フラワーバングル)",
    price: 3800, // ←確定済み(¥3,800 税込)
    description:
      "腕もとでゆれる一本のラインに、押し花をとじこめました。金属の光と花の色が、袖口からのぞくたびに小さく華やぎます。", // ★要確認: 作り手の言葉に直してください
    images: [
      {
        src: "/images/product-bangles.webp",
        alt: "ヴィンテージのガラスの器に掛かる、押し花をとじこめた透明レジンとゴールドのバングル",
      },
      // ★撮影後に追加: 着用写真・花のアップなど
    ],
    size: "—", // ★差し替え: 例)内径 約6cm
    material: "ドライフラワー / レジン / 金属パーツ", // ★差し替え: 金具の正式表記
    storesUrl: "https://ikyu.stores.jp/items/XXXXXXXXXXXX", // ★差し替え
  },
  {
    slug: "flower-ring",
    name: "flower ring(フラワーリング)",
    price: 3400, // ←確定済み(¥3,400 税込)
    description:
      "指先にともる、小さな花あかり。細いラインが肌になじみ、レジンの中の花が日常の光をすくいあげます。", // ★要確認
    images: [
      {
        src: "/images/product-ring.webp",
        alt: "窓からの光の筋の中、押し花をとじこめたレジンと細いゴールドのリングをつけた手元",
      },
    ],
    size: "—", // ★差し替え: 例)フリーサイズ(10号前後で調整可)
    material: "ドライフラワー / レジン / 金属パーツ", // ★差し替え
    storesUrl: "https://ikyu.stores.jp/items/XXXXXXXXXXXX", // ★差し替え
  },
  {
    slug: "soap-bubble",
    name: "soap bubble",
    price: 3800, // ★差し替え: 「¥3,800以上」で正式決定した価格に
    description:
      "しゃぼん玉のように光をまとう、透明ビーズのピアス。角度ごとに表情を変えるきらめきが、耳もとで静かにゆれます。", // ★要確認
    images: [
      {
        src: "/images/product-cluster.webp",
        alt: "アクリルスタンドで揺れる、しゃぼん玉のように光をまとう透明ビーズのピアス",
      },
    ],
    size: "—", // ★差し替え: 例)全長 約3cm
    material: "ガラスビーズ / 金属パーツ", // ★差し替え
    storesUrl: "https://ikyu.stores.jp/items/XXXXXXXXXXXX", // ★差し替え
  },
  {
    slug: "neck-cuff",
    name: "ネックカフ",
    price: 5800, // ★差し替え: 最上位価格帯で正式決定した価格に
    description:
      "首もとに、すっと一本の光を添えるネックカフ。シンプルな装いの日ほど、静かに主役になります。", // ★要確認
    images: [
      {
        src: "/images/about-hands.webp", // ★差し替え推奨: ネックカフ単体の商品写真
        alt: "光にかざした、ゴールドとシルバーのネックカフ",
      },
    ],
    size: "—", // ★差し替え
    material: "金属パーツ / レジン", // ★差し替え
    storesUrl: "https://ikyu.stores.jp/items/XXXXXXXXXXXX", // ★差し替え
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

/** 価格の表示形式(税込表記)を1箇所に集約 */
export function formatPrice(price: number): string {
  return `¥${price.toLocaleString("ja-JP")}(税込)`;
}
