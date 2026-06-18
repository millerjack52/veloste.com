import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "../context/scrollProgressState";
import { computeScrollDerived } from "../utils/scrollCurves";
import { scrollDebug } from "../debug/scrollDebug";

const LEFT_ON = 0.88;
const LEFT_OFF = 0.72;
const RIGHT_ON = 0.88;
const RIGHT_OFF = 0.72;
const BLUR_ON = 0.88;
const CSS_EPSILON = 0.025;
const GLOW_STEPS = 16;

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
  maxYaw,
  deadZone = 0.15,
  easePower = 1.5,
  curvePower = 1.6,
}: {
  groupRef: React.RefObject<THREE.Group | null>;
  maxYaw: number;
  deadZone?: number;
  easePower?: number;
  curvePower?: number;
}) {
  const { gl } = useThree();
  const { pRef, sceneRefs } = useScrollProgress();
  const opaqueRef = useRef(false);
  const blurredRef = useRef(false);
  const panelOpenRef = useRef(false);
  const leftInteractiveRef = useRef(false);
  const rightInteractiveRef = useRef(false);
  const cssCacheRef = useRef<Record<string, number>>({});
  const cssFrameRef = useRef(0);

  const blurPx =
    typeof window !== "undefined" && window.innerWidth < 768 ? 6 : 8;

  useEffect(() => {
    return () => {
      gl.setClearColor(0x000000, 0);
      gl.setClearAlpha(0);
      document.documentElement.classList.remove(
        "veloste-panel-open",
        "veloste-panel-blurred",
      );
      document.documentElement.style.removeProperty("--veloste-about-blur");
      document.documentElement.style.removeProperty("--veloste-about-open");
      document.documentElement.style.removeProperty("--veloste-left-opacity");
      document.documentElement.style.removeProperty("--veloste-right-opacity");
      document.documentElement.style.removeProperty(
        "--veloste-indicator-opacity",
      );
    };
  }, [gl]);

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

    const glow =
      overlayBlurAmount < 0.02
        ? 0
        : quantize(overlayBlurAmount, GLOW_STEPS);
    sceneRefs.glow.current = glow;
    sceneRefs.lightBoost.current = 1 + glow * 0.6;
    sceneRefs.overlayBlur.current = glow;

    cssFrameRef.current += 1;
    if (cssFrameRef.current % 2 === 0) {
      const root = document.documentElement;
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
        leftOpacity,
      );
      setCssVarIfChanged(
        root,
        cache,
        "rightOpacity",
        "--veloste-right-opacity",
        rightOpacity,
      );
      setCssVarIfChanged(
        root,
        cache,
        "indicatorOpacity",
        "--veloste-indicator-opacity",
        indicatorOpacity,
      );

      const panelOpen = overlayBlurAmount > 0.02;
      if (panelOpen !== panelOpenRef.current) {
        panelOpenRef.current = panelOpen;
        root.classList.toggle("veloste-panel-open", panelOpen);
        scrollDebug.recordThreshold("panelOpen", panelOpen);
      }

      const blurred = overlayBlurAmount >= BLUR_ON;
      if (blurred !== blurredRef.current) {
        blurredRef.current = blurred;
        root.classList.toggle("veloste-panel-blurred", blurred);
        scrollDebug.recordThreshold("canvasBlurred", blurred);
        root.style.setProperty(
          "--veloste-about-blur",
          blurred ? `${blurPx}px` : "0px",
        );
      }
    }

    const aboutActive = overlayBlurAmount > 0.02;
    if (aboutActive !== opaqueRef.current) {
      opaqueRef.current = aboutActive;
      scrollDebug.recordThreshold("opaqueCanvas", aboutActive);
      if (aboutActive) {
        gl.setClearColor(0x000000, 1);
        gl.setClearAlpha(1);
      } else {
        gl.setClearColor(0x000000, 0);
        gl.setClearAlpha(0);
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
