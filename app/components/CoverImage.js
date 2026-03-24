import Image from "next/image";
import {
  coverImageUnoptimized,
  isGoogleDriveCoverUrl,
  resolveCoverImageUrl,
} from "@/lib/cover-image";

/**
 * Ảnh bìa bài viết: Drive dùng <img> + thumbnail API; còn lại dùng next/image.
 */
export default function CoverImage({
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
            ? `absolute inset-0 h-full w-full object-cover ${className}`.trim()
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
      unoptimized={coverImageUnoptimized(resolved)}
    />
  );
}
