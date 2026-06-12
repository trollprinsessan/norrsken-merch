import Link from "next/link";
import { notFound } from "next/navigation";
import { formatMoney, getProduct, getProducts } from "@/lib/shopify";
import AddToBag from "@/components/add-to-bag";
import Accordion from "@/components/accordion";
import ImageCarousel from "@/components/image-carousel";

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const p = await getProduct(handle);
  if (!p) return {};
  return { title: `${p.title} · Norrsken Merch` };
}

export default async function EmbedProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  return (
    <div>
      <div style={{ padding: "16px 16px 0" }}>
        <Link
          href="/embed/electro-union"
          aria-label="Back to Electro Union"
          className="hover-fade"
          style={{
            color: "var(--eBlue)",
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 400,
            fontSize: 11,
            letterSpacing: "0.05em",
            display: "inline-block",
          }}
        >
          GO BACK
        </Link>
      </div>

      <div className="pdp-grid" style={{ marginTop: 24 }}>
        <ImageCarousel
          objectFit="contain"
          images={product.images.map((im, i) => ({
            src: im.url,
            alt: im.altText,
            caption: i === 0 ? "Front" : "Back",
          }))}
        />

        <div className="bg-white" style={{ padding: "20px 20px 28px", maxWidth: 440 }}>
          <h1 className="u-display" style={{ fontSize: "clamp(16px, 2vw, 22px)" }}>
            {product.title}
          </h1>
          <div className="u-label" style={{ marginTop: 6, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', fontWeight: 400, fontStyle: "normal", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Electro Union: Campaign 01
          </div>
          <div className="u-label u-num" style={{ marginTop: 14 }}>
            {formatMoney(product.priceRange.minVariantPrice)}
          </div>

          <p style={{ marginTop: 18, marginBottom: 24, lineHeight: "16px", maxWidth: 380 }}>
            {product.description}
          </p>

          <AddToBag product={product} />

          <div style={{ marginTop: 32 }}>
            <Accordion title="Details">
              {`${product.spec.provenance} ${product.spec.condition} ${product.spec.garment}`}
            </Accordion>
            <Accordion title="Size & Fit">
              {product.spec.sizeFitText ?? `${product.spec.weight} Size-matched to true size (unisex), a rescued garment that fits like a chosen one.`}
            </Accordion>
            <Accordion title="Process">
              {product.spec.processText ?? `${product.spec.treatment.join(", ")}. ${product.spec.print} ${product.spec.origin} ${product.spec.shipping} Minor mending may occur. The most sustainable t-shirt is the one that never had to be produced. Nothing here is printed until you order it.`}
            </Accordion>
          </div>
        </div>
      </div>

      <div className="embed-foot">
        <span>Secondhand · rescued · re-printed</span>
        <a href="https://norrsken-merch.vercel.app/shop" target="_top" rel="noreferrer">Full shop →</a>
      </div>
    </div>
  );
}
