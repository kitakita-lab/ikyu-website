"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

/*
 * スマホ専用ボトムナビゲーション。
 *
 * 設計思想:
 * - 濃茶の板ではなく「生成りのすりガラス」。ikyuの透明感を UI そのもので表現し、
 *   写真の上に浮いても世界観を遮らない
 * - アイコンは細線(1.25px)。COLLECTION は「花」= 作品の象徴
 * - 購入導線は意図的に置かない(再設計中)。将来 STORES / 独自EC を追加する場合は
 *   下の items 配列に1件足すだけ(5項目までは grid が自動で均等割りする)
 *   例: { href: "https://ikyu.stores.jp", label: "STORE", icon: BagIcon, external: true }
 */

type Item = {
  href: string;
  label: string;
  icon: (props: { className?: string }) => React.ReactNode;
  external?: boolean;
  /** アクティブ判定(外部リンクは undefined) */
  isActive?: (pathname: string) => boolean;
};

function HomeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 11.2 12 4.8l7.5 6.4" />
      <path d="M6.8 10.2v8.6h10.4v-8.6" />
    </svg>
  );
}

function FlowerIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <circle cx="12" cy="12" r="2.1" />
      <ellipse cx="12" cy="6.6" rx="2.4" ry="3" />
      <ellipse cx="12" cy="6.6" rx="2.4" ry="3" transform="rotate(72 12 12)" />
      <ellipse cx="12" cy="6.6" rx="2.4" ry="3" transform="rotate(144 12 12)" />
      <ellipse cx="12" cy="6.6" rx="2.4" ry="3" transform="rotate(216 12 12)" />
      <ellipse cx="12" cy="6.6" rx="2.4" ry="3" transform="rotate(288 12 12)" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    >
      <rect x="4.7" y="4.7" width="14.6" height="14.6" rx="4.4" />
      <circle cx="12" cy="12" r="3.4" />
      <circle cx="16.6" cy="7.4" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ContactIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4.2" y="6" width="15.6" height="12" rx="1.6" />
      <path d="m5 7.2 7 5.6 7-5.6" />
    </svg>
  );
}

const items: Item[] = [
  {
    href: "/",
    label: "HOME",
    icon: HomeIcon,
    isActive: (p) => p === "/",
  },
  {
    href: "/collection",
    label: "COLLECTION",
    icon: FlowerIcon,
    isActive: (p) => p.startsWith("/collection"),
  },
  {
    href: site.instagram.url,
    label: "INSTAGRAM",
    icon: InstagramIcon,
    external: true,
  },
  {
    href: "/contact",
    label: "CONTACT",
    icon: ContactIcon,
    isActive: (p) => p.startsWith("/contact"),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="クイックメニュー"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line/70 bg-base/85 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul
        className="grid"
        style={{ gridTemplateColumns: `repeat(${items.length}, 1fr)` }}
      >
        {items.map((item) => {
          const active = item.isActive?.(pathname) ?? false;
          const cls = `flex min-h-[52px] flex-col items-center justify-center gap-1 pt-2 pb-1.5 transition-colors duration-300 ${
            active ? "text-rose" : "text-ink-soft"
          }`;
          const Icon = item.icon;
          const inner = (
            <>
              <Icon className="h-[21px] w-[21px]" />
              <span className="font-sans text-[9px] tracking-[0.14em]">
                {item.label}
              </span>
            </>
          );
          return (
            <li key={item.href}>
              {item.external ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cls}
                >
                  {inner}
                  <span className="sr-only">(外部サイトが開きます)</span>
                </a>
              ) : (
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cls}
                >
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
