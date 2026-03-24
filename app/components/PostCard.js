import Link from "next/link";
import CoverImage from "./CoverImage";

function getThumbnailClass(slug) {
  switch (slug) {
    case "esp32-du-an-iot-nho":
      return "from-emerald-200 to-orange-50 dark:from-emerald-800/35 dark:to-orange-900/15";
    case "hmi-cong-nghiep-tu-dien-scada":
      return "from-sky-200 to-indigo-50 dark:from-sky-800/35 dark:to-indigo-900/15";
    case "arduino-uno-r3-lab":
      return "from-teal-200 to-amber-50 dark:from-teal-800/35 dark:to-amber-900/15";
    default:
      return "from-zinc-200 to-zinc-50 dark:from-zinc-700 dark:to-zinc-900/30";
  }
}

export default function PostCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-orange-300 hover:bg-orange-50/50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-orange-700 dark:hover:bg-orange-950/15"
    >
      <div className="relative mb-4 aspect-[16/9] w-full overflow-hidden rounded-lg">
        {post.coverImage ? (
          <CoverImage
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div
            className={`h-full w-full bg-gradient-to-br ${getThumbnailClass(
              post.slug,
            )}`}
          />
        )}
      </div>
      <h2 className="text-lg font-medium text-foreground group-hover:underline">
        {post.title}
      </h2>
      {post.excerpt ? (
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {post.excerpt}
        </p>
      ) : null}
    </Link>
  );
}

