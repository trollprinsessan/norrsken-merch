import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/cart/cart-context";
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
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
