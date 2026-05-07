import React, { useLayoutEffect } from "react";
import ProjectsSection from "./ProjectsSection";

/** Neutral dark glass — no chromatic accent */
const BRAND = {
  ink: {
    main: "rgba(252, 252, 255, 0.96)",
    body: "rgba(220, 222, 232, 0.88)",
    muted: "rgba(160, 164, 178, 0.9)",
    faint: "rgba(120, 124, 138, 0.75)",
  },
  columnBg: "rgba(255, 255, 255, 0.04)",
  radius: 12,
  shadow: "0 20px 56px rgba(0, 0, 0, 0.42)",
} as const;

/* Safe-area aware: avoids content under notch / home indicator */
const SCROLL_PAD =
  "max(10vh, calc(env(safe-area-inset-top, 0px) + 20px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(12vh, calc(env(safe-area-inset-bottom, 0px) + 20px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))";
const COLUMN_MAX = 900;
const COLUMN_GAP = 20;
const INNER_GUTTER = "0px";
const CARD_PAD_Y = 22;
const CARD_PAD_X = 28;
const SECTION_SCROLL_MS = 480;

/** Match ScrollProgress1D: allow exit to scene when this close to an edge (px) */
const SCROLL_EDGE_TOL = 8;

const SECTION_VIEWPORT_ALIGN_FROM_TOP = 0.43;

function getScrollTopToCenterSectionInViewport(
  scrollEl: HTMLDivElement,
  sectionEl: HTMLElement,
): number {
  const s = scrollEl.getBoundingClientRect();
  const r = sectionEl.getBoundingClientRect();
  const viewportHoldY = s.top + s.height * SECTION_VIEWPORT_ALIGN_FROM_TOP;
  const sectionMidY = r.top + r.height / 2;
  const raw = Math.round(scrollEl.scrollTop + (sectionMidY - viewportHoldY));
  const maxTop = Math.max(0, scrollEl.scrollHeight - scrollEl.clientHeight);
  return Math.max(0, Math.min(maxTop, raw));
}

function nearestSectionIndex(
  scrollTop: number,
  offsets: readonly number[],
): number {
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

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

/** Smooth scroll for section snaps; returns cancel function */
function animateScrollElementTo(
  el: HTMLElement,
  targetTop: number,
  durationMs: number,
  onDone?: () => void,
): () => void {
  const start = el.scrollTop;
  const delta = targetTop - start;
  if (Math.abs(delta) < 0.5) {
    onDone?.();
    return () => {};
  }
  const t0 = performance.now();
  let rafId = 0;
  let cancelled = false;
  const tick = (now: number) => {
    if (cancelled) return;
    const t = Math.min(1, (now - t0) / durationMs);
    el.scrollTop = start + delta * easeOutCubic(t);
    if (t < 1) {
      rafId = requestAnimationFrame(tick);
    } else {
      el.scrollTop = targetTop;
      onDone?.();
    }
  };
  rafId = requestAnimationFrame(tick);
  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
  };
}

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
    version: 3,
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
      SECTION_SCROLL_MS,
      SECTION_VIEWPORT_ALIGN_FROM_TOP,
      SECTION_COUNT,
    }),
  };
}

installAboutDebugApi();

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

const SECTION_COUNT = 1 + CASES.length + 1 + 1;

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
    a: "Yes. We support clients across Canada and the United States, with priority areas in Calgary, Airdrie, Cochrane, Okotoks, and Chestermere.",
  },
  {
    q: "Do you offer web design in Calgary?",
    a: "Yes. Veloste is Calgary-based and provides web design and development for local businesses, with in-person collaboration when helpful. The same custom process applies for Airdrie, Cochrane, Okotoks, Chestermere, and remote clients across Canada and the US.",
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

const fontDisplay = `'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif`;
const fontBody = `system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;
const fontMono = `ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace`;

export default function AboutPane({
  opacity,
  active,
}: {
  opacity: number;
  active: boolean;
}) {
  const scrollBoxRef = React.useRef<HTMLDivElement>(null);
  const introRef = React.useRef<HTMLElement | null>(null);
  const projectsRef = React.useRef<HTMLElement | null>(null);
  const faqRef = React.useRef<HTMLElement | null>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const sectionOffsetsRef = React.useRef<number[]>([]);
  const scrollAnimCancelRef = React.useRef<(() => void) | null>(null);
  const lastOffsetsSigRef = React.useRef("");
  const lastScrollSampleRef = React.useRef({ t: 0, idx: -1, scrollTop: -1 });
  const prevInteractiveRef = React.useRef(false);
  const lastTouchYRef = React.useRef<number | null>(null);

  const [isScrollable, setIsScrollable] = React.useState(false);
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [coarsePointer, setCoarsePointer] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    setCoarsePointer(mq.matches);
    const onChange = () => setCoarsePointer(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  React.useEffect(() => {
    aboutDebugEnabled = readAboutDebugEnabled();
    installAboutDebugApi();
    aboutDebug("about_pane_mount", { aboutDebugEnabled });
  }, []);

  React.useEffect(() => {
    return () => {
      scrollAnimCancelRef.current?.();
      scrollAnimCancelRef.current = null;
    };
  }, []);

  /** Cancel in-flight keyboard scroll tween when leaving About */
  React.useEffect(() => {
    scrollAnimCancelRef.current?.();
    scrollAnimCancelRef.current = null;
  }, [active]);

  const refreshSectionOffsets = React.useCallback(() => {
    const scroll = scrollBoxRef.current;
    if (!scroll || !introRef.current) return;
    const offs: number[] = [];
    offs.push(getScrollTopToCenterSectionInViewport(scroll, introRef.current));
    for (let i = 0; i < CASES.length; i++) {
      const c = cardRefs.current[i];
      if (c) offs.push(getScrollTopToCenterSectionInViewport(scroll, c));
    }
    if (projectsRef.current) {
      offs.push(
        getScrollTopToCenterSectionInViewport(scroll, projectsRef.current),
      );
    }
    if (faqRef.current) {
      offs.push(getScrollTopToCenterSectionInViewport(scroll, faqRef.current));
    }
    if (offs.length === SECTION_COUNT) {
      sectionOffsetsRef.current = offs;
    }
  }, []);

  const measure = React.useCallback(() => {
    const el = scrollBoxRef.current;
    if (!el) return;
    setIsScrollable(el.scrollHeight - el.clientHeight > 2);
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
  }, [refreshSectionOffsets]);

  useLayoutEffect(() => {
    if (!active) return;
    measure();
  }, [active, measure]);

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
      scrollAnimCancelRef.current = null;
      const target = offs[next];
      aboutDebug("go_section", {
        fromIdx: idx,
        toIdx: next,
        targetScrollTop: target,
      });

      const finish = () => {
        scrollAnimCancelRef.current = null;
        measure();
      };

      if (reducedMotion) {
        el.scrollTop = target;
        finish();
        return;
      }

      scrollAnimCancelRef.current = animateScrollElementTo(
        el,
        target,
        SECTION_SCROLL_MS,
        finish,
      );
    },
    [measure, reducedMotion],
  );

  React.useEffect(() => {
    measure();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      if (scrollBoxRef.current) ro.observe(scrollBoxRef.current);
    }
    window.addEventListener("resize", measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  React.useEffect(() => {
    if (active && !prevInteractiveRef.current && scrollBoxRef.current) {
      scrollAnimCancelRef.current?.();
      scrollBoxRef.current.scrollTo({ top: 0, behavior: "auto" });
      measure();
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
        goToAdjacentSection(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goToAdjacentSection(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goToAdjacentSection]);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const denom = Math.max(1, el.scrollHeight - el.clientHeight);
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
          progress: Math.round((el.scrollTop / denom) * 1000) / 1000,
        });
      }
    }
  };

  const goToContact = () => {
    window.dispatchEvent(
      new CustomEvent("veloste:setProgress", { detail: { p: 1 } }),
    );
  };

  const ink = BRAND.ink;

  const sectionLabel: React.CSSProperties = {
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: ink.muted,
    fontFamily: fontMono,
  };

  return (
    <>
      <style>{`
        .about-scroll {
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.22) transparent;
        }
        @media (prefers-reduced-motion: reduce) {
          .about-scroll { scroll-behavior: auto; }
        }
        .about-scroll::-webkit-scrollbar { width: 5px; }
        .about-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.18);
          border-radius: 3px;
        }
        .about-column {
          background: ${BRAND.columnBg};
          backdrop-filter: saturate(140%) blur(12px);
          -webkit-backdrop-filter: saturate(140%) blur(12px);
        }
        .about-card-top {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 8px;
          width: 100%;
        }
        @media (min-width: 520px) {
          .about-card-top {
            flex-direction: row;
            justify-content: space-between;
            align-items: baseline;
          }
        }
        .about-contact-cta {
          border: none;
          background: rgba(255, 255, 255, 0.06);
          transition: background 160ms ease;
        }
        .about-contact-cta:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .about-contact-cta:focus-visible {
          background: rgba(255, 255, 255, 0.12);
          outline: none;
          box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.9);
        }
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
            overscrollBehavior: active ? "contain" : "auto",
            padding: SCROLL_PAD,
            touchAction: active ? "auto" : "none",
            background: "#000",
          }}
          onScroll={active ? onScroll : undefined}
          onWheel={(e) => {
            if (!active) return;
            const el = scrollBoxRef.current;
            if (!el) return;
            const { scrollTop, scrollHeight, clientHeight } = el;
            const atTop = scrollTop <= SCROLL_EDGE_TOL;
            const atBottom =
              scrollTop + clientHeight >= scrollHeight - SCROLL_EDGE_TOL;
            const dy = e.deltaY;
            /* At top + wheel up (negative deltaY): let bubble so scene can return to center */
            if (atTop && dy < 0) return;
            /* At bottom + wheel down: let bubble (e.g. toward contact on the right) */
            if (atBottom && dy > 0) return;
            e.stopPropagation();
          }}
          onTouchStart={(e) => {
            if (!active || e.touches.length !== 1) return;
            lastTouchYRef.current = e.touches[0].clientY;
          }}
          onTouchEnd={() => {
            lastTouchYRef.current = null;
          }}
          onTouchMoveCapture={(e) => {
            if (!active || !isScrollable || e.touches.length !== 1) return;
            const y = e.touches[0].clientY;
            const lastY = lastTouchYRef.current;
            if (lastY === null) return;
            const dy = lastY - y;
            lastTouchYRef.current = y;

            const el = scrollBoxRef.current;
            if (!el) return;
            const { scrollTop, scrollHeight, clientHeight } = el;
            const atTop = scrollTop <= SCROLL_EDGE_TOL;
            const atBottom =
              scrollTop + clientHeight >= scrollHeight - SCROLL_EDGE_TOL;
            /* Match wheel + ScrollProgress1D: at top, finger down (dy < 0) bubbles to scene */
            if (atTop && dy < 0) return;
            if (atBottom && dy < 0) return;
            e.stopPropagation();
          }}
          onPointerDownCapture={(e) => {
            if (active) e.stopPropagation();
          }}
        >
          <div
            className="about-column"
            style={{
              position: "relative",
              maxWidth: COLUMN_MAX,
              margin: "0 auto",
              width: "100%",
              borderRadius: BRAND.radius,
              boxShadow: BRAND.shadow,
            }}
          >
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                gap: COLUMN_GAP,
                padding: INNER_GUTTER,
                width: "100%",
              }}
            >
              <header
                ref={introRef}
                style={{
                  padding: "24px 28px 28px",
                }}
              >
                <p style={{ margin: 0, marginBottom: 8, ...sectionLabel }}>
                  About
                </p>
                <h1
                  style={{
                    margin: 0,
                    fontFamily: fontDisplay,
                    fontSize: "clamp(22px, 4vw, 34px)",
                    lineHeight: 1.14,
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    color: ink.main,
                  }}
                >
                  Calgary web design &amp; custom websites — graphic, motion-led
                  experiences that turn attention into clarity — and clarity
                  into conversion.
                </h1>
                <p
                  style={{
                    margin: 0,
                    marginTop: 16,
                    maxWidth: "52ch",
                    fontSize: 15,
                    lineHeight: 1.65,
                    fontFamily: fontBody,
                    color: ink.body,
                  }}
                >
                  Veloste is a Calgary web design studio working with clients
                  across Canada and the US: website design, interaction systems,
                  and implementation tailored in-house — custom systems, not
                  templates.
                </p>
                <p
                  style={{
                    margin: 0,
                    marginTop: 12,
                    fontSize: 13,
                    lineHeight: 1.65,
                    fontFamily: fontBody,
                    color: ink.muted,
                    maxWidth: "56ch",
                  }}
                >
                  Looking for local details?{" "}
                  <a href="/web-developer-calgary/">
                    Calgary web developer page
                  </a>{" "}
                  ·{" "}
                  <a href="/service-areas/calgary-region/">
                    Calgary region service areas
                  </a>
                </p>
                <p
                  style={{
                    margin: 0,
                    marginTop: 14,
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: ink.faint,
                    fontFamily: fontMono,
                  }}
                >
                  {coarsePointer
                    ? "Swipe on the scene to open About or Contact, then scroll to read"
                    : "Scroll to read · Arrow keys jump between sections"}
                </p>
              </header>

              <section aria-label="What we do" style={{ padding: "0 4px" }}>
                <h2
                  style={{
                    margin: "4px 0 16px",
                    padding: "0 24px",
                    ...sectionLabel,
                  }}
                >
                  Focus areas
                </h2>
                <div>
                  {CASES.map((item, idx) => {
                    const num = String(idx + 1).padStart(2, "0");
                    return (
                      <article
                        key={item.id}
                        ref={(el) => {
                          cardRefs.current[idx] = el;
                        }}
                        style={{
                          padding: `${idx === 0 ? CARD_PAD_Y : CARD_PAD_Y + 16}px ${CARD_PAD_X}px ${CARD_PAD_Y}px`,
                        }}
                      >
                        <div
                          className="about-card-top"
                          style={{ marginBottom: 12 }}
                        >
                          <span
                            style={{
                              fontFamily: fontMono,
                              fontSize: 11,
                              letterSpacing: "0.12em",
                              color: ink.faint,
                            }}
                            aria-hidden
                          >
                            {num}
                          </span>
                          <span
                            style={{
                              ...sectionLabel,
                              marginBottom: 0,
                              textAlign: "right",
                            }}
                          >
                            {item.label}
                          </span>
                        </div>
                        <h3
                          style={{
                            margin: 0,
                            fontFamily: fontDisplay,
                            fontSize: "clamp(17px, 2.8vw, 24px)",
                            lineHeight: 1.2,
                            fontWeight: 500,
                            letterSpacing: "0.02em",
                            color: ink.main,
                          }}
                        >
                          {item.title}
                        </h3>
                        <p
                          style={{
                            margin: 0,
                            marginTop: 12,
                            fontSize: 15,
                            lineHeight: 1.65,
                            fontFamily: fontBody,
                            color: ink.body,
                            maxWidth: "50ch",
                          }}
                        >
                          {item.body}
                        </p>
                      </article>
                    );
                  })}
                </div>
              </section>

              <ProjectsSection
                ref={projectsRef}
                fontDisplay={fontDisplay}
                fontBody={fontBody}
                fontMono={fontMono}
                sectionLabel={sectionLabel}
                ink={ink}
                reducedMotion={reducedMotion}
                active={active}
              />

              <section
                ref={faqRef}
                style={{
                  padding: "28px 0 8px",
                }}
              >
                <h2
                  style={{
                    margin: "0 0 14px",
                    padding: "0 28px",
                    ...sectionLabel,
                  }}
                >
                  Frequently asked questions
                </h2>
                <div>
                  {FAQS.map((item, idx) => (
                    <article
                      key={item.q}
                      style={{
                        marginBottom: idx === FAQS.length - 1 ? 0 : 14,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setOpenFaq((prev) => (prev === idx ? null : idx))
                        }
                        style={{
                          width: "100%",
                          minHeight: 48,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 14,
                          padding: "14px 28px",
                          background: "transparent",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          color: ink.main,
                          fontFamily: fontBody,
                          WebkitTapHighlightColor: "transparent",
                        }}
                      >
                        <span
                          style={{
                            margin: 0,
                            fontSize: 15,
                            lineHeight: 1.45,
                            fontWeight: 600,
                          }}
                        >
                          {item.q}
                        </span>
                        <span
                          style={{
                            fontSize: 17,
                            lineHeight: 1,
                            color: ink.muted,
                            fontFamily: fontMono,
                          }}
                          aria-hidden
                        >
                          {openFaq === idx ? "−" : "+"}
                        </span>
                      </button>

                      {openFaq === idx && (
                        <p
                          style={{
                            margin: 0,
                            marginTop: -4,
                            marginBottom: 0,
                            padding: "0 28px 16px",
                            fontSize: 14,
                            lineHeight: 1.6,
                            color: ink.body,
                            fontFamily: fontBody,
                          }}
                        >
                          {item.a}
                        </p>
                      )}
                    </article>
                  ))}
                  <div
                    style={{
                      marginTop: 20,
                      display: "grid",
                      justifyItems: "center",
                      paddingBottom: 100,
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
                        loading="lazy"
                        decoding="async"
                        style={{
                          width: 28,
                          height: 28,
                          opacity: 0.88,
                        }}
                      />
                      <p
                        style={{
                          margin: 0,
                          color: ink.faint,
                          fontSize: 11,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          fontFamily: fontMono,
                        }}
                      >
                        © {new Date().getFullYear()} Veloste. All rights
                        reserved.
                      </p>
                      <button
                        type="button"
                        className="about-contact-cta"
                        onClick={goToContact}
                        style={{
                          color: ink.main,
                          borderRadius: 8,
                          padding: "10px 20px",
                          marginBottom: 80,
                          marginTop: 4,
                          fontSize: 11,
                          textTransform: "uppercase",
                          letterSpacing: "0.12em",
                          cursor: "pointer",
                          fontFamily: fontDisplay,
                        }}
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
