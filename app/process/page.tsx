import { redirect } from "next/navigation";

// Process was merged into About. Keep the old path working.
export default function ProcessPage() {
  redirect("/about");
}
