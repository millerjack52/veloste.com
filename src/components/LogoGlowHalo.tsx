import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useScrollProgress } from "../context/scrollProgressState";

export default function LogoGlowHalo(props: {
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF("/models/vstar.glb");
  const { sceneRefs } = useScrollProgress();
  const lastGlowRef = useRef(-1);

  const { haloGroup, materials } = useMemo(() => {
    const group = new THREE.Group();
    const clone = scene.clone(true);
    const mats: THREE.MeshBasicMaterial[] = [];

    clone.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        toneMapped: false,
        blending: THREE.AdditiveBlending,
      });
      mesh.material = mat;
      mats.push(mat);
    });

    group.add(clone);
    return { haloGroup: group, materials: mats };
  }, [scene]);

  useFrame(() => {
    const g = THREE.MathUtils.clamp(sceneRefs.glow.current, 0, 1);
    if (Math.abs(g - lastGlowRef.current) < 0.02 && g > 0 && g < 1) return;
    lastGlowRef.current = g;

    const scale = 1 + g * 0.045;
    haloGroup.scale.setScalar(scale);
    haloGroup.visible = g > 0.04;

    const opacity = g * 0.1;
    for (const m of materials) {
      m.opacity = opacity;
    }
  });

  return <primitive object={haloGroup} rotation={props.rotation} />;
}

useGLTF.preload("/models/vstar.glb");
