import { categoryOrder } from "./post-config";

/**
 * @param {Array<{ category?: string, categorySlug?: string }>} posts
 */
export function getPostsGroupedByCategory(posts) {
  const map = new Map();
  for (const p of posts) {
    const slug = p.categorySlug || "khac";
    const label = p.category || "Khác";
    if (!map.has(slug)) {
      map.set(slug, { categorySlug: slug, category: label, posts: [] });
    }
    map.get(slug).posts.push(p);
  }

  const ordered = [];
  const seen = new Set();
  for (const slug of categoryOrder) {
    if (map.has(slug)) {
      ordered.push(map.get(slug));
      seen.add(slug);
    }
  }
  for (const [slug, group] of map.entries()) {
    if (!seen.has(slug)) ordered.push(group);
  }
  return ordered;
}
