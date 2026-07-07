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
 * 「次の出店」常設枠。決まったら値を入れ、終わったら null に戻します。
 * null のあいだは「準備中」の文言が表示されます(空白ではなく約束を見せる)。
 * status は「予定」と「確定」を必ず区別すること(確定していないものを確定と書かない)。
 */
export const upcomingEvent: {
  name: string;
  dateText: string; // 例: "2026年11月22日・23日"
  status: "予定" | "確定";
  venue?: string; // 確定している場合のみ。例: "○○ホール(札幌市中央区)"
} | null = {
  name: "サッポロモノヴィレッジ",
  dateText: "2026年11月22日・23日",
  status: "予定",
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
      "ブランドに込めた想いのこと、作品のこと、お手入れとお直しのこと。ikyuのすべてを、この場所にまとめました。ゆっくりご覧いただけたらうれしいです。",
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
