import { useRef } from "react";
import { Billboard } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollProgress } from "../context/scrollProgressState";

const deadZone = 0.15;
const easePower = 1.5;
const curvePower = 1.6;
/* Grow the circle ahead of the CSS white plate so the flood visibly
   originates from the star tip before the page finishes whitening. */
const SCALE_LEAD = 0.55;

type TipCircleProps = {
  side: "left" | "right";
  pos: { x: number; y: number; z: number };
  worldZOfGroup: number;
  startOpacity: number;
};

function TipCircle({
  side,
  pos,
  worldZOfGroup,
  startOpacity,
}: TipCircleProps) {
  const { pRef } = useScrollProgress();
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);
  const fillScaleRef = useRef(1);
  const lastTRef = useRef(-1);

  useFrame(({ viewport, camera }) => {
    const p = pRef.current;

    const toUnit = (val: number) =>
      THREE.MathUtils.clamp((val - deadZone) / (1 - deadZone), 0, 1);
    const sideRaw = side === "right" ? Math.max(0, p) : Math.max(0, -p);
    const easedT = Math.pow(toUnit(sideRaw), easePower);
    const t = Math.pow(easedT, curvePower);

    if (Math.abs(t - lastTRef.current) < 0.004 && meshRef.current?.visible) {
      return;
    }
    lastTRef.current = t;

    const v = viewport.getCurrentViewport(camera, [0, 0, worldZOfGroup]);
    fillScaleRef.current = Math.max(v.width, v.height) / 1.5;

    const baseScale = 0.1;
    const tScale = Math.pow(t, SCALE_LEAD);
    const scale =
      baseScale * Math.pow(fillScaleRef.current / baseScale, tScale);

    if (meshRef.current) {
      meshRef.current.visible = t > 0.008;
      meshRef.current.scale.setScalar(scale);
    }

    if (materialRef.current) {
      // Solidify to opaque white — the circle *is* the page background.
      materialRef.current.opacity = THREE.MathUtils.lerp(startOpacity, 1, t);
    }
  });

  const x = side === "right" ? -Math.abs(pos.x) : +Math.abs(pos.x);

  return (
    <Billboard position={[x, pos.y, pos.z]} follow>
      <mesh ref={meshRef} scale={0.1} renderOrder={10}>
        <circleGeometry args={[1, 48]} />
        <meshBasicMaterial
          ref={materialRef}
          color="#ffffff"
          transparent
          opacity={startOpacity}
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
        startOpacity={0.6}
      />
      <TipCircle
        side="right"
        pos={{ x: 5.8, y: 0.22, z: 0 }}
        worldZOfGroup={groupWorldZ}
        startOpacity={0.8}
      />
    </>
  );
}
