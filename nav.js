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

/* Page flow: the static pages snap like the homepage About pane (see
   the "Page flow" block in /seo-pages.css). A block whose content is
   taller than the snapport (viewport minus the pill-nav scroll padding)
   cannot rest as one slide, and any snap area on it only gives the
   browser points to tug the reader toward mid-read. Mark it
   .snap-through instead, which drops its snap area so it scrolls
   freely. Blocks that fit keep the About pane's block snap. */
(() => {
  "use strict";

  const blocks = Array.from(
    document.querySelectorAll(".landing-hero, .case-hero, .section"),
  );
  if (!blocks.length) return;

  const root = document.documentElement;

  const classify = () => {
    const snapTop = parseFloat(getComputedStyle(root).scrollPaddingTop) || 0;
    const snapport = window.innerHeight - snapTop;
    for (const block of blocks) {
      const style = getComputedStyle(block);
      // A .section folds its breathing gap into the bottom padding and
      // keeps it out of the snap area; heroes carry no gap.
      const gap = block.classList.contains("section")
        ? Math.max(
            0,
            parseFloat(style.paddingBottom) - parseFloat(style.paddingTop),
          )
        : 0;
      const area = block.offsetHeight - gap;
      block.classList.toggle("snap-through", area > snapport + 1);
    }
  };

  classify();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(classify);
  }
  window.addEventListener("load", classify);

  let timer = 0;
  const schedule = (delay) => {
    clearTimeout(timer);
    timer = setTimeout(classify, delay);
  };
  window.addEventListener("resize", () => schedule(150), { passive: true });
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(() => schedule(50));
    blocks.forEach((block) => observer.observe(block));
  }
})();
