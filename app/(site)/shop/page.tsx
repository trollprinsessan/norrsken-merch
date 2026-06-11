import { getProducts } from "@/lib/shopify";
import ProductCard from "@/components/product-card";

export const metadata = {
  title: "Shop · Norrsken Merch",
};

export default async function Shop() {
  const products = await getProducts();

  return (
    <div>
      <section style={{ padding: "16px 16px 0" }}>
        <div className="merch-grid">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
