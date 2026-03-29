"use client";

import { useCallback, useState } from "react";
import {
  resolveCoverImageUrl,
  resolveLightboxImageUrl,
} from "@/lib/cover-image";
import ImageLightboxOverlay from "./ImageLightboxOverlay";

export default function MarkdownImageLightbox({ src, alt, node: _node, ...rest }) {
  const [open, setOpen] = useState(false);
  const displaySrc = resolveCoverImageUrl(src);
  const fullSrc = resolveLightboxImageUrl(src);
  const close = useCallback(() => setOpen(false), []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-auto mt-4 block max-w-full cursor-zoom-in rounded-xl border-0 bg-transparent p-0 text-left ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        aria-label={alt ? `Xem ảnh lớn: ${alt}` : "Xem ảnh lớn"}
      >
        <img
          src={displaySrc || src}
          alt={alt ?? ""}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="max-w-full rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50"
          {...rest}
        />
      </button>
      <ImageLightboxOverlay
        open={open}
        onClose={close}
        fullSrc={fullSrc || displaySrc || src}
        alt={alt}
      />
    </>
  );
}
