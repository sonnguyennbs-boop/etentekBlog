"use client";

import { useCallback, useState } from "react";

/** Mỗi nhãn → slug thư mục nội dung (trùng categorySlug trong frontmatter) */
const TOPICS = [
  { label: "IoT", slug: "iot-esp" },
  { label: "SCADA", slug: "scada-hmi" },
  { label: "PLC", slug: "scada-hmi" },
  { label: "HMI", slug: "scada-hmi" },
  { label: "Arduino", slug: "arduino" },
  { label: "ESP", slug: "iot-esp" },
  { label: "Review công nghệ", slug: "review-cong-nghe" },
];

/**
 * @param {{ availableSlugs?: string[] }} props
 */
export default function BlogTopicChips({ availableSlugs = [] }) {
  const [activeSlug, setActiveSlug] = useState(null);
  const available = new Set(availableSlugs);

  const goToCategory = useCallback((slug) => {
    setActiveSlug(slug);
    window.dispatchEvent(
      new CustomEvent("blog-focus-category", { detail: { categorySlug: slug } }),
    );
    requestAnimationFrame(() => {
      document
        .getElementById(`blog-cat-${slug}`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <ul
      className="mt-5 flex flex-wrap gap-2"
      aria-label="Chuyển nhanh giữa các chủ đề nội dung"
      role="tablist"
    >
      {TOPICS.map(({ label, slug }) => {
        const exists = available.has(slug);
        const isActive = activeSlug === slug;
        return (
          <li key={`${label}-${slug}`} role="presentation">
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              disabled={!exists}
              onClick={() => goToCategory(slug)}
              className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                !exists
                  ? "cursor-not-allowed border-zinc-100 bg-zinc-50/50 text-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/30 dark:text-zinc-600"
                  : isActive
                    ? "border-orange-400 bg-orange-500/15 text-orange-800 dark:border-orange-600 dark:bg-orange-500/20 dark:text-orange-300"
                    : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-orange-300 hover:bg-orange-50/60 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-orange-700 dark:hover:bg-orange-950/20"
              }`}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
