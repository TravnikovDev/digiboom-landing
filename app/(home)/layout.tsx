import type { Viewport } from "next";
import "../globals.css";
import { FONT_VARS } from "../fonts";
import { buildMetadata } from "@/lib/site-metadata";

// One of two root layouts (see app/[locale]/layout.tsx for the others). This one owns the
// site root `/` and serves English directly — no redirect — so the apex URL is the canonical
// English page. `<html>`/`<body>` must live in each root layout.
export const metadata = buildMetadata("en");

export const viewport: Viewport = {
  themeColor: "#EE5C0B",
  colorScheme: "light",
};

export default function HomeLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={FONT_VARS}>
      <body className="bg-blast text-ink antialiased font-sans overflow-x-hidden">{children}</body>
    </html>
  );
}
