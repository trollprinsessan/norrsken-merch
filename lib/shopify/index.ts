import type { Campaign, Money, Product } from "./types";
import { CAMPAIGNS, PRODUCTS } from "./mock-data";
import { SHOPIFY_ENABLED, getStorefrontCollection, type SFProduct } from "./storefront";

// ------------------------------------------------------------------
// DATA ACCESS SEAM
// Every page reads products/campaigns through these async functions.
//
// PREVIEW (default): returns our designed mock catalogue.
// LIVE  (SHOPIFY_LIVE=1): overlays real Shopify price / sizes / stock /
//   variant IDs onto our presentation, matched by product handle. Images,
//   names and copy always stay ours. Products that don't exist in the live
//   collection are left as preview, so nothing disappears.
// ------------------------------------------------------------------

const LIVE = SHOPIFY_ENABLED && process.env.SHOPIFY_LIVE === "1";
const COLLECTION_HANDLE = "norrsken";

// Merge one live Shopify product onto our mock product (commerce only).
function merge(mock: Product, live: SFProduct): Product {
  const optionName = live.options[0]?.name ?? "Size";
  return {
    ...mock,
    priceRange: { minVariantPrice: live.priceRange.minVariantPrice },
    options: live.options.map((o) => ({ name: o.name, values: o.values })),
    variants: live.variants.edges.map(({ node }) => ({
      id: node.id, // real Shopify variant gid (used by the cart at checkout)
      title: node.title,
      availableForSale: node.availableForSale,
      price: node.price,
      selectedOptions: [{ name: optionName, value: node.title }],
    })),
  };
}

async function withLive(products: Product[]): Promise<Product[]> {
  if (!LIVE) return products;
  try {
    const live = await getStorefrontCollection(COLLECTION_HANDLE);
    const byHandle = new Map(live.map((p) => [p.handle, p]));
    return products.map((p) => {
      const match = byHandle.get(p.shopifyHandle ?? p.handle);
      return match ? merge(p, match) : p;
    });
  } catch (err) {
    console.error("Shopify live overlay failed, falling back to preview:", err);
    return products;
  }
}

export async function getProducts(): Promise<Product[]> {
  return withLive(PRODUCTS);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const all = await withLive(PRODUCTS);
  return all.find((p) => p.handle === handle);
}

export async function getCampaigns(): Promise<Campaign[]> {
  // Later: filter out gated campaigns unless an access key is present.
  return CAMPAIGNS;
}

export async function getCampaign(handle: string): Promise<Campaign | undefined> {
  return CAMPAIGNS.find((c) => c.handle === handle);
}

export async function getCampaignProducts(handle: string): Promise<Product[]> {
  const campaign = CAMPAIGNS.find((c) => c.handle === handle);
  if (!campaign) return [];
  const all = await withLive(PRODUCTS);
  return campaign.productHandles
    .map((h) => all.find((p) => p.handle === h))
    .filter((p): p is Product => Boolean(p));
}

// ---------- formatting ----------
export function formatMoney(money: Money): string {
  const n = Number(money.amount);
  const whole = Number.isInteger(n) ? n.toString() : n.toFixed(2);
  return `${whole} ${money.currencyCode}`;
}
