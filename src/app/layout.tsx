import type { Metadata } from "next";
import "./globals.css";
import { MainNav } from "@/components/main-nav";
import { SiteFooter } from "@/components/site-footer";
import { CartProviderWithDrawer } from "@/components/cart-provider";

export const metadata: Metadata = {
  title: "Le Cadeau – Luxury Florist",
  description:
    "Le Cadeau is a high-end luxury florist offering cinematic bouquets, hat boxes, candles, and curated indoor plants.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased min-h-screen bg-background text-foreground">
        <CartProviderWithDrawer>
          <div className="flex min-h-screen flex-col">
            <MainNav />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </div>
        </CartProviderWithDrawer>
      </body>
    </html>
  );
}
