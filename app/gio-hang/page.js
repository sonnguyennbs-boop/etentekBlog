"use client";

import { useEffect, useMemo, useState } from "react";
import DriveAwareImage from "../components/DriveAwareImage";
import Link from "next/link";
import { affiliateProducts, formatVnd } from "@/lib/products";
import {
  readCart,
  setCartQty,
  removeFromCart,
  notifyCartChanged,
} from "@/lib/cart";

import { ArrowRightIcon, MinusIcon, PlusIcon, TrashIcon } from "../components/Icons";

function PlatformBadge({ platform }) {
  if (platform === "tiktok") {
    return (
      <span className="inline-flex items-center rounded-full bg-[#fe2c55]/15 px-2.5 py-0.5 text-xs font-semibold text-[#fe2c55] dark:bg-[#fe2c55]/20">
        TikTok Shop
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-orange-500/15 px-2.5 py-0.5 text-xs font-semibold text-orange-700 dark:text-orange-400 dark:bg-orange-500/20">
      Shopee
    </span>
  );
}

export default function GioHangPage() {
  const [cart, setCart] = useState([]);

  const refresh = () => setCart(readCart());

  useEffect(() => {
    // Defer to avoid "setState synchronously within an effect" lint rule.
    const t = setTimeout(() => refresh(), 0);
    return () => clearTimeout(t);
  }, []);

  const items = useMemo(() => {
    return cart
      .map((i) => {
        const product = affiliateProducts.find((p) => p.id === i.id);
        return product ? { ...i, product } : null;
      })
      .filter(Boolean);
  }, [cart]);

  const totalQty = useMemo(
    () => items.reduce((sum, i) => sum + i.qty, 0),
    [items],
  );

  const totalPrice = useMemo(() => {
    return items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  }, [items]);

  return (
    <div className="mx-auto flex min-h-0 flex-1 flex-col px-4 py-12 sm:px-6 lg:max-w-3xl lg:px-8">
      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
        <Link href="/kham-pha" className="hover:text-foreground">
          <span className="inline-flex items-center gap-2">
            <ArrowRightIcon className="h-4 w-4 rotate-180" />
            Mua hàng
          </span>
        </Link>
      </p>

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
        Giỏ hàng
      </h1>

      {items.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/50 dark:text-zinc-400">
          Giỏ hàng hiện đang trống. Hãy chọn sản phẩm và bấm{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 dark:bg-zinc-800">
            Thêm vào giỏ hàng
          </code>
          .
          <div className="mt-5">
            <Link
              href="/kham-pha"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
            >
              <span className="inline-flex items-center gap-2">
                Tìm sản phẩm
                <ArrowRightIcon className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-8 space-y-4">
            {items.map((i) => {
              const p = i.product;
              const img = p.images?.[0] || p.imageUrl;
              return (
                <div
                  key={p.id}
                  className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900/50"
                >
                  <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-zinc-100 bg-zinc-50 dark:border-zinc-800">
                    {img ? (
                      <DriveAwareImage
                        src={img}
                        alt={p.name}
                        fill
                        sizes="96px"
                        className="object-contain"
                      />
                    ) : null}
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          {p.name}
                        </p>
                        <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                          Mã: <span className="font-medium">{p.id}</span>
                        </p>
                      </div>

                      <PlatformBadge platform={p.platform} />
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-semibold text-foreground transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50"
                          aria-label="Giảm số lượng"
                          onClick={() => {
                            const nextQty = i.qty - 1;
                            if (nextQty <= 0) removeFromCart(p.id);
                            else setCartQty(p.id, nextQty);
                            notifyCartChanged();
                            refresh();
                          }}
                        >
                          <MinusIcon className="h-5 w-5" />
                        </button>

                        <div className="min-w-[44px] text-center text-sm font-semibold text-foreground">
                          {i.qty}
                        </div>

                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-sm font-semibold text-foreground transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/50"
                          aria-label="Tăng số lượng"
                          onClick={() => {
                            setCartQty(p.id, i.qty + 1);
                            notifyCartChanged();
                            refresh();
                          }}
                        >
                          <PlusIcon className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                          Thành tiền
                        </p>
                        <p className="text-lg font-semibold text-foreground">
                          {formatVnd(p.price * i.qty)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={`/api/go/${p.id}`}
                        className="inline-flex min-h-[40px] items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                      >
                        <span className="inline-flex items-center gap-2">
                          Mua ngay
                          <ArrowRightIcon className="h-4 w-4" />
                        </span>
                      </a>

                      <button
                        type="button"
                        className="inline-flex min-h-[40px] items-center justify-center rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                        onClick={() => {
                          removeFromCart(p.id);
                          notifyCartChanged();
                          refresh();
                        }}
                      >
                        <span className="inline-flex items-center gap-2">
                          <TrashIcon className="h-4 w-4" />
                          Xóa
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900/50">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Tổng {totalQty} sản phẩm
                </p>
                <p className="mt-1 text-2xl font-semibold text-foreground">
                  {formatVnd(totalPrice)}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/kham-pha"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-zinc-300 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  <span className="inline-flex items-center gap-2">
                    Tiếp tục mua
                    <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

