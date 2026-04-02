import React from "react";

// Resolve API base once (env var in prod, localhost in dev)
const API_BASE = String(
  import.meta.env.VITE_API_BASE_URL ||
    (import.meta.env.DEV ? "http://localhost:3001" : ""),
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
    } catch (err: any) {
      setError(err?.message || "Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  }

  const inputBase: React.CSSProperties = {
    boxSizing: "border-box",
    width: "100%",
    padding: "14px 16px",
    fontSize: 14,
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.06)",
    color: "#fff",
    outline: "none",
    transition: "border-color 160ms ease",
  };

  const labelBase: React.CSSProperties = {
    display: "block",
    marginBottom: 6,
    fontSize: 11,
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.14em",
    color: "rgba(255,255,255,0.5)",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        opacity,
        transition: "opacity 120ms linear",
        pointerEvents: active ? "auto" : "none",
        touchAction: active ? "auto" : "none",
        padding: "10vh 40px 8vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 560,
        }}
      >
        {/* Header */}
        <h1
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            lineHeight: 1.05,
            color: "#fff",
            margin: 0,
          }}
        >
          Get in touch
        </h1>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.65)",
            marginTop: 14,
            marginBottom: 36,
            maxWidth: "44ch",
          }}
        >
          Interested in exploring what Veloste can create for you? Send a
          message and we'll get back to you shortly.
        </p>

        {/* Form card */}
        <div
          style={{
            padding: "28px 28px 32px",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 12,
          }}
        >
          {!sent ? (
            <form onSubmit={handleSubmit} style={{ display: "grid", gap: 20 }}>
              {/* Name + Email row */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                  <label style={labelBase}>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    style={inputBase}
                  />
                </div>
                <div style={{ flex: "1 1 220px", minWidth: 0 }}>
                  <label style={labelBase}>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    style={inputBase}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label style={labelBase}>Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project..."
                  rows={5}
                  style={{ ...inputBase, resize: "vertical" }}
                />
              </div>

              {error && (
                <div
                  style={{
                    color: "#ff6b6b",
                    fontSize: 13,
                    lineHeight: 1.5,
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{
                  alignSelf: "start",
                  padding: "12px 28px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  background: btnHover ? "#fff" : "rgba(255,255,255,0.1)",
                  color: btnHover ? "#111" : "#fff",
                  border: "1px solid rgba(255,255,255,0.15)",
                  cursor: sending ? "default" : "pointer",
                  opacity: sending ? 0.6 : 1,
                  transition:
                    "background 160ms ease, color 160ms ease, border-color 160ms ease",
                }}
              >
                {sending ? "Sending..." : "Send message"}
              </button>
            </form>
          ) : (
            <div
              style={{
                fontSize: 16,
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.6,
                padding: "20px 0",
              }}
            >
              Thanks! We'll get back to you shortly.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
