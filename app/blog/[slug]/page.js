import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs } from "@/lib/load-posts";
import { resolveCoverImageUrl } from "@/lib/cover-image";
import CoverImage from "../../components/CoverImage";
import CTAButton from "../../components/CTAButton";
import MarkdownBody from "../../components/MarkdownBody";
import { ArrowRightIcon } from "../../components/Icons";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Không tìm thấy" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: post.coverImage
      ? {
          images: [
            {
              url: resolveCoverImageUrl(post.coverImage),
              alt: post.title,
            },
          ],
        }
      : undefined,
  };
}

function getHeroClass(hero) {
  switch (hero) {
    case "emerald":
      return "from-emerald-100 to-orange-50 dark:from-emerald-900/25 dark:to-zinc-900/50";
    case "sky":
      return "from-sky-100 to-indigo-50 dark:from-sky-900/25 dark:to-zinc-900/50";
    case "teal":
      return "from-teal-100 to-amber-50 dark:from-teal-900/25 dark:to-zinc-900/50";
    default:
      return "from-zinc-100 to-zinc-50 dark:from-zinc-800/35 dark:to-zinc-900/50";
  }
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return notFound();

  const highlights = post.highlights?.length
    ? post.highlights
    : [
        "Đối chiếu datasheet trước khi mua",
        "Phù hợp môi trường lắp đặt thực tế",
        "Cân nhắc bảo hành & hỗ trợ kỹ thuật",
      ];

  return (
    <article className="mx-auto flex min-h-0 flex-1 flex-col px-4 py-12 sm:px-6 lg:max-w-3xl lg:px-8">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <Link href="/blog" className="hover:text-foreground">
          <span className="inline-flex items-center gap-2">
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            Blog
          </span>
        </Link>
      </p>

      <section className="mt-5">
        <div className="relative aspect-[16/7] w-full overflow-hidden rounded-2xl border border-zinc-200/70 dark:border-zinc-800/70">
          {post.coverImage ? (
            <CoverImage
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          ) : (
            <div
              className={`h-full w-full bg-gradient-to-br ${getHeroClass(
                post.hero,
              )}`}
            />
          )}
        </div>
        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-foreground">
          {post.title}
        </h1>
        {post.excerpt ? (
          <p className="mt-3 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {post.excerpt}
          </p>
        ) : null}
      </section>

      {post.content ? (
        <section className="mt-10">
          <MarkdownBody markdown={post.content} />
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-foreground">Tóm tắt nhanh</h2>
        <ul className="mt-4 flex flex-col gap-2 text-zinc-700 dark:text-zinc-300">
          {highlights.map((h) => (
            <li key={h} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 flex-none rounded-full bg-orange-500" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900/45">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Link mua sản phẩm
            </p>
            <h3 className="mt-2 text-lg font-semibold text-foreground">
              {post.title}
            </h3>
          </div>

          <div className="flex flex-col gap-3 sm:items-end">
            <CTAButton href={`/api/go/${post.affiliateId}`}>
              Xem giá & mua →
            </CTAButton>
          </div>
        </div>
      </section>
    </article>
  );
}
