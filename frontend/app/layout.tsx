import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { RecentlyViewedProvider } from "./contexts/RecentlyViewedContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "モテ服 - トップナンパ師監修のモテる服を最安値で",
  description: "トップナンパ師が監修するモテる服を、最安値で購入できるサービス「モテ服」",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-[#f5f5f5]`}
      >
        <CartProvider>
          <FavoritesProvider>
            <RecentlyViewedProvider>
              {children}
            </RecentlyViewedProvider>
          </FavoritesProvider>
        </CartProvider>
      </body>
    </html>
  );
}
