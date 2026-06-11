"use client";

import { useEffect } from "react";

/**
 * Reports the embed's full content height to the parent window so an
 * iframe host can size itself to fit (no cropping, no empty gap).
 *
 * Host page must listen for the message — see DEPLOY.md / embed snippet:
 *   window.addEventListener("message", (e) => {
 *     if (e.data?.type === "eu-embed-height") iframe.style.height = e.data.height + "px";
 *   });
 */
export default function EmbedAutoResize() {
  useEffect(() => {
    const post = () => {
      const height = Math.ceil(
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight
        )
      );
      window.parent.postMessage({ type: "eu-embed-height", height }, "*");
    };

    post();

    const ro = new ResizeObserver(post);
    ro.observe(document.body);

    // Re-measure once images/fonts settle.
    window.addEventListener("load", post);
    const t = window.setTimeout(post, 600);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", post);
      window.clearTimeout(t);
    };
  }, []);

  return null;
}
