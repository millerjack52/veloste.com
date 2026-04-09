import React from "react";

const SMOOTH_ALPHA = 0.09;

/** Stable layout: animated padding/height changes alter scroll metrics and card centering */
const SCROLL_PAD = "10vh 40px 12vh";
const COLUMN_MAX = 900;
const COLUMN_GAP = 24;
const INNER_GUTTER = "0px";
const CARD_MIN_HEIGHT = 380;
const CARD_PAD_Y = 32;
const CARD_PAD_X = 36;
const CARD_STACK_GAP = 18;
const CARD_GAP_INTERNAL = 16;
const SPACER_MIN_H = 24;
/**
 * Where section midlines align in the scroll viewport: fraction of viewport height from the top.
 * `0.5` = geometric center; lower (e.g. `0.43`) sits a bit higher on screen.
 */
const SECTION_VIEWPORT_ALIGN_FROM_TOP = 0.43;

/** Scroll position that vertically aligns `sectionEl`’s midline to that hold line in the viewport */
function getScrollTopToCenterSectionInViewport(
  scrollEl: HTMLDivElement,
  sectionEl: HTMLElement,
): number {
  const s = scrollEl.getBoundingClientRect();
  const r = sectionEl.getBoundingClientRect();
  const viewportHoldY =
    s.top + s.height * SECTION_VIEWPORT_ALIGN_FROM_TOP;
  const sectionMidY = r.top + r.height / 2;
  const raw = Math.round(scrollEl.scrollTop + (sectionMidY - viewportHoldY));
  const maxTop = Math.max(0, scrollEl.scrollHeight - scrollEl.clientHeight);
  return Math.max(0, Math.min(maxTop, raw));
}

function nearestSectionIndex(scrollTop: number, offsets: readonly number[]): number {
  if (offsets.length === 0) return 0;
  let best = 0;
  let bestD = Infinity;
  for (let i = 0; i < offsets.length; i++) {
    const d = Math.abs(offsets[i] - scrollTop);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}

/** Less twitchy than browser smooth-scroll; softer ease curve for section jumps */
function easeInOutQuint(t: number) {
  return t < 0.5
    ? 16 * Math.pow(t, 5)
    : 1 - Math.pow(-2 * t + 2, 5) / 2;
}

function smoothScrollElementTo(
  el: HTMLElement,
  targetTop: number,
  durationMs: number,
  reducedMotion: boolean,
  onDone?: () => void,
  debugMeta?: Record<string, unknown>,
): () => void {
  const start = el.scrollTop;
  aboutDebug("scroll_anim_start", {
    ...debugMeta,
    start,
    target: targetTop,
    delta: targetTop - start,
    durationMs,
    reducedMotion,
  });
  if (reducedMotion) {
    el.scrollTop = targetTop;
    aboutDebug("scroll_anim_done", { ...debugMeta, mode: "instant", final: el.scrollTop });
    onDone?.();
    return () => {};
  }
  const delta = targetTop - start;
  if (Math.abs(delta) < 0.5) {
    aboutDebug("scroll_anim_skip", { ...debugMeta, reason: "delta_lt_0.5", final: el.scrollTop });
    onDone?.();
    return () => {};
  }
  const t0 = performance.now();
  let rafId = 0;
  let cancelled = false;
  const tick = (now: number) => {
    if (cancelled) return;
    const elapsed = now - t0;
    const t = Math.min(1, elapsed / durationMs);
    el.scrollTop = start + delta * easeInOutQuint(t);
    if (t < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      el.scrollTop = targetTop;
      aboutDebug("scroll_anim_done", {
        ...debugMeta,
        mode: "eased",
        final: el.scrollTop,
        elapsedMs: Math.round(now - t0),
      });
      onDone?.();
    }
  };
  rafId = requestAnimationFrame(tick);
  return () => {
    if (!cancelled) {
      aboutDebug("scroll_anim_cancel", { ...debugMeta, at: el.scrollTop });
    }
    cancelled = true;
    cancelAnimationFrame(rafId);
  };
}

/** Wheel / trackpad: any non-zero delta commits one section step */
const SECTION_SCROLL_DURATION_MS = 880;
const WHEEL_COOLDOWN_MS = 120;

// --- About scroll debug (opt-in): ?aboutDebug=1 or localStorage veloste_about_debug=1 ---
const ABOUT_DEBUG_LIMIT = 220;

type AboutDebugEntry = {
  id: number;
  t: number;
  wallIso: string;
  type: string;
  data: Record<string, unknown>;
};

let aboutDebugSeq = 0;
const aboutDebugBuffer: AboutDebugEntry[] = [];
let aboutDebugEnabled = false;

function readAboutDebugEnabled(): boolean {
  try {
    if (typeof window === "undefined") return false;
    if (window.localStorage.getItem("veloste_about_debug") === "1") return true;
    const q = new URLSearchParams(window.location.search);
    return q.has("aboutDebug") || q.get("aboutDebug") === "1";
  } catch {
    return false;
  }
}

function aboutDebug(type: string, data: Record<string, unknown> = {}) {
  if (!aboutDebugEnabled) return;
  const entry: AboutDebugEntry = {
    id: ++aboutDebugSeq,
    t: Math.round(performance.now() * 10) / 10,
    wallIso: new Date().toISOString(),
    type,
    data,
  };
  aboutDebugBuffer.push(entry);
  if (aboutDebugBuffer.length > ABOUT_DEBUG_LIMIT) aboutDebugBuffer.shift();
  // Single line so you can filter console by "[Veloste About]"
  console.log(`[Veloste About #${entry.id}] ${type}`, data);
}

function installAboutDebugApi() {
  if (typeof window === "undefined") return;
  (
    window as unknown as {
      __VELABOUT__: {
        version: number;
        readonly enabled: boolean;
        setEnabled: (v: boolean) => void;
        refresh: () => void;
        getLog: () => AboutDebugEntry[];
        clearLog: () => void;
        dump: () => string;
        constants: () => Record<string, unknown>;
      };
    }
  ).__VELABOUT__ = {
    version: 1,
    get enabled() {
      return aboutDebugEnabled;
    },
    setEnabled(v: boolean) {
      aboutDebugEnabled = v;
      try {
        if (v) window.localStorage.setItem("veloste_about_debug", "1");
        else window.localStorage.removeItem("veloste_about_debug");
      } catch {
        /* ignore */
      }
      aboutDebug("debug_toggle", { on: v });
    },
    refresh() {
      aboutDebugEnabled = readAboutDebugEnabled();
      aboutDebug("debug_refresh", { on: aboutDebugEnabled });
    },
    getLog: () => [...aboutDebugBuffer],
    clearLog: () => {
      aboutDebugBuffer.length = 0;
    },
    dump: () => JSON.stringify(aboutDebugBuffer, null, 2),
    constants: () => ({
      SECTION_SCROLL_DURATION_MS,
      WHEEL_COOLDOWN_MS,
      SECTION_VIEWPORT_ALIGN_FROM_TOP,
      SMOOTH_ALPHA,
      SECTION_COUNT,
    }),
  };
}

installAboutDebugApi();

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function clamp01(x: number) {
  return Math.min(1, Math.max(0, x));
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / Math.max(1e-6, edge1 - edge0));
  return t * t * (3 - 2 * t);
}

type RGB = [number, number, number];

function lerpRgb(a: RGB, b: RGB, t: number): RGB {
  return [
    Math.round(mix(a[0], b[0], t)),
    Math.round(mix(a[1], b[1], t)),
    Math.round(mix(a[2], b[2], t)),
  ];
}

function rgb(rgbv: RGB) {
  return `rgb(${rgbv[0]}, ${rgbv[1]}, ${rgbv[2]})`;
}

function rgba(rgbv: RGB, alpha: number) {
  return `rgba(${rgbv[0]}, ${rgbv[1]}, ${rgbv[2]}, ${alpha})`;
}

/** WCAG-oriented pairs: interpolate text between light-bg and dark-bg endpoints */
function themeInk(u: number, tBlend = smoothstep(0.32, 0.74, u)) {
  const t = tBlend;
  const onPaper: { main: RGB; body: RGB; muted: RGB; faint: RGB } = {
    main: [10, 10, 12],
    body: [28, 30, 36],
    muted: [58, 60, 68],
    faint: [92, 94, 102],
  };
  const onDark: { main: RGB; body: RGB; muted: RGB; faint: RGB } = {
    main: [252, 252, 255],
    body: [228, 230, 238],
    muted: [168, 170, 182],
    faint: [130, 132, 145],
  };
  return {
    main: rgb(lerpRgb(onPaper.main, onDark.main, t)),
    body: rgba(lerpRgb(
      onPaper.body,
      onDark.body,
      t,
    ), mix(0.94, 0.9, t)),
    muted: rgba(lerpRgb(onPaper.muted, onDark.muted, t), mix(0.88, 0.78, t)),
    faint: rgba(lerpRgb(onPaper.faint, onDark.faint, t), mix(0.78, 0.62, t)),
  };
}

interface CaseItem {
  id: number;
  label: string;
  title: string;
  body: string;
}

const CASES: CaseItem[] = [
  {
    id: 1,
    label: "Studio",
    title: "Veloste designs surfaces, not templates.",
    body: "We create graphic, motion-led web experiences that feel like crafted spaces. Every build starts from a visual and interaction system tailored to your brand, not a pre-existing theme.",
  },
  {
    id: 2,
    label: "Graphic Systems",
    title: "Art direction that shapes interaction.",
    body: "Type, grids, and composition come first. We use editorial thinking to decide how content flows, then layer motion and depth so the interface feels intentional rather than decorated.",
  },
  {
    id: 3,
    label: "Immersive Web",
    title: "3D as a wayfinding tool, not a gimmick.",
    body: "3D canvases explain products, spaces, and ideas in ways flat UI can't. We use subtle movement, parallax, and perspective to guide attention—always with performance budgets and fallbacks in mind.",
  },
  {
    id: 4,
    label: "Interactions",
    title: "Unique, but never unfamiliar.",
    body: "We lean on affordances—hover, motion cues, depth, and cursor feedback—to introduce new patterns without confusing people. The experience feels fresh, while still behaving like the web.",
  },
  {
    id: 5,
    label: "Partnership",
    title: "Built with product teams, not around them.",
    body: "We work as an embedded design–dev partner: aligning with your roadmap, collaborating with internal teams, and shipping surfaces that can be iterated on—not one-off experiments.",
  },
];

/** Intro + each case card + FAQ block */
const SECTION_COUNT = 1 + CASES.length + 1;

const FAQS = [
  {
    q: "How much does a custom Veloste website cost?",
    a: "Pricing is project-specific and depends on scope, timeline, and interaction complexity. We provide a custom quote after discovery.",
  },
  {
    q: "How long does a project usually take?",
    a: "Delivery timelines depend on scope, revisions, and technical requirements. We provide timeline estimates in your proposal.",
  },
  {
    q: "Do you serve clients outside your home city?",
    a: "Yes. We support clients across Canada and the United States, with priority areas in Calgary, Edmonton, and Red Deer.",
  },
  {
    q: "What services are included in a standard engagement?",
    a: "Most engagements include strategy, visual direction, interaction design, and implementation. Scope can also include 3D elements, content structure, and post-launch iteration.",
  },
  {
    q: "Do you offer retainers after launch?",
    a: "Yes. Ongoing support arrangements are available for optimization, feature work, and design updates, based on your required scope.",
  },
  {
    q: "What makes Veloste different from template-based studios?",
    a: "We design custom systems around your brand goals instead of starting from a prebuilt theme. That gives you clearer differentiation and more control over performance and maintainability.",
  },
  {
    q: "Do you provide warranty or post-launch support?",
    a: "Yes. We provide free post-completion support for launch-related issues if anything unexpected appears after go-live.",
  },
  {
    q: "How do we start a project?",
    a: "Send your goals, rough budget, and timeline through the contact form. We follow with a discovery call and then a scoped proposal.",
  },
];

// === AboutPane ===

export default function AboutPane({
  opacity,
  active,
}: {
  opacity: number;
  active: boolean;
}) {
  const scrollBoxRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const introRef = React.useRef<HTMLElement | null>(null);
  const faqRef = React.useRef<HTMLElement | null>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const sectionOffsetsRef = React.useRef<number[]>([]);
  const snapLockRef = React.useRef(false);
  const wheelCooldownUntilRef = React.useRef(0);
  const scrollAnimCancelRef = React.useRef<(() => void) | null>(null);
  const lastOffsetsSigRef = React.useRef("");
  const lastScrollSampleRef = React.useRef({ t: 0, idx: -1, scrollTop: -1 });
  const prevInteractiveRef = React.useRef(false);
  /** Highest stage reached: 0 = intro, 1..CASES.length = that card centered */
  const maxStageRef = React.useRef(0);
  const refinementSmoothRef = React.useRef(0);
  const smoothRafRef = React.useRef<number | null>(null);
  const wheelHandlerRef = React.useRef<(e: WheelEvent) => void>(() => {});

  const [progress, setProgress] = React.useState(0);
  const [trackHeight, setTrackHeight] = React.useState(0);
  const [isScrollable, setIsScrollable] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);
  const [refinement, setRefinement] = React.useState(0);
  const KNOB = 12;

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  React.useEffect(() => {
    maxStageRef.current = 0;
    refinementSmoothRef.current = 0;
    if (reducedMotion) {
      maxStageRef.current = CASES.length;
      refinementSmoothRef.current = 1;
      setRefinement(1);
    } else {
      setRefinement(0);
    }
  }, [reducedMotion]);

  React.useEffect(() => {
    const setVh = () =>
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`,
      );
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  React.useEffect(() => {
    aboutDebugEnabled = readAboutDebugEnabled();
    installAboutDebugApi();
    aboutDebug("about_pane_mount", {
      aboutDebugEnabled,
      hint: "After repro: copy(__VELABOUT__.dump()) in console",
    });
  }, []);

  const bumpStageFromLayout = React.useCallback(
    (scrollEl: HTMLDivElement) => {
      if (reducedMotion) {
        maxStageRef.current = CASES.length;
        refinementSmoothRef.current = 1;
        setRefinement(1);
        return;
      }
      const offs = sectionOffsetsRef.current;
      if (offs.length < SECTION_COUNT) return;
      const idx = nearestSectionIndex(scrollEl.scrollTop, offs);
      const stage = Math.min(idx, CASES.length);
      maxStageRef.current = Math.max(maxStageRef.current, stage);
    },
    [reducedMotion],
  );

  const refreshSectionOffsets = React.useCallback(() => {
    const scroll = scrollBoxRef.current;
    if (!scroll || !introRef.current) return;
    const offs: number[] = [];
    offs.push(getScrollTopToCenterSectionInViewport(scroll, introRef.current));
    for (let i = 0; i < CASES.length; i++) {
      const c = cardRefs.current[i];
      if (c) offs.push(getScrollTopToCenterSectionInViewport(scroll, c));
    }
    if (faqRef.current) {
      offs.push(getScrollTopToCenterSectionInViewport(scroll, faqRef.current));
    }
    if (offs.length === SECTION_COUNT) {
      sectionOffsetsRef.current = offs;
    }
  }, []);

  const goToAdjacentSection = React.useCallback(
    (delta: number) => {
      const el = scrollBoxRef.current;
      const offs = sectionOffsetsRef.current;
      if (!el || offs.length < SECTION_COUNT) {
        aboutDebug("go_section_skip", {
          reason: !el ? "no_scroll_el" : "offsets_incomplete",
          offLen: offs.length,
          SECTION_COUNT,
        });
        return;
      }
      if (snapLockRef.current) {
        aboutDebug("go_section_skip", {
          reason: "snap_lock",
          delta,
          scrollTop: el.scrollTop,
        });
        return;
      }
      const idx = nearestSectionIndex(el.scrollTop, offs);
      const next = Math.max(0, Math.min(SECTION_COUNT - 1, idx + delta));
      if (next === idx) {
        aboutDebug("go_section_skip", {
          reason: "same_section",
          idx,
          delta,
          scrollTop: el.scrollTop,
        });
        return;
      }
      scrollAnimCancelRef.current?.();
      snapLockRef.current = true;
      aboutDebug("go_section", {
        fromIdx: idx,
        toIdx: next,
        delta,
        scrollTopBefore: el.scrollTop,
        targetScrollTop: offs[next],
        gapPx: offs[next] - el.scrollTop,
      });
      scrollAnimCancelRef.current = smoothScrollElementTo(
        el,
        offs[next],
        SECTION_SCROLL_DURATION_MS,
        reducedMotion,
        () => {
          snapLockRef.current = false;
          wheelCooldownUntilRef.current = performance.now() + WHEEL_COOLDOWN_MS;
          scrollAnimCancelRef.current = null;
          aboutDebug("wheel_cooldown_set", {
            ms: WHEEL_COOLDOWN_MS,
            until: wheelCooldownUntilRef.current,
          });
        },
        { fromIdx: idx, toIdx: next },
      );
    },
    [reducedMotion],
  );

  const runSmoothing = React.useCallback(() => {
    if (reducedMotion) return;
    if (smoothRafRef.current != null) return;
    const step = () => {
      smoothRafRef.current = null;
      const target = maxStageRef.current / CASES.length;
      let v = refinementSmoothRef.current;
      v += (target - v) * SMOOTH_ALPHA;
      if (Math.abs(v - target) < 0.002) v = target;
      refinementSmoothRef.current = v;
      setRefinement(v);
      if (Math.abs(v - target) > 0.0015) {
        smoothRafRef.current = requestAnimationFrame(step);
      }
    };
    smoothRafRef.current = requestAnimationFrame(step);
  }, [reducedMotion]);

  const measure = React.useCallback(() => {
    const el = scrollBoxRef.current;
    if (!el) return;
    setIsScrollable(el.scrollHeight - el.clientHeight > 2);
    if (trackRef.current) {
      setTrackHeight(trackRef.current.getBoundingClientRect().height);
    }
    refreshSectionOffsets();
    const o = sectionOffsetsRef.current;
    if (o.length === SECTION_COUNT) {
      const sig = o.join(",");
      if (sig !== lastOffsetsSigRef.current) {
        lastOffsetsSigRef.current = sig;
        const deltas = o.slice(1).map((x, i) => Math.round(x - o[i]));
        aboutDebug("offsets_changed", {
          offs: [...o],
          deltasPx: deltas,
          scrollH: el.scrollHeight,
          clientH: el.clientHeight,
        });
      }
    }
    const denom = Math.max(1, el.scrollHeight - el.clientHeight);
    setProgress(el.scrollTop / denom);
    bumpStageFromLayout(el);
    runSmoothing();
  }, [bumpStageFromLayout, refreshSectionOffsets, runSmoothing]);

  React.useEffect(() => {
    return () => {
      if (smoothRafRef.current != null) {
        cancelAnimationFrame(smoothRafRef.current);
        smoothRafRef.current = null;
      }
      scrollAnimCancelRef.current?.();
      scrollAnimCancelRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    if (!active) {
      wheelCooldownUntilRef.current = 0;
    }
  }, [active]);

  React.useEffect(() => {
    measure();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      if (scrollBoxRef.current) ro.observe(scrollBoxRef.current);
      if (trackRef.current) ro.observe(trackRef.current);
    }
    window.addEventListener("resize", measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  React.useEffect(() => {
    if (active && !prevInteractiveRef.current && scrollBoxRef.current) {
      scrollBoxRef.current.scrollTo({ top: 0 });
      measure();
      const r = maxStageRef.current / CASES.length;
      refinementSmoothRef.current = r;
      setRefinement(r);
    }
    prevInteractiveRef.current = active;
  }, [active, measure]);

  React.useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t?.closest("button, [href], input, textarea, select")) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        aboutDebug("key_step", { key: e.key, dir: 1 });
        goToAdjacentSection(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        aboutDebug("key_step", { key: e.key, dir: -1 });
        goToAdjacentSection(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goToAdjacentSection]);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const denom = Math.max(1, el.scrollHeight - el.clientHeight);
    setProgress(el.scrollTop / denom);
    bumpStageFromLayout(el);
    runSmoothing();

    const offs = sectionOffsetsRef.current;
    if (offs.length === SECTION_COUNT) {
      const idx = nearestSectionIndex(el.scrollTop, offs);
      const dists = offs.map((top) => Math.round(Math.abs(el.scrollTop - top)));
      const minD = Math.min(...dists);
      const now = performance.now();
      const s = lastScrollSampleRef.current;
      const idxChanged = idx !== s.idx;
      const moved = Math.abs(el.scrollTop - s.scrollTop) > 8;
      const timeOk = now - s.t > 140;
      if (idxChanged || moved || timeOk) {
        lastScrollSampleRef.current = {
          t: now,
          idx,
          scrollTop: el.scrollTop,
        };
        aboutDebug("scroll_sample", {
          scrollTop: Math.round(el.scrollTop),
          nearestIdx: idx,
          minDistToSnapPx: minD,
          snapLock: snapLockRef.current,
          progress: Math.round((el.scrollTop / denom) * 1000) / 1000,
          maxStage: maxStageRef.current,
        });
      }
    }
  };

  wheelHandlerRef.current = (e: WheelEvent) => {
    if (!active || !isScrollable) {
      aboutDebug("wheel_ignore", { reason: !active ? "inactive" : "not_scrollable" });
      return;
    }
    const el = scrollBoxRef.current;
    const offs = sectionOffsetsRef.current;
    if (!el || offs.length < SECTION_COUNT) {
      aboutDebug("wheel_ignore", {
        reason: !el ? "no_el" : "offsets_incomplete",
        offLen: offs.length,
      });
      return;
    }
    const now = performance.now();
    const cdLeft = wheelCooldownUntilRef.current - now;
    if (now < wheelCooldownUntilRef.current) {
      aboutDebug("wheel_cooldown_block", {
        cdLeftMs: Math.round(cdLeft),
        scrollTop: el.scrollTop,
      });
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    const dyRaw = e.deltaY;
    const deltaMode = e.deltaMode;
    let dy = dyRaw;
    if (deltaMode === 1) dy *= 16;
    else if (deltaMode === 2) dy *= el.clientHeight || 400;

    const idx = nearestSectionIndex(el.scrollTop, offs);
    const stepDir = dy > 0 ? 1 : dy < 0 ? -1 : 0;
    if (stepDir === 0) {
      aboutDebug("wheel_ignore", { reason: "zero_step_dir", dyRaw, deltaMode });
      return;
    }

    const next = Math.max(0, Math.min(SECTION_COUNT - 1, idx + stepDir));
    if (next === idx) {
      if (
        (idx === 0 && stepDir < 0) ||
        (idx === SECTION_COUNT - 1 && stepDir > 0)
      ) {
        aboutDebug("wheel_pass_to_parent", {
          idx,
          stepDir,
          reason: "at_terminal_section",
          dyRaw,
          deltaMode,
          dyNorm: dy,
        });
        return;
      }
      aboutDebug("wheel_block_no_move", {
        idx,
        next,
        stepDir,
        dyRaw,
        deltaMode,
        dyNorm: dy,
        scrollTop: el.scrollTop,
      });
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (snapLockRef.current) {
      aboutDebug("wheel_block_snap_lock", {
        idx,
        wouldNext: next,
        dyRaw,
        deltaMode,
        dyNorm: dy,
        scrollTop: el.scrollTop,
      });
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    aboutDebug("wheel_commit_step", {
      idx,
      toIdx: next,
      stepDir,
      dyRaw,
      deltaMode,
      dyNorm: dy,
      scrollTop: el.scrollTop,
    });
    e.preventDefault();
    e.stopPropagation();
    goToAdjacentSection(stepDir);
  };

  React.useEffect(() => {
    const el = scrollBoxRef.current;
    if (!el || !active || !isScrollable) return;
    const onWheelNative = (e: WheelEvent) => wheelHandlerRef.current(e);
    el.addEventListener("wheel", onWheelNative, { passive: false, capture: true });
    return () => {
      el.removeEventListener("wheel", onWheelNative, { capture: true });
    };
  }, [active, isScrollable]);

  const goToContact = () => {
    window.dispatchEvent(
      new CustomEvent("veloste:setProgress", { detail: { p: 1 } }),
    );
  };

  const r = refinement;
  /** Ease: longer in “raw document”, then catch up toward polished UI */
  const u = Math.pow(r, 0.82);
  /** Single blend for surfaces + ink — avoids muddy mid-tones */
  const tTheme = smoothstep(0.32, 0.74, u);

  const fontSystem = `system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;
  const fontPrint = `'Georgia', 'Times New Roman', 'Times', serif`;
  const fontMag = `'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif`;
  const fontMono = `ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, 'Courier New', monospace`;

  const ink = themeInk(u, tTheme);
  const scaffoldRgb = "0, 120, 212";
  const scaffoldOpacity = clamp01(mix(0.5, 0, u * 1.35));
  const devTagOpacity = clamp01(mix(0.85, 0, u * 1.15));

  const columnPaperRgb = lerpRgb([235, 232, 225], [14, 14, 16], tTheme);
  const columnPaper = `rgba(${columnPaperRgb[0]}, ${columnPaperRgb[1]}, ${columnPaperRgb[2]}, ${mix(0.97, 0, tTheme)})`;
  const innerGutter = INNER_GUTTER;

  const introRadius = mix(0, 10, u);
  const introSheet = `rgba(255, 252, 245, ${mix(0.5, 0, u * 0.85)})`;
  const ruleRgb = lerpRgb([55, 55, 62], [200, 200, 210], tTheme);
  const introRule = `1px solid ${rgba(ruleRgb, mix(0.4, 0.2, tTheme))}`;

  const panelBorderW = u < 0.32 ? 2 : 1;
  const panelBorderStyle = u < 0.32 ? "dashed" : "solid";
  const panelBorderRgb = lerpRgb([55, 58, 68], [220, 222, 232], tTheme);
  const panelBorderCol = rgba(panelBorderRgb, mix(0.55, 0.22, tTheme));
  const panelBorder = `${panelBorderW}px ${panelBorderStyle} ${panelBorderCol}`;
  const panelRadius = mix(0, 14, u);
  const cardRgb = lerpRgb([252, 249, 242], [22, 20, 26], tTheme);
  const cardSurface = `rgba(${cardRgb[0]}, ${cardRgb[1]}, ${cardRgb[2]}, ${mix(0.94, 0.98, tTheme)})`;
  const cardTitleCol = ink.main;
  const cardBodyCol = ink.body;
  const cardMutedCol = ink.muted;

  const titleUppercase = u > 0.44;
  const titleFont =
    u < 0.28 ? fontSystem : u < 0.42 ? fontMono : fontMag;
  const bodyFont =
    u < 0.32 ? fontSystem : u < 0.48 ? fontPrint : fontMag;
  const labelStyle = {
    fontSize: mix(10, 11, u),
    letterSpacing: `${mix(0.02, 0.2, u)}em`,
    textTransform: (u > 0.4 ? "uppercase" : "none") as React.CSSProperties["textTransform"],
    color: ink.muted,
    fontFamily: u < 0.4 ? fontMono : fontMag,
    marginBottom: 12,
  };

  const faqBorderRgb = lerpRgb([48, 50, 58], [210, 212, 222], tTheme);
  const faqBorder = `${u < 0.3 ? 2 : 1}px ${u < 0.3 ? "dashed" : "solid"} ${rgba(faqBorderRgb, mix(0.5, 0.18, tTheme))}`;
  const faqBgRgb = lerpRgb([255, 255, 255], [32, 30, 36], tTheme);
  const faqBg = `rgba(${faqBgRgb[0]}, ${faqBgRgb[1]}, ${faqBgRgb[2]}, ${mix(0.08, 0.045, tTheme)})`;
  const faqHeadingCol = ink.main;
  const faqBtnCol = ink.main;
  const faqAnswerCol = ink.body;
  const faqChevronCol = ink.muted;

  const gridScaffoldCss = `repeating-linear-gradient(
      0deg,
      transparent 0,
      transparent 11px,
      rgba(${scaffoldRgb}, 0.07) 11px,
      rgba(${scaffoldRgb}, 0.07) 12px
    ),
    repeating-linear-gradient(
      90deg,
      transparent 0,
      transparent 11px,
      rgba(180, 0, 120, 0.05) 11px,
      rgba(180, 0, 120, 0.05) 12px
    )`;

  return (
    <>
      <style>{`
        .about-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .about-scroll::-webkit-scrollbar { width: 0; height: 0; }
      `}</style>

      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "calc(var(--vh, 1vh) * 100)",
          background: "#000",
          opacity,
          transition: "opacity 120ms linear",
          pointerEvents: active ? "auto" : "none",
          overflow: "hidden",
        }}
      >
        <div
          ref={scrollBoxRef}
          className="about-scroll"
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            overflowY: active ? "auto" : "hidden",
            WebkitOverflowScrolling: active ? "touch" : "auto",
            overscrollBehavior: active ? "auto" : "contain",
            padding: SCROLL_PAD,
            touchAction: active ? "auto" : "none",
            background: "#000",
          }}
          onScroll={active ? onScroll : undefined}
          onTouchMoveCapture={(e) => {
            if (!active || !isScrollable) return;
            const el = scrollBoxRef.current;
            if (!el) return;
            const { scrollTop, scrollHeight, clientHeight } = el;
            const TOLERANCE = 6;
            const atTop = scrollTop <= TOLERANCE;
            const atBottom =
              scrollTop + clientHeight >= scrollHeight - TOLERANCE;
            if (!atTop && !atBottom) e.stopPropagation();
          }}
          onPointerDownCapture={(e) => {
            if (active) e.stopPropagation();
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: COLUMN_MAX,
              margin: "0 auto",
              width: "100%",
              background: columnPaper,
              borderRadius: mix(0, 12, u),
              boxShadow:
                u > 0.55
                  ? "0 28px 80px rgba(0,0,0,0.35)"
                  : u < 0.22
                    ? `inset 0 0 0 1px rgba(${scaffoldRgb}, 0.25)`
                    : "0 12px 40px rgba(0,0,0,0.12)",
              transition:
                "background-color 0.45s ease, border-radius 0.45s ease, box-shadow 0.45s ease",
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: mix(0, 12, u),
                opacity: scaffoldOpacity,
                backgroundImage: gridScaffoldCss,
                pointerEvents: "none",
                transition: "opacity 0.5s ease",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                gap: COLUMN_GAP,
                padding: innerGutter,
                width: "100%",
              }}
            >
            {/* Intro — default document → editorial */}
            <header
              ref={introRef}
              style={{
                position: "relative",
                borderRadius: introRadius,
                padding: "28px 32px 36px",
                marginLeft: 0,
                marginRight: 0,
                backgroundColor: introSheet,
                border: u < 0.18 ? "none" : "none",
                borderBottom: introRule,
                transition:
                  "background-color 0.35s ease, border-color 0.35s ease, border-radius 0.35s ease",
                boxShadow:
                  u > 0.55
                    ? "0 20px 50px rgba(0,0,0,0.2)"
                    : "none",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  top: mix(4, 8, u),
                  right: mix(6, 10, u),
                  fontSize: 9,
                  lineHeight: 1.2,
                  fontFamily: fontMono,
                  color: `rgba(${scaffoldRgb}, 0.85)`,
                  opacity: u > 0.48 ? 0 : devTagOpacity,
                  whiteSpace: "nowrap",
                  pointerEvents: "none",
                  transition: "opacity 0.35s ease",
                }}
              >
                {u < 0.18 ? "<header>" : u < 0.45 ? "header" : ""}
              </span>
              <p
                style={{
                  margin: 0,
                  marginBottom: 10,
                  fontSize: mix(11, 12, u),
                  letterSpacing: `${mix(0, 0.16, u)}em`,
                  textTransform: (u > 0.38 ? "uppercase" : "none") as React.CSSProperties["textTransform"],
                  color: ink.muted,
                  fontFamily: u < 0.38 ? fontMono : fontMag,
                }}
              >
                About
              </p>
              <h1
                style={{
                  margin: 0,
                  fontFamily: titleFont,
                  fontSize: `clamp(${18 + u * 12}px, ${2.4 + u * 2.6}vw, ${28 + u * 10}px)`,
                  lineHeight: mix(1.28, 1.08, u),
                  fontWeight: mix(600, 400, u),
                  letterSpacing: `${mix(0, 0.045, u)}em`,
                  textTransform: (u > 0.5 ? "uppercase" : "none") as React.CSSProperties["textTransform"],
                  color: ink.main,
                  transition: "color 0.35s ease, font-family 0.35s ease",
                }}
              >
                We build graphic, motion-led web experiences that turn attention
                into clarity — and clarity into conversion.
              </h1>
              <p
                style={{
                  margin: 0,
                  marginTop: 16,
                  maxWidth: "52ch",
                  fontSize: mix(14, 16, u),
                  lineHeight: mix(1.55, 1.65, u),
                  fontFamily: bodyFont,
                  color: ink.body,
                }}
              >
                Veloste is a Calgary-based studio working with clients across Canada
                and the US. Every engagement is tailored in-house: custom systems,
                not templates.
              </p>
              <p
                style={{
                  margin: 0,
                  marginTop: 14,
                  fontSize: mix(10, 11, u),
                  letterSpacing: `${mix(0.06, 0.14, u)}em`,
                  textTransform: "uppercase",
                  color: ink.faint,
                  fontFamily: fontMono,
                }}
              >
                Scroll or ↑↓ — one step per section
              </p>
            </header>

            {/* Cards — list-like blocks → tall editorial panels */}
            <section
              aria-label="What we do"
              style={{ marginTop: 4, position: "relative" }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  top: mix(-14, -18, u),
                  fontSize: 9,
                  fontFamily: fontMono,
                  color: `rgba(${scaffoldRgb}, 0.75)`,
                  opacity: u > 0.5 ? 0 : devTagOpacity,
                  pointerEvents: "none",
                  transition: "opacity 0.35s ease",
                }}
              >
                {u < 0.2 ? "<section id=\"focus\">" : ""}
              </span>
              <h2
                style={{
                  margin: 0,
                  marginBottom: 18,
                  fontSize: mix(13, 11, u),
                  letterSpacing: `${mix(0.02, 0.2, u)}em`,
                  textTransform: (u > 0.35 ? "uppercase" : "none") as React.CSSProperties["textTransform"],
                  color: ink.muted,
                  fontFamily: u < 0.38 ? fontMono : fontMag,
                  borderLeft: `${mix(3, 0, u)}px solid rgba(${scaffoldRgb}, ${mix(0.55, 0, u)})`,
                  paddingLeft: mix(8, 0, u),
                }}
              >
                Focus areas
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: CARD_STACK_GAP,
                }}
              >
                {CASES.map((item, idx) => {
                  const num = String(idx + 1).padStart(2, "0");
                  const bracket = mix(10, 0, u);
                  return (
                    <article
                      key={item.id}
                      ref={(el) => {
                        cardRefs.current[idx] = el;
                      }}
                      style={{
                        position: "relative",
                        minHeight: CARD_MIN_HEIGHT,
                        border: panelBorder,
                        borderRadius: panelRadius,
                        background: cardSurface,
                        padding: `${CARD_PAD_Y}px ${CARD_PAD_X}px`,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        transition:
                          "border-color 0.45s ease, background 0.45s ease, border-radius 0.45s ease, border-width 0.45s ease, border-style 0.25s ease, box-shadow 0.45s ease",
                        boxShadow:
                          u > 0.55
                            ? "0 28px 70px rgba(0,0,0,0.45)"
                            : u < 0.25
                              ? "none"
                              : "0 12px 40px rgba(0,0,0,0.2)",
                      }}
                    >
                      {bracket > 0.5 && (
                        <>
                          <span
                            aria-hidden
                            style={{
                              position: "absolute",
                              top: 6,
                              left: 6,
                              width: bracket,
                              height: bracket,
                              borderLeft: `1px solid rgba(${scaffoldRgb},0.5)`,
                              borderTop: `1px solid rgba(${scaffoldRgb},0.5)`,
                              pointerEvents: "none",
                            }}
                          />
                          <span
                            aria-hidden
                            style={{
                              position: "absolute",
                              bottom: 6,
                              right: 6,
                              width: bracket,
                              height: bracket,
                              borderRight: `1px solid rgba(180,0,120,0.35)`,
                              borderBottom: `1px solid rgba(180,0,120,0.35)`,
                              pointerEvents: "none",
                            }}
                          />
                        </>
                      )}
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          top: mix(6, 10, u),
                          right: mix(8, 12, u),
                          fontSize: 8,
                          fontFamily: fontMono,
                          color: `rgba(${scaffoldRgb}, 0.7)`,
                          opacity: u > 0.42 ? 0 : devTagOpacity * 0.9,
                          pointerEvents: "none",
                        }}
                      >
                        {u < 0.25 ? `<article #${item.id}>` : ""}
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: u < 0.3 ? "column" : "row",
                          justifyContent: "space-between",
                          alignItems: u < 0.3 ? "stretch" : "flex-start",
                          gap: CARD_GAP_INTERNAL,
                        }}
                      >
                        <span
                          style={{
                            fontFamily: fontMono,
                            fontSize:
                              u < 0.32
                                ? mix(12, 14, u / 0.32)
                                : mix(38, 52, u),
                            lineHeight: u < 0.32 ? 1.2 : 0.85,
                            color: cardMutedCol,
                            fontWeight: u < 0.32 ? 600 : 300,
                            letterSpacing: u < 0.32 ? "0.02em" : "-0.04em",
                            order: u < 0.3 ? 1 : 0,
                          }}
                          aria-hidden
                        >
                          {u < 0.32 ? `${num}.` : num}
                        </span>
                        <span
                          style={{
                            ...labelStyle,
                            color: cardMutedCol,
                            alignSelf: u < 0.3 ? "flex-start" : "flex-end",
                            textAlign: u < 0.3 ? "left" : "right",
                            order: u < 0.3 ? 0 : 1,
                          }}
                        >
                          {item.label}
                        </span>
                      </div>
                      <div
                        style={{
                          flex: u < 0.35 ? 0 : 1,
                          minHeight: SPACER_MIN_H,
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                        }}
                      >
                        <h3
                          style={{
                            margin: 0,
                            fontFamily: titleFont,
                            fontSize:
                              u < 0.32
                                ? "clamp(17px, 3.8vw, 22px)"
                                : u < 0.42
                                  ? "clamp(20px, 4vw, 28px)"
                                  : "clamp(24px, 4.5vw, 42px)",
                            lineHeight: mix(1.2, 1.05, u),
                            fontWeight: mix(650, 400, u),
                            letterSpacing: titleUppercase ? "0.06em" : `${mix(0.01, 0.02, u)}em`,
                            textTransform: titleUppercase
                              ? "uppercase"
                              : "none",
                            color: cardTitleCol,
                            transition:
                              "color 0.4s ease, font-family 0.35s ease, font-size 0.35s ease",
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            marginTop: 16,
                            fontSize: mix(14, 15, u),
                            lineHeight: mix(1.55, 1.65, u),
                            fontFamily:
                              u < 0.34 ? fontSystem : u < 0.48 ? fontPrint : fontMag,
                            color: cardBodyCol,
                            maxWidth: "50ch",
                          }}
                        >
                          {item.body}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            {/* FAQ */}
            <section
              ref={faqRef}
              style={{
                position: "relative",
                marginTop: 12,
                borderTop: introRule,
                paddingTop: 22,
                transition: "border-color 0.4s ease",
              }}
            >
              <span
                aria-hidden
                style={{
                  position: "absolute",
                  left: 0,
                  top: mix(-12, -16, u),
                  fontSize: 9,
                  fontFamily: fontMono,
                  color: `rgba(${scaffoldRgb}, 0.7)`,
                  opacity: u > 0.55 ? 0 : devTagOpacity * 0.85,
                  pointerEvents: "none",
                }}
              >
                {u < 0.22 ? "<section id=\"faq\">" : ""}
              </span>
              <h2
                style={{
                  margin: 0,
                  marginBottom: 16,
                  fontSize: `clamp(${16 + u * 6}px, ${1.8 + u * 1.4}vw, ${22 + u * 6}px)`,
                  textTransform: u > 0.48 ? "uppercase" : "none",
                  letterSpacing: `${mix(0.02, 0.08, u)}em`,
                  color: faqHeadingCol,
                  fontFamily: u < 0.4 ? fontMono : fontMag,
                }}
              >
                Frequently asked questions
              </h2>
              <div style={{ display: "grid", gap: 12 }}>
                {FAQS.map((item, idx) => (
                  <article
                    key={item.q}
                    style={{
                      border: faqBorder,
                      borderRadius: panelRadius,
                      padding: "6px 12px",
                      background: faqBg,
                      transition:
                        "border-color 0.4s ease, border-radius 0.4s ease, background 0.4s ease",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq((prev) => (prev === idx ? null : idx))
                      }
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 14,
                        padding: "10px 4px",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        color: faqBtnCol,
                        fontFamily: u < 0.4 ? fontSystem : u > 0.48 ? fontMag : fontMono,
                      }}
                    >
                      <span
                        style={{
                          margin: 0,
                          fontSize: mix(14, 15, u),
                          lineHeight: 1.45,
                          color: faqBtnCol,
                          fontWeight: u > 0.42 ? 700 : 600,
                        }}
                      >
                        {item.q}
                      </span>
                      <span
                        style={{
                          fontSize: 20,
                          lineHeight: 1,
                          color: faqChevronCol,
                          transform:
                            openFaq === idx ? "rotate(45deg)" : "rotate(0deg)",
                          transition: "transform 180ms ease",
                        }}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>

                    {openFaq === idx && (
                      <p
                        style={{
                          margin: 0,
                          marginTop: 2,
                          marginBottom: 8,
                          padding: "0 4px 4px",
                          fontSize: mix(13, 14, u),
                          lineHeight: 1.6,
                          color: faqAnswerCol,
                          fontFamily:
                            u < 0.36 ? fontSystem : u > 0.48 ? fontMag : fontMono,
                        }}
                      >
                        {item.a}
                      </p>
                    )}
                  </article>
                ))}
                <div>
                  <article
                    style={{
                      marginTop: 8,
                      display: "grid",
                      justifyItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        justifyItems: "center",
                        gap: 10,
                        textAlign: "center",
                      }}
                    >
                      <img
                        src="/vstar.svg"
                        alt="Veloste logo"
                        style={{
                          width: 28,
                          height: 28,
                          opacity: mix(0.72, 0.92, u),
                          filter:
                            tTheme < 0.42
                              ? "brightness(0) opacity(0.78)"
                              : "none",
                          transition: "filter 0.4s ease, opacity 0.4s ease",
                        }}
                      />
                      <p
                        style={{
                          margin: 0,
                          color: ink.faint,
                          fontSize: 12,
                          letterSpacing: `${mix(0.06, 0.08, u)}em`,
                          textTransform: "uppercase",
                          fontFamily: u > 0.5 ? fontMag : fontMono,
                        }}
                      >
                        © {new Date().getFullYear()} Veloste. All rights
                        reserved.
                      </p>
                      <button
                        type="button"
                        onClick={goToContact}
                        style={{
                          border: faqBorder,
                          background: "transparent",
                          color: faqBtnCol,
                          borderRadius: mix(0, 8, u),
                          padding: "9px 16px",
                          marginBottom: 100,
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          cursor: "pointer",
                          fontFamily: u > 0.5 ? fontMag : fontMono,
                          transition:
                            "border-radius 0.4s ease, border-color 0.4s ease, color 0.4s ease",
                        }}
                      >
                        Contact
                      </button>
                    </div>
                  </article>
                </div>
              </div>
            </section>
            </div>
          </div>
        </div>

        {isScrollable && (
          <div
            ref={trackRef}
            style={{
              position: "absolute",
              top: "10vh",
              bottom: "8vh",
              right: 6,
              width: 2,
              background: "rgba(255,255,255,0.15)",
              borderRadius: 2,
              pointerEvents: "none",
              opacity: active ? 1 : 0,
              transition: "opacity 160ms ease",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: Math.round(progress * Math.max(0, trackHeight - KNOB)),
                left: -5,
                width: KNOB,
                height: KNOB,
                borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
