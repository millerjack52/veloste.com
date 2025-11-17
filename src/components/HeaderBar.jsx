import HeaderLogoCanvas from "./HeaderLogoCanvas";
export default function HeaderBar({ opacity }) {
    return (<div style={{
            position: "absolute",
            top: "max(16px, env(safe-area-inset-top))",
            left: "50%",
            transform: "translateX(-50%)",
            opacity,
            transition: "opacity 120ms linear",
            pointerEvents: opacity > 0.6 ? "auto" : "none",
            zIndex: 3,
        }}>
      <div className="page-header-box" style={{
            width: "clamp(220px, 28vw, 520px)",
            aspectRatio: "5 / 1",
            borderRadius: 14,
            overflow: "hidden",
            background: "transparent",
            boxShadow: "none",
        }}>
        <HeaderLogoCanvas />
      </div>
    </div>);
}
