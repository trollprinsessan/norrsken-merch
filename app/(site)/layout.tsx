import SiteHeader from "@/components/site-header";
import Marquee from "@/components/marquee";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main style={{ flex: 1 }}>{children}</main>
      <Marquee />
    </>
  );
}
