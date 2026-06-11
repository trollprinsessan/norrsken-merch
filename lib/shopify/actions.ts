"use server";

import { shopifyFetch } from "./storefront";

// Creates a Shopify cart from the bag's line items and returns the hosted
// checkout URL. The bag stores Shopify variant gids as `variantId` (set when
// live data is merged), so this works as soon as SHOPIFY_LIVE is on.
export async function createShopifyCheckout(
  lines: { variantId: string; quantity: number }[]
): Promise<{ url: string | null; error?: string }> {
  if (!lines.length) return { url: null, error: "Empty bag" };

  try {
    const data = await shopifyFetch<{
      cartCreate: {
        cart: { checkoutUrl: string } | null;
        userErrors: { message: string }[];
      };
    }>(
      /* GraphQL */ `
        mutation Create($lines: [CartLineInput!]!) {
          cartCreate(input: { lines: $lines }) {
            cart { checkoutUrl }
            userErrors { message }
          }
        }
      `,
      {
        lines: lines.map((l) => ({
          merchandiseId: l.variantId,
          quantity: l.quantity,
        })),
      }
    );

    const err = data.cartCreate.userErrors[0]?.message;
    if (err) return { url: null, error: err };
    return { url: data.cartCreate.cart?.checkoutUrl ?? null };
  } catch (e) {
    return { url: null, error: e instanceof Error ? e.message : "Checkout failed" };
  }
}
