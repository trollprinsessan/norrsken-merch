"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine, Image, Money, Product, ProductVariant } from "@/lib/shopify/types";
import { createShopifyCheckout } from "@/lib/shopify/actions";

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: Money;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (product: Product, variant: ProductVariant) => void;
  remove: (variantId: string) => void;
  setQty: (variantId: string, quantity: number) => void;
  // True when the store is wired to live Shopify (checkout is real).
  live: boolean;
  // Creates a Shopify cart and returns the hosted checkout URL.
  checkout: () => Promise<{ url: string | null; error?: string }>;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "nrskn-cart";

export function CartProvider({
  children,
  live = false,
}: {
  children: React.ReactNode;
  live?: boolean;
}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines]);

  const add = useCallback((product: Product, variant: ProductVariant) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.variantId === variant.id);
      if (existing) {
        return prev.map((l) =>
          l.variantId === variant.id ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      const image: Image = product.featuredImage;
      const line: CartLine = {
        variantId: variant.id,
        productHandle: product.handle,
        title: product.title,
        variantTitle: variant.title,
        image,
        price: variant.price,
        quantity: 1,
      };
      return [...prev, line];
    });
    setIsOpen(true);
  }, []);

  const remove = useCallback((variantId: string) => {
    setLines((prev) => prev.filter((l) => l.variantId !== variantId));
  }, []);

  const setQty = useCallback((variantId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.variantId !== variantId)
        : prev.map((l) => (l.variantId === variantId ? { ...l, quantity } : l))
    );
  }, []);

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const subtotal = useMemo<Money>(() => {
    const amount = lines.reduce(
      (sum, l) => sum + Number(l.price.amount) * l.quantity,
      0
    );
    return { amount: amount.toFixed(2), currencyCode: "SEK" };
  }, [lines]);

  const value: CartContextValue = {
    lines,
    count,
    subtotal,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    add,
    remove,
    setQty,
    live,
    checkout: () =>
      createShopifyCheckout(
        lines.map((l) => ({ variantId: l.variantId, quantity: l.quantity }))
      ),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
