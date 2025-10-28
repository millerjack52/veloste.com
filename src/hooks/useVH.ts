import { useEffect } from "react";

/** Sets --vh CSS var that matches the safe viewport height (iOS-safe). */
export default function useVh() {
  useEffect(() => {
    const setVh = () =>
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);
}
