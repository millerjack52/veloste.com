import { useEffect, useState } from "react";
import { scrollDebug, type ScrollDebugSnapshot } from "../debug/scrollDebug";

const WINDOW_MS = 2000;

const initialSnapshot: ScrollDebugSnapshot = {
  enabled: false,
  fpsAvg: 0,
  fpsP95: 0,
  frameTimeAvgMs: 0,
  frameTimeP95Ms: 0,
  worstFrameMs: 0,
  droppedPct: 0,
  longTaskCount: 0,
  longTaskMaxMs: 0,
  wheelPerSec: 0,
  touchPerSec: 0,
  consumedInputPct: 0,
  clampedInputPct: 0,
  maxDeltaP: 0,
  pCurrent: 0,
  pTarget: 0,
  overlayBlur: 0,
  leftOpacity: 0,
  rightOpacity: 0,
  indicatorOpacity: 1,
  sampleCount: 0,
};

export default function ScrollDebugHud() {
  const [snapshot, setSnapshot] = useState<ScrollDebugSnapshot>(initialSnapshot);

  useEffect(() => {
    if (!scrollDebug.enabled) return;

    const renderTicker = window.setInterval(() => {
      setSnapshot(scrollDebug.getSnapshot(WINDOW_MS));
    }, 250);

    const summaryTicker = window.setInterval(() => {
      // Keep logs compact: one summary every 2 seconds.
      console.info(`[scroll-debug] ${scrollDebug.getSummaryLine(WINDOW_MS)}`);
    }, WINDOW_MS);

    return () => {
      window.clearInterval(renderTicker);
      window.clearInterval(summaryTicker);
    };
  }, []);

  useEffect(() => {
    if (!scrollDebug.enabled || typeof PerformanceObserver === "undefined") return;

    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        scrollDebug.recordLongTask(entry.duration);
      }
    });

    try {
      observer.observe({ type: "longtask", buffered: true });
    } catch {
      return;
    }

    return () => observer.disconnect();
  }, []);

  if (!scrollDebug.enabled) return null;

  return (
    <aside
      aria-live="off"
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 30,
        pointerEvents: "none",
        userSelect: "text",
        background: "rgba(0, 0, 0, 0.65)",
        color: "#d8f1ff",
        border: "1px solid rgba(152, 220, 255, 0.35)",
        borderRadius: 8,
        padding: "8px 10px",
        font: "11px/1.35 ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
        minWidth: 240,
        whiteSpace: "pre",
      }}
    >
      {[
        `fps ${snapshot.fpsAvg} | p95 ${snapshot.fpsP95}`,
        `ft ${snapshot.frameTimeAvgMs}ms | p95 ${snapshot.frameTimeP95Ms}ms`,
        `drop ${snapshot.droppedPct}% | worst ${snapshot.worstFrameMs}ms`,
        `long ${snapshot.longTaskCount} | max ${snapshot.longTaskMaxMs}ms`,
        `wheel ${snapshot.wheelPerSec}/s touch ${snapshot.touchPerSec}/s`,
        `consume ${snapshot.consumedInputPct}% clamp ${snapshot.clampedInputPct}%`,
        `max dP ${snapshot.maxDeltaP}`,
        `p ${snapshot.pCurrent} -> ${snapshot.pTarget}`,
        `L ${snapshot.leftOpacity}  R ${snapshot.rightOpacity}`,
        `blur ${snapshot.overlayBlur}  ind ${snapshot.indicatorOpacity}`,
      ].join("\n")}
    </aside>
  );
}
