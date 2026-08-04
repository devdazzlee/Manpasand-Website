import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import CartToast from "./components/CartToast";
import JsonLd from "./components/seo/JsonLd";
import { API_BASE_URL } from "../config/config";
import { buildMetadata } from "../lib/seo/metadata";
import {
  localBusinessSchemas,
  onlineStoreSchema,
  organizationSchema,
  websiteSchema,
} from "../lib/seo/schema";

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
  ...buildMetadata({ path: "/" }),
  title: {
    default: "Manpasand Store - Premium Dry Fruits, Dates, Nuts & Spices",
    template: "%s | Manpasand Store",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/Manpasand-Logo.png",
  },
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
        <meta name="theme-color" content="#0D2B3A" />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="geo.region" content="PK" />
        <meta name="geo.placename" content="Pakistan" />
        <meta name="ICBM" content="24.8827589, 67.069352" />
        <meta name="author" content="Manpasand Store" />
        <meta name="copyright" content="Manpasand Store" />
        <meta name="language" content="English" />
        <meta name="coverage" content="Pakistan" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="3 days" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
      </head>
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        <JsonLd
          data={[
            organizationSchema(),
            websiteSchema(),
            onlineStoreSchema(),
            ...localBusinessSchemas(),
          ]}
        />
        {children}
        <CartToast />
      </body>
    </html>
  );
}
