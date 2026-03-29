import Link from "next/link";
import { getAllDownloadCategories } from "@/lib/downloads";
import { ArrowRightIcon, ExternalLinkIcon } from "../components/Icons";

export const metadata = {
  title: "Tải xuống",
  description:
    "ETENTEK — tài liệu, phần mềm và tài nguyên tải xuống theo từng danh mục (liên kết Google Drive và khác).",
};

export default function TaiXuongPage() {
  const categories = getAllDownloadCategories();

  return (
    <div className="mx-auto flex min-h-0 min-w-0 flex-1 flex-col px-4 py-12 sm:px-6 lg:max-w-3xl lg:px-8">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-foreground">
          <span className="inline-flex items-center gap-2">
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            Trang chủ ETENTEK
          </span>
        </Link>
      </p>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
        Tải xuống
      </h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Tài nguyên được phân loại theo nhóm. Chọn mục để mở liên kết (thường là Google
        Drive) trong tab mới.
      </p>

      <div className="mt-10 space-y-4">
        {categories.map((cat) => (
          <details
            key={cat.id}
            id={`download-cat-${cat.id}`}
            className="group rounded-2xl border border-zinc-200 bg-white open:shadow-sm dark:border-zinc-700 dark:bg-zinc-900/45"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-5 py-4 font-semibold text-foreground transition-colors marker:content-none hover:bg-zinc-50 dark:hover:bg-zinc-800/40 [&::-webkit-details-marker]:hidden">
              <span>{cat.title}</span>
              <span className="shrink-0 text-zinc-400 transition-transform group-open:rotate-180 dark:text-zinc-500">
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </summary>

            <div className="border-t border-zinc-100 px-5 pb-5 pt-3 dark:border-zinc-700/80">
              {cat.description ? (
                <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
                  {cat.description}
                </p>
              ) : null}

              {cat.items?.length ? (
                <ul className="flex flex-col gap-2">
                  {cat.items.map((item, idx) => (
                    <li key={`${cat.id}-${idx}`}>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50/80 px-4 py-3 text-sm transition-colors hover:border-orange-200 hover:bg-orange-50/60 dark:border-zinc-700/80 dark:bg-zinc-950/30 dark:hover:border-orange-900/50 dark:hover:bg-orange-950/20"
                      >
                        <ExternalLinkIcon className="mt-0.5 h-4 w-4 shrink-0 text-orange-600 dark:text-orange-400" />
                        <span className="min-w-0 flex-1">
                          <span className="font-medium text-foreground">
                            {item.title}
                          </span>
                          {item.description ? (
                            <span className="mt-1 block text-xs text-zinc-600 dark:text-zinc-400">
                              {item.description}
                            </span>
                          ) : null}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic text-zinc-500 dark:text-zinc-400">
                  Chưa có mục trong danh mục này — thêm trong{" "}
                  <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                    lib/downloads.js
                  </code>
                  .
                </p>
              )}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
