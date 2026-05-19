import { ImageResponse } from "next/og";

import { portfolio } from "@/data/portfolio";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background:
            "radial-gradient(circle at top, rgba(96,165,250,0.24), transparent 34%), radial-gradient(circle at 85% 20%, rgba(34,211,238,0.14), transparent 24%), linear-gradient(180deg, #0b1120 0%, #020617 55%, #050b18 100%)",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "1px solid rgba(191,219,254,0.26)",
            borderRadius: "999px",
            padding: "12px 18px",
            fontSize: "24px",
            alignSelf: "flex-start",
            background: "rgba(14,165,233,0.14)",
            color: "#e0f2fe",
            boxShadow: "0 24px 50px rgba(2,6,23,0.35)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
          }}
        >
          <span>Frontend Portfolio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "860px" }}>
          <div style={{ fontSize: "72px", fontWeight: 800, lineHeight: 1.04 }}>
            {portfolio.fullName}
          </div>
          <div style={{ fontSize: "34px", lineHeight: 1.4, color: "#cbd5e1" }}>
            Polished frontend portfolio with cleaner contrast, refined surfaces, and production-ready UI.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "24px",
            color: "#93c5fd",
          }}
        >
          <span>{portfolio.githubUrl}</span>
          <span>{portfolio.role}</span>
        </div>
      </div>
    ),
    size
  );
}
