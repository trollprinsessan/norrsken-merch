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
      {/* Masthead — cheap.urls.loan layout, Electro Union copy */}
      <div className="cu-top">
        <h1 className="cu-inquire">Join The Union!!</h1>
        <div className="cu-logo">
          <Image src="/ElectroUnion_Hero_logo.png" alt="Make EU the Electro Union" width={344} height={190} style={{ width: "min(258px, 60vw)", height: "auto", display: "block", margin: "25px auto" }} />
        </div>


        <div className="cu-cols">
          <div className="cu-col">
            <p className="cu-head cu-head--italic">Rescued Garments,<br />Printed On Order</p>
          </div>

          <div className="cu-col">
            <p className="cu-head">The Good Life Deserves<br />To Be Resilient</p>
          </div>
        </div>

        <div className="cu-headline-row">
          <h2 className="cu-headline">Official<br />Merchandise</h2>
        </div>

        <div className="cu-badges" style={{ marginTop: "20px" }}>
          <span className="cu-badge">
            <span style={{ fontFamily: "var(--sans)", fontWeight: 900, fontStyle: "italic", fontSize: "8px", color: "var(--eBlue)", letterSpacing: "-0.02em" }}>VISA</span>
          </span>
          <span className="cu-badge">
            <svg width="17" height="11" viewBox="0 0 34 22" aria-label="Mastercard">
              <circle cx="13" cy="11" r="9" fill="none" stroke="rgb(4,15,170)" strokeWidth="2" />
              <circle cx="21" cy="11" r="9" fill="none" stroke="rgb(4,15,170)" strokeWidth="2" />
            </svg>
          </span>
          <span className="cu-badge">
            <span style={{ fontFamily: "var(--sans)", fontWeight: 800, fontSize: "7px", color: "var(--eBlue)" }}>Klarna.</span>
          </span>
          <span className="cu-badge">
            <svg width="13" height="13" viewBox="0 0 26 28" aria-label="PayPal">
              <path d="M7 4 h7 c4 0 6 2 5 6 c-1 4 -4 5 -8 5 h-3 l-1 6 h-4 z" fill="none" stroke="rgb(4,15,170)" strokeWidth="2" />
              <path d="M12 9 h6 c4 0 6 2 5 6 c-1 4 -4 5 -8 5 h-3 l-1 6 h-4 z" fill="none" stroke="rgb(4,15,170)" strokeWidth="2" />
            </svg>
          </span>
          <span className="cu-badge">
            <span style={{ fontFamily: "var(--sans)", fontWeight: 800, fontStyle: "italic", fontSize: "8px", color: "var(--eBlue)" }}>swish</span>
          </span>
        </div>

        <div className="cu-body">
          <p>Europe knows the good life. And the good life deserves resilience. Each piece is a rescued secondhand garment, washed, size-matched, and printed only once you order. Printed in Sweden by Imperfect Industries. Shipped across the EU. Norrsken takes no margin. The price covers production and shipping only. Make Europe the Electro Union.</p>
        </div>

        <details className="cu-faq-foldout">
          <summary className="cu-faq"><span className="cu-tri">▶ </span>Click for FAQs!</summary>
          <div className="cu-faq-acc">
            <details className="cu-faq-item">
              <summary className="cu-faq-q">What does &quot;rescued garment&quot; mean?</summary>
              <p className="cu-faq-a">The most sustainable shirt is one that never had to be made. Each piece is a secondhand garment, saved from being discarded, restored by hand at Imperfect Industries in Sweden, and printed only once you order.</p>
            </details>
            <details className="cu-faq-item">
              <summary className="cu-faq-q">How do the sizes run?</summary>
              <p className="cu-faq-a">Rescued shirts come in many brands, so Imperfect measures each one to a unisex size chart. Check it before you order.</p>
            </details>
            <details className="cu-faq-item">
              <summary className="cu-faq-q">Where does the money go?</summary>
              <p className="cu-faq-a">Norrsken takes no profit. The price covers only Imperfect&apos;s work — rescuing, restoring, printing and shipping each piece. Nothing is marked up for us.</p>
            </details>
            <details className="cu-faq-item">
              <summary className="cu-faq-q">Shipping &amp; returns?</summary>
              <p className="cu-faq-a">Printed only once you order, so delivery takes 7–14 working days across the EU, packed in grass-fiber paper bags. Returns follow your EU rights: 14 days from delivery, with a 79 SEK return label.</p>
            </details>
            <details className="cu-faq-item">
              <summary className="cu-faq-q">Who is this for?</summary>
              <p className="cu-faq-a">Made for the Norrsken ecosystem and the people moving it forward, from EU electrification to climate. Each campaign is its own page; some open to everyone, some behind a code.</p>
            </details>
          </div>
        </details>
      </div>

      {/* Product grid */}
      <div className="embed-grid-list">
        {products.map((p, i) => (
          <Link key={p.id} href={`/embed/p/${p.handle}`} className="embed-drop">
            <div className="embed-drop__img">
              <Image
                src={p.featuredImage.url}
                alt={p.featuredImage.altText}
                fill
                sizes="33vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="embed-drop__head">
<span className="embed-drop__name">{p.name}</span>
              <span className="embed-drop__price">{formatMoney(p.priceRange.minVariantPrice)}</span>
            </div>
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
