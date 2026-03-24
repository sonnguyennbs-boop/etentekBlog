"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { affiliateProducts, formatVnd } from "@/lib/products";
import AddToCartButton from "./AddToCartButton";
import DriveAwareImage from "./DriveAwareImage";
import { ArrowRightIcon, SearchIcon } from "./Icons";

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

function buyLabel(platform) {
  if (platform === "tiktok") return "Mua trên TikTok";
  return "Mua trên Shopee";
}

export default function ExploreTabs() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("all"); // all | shopee | tiktok
  const [priceSort, setPriceSort] = useState("default"); // default | asc | desc

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const platformOk = (p) => platform === "all" || p.platform === platform;
    const matchesQuery = (p) => {
      if (!q) return true;
      const platformText =
        p.platform === "tiktok" ? "TikTok Shop" : "Shopee";
      return [p.id, p.name, p.description, platformText].some((v) =>
        String(v ?? "").toLowerCase().includes(q),
      );
    };

    const filtered = affiliateProducts.filter((p) => {
      if (!platformOk(p)) return false;
      if (!matchesQuery(p)) return false;
      return true;
    });

    if (priceSort === "asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (priceSort === "desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [platform, query, priceSort]);

  return (
    <div aria-label="Danh sách sản phẩm">
      <div className="flex flex-col gap-3">
        <div className="flex flex-nowrap gap-3 items-center overflow-x-auto">
          <label className="flex-1 min-w-[220px] relative">
            <span className="sr-only">Tìm kiếm nhanh mã tên loại sản phẩm</span>
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500">
              <SearchIcon className="h-4 w-4" />
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm kiếm nhanh mã tên loại sản phẩm"
              className="w-full rounded-xl border border-zinc-200 bg-white px-10 py-3 text-sm text-foreground outline-none placeholder:text-zinc-400 transition-colors focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-900/50"
            />
          </label>

          <label className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Loại
            </span>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-900/50"
              aria-label="Lọc theo loại sản phẩm"
            >
              <option value="all">Tất cả</option>
              <option value="shopee">Shopee</option>
              <option value="tiktok">TikTok Shop</option>
            </select>
          </label>
          <label className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              Giá
            </span>
            <select
              value={priceSort}
              onChange={(e) => setPriceSort(e.target.value)}
              className="rounded-xl border border-zinc-200 bg-white px-3 py-3 text-sm text-foreground outline-none transition-colors focus:border-orange-500 dark:border-zinc-700 dark:bg-zinc-900/50"
              aria-label="Sắp xếp theo giá"
            >
              <option value="default">Mặc định</option>
              <option value="asc">Thấp đến cao</option>
              <option value="desc">Cao đến thấp</option>
            </select>
          </label>
        </div>

        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          Hiển thị {filteredProducts.length} / {affiliateProducts.length} sản
          phẩm
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {filteredProducts.map((p) => (
          <article
            key={p.id}
            className="flex flex-col rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-700 dark:bg-zinc-900"
            role="button"
            tabIndex={0}
            onClick={() => router.push(`/san-pham/${p.id}`)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push(`/san-pham/${p.id}`);
              }
            }}
          >
            <div className="mb-3 overflow-hidden rounded-lg border border-zinc-100 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-800/30">
              {p.images?.[0] || p.imageUrl ? (
                <div className="relative h-44 w-full">
                  <DriveAwareImage
                    src={p.images?.[0] || p.imageUrl}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
              ) : (
                <div className="h-44 w-full bg-gradient-to-br from-orange-50 to-white dark:from-orange-900/20 dark:to-zinc-900/30" />
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <PlatformBadge platform={p.platform} />
            </div>
            <h2 className="text-lg font-semibold text-foreground">{p.name}</h2>
            <p className="mt-2 flex-1 text-sm text-zinc-600 dark:text-zinc-400">
              {p.description}
            </p>
            <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              {formatVnd(p.price)}
            </p>
            <div className="mt-4 flex items-center gap-2">
              <AddToCartButton productId={p.id} stopPropagation />

              <a
                href={`/api/go/${p.id}`}
                className="inline-flex min-h-[34px] items-center justify-center whitespace-nowrap rounded-full bg-orange-500 px-2 py-1 text-[11px] font-semibold text-white transition-colors hover:bg-orange-600 sm:text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <span className="inline-flex items-center gap-2">
                  <span className="truncate max-w-[110px]">
                    {buyLabel(p.platform)}
                  </span>
                  <ArrowRightIcon className="h-3 w-3" />
                </span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
