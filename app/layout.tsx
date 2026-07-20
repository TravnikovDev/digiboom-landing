import type { Metadata } from "next";
import { Bangers, Bebas_Neue, Rubik } from "next/font/google";
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

export const metadata: Metadata = {
  title: "DigiBoom — We'll explode your sales. In a good way.",
  description:
    "DigiBoom syncs your digital products across Etsy, Shopify and Gumroad. Edit once — publish everywhere. Join the waitlist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebas.variable} ${bangers.variable} ${rubik.variable}`}>
      <body className="bg-blast text-ink antialiased font-sans overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
