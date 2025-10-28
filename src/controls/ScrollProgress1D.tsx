import React, { useEffect, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function ScrollProgress1D({
  children,
  ticksToMax = 24,
  notchSize = 120,
  polarity = 1,
  smooth = 0.85,
}: {
  children: (p: number) => React.ReactNode;
  ticksToMax?: number;
  notchSize?: number;
  polarity?: 1 | -1;
  smooth?: number;
}) {
  const pTarget = useRef(0);
  const [p, setP] = useState(0);

  const clamp = (v: number) => THREE.MathUtils.clamp(v, -1, 1);
  const atMin = () => pTarget.current <= -1 + 1e-6;
  const atMax = () => pTarget.current >= 1 - 1e-6;

  const deltaToP = (dyPixels: number) => {
    const notches = dyPixels / notchSize;
    return (-notches * polarity) / ticksToMax;
  };

  const willConsume = (deltaP: number) => {
    if (deltaP > 0 && atMax()) return false;
    if (deltaP < 0 && atMin()) return false;
    return true;
  };

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const modeScale =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      const dy = e.deltaY * modeScale;
      const dP = deltaToP(dy);

      if (!willConsume(dP)) return; // pass-through to native scroll
      e.preventDefault();
      pTarget.current = clamp(pTarget.current + dP);
    };

    // Touch support with identical pass-through semantics
    let lastY = 0;
    let touching = false;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      touching = true;
      lastY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touching || e.touches.length !== 1) return;
      const y = e.touches[0].clientY;
      const dy = lastY - y; // finger up => positive dy (like wheel)
      lastY = y;

      const dP = deltaToP(dy);
      if (!willConsume(dP)) return; // pass-through

      e.preventDefault(); // consume
      pTarget.current = clamp(pTarget.current + dP);
    };

    const onTouchEnd = () => {
      touching = false;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel as any);
      window.removeEventListener("touchstart", onTouchStart as any);
      window.removeEventListener("touchmove", onTouchMove as any);
      window.removeEventListener("touchend", onTouchEnd as any);
    };
  }, [ticksToMax, notchSize, polarity]);

  useFrame((_, dt) => {
    const k = 1 - Math.pow(smooth, dt * 60);
    const next = THREE.MathUtils.lerp(p, pTarget.current, k);
    if (next !== p) setP(next);
  });

  return <>{children(p)}</>;
}
