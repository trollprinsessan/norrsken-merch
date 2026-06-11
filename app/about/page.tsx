import Accordion from "@/components/accordion";
import ImageCarousel from "@/components/image-carousel";

export const metadata = {
  title: "About · Norrsken Merch",
  description:
    "Norrsken Merch is made with Imperfect Industries, a Swedish workshop that rescues secondhand garments and prints them only on order. No profit taken.",
};

const GALLERY: { src: string; caption: string; alt: string }[] = [
  { src: "/process/andri.webp", caption: "Washed", alt: "Washing rescued t-shirts in energy-efficient machines" },
  { src: "/process/process-6.webp", caption: "Steamed", alt: "Steaming and finishing a t-shirt at the studio" },
  { src: "/process/kvalitet.webp", caption: "Pressed & checked", alt: "Steam-pressing a printed Imperfect t-shirt" },
];

const STEPS: [string, string, string][] = [
  [
    "01",
    "Sorting & inspection",
    "All our t-shirts come from second-hand shops where they risk being discarded or exported. We first sort through everything we receive. T-shirts that are torn, have permanent stains or are of different quality or model are sorted out.",
  ],
  [
    "02",
    "Laundry",
    "We wash all sweaters in perfume-free detergent and energy-efficient machines.",
  ],
  [
    "03",
    "Measurement",
    "The shirts that come to us are of many different brands and qualities. To ensure uniform sizes, we have developed a unisex size chart.",
  ],
  [
    "04",
    "Labeling & storage",
    "We brand all our t-shirts with our own logo on the neck, but most of the time you can see the original brand. We also add a removable size sticker that indicates our unisex size.",
  ],
  [
    "05",
    "Ordering & printing",
    "When an order comes in, it tells us which motif and which t-shirt to print. We usually print within 2 working days of receiving the order.",
  ],
  [
    "06",
    "Final handling & final check",
    "After the shirt is printed, it is steam pressed and checked one last time. We ship our customer orders in brown paper bags made from grass fiber.",
  ],
];

export default function AboutPage() {
  return (
    <div style={{ padding: "40px 16px 80px" }}>
      {/* Intro (collaboration) + FAQ */}
      <section className="intro-faq" style={{ marginBottom: 64 }}>
        <p style={{ lineHeight: "18px" }}>
          Norrsken Merch is made together with{" "}
          <a
            href="https://imperfect.se/en"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "underline", textUnderlineOffset: 3 }}
          >
            Imperfect Industries
          </a>
          , a Swedish workshop that saves t-shirts from being discarded, restores
          them by hand, and prints them only once they&rsquo;re ordered. Norrsken
          takes no profit on it: the price covers only Imperfect&rsquo;s work,
          rescuing, restoring, printing and shipping each piece, with nothing
          marked up for us.
        </p>

        <div style={{ marginTop: 0, display: "grid", gap: 5 }}>
          <Accordion title="Shipping & delivery" defaultOpen>
            Each piece is printed only once you order, so delivery takes 7 to 14
            working days. We ship across the EU, packed in paper bags made from
            grass fiber.
          </Accordion>
          <Accordion title="Returns">
            Returns follow your EU consumer rights: 14 days from delivery. Imperfect
            arranges the return label (79 SEK return shipping). Because every piece
            is printed to order, please choose your size with care.
          </Accordion>
          <Accordion title="Sizing">
            Rescued shirts come in many brands, so Imperfect measures each one to a
            unisex size chart. Check it before you order.
          </Accordion>
          <Accordion title="Why secondhand">
            The most sustainable t-shirt is the one that never had to be produced.
            Every piece is a rescued garment, restored and printed only on demand.
          </Accordion>
          <Accordion title="Does Norrsken make money on this?">
            No. Norrsken takes no profit. You pay only for the garment to be
            rescued, printed and shipped by Imperfect.
          </Accordion>
          <Accordion title="Who it's for">
            Made for the Norrsken ecosystem and the people moving it forward, from
            EU electrification to climate. Each campaign is its own page; some open
            to everyone, some behind a code.
          </Accordion>
        </div>
      </section>

      {/* How a piece is made — gallery (left) + steps (right) */}
      <section className="proc-row">
        <ImageCarousel images={GALLERY} />

        <div style={{ display: "grid", gap: 18 }}>
          {STEPS.map(([n, title, body]) => (
            <div key={n}>
              <div className="u-label" style={{ marginBottom: 5 }}>
                {n} {title}
              </div>
              <p className="u-meta" style={{ lineHeight: "15px" }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
