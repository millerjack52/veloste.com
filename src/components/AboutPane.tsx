import React, { useLayoutEffect } from "react";

/* Top clears the fixed nav pill (~56px + breathing room). */
const SCROLL_PAD =
  "max(12vh, calc(env(safe-area-inset-top, 0px) + 84px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(10vh, calc(env(safe-area-inset-bottom, 0px) + 20px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))";
const SCROLL_EDGE_TOL = 8;
const SHELL_MAX = 1240;

const fontDisplay = `'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif`;
const fontBody = `system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;
const fontMono = `ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace`;

const ABOUT_SECTIONS = [
  {
    id: "intro",
    eyebrow: "Calgary-first. Built custom.",
    title: "Calgary web developer for lead-generating websites.",
    body: "Veloste is a Calgary web developer and design studio building custom websites, motion-led interfaces, and immersive 3D experiences for businesses across Canada and the United States.",
  },
  {
    id: "services",
    eyebrow: "Strategy, design, code.",
    title: "Custom websites built to convert.",
    body: "For teams that need more than a theme: clean structure, conversion-focused UX, strong visual systems, and code your team can iterate with confidence.",
  },
  {
    id: "work",
    eyebrow: "For teams with momentum.",
    title: "Built for teams that need clarity and momentum.",
    body: "Veloste works with Calgary small businesses and founder-led teams - local service businesses that need qualified leads, teams replacing dated websites that do not explain value clearly, and businesses launching new offers that need a conversion-ready web presence quickly.",
  },
  {
    id: "team",
    eyebrow: "Clear scope. Fast iteration.",
    title: "Discovery through launch, with clear scope.",
    body: "Every project starts with discovery: goals, audience, constraints, and conversion path. From there we shape structure and art direction, build with responsive QA and performance tuning, then support launch and post-launch iteration. Calgary-first delivery, with support across Airdrie, Cochrane, Okotoks, and Chestermere.",
  },
] as const;

const ABOUT_SERVICES = [
  {
    title: "Brand-led website design and development",
    body: "Positioning, UX, visual systems, and implementation shaped around the offer.",
  },
  {
    title: "Interaction and motion system design",
    body: "Motion that clarifies the experience instead of decorating around it.",
  },
  {
    title: "Immersive 3D web experiences",
    body: "Real-time interfaces for teams that need a distinctive first impression.",
  },
] as const;

const ABOUT_SIGNALS = [
  "Custom builds",
  "Conversion-focused UX",
  "Motion-led interfaces",
] as const;

const ABOUT_FITS = [
  "Local service businesses that need qualified leads.",
  "Teams replacing dated sites that no longer explain their value.",
  "Founders launching new offers that need a focused web presence quickly.",
] as const;

const ABOUT_PROCESS = [
  "Discovery",
  "Structure",
  "Art direction",
  "Build and launch",
] as const;

export default function AboutPane({ active }: { active: boolean }) {
  const scrollBoxRef = React.useRef<HTMLDivElement>(null);
  const lastTouchYRef = React.useRef<number | null>(null);
  const prevInteractiveRef = React.useRef(false);
  const [isScrollable, setIsScrollable] = React.useState(false);
  const [reducedMotion, setReducedMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const measure = React.useCallback(() => {
    const el = scrollBoxRef.current;
    if (!el) return;
    setIsScrollable(el.scrollHeight - el.clientHeight > 2);
  }, []);

  useLayoutEffect(() => {
    if (!active) return;
    measure();
  }, [active, measure]);

  React.useEffect(() => {
    measure();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      if (scrollBoxRef.current) ro.observe(scrollBoxRef.current);
    }
    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  React.useEffect(() => {
    const el = scrollBoxRef.current;
    if (active && !prevInteractiveRef.current && el) {
      el.scrollTo({ top: 0, behavior: "auto" });
      measure();
    }
    prevInteractiveRef.current = active;
  }, [active, measure]);

  return (
    <>
      <style>{`
        .about-scroll {
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.28) transparent;
          scroll-snap-type: y proximity;
          scroll-padding-top: max(12vh, calc(env(safe-area-inset-top, 0px) + 84px));
        }
        .about-scroll::-webkit-scrollbar { width: 6px; }
        .about-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.25);
          border-radius: 999px;
        }
        .about-shell {
          width: min(100%, ${SHELL_MAX}px);
          margin: 0 auto;
          display: grid;
          gap: clamp(96px, 18vh, 190px);
          padding-bottom: clamp(88px, 16vh, 170px);
          color: #000;
        }
        .about-block {
          min-height: min(86vh, 940px);
          scroll-snap-align: start;
          display: grid;
          grid-template-columns: minmax(76px, 0.18fr) minmax(0, 1fr);
          gap: clamp(18px, 4vw, 68px);
          align-items: center;
        }
        // .about-rail {
        //   align-self: stretch;
        //   display: block;
        //   padding: clamp(6px, 1vw, 12px) 0;
        //   border-left: 1px solid rgba(0, 0, 0, 0.16);
        // }
        .about-content {
          width: min(100%, 70rem);
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(260px, 0.72fr);
          gap: clamp(24px, 5.6vw, 76px);
          align-items: start;
        }
        .about-heading {
          min-width: 0;
        }
        .about-eyebrow {
          margin: 0 0 clamp(12px, 1.7vw, 20px);
          font-family: ${fontMono};
          font-size: clamp(10px, 0.9vw, 12px);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.55);
        }
        .about-title {
          margin: 0;
          font-family: ${fontDisplay};
          font-size: clamp(42px, 8.4vw, 118px);
          line-height: 0.88;
          letter-spacing: 0.01em;
          color: #000;
          max-width: 11.5ch;
        }
        .about-support {
          min-width: 0;
          display: grid;
          gap: clamp(18px, 2.6vw, 30px);
        }
        .about-body {
          margin: 0;
          font-family: ${fontBody};
          font-size: clamp(15px, 1.45vw, 20px);
          line-height: 1.6;
          color: rgba(0, 0, 0, 0.78);
          max-width: 54ch;
        }
        .about-signals {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1px;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
          border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        }
        .about-signal {
          min-height: 72px;
          display: flex;
          align-items: center;
          padding: 14px 16px;
          border-left: 1px solid rgba(0, 0, 0, 0.14);
          font-family: ${fontMono};
          font-size: clamp(10px, 0.95vw, 12px);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.72);
        }
        .about-signal:first-child {
          border-left: 0;
        }
        .about-case-link {
          appearance: none;
          width: fit-content;
          display: inline-flex;
          min-height: 42px;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0 20px;
          border: 1px solid rgba(0, 0, 0, 0.32);
          border-radius: 999px;
          font-family: ${fontMono};
          font-size: clamp(10px, 0.92vw, 12px);
          letter-spacing: 0.13em;
          text-transform: uppercase;
          color: #000;
          background: transparent;
          cursor: pointer;
          transition:
            background-color 180ms ease,
            color 180ms ease,
            border-color 180ms ease;
        }
        .about-case-link:hover,
        .about-case-link:focus-visible {
          background: #000;
          border-color: #000;
          color: #fff;
          text-decoration: none;
          outline: none;
        }
        .about-services {
          grid-column: 1 / -1;
          margin: clamp(10px, 1.4vw, 16px) 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
        }
        .about-services li {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(240px, 0.7fr);
          gap: clamp(18px, 3vw, 44px);
          padding: clamp(18px, 2.4vw, 28px) 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.16);
        }
        .about-service-title {
          margin: 0;
          font-family: ${fontDisplay};
          font-size: clamp(28px, 4.7vw, 68px);
          line-height: 0.94;
          letter-spacing: 0.01em;
          color: #000;
        }
        .about-service-body {
          margin: 0;
          align-self: center;
          font-family: ${fontBody};
          font-size: clamp(14px, 1.24vw, 17px);
          line-height: 1.55;
          color: rgba(0, 0, 0, 0.66);
        }
        .about-fit-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 0;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
        }
        .about-fit-list li {
          padding: 16px 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.14);
          font-family: ${fontBody};
          font-size: clamp(14px, 1.26vw, 18px);
          line-height: 1.55;
          color: rgba(0, 0, 0, 0.72);
        }
        .about-process {
          margin: 0;
          padding: 0;
          list-style: none;
          display: block;
          border-top: 1px solid rgba(0, 0, 0, 0.2);
        }
        .about-process li {
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr);
          gap: clamp(14px, 2vw, 24px);
          align-items: baseline;
          padding: clamp(12px, 1.8vw, 18px) 0;
          border-bottom: 1px solid rgba(0, 0, 0, 0.14);
        }
        .about-process-num {
          font-family: ${fontMono};
          font-size: 11px;
          letter-spacing: 0.16em;
          color: rgba(0, 0, 0, 0.4);
        }
        .about-process-name {
          font-family: ${fontDisplay};
          font-size: clamp(30px, 4vw, 58px);
          line-height: 0.9;
          color: #000;
        }
        .about-reveal {
          animation: about-reveal-in 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes about-reveal-in {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 900px) {
          .about-shell {
            gap: 12vh;
          }
          .about-block {
            min-height: 72vh;
            grid-template-columns: minmax(0, 1fr);
            gap: 18px;
            align-items: start;
          }
          .about-rail {
            min-height: 0;
            border-left: 0;
            border-top: 1px solid rgba(0, 0, 0, 0.2);
            padding: 14px 0 0;
          }
          .about-content {
            grid-template-columns: minmax(0, 1fr);
            gap: clamp(18px, 5vw, 34px);
            align-items: start;
          }
          .about-title {
            max-width: 11ch;
          }
          .about-signals {
            grid-template-columns: minmax(0, 1fr);
          }
          .about-signal {
            min-height: 52px;
            border-left: 0;
            border-top: 1px solid rgba(0, 0, 0, 0.12);
            padding-left: 0;
          }
          .about-signal:first-child {
            border-top: 0;
          }
          .about-services li {
            grid-template-columns: minmax(0, 1fr);
            gap: 10px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .about-scroll {
            scroll-behavior: auto;
          }
          .about-reveal {
            animation: none;
          }
        }
      `}</style>

      <div
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "calc(var(--vh, 1vh) * 100)",
          background: "transparent",
          color: "#000",
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
            touchAction: active ? "auto" : "none",
            padding: SCROLL_PAD,
          }}
          onWheel={(e) => {
            if (!active) return;
            const el = scrollBoxRef.current;
            if (!el) return;
            const { scrollTop, scrollHeight, clientHeight } = el;
            const atTop = scrollTop <= SCROLL_EDGE_TOL;
            const atBottom =
              scrollTop + clientHeight >= scrollHeight - SCROLL_EDGE_TOL;
            if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) return;
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
            if ((atTop && dy < 0) || (atBottom && dy > 0)) return;
            e.stopPropagation();
          }}
          onPointerDownCapture={(e) => {
            if (active) e.stopPropagation();
          }}
        >
          <div className="about-shell">
            {ABOUT_SECTIONS.map((section, idx) => (
              <section
                key={section.id}
                className={`about-block about-block--${section.id} about-reveal`}
                style={{
                  animationDelay: reducedMotion ? "0ms" : `${idx * 70}ms`,
                }}
                aria-label={section.title}
              >
                <aside className="about-rail" aria-hidden />

                <div className="about-content">
                  <div className="about-heading">
                    
                    <h1 className="about-title">{section.title}</h1>
                  </div>

                  <div className="about-support">
                    <p className="about-body">{section.body}</p>

                    {section.id === "intro" && (
                      <>
                        <div className="about-signals" aria-label="Veloste focus">
                          {ABOUT_SIGNALS.map((item) => (
                            <span className="about-signal" key={item}>
                              {item}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          className="about-case-link"
                          onClick={() =>
                            window.dispatchEvent(
                              new CustomEvent("veloste:openWork"),
                            )
                          }
                        >
                          View case studies
                        </button>
                      </>
                    )}

                    {section.id === "work" && (
                      <ul
                        className="about-fit-list"
                        aria-label="Who Veloste works with"
                      >
                        {ABOUT_FITS.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}

                    {section.id === "team" && (
                      <ul className="about-process" aria-label="Veloste process">
                        {ABOUT_PROCESS.map((item) => (
                          <li key={item}>
                            <span className="about-process-name">{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {section.id === "services" && (
                    <ul className="about-services" aria-label="Veloste services">
                      {ABOUT_SERVICES.map((item) => (
                        <li key={item.title}>
                          <p className="about-service-title">{item.title}</p>
                          <p className="about-service-body">{item.body}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          <nav className="seo-links-hidden" aria-label="SEO navigation links">
            <a href="/web-developer-calgary/">Calgary web developer services</a>
            <a href="/service-areas/calgary-region/">Calgary-region coverage</a>
            <a href="/uptown-workroom/">Uptown Workroom case study</a>
            <a href="mailto:contact@veloste.com">Get a scoped quote</a>
          </nav>
        </div>
      </div>
    </>
  );
}
