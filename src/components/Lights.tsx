import * as THREE from "three";
import { useRef } from "react";
import { Environment, Lightformer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useScrollProgress } from "../context/scrollProgressState";

const AMBIENT_BASE = 0.008;
const HEMISPHERE_BASE = 0.016;
const KEY_BASE = 10;
const RIM_BASE = 6.5;
const UNDER_BASE = 22;

export default function Lights() {
  const { sceneRefs } = useScrollProgress();
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const hemisphereRef = useRef<THREE.HemisphereLight>(null);
  const keyRef = useRef<THREE.DirectionalLight>(null);
  const rimRef = useRef<THREE.DirectionalLight>(null);
  const underRef = useRef<THREE.PointLight>(null);
  const lastBoostRef = useRef(1);

  // Single subscription drives every boostable light. The Lightformers are
  // intentionally not boosted: with Environment frames={1} the env map bakes
  // once at mount, so per-frame Lightformer intensity writes never re-bake.
  useFrame(() => {
    const boost = sceneRefs.lightBoost.current;
    if (Math.abs(boost - lastBoostRef.current) < 1e-4) return;
    lastBoostRef.current = boost;

    if (ambientRef.current) ambientRef.current.intensity = AMBIENT_BASE * boost;
    if (hemisphereRef.current) {
      hemisphereRef.current.intensity = HEMISPHERE_BASE * boost;
    }
    if (keyRef.current) keyRef.current.intensity = KEY_BASE * boost;
    if (rimRef.current) rimRef.current.intensity = RIM_BASE * boost;
    if (underRef.current) underRef.current.intensity = UNDER_BASE * boost;
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={AMBIENT_BASE} />
      <hemisphereLight
        ref={hemisphereRef}
        intensity={HEMISPHERE_BASE}
        color="#ffffff"
        groundColor="#000000"
      />

      {/* Key + rim directionals — crisp specular edges like chrome product shots.
          The two weak back directionals were folded into the baked back
          Lightformer strips below (intensities bumped to compensate). */}
      <directionalLight
        ref={keyRef}
        position={[5.5, 6.5, 5.5]}
        intensity={KEY_BASE}
        color="#ffffff"
      />
      <directionalLight
        ref={rimRef}
        position={[-7.5, 2.8, -5.5]}
        intensity={RIM_BASE}
        color="#ffffff"
      />
      {/* True under-light, placed below/front-left of the logo. */}
      <pointLight
        ref={underRef}
        position={[-1.8, -5.8, 3.2]}
        intensity={UNDER_BASE}
        color="#ffffff"
        distance={7}
        decay={2}
      />

      <Environment background={false} blur={0.55} frames={1}>
        {/* Key — upper-right front */}
        <Lightformer
          intensity={28}
          form="rect"
          color="#ffffff"
          scale={[1.4, 1.1, 1]}
          position={[2.4, 3.2, 3.6]}
          rotation={[-0.62, -0.32, 0]}
        />
        <Lightformer
          intensity={17}
          form="rect"
          color="#ffffff"
          scale={[1.5, 0.32, 1]}
          position={[1.2, 0.8, 2.4]}
          rotation={[-0.12, -0.18, 0]}
        />

        {/* Rim — narrow back-left vertical strip */}
        <Lightformer
          intensity={22}
          form="rect"
          color="#ffffff"
          scale={[0.42, 7.5, 1]}
          position={[-2.1, 0.45, -3.6]}
          rotation={[0, Math.PI, 0]}
        />
        {/* Rim — back-right edge (covers the removed back-right directional) */}
        <Lightformer
          intensity={15}
          form="rect"
          color="#ffffff"
          scale={[0.38, 6, 1]}
          position={[2.3, -0.15, -3.4]}
          rotation={[0, Math.PI, 0]}
        />
        {/* Rim — top-back horizontal, catches star tips */}
        <Lightformer
          intensity={20}
          form="rect"
          color="#ffffff"
          scale={[5.5, 0.38, 1]}
          position={[0, 3.1, -3.2]}
          rotation={[-0.42, 0, 0]}
        />
        {/* Rim — bottom-back, lower arm edges */}
        <Lightformer
          intensity={13}
          form="rect"
          color="#ffffff"
          scale={[4.5, 0.32, 1]}
          position={[0, -2.6, -3.3]}
          rotation={[0.38, 0, 0]}
        />
        {/* Top spill — keeps forehead-style highlight without filling shadows */}
        <Lightformer
          intensity={7}
          form="rect"
          color="#ffffff"
          scale={[5, 1.1, 1]}
          position={[0.5, 6.2, -1.2]}
          rotation={[Math.PI / 2.35, 0.12, 0]}
        />
      </Environment>
    </>
  );
}
