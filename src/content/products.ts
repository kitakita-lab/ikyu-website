/**
 * COLLECTION に掲載する商品一覧。
 * 商品の追加はこの配列に1件足すだけです(ページ側の変更は不要)。
 *
 * ★★ 公開前に必ず差し替えること(現在はプレースホルダー)★★
 * - price: 正式な税込価格
 * - storesUrl: STORESの「商品個別ページ」のURL(ショップトップではない)
 * - name: 正式な作品名
 * - image: 商品写真(public/images に配置した実写。4:5推奨)
 */
export type Product = {
  /** 計測イベントに使う識別子(半角英数とハイフン) */
  slug: string;
  name: string;
  /** 税込価格(円) */
  price: number;
  image: string;
  alt: string;
  /** STORESの商品個別ページURL */
  storesUrl: string;
};

export const products: Product[] = [
  {
    slug: "flower-bangle",
    name: "flower bangle(フラワーバングル)",
    price: 3800, // ←確定済み(¥3,800 税込)
    image: "/images/product-bangles.webp",
    alt: "ヴィンテージのガラスの器に掛かる、押し花をとじこめた透明レジンとゴールドのバングル",
    // ★差し替え: STORESの商品個別ページURL
    storesUrl: "https://ikyu.stores.jp/items/XXXXXXXXXXXX",
  },
  {
    slug: "flower-ring",
    name: "flower ring(フラワーリング)",
    price: 3400, // ←確定済み(¥3,400 税込)
    image: "/images/product-ring.webp",
    alt: "窓からの光の筋の中、押し花をとじこめたレジンと細いゴールドのリングをつけた手元",
    // ★差し替え: STORESの商品個別ページURL
    storesUrl: "https://ikyu.stores.jp/items/XXXXXXXXXXXX",
  },
  {
    slug: "soap-bubble",
    name: "soap bubble",
    price: 3800, // ★差し替え: 「¥3,800以上」で正式決定した価格に
    image: "/images/product-cluster.webp",
    alt: "アクリルスタンドで揺れる、しゃぼん玉のように光をまとう透明ビーズのピアス",
    // ★差し替え: STORESの商品個別ページURL
    storesUrl: "https://ikyu.stores.jp/items/XXXXXXXXXXXX",
  },
  {
    slug: "neck-cuff",
    name: "ネックカフ",
    price: 5800, // ★差し替え: 最上位価格帯で正式決定した価格に
    image: "/images/about-hands.webp", // ★差し替え推奨: ネックカフ単体の商品写真
    alt: "光にかざした、ゴールドとシルバーのネックカフ",
    // ★差し替え: STORESの商品個別ページURL
    storesUrl: "https://ikyu.stores.jp/items/XXXXXXXXXXXX",
  },
];

/** 価格の表示形式(税込表記)を1箇所に集約 */
export function formatPrice(price: number): string {
  return `¥${price.toLocaleString("ja-JP")}(税込)`;
}
