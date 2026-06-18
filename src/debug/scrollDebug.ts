import type { ScrollCurveConfig } from "../utils/scrollCurves";

type InputMode = "wheel" | "touch" | "api";

type InputEvent = {
  t: number;
  mode: InputMode;
  deltaP: number;
  consumed: boolean;
  clamped: boolean;
};

type ThresholdEvent = {
  t: number;
  name: string;
  active: boolean;
};

const FRAME_BUFFER_CAP = 360;
const INPUT_BUFFER_CAP = 240;
const LONGTASK_BUFFER_CAP = 120;
const THRESHOLD_BUFFER_CAP = 120;
const DEFAULT_WINDOW_MS = 2000;

const safeNow = () =>
  typeof performance !== "undefined" ? performance.now() : Date.now();

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const appendBounded = <T>(list: T[], value: T, cap: number) => {
  list.push(value);
  if (list.length > cap) list.shift();
};

const percentile = (samples: number[], p: number) => {
  if (!samples.length) return 0;
  const sorted = [...samples].sort((a, b) => a - b);
  const idx = Math.min(sorted.length - 1, Math.floor((sorted.length - 1) * p));
  return sorted[idx];
};

const toFixed = (value: number, digits = 2) => Number(value.toFixed(digits));

const isEnabled = () => {
  if (typeof window === "undefined") return false;
  const byQuery = new URLSearchParams(window.location.search).get("debugScroll");
  if (byQuery === "1") return true;
  return window.localStorage.getItem("velosteDebugScroll") === "1";
};

export type ScrollDebugSnapshot = {
  enabled: boolean;
  fpsAvg: number;
  fpsP95: number;
  frameTimeAvgMs: number;
  frameTimeP95Ms: number;
  worstFrameMs: number;
  droppedPct: number;
  longTaskCount: number;
  longTaskMaxMs: number;
  wheelPerSec: number;
  touchPerSec: number;
  consumedInputPct: number;
  clampedInputPct: number;
  maxDeltaP: number;
  pCurrent: number;
  pTarget: number;
  overlayBlur: number;
  leftOpacity: number;
  rightOpacity: number;
  indicatorOpacity: number;
  sampleCount: number;
};

class ScrollDebugStore {
  readonly enabled = isEnabled();

  private readonly frameTimesMs: number[] = [];
  private readonly frameTs: number[] = [];
  private readonly inputEvents: InputEvent[] = [];
  private readonly longTasks: Array<{ t: number; duration: number }> = [];
  private readonly thresholdEvents: ThresholdEvent[] = [];

  private pCurrent = 0;
  private pTarget = 0;
  private overlayBlur = 0;
  private leftOpacity = 0;
  private rightOpacity = 0;
  private indicatorOpacity = 1;
  private scrollCurveConfig: ScrollCurveConfig | null = null;

  recordFrame({
    dtSeconds,
    pCurrent,
    pTarget,
  }: {
    dtSeconds: number;
    pCurrent: number;
    pTarget: number;
  }) {
    if (!this.enabled) return;
    const t = safeNow();
    const frameMs = dtSeconds * 1000;
    appendBounded(this.frameTimesMs, frameMs, FRAME_BUFFER_CAP);
    appendBounded(this.frameTs, t, FRAME_BUFFER_CAP);
    this.pCurrent = pCurrent;
    this.pTarget = pTarget;
  }

  recordDerived({
    overlayBlur,
    leftOpacity,
    rightOpacity,
    indicatorOpacity,
  }: {
    overlayBlur: number;
    leftOpacity: number;
    rightOpacity: number;
    indicatorOpacity: number;
  }) {
    if (!this.enabled) return;
    this.overlayBlur = clamp01(overlayBlur);
    this.leftOpacity = clamp01(leftOpacity);
    this.rightOpacity = clamp01(rightOpacity);
    this.indicatorOpacity = clamp01(indicatorOpacity);
  }

  recordInput(event: InputEvent) {
    if (!this.enabled) return;
    appendBounded(this.inputEvents, event, INPUT_BUFFER_CAP);
  }

  recordLongTask(durationMs: number) {
    if (!this.enabled) return;
    appendBounded(
      this.longTasks,
      { t: safeNow(), duration: Math.max(0, durationMs) },
      LONGTASK_BUFFER_CAP,
    );
  }

  recordThreshold(name: string, active: boolean) {
    if (!this.enabled) return;
    appendBounded(this.thresholdEvents, { t: safeNow(), name, active }, THRESHOLD_BUFFER_CAP);
  }

  setCurveConfig(config: ScrollCurveConfig) {
    if (!this.enabled) return;
    this.scrollCurveConfig = config;
  }

  private recentFilter<T extends { t: number }>(items: T[], windowMs: number) {
    const minTs = safeNow() - windowMs;
    return items.filter((x) => x.t >= minTs);
  }

  getSnapshot(windowMs = DEFAULT_WINDOW_MS): ScrollDebugSnapshot {
    if (!this.enabled) {
      return {
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
    }

    const minTs = safeNow() - windowMs;
    const recentFrameTimes = this.frameTimesMs.filter((_, i) => this.frameTs[i] >= minTs);
    const frameCount = recentFrameTimes.length;
    const avgFrameMs =
      frameCount > 0
        ? recentFrameTimes.reduce((sum, ms) => sum + ms, 0) / frameCount
        : 0;
    const p95FrameMs = percentile(recentFrameTimes, 0.95);
    const worstFrameMs = recentFrameTimes.length ? Math.max(...recentFrameTimes) : 0;
    const droppedCount = recentFrameTimes.filter((ms) => ms > 20).length;

    const recentInputs = this.recentFilter(this.inputEvents, windowMs);
    const wheelCount = recentInputs.filter((e) => e.mode === "wheel").length;
    const touchCount = recentInputs.filter((e) => e.mode === "touch").length;
    const consumedCount = recentInputs.filter((e) => e.consumed).length;
    const clampedCount = recentInputs.filter((e) => e.clamped).length;
    const maxDeltaP = recentInputs.length
      ? Math.max(...recentInputs.map((e) => Math.abs(e.deltaP)))
      : 0;

    const recentLongTasks = this.recentFilter(this.longTasks, windowMs);
    const longTaskMaxMs = recentLongTasks.length
      ? Math.max(...recentLongTasks.map((e) => e.duration))
      : 0;

    return {
      enabled: true,
      fpsAvg: toFixed(avgFrameMs > 0 ? 1000 / avgFrameMs : 0, 1),
      fpsP95: toFixed(p95FrameMs > 0 ? 1000 / p95FrameMs : 0, 1),
      frameTimeAvgMs: toFixed(avgFrameMs, 2),
      frameTimeP95Ms: toFixed(p95FrameMs, 2),
      worstFrameMs: toFixed(worstFrameMs, 2),
      droppedPct: toFixed(frameCount > 0 ? (droppedCount / frameCount) * 100 : 0, 1),
      longTaskCount: recentLongTasks.length,
      longTaskMaxMs: toFixed(longTaskMaxMs, 1),
      wheelPerSec: toFixed((wheelCount * 1000) / Math.max(1, windowMs), 1),
      touchPerSec: toFixed((touchCount * 1000) / Math.max(1, windowMs), 1),
      consumedInputPct: toFixed(
        recentInputs.length ? (consumedCount / recentInputs.length) * 100 : 0,
        1,
      ),
      clampedInputPct: toFixed(
        recentInputs.length ? (clampedCount / recentInputs.length) * 100 : 0,
        1,
      ),
      maxDeltaP: toFixed(maxDeltaP, 4),
      pCurrent: toFixed(this.pCurrent, 4),
      pTarget: toFixed(this.pTarget, 4),
      overlayBlur: toFixed(this.overlayBlur, 3),
      leftOpacity: toFixed(this.leftOpacity, 3),
      rightOpacity: toFixed(this.rightOpacity, 3),
      indicatorOpacity: toFixed(this.indicatorOpacity, 3),
      sampleCount: frameCount,
    };
  }

  getSummaryLine(windowMs = DEFAULT_WINDOW_MS) {
    const s = this.getSnapshot(windowMs);
    if (!s.enabled) return "scroll-debug disabled";
    return [
      `fps ${s.fpsAvg} (p95 ${s.fpsP95})`,
      `ft ${s.frameTimeAvgMs}ms (p95 ${s.frameTimeP95Ms}ms)`,
      `drop ${s.droppedPct}%`,
      `long ${s.longTaskCount}/${s.longTaskMaxMs}ms`,
      `wheel ${s.wheelPerSec}/s`,
      `max dP ${s.maxDeltaP}`,
      `p ${s.pCurrent} -> ${s.pTarget}`,
      `blur ${s.overlayBlur}`,
    ].join(" | ");
  }

  buildReport(windowMs = DEFAULT_WINDOW_MS) {
    return {
      snapshot: this.getSnapshot(windowMs),
      recentThresholdEvents: this.recentFilter(this.thresholdEvents, windowMs).map((e) => ({
        ageMs: toFixed(safeNow() - e.t, 1),
        name: e.name,
        active: e.active,
      })),
      curveConfig: this.scrollCurveConfig,
      generatedAtIso: new Date().toISOString(),
    };
  }
}

export const scrollDebug = new ScrollDebugStore();

declare global {
  interface Window {
    velosteScrollDebugReport?: () => ReturnType<ScrollDebugStore["buildReport"]>;
  }
}

if (typeof window !== "undefined" && scrollDebug.enabled) {
  window.velosteScrollDebugReport = () => scrollDebug.buildReport();
}
