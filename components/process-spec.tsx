import type { ProcessSpec } from "@/lib/shopify/types";

// The Imperfect process, presented as catalog data — not a badge.
export default function ProcessSpecTable({ spec }: { spec: ProcessSpec }) {
  const rows: [string, string][] = [
    ["Provenance", spec.provenance],
    ["Condition", spec.condition],
    ["Treatment", spec.treatment.join(" · ")],
    ["Print", spec.print],
    ["Garment", spec.garment],
    ["Weight", spec.weight],
    ["Origin", spec.origin],
    ["Shipping", spec.shipping],
  ];
  return (
    <div>
      {rows.map(([k, v]) => (
        <div className="spec-row" key={k}>
          <div className="spec-key">{k}</div>
          <div className="spec-val">{v}</div>
        </div>
      ))}
    </div>
  );
}
