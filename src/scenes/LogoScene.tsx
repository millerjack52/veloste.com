import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

import "../components/logoStyles.css";
import VelosteLogoModel from "../components/VelosteLogoModel";
import LogoGlowHalo from "../components/LogoGlowHalo";
import TipCircles from "../components/TipCircles";
import CircleContentOverlay from "../components/CircleContentOverlay";
import Lights from "../components/Lights";
import SceneScrollDriver from "../components/SceneScrollDriver";
import ScrollProgress1D from "../controls/ScrollProgress1D";
import ScrollDebugHud from "../components/ScrollDebugHud";

function useResponsiveMaxDpr() {
  const [maxDpr, setMaxDpr] = useState(1.5);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setMaxDpr(w < 480 ? 1.15 : w < 768 ? 1.35 : 1.5);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return maxDpr;
}

const LogoSceneCanvas = React.memo(function LogoSceneCanvas({
  groupRef,
  maxYaw,
  deadZone,
  easePower,
  curvePower,
  groupZ,
  maxDpr,
  toneMappingExposure,
}: {
  groupRef: React.RefObject<THREE.Group | null>;
  maxYaw: number;
  deadZone: number;
  easePower: number;
  curvePower: number;
  groupZ: number;
  maxDpr: number;
  toneMappingExposure: number;
}) {
  return (
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
      }}
      camera={{ position: [0, 0, 7], fov: 80 }}
    >
      <Suspense fallback={null}>
        <ScrollProgress1D
          ticksToMax={7}
          notchSize={48}
          polarity={1}
          smooth={0.88}
        >
          <SceneScrollDriver
            groupRef={groupRef}
            maxYaw={maxYaw}
            deadZone={deadZone}
            easePower={easePower}
            curvePower={curvePower}
          />
          <Lights />
          <group ref={groupRef} position={[0, 0, groupZ]}>
            <LogoGlowHalo rotation={[0, Math.PI * 1.5, 0]} />
            <VelosteLogoModel rotation={[0, Math.PI * 1.5, 0]} />
            <TipCircles groupWorldZ={groupZ} />
          </group>
          <EffectComposer multisampling={maxDpr > 1.25 ? 4 : 0}>
            <Bloom
              intensity={0.36}
              luminanceThreshold={0.72}
              luminanceSmoothing={0.18}
              mipmapBlur
            />
            <Vignette offset={0.32} darkness={0.72} />
          </EffectComposer>
        </ScrollProgress1D>
      </Suspense>
    </Canvas>
  );
});

const LogoScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const groupZ = 1;
  const maxYaw = THREE.MathUtils.degToRad(40);
  const maxDpr = useResponsiveMaxDpr();
  const deadZone = 0.15;
  const easePower = 1.5;
  const curvePower = 1.6;

  const grade = {
    whites: 52,
    highlights: 46,
    shadows: -76,
    blacks: -86,
  } as const;
  const toSignedUnit = (v: number) => THREE.MathUtils.clamp(v / 100, -1, 1);
  const toneMappingExposure =
    1 +
    toSignedUnit(grade.whites) * 0.22 +
    toSignedUnit(grade.highlights) * 0.2 -
    Math.abs(toSignedUnit(grade.shadows)) * 0.06 -
    Math.abs(toSignedUnit(grade.blacks)) * 0.05;

  const [leftInteractive, setLeftInteractive] = useState(false);
  const [rightInteractive, setRightInteractive] = useState(false);

  useEffect(() => {
    const onLeft = (e: Event) => {
      const active = (e as CustomEvent<{ active: boolean }>).detail.active;
      setLeftInteractive(active);
    };
    const onRight = (e: Event) => {
      const active = (e as CustomEvent<{ active: boolean }>).detail.active;
      setRightInteractive(active);
    };
    window.addEventListener("veloste:leftInteractive", onLeft);
    window.addEventListener("veloste:rightInteractive", onRight);
    return () => {
      window.removeEventListener("veloste:leftInteractive", onLeft);
      window.removeEventListener("veloste:rightInteractive", onRight);
    };
  }, []);

  return (
    <div className="logo-wrap">
      <div className="bg-text">VELOSTE</div>
      <div className="logo-about-plate" aria-hidden />

      <LogoSceneCanvas
        groupRef={groupRef}
        maxYaw={maxYaw}
        deadZone={deadZone}
        easePower={easePower}
        curvePower={curvePower}
        groupZ={groupZ}
        maxDpr={maxDpr}
        toneMappingExposure={toneMappingExposure}
      />

      <CircleContentOverlay
        leftInteractive={leftInteractive}
        rightInteractive={rightInteractive}
      />
      <ScrollDebugHud />
    </div>
  );
};

export default LogoScene;
