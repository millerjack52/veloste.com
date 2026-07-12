import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "../context/scrollProgressState";
import { computeScrollDerived } from "../utils/scrollCurves";
import { scrollDebug } from "../debug/scrollDebug";

const LEFT_ON = 0.88;
const LEFT_OFF = 0.72;
const RIGHT_ON = 0.88;
const RIGHT_OFF = 0.72;
/* Page flips to light chrome (nav ink etc.) once the white flood is
   well established; hysteresis avoids flicker at the boundary. */
const LIGHT_ON = 0.7;
const LIGHT_OFF = 0.55;
/* Black text arrives after the background is mostly white. */
const PANE_TEXT_LAG = 1.6;
const CSS_EPSILON = 0.01;

function quantize(value: number, steps: number) {
  return Math.round(value * steps) / steps;
}

function setCssVarIfChanged(
  root: HTMLElement,
  cache: Record<string, number>,
  key: string,
  cssName: string,
  value: number,
  formatter: (v: number) => string = (v) => v.toFixed(3),
) {
  const q = quantize(value, 1 / CSS_EPSILON);
  if (cache[key] === q) return;
  cache[key] = q;
  root.style.setProperty(cssName, formatter(q));
}

export default function SceneScrollDriver({
  groupRef,
  cssRootRef,
  maxYaw,
  deadZone = 0.15,
  easePower = 1.5,
  curvePower = 1.6,
}: {
  groupRef: React.RefObject<THREE.Group | null>;
  /** Element the per-frame --veloste-* vars are written to (scopes style
      recalc to the scene subtree). Falls back to <html> if unset. */
  cssRootRef?: React.RefObject<HTMLElement | null>;
  maxYaw: number;
  deadZone?: number;
  easePower?: number;
  curvePower?: number;
}) {
  const { pRef, pTargetRef, sceneRefs } = useScrollProgress();
  const lightRef = useRef(false);
  const panelOpenRef = useRef(false);
  const leftInteractiveRef = useRef(false);
  const rightInteractiveRef = useRef(false);
  const cssCacheRef = useRef<Record<string, number>>({});
  const cssFrameRef = useRef(0);

  useEffect(() => {
    const varRoot = cssRootRef?.current;
    return () => {
      document.documentElement.classList.remove(
        "veloste-panel-open",
        "veloste-light",
      );
      const root = varRoot ?? document.documentElement;
      root.style.removeProperty("--veloste-about-open");
      root.style.removeProperty("--veloste-left-opacity");
      root.style.removeProperty("--veloste-right-opacity");
      root.style.removeProperty("--veloste-indicator-opacity");
    };
  }, [cssRootRef]);

  useFrame(() => {
    const derived = computeScrollDerived(pRef.current, {
      deadZone,
      easePower,
      curvePower,
    });
    const {
      leftOpacity,
      rightOpacity,
      overlayBlurAmount,
      indicatorOpacity,
    } = derived;
    scrollDebug.setCurveConfig({ deadZone, easePower, curvePower });
    scrollDebug.recordDerived({
      overlayBlur: overlayBlurAmount,
      leftOpacity,
      rightOpacity,
      indicatorOpacity,
    });

    if (groupRef.current) {
      groupRef.current.rotation.y = pRef.current * maxYaw;
    }

    /* Unquantized: 1/16 steps produced visible brightness stepping during
       the flood now that frames only run while scrolling (demand loop). */
    const glow = overlayBlurAmount < 0.02 ? 0 : overlayBlurAmount;
    sceneRefs.glow.current = glow;
    sceneRefs.lightBoost.current = 1 + glow * 0.6;
    sceneRefs.overlayBlur.current = glow;

    cssFrameRef.current += 1;
    // The settled check guarantees the last frame of a demand-driven burst
    // always flushes CSS, even when the parity throttle would skip it.
    const settled = pRef.current === pTargetRef.current;
    if (cssFrameRef.current % 2 === 0 || settled) {
      const root = cssRootRef?.current ?? document.documentElement;
      const cache = cssCacheRef.current;

      setCssVarIfChanged(
        root,
        cache,
        "open",
        "--veloste-about-open",
        overlayBlurAmount,
      );
      setCssVarIfChanged(
        root,
        cache,
        "leftOpacity",
        "--veloste-left-opacity",
        Math.pow(leftOpacity, PANE_TEXT_LAG),
      );
      setCssVarIfChanged(
        root,
        cache,
        "rightOpacity",
        "--veloste-right-opacity",
        Math.pow(rightOpacity, PANE_TEXT_LAG),
      );
      setCssVarIfChanged(
        root,
        cache,
        "indicatorOpacity",
        "--veloste-indicator-opacity",
        indicatorOpacity,
      );

      /* Class toggles stay on <html>: consumers use html.veloste-* selectors,
         and they only flip at hysteresis thresholds (~2x per traversal). */
      const panelOpen = overlayBlurAmount > 0.02;
      if (panelOpen !== panelOpenRef.current) {
        panelOpenRef.current = panelOpen;
        document.documentElement.classList.toggle(
          "veloste-panel-open",
          panelOpen,
        );
        scrollDebug.recordThreshold("panelOpen", panelOpen);
      }

      const light = lightRef.current
        ? overlayBlurAmount > LIGHT_OFF
        : overlayBlurAmount > LIGHT_ON;
      if (light !== lightRef.current) {
        lightRef.current = light;
        document.documentElement.classList.toggle("veloste-light", light);
        scrollDebug.recordThreshold("lightPage", light);
      }
    }

    const nextLeftInteractive = leftInteractiveRef.current
      ? leftOpacity > LEFT_OFF
      : leftOpacity > LEFT_ON;
    if (nextLeftInteractive !== leftInteractiveRef.current) {
      leftInteractiveRef.current = nextLeftInteractive;
      scrollDebug.recordThreshold("leftInteractive", nextLeftInteractive);
      window.dispatchEvent(
        new CustomEvent("veloste:leftInteractive", {
          detail: { active: nextLeftInteractive },
        }),
      );
    }

    const nextRightInteractive = rightInteractiveRef.current
      ? rightOpacity > RIGHT_OFF
      : rightOpacity > RIGHT_ON;
    if (nextRightInteractive !== rightInteractiveRef.current) {
      rightInteractiveRef.current = nextRightInteractive;
      scrollDebug.recordThreshold("rightInteractive", nextRightInteractive);
      window.dispatchEvent(
        new CustomEvent("veloste:rightInteractive", {
          detail: { active: nextRightInteractive },
        }),
      );
    }
  });

  return null;
}
