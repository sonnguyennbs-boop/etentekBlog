import Image from "next/image";
import { isGoogleDriveCoverUrl, resolveCoverImageUrl } from "@/lib/cover-image";

/** next/image hoặc <img> (Drive) — dùng cho sản phẩm, gallery */
export default function DriveAwareImage({
  src,
  alt,
  fill,
  className = "",
  sizes,
  priority = false,
}) {
  const resolved = resolveCoverImageUrl(src);

  if (isGoogleDriveCoverUrl(src)) {
    return (
      <img
        src={resolved}
        alt={alt}
        className={
          fill
            ? `absolute inset-0 h-full w-full ${className}`.trim()
            : className
        }
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        referrerPolicy="no-referrer"
      />
    );
  }

  return (
    <Image
      src={resolved}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      unoptimized
    />
  );
}
