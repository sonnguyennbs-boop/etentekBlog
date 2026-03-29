"use client";

import { ChevronUpIcon } from "./Icons";

export default function ScrollToTopButton() {
  return (
    <button
      type="button"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="pointer-events-auto fixed bottom-5 left-1/2 z-40 -translate-x-1/2 rounded-full border border-zinc-200/50 bg-white/60 p-2 text-zinc-400 opacity-40 shadow-sm backdrop-blur-sm transition hover:border-zinc-300/80 hover:opacity-90 hover:text-zinc-700 dark:border-zinc-600/40 dark:bg-zinc-900/60 dark:text-zinc-500 dark:hover:text-zinc-200"
      aria-label="Lên đầu trang"
    >
      <ChevronUpIcon className="h-7 w-7" />
    </button>
  );
}
