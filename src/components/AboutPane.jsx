import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

// === Simple 3D scenes ===

function FloatingOrbScene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} />
      <mesh rotation={[0.5, 0.1, 0.3]}>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshStandardMaterial roughness={0.2} metalness={0.85} />
      </mesh>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
    </>
  );
}

function RibbonScene() {
  const curve = React.useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 10;
      pts.push(
        new THREE.Vector3(
          Math.sin(t * 0.7) * 1.3,
          Math.cos(t * 0.4) * 0.7,
          -t * 0.35
        )
      );
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 3, 4]} intensity={1} />
      <mesh rotation={[0, -0.4, 0]}>
        <tubeGeometry args={[curve, 200, 0.22, 18, false]} />
        <meshStandardMaterial wireframe />
      </mesh>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
    </>
  );
}

function ParticleFieldScene() {
  const count = 550;
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      arr[i] = (Math.random() - 0.5) * 8;
      arr[i + 1] = (Math.random() - 0.5) * 4;
      arr[i + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.04} />
      </points>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.25} />
    </>
  );
}

// === AboutPane ===

export default function AboutPane({ opacity, active }) {
  const scrollBoxRef = React.useRef(null);
  const trackRef = React.useRef(null);
  const rowRefs = React.useRef([]);

  const [progress, setProgress] = React.useState(0); // 0..1
  const [trackHeight, setTrackHeight] = React.useState(0);
  const [isScrollable, setIsScrollable] = React.useState(false);
  const prevInteractiveRef = React.useRef(false);
  const KNOB = 12;

  const [logoLoaded, setLogoLoaded] = React.useState(false);
  const [logoError, setLogoError] = React.useState(false);

  const CASES = React.useMemo(
    () => [
      {
        id: 1,
        label: "Studio",
        title: "Veloste designs surfaces, not templates.",
        body:
          "We create graphic, motion-led web experiences that feel like crafted spaces. Every build starts from a visual and interaction system tailored to your brand, not a pre-existing theme.",
        scene: "orb",
      },
      {
        id: 2,
        label: "Graphic Systems",
        title: "Art direction that shapes interaction.",
        body:
          "Type, grids, and composition come first. We use editorial thinking to decide how content flows, then layer motion and depth so the interface feels intentional rather than decorated.",
        scene: "ribbon",
      },
      {
        id: 3,
        label: "Immersive Web",
        title: "3D as a wayfinding tool, not a gimmick.",
        body:
          "3D canvases explain products, spaces, and ideas in ways flat UI can’t. We use subtle movement, parallax, and perspective to guide attention—always with performance budgets and fallbacks in mind.",
        scene: "particles",
      },
      {
        id: 4,
        label: "Interactions",
        title: "Unique, but never unfamiliar.",
        body:
          "We lean on affordances—hover, motion cues, depth, and cursor feedback—to introduce new patterns without confusing people. The experience feels fresh, while still behaving like the web.",
        scene: "orb",
      },
      {
        id: 5,
        label: "Partnership",
        title: "Built with product teams, not around them.",
        body:
          "We work as an embedded design–dev partner: aligning with your roadmap, collaborating with internal teams, and shipping surfaces that can be iterated on—not one-off experiments.",
        scene: "ribbon",
      },
    ],
    []
  );

  const [activeIndex, setActiveIndex] = React.useState(0);

  // vh fix
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

  const updateActiveFromScroll = React.useCallback(() => {
    const rows = rowRefs.current;
    if (!rows || !rows.length) return;

    let bestIndex = activeIndex;
    let bestDistance = Infinity;
    const viewportCenter = window.innerHeight * 0.5;

    rows.forEach((row, idx) => {
      if (!row) return;
      const rect = row.getBoundingClientRect();
      const rowCenter = (rect.top + rect.bottom) / 2;
      const distance = Math.abs(rowCenter - viewportCenter);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = idx;
      }
    });

    if (bestIndex !== activeIndex) {
      setActiveIndex(bestIndex);
    }
  }, [activeIndex]);

  React.useEffect(() => {
    measure();
    let ro = null;
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(measure);
      if (scrollBoxRef.current) ro.observe(scrollBoxRef.current);
      if (trackRef.current) ro.observe(trackRef.current);
      ro.observe(document.body);
    }
    window.addEventListener("resize", measure);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // reset to top on first activation
  React.useEffect(() => {
    if (active && !prevInteractiveRef.current && scrollBoxRef.current) {
      scrollBoxRef.current.scrollTo({ top: 0 });
      measure();
      updateActiveFromScroll();
    }
    prevInteractiveRef.current = active;
  }, [active, measure, updateActiveFromScroll]);

  const onScroll = (e) => {
    const el = e.currentTarget;
    const denom = Math.max(1, el.scrollHeight - el.clientHeight);
    setProgress(el.scrollTop / denom);
    updateActiveFromScroll(); // scroll-controlled active card
  };

  const onWheel = (e) => {
    if (!active) return;
    const el = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = el;

    const TOLERANCE = 8; // px
    const atTop = scrollTop <= TOLERANCE;
    const atBottom = scrollTop + clientHeight >= scrollHeight - TOLERANCE;

    const up = e.deltaY < 0;
    const down = e.deltaY > 0;

    if ((down && !atBottom) || (up && !atTop)) {
      e.stopPropagation();
    }
  };

  const currentScene = CASES[activeIndex]?.scene || "orb";

  return (
    <>
      <style>{`
        .about-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .about-scroll::-webkit-scrollbar { width: 0; height: 0; }

        .v-shell {
          padding-left: 40px;
          padding-right: 40px;
        }

        .v-about-header-kicker {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          opacity: 0.7;
          margin-bottom: 10px;
        }

        .v-about-header-title {
          font-size: clamp(32px, 4vw, 44px);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin: 0 0 12px;
        }

        .v-about-header-sub {
          font-size: 16px;
          max-width: 44ch;
          line-height: 1.6;
          opacity: 0.85;
        }

        .v-cases-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
          gap: 40px;
          align-items: flex-start;
          margin-top: 40px;
        }

        .v-cases-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .v-case-row {
          display: grid;
          grid-template-columns: auto 1fr;
          column-gap: 18px;
          padding: 18px 18px;
          border: 1px solid #000;      /* 1px black border around card */
          border-radius: 20px;
          cursor: pointer;
          transform: translateX(0) scale(1, 1);
          transform-origin: center left;
          opacity: 0.6;
          transition:
            transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1),
            opacity 160ms ease-out,
            background-color 160ms ease-out;
          background: #fff;
        }

        .v-case-row.is-active {
          transform: translateX(6px) scale(1.02, 1.04);
          opacity: 1;
          background-color: #fafafa;
        }

        .v-case-row:hover {
          opacity: 1;
          transform: translateX(10px) scale(1.04, 1.06);
        }

        .v-case-num {
          font-size: 13px;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          padding-top: 2px;
        }

        .v-case-main {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .v-case-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0.7;
          color: #111;
        }

        .v-case-title {
          font-size: 16px;
          font-weight: 500;
          color: #111;
        }

        .v-case-body {
          font-size: 14px;
          line-height: 1.7;
          max-width: 52ch;
          opacity: 0.85;
          color: #111;
        }

        .v-case-cta {
          margin-top: 4px;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0.7;
        }

        .v-cases-visual {
          position: sticky;
          top: 14vh;
          align-self: flex-start;
        }

        .v-visual-card {
          border-radius: 24px;
          overflow: hidden;
          background: radial-gradient(circle at 0 0, #ffffff, #f3f3f3);
          border: 1px solid #000;      /* 1px black border on visual card */
        }

        .v-visual-meta {
          padding: 16px 18px 0;
        }

        .v-visual-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          opacity: 0.7;
          margin-bottom: 4px;
        }

        .v-visual-title {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
        }

        .v-visual-canvas-wrapper {
          width: 100%;
          height: 280px;
        }

        .v-footer-text {
          font-size: 13px;
          line-height: 1.6;
          letter-spacing: 0.06em;
          opacity: 0.9;
          color: #fff;
          text-align: center;
        }

        .v-bottom-strip {
          margin-top: 40px;
          padding: 18px 0 80px;
          border-top: 1px solid #000;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0.7;
        }

        @media (max-width: 1100px) {
          .v-shell {
            padding-left: 24px;
            padding-right: 24px;
          }
        }

        @media (max-width: 960px) {
          .v-cases-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 32px;
          }
          .v-cases-visual {
            position: static;
          }
        }

        @media (max-width: 520px) {
          .v-shell {
            padding-left: 18px;
            padding-right: 18px;
          }
        }
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
            overflowY: active ? "auto" : "hidden",
            WebkitOverflowScrolling: active ? "touch" : "auto",
            overscrollBehavior: active ? "auto" : "contain",
            paddingTop: "10vh",
            paddingBottom: "8vh",
            touchAction: active ? "auto" : "none",
          }}
          onScroll={active ? onScroll : undefined}
          onWheel={active ? onWheel : undefined}
          onTouchMoveCapture={(e) => {
            if (!active) return;
            const el = scrollBoxRef.current;
            if (!el) return;
            const { scrollTop, scrollHeight, clientHeight } = el;

            const TOLERANCE = 8;
            const atTop = scrollTop <= TOLERANCE;
            const atBottom =
              scrollTop + clientHeight >= scrollHeight - TOLERANCE;

            if (!atTop && !atBottom) {
              e.stopPropagation();
            }
          }}
          onPointerDownCapture={(e) => {
            if (active) e.stopPropagation();
          }}
        >
          {/* content wrapper */}
          <div
            className="v-content v-shell"
            style={{
              width: "70%",
              margin: "0 auto",
              maxWidth: "1200px",
            }}
          >
            {/* ABOUT HEADER */}
            <header className="v-about-header">
              <div className="v-about-header-kicker">Veloste Studio</div>
              <h1 className="v-about-header-title">About Veloste</h1>
              <p className="v-about-header-sub">
                Veloste is a creative studio focused on immersive, interaction-led
                web experiences. We combine graphic systems, 3D canvases, and
                thoughtful affordances to build surfaces that feel unmistakably
                yours—and intuitively usable.
              </p>
            </header>

            {/* SELECTED-CASES-STYLE LAYOUT */}
            <main className="v-cases-grid">
              {/* Left: modular about cards */}
              <div className="v-cases-list">
                {CASES.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    ref={(el) => (rowRefs.current[idx] = el)}
                    className={
                      "v-case-row" + (idx === activeIndex ? " is-active" : "")
                    }
                    onMouseEnter={() => setActiveIndex(idx)}
                    onFocus={() => setActiveIndex(idx)}
                    onClick={() => setActiveIndex(idx)}
                    style={{
                      border: "none",
                      textAlign: "left",
                      width: "100%",
                      background: "none",
                      padding: 0,
                    }}
                  >
                    <div className="v-case-num">
                      {String(item.id).padStart(2, "0")}
                    </div>
                    <div className="v-case-main">
                      <div className="v-case-label">{item.label}</div>
                      <div className="v-case-title">{item.title}</div>
                      <div className="v-case-body">{item.body}</div>
                      <div className="v-case-cta">Learn more</div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right: pinned visual panel with 3D scenes */}
              <aside className="v-cases-visual">
                <div className="v-visual-card">
                  <div className="v-visual-meta">
                    <div className="v-visual-label">Veloste Visual System</div>
                    <div className="v-visual-title">
                      {CASES[activeIndex]?.label || "Studio"}
                    </div>
                  </div>
                  <div className="v-visual-canvas-wrapper">
                    <Canvas
                      key={currentScene} // remount on change for a clean swap
                      camera={{
                        position: [
                          0,
                          0,
                          currentScene === "particles" ? 7 : 4,
                        ],
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                      }}
                    >
                      {currentScene === "orb" && <FloatingOrbScene />}
                      {currentScene === "ribbon" && <RibbonScene />}
                      {currentScene === "particles" && <ParticleFieldScene />}
                    </Canvas>
                  </div>
                </div>
              </aside>
            </main>

            {/* Extra content below cards to allow full scroll & add a nice strip */}
            <div className="v-bottom-strip">
              VELOSTE · IMMERSIVE INTERACTION-LED WEB STUDIO
            </div>

            {/* FOOTER */}
            <footer
              style={{
                width: "100%",
                minHeight: 140,
                background: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 16,
                borderRadius: 999,
              }}
            >
              <div className="v-footer-inner">
                <div className="v-footer-text">
                  VELOSTE © {new Date().getFullYear()}
                  <br />
                  IMMERSIVE WEB EXPERIENCES, CRAFTED FOR THE PEOPLE WHO USE THEM.
                </div>
              </div>
            </footer>
          </div>
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
