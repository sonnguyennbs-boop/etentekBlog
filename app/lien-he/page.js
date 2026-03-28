import Link from "next/link";
import { ArrowRightIcon } from "../components/Icons";

const SITE_URL = "https://etentek-blog.vercel.app/";

export default function LienHePage() {
  return (
    <div className="mx-auto flex min-h-0 flex-1 flex-col px-4 py-12 sm:px-6 lg:max-w-3xl lg:px-8">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <Link href="/" className="hover:text-foreground">
          <span className="inline-flex items-center gap-2">
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            Trang chủ ETENTEK
          </span>
        </Link>
      </p>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
        📞 Liên hệ hợp tác &amp; tư vấn
      </h1>

      <div className="mt-8 space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/55 dark:text-zinc-300">
        <p className="space-y-1 leading-relaxed">
          <span className="block">
            <span className="font-medium text-foreground">Công ty / Thương hiệu:</span>{" "}
            ETENTEK
          </span>
          <span className="block">
            <span className="font-medium text-foreground">Người phụ trách:</span> Phú
            Nguyễn
          </span>
        </p>

        <ul className="space-y-3 border-t border-zinc-200 pt-6 dark:border-zinc-600/50">
          <li>
            <span className="mr-1">📧</span>
            <span className="font-medium text-foreground">Email:</span>{" "}
            <a
              href="mailto:nangluongetentek@gmail.com"
              className="text-orange-600 underline-offset-2 hover:underline dark:text-orange-400"
            >
              nangluongetentek@gmail.com
            </a>
          </li>
          <li>
            <span className="mr-1">📱</span>
            <span className="font-medium text-foreground">Hotline/Zalo:</span>{" "}
            <a
              href="tel:+84368512498"
              className="text-orange-600 underline-offset-2 hover:underline dark:text-orange-400"
            >
              0368512498
            </a>
          </li>
          <li>
            <span className="mr-1">🌐</span>
            <span className="font-medium text-foreground">Website:</span>{" "}
            <a
              href={SITE_URL}
              className="break-all text-orange-600 underline-offset-2 hover:underline dark:text-orange-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE_URL}
            </a>
          </li>
        </ul>

        <p className="border-t border-zinc-200 pt-6 dark:border-zinc-600/50">
          <span className="mr-1">📍</span>
          <span className="font-medium text-foreground">Địa chỉ:</span> Thành Phố Vinh,
          Tỉnh Nghệ An, Việt Nam
        </p>

        <div className="border-t border-zinc-200 pt-6 dark:border-zinc-600/50">
          <p className="font-medium text-foreground">⏰ Thời gian làm việc:</p>
          <p className="mt-2">
            Thứ 2 – Thứ 7: 8:00 – 17:30
          </p>
        </div>

        <div className="border-t border-zinc-200 pt-6 dark:border-zinc-600/50">
          <p className="font-medium text-foreground">👉 Hỗ trợ:</p>
          <ul className="mt-3 list-inside list-disc space-y-2">
            <li>Tư vấn giải pháp điện – tự động hóa</li>
            <li>Thiết kế &amp; sản xuất thiết bị điện</li>
            <li>OEM/ODM sản phẩm</li>
          </ul>
        </div>

        <p className="border-t border-zinc-200 pt-6 text-sm text-zinc-600 dark:border-zinc-600/50 dark:text-zinc-400">
          Vui lòng để lại thông tin, chúng tôi sẽ phản hồi trong 24h.
        </p>
      </div>
    </div>
  );
}
