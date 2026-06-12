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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const p = await getProduct(handle);
  if (!p) return {};
  return { title: `${p.title} · ${p.subtitle}`, description: p.description };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  return (
    <div>
      <div style={{ padding: "16px 16px 0" }}>
        <Link
          href="/c/electro-union"
          aria-label="Back to Electro Union"
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

      <div className="pdp-grid" style={{ marginTop: 24 }}>
        {/* Image — front / back, click to flip */}
        <ImageCarousel
          objectFit="contain"
          images={product.images.map((im, i) => ({
            src: im.url,
            alt: im.altText,
            caption: i === 0 ? "Front" : "Back",
          }))}
        />

        {/* Info */}
        <div className="bg-white" style={{ padding: "20px 20px 28px", maxWidth: 440 }}>
          <h1 className="u-display" style={{ fontSize: "clamp(16px, 2vw, 22px)" }}>
            {product.title}
          </h1>
          <div className="u-label" style={{ marginTop: 6 }}>
            Electro Union: Campaign 01
          </div>
          <div className="u-label u-num" style={{ marginTop: 14 }}>
            {formatMoney(product.priceRange.minVariantPrice)}
          </div>

          <p style={{ marginTop: 18, marginBottom: 24, lineHeight: "16px", maxWidth: 380 }}>
            {product.description}
          </p>

          <AddToBag product={product} />

          {/* Expandable sections — free text */}
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
    </div>
  );
}
