// src/components/CircleContentOverlay.tsx
import React from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import HeaderBar from "./HeaderBar";
import AboutPane from "./AboutPane";
import ContactPane from "./ContactPane";
import useVh from "../hooks/useVH";

export default function CircleContentOverlay({
  p,
  deadZone = 0.15,
  easePower = 1.5,
  curvePower = 1.6,
}: {
  p: number;
  deadZone?: number;
  easePower?: number;
  curvePower?: number;
}) {
  // iOS-safe 100vh variable
  useVh();

  // --- opacity curves ---
  const toUnit = (val: number) =>
    THREE.MathUtils.clamp((val - deadZone) / (1 - deadZone), 0, 1);
  const sideRawR = Math.max(0, p);
  const sideRawL = Math.max(0, -p);
  const easedR = Math.pow(toUnit(sideRawR), easePower);
  const easedL = Math.pow(toUnit(sideRawL), easePower);
  const expR = Math.pow(easedR, curvePower);
  const expL = Math.pow(easedL, curvePower);
  const smoothstep = (a: number, b: number, x: number) => {
    const t = THREE.MathUtils.clamp((x - a) / Math.max(1e-6, b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };
  const rightOpacity = smoothstep(0.75, 0.97, expR);
  const leftOpacity = smoothstep(0.75, 0.97, expL);
  const headerOpacity = Math.max(leftOpacity, rightOpacity);

  // --- Hysteresis for interaction gating ---
  const LEFT_ON = 0.85,
    LEFT_OFF = 0.7;
  const RIGHT_ON = 0.85,
    RIGHT_OFF = 0.7;

  const [leftInteractive, setLeftInteractive] = React.useState(false);
  const [rightInteractive, setRightInteractive] = React.useState(false);

  React.useEffect(() => {
    setLeftInteractive((prev) =>
      prev ? leftOpacity > LEFT_OFF : leftOpacity > LEFT_ON,
    );
  }, [leftOpacity]);

  React.useEffect(() => {
    setRightInteractive((prev) =>
      prev ? rightOpacity > RIGHT_OFF : rightOpacity > RIGHT_ON,
    );
  }, [rightOpacity]);

  // Scroll indicators visible near center, fade as user scrolls
  const indicatorOpacity = 1 - Math.min(1, Math.abs(p) / 0.15);

  return (
    <Html fullscreen transform={false}>
      <HeaderBar opacity={headerOpacity} />

      {/* Scroll indicators */}
      {indicatorOpacity > 0 && (
        <>
          {/* Left — About */}
          <div
            style={{
              position: "absolute",
              left: 28,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: indicatorOpacity * 0.7,
              pointerEvents: "none",
              transition: "opacity 200ms ease",
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              style={{ opacity: 0.9 }}
            >
              <path
                d="M11 4L6 9L11 14"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#fff",
              }}
            >
              About
            </span>
          </div>

          {/* Right — Contact */}
          <div
            style={{
              position: "absolute",
              right: 28,
              top: "50%",
              transform: "translateY(-50%)",
              display: "flex",
              alignItems: "center",
              gap: 8,
              opacity: indicatorOpacity * 0.7,
              pointerEvents: "none",
              transition: "opacity 200ms ease",
            }}
          >
            <span
              style={{
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#fff",
              }}
            >
              Contact
            </span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              style={{ opacity: 0.9 }}
            >
              <path
                d="M7 4L12 9L7 14"
                stroke="#fff"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </>
      )}

      {/* About — always full-screen, fades in with scroll */}
      {leftOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "1fr",
            justifyItems: "center",
            pointerEvents: leftInteractive ? "auto" : "none",
            overscrollBehavior: "contain",
            background: `rgba(0,0,0,${leftOpacity * 0.92})`,
          }}
        >
          <AboutPane opacity={leftOpacity} active={leftInteractive} />
        </div>
      )}

      {/* Contact — always full-screen, fades in with scroll */}
      {rightOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "1fr",
            justifyItems: "center",
            pointerEvents: rightInteractive ? "auto" : "none",
            overscrollBehavior: "contain",
            background: `rgba(0,0,0,${rightOpacity * 0.92})`,
          }}
        >
          <ContactPane
            opacity={rightOpacity}
            active={rightInteractive}
            stacked
          />
        </div>
      )}
    </Html>
  );
}
