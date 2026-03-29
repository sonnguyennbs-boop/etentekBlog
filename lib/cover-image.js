const DRIVE_FILE_PATH = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
const DRIVE_ID_PARAM = /[?&]id=([a-zA-Z0-9_-]+)/;

/** Ảnh bìa host trên Google Drive — dùng <img> + thumbnail, tránh next/image & uc?export=view */
export function isGoogleDriveCoverUrl(src) {
  return typeof src === "string" && src.includes("drive.google.com");
}

/**
 * drive.google.com/thumbnail?id=… thường embed được; uc?export=view hay trả HTML.
 * Hỗ trợ link dạng /file/d/ID/… hoặc ?id=…
 */
export function resolveCoverImageUrl(src) {
  if (!src || typeof src !== "string") return src;
  if (src.includes("drive.google.com/thumbnail?")) return src;
  if (!src.includes("drive.google.com")) return src;
  let id = null;
  const m1 = src.match(DRIVE_FILE_PATH);
  const m2 = src.match(DRIVE_ID_PARAM);
  if (m1) id = m1[1];
  else if (m2) id = m2[1];
  if (!id) return src;
  return `https://drive.google.com/thumbnail?id=${id}&sz=w1920`;
}

export function coverImageUnoptimized(src) {
  if (!src || typeof src !== "string") return false;
  return (
    src.includes("googleusercontent.com") && !src.includes("drive.google.com")
  );
}

/** URL hiển thị trong lightbox: Drive thumbnail với sz lớn hơn; URL khác giữ nguyên sau resolve. */
export function resolveLightboxImageUrl(src) {
  const base = resolveCoverImageUrl(src);
  if (!base || typeof base !== "string") return base;
  if (!base.includes("drive.google.com/thumbnail")) return base;
  try {
    const u = new URL(base);
    u.searchParams.set("sz", "w4096");
    return u.toString();
  } catch {
    return base;
  }
}
