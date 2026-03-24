"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "../components/Icons";

export default function LienHePage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sent

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
        Liên hệ
      </h1>
      <p className="mt-2 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Gửi thông tin để chúng tôi phản hồi về sản phẩm/giải pháp hoặc hợp
        tác.
      </p>

      <form
        className="mt-10 space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900/55"
        onSubmit={(e) => {
          e.preventDefault();
          // Chưa có backend: hiển thị trạng thái tạm thời.
          setStatus("sent");
          setTimeout(() => setStatus("idle"), 2500);
          setForm({ name: "", email: "", message: "" });
        }}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Họ tên
            </span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-950/20"
              placeholder="VD: Nguyễn Văn A"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email
            </span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((f) => ({ ...f, email: e.target.value }))
              }
              className="rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-950/20"
              placeholder="VD: a@gmail.com"
            />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Nội dung
          </span>
          <textarea
            required
            rows={5}
            value={form.message}
            onChange={(e) =>
              setForm((f) => ({ ...f, message: e.target.value }))
            }
            className="resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-950/20"
            placeholder="Nhập nội dung bạn cần hỗ trợ..."
          />
        </label>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
          >
            {status === "sent" ? "Đã gửi!" : "Gửi liên hệ"}
          </button>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Lưu ý: form hiện chỉ mô phỏng gửi (chưa tích hợp backend).
          </p>
        </div>
      </form>
    </div>
  );
}

