"use client";

import { useEffect, useState } from "react";
import { addToCart, notifyCartChanged } from "@/lib/cart";
import { CartIcon } from "./Icons";

export default function AddToCartButton({
  productId,
  label = "Thêm vào giỏ hàng",
  className = "",
  stopPropagation = false,
}) {
  const [status, setStatus] = useState("idle"); // idle | added

  useEffect(() => {
    if (status !== "added") return;
    const t = setTimeout(() => setStatus("idle"), 1500);
    return () => clearTimeout(t);
  }, [status]);

  return (
    <button
      type="button"
      className={`inline-flex min-h-[34px] items-center justify-center whitespace-nowrap rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-1 text-[11px] font-semibold text-orange-700 transition-colors hover:bg-orange-500/15 sm:text-xs dark:text-orange-300 ${className}`}
      onClick={(e) => {
        if (stopPropagation) e.stopPropagation();
        addToCart(productId);
        notifyCartChanged();
        setStatus("added");
      }}
    >
      <span className="inline-flex items-center gap-2">
        <CartIcon className="h-3 w-3" />
        <span className="truncate max-w-[120px]">
          {status === "added" ? "Đã thêm vào giỏ" : label}
        </span>
      </span>
    </button>
  );
}

