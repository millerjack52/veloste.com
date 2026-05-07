import React from "react";

/** Align with AboutPane — neutral dark glass, no chromatic accent */
const BRAND = {
  ink: {
    main: "rgba(252, 252, 255, 0.96)",
    body: "rgba(220, 222, 232, 0.88)",
    muted: "rgba(160, 164, 178, 0.9)",
    faint: "rgba(120, 124, 138, 0.75)",
  },
  columnBg: "rgba(255, 255, 255, 0.04)",
  radius: 12,
  shadow: "0 20px 56px rgba(0, 0, 0, 0.42)",
} as const;

const SCROLL_PAD =
  "max(10vh, calc(env(safe-area-inset-top, 0px) + 20px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(12vh, calc(env(safe-area-inset-bottom, 0px) + 20px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))";
const COLUMN_MAX = 640;
const CARD_PAD_Y = 22;
const CARD_PAD_X = 28;

const fontDisplay = `'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif`;
const fontBody = `system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;
const fontMono = `ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace`;

// Resolve API base once (env var in prod, localhost in dev)
const API_BASE = String(
  import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "http://localhost:3001" : ""),
).replace(/\/+$/, "");

export default function ContactPane({
  opacity,
  active,
}: {
  opacity: number;
  stacked: boolean;
  active: boolean;
}) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      if (!API_BASE) {
        throw new Error(
          "VITE_API_BASE_URL is not defined (and no dev fallback).",
        );
      }

      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        let msg = "Failed to send message";
        try {
          const data = await res.json();
          if (data?.error)
            msg = data.error + (data?.hint ? ` ${data.hint}` : "");
        } catch {
          const txt = await res.text().catch(() => "");
          if (txt) msg = txt;
        }
        throw new Error(msg);
      }

      setSent(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send message. Please try again.",
      );
    } finally {
      setSending(false);
    }
  }

  const ink = BRAND.ink;

  const sectionLabel: React.CSSProperties = {
    fontSize: 11,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: ink.muted,
    fontFamily: fontMono,
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: 8,
    ...sectionLabel,
  };

  const fieldBase: React.CSSProperties = {
    boxSizing: "border-box",
    width: "100%",
    padding: "13px 14px",
    /* 16px+ avoids iOS Safari zooming inputs on focus */
    fontSize: 16,
    lineHeight: 1.45,
    fontFamily: fontBody,
    borderRadius: 8,
    border: "none",
    color: ink.main,
    outline: "none",
    transition: "background 160ms ease",
  };

  return (
    <>
      <style>{`
        .contact-column {
          background: ${BRAND.columnBg};
          backdrop-filter: saturate(140%) blur(12px);
          -webkit-backdrop-filter: saturate(140%) blur(12px);
        }
        .contact-field {
          background: rgba(255, 255, 255, 0.055);
        }
        .contact-field::placeholder {
          color: ${ink.faint};
        }
        .contact-field:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.085);
        }
        .contact-field:focus,
        .contact-field:focus-visible {
          background: rgba(255, 255, 255, 0.1);
        }
        .contact-submit {
          background: rgba(255, 255, 255, 0.06);
        }
        .contact-submit:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.1);
        }
        .contact-submit:focus-visible {
          background: rgba(255, 255, 255, 0.12);
          outline: none;
          box-shadow: 0 0 0 2px rgba(100, 108, 255, 0.9);
        }
        .contact-submit:disabled {
          opacity: 0.55;
          cursor: default;
        }
      `}</style>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          height: "100%",
          minHeight: 0,
          opacity,
          transition: "opacity 120ms linear",
          pointerEvents: active ? "auto" : "none",
          touchAction: active ? "auto" : "none",
          padding: SCROLL_PAD,
          background: "#000",
          boxSizing: "border-box",
          overflowY: active ? "auto" : "hidden",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: COLUMN_MAX,
            margin: "0 auto",
            flexShrink: 0,
          }}
        >
          <div
            className="contact-column"
            style={{
              borderRadius: BRAND.radius,
              boxShadow: BRAND.shadow,
              overflow: "hidden",
            }}
          >
            <header
              style={{
                padding: `${CARD_PAD_Y}px ${CARD_PAD_X}px ${CARD_PAD_Y - 4}px`,
              }}
            >
              <p style={{ margin: 0, marginBottom: 8, ...sectionLabel }}>
                Contact
              </p>
              <h1
                style={{
                  margin: 0,
                  fontFamily: fontDisplay,
                  fontSize: "clamp(22px, 4vw, 32px)",
                  lineHeight: 1.14,
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  color: ink.main,
                }}
              >
                Get in touch
              </h1>
              <p
                style={{
                  margin: 0,
                  marginTop: 14,
                  maxWidth: "48ch",
                  fontSize: 15,
                  lineHeight: 1.65,
                  fontFamily: fontBody,
                  color: ink.body,
                }}
              >
                Interested in exploring what Veloste can create for you? Send a
                message and we&apos;ll get back to you shortly.
              </p>
              <p
                style={{
                  margin: 0,
                  marginTop: 10,
                  maxWidth: "56ch",
                  fontSize: 13,
                  lineHeight: 1.65,
                  fontFamily: fontBody,
                  color: ink.muted,
                }}
              >
                Calgary-based, serving nearby cities including Airdrie,
                Cochrane, Okotoks, and Chestermere.
              </p>
              <p
                style={{
                  margin: 0,
                  marginTop: 8,
                  maxWidth: "56ch",
                  fontSize: 13,
                  lineHeight: 1.65,
                  fontFamily: fontBody,
                  color: ink.muted,
                }}
              >
                <a href="/web-developer-calgary/">Calgary web developer page</a>{" "}
                ·{" "}
                <a href="/service-areas/calgary-region/">
                  Calgary region service areas
                </a>
              </p>
              <p
                style={{
                  margin: 0,
                  marginTop: 8,
                  maxWidth: "56ch",
                  fontSize: 13,
                  lineHeight: 1.65,
                  fontFamily: fontBody,
                  color: ink.muted,
                }}
              >
                Email <a href="mailto:contact@veloste.com">contact@veloste.com</a>{" "}
                or call <a href="tel:+18255214542">(825) 521-4542</a>.
              </p>
            </header>

            <div style={{ padding: `${CARD_PAD_Y}px ${CARD_PAD_X}px` }}>
              {!sent ? (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "grid", gap: 0 }}
                  noValidate
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 18,
                      marginBottom: 20,
                    }}
                  >
                    <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                      <label htmlFor="contact-name" style={labelStyle}>
                        Name
                      </label>
                      <input
                        id="contact-name"
                        className="contact-field"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="name"
                        placeholder="Your name"
                        style={fieldBase}
                      />
                    </div>
                    <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                      <label htmlFor="contact-email" style={labelStyle}>
                        Email
                      </label>
                      <input
                        id="contact-email"
                        className="contact-field"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="you@example.com"
                        style={fieldBase}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" style={labelStyle}>
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      className="contact-field"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your project, timeline, and goals…"
                      rows={5}
                      style={{
                        ...fieldBase,
                        resize: "vertical",
                        minHeight: 120,
                      }}
                    />
                  </div>

                  {error && (
                    <div
                      role="alert"
                      aria-live="polite"
                      style={{
                        marginTop: 18,
                        padding: "12px 14px",
                        borderRadius: 8,
                        background: "rgba(255, 120, 90, 0.12)",
                        fontSize: 14,
                        lineHeight: 1.5,
                        fontFamily: fontBody,
                        color: "rgba(255, 210, 200, 0.95)",
                      }}
                    >
                      {error}
                    </div>
                  )}

                  <div style={{ marginTop: 22 }}>
                    <button
                      type="submit"
                      className="contact-submit"
                      disabled={sending}
                      style={{
                        padding: "11px 22px",
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        fontFamily: fontDisplay,
                        cursor: sending ? "default" : "pointer",
                        border: "none",
                        color: ink.main,
                        transition: "background 160ms ease",
                      }}
                    >
                      {sending ? "Sending…" : "Send message"}
                    </button>
                  </div>
                </form>
              ) : (
                <div
                  style={{
                    display: "grid",
                    justifyItems: "center",
                    gap: 16,
                    textAlign: "center",
                    padding: "8px 0 4px",
                  }}
                >
                  <img
                    src="/vstar.svg"
                    alt=""
                    width={28}
                    height={28}
                    style={{ opacity: 0.88 }}
                  />
                  <p
                    style={{
                      margin: 0,
                      fontSize: 16,
                      lineHeight: 1.6,
                      fontFamily: fontBody,
                      color: ink.body,
                      maxWidth: "36ch",
                    }}
                  >
                    Thanks — we&apos;ll get back to you shortly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
