import * as React from "react";
import { useThree } from "@react-three/fiber";

/**
 * Circle geometry radius = 1.
 * Returns a function that computes the scale to FILL the viewport at world Z.
 */
export default function useFillScaleAtDepth(z: number = 0) {
  const { viewport, camera } = useThree();
  return React.useCallback(() => {
    const v = viewport.getCurrentViewport(camera, [0, 0, z]);
    // Make the circle's diameter cover the largest viewport dimension.
    // radius = 1 -> scale = diameter/2
    return Math.max(v.width, v.height) / 1.5;
  }, [viewport, camera, z]);
}
