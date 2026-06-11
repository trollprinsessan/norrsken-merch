"use client";

import Image from "next/image";
import { useState } from "react";

type Img = { src: string; caption: string; alt: string };

export default function ImageCarousel({
  images,
  objectFit = "cover",
}: {
  images: Img[];
  objectFit?: "cover" | "contain";
}) {
  const [i, setI] = useState(0);
  const cur = images[i];
  const next = () => setI((v) => (v + 1) % images.length);

  return (
    <button
      type="button"
      className="split-img carousel"
      onClick={next}
      aria-label={`${cur.caption}. Image ${i + 1} of ${images.length}. Click for next.`}
      style={{ border: 0, padding: 0, display: "block", width: "100%", cursor: "pointer" }}
    >
      <Image
        key={cur.src}
        src={cur.src}
        alt={cur.alt}
        fill
        sizes="(max-width: 760px) 100vw, 50vw"
        style={{ objectFit }}
        priority
      />
      <span className="carousel__count">
        {String(i + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </span>
      <span className="carousel__cap">{cur.caption}</span>
    </button>
  );
}
