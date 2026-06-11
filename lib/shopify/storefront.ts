// Live Shopify Storefront API client.
// The token is a PUBLIC storefront token (safe in the frontend); it lives in
// .env.local. Note: this store answers the Storefront API on its PRIMARY
// domain (imperfect.se), not the .myshopify.com host.

const DOMAIN = process.env.SHOPIFY_DOMAIN ?? "imperfect.se";
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN ?? "";
const VERSION = process.env.SHOPIFY_API_VERSION ?? "2024-10";

export const SHOPIFY_ENABLED = Boolean(TOKEN);

const ENDPOINT = `https://${DOMAIN}/api/${VERSION}/graphql.json`;

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    // Cache product reads briefly; carts must never be cached.
    next: { revalidate: 60 },
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(`Shopify Storefront error: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

// Raw shape of a Storefront product (only the fields we read).
export type SFProduct = {
  handle: string;
  title: string;
  totalInventory: number | null;
  options: { name: string; values: string[] }[];
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale: boolean;
        price: { amount: string; currencyCode: string };
      };
    }[];
  };
};

const COLLECTION_QUERY = /* GraphQL */ `
  query CollectionProducts($handle: String!) {
    collection(handle: $handle) {
      products(first: 50) {
        edges {
          node {
            handle
            title
            totalInventory
            options { name values }
            priceRange { minVariantPrice { amount currencyCode } }
            variants(first: 50) {
              edges { node { id title availableForSale price { amount currencyCode } } }
            }
          }
        }
      }
    }
  }
`;

export async function getStorefrontCollection(handle: string): Promise<SFProduct[]> {
  if (!SHOPIFY_ENABLED) return [];
  const data = await shopifyFetch<{
    collection: { products: { edges: { node: SFProduct }[] } } | null;
  }>(COLLECTION_QUERY, { handle });
  return data.collection?.products.edges.map((e) => e.node) ?? [];
}
