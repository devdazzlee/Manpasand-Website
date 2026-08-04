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

/** Body font — 2 weights only (less preload vs LCP on Slow 4G) */
const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

/** Display font — never preload (not needed for LCP) */
const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
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
        {/* Mobile LCP only — single file, no srcset DPR upscale */}
        <link
          rel="preload"
          as="image"
          href="/banners/New-Banner-750.webp"
          type="image/webp"
          fetchPriority="high"
          media="(max-width: 768px)"
        />
        <link
          rel="preload"
          as="image"
          href="/banners/New-Banner-1200.webp"
          type="image/webp"
          fetchPriority="high"
          media="(min-width: 769px)"
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
