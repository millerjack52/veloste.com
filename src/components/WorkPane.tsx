import React, { useEffect, useRef } from "react";

type Shot =
  | { kind: "image"; src: string; alt: string }
  | { kind: "mark" };

const CASE_STUDIES: ReadonlyArray<{
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  tags: readonly string[];
  shots: readonly Shot[];
  href: string | null;
  linkLabel: string;
}> = [
  {
    id: "juniper-hotel",
    eyebrow: "Boutique hospitality — Banff, Alberta",
    title: "The Juniper Hotel & Bistro",
    body: "A custom hospitality platform pairing an immersive guest experience with more than 30 purpose-built WordPress blocks, structured room and event content, booking journeys, and operational tools.",
    tags: ["UX/UI design", "Custom WordPress", "Operational tools"],
    shots: [
      {
        kind: "image",
        src: "/case-studies/juniper-hotel/assets/juniper-hero.webp",
        alt: "The Juniper Hotel overlooking a Rocky Mountain valley in Banff",
      },
      {
        kind: "image",
        src: "/case-studies/juniper-hotel/assets/juniper-deluxe-king.webp",
        alt: "A deluxe king room at The Juniper Hotel",
      },
      {
        kind: "image",
        src: "/case-studies/juniper-hotel/assets/juniper-patio.webp",
        alt: "Guests overlooking the mountains from The Juniper patio",
      },
    ],
    href: "/case-studies/juniper-hotel/",
    linkLabel: "Read case study",
  },
  {
    id: "veloste",
    eyebrow: "Real-time 3D identity — in-house",
    title: "Veloste.com",
    body: "This site. A chrome mark rendered live in WebGL, driven by a one-dimensional scroll axis that floods the page white to open About and Contact. The model ships meshopt-compressed at under 200 KB and holds 60 fps on mobile.",
    tags: ["React Three Fiber", "Motion design", "Performance"],
    shots: [
      { kind: "mark" },
      {
        kind: "image",
        src: "/og-image.png",
        alt: "Veloste chrome star identity over the wordmark",
      },
    ],
    href: null,
    linkLabel: "You're looking at it",
  },
];

export default function WorkPane({
  onClose,
  onContact,
}: {
  onClose: () => void;
  onContact: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="work-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Case studies"
      onWheel={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div className="work-scroll">
        <div className="work-shell">
          <header className="work-header">
            <div>
              <p className="work-eyebrow">Selected work</p>
              <h2 className="work-title">Case Studies</h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              className="work-close"
              onClick={onClose}
              aria-label="Close case studies"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path
                  d="M3 3L13 13M13 3L3 13"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <div className="work-grid">
            {CASE_STUDIES.map((cs) => (
              <article key={cs.id} className="work-card">
                <div className="work-card__content">
                  <p className="work-eyebrow">{cs.eyebrow}</p>
                  <h2 className="work-card__title">{cs.title}</h2>
                  <p className="work-card__body">{cs.body}</p>
                  <div className="work-meta-row">
                    <ul className="work-tags" aria-label="Project scope">
                      {cs.tags.map((tag) => (
                        <li key={tag} className="work-tag">
                          {tag}
                        </li>
                      ))}
                    </ul>
                    {cs.href ? (
                      <a className="work-link" href={cs.href}>
                        {cs.linkLabel}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <path
                            d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    ) : (
                      <span className="work-link work-link--static">
                        {cs.linkLabel}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className="work-gallery"
                  role="group"
                  aria-label={`${cs.title} gallery`}
                >
                  {cs.shots.map((shot, i) =>
                    shot.kind === "image" ? (
                      <figure className="work-shot" key={shot.src}>
                        <img
                          src={shot.src}
                          alt={shot.alt}
                          loading={i > 1 ? "lazy" : "eager"}
                          decoding="async"
                          draggable={false}
                        />
                      </figure>
                    ) : (
                      <figure
                        className="work-shot work-shot--dark"
                        key="mark"
                        aria-label="Veloste chrome star mark"
                      >
                        <span className="work-card__mark">V</span>
                      </figure>
                    ),
                  )}
                </div>
              </article>
            ))}

            <article className="work-card work-card--cta">
              <div className="work-card__content">
                <p className="work-eyebrow">Next in the queue</p>
                <h2 className="work-card__title">Your project.</h2>
                <p className="work-card__body">
                  Share your business type, timeline, and budget range — we
                  reply with a recommended scope and next steps.
                </p>
                <button type="button" className="work-cta" onClick={onContact}>
                  Start a conversation
                </button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
