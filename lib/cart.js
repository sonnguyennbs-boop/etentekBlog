const CART_KEY = "etentek_cart_v1";

function safeParseCart(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((i) => i && typeof i.id === "string")
      .map((i) => ({
        id: i.id,
        qty: Number.isFinite(Number(i.qty)) ? Math.max(1, Number(i.qty)) : 1,
      }));
  } catch {
    return [];
  }
}

export function readCart() {
  if (typeof window === "undefined") return [];
  return safeParseCart(window.localStorage.getItem(CART_KEY));
}

export function writeCart(items) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(productId, qty = 1) {
  if (typeof window === "undefined") return [];
  const items = readCart();
  const n = Math.max(1, Number(qty) || 1);
  const idx = items.findIndex((i) => i.id === productId);
  if (idx >= 0) items[idx] = { ...items[idx], qty: items[idx].qty + n };
  else items.push({ id: productId, qty: n });
  writeCart(items);
  return items;
}

export function setCartQty(productId, qty) {
  if (typeof window === "undefined") return [];
  const n = Number(qty);
  const items = readCart();
  const next = items
    .map((i) => (i.id === productId ? { ...i, qty: Math.max(0, n) } : i))
    .filter((i) => i.qty > 0);
  writeCart(next);
  return next;
}

export function removeFromCart(productId) {
  return setCartQty(productId, 0);
}

export function clearCart() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CART_KEY);
}

export function getCartCount() {
  return readCart().reduce((sum, i) => sum + i.qty, 0);
}

export function notifyCartChanged() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("cart:changed"));
}

