import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function VelosteLogoModel(props: any) {
  const { scene } = useGLTF("/models/vstar.glb");

  useEffect(() => {
    scene.traverse((o: any) => {
      if (o.isMesh && o.material) {
        const m = o.material as THREE.MeshStandardMaterial;
        if (m.color) m.color.multiplyScalar(0.6);
        if ("metalness" in m) m.metalness = 0.9;
        if ("roughness" in m) m.roughness = 0.18;
        (m as any).envMapIntensity = 1.05;
        if ((m as any).normalScale) (m as any).normalScale.set(1, 1);
      }
    });
  }, [scene]);

  return <primitive object={scene} {...props} />;
}
useGLTF.preload("/models/thiscouldbeit.glb");
