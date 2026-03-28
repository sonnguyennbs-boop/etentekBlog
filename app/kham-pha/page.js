import Link from "next/link";
import ExploreTabs from "../components/ExploreTabs";
import { ArrowRightIcon } from "../components/Icons";

export const metadata = {
  title: "Mua hàng",
  description:
    "ETENTEK — sản phẩm affiliate (Shopee, TikTok Shop) và bài viết nhóm theo chủ đề.",
};

export default function KhamPhaPage() {
  return (
    <div className="mx-auto flex min-h-0 min-w-0 flex-1 flex-col px-4 py-12 sm:px-6 lg:max-w-3xl lg:px-8">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-foreground">
          <span className="inline-flex items-center gap-2">
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            Trang chủ ETENTEK
          </span>
        </Link>
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
        Mua hàng
      </h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Sản phẩm & giải pháp dành cho hệ thống điện, tự động hóa
      </p>
      <div className="mt-10">
        <ExploreTabs />
      </div>
    </div>
  );
}
