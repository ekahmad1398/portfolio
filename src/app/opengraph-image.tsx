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
            "radial-gradient(circle at 72% 8%, rgba(165,139,235,0.22), transparent 36%), radial-gradient(circle at 8% 82%, rgba(117,86,160,0.13), transparent 30%), linear-gradient(145deg, #14111d 0%, #0d0b13 62%, #100d18 100%)",
          color: "#f4f0fa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            border: "1px solid rgba(177,151,243,0.32)",
            borderRadius: "8px",
            padding: "12px 18px",
            fontSize: "24px",
            alignSelf: "flex-start",
            background: "rgba(177,151,243,0.1)",
            color: "#e2d7ff",
            boxShadow: "none",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
          }}
        >
          <span>Full Stack Portfolio</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "860px" }}>
          <div style={{ fontSize: "72px", fontWeight: 800, lineHeight: 1.04 }}>
            {portfolio.fullName}
          </div>
          <div style={{ fontSize: "34px", lineHeight: 1.4, color: "#c0b8ce" }}>
            Full stack developer portfolio focused on MERN applications and thoughtful product experiences.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "24px",
            color: "#b49af5",
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
