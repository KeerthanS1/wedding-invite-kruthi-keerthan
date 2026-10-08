import { ImageResponse } from "next/og";

export const alt = "Kruthi & Keerthan | Our Wedding";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#3a0f17",
          color: "#fbf5e6",
          border: "14px solid #3a0f17",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            border: "2px solid #c9a24d",
          }}
        >
          <div style={{ fontSize: 26, letterSpacing: 12, color: "#c9a24d" }}>TOGETHER WITH OUR FAMILIES</div>
          <div style={{ fontSize: 118, marginTop: 28, display: "flex" }}>Kruthi &amp; Keerthan</div>
          <div style={{ fontSize: 36, marginTop: 14, fontStyle: "italic", color: "#e6d5b4" }}>Our Forever Begins Here</div>
          <div style={{ fontSize: 28, marginTop: 36, letterSpacing: 10, color: "#c9a24d" }}>20 NOVEMBER 2026</div>
        </div>
      </div>
    ),
    size,
  );
}
