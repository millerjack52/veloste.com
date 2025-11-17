// Typography / content
export const h1 = {
    fontSize: "clamp(32px,5vw,60px)",
    margin: 0,
    letterSpacing: 0.5,
};
export const h2 = {
    fontSize: "clamp(22px,2.8vw,34px)",
    margin: "28px 0 10px",
    letterSpacing: 0.3,
};
export const lead = {
    fontSize: "clamp(16px,1.8vw,22px)",
    marginTop: 14,
    lineHeight: 1.7,
    color: "#222",
};
export const para = {
    fontSize: "clamp(14px,1.6vw,18px)",
    marginTop: 14,
    lineHeight: 1.6,
    color: "#222",
};
export const ol = {
    margin: "8px 0 18px 20px",
    padding: 0,
    lineHeight: 1.7,
};
export const hr = {
    border: "none",
    borderTop: "1px solid rgba(0,0,0,0.08)",
    margin: "18px 0 24px",
};
// Form / card
export const cardStyle = {
    marginTop: 16,
    padding: "18px 18px 20px",
    background: "rgba(255,255,255,0.92)",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    backdropFilter: "saturate(160%) blur(8px)",
};
export const rowStyle = { display: "flex", flexWrap: "wrap", gap: 12 };
export const fieldColStyle = { flex: "1 1 240px", minWidth: 0 };
export const labelStyle = {
    display: "block",
    marginBottom: 6,
    fontSize: 13,
    fontWeight: 600,
    color: "#333",
    letterSpacing: 0.2,
};
export const inputStyle = {
    boxSizing: "border-box",
    width: "100%",
    padding: "12px 12px",
    fontSize: 14,
    borderRadius: 12,
    border: "1px solid #e6e6e6",
    background: "#fff",
    color: "#111",
    outline: "none",
    boxShadow: "inset 0 1px 1px rgba(0,0,0,0.03)",
};
export const buttonStyle = {
    alignSelf: "start",
    marginTop: 6,
    padding: "12px 16px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 600,
    transition: "background 160ms ease, color 160ms ease, border-color 160ms ease, transform 120ms ease",
};
