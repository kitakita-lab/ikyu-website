import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-base-soft">
      <div className="mx-auto w-full max-w-[1080px] px-6 py-16 md:px-10 md:py-20">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <Image
              src="/images/logo.png"
              alt="ikyu handmade accessories"
              width={140}
              height={26}
              className="mix-blend-multiply"
            />
            <p className="mt-5 text-[14px] leading-[2.1]">{site.tagline}</p>
            <p className="mt-2 text-[12px] tracking-[0.08em] text-ink-soft">
              北海道札幌のハンドメイドアクセサリーブランド
            </p>
          </div>

          <div className="flex gap-16">
            <nav aria-label="フッターメニュー">
              <p className="font-display text-[12px] uppercase tracking-[0.24em] text-rose">
                Menu
              </p>
              <ul className="mt-4 space-y-3">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="font-sans text-[12px] tracking-[0.16em] transition-colors duration-300 hover:text-rose"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="font-display text-[12px] uppercase tracking-[0.24em] text-rose">
                Follow
              </p>
              <ul className="mt-4 space-y-3">
                <li>
                  <a
                    href={site.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[12px] tracking-[0.16em] transition-colors duration-300 hover:text-rose"
                  >
                    Instagram
                    <span className="sr-only">(外部サイトが開きます)</span>
                  </a>
                </li>
                <li>
                  <a
                    href={site.minne.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[12px] tracking-[0.16em] transition-colors duration-300 hover:text-rose"
                  >
                    minne
                    <span className="sr-only">(外部サイトが開きます)</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-14 text-[11px] tracking-[0.12em] text-ink-soft">
          © {new Date().getFullYear()} ikyu
        </p>
      </div>
    </footer>
  );
}
