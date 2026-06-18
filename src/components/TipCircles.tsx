import { useRef } from "react";
import { Billboard } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "../context/scrollProgressState";

const deadZone = 0.15;
const easePower = 1.5;
const curvePower = 1.6;

type TipCircleProps = {
  side: "left" | "right";
  pos: { x: number; y: number; z: number };
  worldZOfGroup: number;
  color: string;
  baseOpacity: number;
};

function TipCircle({
  side,
  pos,
  worldZOfGroup,
  color,
  baseOpacity,
}: TipCircleProps) {
  const { pRef, sceneRefs } = useScrollProgress();
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const fillScaleRef = useRef(1);
  const lastTRef = useRef(-1);

  useFrame(({ viewport, camera }) => {
    const p = pRef.current;
    const overlayBlur = sceneRefs.overlayBlur.current;
    if (overlayBlur > 0.92) {
      if (meshRef.current) meshRef.current.visible = false;
      return;
    }

    const toUnit = (val: number) =>
      THREE.MathUtils.clamp((val - deadZone) / (1 - deadZone), 0, 1);
    const sideRaw = side === "right" ? Math.max(0, p) : Math.max(0, -p);
    const easedT = Math.pow(toUnit(sideRaw), easePower);
    const t = Math.pow(easedT, curvePower);

    if (Math.abs(t - lastTRef.current) < 0.004 && meshRef.current?.visible) {
      if (materialRef.current) {
        materialRef.current.opacity =
          baseOpacity * (1 - THREE.MathUtils.clamp(overlayBlur, 0, 1));
      }
      return;
    }
    lastTRef.current = t;

    const v = viewport.getCurrentViewport(camera, [0, 0, worldZOfGroup]);
    fillScaleRef.current = Math.max(v.width, v.height) / 1.5;

    const baseScale = 0.1;
    const scale =
      baseScale *
      Math.pow(fillScaleRef.current / baseScale, t);

    if (meshRef.current) {
      meshRef.current.visible = t > 0.008;
      meshRef.current.scale.setScalar(scale);
    }

    if (materialRef.current) {
      materialRef.current.opacity =
        baseOpacity * (1 - THREE.MathUtils.clamp(overlayBlur, 0, 1));
    }
  });

  const x = side === "right" ? -Math.abs(pos.x) : +Math.abs(pos.x);

  return (
    <Billboard position={[x, pos.y, pos.z]} follow>
      <mesh ref={meshRef} scale={0.1} renderOrder={10}>
        <circleGeometry args={[1, 32]} />
        <meshBasicMaterial
          ref={materialRef}
          color={color}
          transparent
          opacity={baseOpacity}
          depthTest={false}
          depthWrite={false}
          side={THREE.DoubleSide}
          toneMapped={false}
        />
      </mesh>
    </Billboard>
  );
}

export default function TipCircles({
  groupWorldZ = 1,
}: {
  groupWorldZ?: number;
}) {
  return (
    <>
      <TipCircle
        side="left"
        pos={{ x: 6, y: 0.22, z: 0 }}
        worldZOfGroup={groupWorldZ}
        color="#e8e8e8"
        baseOpacity={0.55}
      />
      <TipCircle
        side="right"
        pos={{ x: 5.8, y: 0.22, z: 0 }}
        worldZOfGroup={groupWorldZ}
        color="#ffffff"
        baseOpacity={1}
      />
    </>
  );
}
