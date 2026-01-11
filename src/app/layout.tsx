import type { Metadata } from "next";

import "./globals.css";
import Link from 'next/link';
import { CartProvider } from "@/components/cart/cart-context";
import { CartSidebar } from "@/components/cart/cart-sidebar";
import { CartIndicator } from "@/components/cart/cart-indicator";

import { Geist, Geist_Mono } from "next/font/google"; // Reverting to Google Fonts

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luxe Parfums | Signature Scents",
  description: "Exclusive collection of premium fragrances.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        <CartProvider>
          <CartSidebar />
          {/* Navigation */}
          <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-lg border-b border-white/10">
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
              <Link href="/" className="text-xl font-heading font-bold text-[#D4AF37] tracking-wider">
                LUXE PARFUMS
              </Link>

              <div className="flex items-center gap-6">
                <Link href="/" className="text-sm hover:text-[#D4AF37] transition-colors">Home</Link>
                <Link href="/track" className="text-sm hover:text-[#D4AF37] transition-colors">Track Order</Link>
                <Link href="/admin" className="text-sm hover:text-[#D4AF37] transition-colors">Admin</Link>
                <CartIndicator />
              </div>
            </div>
          </nav>

          <main className="flex-1 pt-16">
            {children}
          </main>

          <footer className="py-8 border-t border-white/10 mt-auto bg-black">
            <div className="container mx-auto px-6 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Luxe Parfums. All rights reserved.
            </div>
          </footer>
        </CartProvider>
      </body>
    </html>
  );
}
