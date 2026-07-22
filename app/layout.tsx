import type { Metadata, Viewport } from "next";
import { Bangers, Bebas_Neue, JetBrains_Mono, Rubik } from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-code",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://digiboom.app";

const TITLE = "DigiBoom — we'll explode your sales. In a good way.";
const DESCRIPTION =
  "Selling on Etsy only? DigiBoom opens your Shopify and Gumroad storefronts for you, moves your catalog across and keeps everything in sync — so your digital products get found several times more often. Join the early access list.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "DigiBoom",
  keywords: [
    "digital products",
    "Etsy to Shopify",
    "marketplace sync",
    "sell digital downloads",
    "multi-channel selling",
    "Gumroad",
  ],
  authors: [{ name: "Roman Travnikov" }],
  openGraph: {
    type: "website",
    siteName: "DigiBoom",
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#EE5C0B",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${bangers.variable} ${rubik.variable} ${mono.variable}`}>
      <body className="bg-blast text-ink antialiased font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
