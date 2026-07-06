"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { nav, site } from "@/content/site";

/**
 * モバイル用の全画面メニュー。
 * native <dialog> を使うことでフォーカストラップと Esc 閉じを標準機能に任せる。
 */
export function MobileNav() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = useCallback(() => {
    dialogRef.current?.showModal();
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // dialog は Esc でも閉じるため、close イベント側で状態を同期する
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  // 背面スクロールを止める
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={show}
        aria-expanded={open}
        aria-haspopup="dialog"
        className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[7px] p-2"
      >
        <span className="sr-only">メニューを開く</span>
        <span aria-hidden="true" className="block h-px w-6 bg-ink" />
        <span aria-hidden="true" className="block h-px w-6 bg-ink" />
      </button>

      <dialog
        ref={dialogRef}
        aria-label="メニュー"
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-base text-ink backdrop:bg-transparent"
      >
        <div className="flex h-full flex-col px-8 py-5">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={close}
              className="-mr-2 flex h-11 w-11 items-center justify-center p-2 font-display text-2xl"
            >
              <span className="sr-only">メニューを閉じる</span>
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav aria-label="メインメニュー" className="mt-10">
            <ul className="space-y-7">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="group block"
                  >
                    <span className="font-display text-[22px] tracking-[0.22em] transition-colors duration-300 group-hover:text-rose">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-[12px] tracking-[0.1em] text-ink-soft">
                      {item.ja}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto border-t border-line pt-6 pb-2">
            <p className="text-[13px] leading-[1.9] text-ink-soft">
              {site.tagline}
            </p>
            <div className="mt-4 flex gap-8">
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[12px] tracking-[0.16em] text-rose"
              >
                Instagram
                <span className="sr-only">(外部サイトが開きます)</span>
              </a>
              <a
                href={site.minne.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[12px] tracking-[0.16em] text-rose"
              >
                minne
                <span className="sr-only">(外部サイトが開きます)</span>
              </a>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}
