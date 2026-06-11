# Deploy — Norrsken Merch

Headless Next.js storefront over Imperfect Industries' Shopify.
Hosted on **Vercel**; the Norrsken Webflow site links to it.

- **Repo:** https://github.com/trollprinsessan/norrsken-merch
- **Vercel project:** `trollprinsessans-projects/norrsken-merch`
- **Production URL:** https://norrsken-merch.vercel.app
- **Target subdomain:** `merch.norrsken.org`

---

## Environment variables (Vercel → Settings → Environment Variables)

| Key | Value | Notes |
|-----|-------|-------|
| `SHOPIFY_DOMAIN` | `imperfect.se` | Storefront API answers on the primary domain, not `*.myshopify.com` |
| `SHOPIFY_API_VERSION` | `2024-10` | |
| `SHOPIFY_LIVE` | `1` | `1` = real price/stock/checkout; unset = preview catalogue |
| `SHOPIFY_STOREFRONT_TOKEN` | *(secret)* | **Public** Storefront token, safe in the frontend. Copy from local `.env.local`. Never use an Admin token. |

Without the token the app runs in **preview mode** (mock prices, checkout
disabled) — it never errors, it just falls back.

---

## First-time setup (already done once)

1. Code pushed to the GitHub repo above.
2. Vercel project created and linked to the repo (Next.js auto-detected).
3. `SHOPIFY_DOMAIN`, `SHOPIFY_API_VERSION`, `SHOPIFY_LIVE` set for Production.
4. Deployed to production.

## Going fully live (the remaining manual steps)

1. **Make it public** — Settings → **Deployment Protection** → set
   **Vercel Authentication** to **Off** → Save. (New projects gate the URL
   behind Vercel login by default.)
2. **Add the token** — Settings → Environment Variables → add
   `SHOPIFY_STOREFRONT_TOKEN` (Production) → **Deployments → ⋯ → Redeploy**.
   Real Shopify data switches on automatically.
3. **Subdomain** — Settings → **Domains** → add `merch.norrsken.org` → add the
   CNAME it shows at Norrsken's DNS → point the Webflow "Shop" link there.

---

## Day-to-day

- **Deploys are automatic**: every push to `main` triggers a Vercel build.
- **Local dev:** copy `.env.example` → `.env.local`, fill the token, `npm run dev`.
- **Manual deploy:** `vercel --prod` from the project root.

## Before selling

- Confirm **Imperfect's stock** in Shopify — historically only "Small" was in
  stock on the tees; out-of-stock sizes block purchase.
- Compress the large source images (`Content/`, `public/home/4.avif` ≈ 2.9 MB).
