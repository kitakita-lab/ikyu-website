/**
 * イベント実績の一覧。新しいイベントは配列の先頭に1件追加するだけで
 * /events ページに同じテンプレートで表示されます。
 *
 * 掲載ルール:
 * - 事実のみを書く(数字・会期・会場は主催者確認済みのものだけ)
 * - クライアント企業名・営業数値・内部情報は載せない
 * - 写真は「他社ロゴを枠外にトリミング」+「一般参加者の顔はぼかし縁の
 *   控えめなモザイク加工」を済ませたものだけを public/images に置くこと
 *   (スタッフ・後ろ姿・マスク着用で顔が判別できない方は加工不要)
 */
export type EventPhoto = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type BrandEvent = {
  slug: string;
  name: string;
  dateText: string;
  venue: string;
  /** 1文の導入 */
  lead: string;
  /** 本文(2段落まで。営業レポートにしない) */
  body: string[];
  /** 参加者の声(任意・1つまで) */
  quote?: string;
  /** ちいさな記録(数字は事実のみ) */
  record: { label: string; value: string }[];
  /** 写真(空なら文章のみで表示される) */
  photos: EventPhoto[];
  credit: string;
};

export const events: BrandEvent[] = [
  {
    slug: "ario-sapporo-2026-08",
    name: "フラワーボトル ワークショップ",
    dateText: "2026年8月1日(土)〜3日(月)",
    venue: "アリオ札幌 1F 特設スペース",
    lead: "季節のドライフラワーから好きな花を選び、小さなガラスボトルに詰める——「自分だけの一本」をつくる3日間でした。",
    body: [
      "はじめての方でも、所要時間は10〜15分ほど。テーブルのかごから一輪ずつ花を選ぶうちに、同じ花材からまったく違う一本が生まれていきます。3日間で117組・283名の方にご参加いただき、235本のフラワーボトルが生まれました。",
      "店頭のラベンダーに惹かれてお一人で立ち寄り、「ラベンダーだけの一本」をじっくり仕上げた方。ご家族で参加したあと、併設のアクセサリー展示までゆっくりご覧くださった方。花をきっかけにInstagramでつながり、「ハンドメイドイベントにも行きます」と言ってくださった方もいました。",
    ],
    quote: "有料でも参加したいくらい、楽しかった。",
    record: [
      { label: "参加", value: "117組・283名" },
      { label: "生まれた一本", value: "フラワーボトル 235本" },
      { label: "参加費", value: "無料(所要 約10〜15分)" },
    ],
    photos: [
      {
        src: "/images/event-ario-booth.webp",
        alt: "アリオ札幌のikyuブース。フラワーボトルワークショップのバナーの下に、花材の瓶が並ぶ体験テーブルとドライフラワーの展示",
        width: 1400,
        height: 1601,
      },
      {
        src: "/images/event-ario-workshop.webp",
        alt: "テーブルを囲み、かごの花材からフラワーボトルをつくる参加者のみなさん",
        width: 618,
        height: 640,
      },
      {
        src: "/images/event-ario-display.webp",
        alt: "ワークショップに併設したikyuアクセサリーの展示。絨毯の上に、ピアスやリングとドライフラワーが並ぶ",
        width: 1367,
        height: 774,
      },
    ],
    credit: "企画・運営:KitaKita Lab/併設:ikyu ハンドメイドアクセサリー展示",
  },
  {
    slug: "chikaho-2026-06",
    name: "フラワーボトル ワークショップ体験会",
    dateText: "2026年6月19日(金)〜21日(日)",
    venue: "チカホ 北三条広場(札幌駅前通地下歩行空間)",
    lead: "札幌のまちの地下歩行空間で、通りがかりにふらっと立ち寄れるフラワーボトルづくりの3日間でした。",
    body: [
      "公共の空間ならではの開かれた場所で、親子連れからお一人での参加まで、幅広い方が花を選びに来てくださいました。3日間で生まれたフラワーボトルは220本。併設で、ikyuのアクセサリー展示も行いました。",
    ],
    record: [
      { label: "生まれた一本", value: "フラワーボトル 220本" },
      { label: "参加費", value: "無料" },
    ],
    photos: [
      {
        src: "/images/event-chikaho-booth.webp",
        alt: "チカホ北三条広場のikyuブース。かごいっぱいのドライフラワーと花材の小瓶、アクセサリーの展示台",
        width: 1600,
        height: 1200,
      },
      {
        src: "/images/event-chikaho-venue.webp",
        alt: "地下歩行空間の会場のようす。大きなスクリーンの前で、テーブルを囲んでフラワーボトルづくりに参加するみなさん",
        width: 1600,
        height: 816,
      },
      {
        src: "/images/event-chikaho-hands.webp",
        alt: "かごから選んだドライフラワーを、はさみで整えてガラスの小瓶に詰めていく参加者の手元",
        width: 1400,
        height: 1710,
      },
    ],
    credit: "企画・運営:KitaKita Lab",
  },
];
