import { readFileSync } from "fs";
import { join } from "path";

// ASCII art read from disk so the exact characters survive (no JS escaping).
const ART = readFileSync(join(process.cwd(), "lib/ascii-train.txt"), "utf8");

export default function AsciiTrain() {
  return (
    <div className="train" aria-hidden="true">
      <div className="train__track">
        <pre className="train__car">{ART}</pre>
        <pre className="train__car">{ART}</pre>
      </div>
    </div>
  );
}
