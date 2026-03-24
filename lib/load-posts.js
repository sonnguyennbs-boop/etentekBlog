import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readAllPostsFromDisk() {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }
  const files = fs.readdirSync(POSTS_DIR).filter(
    (f) => f.endsWith(".md") && !/^readme\.md$/i.test(f)
  );
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const slug = data.slug || file.replace(/\.md$/, "");
    return {
      title: data.title || slug,
      slug,
      excerpt: data.excerpt || "",
      affiliateId: data.affiliateId || "sp1",
      category: data.category || "Khác",
      categorySlug: data.categorySlug || "khac",
      date: data.date ? String(data.date) : "",
      hero: data.hero || "default",
      coverImage: data.coverImage ? String(data.coverImage).trim() : "",
      highlights: Array.isArray(data.highlights) ? data.highlights : [],
      content: content.trim(),
    };
  });
  posts.sort((a, b) => {
    const da = new Date(a.date || 0).getTime();
    const db = new Date(b.date || 0).getTime();
    return db - da;
  });
  return posts;
}

export const getAllPosts = cache(readAllPostsFromDisk);

export function toPostMeta(post) {
  const { content: _c, ...meta } = post;
  return meta;
}

export const getAllPostMeta = cache(() => getAllPosts().map(toPostMeta));

export const getPostBySlug = cache((slug) =>
  getAllPosts().find((p) => p.slug === slug) ?? null
);

export const getAllSlugs = cache(() => getAllPosts().map((p) => p.slug));
