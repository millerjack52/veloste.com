import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Clone, useGLTF } from "@react-three/drei";
import * as THREE from "three";

type Props = {
  exposure?: number;
  fov?: number;
  cameraZ?: number;
  modelRotation?: [number, number, number];
  modelScale?: number;
  className?: string;
};

export default function HeaderLogoCanvas({
  exposure = 1.0,
  fov = 35,
  cameraZ = -15,
  modelRotation = [0, Math.PI * 1.5, 0],
  modelScale = 1.0,
  className = "header-logo-canvas",
}: Props) {
  const { scene } = useGLTF("/models/vstar.glb");

  return (
    <Canvas
      className={className}
      dpr={[1, 2]}
      gl={{
        alpha: true,
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: exposure,
      }}
      camera={{ position: [0, 0, cameraZ], fov }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight intensity={1.1} position={[2, 3, 4]} />
      <Suspense fallback={null}>
        <group scale={modelScale} rotation={[0, Math.PI, 0]}>
          <Clone object={scene} rotation={modelRotation} />
        </group>
      </Suspense>
    </Canvas>
  );
}
