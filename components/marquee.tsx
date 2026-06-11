const ITEMS = [
  "Ships across the EU",
  "Printed only when ordered",
  "Secondhand · rescued · re-printed",
  "The most sustainable t-shirt is the one that never had to be produced",
  "14-day returns across the EU",
];

export default function Marquee() {
  // Content is duplicated so the -50% translate loops seamlessly.
  const sequence = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee">
      <div className="marquee__track">
        <div className="marquee__inner">
          {sequence.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
