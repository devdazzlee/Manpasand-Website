import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import CartToast from "./components/CartToast";
import { API_BASE_URL } from "../config/config";

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Manpasand Store - Premium Dry Fruits, Dates, Nuts & Spices",
  description: "Shop premium quality dry fruits, dates, nuts, honey, saffron, herbs, spices, and pulses. 25+ years of excellence in Bahadurabad, Karachi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href={API_BASE_URL} />
        <link rel="dns-prefetch" href={API_BASE_URL} />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link
          rel="preload"
          as="image"
          href="/banners/New-Banner-750.webp"
          imageSrcSet="/banners/New-Banner-750.webp 750w, /banners/New-Banner-1200.webp 1200w, /banners/New-Banner-1600.webp 1600w"
          imageSizes="100vw"
          type="image/webp"
          fetchPriority="high"
        />
      </head>
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <CartToast />
      </body>
    </html>
  );
}
