import React from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import HeaderBar from "./HeaderBar";
import AboutPane from "./AboutPane";
import ContactPane from "./ContactPane";
import useVh from "../hooks/useVH";

const ACTIVATE_AT = 0.9;
const EPS = 0.0001;

const baseGridStyle = {
  position: "absolute",
  inset: 0,
  display: "grid",
  justifyItems: "center",
  pointerEvents: "auto",
  overscrollBehavior: "contain",
};

function getSideOpacity(p, deadZone, easePower, curvePower) {
  const unit = THREE.MathUtils.clamp(
    (Math.max(0, p) - deadZone) / (1 - deadZone),
    0,
    1
  );

  const eased = unit ** easePower;
  const curved = eased ** curvePower;

  // uses Three's built-in smoothstep: smoothstep(x, min, max)
  return THREE.MathUtils.smoothstep(curved, 0.75, 0.97);
}

export default function CircleContentOverlay({
  p,
  deadZone = 0.15,
  easePower = 1.5,
  curvePower = 1.6,
}) {
  useVh();

  const rightOpacity = getSideOpacity(p, deadZone, easePower, curvePower);
  const leftOpacity = getSideOpacity(-p, deadZone, easePower, curvePower);

  const headerOpacity = Math.max(leftOpacity, rightOpacity);

  const leftActive = leftOpacity > ACTIVATE_AT;
  const rightActive = rightOpacity > ACTIVATE_AT;

  const isRight = p > EPS;
  const isLeft = p < -EPS;

  return (
    <Html fullscreen transform={false}>
      <HeaderBar opacity={headerOpacity} />

      {/* both panes visible */}
      {!isLeft && !isRight && (
        <div
          style={{
            ...baseGridStyle,
            gridTemplateColumns: "1fr 1fr",
            fontFamily:
              "Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          }}
        >
          <AboutPane opacity={leftOpacity} active={false} />
          <ContactPane opacity={rightOpacity} active={false} stacked={false} />
        </div>
      )}

      {/* left-only (About) */}
      {isLeft && (
        <div
          style={{
            ...baseGridStyle,
            gridTemplateColumns: "1fr",
          }}
        >
          <AboutPane opacity={leftOpacity} active={leftActive} />
        </div>
      )}

      {/* right-only (Contact) */}
      {isRight && (
        <div
          style={{
            ...baseGridStyle,
            gridTemplateColumns: "1fr",
          }}
        >
          <ContactPane opacity={rightOpacity} active={rightActive} stacked />
        </div>
      )}
    </Html>
  );
}
