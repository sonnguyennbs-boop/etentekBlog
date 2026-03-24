"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCartCount } from "@/lib/cart";

function CartIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M6 6h15l-1.5 9h-13z" />
      <path d="M6 6 4 3H1" />
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  );
}

export default function CartLink() {
  const [count, setCount] = useState(0);
  const [bump, setBump] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setCount(getCartCount()), 0);

    const onChanged = () => {
      setCount(getCartCount());
      setBump(true);
      window.setTimeout(() => setBump(false), 250);
    };

    window.addEventListener("cart:changed", onChanged);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("cart:changed", onChanged);
    };
  }, []);

  return (
    <Link
      href="/gio-hang"
      aria-label={`Giỏ hàng (${count} món)`}
      className="hover:text-foreground"
    >
      <span
        className={`relative inline-flex items-center gap-2 transition-transform duration-200 ${
          bump ? "scale-110" : "scale-100"
        }`}
      >
        <CartIcon />
        <span className="text-sm font-medium">Giỏ hàng</span>
        <span
          className={`inline-flex min-w-[22px] items-center justify-center rounded-full px-1.5 py-0.5 text-xs font-semibold transition-colors ${
            count > 0
              ? "bg-orange-500/15 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400"
              : "bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          }`}
        >
          {count}
        </span>
      </span>
    </Link>
  );
}

