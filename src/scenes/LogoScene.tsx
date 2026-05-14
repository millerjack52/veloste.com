import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

import "../components/logoStyles.css";
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

  return (
    <div className="logo-wrap">
      <div className="bg-text">VELOSTE</div>

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
          toneMappingExposure: 1,
        }}
        style={{ background: "transparent", touchAction: "none" }} // prevent two-finger scroll zoom
        camera={{ position: [0, 0, 7], fov: 80 }}
      >
        <Suspense fallback={null}>
          <Lights />
          <ScrollProgress1D
            ticksToMax={7}
            notchSize={48}
            polarity={1}
            smooth={0.92}
          >
            {(p) => (
              <group position={[0, 0, groupZ]} rotation={[0, p * maxYaw, 0]}>
                <VelosteLogoModel rotation={[0, Math.PI * 1.5, 0]} />
                <TipCircles p={p} groupWorldZ={groupZ} deadZone={0.15} />
                <CircleContentOverlay
                  p={p}
                  deadZone={0.15}
                  easePower={1.5}
                  curvePower={1.6}
                />
              </group>
            )}
          </ScrollProgress1D>
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
};

export default LogoScene;
