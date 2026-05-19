import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const WHITE = new THREE.Color(1, 1, 1);

type LogoMaterial = THREE.MeshStandardMaterial & {
  userData: {
    baseColor?: THREE.Color;
    baseMetalness?: number;
    baseRoughness?: number;
    baseEnvMapIntensity?: number;
    baseToneMapped?: boolean;
  };
};

export default function VelosteLogoModel({
  glow = 0,
  ...props
}: {
  glow?: number;
  [key: string]: any;
}) {
  const { scene } = useGLTF("/models/vstar.glb");
  const materialsRef = useRef<LogoMaterial[]>([]);
  const glowRef = useRef(glow);

  useEffect(() => {
    glowRef.current = glow;
  }, [glow]);

  useEffect(() => {
    const materials: LogoMaterial[] = [];
    scene.traverse((o: any) => {
      if (o.isMesh && o.material) {
        const m = o.material as LogoMaterial;
        if (m.color) m.color.multiplyScalar(0.76);
        if ("metalness" in m) m.metalness = 0.9;
        if ("roughness" in m) m.roughness = 0.16;
        (m as any).envMapIntensity = 1.35;
        if ((m as any).normalScale) (m as any).normalScale.set(1, 1);
        m.emissive = new THREE.Color("#ffffff");
        m.emissiveIntensity = 0.03;
        m.userData.baseColor = m.color?.clone?.() ?? new THREE.Color("#808080");
        m.userData.baseMetalness = m.metalness;
        m.userData.baseRoughness = m.roughness;
        m.userData.baseEnvMapIntensity = (m as any).envMapIntensity ?? 1;
        m.userData.baseToneMapped = m.toneMapped;
        materials.push(m);
      }
    });
    materialsRef.current = materials;
  }, [scene]);

  useFrame(() => {
    const g = THREE.MathUtils.clamp(glowRef.current, 0, 1);
    const lift = 1 + g * 14;
    const emissiveIntensity = g * 48;

    for (const m of materialsRef.current) {
      const baseColor = m.userData.baseColor;
      const baseMetalness = m.userData.baseMetalness ?? 0.9;
      const baseRoughness = m.userData.baseRoughness ?? 0.18;
      const baseEnvMapIntensity = m.userData.baseEnvMapIntensity ?? 1.05;
      const baseToneMapped = m.userData.baseToneMapped ?? true;

      m.toneMapped = g > 0.02 ? false : baseToneMapped;

      if (g >= 0.98) {
        m.color.copy(WHITE);
      } else if (baseColor) {
        m.color.copy(baseColor).multiplyScalar(lift);
        m.color.lerp(WHITE, g);
      }
      m.emissive.setRGB(1, 1, 1);
      m.emissiveIntensity = emissiveIntensity;
      m.metalness = THREE.MathUtils.clamp(baseMetalness - g * 0.92, 0, 1);
      m.roughness = THREE.MathUtils.clamp(baseRoughness - g * 0.24, 0.008, 1);
      (m as any).envMapIntensity = baseEnvMapIntensity + g * 18;
    }
  });

  return <primitive object={scene} {...props} />;
}
useGLTF.preload("/models/thiscouldbeit.glb");
