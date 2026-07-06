export type NewsCategory = "お知らせ" | "出店情報" | "新作";

export type NewsPost = {
  slug: string;
  /** YYYY-MM-DD */
  date: string;
  category: NewsCategory;
  title: string;
  /** 段落ごとの配列 */
  body: string[];
  /** 出店情報のとき任意で設定(構造化データに使用) */
  event?: {
    name: string;
    startDate: string; // ISO 8601
    endDate: string; // ISO 8601
    venue: string;
    addressLocality: string;
  };
};

/**
 * お知らせの追加はこの配列の先頭に足すだけです(新しい順)。
 * slug は URL になります(半角英数とハイフン)。
 */
export const news: NewsPost[] = [
  {
    slug: "website-launch",
    date: "2026-07-06",
    category: "お知らせ",
    title: "公式サイトを公開しました",
    body: [
      "ikyuの公式サイトをご覧いただき、ありがとうございます。",
      "ブランドに込めた想いのこと、作品のこと、お手入れと修理のこと。ikyuのすべてを、この場所にまとめました。ゆっくりご覧いただけたらうれしいです。",
      "出店のご案内や新作のお知らせは、このNEWSとInstagramでお届けしていきます。これからもikyuを、どうぞよろしくお願いいたします。",
    ],
  },
];

export function getPost(slug: string): NewsPost | undefined {
  return news.find((p) => p.slug === slug);
}

export function formatDate(date: string): string {
  const [y, m, d] = date.split("-");
  return `${y}.${m}.${d}`;
}
