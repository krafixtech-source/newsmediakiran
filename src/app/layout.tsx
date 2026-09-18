import type { Metadata } from "next";
import { Inter, Noto_Sans_Devanagari, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-noto-sans-devanagari",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "News Media Kiran | Latest News | Top News | Breaking News",
  description:
    "Leading digital newsroom providing breaking news, in-depth political reporting, crime investigations, Rajasthan regional coverage, business markets, sports and multimedia journalism.",
  metadataBase: new URL("https://newsmediakiran.com"),
  alternates: {
    canonical: "https://newsmediakiran.com",
  },
  openGraph: {
    title: "News Media Kiran | Latest News, Ground Reports & In-Depth Journalism",
    description:
      "Stay ahead with verified breaking news, national affairs, regional updates from Rajasthan, business markets and investigative reporting.",
    url: "https://newsmediakiran.com",
    siteName: "News Media Kiran",
    locale: "hi_IN",
    type: "website",
    images: [
      {
        url: "https://newsmediakiran.com/wp-content/uploads/2025/06/WhatsApp-Image-2024-12-03-at-2.14.26-PM.webp",
        width: 1200,
        height: 630,
        alt: "News Media Kiran Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@newsmediakiran",
    creator: "@newsmediakiran",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

import { LanguageProvider } from "@/context/LanguageContext";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";
import { FloatingRatesWidget } from "@/components/common/FloatingRatesWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${notoDevanagari.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#ffffff] text-[#111827] min-h-screen flex flex-col antialiased selection:bg-[#b91c1c] selection:text-white">
        <LanguageProvider>
          {children}
          <FloatingRatesWidget />
          <FloatingWhatsApp />
        </LanguageProvider>
      </body>
    </html>
  );
}
