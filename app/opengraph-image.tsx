import { ImageResponse } from "next/og";

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
            fontSize: 28,
            color: "#FACC15",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          LEC-HACKS presents
        </div>
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1,
            color: "#FACC15",
          }}
        >
          Lecathon 2.0
        </div>
        <div style={{ fontSize: 36, color: "#A3A3A3", marginTop: 24 }}>
          Learn · Build · Innovate
        </div>
      </div>
    ),
    { ...size }
  );
}
