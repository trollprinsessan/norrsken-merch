import type { Product, Campaign } from "./types";

// ------------------------------------------------------------------
// MOCK DATA — shaped exactly like the Shopify Storefront API response.
// Real product data lives in Imperfect's Shopify. When the Storefront
// token arrives, replace lib/shopify/index.ts with live GraphQL calls;
// none of the UI changes.
// ------------------------------------------------------------------

const SEK = (n: number) => ({ amount: n.toFixed(2), currencyCode: "SEK" });
const TEE_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

function tee(args: {
  handle: string;
  shopifyHandle?: string;
  title: string;
  name: string;
  subtitle: string;
  price: number;
  front: string;
  back: string;
  description: string;
  soldOut?: string[];
}): Product {
  const frontImg = {
    url: args.front,
    altText: `${args.title} · ${args.subtitle} · front`,
    width: 1200,
    height: 1200,
  };
  const backImg = {
    url: args.back,
    altText: `${args.title} · ${args.subtitle} · back`,
    width: 1200,
    height: 1200,
  };
  return {
    id: `gid://mock/Product/${args.handle}`,
    handle: args.handle,
    shopifyHandle: args.shopifyHandle,
    title: args.title,
    name: args.name,
    subtitle: args.subtitle,
    description: args.description,
    featuredImage: frontImg,
    images: [frontImg, backImg],
    priceRange: { minVariantPrice: SEK(args.price) },
    options: [{ name: "Size", values: TEE_SIZES }],
    variants: TEE_SIZES.map((s) => ({
      id: `gid://mock/Variant/${args.handle}-${s}`,
      title: s,
      availableForSale: !(args.soldOut ?? []).includes(s),
      price: SEK(args.price),
      selectedOptions: [{ name: "Size", value: s }],
    })),
    tags: ["secondhand", "print-on-order", "eu-only"],
    spec: {
      provenance: "Secondhand. Rescued from disposal.",
      condition: "Inspected and graded by hand.",
      treatment: ["Washed", "Size-matched", "Steam-pressed"],
      print: "Applied only once the order is placed.",
      garment: "Minimum 50 % cotton. Unique base garment.",
      weight: "Light-to-mid weight.",
      origin: "Reworked in Sweden.",
      shipping: "Ships across the EU.",
    },
  };
}

export const PRODUCTS: Product[] = [
  tee({
    handle: "electro-union-red",
    title: "Electro Union",
    name: "Electro Union T-Shirt Red",
    subtitle: "Red",
    price: 299,
    front: "/products/eu-red-front.png",
    back: "/products/eu-red-back.png",
    description:
      "A retired tee, rescued and re-printed with the Electro Union mark. Every base garment is one of one. Weave, weight and white shift between pieces. Worn, not posted.",
  }),
  tee({
    handle: "electro-union-stars",
    title: "Make EU the Electro Union",
    name: "Electro Union T-Shirt Blue",
    subtitle: "Blue",
    price: 199,
    front: "/products/eu-stars-front.png",
    back: "/products/eu-blue-back.png",
    description:
      "Twelve stars, twice over. A campaign mark for a fully electrified Europe. Clean power, no compromise. Printed on a rescued tee only when you order.",
    soldOut: ["XS"],
  }),
  tee({
    handle: "electro-union-oval",
    shopifyHandle: "electro-union-oval-1",
    title: "Electro Union",
    name: "Electro Union T-Shirt Blue",
    subtitle: "Blue",
    price: 199,
    front: "/products/eu-oval-front.png",
    back: "/products/eu-blue-back.png",
    description:
      "Make Europe the Electro-Union. A borrowed seal, redrawn. One rescued garment, printed to order, shipped across the EU.",
  }),
  tee({
    handle: "electro-union-press",
    shopifyHandle: "electro-union-plug-it-in",
    title: "Electro Union",
    name: "Electro Union T-Shirt Brick",
    subtitle: "Brick",
    price: 199,
    front: "/products/eu-press-front.png",
    back: "/products/eu-black-back.png",
    description:
      "A pressed-metal nameplate, set on a rescued tee. The least loud of the campaign. Printed only on order.",
    soldOut: ["XS", "S"],
  }),
  {
    // Cap — single size, separate option set.
    id: "gid://mock/Product/electro-union-cap",
    handle: "electro-union-cap",
    title: "Electro Union",
    name: "Electro Union Cap Blue",
    subtitle: "Blue",
    description:
      "Six panels, low profile, embroidered Electro Union mark. One size, adjustable. Made to order, shipped across the EU.",
    featuredImage: {
      url: "/products/eu-cap.png",
      altText: "Electro Union · Cap",
      width: 1040,
      height: 1040,
    },
    images: [
      {
        url: "/products/eu-cap.png",
        altText: "Electro Union · Cap",
        width: 1040,
        height: 1040,
      },
    ],
    priceRange: { minVariantPrice: SEK(349) },
    options: [{ name: "Size", values: ["One size"] }],
    variants: [
      {
        id: "gid://mock/Variant/electro-union-cap-os",
        title: "One size",
        availableForSale: true,
        price: SEK(349),
        selectedOptions: [{ name: "Size", value: "One size" }],
      },
    ],
    tags: ["made-to-order", "eu-only"],
    spec: {
      // Details = provenance + condition + garment
      provenance: "Made to order. Secondhand.",
      condition: "Rescued from disposal.",
      garment: "Inspected by hand.",
      // Size & Fit and Process use full-text overrides (cap copy diverges)
      sizeFitText: "One size / fits all.",
      processText:
        "Thoroughly cleaned. Printed only once the order is placed. Finished in Sweden. Ships across the EU. Minor mending may occur. The most sustainable garment is the one that never had to be produced. Nothing here is printed until you order it.",
      // Retained for completeness; superseded by the overrides above.
      treatment: ["Thoroughly cleaned"],
      print: "Printed only once the order is placed.",
      weight: "One size / fits all.",
      origin: "Finished in Sweden.",
      shipping: "Ships across the EU.",
    },
  },
];

export const CAMPAIGNS: Campaign[] = [
  {
    id: "gid://mock/Collection/electro-union",
    handle: "electro-union",
    index: "01",
    title: "Electro Union",
    kicker: "Campaign 01: EU electrification",
    manifesto: "Make EU\nthe Electro\nUnion.",
    description:
      "A campaign for a fully electrified Europe. Clean power, grid before pipeline, no compromise. The mark is borrowed Americana, redrawn for the continent that should lead. Each piece is a rescued garment, printed only on order. A position you wear, not a post you scroll.",
    gated: false,
    productHandles: [
      "electro-union-red",
      "electro-union-stars",
      "electro-union-oval",
      "electro-union-press",
      "electro-union-cap",
    ],
  },
  {
    id: "gid://mock/Collection/100-ways",
    handle: "100-ways",
    index: "02",
    title: "100 Ways to Fix the Future",
    kicker: "Campaign 02",
    manifesto: "",
    description:
      "One hundred small interventions for a future worth wearing. The drop is in the making.",
    gated: false,
    comingSoon: true,
    productHandles: [],
  },
  {
    id: "gid://mock/Collection/prompt-what-matters",
    handle: "prompt-what-matters",
    index: "03",
    title: "Prompt What Matters",
    kicker: "Campaign 03",
    manifesto: "",
    description:
      "Ask the questions that count. A campaign about prompting for impact, not noise. Coming soon.",
    gated: false,
    comingSoon: true,
    gif: "/campaigns/prompt-what-matters.gif",
    productHandles: [],
  },
];
