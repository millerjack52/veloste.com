import React, { useMemo, useRef } from "react";
import {
  ScrollProgressContext,
  type ScrollProgressValue,
} from "./scrollProgressState";

export function ScrollProgressProvider({
  smooth,
  children,
}: {
  smooth: number;
  children: React.ReactNode;
}) {
  const pRef = useRef(0);
  const pTargetRef = useRef(0);
  const glowRef = useRef(0);
  const lightBoostRef = useRef(1);
  const overlayBlurRef = useRef(0);

  const value = useMemo<ScrollProgressValue>(
    () => ({
      pRef,
      pTargetRef,
      smooth,
      sceneRefs: {
        glow: glowRef,
        lightBoost: lightBoostRef,
        overlayBlur: overlayBlurRef,
      },
    }),
    [smooth],
  );

  return (
    <ScrollProgressContext.Provider value={value}>
      {children}
    </ScrollProgressContext.Provider>
  );
}
