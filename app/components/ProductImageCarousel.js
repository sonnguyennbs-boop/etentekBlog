"use client";

import { useState } from "react";
import DriveAwareImage from "./DriveAwareImage";

export default function ProductImageCarousel({
  images,
  productName,
}) {
  const safeImages = Array.isArray(images) ? images.filter(Boolean) : [];
  const [idx, setIdx] = useState(0);

  const max = safeImages.length;
  const current = safeImages[idx] ?? safeImages[0];

  const prev = () => {
    if (max <= 1) return;
    setIdx((p) => (p - 1 + max) % max);
  };

  const next = () => {
    if (max <= 1) return;
    setIdx((p) => (p + 1) % max);
  };

  if (!current) return null;

  return (
    <div className="relative h-[260px] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800">
      <DriveAwareImage
        src={current}
        alt={productName}
        fill
        sizes="(max-width: 1024px) 100vw, 768px"
        className="object-contain bg-zinc-50 dark:bg-zinc-900"
        priority={idx === 0}
      />

      {max > 1 ? (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Ảnh trước"
            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/45"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Ảnh sau"
            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur transition-colors hover:bg-black/45"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center">
            <span className="rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {idx + 1}/{max}
            </span>
          </div>
        </>
      ) : null}
    </div>
  );
}

