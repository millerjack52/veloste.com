import React from "react";

export default function AboutPane({
  opacity,
  active,
}: {
  opacity: number;
  active: boolean;
}) {
  const scrollBoxRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0); // 0..1
  const [trackHeight, setTrackHeight] = React.useState(0);
  const [isScrollable, setIsScrollable] = React.useState(false);
  const prevInteractiveRef = React.useRef(false);
  const KNOB = 12;
  const [logoLoaded, setLogoLoaded] = React.useState<boolean>(false);
  const [logoError, setLogoError] = React.useState<boolean>(false);

  React.useEffect(() => {
    const setVh = () =>
      document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
      );
    setVh();
    window.addEventListener("resize", setVh);
    return () => window.removeEventListener("resize", setVh);
  }, []);

  const measure = React.useCallback(() => {
    const el = scrollBoxRef.current;
    if (!el) return;

    setIsScrollable(el.scrollHeight - el.clientHeight > 2);

    if (trackRef.current) {
      setTrackHeight(trackRef.current.getBoundingClientRect().height);
    }

    const denom = Math.max(1, el.scrollHeight - el.clientHeight);
    setProgress(el.scrollTop / denom);
  }, []);

  React.useEffect(() => {
    measure();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      if (scrollBoxRef.current) ro.observe(scrollBoxRef.current);
      if (trackRef.current) ro.observe(trackRef.current);
      ro.observe(document.body);
    }

    window.addEventListener("resize", measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // reset to top on first activation
  React.useEffect(() => {
    if (active && !prevInteractiveRef.current && scrollBoxRef.current) {
      scrollBoxRef.current.scrollTo({ top: 0 });
      measure();
    }
    prevInteractiveRef.current = active;
  }, [active, measure]);

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const denom = Math.max(1, el.scrollHeight - el.clientHeight);
    setProgress(el.scrollTop / denom);
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!active) return;

    const el = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = el;

    const atTop = scrollTop <= 0;
    const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

    const up = e.deltaY < 0;
    const down = e.deltaY > 0;

    if ((down && !atBottom) || (up && !atTop)) e.stopPropagation();
  };

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
            overflowY: active ? "auto" : "hidden", // 👈 scroll only when active
            WebkitOverflowScrolling: active ? "touch" : "auto",
            overscrollBehavior: active ? "auto" : "contain",
            paddingTop: "10vh",
            paddingBottom: "8vh",
            touchAction: active ? "auto" : "none", // 👈 iOS: inert when inactive
          }}
          onScroll={active ? onScroll : undefined}
          onWheel={active ? onWheel : undefined}
          onTouchMoveCapture={(e) => {
            if (!active) return;

            const el = scrollBoxRef.current!;
            const { scrollTop, scrollHeight, clientHeight } = el;

            const atTop = scrollTop <= 0;
            const atBottom =
              Math.ceil(scrollTop + clientHeight) >= scrollHeight;

            if (!atTop && !atBottom) e.stopPropagation();
          }}
          onPointerDownCapture={(e) => {
            if (active) e.stopPropagation();
          }}
        >
          {/* content wrapper */}
          <div
            className="v-content"
            style={{
              width: "70%",
              margin: "0 auto",
              maxWidth: "1200px",
            }}
          >
            <h1 className="v-h1">ABOUT VELOSTE</h1>
            <p className="v-lead">
              We design and build interactive experiences for the modern web.
              From fluid 3D canvases to crisp interfaces, our work pairs
              technical depth with editorial polish. We push the boundaries of
              real-time graphics, interaction, and storytelling to craft digital
              experiences that feel alive.
            </p>

            <hr className="v-hr" />

            <h2 className="v-h2">Process</h2>
            <ol className="v-ol">
              <li>
                <strong>Discovery</strong> — define goals, constraints, and
                success metrics.
              </li>
              <li>
                <strong>Prototyping</strong> — explore visuals & interactions
                rapidly; validate the feel.
              </li>
              <li>
                <strong>Production</strong> — build resilient, testable,
                scalable code.
              </li>
              <li>
                <strong>Polish</strong> — refine micro-interactions, performance
                budgets, and accessibility.
              </li>
              <li>
                <strong>Launch</strong> — deploy, measure, iterate.
              </li>
            </ol>
          </div>

          {/* ===== FULL-BLEED FOOTER WITH WHITE TEXT ===== */}
          <footer
            className="v-footer"
            style={{
              width: "100%",
              minHeight: 160,
              background: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 48,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div className="v-footer-inner">
              <img
                src="/vstar.svg"
                alt="VStar logo"
                decoding="async"
                loading="eager"
                onLoad={() => setLogoLoaded(true)}
                onError={() => setLogoError(true)}
                className="v-footer-logo"
                style={{
                  display: logoError ? "none" : "block",
                  opacity: logoLoaded ? 1 : 0.001,
                  transition: "opacity 200ms ease",
                }}
              />
              {logoError && (
                <svg
                  width="120"
                  height="60"
                  viewBox="0 0 24 24"
                  role="img"
                  aria-label="VStar"
                />
              )}

              <div
                style={{
                  fontSize: 14,
                  lineHeight: 1.6,
                  letterSpacing: "0.02em",
                  opacity: 0.9,
                  color: "#fff",
                }}
              >
                VELOSTE © {new Date().getFullYear()}
              </div>
            </div>
          </footer>
        </div>

        {/* Custom scrollbar (rail + knob) */}
        {isScrollable && (
          <div
            ref={trackRef}
            style={{
              position: "absolute",
              top: "10vh",
              bottom: "8vh",
              right: 6,
              width: 2,
              background: "rgba(0,0,0,0.18)",
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
                background: "#000",
                boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
