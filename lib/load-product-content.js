import "server-only";

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const PRODUCTS_DIR = path.join(process.cwd(), "content", "products");

function readProductFromDisk(id) {
  if (!fs.existsSync(PRODUCTS_DIR)) return null;

  // Tên file theo id: sp1.md, sp2.md, tt1.md...
  const file = path.join(PRODUCTS_DIR, `${id}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  return {
    id,
    title: data.title || id,
    excerpt: data.excerpt || "",
    content: content.trim(),
  };
}

export const getProductContentById = cache((id) =>
  readProductFromDisk(String(id))
);

