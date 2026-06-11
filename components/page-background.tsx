"use client";

import { useEffect } from "react";

// Paints the page background (behind the transparent header) for a route,
// restoring the previous colour on unmount.
export default function PageBackground({ color }: { color: string }) {
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = color;
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, [color]);
  return null;
}
