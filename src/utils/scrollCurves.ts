import * as THREE from "three";

export type ScrollCurveConfig = {
  deadZone?: number;
  easePower?: number;
  curvePower?: number;
};

const smoothstep = (a: number, b: number, x: number) => {
  const t = THREE.MathUtils.clamp((x - a) / Math.max(1e-6, b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

export function computeScrollDerived(
  p: number,
  {
    deadZone = 0.15,
    easePower = 1.5,
    curvePower = 1.6,
  }: ScrollCurveConfig = {},
) {
  const toUnit = (val: number) =>
    THREE.MathUtils.clamp((val - deadZone) / (1 - deadZone), 0, 1);

  const sideRawR = Math.max(0, p);
  const sideRawL = Math.max(0, -p);
  const easedR = Math.pow(toUnit(sideRawR), easePower);
  const easedL = Math.pow(toUnit(sideRawL), easePower);
  const expR = Math.pow(easedR, curvePower);
  const expL = Math.pow(easedL, curvePower);

  // Wider transition window avoids late-stage "snap in" of side panes.
  const rightOpacity = smoothstep(0.62, 0.95, expR);
  const leftOpacity = smoothstep(0.62, 0.95, expL);
  const aboutBlurAmount = THREE.MathUtils.clamp(Math.pow(leftOpacity, 0.88), 0, 1);
  const contactBlurAmount = THREE.MathUtils.clamp(
    Math.pow(rightOpacity, 0.88),
    0,
    1,
  );
  const overlayBlurAmount = Math.max(aboutBlurAmount, contactBlurAmount);

  return {
    leftOpacity,
    rightOpacity,
    aboutBlurAmount,
    contactBlurAmount,
    overlayBlurAmount,
    indicatorOpacity: 1 - Math.min(1, Math.abs(p) / deadZone),
  };
}
