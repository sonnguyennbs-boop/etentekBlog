import Link from "next/link";
import BlogPostsByCategory from "../components/BlogPostsByCategory";
import BlogTopicChips from "../components/BlogTopicChips";
import { getAllPostMeta } from "@/lib/load-posts";
import { getPostsGroupedByCategory } from "@/lib/group-posts";
import { ArrowRightIcon } from "../components/Icons";

export const metadata = {
  title: "Blog",
  description:
    "ETENTEK — bài viết về IoT, SCADA, PLC, HMI, Arduino, ESP và review đồ công nghệ.",
};

export default async function BlogPage() {
  const meta = await getAllPostMeta();
  const groups = getPostsGroupedByCategory(meta);

  return (
    <div className="mx-auto flex min-h-0 flex-1 flex-col px-4 py-12 sm:px-6 lg:max-w-3xl lg:px-8">
      <header className="mb-10">
        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-foreground">
            <span className="inline-flex items-center gap-2">
              <ArrowRightIcon className="h-4 w-4 rotate-180" />
              Trang chủ ETENTEK
            </span>
          </Link>
        </p>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
          ETENTEK
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
          Blog kỹ thuật & review
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          Nội dung xoay quanh{" "}
          <strong className="font-medium text-foreground">
            IoT, SCADA, PLC, HMI, Arduino, ESP
          </strong>{" "}
          và{" "}
          <strong className="font-medium text-foreground">
            review đồ công nghệ
          </strong>
          . Bài viết được{" "}
          <strong className="font-medium text-foreground">
            nhóm theo chủ đề
          </strong>{" "}
          (thư mục).
        </p>
        <BlogTopicChips
          availableSlugs={groups.map((g) => g.categorySlug)}
        />
      </header>
      <BlogPostsByCategory
        groups={groups}
        variant="cards"
        ariaLabel="Bài viết blog ETENTEK theo chủ đề"
      />
    </div>
  );
}
