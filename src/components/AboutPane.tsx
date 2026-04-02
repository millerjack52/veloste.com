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
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 80; i++) {
      const t = i / 10;
      pts.push(
        new THREE.Vector3(
          Math.sin(t * 0.7) * 1.3,
          Math.cos(t * 0.4) * 0.7,
          -t * 0.35,
        ),
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
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.04} />
      </points>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.25} />
    </>
  );
}

const SCENES = {
  orb: FloatingOrbScene,
  ribbon: RibbonScene,
  particles: ParticleFieldScene,
};

// === Seeded random for stable per-card offsets ===
function seededRand(seed: number) {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

interface CaseItem {
  id: number;
  label: string;
  title: string;
  body: string;
  scene: "orb" | "ribbon" | "particles";
}

const CASES: CaseItem[] = [
  {
    id: 1,
    label: "Studio",
    title: "Veloste designs surfaces, not templates.",
    body: "We create graphic, motion-led web experiences that feel like crafted spaces. Every build starts from a visual and interaction system tailored to your brand, not a pre-existing theme.",
    scene: "orb",
  },
  {
    id: 2,
    label: "Graphic Systems",
    title: "Art direction that shapes interaction.",
    body: "Type, grids, and composition come first. We use editorial thinking to decide how content flows, then layer motion and depth so the interface feels intentional rather than decorated.",
    scene: "ribbon",
  },
  {
    id: 3,
    label: "Immersive Web",
    title: "3D as a wayfinding tool, not a gimmick.",
    body: "3D canvases explain products, spaces, and ideas in ways flat UI can't. We use subtle movement, parallax, and perspective to guide attention—always with performance budgets and fallbacks in mind.",
    scene: "particles",
  },
  {
    id: 4,
    label: "Interactions",
    title: "Unique, but never unfamiliar.",
    body: "We lean on affordances—hover, motion cues, depth, and cursor feedback—to introduce new patterns without confusing people. The experience feels fresh, while still behaving like the web.",
    scene: "orb",
  },
  {
    id: 5,
    label: "Partnership",
    title: "Built with product teams, not around them.",
    body: "We work as an embedded design–dev partner: aligning with your roadmap, collaborating with internal teams, and shipping surfaces that can be iterated on—not one-off experiments.",
    scene: "ribbon",
  },
];

// Pre-compute stable random offsets per card
const CARD_OFFSETS = CASES.map((_, i) => ({
  titleX: Math.round(seededRand(i * 3) * 30 - 15),
  titleY: Math.round(seededRand(i * 3 + 1) * 16 - 8),
  bodyX: Math.round(seededRand(i * 3 + 2) * 24 - 12),
  bodyY: Math.round(seededRand(i * 3 + 3) * 12 - 6),
}));

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
  const prevInteractiveRef = React.useRef(false);

  const [progress, setProgress] = React.useState(0);
  const [trackHeight, setTrackHeight] = React.useState(0);
  const [isScrollable, setIsScrollable] = React.useState(false);
  const KNOB = 12;

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
    const TOLERANCE = 8;
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
            padding: "10vh 40px 8vh",
            touchAction: active ? "auto" : "none",
            background: "transparent",
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
            if (!atTop && !atBottom) e.stopPropagation();
          }}
          onPointerDownCapture={(e) => {
            if (active) e.stopPropagation();
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 28,
              maxWidth: 900,
              margin: "0 auto",
              width: "100%",
            }}
          >
            {CASES.map((item, idx) => {
              const off = CARD_OFFSETS[idx];
              const SceneComp = SCENES[item.scene];
              return (
                <div
                  key={item.id}
                  style={{
                    position: "relative",
                    background: "#111",
                    borderRadius: 12,
                    overflow: "hidden",
                    minHeight: 340,
                  }}
                >
                  {/* 3D scene fills the card */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      opacity: 0.7,
                    }}
                  >
                    <Canvas
                      camera={{
                        position: [0, 0, item.scene === "particles" ? 7 : 4],
                      }}
                      style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                      }}
                    >
                      <SceneComp />
                    </Canvas>
                  </div>

                  {/* Text overlay */}
                  <div
                    style={{
                      position: "relative",
                      zIndex: 1,
                      padding: "32px 36px 36px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      minHeight: 340,
                    }}
                  >
                    {/* Label */}
                    <div
                      style={{
                        position: "absolute",
                        top: 20,
                        left: 24,
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {item.label}
                    </div>

                    {/* Title — randomised offset */}
                    <h2
                      style={{
                        fontSize: "clamp(28px, 4vw, 42px)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        lineHeight: 1.05,
                        color: "rgba(255,255,255,0.55)",
                        margin: 0,
                        transform: `translate(${off.titleX}px, ${off.titleY}px)`,
                      }}
                    >
                      {item.title}
                    </h2>

                    {/* Body — randomised offset */}
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.65,
                        color: "rgba(255,255,255,0.82)",
                        maxWidth: "50ch",
                        margin: 0,
                        marginTop: 14,
                        transform: `translate(${off.bodyX}px, ${off.bodyY}px)`,
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Footer strip */}
            <div
              style={{
                marginTop: 20,
                paddingTop: 18,
                borderTop: "1px solid rgba(255,255,255,0.15)",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: "0.18em",
                opacity: 0.5,
                color: "#fff",
                textAlign: "center",
                paddingBottom: 40,
              }}
            >
              VELOSTE © {new Date().getFullYear()}
            </div>
          </div>
        </div>

        {/* Custom scrollbar */}
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
