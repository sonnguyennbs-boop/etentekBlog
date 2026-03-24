import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import CartLink from "./CartLink";
import { CartIcon, FolderIcon, MailIcon } from "./Icons";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/85">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm font-semibold tracking-tight text-foreground hover:opacity-90"
        >
          ETENTEK
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <Link href="/kham-pha" className="hover:text-foreground">
            <span className="inline-flex items-center gap-2">
              <CartIcon className="h-4 w-4" />
              Mua hàng
            </span>
          </Link>
          <Link href="/blog" className="hover:text-foreground">
            <span className="inline-flex items-center gap-2">
              <FolderIcon className="h-4 w-4" />
              Blog
            </span>
          </Link>
          <Link href="/lien-he" className="hover:text-foreground">
            <span className="inline-flex items-center gap-2">
              <MailIcon className="h-4 w-4" />
              Liên hệ
            </span>
          </Link>
          <CartLink />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

