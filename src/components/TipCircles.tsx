import { Billboard } from "@react-three/drei";
import * as THREE from "three";
import useFillScaleAtDepth from "../hooks/useFillScaleAtDepth";

type TipProps = {
  side: "left" | "right";
  p: number;
  baseScale?: number;
  pos?: { x: number; y: number; z: number };
  worldZOfGroup?: number;
  deadZone?: number;
  easePower?: number;
  curvePower?: number;
  color?: string;
};

function TipCircle({
  side,
  p,
  baseScale = 0.1,
  pos = { x: 5, y: 0, z: 0 },
  worldZOfGroup = 1,
  deadZone = 0.15,
  easePower = 1.5,
  curvePower = 1.6,
  color = "#ffffff",
}: TipProps) {
  const toUnit = (val: number) =>
    THREE.MathUtils.clamp((val - deadZone) / (1 - deadZone), 0, 1);

  const sideRaw = side === "right" ? Math.max(0, p) : Math.max(0, -p);
  const tRaw = toUnit(sideRaw);
  const easedT = Math.pow(tRaw, easePower);

  const fillScale = useFillScaleAtDepth(worldZOfGroup)();
  const scale =
    baseScale * Math.pow(fillScale / baseScale, Math.pow(easedT, curvePower));

  const x = side === "right" ? -Math.abs(pos.x) : +Math.abs(pos.x);

  return (
    <Billboard position={[x, pos.y, pos.z]} follow>
      <mesh scale={scale} renderOrder={10}>
        <circleGeometry args={[1, 64]} />
        <meshBasicMaterial
          color={color}
          transparent={false}
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
  p,
  groupWorldZ = 1,
  deadZone = 0.15,
  left = { x: 6, y: 0.22, z: 0 },
  right = { x: 5.8, y: 0.22, z: 0 },
  color = "#ffffff",
}: {
  p: number;
  groupWorldZ?: number;
  deadZone?: number;
  left?: { x: number; y: number; z: number };
  right?: { x: number; y: number; z: number };
  color?: string;
}) {
  return (
    <>
      <TipCircle
        side="left"
        p={p}
        pos={left}
        worldZOfGroup={groupWorldZ}
        deadZone={deadZone}
        color={color}
      />
      <TipCircle
        side="right"
        p={p}
        pos={right}
        worldZOfGroup={groupWorldZ}
        deadZone={deadZone}
        color={color}
      />
    </>
  );
}
