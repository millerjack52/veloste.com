import { useEffect } from "react";
import { useGLTF } from "@react-three/drei";
export default function VelosteLogoModel(props) {
    const { scene } = useGLTF("/models/vstar.glb");
    useEffect(() => {
        scene.traverse((o) => {
            if (o.isMesh && o.material) {
                const m = o.material;
                if (m.color)
                    m.color.multiplyScalar(0.6);
                if ("metalness" in m)
                    m.metalness = 0.9;
                if ("roughness" in m)
                    m.roughness = 0.18;
                m.envMapIntensity = 1.05;
                if (m.normalScale)
                    m.normalScale.set(1, 1);
            }
        });
    }, [scene]);
    return <primitive object={scene} {...props}/>;
}
useGLTF.preload("/models/thiscouldbeit.glb");
