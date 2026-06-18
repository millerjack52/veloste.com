const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector(".nav-toggle");
const logo = document.querySelector("[data-motion-logo]");
const dots = [...document.querySelectorAll("[data-dot]")];
const heroContent = document.querySelector("#hero-content");
const scrollIndicator = document.querySelector(".scroll-indicator");
const root = document.documentElement;
const gate = document.querySelector("[data-password-gate]");
const gateForm = document.querySelector("[data-password-form]");
const gateInput = document.querySelector("[data-password-input]");
const gateError = document.querySelector("[data-password-error]");
const accessKey = "uptownWorkroomPreviewAccess";
const previewPassword = "uptown";

function unlockPreview() {
  document.body.classList.remove("is-locked");
  gate?.setAttribute("hidden", "");
  sessionStorage.setItem(accessKey, "1");
}

if (sessionStorage.getItem(accessKey) === "1") {
  unlockPreview();
} else {
  gateInput?.focus();
}

gateForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (gateInput?.value.trim().toLowerCase() === previewPassword) {
    unlockPreview();
    return;
  }

  if (gateError) gateError.hidden = false;
  gateInput?.select();
});

const settledDots = [
  { x: -108, y: 36 },
  { x: -22, y: -44 },
  { x: 68, y: 36 },
  { x: 116, y: 36 },
];

const thrownDots = [
  { x: -320, y: -150 },
  { x: 92, y: -286 },
  { x: 336, y: -112 },
  { x: -260, y: 238 },
];

const dotPaths = [
  { x: -190, y: 168, spin: -48, pulse: 0.05, bounceX: -14, bounceY: 10 },
  { x: 238, y: 132, spin: 54, pulse: 0.06, bounceX: 11, bounceY: 8 },
  { x: -232, y: -162, spin: -52, pulse: 0.04, bounceX: -10, bounceY: -9 },
  { x: 276, y: -138, spin: 46, pulse: 0.05, bounceX: 13, bounceY: -8 },
];

let rafId = 0;
let scrollAnimationId = 0;
let isIntroAnimating = false;
let touchStartY = 0;

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const mix = (from, to, amount) => from + (to - from) * amount;

function easeOutCubic(value) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInOut(value) {
  return value < 0.5 ? 2 * value * value : 1 - Math.pow(-2 * value + 2, 2) / 2;
}

function quadraticBezier(start, control, end, amount) {
  const inverse = 1 - amount;

  return inverse * inverse * start + 2 * inverse * amount * control + amount * amount * end;
}

function getHeaderHeight() {
  return Number.parseFloat(getComputedStyle(root).getPropertyValue("--header-h")) || 0;
}

function getHeroTargetY() {
  if (!heroContent) return window.innerHeight;

  const headerHeight = getHeaderHeight();
  const targetTop = heroContent.getBoundingClientRect().top + window.scrollY;

  return Math.max(0, Math.round(targetTop - headerHeight - 22));
}

function animateScrollTo(targetY, duration = 2100) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  if (scrollAnimationId) {
    window.cancelAnimationFrame(scrollAnimationId);
  }

  isIntroAnimating = true;
  root.classList.add("is-intro-transitioning");

  function tick(now) {
    const elapsed = now - startTime;
    const progress = clamp(elapsed / duration, 0, 1);
    const eased = easeInOut(progress);

    window.scrollTo(0, startY + distance * eased);
    setLogoMotion();

    if (progress < 1) {
      scrollAnimationId = window.requestAnimationFrame(tick);
      return;
    }

    window.scrollTo(0, targetY);
    setLogoMotion();
    scrollAnimationId = 0;
    isIntroAnimating = false;
    root.classList.remove("is-intro-transitioning");
  }

  scrollAnimationId = window.requestAnimationFrame(tick);
}

function runIntroTransition() {
  const targetY = getHeroTargetY();

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, targetY);
    setLogoMotion();
    return;
  }

  animateScrollTo(targetY);
}

function runIntroReverseTransition() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo(0, 0);
    setLogoMotion();
    return;
  }

  animateScrollTo(0);
}

function shouldCaptureIntroScroll() {
  return window.scrollY < Math.max(120, getHeroTargetY() * 0.25);
}

function shouldCaptureIntroReverseScroll() {
  const heroTargetY = getHeroTargetY();

  return window.scrollY > heroTargetY * 0.72 && window.scrollY < heroTargetY + 180;
}

function setLogoMotion() {
  if (!logo) return;

  const scrollY = window.scrollY;
  const width = window.innerWidth;
  const isMobile = width < 680;
  const headerHeight = getHeaderHeight();
  const heroTargetY = Math.max(1, getHeroTargetY());
  const introEnd = heroTargetY * (isMobile ? 0.38 : 0.4);
  const dockStart = heroTargetY * (isMobile ? 0.1 : 0.08);
  const dockEnd = heroTargetY * (isMobile ? 0.66 : 0.7);
  const settle = easeInOut(clamp(scrollY / introEnd, 0, 1));
  const dock = easeInOut(clamp((scrollY - dockStart) / (dockEnd - dockStart), 0, 1));
  const rawSettle = clamp(scrollY / introEnd, 0, 1);
  const float = Math.sin(rawSettle * Math.PI);
  const landing = clamp((rawSettle - 0.72) / 0.28, 0, 1);
  const landingBounce = Math.sin(landing * Math.PI) * (1 - landing) * (1 - dock);

  const logoHeight = logo.offsetHeight;
  const startY = Math.max(isMobile ? 120 : 104, window.innerHeight / 2 - logoHeight / 2);
  const dockY = isMobile ? 25 : 31;
  const scale = mix(isMobile ? 0.92 : 1, isMobile ? 0.27 : 0.24, dock);
  const minThrownY = headerHeight + 36 - startY;
  const maxThrownX = Math.max(120, width / 2 - 72);

  root.style.setProperty("--logo-x", `${mix(width / 2, width / 2, dock)}px`);
  root.style.setProperty("--logo-y", `${mix(startY, dockY, dock)}px`);
  root.style.setProperty("--logo-scale", scale.toFixed(3));
  root.style.setProperty("--dot-tilt", `${mix(-22, 0, settle)}deg`);

  settledDots.forEach((settled, index) => {
    const sourceThrown = thrownDots[index];
    const thrown = {
      x: clamp(sourceThrown.x, -maxThrownX, maxThrownX),
      y: Math.max(sourceThrown.y, minThrownY),
    };
    const path = dotPaths[index];
    const controlX = (thrown.x + settled.x) / 2 + path.x;
    const controlY = (thrown.y + settled.y) / 2 + path.y;
    const x =
      quadraticBezier(thrown.x, controlX, settled.x, settle) +
      path.bounceX * landingBounce * 1.25;
    const y =
      quadraticBezier(thrown.y, controlY, settled.y, settle) +
      path.bounceY * landingBounce * 1.25 -
      float * (1 - dock) * 8;
    const rotation = mix(path.spin, 0, easeOutCubic(rawSettle));
    const scale = 1 + path.pulse * float * (1 - dock) + landingBounce * 0.025;

    root.style.setProperty(`--dot-${index + 1}-x`, `${x.toFixed(2)}px`);
    root.style.setProperty(`--dot-${index + 1}-y`, `${y.toFixed(2)}px`);
    dots[index]?.style.setProperty("--dot-rot", `${rotation.toFixed(2)}deg`);
    dots[index]?.style.setProperty("--dot-scale", scale.toFixed(3));
  });

  document.body.classList.toggle("logo-docked", dock > 0.95);
  document.body.classList.toggle("intro-started", scrollY > 12);
}

function requestLogoMotion() {
  if (rafId) return;

  rafId = window.requestAnimationFrame(() => {
    rafId = 0;
    setLogoMotion();
  });
}

navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") ?? false;
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) return;

  nav.classList.remove("is-open");
  navToggle?.setAttribute("aria-expanded", "false");
});

scrollIndicator?.addEventListener("click", (event) => {
  if (!shouldCaptureIntroScroll()) return;

  event.preventDefault();
  runIntroTransition();
});

window.addEventListener(
  "wheel",
  (event) => {
    if (isIntroAnimating) {
      event.preventDefault();
      return;
    }

    if (event.deltaY < 0 && shouldCaptureIntroReverseScroll()) {
      event.preventDefault();
      runIntroReverseTransition();
      return;
    }

    if (event.deltaY <= 0 || !shouldCaptureIntroScroll()) return;

    event.preventDefault();
    runIntroTransition();
  },
  { passive: false },
);

window.addEventListener(
  "touchstart",
  (event) => {
    touchStartY = event.touches[0]?.clientY ?? 0;
  },
  { passive: true },
);

window.addEventListener(
  "touchmove",
  (event) => {
    const currentY = event.touches[0]?.clientY ?? touchStartY;
    const swipingUp = touchStartY - currentY > 18;
    const swipingDown = currentY - touchStartY > 18;

    if (isIntroAnimating) {
      event.preventDefault();
      return;
    }

    if (swipingDown && shouldCaptureIntroReverseScroll()) {
      event.preventDefault();
      runIntroReverseTransition();
      return;
    }

    if (!swipingUp || !shouldCaptureIntroScroll()) return;

    event.preventDefault();
    runIntroTransition();
  },
  { passive: false },
);

window.addEventListener("keydown", (event) => {
  const introKeys = ["ArrowDown", "PageDown", " ", "Spacebar"];
  const reverseKeys = ["ArrowUp", "PageUp", "Home"];

  if (!introKeys.includes(event.key) && !reverseKeys.includes(event.key)) return;

  if (isIntroAnimating) {
    event.preventDefault();
    return;
  }

  if (reverseKeys.includes(event.key) && shouldCaptureIntroReverseScroll()) {
    event.preventDefault();
    runIntroReverseTransition();
    return;
  }

  if (!shouldCaptureIntroScroll()) return;

  event.preventDefault();
  runIntroTransition();
});

window.addEventListener("scroll", requestLogoMotion, { passive: true });
window.addEventListener("resize", requestLogoMotion);
setLogoMotion();
