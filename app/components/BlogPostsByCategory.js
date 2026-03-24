"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PostCard from "./PostCard";
import { FolderIcon } from "./Icons";

/**
 * @param {Array<{ categorySlug: string, category: string, posts: Array }>} groups
 * @param {"list" | "cards"} variant
 */
export default function BlogPostsByCategory({
  groups,
  variant = "list",
  ariaLabel = "Danh sách bài viết theo chủ đề",
}) {
  const safe = useMemo(() => groups ?? [], [groups]);
  const [openFolders, setOpenFolders] = useState(() =>
    Object.fromEntries((groups ?? []).map((g) => [g.categorySlug, true]))
  );

  const toggleFolder = (slug) => {
    setOpenFolders((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  useEffect(() => {
    const onFocus = (e) => {
      const slug = e?.detail?.categorySlug;
      if (!slug || !safe.some((g) => g.categorySlug === slug)) return;
      setOpenFolders((prev) => ({ ...prev, [slug]: true }));
    };
    window.addEventListener("blog-focus-category", onFocus);
    return () => window.removeEventListener("blog-focus-category", onFocus);
  }, [safe]);

  if (safe.length === 0) {
    return (
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Chưa có bài viết. Thêm file <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">.md</code> trong{" "}
        <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">content/posts/</code>{" "}
        (xem <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">content/BLOG-AUTHORING.md</code>).
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4" aria-label={ariaLabel}>
      {safe.map((group) => {
        const open = openFolders[group.categorySlug] !== false;
        return (
          <section
            key={group.categorySlug}
            id={`blog-cat-${group.categorySlug}`}
            className="scroll-mt-24 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900"
          >
            <button
              type="button"
              onClick={() => toggleFolder(group.categorySlug)}
              className="flex w-full min-h-[48px] items-center gap-3 border-b border-zinc-100 bg-zinc-50/80 px-4 py-3 text-left dark:border-zinc-800 dark:bg-zinc-800/40"
              aria-expanded={open}
            >
              <FolderIcon className="h-5 w-5 text-zinc-700 dark:text-zinc-200" />
              <span className="flex-1 font-semibold text-foreground">
                {group.category}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">
                {group.posts.length} bài
              </span>
              <span className="text-zinc-400" aria-hidden>
                {open ? "▾" : "▸"}
              </span>
            </button>
            {open &&
              (variant === "cards" ? (
                <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5">
                  {group.posts.map((post) => (
                    <PostCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <ul className="divide-y divide-zinc-100 dark:divide-zinc-800">
                  {group.posts.map((post) => (
                    <li key={post.slug}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="block px-4 py-3 transition-colors hover:bg-orange-50/60 dark:hover:bg-orange-950/20"
                      >
                        <span className="font-medium text-foreground">
                          {post.title}
                        </span>
                        {post.excerpt ? (
                          <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                            {post.excerpt}
                          </p>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              ))}
          </section>
        );
      })}
    </div>
  );
}
