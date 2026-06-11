"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/lib/cart/cart-context";

type CampaignNavItem = { label: string; href: string | null; soon?: boolean };

const CAMPAIGNS: CampaignNavItem[] = [
  { label: "Electro Union", href: "/c/electro-union" },
  { label: "Prompt what matters", href: "/c/prompt-what-matters" },
  { label: "100 ways fix the future", href: "/c/100-ways" },
];

export default function SiteHeader() {
  const { count, openCart } = useCart();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const openNow = () => {
    cancelClose();
    setOpen(true);
  };
  // Forgiving close: short delay so the pointer can travel into the panel.
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 320);
  };
  const close = () => {
    cancelClose();
    setOpen(false);
  };

  // Full-screen mobile menu: lock scroll, close on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  // Close on Escape or click outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onClick = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50" style={{ background: "transparent" }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "start",
          minHeight: "var(--nav-h)",
          padding: "14px 16px",
        }}
      >
        <div ref={menuRef} style={{ justifySelf: "start" }}>
        <button
          className="nav-mobile-toggle u-label hover-fade"
          style={{ cursor: "pointer", background: "none", border: 0, padding: 0 }}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? "Close" : "Menu"}
        </button>
        <nav
          className={`nav-desktop flex${mobileOpen ? " is-open" : ""}`}
          style={{ flexDirection: "column", alignItems: "flex-start", gap: 1 }}
        >
          <Link href="/" className="u-label hover-fade" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link href="/shop" className="u-label hover-fade" onClick={() => setMobileOpen(false)}>
            Shop
          </Link>
          <Link href="/about" className="u-label hover-fade" onClick={() => setMobileOpen(false)}>
            About
          </Link>

          {/* Campaigns — inline foldout (overlays, no layout shift) */}
          <div
            ref={wrapRef}
            onMouseEnter={openNow}
            onMouseLeave={scheduleClose}
            style={{ position: "relative" }}
          >
            <button
              className="u-label hover-fade flex items-center"
              style={{ cursor: "pointer", gap: 6 }}
              onClick={() => (open ? close() : openNow())}
              aria-expanded={open}
            >
              Campaigns
            </button>

            {(open || mobileOpen) && (
              <div className="campaign-foldout">
                {CAMPAIGNS.map((c) =>
                  c.href ? (
                    <Link
                      key={c.label}
                      href={c.href}
                      className="u-label hover-fade"
                      onClick={() => {
                        close();
                        setMobileOpen(false);
                      }}
                      style={{ display: "flex", alignItems: "baseline", gap: 8 }}
                    >
                      {c.label}
                      {c.soon && (
                        <span className="u-kicker" style={{ color: "var(--grey)" }}>
                          Coming soon
                        </span>
                      )}
                    </Link>
                  ) : (
                    <div
                      key={c.label}
                      className="u-label"
                      style={{ color: "var(--grey)", display: "flex", alignItems: "baseline", gap: 8 }}
                    >
                      {c.label}
                      {c.soon && (
                        <span className="u-kicker" style={{ color: "var(--grey)" }}>
                          Coming soon
                        </span>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </nav>
        </div>

        <Link
          href="/"
          className="hover-fade flex items-center"
          style={{ justifySelf: "center", marginTop: 3, position: "relative", zIndex: 46 }}
          aria-label="Norrsken, home"
        >
          <Image src="/brand/norrsken.svg" alt="Norrsken" width={140} height={19} priority />
        </Link>

        <button
          onClick={openCart}
          className="u-label hover-fade"
          style={{ cursor: "pointer", justifySelf: "end", position: "relative", zIndex: 46 }}
        >
          Bag <span className="u-num">({count})</span>
        </button>
      </div>
    </header>
  );
}
