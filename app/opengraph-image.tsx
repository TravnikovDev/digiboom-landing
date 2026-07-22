import { ImageResponse } from "next/og";
import { bombMarkDataUri } from "@/lib/bomb-mark";
import { loadOgFonts } from "@/lib/og-font";

export const alt = "DigiBoom — we'll explode your sales. In a good way.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default async function Image() {
  const { fonts, hasBebas } = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#EE5C0B",
          position: "relative",
          fontFamily: "Rubik",
        }}
      >
        {/* blueprint grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.11) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* studio light behind the mascot */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            backgroundImage: "radial-gradient(circle at 76% 50%, rgba(255,255,255,0.22), rgba(255,255,255,0) 55%)",
          }}
        />

        {/* copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 0 0 72px",
            width: 720,
          }}
        >
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              background: "rgba(255,255,255,0.92)",
              border: "3px solid #1B1712",
              borderRadius: 8,
              padding: "6px 14px",
              fontSize: 22,
              color: "#1B1712",
              letterSpacing: 1,
            }}
          >
            in development · beta 2026
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontFamily: hasBebas ? "Bebas" : "Rubik",
              fontSize: hasBebas ? 104 : 72,
              lineHeight: 0.95,
              color: "#FFFFFF",
              letterSpacing: hasBebas ? 1 : -2,
            }}
          >
            <div style={{ display: "flex" }}>We&apos;ll explode</div>
            <div style={{ display: "flex" }}>your sales.</div>
            <div style={{ display: "flex", color: "#1B1712" }}>In a good way.</div>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 30,
              fontSize: 27,
              color: "#1B1712",
              maxWidth: 620,
              lineHeight: 1.4,
            }}
          >
            One shop becomes three. We open your Shopify and Gumroad storefronts, move your catalog across, and keep it in
            sync.
          </div>
        </div>

        {/* mascot */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bombMarkDataUri()} width={392} height={461} alt="" />
        </div>
      </div>
    ),
    { ...size, fonts: fonts.length ? fonts : undefined }
  );
}
