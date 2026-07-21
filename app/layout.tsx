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
  title: "DigiBoom — we'll explode your sales. In a good way.",
  description:
    "Selling on Etsy only? DigiBoom opens your Shopify and Gumroad storefronts for you, moves your catalog across and keeps everything in sync — so your digital products get found several times more often. Join the early access list.",
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
