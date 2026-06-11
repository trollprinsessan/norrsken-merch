"use client";

import { useState } from "react";

export default function Accordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between"
        style={{ width: "100%", height: 15, padding: 0, cursor: "pointer" }}
        aria-expanded={open}
      >
        <span className="u-label">{title}</span>
        <span className="u-label" aria-hidden style={{ fontSize: 14, lineHeight: 1 }}>
          {open ? "–" : "+"}
        </span>
      </button>
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? 320 : 0,
          transition: "max-height 0.12s ease",
        }}
      >
        <p
          className="u-meta"
          style={{ paddingBottom: 16, lineHeight: "16px", maxWidth: 380 }}
        >
          {children}
        </p>
      </div>
    </div>
  );
}
