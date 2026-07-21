import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "DigiBoom — sell everywhere, manage in one place",
  description:
    "DigiBoom keeps your digital products in sync across Etsy, Shopify and Gumroad — files, prices, metadata and licenses. Publish once, sell everywhere. Join the early access list.",
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
