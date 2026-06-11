import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/shopify";

export default function ProductCard({
  product,
  sizes = "(max-width: 768px) 50vw, 25vw",
}: {
  product: Product;
  sizes?: string;
}) {
  return (
    <Link href={`/p/${product.handle}`} className="group block">
      <div className="product-frame">
        <Image
          src={product.featuredImage.url}
          alt={product.featuredImage.altText}
          fill
          sizes={sizes}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div style={{ marginTop: 12 }}>
        <div className="u-label">{product.name}</div>
        <div className="u-label u-num" style={{ marginTop: 6 }}>
          {formatMoney(product.priceRange.minVariantPrice)}
        </div>
      </div>
    </Link>
  );
}
