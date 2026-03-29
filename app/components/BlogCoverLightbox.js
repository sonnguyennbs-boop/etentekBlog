"use client";

import { useCallback, useState } from "react";
import { resolveLightboxImageUrl } from "@/lib/cover-image";
import CoverImage from "./CoverImage";
import ImageLightboxOverlay from "./ImageLightboxOverlay";

export default function BlogCoverLightbox({
  src,
  alt,
  sizes,
  priority = false,
  heroClassName,
}) {
  const [open, setOpen] = useState(false);
  const fullSrc = src ? resolveLightboxImageUrl(src) : "";
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70">
        {src ? (
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="absolute inset-0 block cursor-zoom-in border-0 bg-transparent p-0 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ring-offset-background"
            aria-label={`Xem ảnh bìa đầy đủ: ${alt}`}
          >
            <CoverImage
              src={src}
              alt={alt}
              fill
              className="object-cover"
              sizes={sizes}
              priority={priority}
            />
          </button>
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${heroClassName}`} />
        )}
      </div>
      <ImageLightboxOverlay
        open={open}
        onClose={close}
        fullSrc={fullSrc}
        alt={alt}
      />
    </>
  );
}
