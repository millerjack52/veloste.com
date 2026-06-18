import * as THREE from "three";
import { useRef, type ComponentProps } from "react";
import { Environment, Lightformer } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useScrollProgress } from "../context/scrollProgressState";

type LightformerComponentProps = ComponentProps<typeof Lightformer>;

function BoostedLightformer({
  baseIntensity,
  ...props
}: LightformerComponentProps & { baseIntensity: number }) {
  const ref = useRef<THREE.Mesh & { intensity: number }>(null);
  const { sceneRefs } = useScrollProgress();
  const lastBoostRef = useRef(1);

  useFrame(() => {
    const node = ref.current;
    if (!node) return;
    const boost = sceneRefs.lightBoost.current;
    if (Math.abs(boost - lastBoostRef.current) < 1e-4) return;
    lastBoostRef.current = boost;
    node.intensity = baseIntensity * boost;
  });

  return <Lightformer ref={ref} intensity={baseIntensity} {...props} />;
}

function BoostedDirectionalLight({
  baseIntensity,
  position,
}: {
  baseIntensity: number;
  position: [number, number, number];
}) {
  const ref = useRef<THREE.DirectionalLight>(null);
  const { sceneRefs } = useScrollProgress();
  const lastBoostRef = useRef(1);

  useFrame(() => {
    const boost = sceneRefs.lightBoost.current;
    if (Math.abs(boost - lastBoostRef.current) < 1e-4) return;
    lastBoostRef.current = boost;
    if (ref.current) ref.current.intensity = baseIntensity * boost;
  });

  return (
    <directionalLight
      ref={ref}
      position={position}
      intensity={baseIntensity}
      color="#ffffff"
    />
  );
}

function BoostedPointLight({
  baseIntensity,
  position,
  distance,
}: {
  baseIntensity: number;
  position: [number, number, number];
  distance: number;
}) {
  const ref = useRef<THREE.PointLight>(null);
  const { sceneRefs } = useScrollProgress();
  const lastBoostRef = useRef(1);

  useFrame(() => {
    const boost = sceneRefs.lightBoost.current;
    if (Math.abs(boost - lastBoostRef.current) < 1e-4) return;
    lastBoostRef.current = boost;
    if (ref.current) ref.current.intensity = baseIntensity * boost;
  });

  return (
    <pointLight
      ref={ref}
      position={position}
      intensity={baseIntensity}
      color="#ffffff"
      distance={distance}
      decay={2}
    />
  );
}

export default function Lights() {
  const { sceneRefs } = useScrollProgress();
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const hemisphereRef = useRef<THREE.HemisphereLight>(null);
  const lastBoostRef = useRef(1);

  useFrame(() => {
    const boost = sceneRefs.lightBoost.current;
    if (Math.abs(boost - lastBoostRef.current) < 1e-4) return;
    lastBoostRef.current = boost;

    if (ambientRef.current) ambientRef.current.intensity = 0.008 * boost;
    if (hemisphereRef.current) {
      hemisphereRef.current.intensity = 0.016 * boost;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.008} />
      <hemisphereLight
        ref={hemisphereRef}
        intensity={0.016}
        color="#ffffff"
        groundColor="#000000"
      />

      {/* Key + rim directionals — crisp specular edges like chrome product shots */}
      <BoostedDirectionalLight
        baseIntensity={10}
        position={[5.5, 6.5, 5.5]}
      />
      <BoostedDirectionalLight
        baseIntensity={6.5}
        position={[-7.5, 2.8, -5.5]}
      />
      <BoostedDirectionalLight
        baseIntensity={4.2}
        position={[0.8, 0.4, -9]}
      />
      <BoostedDirectionalLight
        baseIntensity={2.8}
        position={[7, 1.5, -4.5]}
      />
      {/* True under-light, placed below/front-left of the logo. */}
      <BoostedPointLight
        baseIntensity={22}
        position={[-1.8, -5.8, 3.2]}
        distance={7}
      />

      <Environment background={false} blur={0.55} frames={1}>
        {/* Key — upper-right front */}
        <BoostedLightformer
          baseIntensity={28}
          form="rect"
          color="#ffffff"
          scale={[1.4, 1.1, 1]}
          position={[2.4, 3.2, 3.6]}
          rotation={[-0.62, -0.32, 0]}
        />
        <BoostedLightformer
          baseIntensity={17}
          form="rect"
          color="#ffffff"
          scale={[1.5, 0.32, 1]}
          position={[1.2, 0.8, 2.4]}
          rotation={[-0.12, -0.18, 0]}
        />

        {/* Rim — narrow back-left vertical strip */}
        <BoostedLightformer
          baseIntensity={22}
          form="rect"
          color="#ffffff"
          scale={[0.42, 7.5, 1]}
          position={[-2.1, 0.45, -3.6]}
          rotation={[0, Math.PI, 0]}
        />
        {/* Rim — back-right edge (weaker, asymmetric) */}
        <BoostedLightformer
          baseIntensity={11}
          form="rect"
          color="#ffffff"
          scale={[0.38, 6, 1]}
          position={[2.3, -0.15, -3.4]}
          rotation={[0, Math.PI, 0]}
        />
        {/* Rim — top-back horizontal, catches star tips */}
        <BoostedLightformer
          baseIntensity={18}
          form="rect"
          color="#ffffff"
          scale={[5.5, 0.38, 1]}
          position={[0, 3.1, -3.2]}
          rotation={[-0.42, 0, 0]}
        />
        {/* Rim — bottom-back, lower arm edges */}
        <BoostedLightformer
          baseIntensity={12}
          form="rect"
          color="#ffffff"
          scale={[4.5, 0.32, 1]}
          position={[0, -2.6, -3.3]}
          rotation={[0.38, 0, 0]}
        />
        {/* Top spill — keeps forehead-style highlight without filling shadows */}
        <BoostedLightformer
          baseIntensity={7}
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
