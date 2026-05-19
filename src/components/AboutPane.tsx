import React, { useLayoutEffect } from "react";

const SCROLL_PAD =
  "max(8vh, calc(env(safe-area-inset-top, 0px) + 20px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(10vh, calc(env(safe-area-inset-bottom, 0px) + 20px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))";
const SCROLL_EDGE_TOL = 8;
const SHELL_MAX = 1240;

const fontDisplay = `'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif`;
const fontBody = `system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;
const fontMono = `ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace`;

const ABOUT_SECTIONS = [
  {
    id: "intro",
    kicker: "01 About",
    title: "Calgary web developer for lead-generating websites.",
    body: "Veloste is a Calgary web developer and design studio building custom websites, motion-led interfaces, and immersive 3D experiences for businesses across Canada and the United States.",
  },
  {
    id: "services",
    kicker: "02 Services",
    title: "Custom websites built to convert.",
    body: "For teams that need more than a theme: clean structure, conversion-focused UX, strong visual systems, and code your team can iterate with confidence.",
  },
  {
    id: "work",
    kicker: "03 Who it's for",
    title: "Built for teams that need clarity and momentum.",
    body: "Veloste works with Calgary small businesses and founder-led teams — local service businesses that need qualified leads, teams replacing dated websites that do not explain value clearly, and businesses launching new offers that need a conversion-ready web presence quickly.",
  },
  {
    id: "team",
    kicker: "04 Process",
    title: "Discovery through launch, with clear scope.",
    body: "Every project starts with discovery: goals, audience, constraints, and conversion path. From there we shape structure and art direction, build with responsive QA and performance tuning, then support launch and post-launch iteration. Calgary-first delivery, with support across Airdrie, Cochrane, Okotoks, and Chestermere.",
  },
] as const;

const ABOUT_SERVICES = [
  "Brand-led website design and development",
  "Interaction and motion system design",
  "Immersive 3D web experiences",
] as const;

export default function AboutPane({
  opacity,
  active,
}: {
  opacity: number;
  active: boolean;
}) {
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
          scrollbar-color: rgba(255,255,255,0.24) transparent;
          scroll-snap-type: y proximity;
        }
        .about-scroll::-webkit-scrollbar { width: 6px; }
        .about-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.22);
          border-radius: 999px;
        }
        .about-shell {
          width: min(100%, ${SHELL_MAX}px);
          margin: 0 auto;
          display: grid;
          gap: 22vh;
          padding-bottom: 18vh;
          color: #fff;
        }
        .about-block {
          min-height: min(84vh, 920px);
          scroll-snap-align: start;
          display: grid;
          grid-template-columns: minmax(74px, 11vw) minmax(0, 1fr);
          gap: clamp(14px, 2vw, 32px);
          align-items: start;
        }
        .about-kicker {
          margin: 0;
          position: sticky;
          top: max(20px, calc(env(safe-area-inset-top, 0px) + 16px));
          font-family: ${fontMono};
          font-size: clamp(10px, 0.9vw, 12px);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .about-title {
          margin: 0;
          font-family: ${fontDisplay};
          font-size: clamp(42px, 10vw, 136px);
          line-height: 0.9;
          letter-spacing: 0.01em;
          color: #fff;
          max-width: 12ch;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .about-body {
          margin: 0;
          margin-top: clamp(14px, 2.2vw, 26px);
          font-family: ${fontBody};
          font-size: clamp(15px, 1.7vw, 22px);
          line-height: 1.6;
          color: #fff;
          max-width: 58ch;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .about-services {
          margin: clamp(20px, 3vw, 34px) 0 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: clamp(8px, 1.4vw, 16px);
        }
        .about-services li {
          font-family: ${fontDisplay};
          font-size: clamp(34px, 6.7vw, 92px);
          line-height: 0.94;
          letter-spacing: 0.01em;
          color: #fff;
          text-transform: none;
          text-shadow: 0 2px 28px rgba(0, 0, 0, 0.85);
        }
        .about-services li:first-child {
          color: #fff;
        }
        .about-reveal {
          animation: about-reveal-in 720ms cubic-bezier(0.22, 1, 0.36, 1) both;
          will-change: transform, opacity, filter;
        }
        @keyframes about-reveal-in {
          from {
            opacity: 0;
            transform: translateY(24px);
            filter: blur(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0);
          }
        }
        @media (max-width: 900px) {
          .about-shell {
            gap: 12vh;
          }
          .about-block {
            min-height: 72vh;
            grid-template-columns: 1fr;
            gap: 10px;
          }
          .about-kicker {
            position: static;
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
          color: "#fff",
          opacity,
          transition: "opacity 160ms linear",
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
                className="about-block about-reveal"
                style={{
                  animationDelay: reducedMotion ? "0ms" : `${idx * 70}ms`,
                }}
                aria-label={section.kicker}
              >
                <p className="about-kicker">{section.kicker}</p>
                <div>
                  <h1 className="about-title">{section.title}</h1>
                  <p className="about-body">{section.body}</p>
                  {section.id === "services" && (
                    <ul className="about-services" aria-label="Veloste services">
                      {ABOUT_SERVICES.map((item) => (
                        <li key={item}>{item}</li>
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
            <a href="mailto:contact@veloste.com">Get a scoped quote</a>
          </nav>
        </div>
      </div>
    </>
  );
}
