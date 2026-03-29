"use client";

import { useEffect, useId } from "react";

export default function ImageLightboxOverlay({ open, onClose, fullSrc, alt }) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open || !fullSrc) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={alt ? titleId : undefined}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-[101] flex h-10 w-10 items-center justify-center rounded-full bg-zinc-800/90 text-xl text-white transition hover:bg-zinc-700"
        aria-label="Đóng"
      >
        ×
      </button>
      {alt ? (
        <span id={titleId} className="sr-only">
          {alt}
        </span>
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fullSrc}
        alt={alt ?? ""}
        className="max-h-[min(92vh,100%)] max-w-[min(96vw,100%)] object-contain shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
