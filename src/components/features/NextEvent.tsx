import { ArrowLink } from "@/components/ui/ArrowLink";
import { isPartialExhibit, upcomingEvent } from "@/content/news";

/*
 * 「次の出店」の共通表示。データは src/content/news.ts の upcomingEvent だけを参照する
 * (トップ・EVENT・NEWS で同じ出店情報を別々に書かない)。
 *
 * - home:    トップページ用。日付を見せ場にし、出店日を一文で添える
 *            (出店が一部の日だけのときは、イベント全体の日程も併記する)
 * - compact: EVENT ページ末尾用。これまでの記録から「次」へつなぐ一行
 * 会場・時間など未確定の情報はここで補わない(NEWS の案内に委ねる)。
 */
type Props = { variant?: "home" | "compact" };

export function NextEvent({ variant = "home" }: Props) {
  const ev = upcomingEvent;
  if (!ev) return null;
  const [year, month, day] = ev.exhibitDate.split("-");
  const [endYear, endMonth, endDay] = ev.exhibitEndDate?.split("-") ?? [];
  // 複数日は「2026.11.22–23」。月や年をまたぐときだけ終わりの月・年も書く
  const endLabel = !ev.exhibitEndDate
    ? null
    : endYear !== year
      ? `${endYear}.${endMonth}.${endDay}`
      : endMonth !== month
        ? `${endMonth}.${endDay}`
        : endDay;

  const badge = (
    <span className="inline-block whitespace-nowrap border border-rose/50 px-2 py-0.5 font-sans text-[11px] tracking-[0.12em] text-rose">
      次の出店・{ev.status}
    </span>
  );

  if (variant === "compact") {
    return (
      <div>
        {badge}
        <p className="mt-3 text-[15px] leading-[2] tracking-[0.04em]">{ev.name}</p>
        <p className="text-[13px] leading-[2] tracking-[0.04em] text-ink-soft">
          ikyuの出店は
          {/* 複数日の出店は1つの datetime で表せないため time を使わない(初日だけと誤読されるのを防ぐ) */}
          {ev.exhibitEndDate ? (
            <span className="whitespace-nowrap">{ev.exhibitDateText}</span>
          ) : (
            <time dateTime={ev.exhibitDate} className="whitespace-nowrap">
              {ev.exhibitDateText}
            </time>
          )}
          です。
        </p>
        <div className="mt-3">
          <ArrowLink href="/news#next-event">出店のご案内</ArrowLink>
        </div>
      </div>
    );
  }

  return (
    <div className="border-y border-line py-7 md:py-8">
      {badge}
      <div className="mt-4 flex flex-wrap items-baseline gap-x-5 gap-y-1">
        {/* 日付を大きく。ここに載せるのは「ikyuが出店する日」だけ */}
        <span className="font-display text-[30px] leading-none tracking-[0.06em] md:text-[36px]">
          <time dateTime={ev.exhibitDate}>
            {year}.{month}.{day}
          </time>
          {endLabel && (
            <>
              –<time dateTime={ev.exhibitEndDate}>{endLabel}</time>
            </>
          )}
        </span>
        <span className="text-[15px] tracking-[0.06em]">{ev.name}</span>
      </div>
      <p className="mt-4 text-[13px] leading-[2] tracking-[0.04em] text-ink-soft">
        ikyuの出店は{ev.exhibitDateText}です。
        {isPartialExhibit(ev) && (
          <span className="block">イベント自体は{ev.eventDateText}に開催されます。</span>
        )}
      </p>
      <div className="mt-4">
        <ArrowLink href="/news#next-event">出店のご案内</ArrowLink>
      </div>
    </div>
  );
}
