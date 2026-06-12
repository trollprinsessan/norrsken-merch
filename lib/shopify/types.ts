// Types mirror the Shopify Storefront API shape so the mock layer can be
// swapped for real GraphQL responses without touching any UI component.

export type Money = {
  amount: string; // decimal string, e.g. "299.00"
  currencyCode: string; // e.g. "SEK"
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type SelectedOption = {
  name: string; // "Size"
  value: string; // "M"
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  price: Money;
  selectedOptions: SelectedOption[];
};

export type ProductOption = {
  name: string;
  values: string[];
};

// The Imperfect process, modelled as structured catalog data.
// In real Shopify this maps to product metafields (namespace "process").
export type ProcessSpec = {
  provenance: string;
  condition: string;
  treatment: string[];
  print: string;
  garment: string;
  weight: string;
  origin: string;
  shipping: string;
  // Optional full-text overrides for products whose copy diverges from the
  // shared accordion template (e.g. the cap — "One size / fits all.").
  sizeFitText?: string;
  processText?: string;
};

export type Product = {
  id: string;
  handle: string; // our route/image handle
  shopifyHandle?: string; // live Shopify handle, if it differs from ours
  title: string;
  name: string; // full catalogue name used on cards, e.g. "Electro Union T-Shirt"
  subtitle: string;
  description: string;
  featuredImage: Image;
  images: Image[];
  priceRange: { minVariantPrice: Money };
  options: ProductOption[];
  variants: ProductVariant[];
  tags: string[];
  spec: ProcessSpec;
};

// A campaign is a Shopify collection plus our own presentation metadata.
export type Campaign = {
  id: string;
  handle: string;
  index: string; // "01"
  title: string;
  kicker: string;
  manifesto: string;
  description: string;
  gated: boolean; // visibility — wired later
  comingSoon?: boolean; // placeholder campaign, no products yet
  bg?: string; // optional page background colour
  gif?: string; // optional centred gif (placeholder pages)
  train?: boolean; // show the scrolling ASCII train
  productHandles: string[];
};

export type CartLine = {
  variantId: string;
  productHandle: string;
  title: string;
  variantTitle: string;
  image: Image;
  price: Money;
  quantity: number;
};
