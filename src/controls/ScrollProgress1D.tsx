import React, { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  ScrollProgressProvider,
} from "../context/ScrollProgressContext";
import { useScrollProgress } from "../context/scrollProgressState";
import { scrollDebug } from "../debug/scrollDebug";

function ScrollProgressFrame({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pRef, pTargetRef, smooth } = useScrollProgress();
  const velRef = useRef(0);

  useFrame((state, dt) => {
    /* Critically damped spring instead of an exponential lerp: wheel
       notches are large (ticksToMax is small), and a lerp turns each notch
       into an instant velocity jump — a visible lurch once the tip-circle
       flood amplifies it. A spring keeps velocity continuous (notches only
       change acceleration). omega is derived from `smooth` so the existing
       tuning knob keeps its meaning (higher = softer, ~same settle time
       as the old lerp). */
    const omega = 87 * -Math.log(smooth);
    const clampedDt = Math.min(dt, 1 / 30);
    const p = pRef.current;
    const target = pTargetRef.current;
    const dist = target - p;
    const v = velRef.current;

    if (Math.abs(dist) > 1e-4 || Math.abs(v) > 1e-3) {
      const accel = omega * omega * dist - 2 * omega * v;
      velRef.current = v + accel * clampedDt;
      pRef.current = THREE.MathUtils.clamp(
        p + velRef.current * clampedDt,
        -1,
        1,
      );
      state.invalidate();
    } else if (p !== target) {
      // Snap exactly onto the target for one final settled frame.
      pRef.current = target;
      velRef.current = 0;
      state.invalidate();
    }
    scrollDebug.recordFrame({
      dtSeconds: dt,
      pCurrent: pRef.current,
      pTarget: pTargetRef.current,
    });
  });

  return <>{children}</>;
}

function ScrollProgressInput({
  ticksToMax,
  notchSize,
  polarity,
  children,
}: {
  ticksToMax: number;
  notchSize: number;
  polarity: 1 | -1;
  children: React.ReactNode;
}) {
  const { pTargetRef } = useScrollProgress();
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    const clamp = (v: number) => THREE.MathUtils.clamp(v, -1, 1);
    const atMin = () => pTargetRef.current <= -1 + 1e-6;
    const atMax = () => pTargetRef.current >= 1 - 1e-6;

    const deltaToP = (dyPixels: number) => {
      const notches = dyPixels / notchSize;
      return (-notches * polarity) / ticksToMax;
    };

    const willConsume = (deltaP: number) => {
      if (deltaP > 0 && atMax()) return false;
      if (deltaP < 0 && atMin()) return false;
      return true;
    };

    const onWheel = (e: WheelEvent) => {
      const modeScale =
        e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1;
      const dy = e.deltaY * modeScale;
      const dP = deltaToP(dy);
      const prevTarget = pTargetRef.current;
      const nextRaw = prevTarget + dP;
      const nextClamped = clamp(nextRaw);
      const consumed = willConsume(dP);

      scrollDebug.recordInput({
        t: performance.now(),
        mode: "wheel",
        deltaP: dP,
        consumed,
        clamped: Math.abs(nextClamped - nextRaw) > 1e-9,
      });

      if (!consumed) return;
      e.preventDefault();
      pTargetRef.current = nextClamped;
      invalidate();
    };

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
      const dy = lastY - y;
      lastY = y;

      const dP = deltaToP(dy);
      const prevTarget = pTargetRef.current;
      const nextRaw = prevTarget + dP;
      const nextClamped = clamp(nextRaw);
      const consumed = willConsume(dP);
      scrollDebug.recordInput({
        t: performance.now(),
        mode: "touch",
        deltaP: dP,
        consumed,
        clamped: Math.abs(nextClamped - nextRaw) > 1e-9,
      });
      if (!consumed) return;

      e.preventDefault();
      pTargetRef.current = nextClamped;
      invalidate();
    };

    const onTouchEnd = () => {
      touching = false;
    };

    const onSetProgress = (e: Event) => {
      const detail = (e as CustomEvent<{ p?: number }>).detail;
      if (!detail || typeof detail.p !== "number") return;
      const nextClamped = clamp(detail.p);
      scrollDebug.recordInput({
        t: performance.now(),
        mode: "api",
        deltaP: detail.p - pTargetRef.current,
        consumed: true,
        clamped: Math.abs(nextClamped - detail.p) > 1e-9,
      });
      pTargetRef.current = nextClamped;
      invalidate();
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener(
      "veloste:setProgress",
      onSetProgress as EventListener,
    );

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener(
        "veloste:setProgress",
        onSetProgress as EventListener,
      );
    };
  }, [ticksToMax, notchSize, polarity, pTargetRef, invalidate]);

  return <>{children}</>;
}

export default function ScrollProgress1D({
  children,
  ticksToMax = 24,
  notchSize = 120,
  polarity = 1,
  smooth = 0.85,
}: {
  children: React.ReactNode;
  ticksToMax?: number;
  notchSize?: number;
  polarity?: 1 | -1;
  smooth?: number;
}) {
  return (
    <ScrollProgressProvider smooth={smooth}>
      <ScrollProgressInput
        ticksToMax={ticksToMax}
        notchSize={notchSize}
        polarity={polarity}
      >
        <ScrollProgressFrame>{children}</ScrollProgressFrame>
      </ScrollProgressInput>
    </ScrollProgressProvider>
  );
}
