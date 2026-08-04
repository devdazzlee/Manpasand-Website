import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import CartToast from "./components/CartToast";
import DeferredAnalytics from "./components/DeferredAnalytics";
import JsonLd from "./components/seo/JsonLd";
import { API_BASE_URL } from "../config/config";
import { buildMetadata } from "../lib/seo/metadata";
import {
  localBusinessSchemas,
  onlineStoreSchema,
  organizationSchema,
  websiteSchema,
  faqPageSchema,
} from "../lib/seo/schema";
import { DEFAULT_FAQS } from "../lib/seo/config";

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
  verification: {
    google: "8lrFYE_ngbLPvaTrJKb0vmmKCtjzDwxvSDR7jgmYGL8",
    other: {
      "msvalidate.01": "E4056095F1036C333F0D0C0DC11861C1",
      "geo.region": "PK",
      "geo.placename": "Pakistan",
      ICBM: "24.8827589, 67.069352",
      language: "English",
      coverage: "Pakistan",
      distribution: "global",
      rating: "general",
      "revisit-after": "3 days",
    },
  },
  other: {
    "format-detection": "telephone=no",
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
        <link
          rel="preload"
          as="image"
          href="/banners/New-Banner-750.webp"
          imageSrcSet="/banners/New-Banner-750.webp 750w, /banners/New-Banner-1200.webp 1200w, /banners/New-Banner-1600.webp 1600w"
          imageSizes="100vw"
          type="image/webp"
          fetchPriority="high"
        />
        <link rel="dns-prefetch" href={API_BASE_URL} />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <meta name="theme-color" content="#0D2B3A" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
      </head>
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* JSON-LD in body — avoids head script hydration #418 (HTML vs empty) */}
        <JsonLd
          data={[
            organizationSchema(),
            websiteSchema(),
            onlineStoreSchema(),
            faqPageSchema(DEFAULT_FAQS),
            ...localBusinessSchemas(),
          ]}
        />
        <DeferredAnalytics />
        {children}
        <CartToast />
      </body>
    </html>
  );
}
