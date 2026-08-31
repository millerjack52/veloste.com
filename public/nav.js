/* Pill-nav polarity for the static pages: while a white .surface-light
   section sits under the fixed pill, flip it to the light variant —
   the same inversion the homepage does via html.veloste-light. */
(() => {
  "use strict";

  const nav = document.querySelector(".pill-nav");
  if (!nav || !("IntersectionObserver" in window)) return;

  const sections = Array.from(document.querySelectorAll(".surface-light"));
  if (!sections.length) return;

  // Observe a thin band at the top of the viewport, tall enough to cover
  // the pill (top offset + pill height).
  const ZONE = 72;
  const under = new Set();
  let observer = null;

  const build = () => {
    if (observer) observer.disconnect();
    under.clear();
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) under.add(entry.target);
          else under.delete(entry.target);
        }
        nav.classList.toggle("pill-nav--light", under.size > 0);
      },
      { rootMargin: "0px 0px " + (ZONE - window.innerHeight) + "px 0px" },
    );
    sections.forEach((s) => observer.observe(s));
  };

  build();

  let resizeTimer = 0;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 150);
    },
    { passive: true },
  );
})();
