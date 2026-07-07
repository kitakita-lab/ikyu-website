"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-base/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-[1080px] items-center justify-between px-6 md:px-10">
        <Link
          href="/"
          className="shrink-0"
          aria-label="ikyu ホームへ戻る"
        >
          {/* ロゴは透過PNG(文字色=ink)。ブレンドに頼らず素直に載せる */}
          <Image
            src="/images/logo.png"
            alt="ikyu handmade accessories"
            width={122}
            height={23}
            priority
          />
        </Link>

        <nav aria-label="メインメニュー" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-sans text-[12px] tracking-[0.2em] transition-colors duration-300 hover:text-rose ${
                      active
                        ? "border-b border-rose pb-1 text-rose"
                        : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
