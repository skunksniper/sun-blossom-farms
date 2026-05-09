import { useEffect, useState, useCallback } from 'react';

const STORAGE_KEY = 'sbf-cart-v1';

function readCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeCart(cart) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  window.dispatchEvent(new Event('sbf-cart-change'));
}

export function useCart() {
  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    const onChange = () => setCart(readCart());
    window.addEventListener('sbf-cart-change', onChange);
    window.addEventListener('storage', onChange);
    return () => {
      window.removeEventListener('sbf-cart-change', onChange);
      window.removeEventListener('storage', onChange);
    };
  }, []);

  const add = useCallback((id, qty = 1) => {
    const next = readCart();
    const existing = next.find((item) => item.id === id);
    if (existing) existing.qty = Math.min(50, existing.qty + qty);
    else next.push({ id, qty });
    writeCart(next);
  }, []);

  const setQty = useCallback((id, qty) => {
    const next = readCart()
      .map((item) => (item.id === id ? { ...item, qty: Math.max(0, Math.min(50, qty)) } : item))
      .filter((item) => item.qty > 0);
    writeCart(next);
  }, []);

  const remove = useCallback((id) => {
    writeCart(readCart().filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => writeCart([]), []);

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return { cart, add, setQty, remove, clear, totalItems };
}
