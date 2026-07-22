import { ImageResponse } from "next/og";
import { bombMarkDataUri } from "@/lib/bomb-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#EE5C0B",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bombMarkDataUri({ spark: false })} width={150} height={176} alt="" />
      </div>
    ),
    size
  );
}
