export default function HeaderBar({ opacity }: { opacity: number }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "max(16px, env(safe-area-inset-top))",
        left: "50%",
        transform: "translateX(-50%)",
        opacity,
        transition: "opacity 120ms linear",
        pointerEvents: opacity > 0.6 ? "auto" : "none",
        zIndex: 3,
      }}
    >
      <div
        className="page-header-box"
        style={{
          width: "clamp(220px, 28vw, 520px)",
          aspectRatio: "5 / 1",
          borderRadius: 14,
          overflow: "hidden",
          background: "transparent",
          boxShadow: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/vstar.svg"
          alt="Veloste"
          width={520}
          height={104}
          draggable={false}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
