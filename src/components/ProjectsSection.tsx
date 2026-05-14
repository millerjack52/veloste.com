import React from "react";

/** Deterministic 0..1 from string + salt — stable across re-renders, looks random */
function seededUnit(key: string, salt: number): number {
  let h = 2166136261;
  const s = `${key}:${salt}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0) / 0xffff_ffff;
}

const BOB_EASING = [
  "ease-in-out",
  "cubic-bezier(0.45, 0.05, 0.55, 0.95)",
  "cubic-bezier(0.33, 1, 0.68, 1)",
  "cubic-bezier(0.65, 0, 0.35, 1)",
  "cubic-bezier(0.37, 0, 0.63, 1)",
] as const;

export type PortfolioProject = {
  id: string;
  name: string;
  /** Shown inside the circle when no logo image is provided */
  initials: string;
  logoSrc?: string;
  tagline: string;
  approach: string;
  /** Distinctive aspects of the engagement */
  highlights: readonly string[];
  /** Optional visuals — drop assets into `public/work/` and reference paths here */
  gallery?: readonly { src: string; alt: string }[];
};

const LIGHT = {
  bg: "#f4f2ee",
  bgAlt: "#ebe8e3",
  ink: "#121218",
  body: "#3a3d4a",
  muted: "#6a6e7a",
  accent: "#646cff",
} as const;

/** Replace or extend with real client logos under `public/work/` */
export const PORTFOLIO_PROJECTS: readonly PortfolioProject[] = [
  {
    id: "atlas",
    name: "Atlas North",
    initials: "AN",
    tagline: "Product storytelling for a B2B platform launch.",
    approach:
      "We started from narrative: what decision-makers needed to understand in the first ten seconds. Wireframes stayed intentionally sparse until the visual system could carry hierarchy on its own — then motion was added to reinforce sequence, not decoration.",
    highlights: [
      "Editorial typography paired with a restrained UI grid so dense product data stayed legible.",
      "Scroll-linked diagrams that track with narrative beats instead of generic fade-ins.",
      "Performance-first asset pipeline: SVG systems, lazy media, and GPU-friendly transforms.",
    ],
    gallery: [
      {
        src: "/work/placeholder-atlas.svg",
        alt: "Abstract layout study for Atlas North",
      },
    ],
  },
  {
    id: "signal",
    name: "Signal Yard",
    initials: "SY",
    tagline: "A campaign microsite with spatial depth as a wayfinding cue.",
    approach:
      "The brief called for a memorable first impression without heavy 3D downloads. We built a layered parallax field using lightweight meshes and shader-adjacent CSS, then tuned motion so it degrades cleanly when reduced motion is requested.",
    highlights: [
      "Custom cursor and hover vocabulary that mirrors the brand’s broadcast heritage.",
      "Scene composition that shifts by breakpoint — same story, different crop.",
      "Analytics-friendly section IDs and stable URLs for paid traffic.",
    ],
  },
  {
    id: "ledger",
    name: "Ledgerline",
    initials: "LL",
    tagline: "Documentation-heavy site with the warmth of a consumer brand.",
    approach:
      "Trust-forward categories (security, compliance) were rewritten as short, scannable modules. We designed a card system that could nest FAQs, specs, and CTAs without turning into a wall of links.",
    highlights: [
      "Accordion + deep-link patterns for support and SEO snippets.",
      "Print-minded rhythm: side-notes, pull quotes, and monospace for technical callouts.",
      "Design tokens carried into the codebase for consistent iteration after handoff.",
    ],
    gallery: [
      {
        src: "/work/placeholder-ledger.svg",
        alt: "Typography rhythm study for Ledgerline",
      },
    ],
  },
];

type Props = {
  fontDisplay: string;
  fontBody: string;
  fontMono: string;
  sectionLabel: React.CSSProperties;
  ink: {
    readonly main: string;
    readonly body: string;
    readonly muted: string;
    readonly faint: string;
  };
  reducedMotion: boolean;
  active: boolean;
  projects?: readonly PortfolioProject[];
};

const ProjectsSection = React.forwardRef<HTMLElement, Props>(
  function ProjectsSection(
    {
      fontDisplay,
      fontBody,
      fontMono,
      sectionLabel,
      ink,
      reducedMotion,
      active,
      projects = PORTFOLIO_PROJECTS,
    },
    ref,
  ) {
    const [expandedId, setExpandedId] = React.useState<string | null>(null);
    const closeRef = React.useRef<HTMLButtonElement>(null);
    const stripWrapRef = React.useRef<HTMLDivElement>(null);

    const expanded = projects.find((p) => p.id === expandedId) ?? null;

    React.useEffect(() => {
      if (!expandedId) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setExpandedId(null);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [expandedId]);

    React.useEffect(() => {
      if (!expandedId || !closeRef.current) return;
      const t = window.setTimeout(() => closeRef.current?.focus(), 80);
      return () => window.clearTimeout(t);
    }, [expandedId]);

    const pauseMarquee = !active || !!expandedId || reducedMotion;

    const marqueeDurationSec = React.useMemo(() => {
      const base = Math.max(26, projects.length * 10);
      const jitter = seededUnit(projects.map((p) => p.id).join("|"), 90411);
      return Math.round((base + jitter * 22) * 10) / 10;
    }, [projects]);

    const bobClassFor = (projectId: string, seg: number): string => {
      const k = `${projectId}|${seg}`;
      const v = Math.floor(seededUnit(k, 701) * 3);
      return v === 0 ? "projects-bob-shape-a" : v === 1 ? "projects-bob-shape-b" : "projects-bob-shape-c";
    };

    const bobStyle = (projectId: string, seg: number): React.CSSProperties => {
      const k = `${projectId}|${seg}`;
      const u1 = seededUnit(k, 1);
      const u2 = seededUnit(k, 2);
      const u3 = seededUnit(k, 3);
      const u4 = seededUnit(k, 4);
      const amp = 7 + u1 * 16;
      const dur = 2.2 + u2 * 2.6;
      const delayNeg = u3 * 6.5 + u4 * 2.2 + seg * 1.7;
      const easeIdx = Math.floor(seededUnit(k, 5) * BOB_EASING.length);
      return {
        ["--bob-amp" as string]: `${amp.toFixed(2)}px`,
        ["--bob-dur" as string]: `${dur.toFixed(2)}s`,
        ["--bob-delay" as string]: `${-delayNeg.toFixed(2)}s`,
        animationTimingFunction: BOB_EASING[easeIdx],
      };
    };

    return (
      <>
        <style>{`
          .projects-case-light h3 {
            text-transform: none;
          }
          .projects-visually-hidden {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
          }
          @keyframes projects-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
          @keyframes projects-bob-y-a {
            0%, 100% { transform: translateY(0); }
            42% { transform: translateY(calc(-1 * var(--bob-amp, 12px))); }
          }
          @keyframes projects-bob-y-b {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(calc(-1 * var(--bob-amp, 12px))); }
          }
          @keyframes projects-bob-y-c {
            0%, 100% { transform: translateY(0); }
            58% { transform: translateY(calc(-1 * var(--bob-amp, 12px))); }
          }
          .projects-bob-shape-a { animation-name: projects-bob-y-a; }
          .projects-bob-shape-b { animation-name: projects-bob-y-b; }
          .projects-bob-shape-c { animation-name: projects-bob-y-c; }
          .projects-marquee-track {
            display: flex;
            flex-direction: row;
            width: 200%;
            align-items: center;
            animation: projects-marquee ${marqueeDurationSec}s linear infinite;
            animation-play-state: ${pauseMarquee ? "paused" : "running"};
          }
          .projects-marquee-segment {
            flex: 0 0 50%;
            width: 50%;
            min-width: 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 0 clamp(20px, 5vw, 72px);
            box-sizing: border-box;
          }
          .projects-logo-float {
            display: flex;
            align-items: center;
            justify-content: center;
            animation: projects-bob-y-b var(--bob-dur, 3.2s) ease-in-out infinite;
            animation-delay: var(--bob-delay, 0s);
            will-change: transform;
          }
          .projects-marquee-paused .projects-marquee-track,
          .projects-marquee-paused .projects-logo-float {
            animation-play-state: paused !important;
          }
          @media (prefers-reduced-motion: reduce) {
            .projects-marquee-track {
              animation: none;
              width: 100%;
              flex-wrap: wrap;
              justify-content: space-evenly;
              gap: 20px;
            }
            .projects-marquee-segment {
              flex: 1 1 100%;
              width: 100%;
              justify-content: space-evenly;
              flex-wrap: wrap;
              gap: 20px;
              padding: 0 12px;
            }
            .projects-marquee-segment:nth-child(2) {
              display: none;
            }
            .projects-logo-float {
              animation: none;
            }
          }
          .projects-logo-btn {
            flex-shrink: 0;
            width: clamp(72px, 14vw, 96px);
            height: clamp(72px, 14vw, 96px);
            border-radius: 50%;
            border: none;
            background: rgba(255, 255, 255, 0.05);
            cursor: pointer;
            display: grid;
            place-items: center;
            padding: 0;
            transition: transform 180ms ease, background 180ms ease, box-shadow 180ms ease;
          }
          .projects-logo-btn:hover {
            transform: scale(1.06);
            background: rgba(255, 255, 255, 0.09);
          }
          .projects-logo-btn:focus-visible {
            outline: none;
            box-shadow: 0 0 0 2px ${LIGHT.accent};
          }
          .projects-case-enter {
            animation: projects-case-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both;
          }
          @keyframes projects-case-in {
            from {
              opacity: 0;
              transform: scale(0.96);
              border-radius: 999px;
            }
            to {
              opacity: 1;
              transform: scale(1);
              border-radius: 12px;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            .projects-case-enter { animation: none; }
          }
        `}</style>

        <section
          ref={ref}
          aria-label="Selected work"
          style={{
            position: "relative",
            padding: "36px 0 28px",
            scrollMarginTop: "8vh",
          }}
        >
          <header style={{ padding: "0 28px 20px" }}>
            <p style={{ margin: 0, marginBottom: 8, ...sectionLabel }}>
              Selected work
            </p>
            <h2
              style={{
                margin: 0,
                fontFamily: fontDisplay,
                fontSize: "clamp(20px, 3.2vw, 28px)",
                lineHeight: 1.15,
                fontWeight: 500,
                letterSpacing: "0.02em",
                color: ink.main,
              }}
            >
              Past projects, unpacked.
            </h2>
            <p
              style={{
                margin: 0,
                marginTop: 14,
                maxWidth: "54ch",
                fontSize: 15,
                lineHeight: 1.65,
                fontFamily: fontBody,
                color: ink.body,
              }}
            >
              Each engagement gets its own interaction model. Tap a partner mark
              to open a case snapshot — approach, craft decisions, and what
              made the build distinctive. Room is reserved for visuals from the
              shipped work.
            </p>
          </header>

          <div
            ref={stripWrapRef}
            style={{
              position: "relative",
              minHeight: expandedId ? "min(92vh, 920px)" : 200,
              transition: "min-height 360ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {/* Floating horizontal strip */}
            <div
              className={pauseMarquee ? "projects-marquee-paused" : undefined}
              style={{
                overflow: "hidden",
                padding: "28px 0 32px",
                opacity: expandedId ? 0 : 1,
                maxHeight: expandedId ? 0 : 280,
                pointerEvents: expandedId ? "none" : "auto",
                transition: "opacity 280ms ease, max-height 360ms ease",
                maskImage:
                  "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
              }}
              aria-hidden={!!expandedId}
            >
              <div className="projects-marquee-track">
                {[0, 1].map((seg) => (
                  <div
                    key={seg}
                    className="projects-marquee-segment"
                    aria-hidden={seg === 1}
                  >
                    {projects.map((p) => (
                      <span
                        key={`${seg}-${p.id}`}
                        className={`projects-logo-float ${bobClassFor(p.id, seg)}`}
                        style={bobStyle(p.id, seg)}
                      >
                        <button
                          type="button"
                          className="projects-logo-btn"
                          aria-expanded={expandedId === p.id}
                          aria-controls={`case-study-${p.id}`}
                          id={
                            seg === 0
                              ? `project-trigger-${p.id}`
                              : `project-trigger-${p.id}-dup`
                          }
                          tabIndex={seg === 0 ? undefined : -1}
                          onClick={() => setExpandedId(p.id)}
                        >
                          {p.logoSrc ? (
                            <img
                              src={p.logoSrc}
                              alt=""
                              width={44}
                              height={44}
                              style={{
                                width: "52%",
                                height: "52%",
                                objectFit: "contain",
                                filter: "brightness(0) invert(1)",
                                opacity: 0.92,
                              }}
                            />
                          ) : (
                            <span
                              style={{
                                fontFamily: fontDisplay,
                                fontSize: "clamp(17px, 3vw, 22px)",
                                letterSpacing: "0.04em",
                                color: ink.main,
                              }}
                            >
                              {p.initials}
                            </span>
                          )}
                          <span className="projects-visually-hidden">
                            {p.name} case study
                          </span>
                        </button>
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {expanded && (
              <div
                className={`projects-case-light${reducedMotion ? "" : " projects-case-enter"}`}
                id={`case-study-${expanded.id}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`case-title-${expanded.id}`}
                style={{
                  position: "absolute",
                  left: 12,
                  right: 12,
                  top: expandedId ? 8 : 0,
                  bottom: 12,
                  zIndex: 4,
                  display: "flex",
                  flexDirection: "column",
                  background: LIGHT.bg,
                  color: LIGHT.ink,
                  borderRadius: 12,
                  boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
                  border: "none",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "18px 20px 16px",
                    background: `linear-gradient(180deg, ${LIGHT.bg} 0%, ${LIGHT.bgAlt} 100%)`,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: LIGHT.muted,
                        fontFamily: fontMono,
                      }}
                    >
                      Case study
                    </p>
                    <h3
                      id={`case-title-${expanded.id}`}
                      style={{
                        margin: "6px 0 0",
                        fontFamily: fontDisplay,
                        fontSize: "clamp(22px, 4vw, 30px)",
                        fontWeight: 500,
                        letterSpacing: "0.02em",
                        lineHeight: 1.15,
                        color: LIGHT.ink,
                      }}
                    >
                      {expanded.name}
                    </h3>
                    <p
                      style={{
                        margin: "8px 0 0",
                        fontSize: 15,
                        lineHeight: 1.5,
                        color: LIGHT.body,
                        fontFamily: fontBody,
                        maxWidth: "48ch",
                      }}
                    >
                      {expanded.tagline}
                    </p>
                  </div>
                  <button
                    ref={closeRef}
                    type="button"
                    onClick={() => setExpandedId(null)}
                    style={{
                      flexShrink: 0,
                      border: "none",
                      background: LIGHT.bgAlt,
                      borderRadius: 8,
                      minHeight: 44,
                      minWidth: 44,
                      padding: "10px 16px",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      fontFamily: fontMono,
                      color: LIGHT.ink,
                      cursor: "pointer",
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    Close
                  </button>
                </div>

                <div
                  style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: "20px 20px 28px",
                    WebkitOverflowScrolling: "touch",
                  }}
                >
                  <section style={{ marginBottom: 28 }}>
                    <h4
                      style={{
                        margin: "0 0 10px",
                        fontFamily: fontMono,
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: LIGHT.muted,
                        fontWeight: 600,
                      }}
                    >
                      Approach
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: LIGHT.body,
                        fontFamily: fontBody,
                        maxWidth: "62ch",
                      }}
                    >
                      {expanded.approach}
                    </p>
                  </section>

                  <section style={{ marginBottom: 28 }}>
                    <h4
                      style={{
                        margin: "0 0 12px",
                        fontFamily: fontMono,
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: LIGHT.muted,
                        fontWeight: 600,
                      }}
                    >
                      What made it distinct
                    </h4>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: 18,
                        fontSize: 15,
                        lineHeight: 1.65,
                        color: LIGHT.body,
                        fontFamily: fontBody,
                        maxWidth: "62ch",
                      }}
                    >
                      {expanded.highlights.map((h) => (
                        <li key={h} style={{ marginBottom: 8 }}>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <h4
                      style={{
                        margin: "0 0 14px",
                        fontFamily: fontMono,
                        fontSize: 11,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: LIGHT.muted,
                        fontWeight: 600,
                      }}
                    >
                      From the work
                    </h4>
                    <div
                      style={{
                        display: "grid",
                        gap: 16,
                        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      }}
                    >
                      {expanded.gallery && expanded.gallery.length > 0 ? (
                        expanded.gallery.map((g) => (
                          <figure
                            key={g.src}
                            style={{
                              margin: 0,
                              borderRadius: 10,
                              overflow: "hidden",
                              border: "none",
                              background: LIGHT.bgAlt,
                            }}
                          >
                            <img
                              src={g.src}
                              alt={g.alt}
                              loading="lazy"
                              decoding="async"
                              style={{
                                width: "100%",
                                height: "auto",
                                display: "block",
                              }}
                            />
                          </figure>
                        ))
                      ) : (
                        <div
                          style={{
                            borderRadius: 10,
                            border: "none",
                            background: `linear-gradient(135deg, ${LIGHT.bgAlt}, ${LIGHT.bg})`,
                            minHeight: 180,
                            display: "grid",
                            placeItems: "center",
                            padding: 24,
                            textAlign: "center",
                          }}
                        >
                          <p
                            style={{
                              margin: 0,
                              fontSize: 13,
                              lineHeight: 1.6,
                              color: LIGHT.muted,
                              fontFamily: fontBody,
                              maxWidth: "36ch",
                            }}
                          >
                            Drop key frames, UI captures, or brand panels into{" "}
                            <code
                              style={{
                                fontFamily: fontMono,
                                fontSize: 12,
                                color: LIGHT.ink,
                              }}
                            >
                              public/work/
                            </code>{" "}
                            and list them in this project&apos;s{" "}
                            <code
                              style={{
                                fontFamily: fontMono,
                                fontSize: 12,
                                color: LIGHT.ink,
                              }}
                            >
                              gallery
                            </code>{" "}
                            field.
                          </p>
                        </div>
                      )}
                    </div>
                  </section>
                </div>
              </div>
            )}
          </div>
        </section>

      </>
    );
  },
);

export default ProjectsSection;
