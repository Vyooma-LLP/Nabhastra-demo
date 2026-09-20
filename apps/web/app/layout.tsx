import type { Metadata } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

/*
 * Hanken Grotesk is the closest freely-licensable match to the humanist-
 * geometric grotesk in the reference; IBM Plex Mono carries every uppercase
 * technical label. Both are self-hosted by next/font, so there is no render-
 * blocking request to a third-party origin.
 */
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-hanken",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-mono",
});

// Positioning is company-level per the build directive: Nabhastra is a builder
// of aerial systems. The legacy training/talent tagline is deliberately absent
// from the homepage identity (see project/PRODUCT.md §1 on the unresolved
// positioning conflict).
export const metadata: Metadata = {
  metadataBase: new URL("https://nabhastra.co.in"),
  title: {
    default: "Nabhastra — Aerial Systems and Mission Technology",
    template: "%s — Nabhastra",
  },
  description:
    "Nabhastra engineers indigenous aerial platforms, sensing and mission technology for surveillance, agriculture, mapping and logistics.",
  openGraph: {
    type: "website",
    siteName: "Nabhastra",
    locale: "en_IN",
    title: "Nabhastra — Aerial Systems and Mission Technology",
    description:
      "Indigenous aerial platforms, sensing and mission technology, engineered in India.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${hanken.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
