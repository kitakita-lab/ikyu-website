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
 *
 * トップページ・NEWS・EVENT の「次の出店」はすべてこの1か所を参照します。
 * 「イベント全体の開催日程」と「ikyuが出店する日」は別の項目に分けて書くこと
 * (イベントが複数日でも、ikyuの出店が一部の日だけの場合があるため)。
 */
export type UpcomingEvent = {
  name: string;
  /** ikyuが出店する日(ISO)。複数日のときは初日。表示の日付・datetime 属性に使う */
  exhibitDate: string; // 例: "2026-11-23"
  /** ikyuの出店が複数日のときの最終日(ISO)。1日だけなら書かない */
  exhibitEndDate?: string; // 例: "2026-11-23"
  /**
   * ikyuが出店する日の表記。一部の日だけなら「のみ」を必ず付ける
   * (「のみ」があると、イベント全体の日程と日にちの注意書きも併せて表示されます)
   */
  exhibitDateText: string; // 例: "11月23日(月)のみ"
  /** イベント全体の開催日程(主催者の日程)。ikyuの出店日と混同しない */
  eventDateText: string; // 例: "2026年11月22日(日)・23日(月)"
  status: "予定" | "確定";
  venue?: string; // 確定している場合のみ。例: "○○ホール(札幌市中央区)"
};

export const upcomingEvent: UpcomingEvent | null = {
  name: "サッポロモノヴィレッジ",
  exhibitDate: "2026-11-22",
  exhibitEndDate: "2026-11-23",
  exhibitDateText: "11月22日(日)・23日(月・祝)",
  eventDateText: "2026年11月22日(日)・23日(月・祝)",
  status: "予定",
};

/** ikyuの出店がイベントの一部の日だけか(exhibitDateText の「のみ」で判定する) */
export function isPartialExhibit(ev: UpcomingEvent): boolean {
  return ev.exhibitDateText.includes("のみ");
}

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
