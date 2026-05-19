import { useEffect, useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const SPIN_SPEED = 0.42;
const SPIN_ACTIVE = 0.02;
const RETURN_LAMBDA = 12;

export default function LogoPanelSpin({
  spin = 0,
  children,
}: {
  spin: number;
  children: ReactNode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const spinRef = useRef(spin);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    spinRef.current = spin;
  }, [spin]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onChange = () => {
      reducedMotionRef.current = mq.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;

    const s = spinRef.current;

    if (Math.abs(s) >= SPIN_ACTIVE && !reducedMotionRef.current) {
      g.rotation.y += s * delta * SPIN_SPEED;
      return;
    }

    if (Math.abs(g.rotation.y) < 1e-4) {
      g.rotation.y = 0;
      return;
    }

    const settle = reducedMotionRef.current ? 1 : 1 - Math.exp(-delta * RETURN_LAMBDA);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, 0, settle);
  });

  return <group ref={groupRef}>{children}</group>;
}
