import React from "react";
import {
  cardStyle,
  rowStyle,
  fieldColStyle,
  labelStyle,
  inputStyle,
  buttonStyle,
} from "./ui";

// Resolve API base once (env var in prod, localhost in dev)
const API_BASE = String(
  import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "http://localhost:3001" : "")
).replace(/\/+$/, "");

export default function ContactPane({
  opacity,
  stacked,
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
  const [btnHover, setBtnHover] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
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
    } catch (err: any) {
      setError(err?.message || "Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: stacked ? "center" : "flex-start",
        padding: "10vw 6vw 6vw",
        opacity,
        transition: "opacity 120ms linear",
        width: "100%",
        pointerEvents: active ? "auto" : "none",
        touchAction: active ? "auto" : "none",
      }}
    >
      <div
        style={{
          width: stacked ? "80vw" : "100%",
          maxWidth: stacked ? "1600px" : 560,
          overflow: active ? "auto" : "hidden",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(28px,4vw,44px)",
            margin: 0,
            letterSpacing: 0.5,
            color: "#111",
          }}
        >
          CONTACT
        </h1>
        <p
          style={{
            fontSize: "clamp(14px,1.6vw,18px)",
            marginTop: 12,
            color: "#222",
          }}
        >
          Interested in exploring what Veloste can create for you? Get in touch
          today.
        </p>

        <div style={cardStyle}>
          {!sent ? (
            <form
              onSubmit={handleSubmit}
              style={{ display: "grid", gap: 12 }} /* no action attribute */
            >
              <div style={rowStyle}>
                <div style={fieldColStyle}>
                  <label style={labelStyle}>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    style={inputStyle}
                  />
                </div>
                <div style={fieldColStyle}>
                  <label style={labelStyle}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me a bit about your project…"
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              {error && (
                <div style={{ color: "#b00020", fontSize: 13 }}>{error}</div>
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
                }}
              >
                {sending ? "Sending…" : "Send message"}
              </button>
            </form>
          ) : (
            <div style={{ fontSize: 16, color: "#111" }}>
              Thanks! I’ll get back to you shortly.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
