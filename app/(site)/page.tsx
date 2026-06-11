"use client";

import { useEffect, useState } from "react";

// Campaign clips (animated AVIF), played in file-number order, once each,
// then replaced by the next. Durations are the clips' own play lengths.
const CLIPS = [
  { src: "/home/1.avif", ms: 2080 },
  { src: "/home/2.avif", ms: 2040 },
  { src: "/home/3.avif", ms: 2040 },
  { src: "/home/4.avif", ms: 2040 },
  { src: "/home/5.avif", ms: 2000 },
  { src: "/home/6.avif", ms: 2040 },
  { src: "/home/7.avif", ms: 2080 },
];

export default function Home() {
  const [i, setI] = useState(0);

  // Preload every clip once so the hard cut never flashes white.
  useEffect(() => {
    CLIPS.forEach(({ src }) => {
      const im = new Image();
      im.src = src;
    });
  }, []);

  // Hold each clip for its own length, then advance. The key change below
  // remounts the <img>, so the next clip starts from its first frame.
  useEffect(() => {
    const id = setTimeout(() => setI((v) => (v + 1) % CLIPS.length), CLIPS[i].ms);
    return () => clearTimeout(id);
  }, [i]);

  const clip = CLIPS[i];

  return (
    <div className="rotator">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={i} src={clip.src} alt="" className="rotator__img" />
    </div>
  );
}
