import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-0 flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-foreground">404</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Không tìm thấy trang.
      </p>
      <Link
        href="/"
        className="mt-6 text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
