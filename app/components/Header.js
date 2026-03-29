"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";
import CartLink from "./CartLink";
import {
  CartIcon,
  DownloadIcon,
  FolderIcon,
  MailIcon,
  MenuIcon,
} from "./Icons";

const SIDEBAR_ID = "etentek-nav-sidebar";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const navLinkClass =
    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-orange-50 hover:text-foreground dark:text-zinc-300 dark:hover:bg-orange-950/25 dark:hover:text-foreground";

  const tabWhenOpen = open ? undefined : -1;

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/90">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
            aria-expanded={open}
            aria-controls={SIDEBAR_ID}
            aria-label={open ? "Đóng menu" : "Mở menu"}
          >
            <MenuIcon className="h-5 w-5" />
          </button>

          <Link
            href="/"
            className="text-sm font-semibold tracking-tight text-foreground hover:opacity-90"
          >
            ETENTEK
          </Link>

          <div className="flex-1" />

          <ThemeToggle />
        </div>
      </header>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 top-14 z-40 bg-black/40 backdrop-blur-[1px] dark:bg-black/50"
          aria-label="Đóng menu"
          onClick={() => setOpen(false)}
        />
      ) : null}

      <aside
        id={SIDEBAR_ID}
        className={`fixed left-0 top-14 z-50 flex h-[calc(100dvh-3.5rem)] w-[min(17rem,88vw)] flex-col border-r border-zinc-200 bg-white shadow-lg transition-transform duration-200 ease-out dark:border-zinc-700 dark:bg-zinc-900 dark:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full pointer-events-none"
        }`}
        aria-hidden={!open}
      >
        <nav
          className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-4 pb-6"
          aria-label="Điều hướng chính"
        >
          <Link href="/kham-pha" tabIndex={tabWhenOpen} className={navLinkClass}>
            <CartIcon className="h-5 w-5 shrink-0" />
            Mua hàng
          </Link>
          <Link href="/blog" tabIndex={tabWhenOpen} className={navLinkClass}>
            <FolderIcon className="h-5 w-5 shrink-0" />
            Blog
          </Link>
          <Link href="/tai-xuong" tabIndex={tabWhenOpen} className={navLinkClass}>
            <DownloadIcon className="h-5 w-5 shrink-0" />
            Tải xuống
          </Link>
          <Link href="/lien-he" tabIndex={tabWhenOpen} className={navLinkClass}>
            <MailIcon className="h-5 w-5 shrink-0" />
            Liên hệ
          </Link>
          <div className="mt-2 border-t border-zinc-200 pt-2 dark:border-zinc-600/50">
            <CartLink
              tabIndex={tabWhenOpen}
              className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-orange-50 dark:text-zinc-300 dark:hover:bg-orange-950/25"
            />
          </div>
        </nav>
      </aside>
    </>
  );
}
