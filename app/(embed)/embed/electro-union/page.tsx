import Image from "next/image";
import Link from "next/link";
import { getCampaign, getCampaignProducts, formatMoney } from "@/lib/shopify";
import { notFound } from "next/navigation";

export const metadata = { title: "Electro Union · Norrsken Merch" };

export default async function EmbedCampaignPage() {
  const [campaign, products] = await Promise.all([
    getCampaign("electro-union"),
    getCampaignProducts("electro-union"),
  ]);
  if (!campaign) notFound();

  return (
    <div>
      {/* Masthead — mirrors cheap.urls.loan structure */}
      <div className="embed-masthead">
        <div className="embed-masthead__title">
          Electro<br />Union
        </div>
        <div className="embed-masthead__sub">
          "Make Europe the Electro Union"
        </div>

        {/* Two-column section below rule */}
        <div className="embed-masthead__cols">
          <div className="embed-masthead__left">
            <div className="embed-masthead__left-label">
              Secondhand,<br />rescued<br />&amp; re-printed
            </div>
            <div className="embed-pay-row">
              <span className="embed-pay-badge">
                <svg viewBox="0 0 72 44" width="72" height="44" xmlns="http://www.w3.org/2000/svg">
                  <text x="36" y="30" textAnchor="middle" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="24" fill="#1A1F71" fontStyle="italic" letterSpacing="-1">VISA</text>
                </svg>
              </span>
              <span className="embed-pay-badge">
                <svg viewBox="0 0 72 44" width="72" height="44" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="26" cy="22" r="13" fill="#EB001B"/>
                  <circle cx="46" cy="22" r="13" fill="#F79E1B"/>
                  <path d="M36 11.2a13 13 0 0 1 0 21.6A13 13 0 0 1 36 11.2z" fill="#FF5F00"/>
                </svg>
              </span>
              <span className="embed-pay-badge">
                <svg viewBox="0 0 72 44" width="72" height="44" xmlns="http://www.w3.org/2000/svg">
                  <rect width="72" height="44" fill="#FFB3C7"/>
                  <text x="36" y="29" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="15" fill="#17120F" letterSpacing="0.5">klarna</text>
                </svg>
              </span>
              <span className="embed-pay-badge">
                <svg viewBox="0 0 72 44" width="72" height="44" xmlns="http://www.w3.org/2000/svg">
                  <text x="36" y="22" textAnchor="middle" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="13" fill="#003087">Pay</text>
                  <text x="36" y="36" textAnchor="middle" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="13" fill="#009CDE">Pal</text>
                </svg>
              </span>
              <span className="embed-pay-badge">
                <svg viewBox="0 0 72 44" width="72" height="44" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="sw" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#EF3576"/>
                      <stop offset="100%" stopColor="#A01E8E"/>
                    </linearGradient>
                  </defs>
                  <text x="36" y="29" textAnchor="middle" fontFamily="Arial Black, Arial" fontWeight="900" fontSize="15" fill="url(#sw)">swish</text>
                </svg>
              </span>
            </div>
          </div>

          <div className="embed-masthead__right">
            <div className="embed-masthead__right-label">
              Campaign No. 01,<br />Norrsken Foundation
            </div>
            <a
              href="https://merch.norrsken.org/c/electro-union"
              className="embed-masthead__right-link"
              target="_blank"
              rel="noreferrer"
            >
              MERCH.NORRSKEN.ORG
            </a>
          </div>
        </div>
      </div>

      {/* Description as body text */}
      <p className="embed-masthead__desc">{campaign.description}</p>

      {/* Product grid */}
      <div className="embed-grid-list">
        {products.map((p, i) => (
          <Link key={p.id} href={`/embed/p/${p.handle}`} className="embed-drop">
            <div className="embed-drop__head">
              <span className="embed-drop__num">0{i + 1}</span>
              <span className="embed-drop__name">{p.name}</span>
              <span className="embed-drop__price">{formatMoney(p.priceRange.minVariantPrice)}</span>
            </div>
            <div className="embed-drop__img">
              <Image
                src={p.featuredImage.url}
                alt={p.featuredImage.altText}
                fill
                sizes="100vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="embed-drop__sub">{p.subtitle}</div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div className="embed-foot">
        <span>Secondhand · rescued · re-printed</span>
        <a href="https://merch.norrsken.org/shop" target="_blank" rel="noreferrer">
          Full shop →
        </a>
      </div>
    </div>
  );
}
