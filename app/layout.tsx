import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart/cart-context";
import Marquee from "@/components/marquee";
import SiteHeader from "@/components/site-header";
import CartDrawer from "@/components/cart-drawer";

export const metadata: Metadata = {
  title: "Norrsken Merch",
  description:
    "Merch you wear as a position, not a post. Secondhand garments, printed only on order. Ships across the EU.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <CartProvider live={process.env.SHOPIFY_LIVE === "1"}>
          <SiteHeader />
          <main style={{ flex: 1 }}>{children}</main>
          <Marquee />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
