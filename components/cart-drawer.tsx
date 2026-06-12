"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart/cart-context";
import { formatMoney } from "@/lib/shopify";

export default function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, setQty, count, live, checkout } =
    useCart();
  const pathname = usePathname();
  // Inside the iframe embed there's no real viewport — a full-height fixed
  // drawer stretches the whole resized iframe, burying the checkout button.
  // Use a compact, top-anchored sheet there instead.
  const isEmbed = pathname?.startsWith("/embed") ?? false;
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // In the embed the cart sheet is pinned to the top of the (tall) iframe, so a
  // visitor scrolled further down won't see it open. Ask the host page to scroll
  // the iframe into view so the sheet lands in their viewport.
  useEffect(() => {
    if (isOpen && isEmbed && typeof window !== "undefined" && window.parent !== window) {
      window.parent.postMessage({ type: "eu-embed-cart-open" }, "*");
    }
  }, [isOpen, isEmbed]);

  async function onCheckout() {
    if (!live || lines.length === 0) return;
    setPending(true);
    setError(null);

    // Open the tab synchronously, inside the click gesture — mobile browsers
    // (esp. iOS Safari) block window.open that runs after an await. We get the
    // checkout URL afterwards and point the already-opened tab at it.
    const tab = window.open("about:blank", "_blank");

    const res = await checkout();
    if (res.url) {
      if (tab) {
        tab.location.href = res.url;
      } else {
        // Popup was blocked — break the iframe out to checkout in the top window.
        (window.top ?? window).location.href = res.url;
      }
      return;
    }

    // Checkout failed — close the blank tab we opened and surface the error.
    if (tab) tab.close();
    setError(res.error ?? "Checkout is unavailable right now.");
    setPending(false);
  }

  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={closeCart} />
      <aside className={`drawer-panel${isEmbed ? " drawer-panel--embed" : ""}`} aria-label="Bag">
        {/* header */}
        <div
          className="flex items-center justify-between"
          style={{
            height: "var(--nav-h)",
            padding: "0 16px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <span className="u-label">
            Bag <span className="u-num">({count})</span>
          </span>
          <button onClick={closeCart} className="u-label hover-fade" style={{ cursor: "pointer" }}>
            Close
          </button>
        </div>

        {/* lines */}
        <div style={{ flex: isEmbed ? "0 1 auto" : 1, overflowY: "auto", maxHeight: isEmbed ? 320 : undefined }}>
          {lines.length === 0 ? (
            <p className="u-meta" style={{ padding: 16 }}>
              Your bag is empty.
            </p>
          ) : (
            lines.map((l) => (
              <div
                key={l.variantId}
                className="flex"
                style={{ gap: 12, padding: 16, borderBottom: "1px solid var(--line)" }}
              >
                <Link
                  href={`/p/${l.productHandle}`}
                  onClick={closeCart}
                  style={{
                    width: 64,
                    height: 64,
                    flex: "none",
                    border: "1px solid var(--line)",
                    position: "relative",
                  }}
                >
                  <Image src={l.image.url} alt={l.image.altText} fill style={{ objectFit: "contain" }} />
                </Link>
                <div style={{ flex: 1 }}>
                  <div className="u-label">{l.title}</div>
                  <div className="u-meta" style={{ marginTop: 2 }}>
                    Size {l.variantTitle}
                  </div>
                  <div className="u-meta u-num" style={{ marginTop: 2 }}>
                    {formatMoney(l.price)}
                  </div>
                  <div className="flex items-center" style={{ gap: 10, marginTop: 8 }}>
                    <button
                      className="u-label hover-fade"
                      onClick={() => setQty(l.variantId, l.quantity - 1)}
                      style={{ cursor: "pointer" }}
                    >
                      −
                    </button>
                    <span className="u-num" style={{ minWidth: 16, textAlign: "center" }}>
                      {l.quantity}
                    </span>
                    <button
                      className="u-label hover-fade"
                      onClick={() => setQty(l.variantId, l.quantity + 1)}
                      style={{ cursor: "pointer" }}
                    >
                      +
                    </button>
                    <button
                      className="hover-fade"
                      onClick={() => setQty(l.variantId, 0)}
                      style={{ cursor: "pointer", marginLeft: "auto", color: "var(--red)" }}
                    >
                      <span className="u-label">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* footer */}
        <div style={{ borderTop: "1px solid var(--line)", padding: 16 }}>
          <div className="flex items-center justify-between" style={{ marginBottom: 12 }}>
            <span className="u-label">Subtotal</span>
            <span className="u-label u-num">{formatMoney(subtotal)}</span>
          </div>
          <button
            className="btn-black"
            disabled={lines.length === 0 || pending || !live}
            onClick={onCheckout}
          >
            {pending ? "Taking you to checkout…" : "Checkout"}
          </button>
          <p className="u-meta" style={{ marginTop: 10, lineHeight: "15px" }}>
            {error
              ? error
              : live
              ? "Redirects to Shopify’s secure checkout. Ships across the EU."
              : "Preview — checkout opens once the live store is switched on. Ships across the EU."}
          </p>
        </div>
      </aside>
    </>
  );
}
