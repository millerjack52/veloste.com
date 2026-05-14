import { useEffect } from "react";

function viewportHeightPx(): number {
  if (typeof window === "undefined") return 0;
  const vv = window.visualViewport;
  if (vv?.height) return vv.height;
  return window.innerHeight;
}

/** Sets --vh to match dynamic viewport height (mobile browser chrome / iOS safe area). */
export default function useVh() {
  useEffect(() => {
    const setVh = () => {
      const h = viewportHeightPx();
      document.documentElement.style.setProperty("--vh", `${h * 0.01}px`);
    };
    setVh();
    window.addEventListener("resize", setVh);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", setVh);
    vv?.addEventListener("scroll", setVh);
    return () => {
      window.removeEventListener("resize", setVh);
      vv?.removeEventListener("resize", setVh);
      vv?.removeEventListener("scroll", setVh);
    };
  }, []);
}
