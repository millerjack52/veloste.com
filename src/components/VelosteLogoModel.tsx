import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useScrollProgress } from "../context/scrollProgressState";

const WHITE = new THREE.Color(1, 1, 1);
const BASE_BRIGHTNESS = 0.42;
const LEVELS_BLACK_IN = 0.015;
const LEVELS_WHITE_IN = 0.6;
const LEVELS_GAMMA = 1.42;
const FINAL_CONTRAST = 3.05;
const tempColor = new THREE.Color();

function applyLevels(
  color: THREE.Color,
  blackIn: number,
  whiteIn: number,
  gamma: number,
) {
  const range = Math.max(1e-4, whiteIn - blackIn);
  color.r = Math.pow(
    THREE.MathUtils.clamp((color.r - blackIn) / range, 0, 1),
    gamma,
  );
  color.g = Math.pow(
    THREE.MathUtils.clamp((color.g - blackIn) / range, 0, 1),
    gamma,
  );
  color.b = Math.pow(
    THREE.MathUtils.clamp((color.b - blackIn) / range, 0, 1),
    gamma,
  );
}

function applyFinalContrast(color: THREE.Color, contrast: number) {
  color.r = THREE.MathUtils.clamp((color.r - 0.5) * contrast + 0.5, 0, 1);
  color.g = THREE.MathUtils.clamp((color.g - 0.5) * contrast + 0.5, 0, 1);
  color.b = THREE.MathUtils.clamp((color.b - 0.5) * contrast + 0.5, 0, 1);
}

type LogoMaterial = THREE.MeshStandardMaterial & {
  userData: {
    baseColor?: THREE.Color;
    baseMetalness?: number;
    baseRoughness?: number;
    baseEnvMapIntensity?: number;
    baseToneMapped?: boolean;
    velosteBasePrepared?: boolean;
  };
};

export default function VelosteLogoModel({
  ...props
}: {
  [key: string]: unknown;
}) {
  const { scene } = useGLTF("/models/vstar.glb");
  const { sceneRefs } = useScrollProgress();
  const materialsRef = useRef<LogoMaterial[]>([]);
  const lastGlowRef = useRef(-1);

  useEffect(() => {
    const materials: LogoMaterial[] = [];
    scene.traverse((o: THREE.Object3D) => {
      if ((o as THREE.Mesh).isMesh && (o as THREE.Mesh).material) {
        const m = (o as THREE.Mesh).material as LogoMaterial;
        if (!m.userData.velosteBasePrepared) {
          if (m.color) {
            m.color.multiplyScalar(0.76 * BASE_BRIGHTNESS);
            applyLevels(
              m.color,
              LEVELS_BLACK_IN,
              LEVELS_WHITE_IN,
              LEVELS_GAMMA,
            );
            applyFinalContrast(m.color, FINAL_CONTRAST);
          }
          if ("metalness" in m) m.metalness = 0.78;
          if ("roughness" in m) m.roughness = 0.38;
          (m as THREE.MeshStandardMaterial).envMapIntensity = 0.78;
          if ((m as THREE.MeshStandardMaterial).normalScale) {
            (m as THREE.MeshStandardMaterial).normalScale.set(1, 1);
          }
          m.emissive = new THREE.Color("#ffffff");
          m.emissiveIntensity = 0;
          m.toneMapped = true;
          m.userData.baseColor =
            m.color?.clone?.() ?? new THREE.Color("#808080");
          m.userData.baseMetalness = m.metalness;
          m.userData.baseRoughness = m.roughness;
          m.userData.baseEnvMapIntensity =
            (m as THREE.MeshStandardMaterial).envMapIntensity ?? 1;
          m.userData.baseToneMapped = m.toneMapped;
          m.userData.velosteBasePrepared = true;
        }
        materials.push(m);
      }
    });
    materialsRef.current = materials;
  }, [scene]);

  useFrame(() => {
    const g = THREE.MathUtils.clamp(sceneRefs.glow.current, 0, 1);

    for (const m of materialsRef.current) {
      const baseColor = m.userData.baseColor;
      const baseMetalness = m.userData.baseMetalness ?? 0.78;
      const baseRoughness = m.userData.baseRoughness ?? 0.38;
      const baseEnvMapIntensity = m.userData.baseEnvMapIntensity ?? 0.78;
      const baseToneMapped = m.userData.baseToneMapped ?? true;

      if (g <= 0) {
        if (baseColor) m.color.copy(baseColor);
        m.toneMapped = baseToneMapped;
        m.emissive.setRGB(1, 1, 1);
        m.emissiveIntensity = 0;
        m.metalness = baseMetalness;
        m.roughness = baseRoughness;
        (m as THREE.MeshStandardMaterial).envMapIntensity =
          baseEnvMapIntensity;
        continue;
      }

      if (Math.abs(g - lastGlowRef.current) < 1e-4) continue;

      const lift = 1 + g * 4.35;
      const emissiveIntensity = g * 12.5;

      m.toneMapped = baseToneMapped;

      if (g >= 0.98) {
        m.color.copy(WHITE);
      } else if (baseColor) {
        tempColor.copy(baseColor).multiplyScalar(lift);
        applyLevels(
          tempColor,
          Math.max(0, LEVELS_BLACK_IN - g * 0.11),
          Math.max(0.48, LEVELS_WHITE_IN - g * 0.06),
          Math.max(0.58, LEVELS_GAMMA - g * 0.12),
        );
        applyFinalContrast(tempColor, FINAL_CONTRAST + g * 0.24);
        m.color.copy(tempColor).lerp(WHITE, g);
      }
      m.emissive.setRGB(1, 1, 1);
      m.emissiveIntensity = emissiveIntensity;
      m.metalness = THREE.MathUtils.clamp(baseMetalness - g * 0.42, 0, 1);
      m.roughness = THREE.MathUtils.clamp(baseRoughness - g * 0.12, 0.08, 1);
      (m as THREE.MeshStandardMaterial).envMapIntensity =
        baseEnvMapIntensity + g * 2.45;
    }

    lastGlowRef.current = g;
  });

  return <primitive object={scene} {...props} />;
}
useGLTF.preload("/models/vstar.glb");
