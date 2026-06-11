import localFont from "next/font/local";

const t18 = localFont({
  src: "../fonts/TimesEighteen-Bold.ttf",
  variable: "--font-t18",
  display: "swap",
});

export default function EmbedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${t18.variable} embed-shell`} style={{ margin: "0 auto" }}>
      <svg aria-hidden="true" width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="distort">
            <feTurbulence baseFrequency="1 1" numOctaves="1" />
            <feDisplacementMap in="SourceGraphic" scale="2" />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
}
