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
    },
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
        {/* JSON-LD in <head> — avoids body script hydration #418 */}
        <JsonLd
          data={[
            organizationSchema(),
            websiteSchema(),
            onlineStoreSchema(),
            faqPageSchema(DEFAULT_FAQS),
            ...localBusinessSchemas(),
          ]}
        />
      </head>
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* No GTM <noscript> iframe — it causes React #418 (HTML vs empty) when JS is on */}
        <DeferredAnalytics />
        {children}
        <CartToast />
      </body>
    </html>
  );
}
