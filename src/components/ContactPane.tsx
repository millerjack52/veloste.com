import React from "react";

/* Top clears the fixed nav pill (~56px + breathing room). */
const SCROLL_PAD =
  "max(12vh, calc(env(safe-area-inset-top, 0px) + 84px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(10vh, calc(env(safe-area-inset-bottom, 0px) + 20px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))";
const SHELL_MAX = 1240;

const fontDisplay = `'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif`;
const fontBody = `system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;
const fontMono = `ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace`;

const API_BASE = String(
  import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "http://localhost:3001" : ""),
).replace(/\/+$/, "");

export default function ContactPane({
  active,
}: {
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

  return (
    <>
      <style>{`
        .contact-scroll {
          scroll-behavior: smooth;
          scrollbar-width: thin;
          scrollbar-color: rgba(0,0,0,0.28) transparent;
        }
        .contact-scroll::-webkit-scrollbar { width: 6px; }
        .contact-scroll::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.25);
          border-radius: 999px;
        }
        .contact-shell {
          width: min(100%, ${SHELL_MAX}px);
          margin: 0 auto;
          padding-bottom: 18vh;
          color: #000;
        }
        .contact-block {
          min-height: min(84vh, 920px);
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          gap: clamp(14px, 2vw, 32px);
          align-items: start;
        }
        .contact-content {
          width: min(100%, 60rem);
          margin: 0 auto;
        }
        .contact-title {
          margin: 0;
          font-family: ${fontDisplay};
          font-size: clamp(42px, 10vw, 136px);
          line-height: 0.92;
          letter-spacing: 0.01em;
          color: #000;
          max-width: 12ch;
        }
        .contact-body,
        .contact-meta {
          margin: 0;
          margin-top: clamp(14px, 2.2vw, 26px);
          font-family: ${fontBody};
          font-size: clamp(16px, 1.8vw, 23px);
          line-height: 1.6;
          color: rgba(0, 0, 0, 0.78);
          max-width: 58ch;
        }
        .contact-meta {
          margin-top: clamp(10px, 1.4vw, 18px);
          font-size: clamp(15px, 1.5vw, 19px);
        }
        .contact-meta a {
          color: #000;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .contact-form {
          margin-top: clamp(28px, 4vw, 48px);
          display: grid;
          gap: clamp(22px, 3vw, 32px);
          max-width: 58ch;
        }
        .contact-fields-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
          gap: clamp(18px, 2.5vw, 28px);
        }
        .contact-field-wrap {
          display: grid;
          gap: 10px;
        }
        .contact-label {
          margin: 0;
          font-family: ${fontMono};
          font-size: clamp(11px, 1vw, 13px);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.55);
        }
        .contact-field {
          box-sizing: border-box;
          width: 100%;
          padding: 12px 14px;
          font-size: 16px;
          line-height: 1.45;
          font-family: ${fontBody};
          color: #000;
          background: rgba(0, 0, 0, 0.035);
          border: 1px solid rgba(0, 0, 0, 0.16);
          border-radius: 12px;
          outline: none;
          transition: background-color 160ms ease, border-color 160ms ease;
        }
        .contact-field::placeholder {
          color: rgba(0, 0, 0, 0.38);
        }
        .contact-field:hover:not(:disabled) {
          border-color: rgba(0, 0, 0, 0.3);
        }
        .contact-field:focus,
        .contact-field:focus-visible {
          background: #fff;
          border-color: rgba(0, 0, 0, 0.65);
        }
        .contact-textarea {
          min-height: 120px;
          resize: vertical;
        }
        .contact-error {
          margin: 0;
          padding: 12px 0;
          font-family: ${fontBody};
          font-size: clamp(14px, 1.4vw, 16px);
          line-height: 1.5;
          color: #a4241a;
        }
        .contact-submit {
          justify-self: start;
          margin-top: 8px;
          padding: 14px 28px;
          border: none;
          border-radius: 999px;
          background: #000;
          font-family: ${fontMono};
          font-size: 12px;
          line-height: 1.2;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #fff;
          cursor: pointer;
          transition: transform 160ms ease, opacity 160ms ease;
        }
        .contact-submit:hover:not(:disabled) {
          transform: translateY(-1px);
          opacity: 0.85;
        }
        .contact-submit:disabled {
          opacity: 0.4;
          cursor: default;
        }
        .contact-submit:focus-visible {
          outline: 1px solid rgba(0, 0, 0, 0.6);
          outline-offset: 3px;
        }
        .contact-success {
          margin: clamp(28px, 4vw, 48px) 0 0;
          max-width: 58ch;
          font-family: ${fontBody};
          font-size: clamp(15px, 1.7vw, 22px);
          line-height: 1.6;
          color: #000;
        }
        @media (max-width: 900px) {
          .contact-block {
            min-height: 72vh;
            grid-template-columns: minmax(0, 1fr);
            gap: 10px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .contact-scroll {
            scroll-behavior: auto;
          }
        }
      `}</style>

      <div
        className="contact-scroll"
        style={{
          display: "flex",
          width: "100%",
          height: "calc(var(--vh, 1vh) * 100)",
          background: "transparent",
          color: "#000",
          pointerEvents: active ? "auto" : "none",
          overflowY: active ? "auto" : "hidden",
          WebkitOverflowScrolling: active ? "touch" : "auto",
          overscrollBehavior: active ? "contain" : "auto",
          touchAction: active ? "auto" : "none",
          padding: SCROLL_PAD,
          boxSizing: "border-box",
        }}
      >
        <div className="contact-shell">
          <section className="contact-block" aria-label="05 Contact">
            <div className="contact-content">
              <h1 className="contact-title">Get a scoped quote.</h1>
              <p className="contact-body">
                Share your business type, timeline, and budget range. We&apos;ll
                reply with a recommended scope and next steps.
              </p>
              <p className="contact-meta">
                Calgary-based, serving Airdrie, Cochrane, Okotoks, and
                Chestermere. Email{" "}
                <a href="mailto:contact@veloste.com">contact@veloste.com</a> or
                call <a href="tel:+18255214542">(825) 521-4542</a>.
              </p>

              {!sent ? (
                <form
                  className="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <div className="contact-fields-row">
                    <div className="contact-field-wrap">
                      <label htmlFor="contact-name" className="contact-label">
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
                      />
                    </div>
                    <div className="contact-field-wrap">
                      <label htmlFor="contact-email" className="contact-label">
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
                      />
                    </div>
                  </div>

                  <div className="contact-field-wrap">
                    <label htmlFor="contact-message" className="contact-label">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      className="contact-field contact-textarea"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your project, timeline, and goals…"
                      rows={5}
                    />
                  </div>

                  {error && (
                    <p className="contact-error" role="alert" aria-live="polite">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className="contact-submit"
                    disabled={sending}
                  >
                    {sending ? "Sending…" : "Send message"}
                  </button>
                </form>
              ) : (
                <p className="contact-success">
                  Thanks — we&apos;ll get back to you shortly.
                </p>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
