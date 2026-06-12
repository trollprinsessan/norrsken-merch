import Link from "next/link";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import {
  getCampaign,
  getCampaignProducts,
  getCampaigns,
} from "@/lib/shopify";
import ProductCard from "@/components/product-card";
import PageBackground from "@/components/page-background";

const t18 = localFont({
  src: "../../../fonts/TimesEighteen-Bold.ttf",
  variable: "--font-t18",
  display: "swap",
});

export async function generateStaticParams() {
  const campaigns = await getCampaigns();
  return campaigns.map((c) => ({ campaign: c.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ campaign: string }>;
}) {
  const { campaign } = await params;
  const c = await getCampaign(campaign);
  if (!c) return {};
  return { title: `${c.title} · Norrsken Merch`, description: c.description };
}

export default async function CampaignPage({
  params,
}: {
  params: Promise<{ campaign: string }>;
}) {
  const { campaign } = await params;
  const [c, products] = await Promise.all([
    getCampaign(campaign),
    getCampaignProducts(campaign),
  ]);
  if (!c) notFound();

  // Placeholder campaign — blank canvas (optional coloured background).
  if (c.comingSoon) {
    return (
      <>
        {c.bg && <PageBackground color={c.bg} />}
        <div className={t18.variable} style={{ display: "flex", flexDirection: "column", minHeight: "84vh" }}>
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "40px 16px 0",
              gap: "32px",
            }}
          >
            {c.gif && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={c.gif}
                alt={c.title}
                style={{ width: "min(680px, 78vw)", height: "auto", display: "block" }}
              />
            )}
            <p style={{
              fontFamily: "var(--font-t18)",
              fontSize: "clamp(36px, 8vw, 64px)",
              fontWeight: 700,
              textAlign: "center",
              animation: "cs-blink 1.1s step-start infinite",
            }}>
              Coming soon
              <style>{`@keyframes cs-blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div>
      <div style={{ padding: "16px 16px 0" }}>
        <Link
          href="/shop"
          aria-label="Back to shop"
          className="hover-fade"
          style={{
            color: "var(--black)",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1,
            display: "inline-block",
          }}
        >
          ‹
        </Link>
      </div>

      {/* Intro */}
      <section style={{ padding: "20px 16px 36px" }}>
        <p style={{ lineHeight: "16px", maxWidth: 480 }}>{c.description}</p>
      </section>

      {/* Products */}
      <section style={{ padding: "0 16px" }}>
        <div className="merch-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
