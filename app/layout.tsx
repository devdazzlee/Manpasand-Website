import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import CartToast from "./components/CartToast";

const poppins = Poppins({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
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
