import Link from "next/link";
import { ArrowRightIcon } from "./components/Icons";
import { getAllPostMeta } from "@/lib/load-posts";
import PostCard from "./components/PostCard";
import CTAButton from "./components/CTAButton";

export default async function Home() {
  const all = await getAllPostMeta();
  const featured = all.slice(0, 2);

  return (
    <div className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-3xl flex-col px-4 py-14 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-200 bg-white/80 p-8 shadow-sm backdrop-blur dark:border-zinc-700 dark:bg-zinc-900/55">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
            ETENTEK · IoT · SCADA · PLC · HMI · Arduino · ESP
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Blog kỹ thuật & review công nghệ
          </h1>

          <div className="mt-8 flex flex-wrap gap-3">
            <CTAButton href="/blog">Vào blog ETENTEK</CTAButton>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              Bài viết nổi bật
            </h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Hai bài mới nhất (theo <code className="text-xs">date</code> trong frontmatter).
            </p>
          </div>
          <Link
            href="/blog"
            className="text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
          >
            <span className="inline-flex items-center gap-2">
              Xem tất cả
              <ArrowRightIcon className="h-4 w-4" />
            </span>
          </Link>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {featured.length === 0 ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400 sm:col-span-2">
              Chưa có bài. Thêm file trong <code className="rounded bg-zinc-100 px-1 dark:bg-zinc-800">content/posts/</code>.
            </p>
          ) : (
            featured.map((p) => <PostCard key={p.slug} post={p} />)
          )}
        </div>
      </section>

      <section className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-orange-50 to-white p-8 dark:border-zinc-700 dark:from-orange-900/18 dark:to-zinc-900/55">
          <h3 className="text-xl font-semibold text-foreground">
            Đọc sâu về IoT, SCADA và thiết bị công nghiệp
          </h3>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Nội dung kỹ thuật rõ ràng, CTA khi review phần cứng.
          </p>
          <div className="mt-6">
            <CTAButton href="/blog">Mở danh sách bài</CTAButton>
          </div>
        </div>
      </section>
    </div>
  );
}
