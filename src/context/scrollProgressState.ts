import { createContext, useContext } from "react";
import type React from "react";

export type SceneControlRefs = {
  glow: React.MutableRefObject<number>;
  lightBoost: React.MutableRefObject<number>;
  overlayBlur: React.MutableRefObject<number>;
};

export type ScrollProgressValue = {
  pRef: React.MutableRefObject<number>;
  pTargetRef: React.MutableRefObject<number>;
  smooth: number;
  sceneRefs: SceneControlRefs;
};

export const ScrollProgressContext =
  createContext<ScrollProgressValue | null>(null);

export function useScrollProgress() {
  const ctx = useContext(ScrollProgressContext);
  if (!ctx) {
    throw new Error("useScrollProgress must be used within ScrollProgressProvider");
  }
  return ctx;
}
