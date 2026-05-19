import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import "../components/logoStyles.css";
import AboutCanvasMode from "../components/AboutCanvasMode";
import LogoPanelSpin from "../components/LogoPanelSpin";
import VelosteLogoModel from "../components/VelosteLogoModel";
import TipCircles from "../components/TipCircles";
import CircleContentOverlay from "../components/CircleContentOverlay";
import Lights from "../components/Lights";
import ScrollProgress1D from "../controls/ScrollProgress1D";

function useResponsiveMaxDpr() {
  const [maxDpr, setMaxDpr] = useState(2);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      /* Narrow screens: cap pixel ratio to keep 3D smooth and thermals in check */
      setMaxDpr(w < 480 ? 1.35 : w < 768 ? 1.65 : 2);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return maxDpr;
}

const LogoScene: React.FC = () => {
  const groupZ = 1;
  const maxYaw = THREE.MathUtils.degToRad(40);
  const maxDpr = useResponsiveMaxDpr();
  const deadZone = 0.15;
  const easePower = 1.5;
  const curvePower = 1.6;
  // Lightroom-style scene grade values: -100..100
  const grade = {
    whites: 34,
    highlights: 26,
    shadows: -28,
    blacks: -36,
  } as const;
  const toSignedUnit = (v: number) => THREE.MathUtils.clamp(v / 100, -1, 1);
  const whites = toSignedUnit(grade.whites);
  const highlights = toSignedUnit(grade.highlights);
  const shadows = toSignedUnit(grade.shadows);
  const blacks = toSignedUnit(grade.blacks);
  // Scene grade stays in-renderer; canvas CSS blur is driven by --veloste-about-blur.
  const toneMappingExposure =
    1 +
    whites * 0.22 +
    highlights * 0.2 -
    Math.abs(shadows) * 0.06 -
    Math.abs(blacks) * 0.05;
  const smoothstep = (a: number, b: number, x: number) => {
    const t = THREE.MathUtils.clamp((x - a) / Math.max(1e-6, b - a), 0, 1);
    return t * t * (3 - 2 * t);
  };

  return (
    <div className="logo-wrap">
      <div className="bg-text">VELOSTE</div>
      <div className="logo-about-plate" aria-hidden />

      <Canvas
        className="logo-canvas"
        dpr={[
          1,
          Math.min(
            maxDpr,
            typeof window !== "undefined" ? window.devicePixelRatio : 1,
          ),
        ]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure,
        }}
        style={{
          background: "transparent",
          touchAction: "none",
        }} // prevent two-finger scroll zoom
        camera={{ position: [0, 0, 7], fov: 80 }}
      >
        <Suspense fallback={null}>
          <ScrollProgress1D
            ticksToMax={7}
            notchSize={48}
            polarity={1}
            smooth={0.92}
          >
            {(p) => {
              const toUnit = (val: number) =>
                THREE.MathUtils.clamp((val - deadZone) / (1 - deadZone), 0, 1);
              const sideRawL = Math.max(0, -p);
              const easedL = Math.pow(toUnit(sideRawL), easePower);
              const expL = Math.pow(easedL, curvePower);
              const sideRawR = Math.max(0, p);
              const easedR = Math.pow(toUnit(sideRawR), easePower);
              const expR = Math.pow(easedR, curvePower);
              const rightOpacity = smoothstep(0.75, 0.97, expR);
              const leftOpacity = smoothstep(0.75, 0.97, expL);
              const aboutBlurAmount = THREE.MathUtils.clamp(
                Math.pow(leftOpacity, 0.88),
                0,
                1,
              );
              const contactBlurAmount = THREE.MathUtils.clamp(
                Math.pow(rightOpacity, 0.88),
                0,
                1,
              );
              const overlayBlurAmount = Math.max(
                aboutBlurAmount,
                contactBlurAmount,
              );
              const panelSpin =
                aboutBlurAmount > contactBlurAmount && aboutBlurAmount > 0.02
                  ? -aboutBlurAmount
                  : contactBlurAmount > 0.02
                    ? contactBlurAmount
                    : 0;

              return (
                <>
                  <AboutCanvasMode overlayBlurAmount={overlayBlurAmount} />
                  <Lights boost={1 + overlayBlurAmount * 2.4} />
                  <group
                    position={[0, 0, groupZ]}
                    rotation={[0, p * maxYaw, 0]}
                  >
                    <LogoPanelSpin spin={panelSpin}>
                      <VelosteLogoModel
                        rotation={[0, Math.PI * 1.5, 0]}
                        glow={overlayBlurAmount}
                      />
                    </LogoPanelSpin>
                    <TipCircles
                      p={p}
                      groupWorldZ={groupZ}
                      deadZone={deadZone}
                      aboutBlurAmount={overlayBlurAmount}
                    />
                    <CircleContentOverlay
                      p={p}
                      deadZone={deadZone}
                      easePower={easePower}
                      curvePower={curvePower}
                    />
                  </group>
                </>
              );
            }}
          </ScrollProgress1D>
        </Suspense>

      </Canvas>
    </div>
  );
};

export default LogoScene;
