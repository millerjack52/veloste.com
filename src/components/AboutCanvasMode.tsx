import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export default function AboutCanvasMode({
  overlayBlurAmount,
}: {
  overlayBlurAmount: number;
}) {
  const { gl } = useThree();
  const amountRef = useRef(overlayBlurAmount);
  const opaqueRef = useRef(false);

  useEffect(() => {
    amountRef.current = overlayBlurAmount;
  }, [overlayBlurAmount]);

  useEffect(() => {
    return () => {
      gl.setClearColor(0x000000, 0);
      gl.setClearAlpha(0);
    };
  }, [gl]);

  useFrame(() => {
    const aboutActive = amountRef.current > 0.02;

    if (aboutActive !== opaqueRef.current) {
      opaqueRef.current = aboutActive;
      if (aboutActive) {
        gl.setClearColor(0x000000, 1);
        gl.setClearAlpha(1);
      } else {
        gl.setClearColor(0x000000, 0);
        gl.setClearAlpha(0);
      }
    }
  });

  return null;
}
