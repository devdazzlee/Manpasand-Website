import type { Metadata } from "next";
import Script from "next/script";
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
  faqPageSchema,
} from "../lib/seo/schema";
import { DEFAULT_FAQS } from "../lib/seo/config";

const GTM_ID = "GTM-K7F45ZVH";
const GA_MEASUREMENT_ID = "G-CWZ4YKC8DK";
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
        {/* LCP preload first — avoid competing early connections */}
        <link
          rel="preload"
          as="image"
          href="/banners/New-Banner-750.webp"
          imageSrcSet="/banners/New-Banner-750.webp 750w, /banners/New-Banner-1200.webp 1200w, /banners/New-Banner-1600.webp 1600w"
          imageSizes="100vw"
          type="image/webp"
          fetchPriority="high"
        />
        {/* dns-prefetch only: Cloudinary/API are below-fold on home (lazy) */}
        <link rel="dns-prefetch" href={API_BASE_URL} />
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
      </head>
      <body
        className={`${poppins.variable} ${playfair.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
        {/* Google Analytics (gtag.js) — do NOT also fire this same ID from a GTM GA4 tag */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-gtag" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}</Script>
        <JsonLd
          data={[
            organizationSchema(),
            websiteSchema(),
            onlineStoreSchema(),
            faqPageSchema(DEFAULT_FAQS),
            ...localBusinessSchemas(),
          ]}
        />
        {children}
        <CartToast />
      </body>
    </html>
  );
}
