import Image from "next/image";
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer style={{ marginTop: 64 }}>
      <div className="footer-grid" style={{ padding: "32px 16px" }}>
        <div>
          <Image src="/brand/norrsken.svg" alt="Norrsken" width={90} height={12} />
          <p className="u-meta" style={{ marginTop: 12, maxWidth: 200 }}>
            Secondhand garments, printed only on order.
          </p>
        </div>
        <div>
          <div className="u-kicker" style={{ color: "var(--grey)" }}>
            Shop
          </div>
          <ul style={{ marginTop: 8, display: "grid", gap: 6 }}>
            <li>
              <Link href="/shop" className="u-label hover-fade">
                All merch
              </Link>
            </li>
            <li>
              <Link href="/c/electro-union" className="u-label hover-fade">
                Electro Union
              </Link>
            </li>
            <li>
              <Link href="/process" className="u-label hover-fade">
                Process
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="u-kicker" style={{ color: "var(--grey)" }}>
            Shipping
          </div>
          <p className="u-meta" style={{ marginTop: 8, maxWidth: 200 }}>
            Ships across the EU only. Made-to-order pieces are final sale.
          </p>
        </div>
        <div>
          <div className="u-kicker" style={{ color: "var(--grey)" }}>
            Index
          </div>
          <ul style={{ marginTop: 8, display: "grid", gap: 6 }}>
            <li>
              <a
                href="https://norrsken.org"
                target="_blank"
                rel="noreferrer"
                className="u-label hover-fade"
              >
                Go to Norrsken.org →
              </a>
            </li>
            <li className="u-meta">Fulfilled by Imperfect</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
