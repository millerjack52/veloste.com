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

  const [activeIndex, setActiveIndex] = React.useState(0);

  const CASES = React.useMemo(
    () => [
      {
        id: 1,
        label: "Studio",
        title: "This is a title, a title goes here",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ligula aliquam, convallis nulla quis, tristique elit. Pellentesque molestie nisi sit amet dui vestibulum, at venenatis ex consectetur.",
        scene: "orb",
      },
      {
        id: 2,
        label: "This is a short title",
        title: "Wow what a cool site",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ligula aliquam, convallis nulla quis, tristique elit. Pellentesque molestie nisi sit amet dui vestibulum, at venenatis ex consectetur.",
        scene: "ribbon",
      },
      {
        id: 3,
        label: "Shorter still",
        title: "These are quite cool titles",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ligula aliquam, convallis nulla quis, tristique elit. Pellentesque molestie nisi sit amet dui vestibulum, at venenatis ex consectetur.",
        scene: "particles",
      },
      {
        id: 4,
        label: "These titles will be short",
        title: "Something inspiring for the yet to be inspired to read",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ligula aliquam, convallis nulla quis, tristique elit. Pellentesque molestie nisi sit amet dui vestibulum, at venenatis ex consectetur.",
        scene: "orb",
      },
      {
        id: 5,
        label: "Only 2 words",
        title: "These titles will be a bit longer",
        body:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at ligula aliquam, convallis nulla quis, tristique elit. Pellentesque molestie nisi sit amet dui vestibulum, at venenatis ex consectetur.",
        scene: "ribbon",
      },
    ],
    []
  );

    const randomLayoutRef = React.useRef([]);

  if (!randomLayoutRef.current.length) {
    randomLayoutRef.current = CASES.map(() => ({
      marginBottom: -40 - Math.random() * 180,
      marginLeft: 20 + Math.random() * 60,
      maxWidth: 24 + Math.random() * 20,
    }));
  }

  

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

  const randomStyle = React.useMemo(() => {
    return {
      marginBottom: `${-200 - Math.random() * 40}px`,   // -40 to -100
      marginLeft: `${20 + Math.random() * 1}px`,       // 20px to 80px
      maxWidth: `${24 + Math.random() * 60}ch`,         // 24ch to 44ch
    };
  }, []);

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

  return (
    <>
      <style>{`
        .about-scroll { scrollbar-width: none; -ms-overflow-style: none; }
        .about-scroll::-webkit-scrollbar { width: 0; height: 0; }

        :root {
          color-scheme: dark;
        }

        .v-shell {
          padding-left: 40px;
          padding-right: 40px;
        }

        .v-about-root {
          background: #000;
          color: #f6f6f6;
        }

        .v-about-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .v-about-header-title {
          font-size: clamp(32px, 4vw, 44px);
          text-transform: uppercase;
          letter-spacing: 0.12em;
          margin: 0 0 16px;
          color: #fff;
        }

        .v-about-header-sub {
          font-size: 16px;
          max-width: 44ch;
          line-height: 1.7;
          opacity: 0.85;
          margin: 0 auto;
          color: #fff;
        }

        .v-cases-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: 24px;
          align-items: flex-start;
          margin-top: 24px;
        }

        .v-cases-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        @keyframes v-card-fade {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .v-case-row {
        border-radius: 0px;
          border: none;          /* no border */
          outline: none;         /* no outline */
          background: radial-gradient(
            circle at 0 0,
            rgba(10, 10, 10, 0.95),
            rgba(26, 26, 26, 0.98)
          );

          position: relative;
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          row-gap: 14px;
          padding: 22px 22px 20px;
          cursor: pointer;
          opacity: 0;
          transform: translateY(12px) scale(0.98);
          transform-origin: center;


          background: #b5b5b5;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);

          /* Glow only, no 0 0 0 1px */
          box-shadow:
            0 0 5px rgba(0, 0, 0, 0.9);

          transition:
            transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1),
            opacity 160ms ease-out,
            box-shadow 260ms ease-out,
            border-color 200ms ease-out,
            background 200ms ease-out;
          animation: v-card-fade 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity, box-shadow, filter;
          outline: none;
        }

        .v-case-row.is-active {
          transform: translateY(-4px) scale(1.03);
        }

        .v-case-canvas-wrapper {
          margin-top: 10px;
          overflow: hidden;
          height: 260px;
          background: radial-gradient(circle at 0 0, #181818, #050505);
          box-shadow:
            inset 0 0 10px rgba(0,0,0,0.9),
            0 0 45px rgba(0,0,0,0.75);
        }


        .v-footer-text {
          font-size: 13px;
          line-height: 1.6;
          letter-spacing: 0.06em;
          opacity: 0.7;
          color: #f5f5f5;
          text-align: center;
        }

        .v-bottom-strip {
          margin-top: 48px;
          padding: 18px 0 48px;
          border-top: 1px solid rgba(255,255,255,0.18);
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0.6;
          text-align: center;
        }

        @media (max-width: 1100px) {
          .v-shell {
            padding-left: 24px;
            padding-right: 24px;
          }
        }

        @media (max-width: 520px) {
          .v-shell {
            padding-left: 18px;
            padding-right: 18px;
          }

          .v-case-canvas-wrapper {
            height: 220px;
          }
        }

        .v-case-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0.7;
          color: #ffffff;
        }

        
        .v-case-title {
        text-transform: uppercase;
          font-size: 48px;
          line-height: 35px;
          font-weight: 500;
          max-width: 12ch;
          color: #3f3f3f;
        }

        .v-case-main {
          position: relative;
          z-index: 2; /* keep text above the canvas */
        }

        .v-case-body {
          font-size: 24px;
          line-height: 18px;      /* ultra-tight leading so lines overlap */
          max-width: 30ch;
          color: #dbdbdb;

          /* Pull the next element (canvas wrapper) up so it sits under the text */
          margin-bottom: -80px;
          margin-left: 40px;
        }


      `}</style>

      <div
        className="v-about-root"
        style={{
          position: "relative",
          display: "flex",
          width: "100%",
          height: "calc(var(--vh, 1vh) * 100)",
          opacity,
          transition: "opacity 120ms linear",
          pointerEvents: active ? "auto" : "none",
          overflow: "hidden",
          justifyContent: "center",
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
            paddingBottom: "10vh",
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
              width: "100%",
              margin: "0 auto",
              maxWidth: "960px",
            }}
          >
            {/* ABOUT HEADER  */}
            <header className="v-about-header">
              <h1 className="v-about-header-title">About Veloste</h1>
              <p className="v-about-header-sub">
                              Veloste is a web design and development studio created with the goal of building sites which 
              act as an addition to a brand's identity. Websites are an opportunity to share with your customers 
              what makes your business unique, and Veloste can help bring that to life. With a strong background in 
              design, we create novel interactions which utilise familiar patterns to create unique sites which are still approachable by all.              </p>
            </header>

            {/* CENTERED CARD STACK WITH 3D INSIDE */}
            <main className="v-cases-grid">
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
                      textAlign: "left",
                      width: "100%",
                      animationDelay: `${idx * 90}ms`,
                    }}
                  >
                    <div className="v-case-main">
                      <div className="v-case-label">{item.label}</div>
                      <h1 className="v-case-title">{item.title}</h1>
                    <div
                      className="v-case-body"
                      style={{
                        marginBottom: `${randomLayoutRef.current[idx].marginBottom}px`,
                        marginLeft: `${randomLayoutRef.current[idx].marginLeft}px`,
                        maxWidth: `${randomLayoutRef.current[idx].maxWidth}ch`,
                      }}
                    >
                      {item.body}
                    </div>

                    </div>

                    <div className="v-case-canvas-wrapper">
                      <Canvas
                        camera={{
                          position: [
                            0,
                            0,
                            item.scene === "particles" ? 7 : 4,
                          ],
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "block",
                        }}
                      >
                        {item.scene === "orb" && <FloatingOrbScene />}
                        {item.scene === "ribbon" && <RibbonScene />}
                        {item.scene === "particles" && <ParticleFieldScene />}
                      </Canvas>
                    </div>
                  </button>
                ))}
              </div>
            </main>

            {/* Extra content below cards to allow full scroll */}
            <div className="v-bottom-strip">
              
            </div>

            {/* FOOTER */}
            <footer
              style={{
                width: "100%",
                minHeight: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 8,
              }}
            >
              <div className="v-footer-inner">
                <div className="v-footer-text">
                  VELOSTE © {new Date().getFullYear()}
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
                  <br />
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
              bottom: "10vh",
              right: 6,
              width: 2,
              background: "rgba(255,255,255,0.16)",
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
                background: "#ffffff",
                boxShadow: "0 2px 10px rgba(0,0,0,0.55)",
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
