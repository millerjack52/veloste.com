import React from "react";
import { rowStyle, fieldColStyle, inputStyle, buttonStyle } from "./ui";

// Resolve API base once (env var in prod, localhost in dev)
const API_BASE = String(
  import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "http://localhost:3001" : "")
).replace(/\/+$/, "");

const solidInputStyle = {
  ...inputStyle,
  background: "#fff",
  border: "1px solid #fff",
  boxShadow: "none",
  WebkitBoxShadow: "none",
};

export default function ContactPane({ opacity, stacked, active }) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);
  const [error, setError] = React.useState("");
  const [btnHover, setBtnHover] = React.useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      if (!API_BASE) {
        throw new Error(
          "VITE_API_BASE_URL is not defined (and no dev fallback)."
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
          if (data?.error) {
            msg = data.error + (data?.hint ? ` ${data.hint}` : "");
          }
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
    } catch (err) {
      setError(err?.message || "Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <style>{`
        .contact-shell {
          padding-left: 40px;
          padding-right: 40px;
        }

        .contact-form-card input::placeholder,
        .contact-form-card textarea::placeholder {
          font-size: 13px;
          letter-spacing: 0.18em;
          opacity: 0.8;
          color: #333;
        }

        .contact-header-sub {
          font-size: 16px;
          max-width: 44ch;
          line-height: 1.6;
          opacity: 0.85;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          gap: 32px;
          align-items: flex-start;
          margin-top: 32px;
        }

        .contact-meta {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .contact-card {
          border: 1px solid #000;
          border-radius: 20px;
          padding: 16px 18px 18px;
          background: #fff;
        }

        .contact-card-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0.7;
          margin-bottom: 6px;
        }

        .contact-card-title {
          font-size: 15px;
          font-weight: 500;
          margin-bottom: 6px;
        }

        .contact-card-body {
          font-size: 14px;
          line-height: 1.6;
          opacity: 0.85;
        }

        .contact-form-card {
          border: 1px solid #000;
          border-radius: 24px;
          padding: 18px 20px 20px;
          background: #fff;
        }

        .contact-form-title {
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0.8;
          margin-bottom: 12px;
          color: #111;
        }

        .contact-form-sub {
          font-size: 13px;
          line-height: 1.6;
          opacity: 0.8;
          margin-bottom: 16px;
          color: #111;
        }

        .contact-bottom-strip {
          margin-top: 32px;
          padding: 14px 0 32px;
          border-top: 1px solid #000;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.18em;
          opacity: 0.7;
        }

        .contact-bottom-strip a {
          color: inherit;
          text-decoration: none;
          border-bottom: 1px solid rgba(0,0,0,0.4);
        }

        .contact-bottom-strip a:hover {
          border-bottom-color: #000;
          opacity: 1;
        }

        @media (max-width: 1100px) {
          .contact-shell {
            padding-left: 24px;
            padding-right: 24px;
          }
        }

        @media (max-width: 960px) {
          .contact-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 24px;
          }
        }

        @media (max-width: 520px) {
          .contact-shell {
            padding-left: 18px;
            padding-right: 18px;
          }
        }
      `}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: stacked ? "center" : "flex-start",
          padding: "10vh 0 6vh",
          opacity,
          transition: "opacity 120ms linear",
          width: "100%",
          pointerEvents: active ? "auto" : "none",
          touchAction: active ? "auto" : "none",
          overflow: "hidden",
        }}
      >
        <div
          className="contact-shell"
          style={{
            width: stacked ? "80vw" : "100%",
            maxWidth: stacked ? "1600px" : 720,
            margin: "0 auto",
            overflow: active ? "auto" : "hidden",
          }}
        >
          {/* FORM CARD */}
          <section aria-label="Contact form">
            <div className="contact-form-card">
              <div className="contact-form-title">Project inquiry</div>
              <p className="contact-form-sub">
                Get in touch using the form below, and I’ll get back to you as
                soon as possible.
              </p>

              {!sent ? (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "grid", gap: 12 }}
                >
                  <div
                    style={{
                      ...rowStyle,
                      gap: 12,
                      flexWrap: "wrap",
                    }}
                  >
                    <div style={{ ...fieldColStyle, minWidth: 0, flex: 1 }}>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autoComplete="name"
                        placeholder="NAME"
                        style={solidInputStyle}
                      />
                    </div>
                    <div style={{ ...fieldColStyle, minWidth: 0, flex: 1 }}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                        placeholder="EMAIL"
                        style={solidInputStyle}
                      />
                    </div>
                  </div>

                  <div>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="MESSAGE"
                      rows={5}
                      style={solidInputStyle}
                    />
                  </div>

                  {error && (
                    <div style={{ color: "#b00020", fontSize: 13 }}>
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    onMouseEnter={() => setBtnHover(true)}
                    onMouseLeave={() => setBtnHover(false)}
                    style={{
                      ...buttonStyle,
                      background: btnHover ? "#fff" : "#000",
                      color: btnHover ? "#111" : "#fff",
                      border: btnHover
                        ? "1px solid #111"
                        : "1px solid rgba(0,0,0,0.2)",
                      opacity: sending ? 0.7 : 1,
                      cursor: sending ? "default" : "pointer",
                      marginTop: 4,
                    }}
                  >
                    {sending ? "SENDING..." : "SEND MESSAGE"}
                  </button>
                </form>
              ) : (
                <div style={{ fontSize: 15, color: "#111", lineHeight: 1.6 }}>
                  Thanks for reaching out. I&apos;ll review your message and get
                  back to you with next steps.
                </div>
              )}
            </div>
          </section>

          <div className="contact-bottom-strip">
            Prefer email?{" "}
            <a href="mailto:hello@veloste.studio">hello@veloste.studio</a>
          </div>
        </div>
      </div>
    </>
  );
}
