"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart/cart-context";
import type { Product } from "@/lib/shopify/types";

export default function AddToBag({ product }: { product: Product }) {
  const { add } = useCart();
  const singleVariant = product.variants.length === 1;
  const [selected, setSelected] = useState<string | null>(
    singleVariant ? product.variants[0].id : null
  );

  const variant = product.variants.find((v) => v.id === selected) ?? null;
  const canAdd = variant != null && variant.availableForSale;

  return (
    <div>
      {!singleVariant && (
        <div style={{ marginBottom: 16 }}>
          <div className="u-kicker" style={{ color: "var(--grey)", marginBottom: 8 }}>
            Size
          </div>
          <div className="flex" style={{ gap: 6, flexWrap: "wrap" }}>
            {product.variants.map((v) => (
              <button
                key={v.id}
                className="size-box"
                data-active={selected === v.id}
                data-soldout={!v.availableForSale}
                disabled={!v.availableForSale}
                onClick={() => setSelected(v.id)}
              >
                {v.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        className="btn-black"
        disabled={!canAdd}
        onClick={() => variant && add(product, variant)}
      >
        {variant == null
          ? "Select a size"
          : !variant.availableForSale
          ? "Sold out"
          : "Add to bag"}
      </button>
    </div>
  );
}
