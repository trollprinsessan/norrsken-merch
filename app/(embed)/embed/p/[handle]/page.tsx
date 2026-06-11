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
      {/* Back bar */}
      <div className="embed-back-bar">
        <Link href="/embed/electro-union">← Back</Link>
        <span>Electro Union · Campaign No. 01 · Norrsken</span>
      </div>

      {/* Title */}
      <div className="embed-pdp-title">{product.title}</div>

      {/* Full image */}
      <div className="embed-pdp-img">
        <ImageCarousel
          objectFit="contain"
          images={product.images.map((im, i) => ({
            src: im.url,
            alt: im.altText,
            caption: i === 0 ? "Front" : "Back",
          }))}
        />
      </div>

      {/* Price + meta + desc */}
      <div className="embed-pdp-meta">
        <div className="embed-pdp-price">{formatMoney(product.priceRange.minVariantPrice)}</div>
        <div className="embed-pdp-campaign">Electro Union: Campaign 01 · Norrsken Foundation</div>
        <p className="embed-pdp-desc">{product.description}</p>
      </div>

      {/* Buy */}
      <div className="embed-pdp-buy">
        <AddToBag product={product} />
      </div>

      {/* Accordions */}
      <div className="embed-pdp-accordions">
        <Accordion title="Details">
          {`${product.spec.provenance} ${product.spec.condition} ${product.spec.garment}`}
        </Accordion>
        <Accordion title="Size & Fit">
          {`${product.spec.weight} Size-matched to true size, a rescued garment that fits like a chosen one.`}
        </Accordion>
        <Accordion title="Process">
          {`${product.spec.treatment.join(", ")}. ${product.spec.print} ${product.spec.origin} ${product.spec.shipping} The most sustainable t-shirt is the one that never had to be produced. Nothing here is printed until you order it.`}
        </Accordion>
      </div>

      {/* Footer */}
      <div className="embed-foot">
        <span>Secondhand · rescued · re-printed</span>
        <a href="https://merch.norrsken.org/shop" target="_blank" rel="noreferrer">Full shop →</a>
      </div>
    </div>
  );
}
