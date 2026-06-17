import { ImageResponse } from "next/og";
import { ORGANIZER_NAME } from "@/app/constants";

export const alt = "Lecathon 2.0 — Hack. Build. Innovate.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1200 50%, #0a0a0a 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            color: "#FACC15",
            letterSpacing: 1,
            marginBottom: 24,
            maxWidth: 900,
            lineHeight: 1.3,
          }}
        >
          {`${ORGANIZER_NAME} presents`}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1,
            color: "#FACC15",
          }}
        >
          Lecathon 2.0
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 36,
            color: "#A3A3A3",
            marginTop: 24,
          }}
        >
          Learn · Build · Innovate
        </div>
      </div>
    ),
    { ...size }
  );
}
