import React, { useEffect, useState } from "react";

function setProgress(p: number) {
  window.dispatchEvent(
    new CustomEvent("veloste:setProgress", { detail: { p } }),
  );
}

export default function SiteNav({
  onOpenWork,
  onPrefetchWork,
}: {
  onOpenWork: () => void;
  onPrefetchWork: () => void;
}) {
  const [side, setSide] = useState<"left" | "right" | null>(null);

  useEffect(() => {
    const onLeft = (e: Event) => {
      const active = (e as CustomEvent<{ active: boolean }>).detail.active;
      setSide((prev) => (active ? "left" : prev === "left" ? null : prev));
    };
    const onRight = (e: Event) => {
      const active = (e as CustomEvent<{ active: boolean }>).detail.active;
      setSide((prev) => (active ? "right" : prev === "right" ? null : prev));
    };
    window.addEventListener("veloste:leftInteractive", onLeft);
    window.addEventListener("veloste:rightInteractive", onRight);
    return () => {
      window.removeEventListener("veloste:leftInteractive", onLeft);
      window.removeEventListener("veloste:rightInteractive", onRight);
    };
  }, []);

  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="site-nav__pill glass">
        <button
          type="button"
          className={`site-nav__link${side === "left" ? " is-active" : ""}`}
          onClick={() => setProgress(side === "left" ? 0 : -1)}
        >
          About
        </button>
        <button
          type="button"
          className="site-nav__link"
          onClick={onOpenWork}
          onMouseEnter={onPrefetchWork}
          onFocus={onPrefetchWork}
        >
          Work
        </button>
        <button
          type="button"
          className={`site-nav__link${side === "right" ? " is-active" : ""}`}
          onClick={() => setProgress(side === "right" ? 0 : 1)}
        >
          Contact
        </button>
      </div>
    </nav>
  );
}
