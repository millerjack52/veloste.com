/* Contact form on the static pages: same POST /api/contact the homepage
   ContactPane uses, against the deployed mailer (or the local dev server). */
(() => {
  "use strict";

  const form = document.getElementById("contact-form");
  if (!form) return;

  const API_BASE = /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
    ? "http://localhost:3001"
    : "https://veloste-mailer.vercel.app";

  const status = form.querySelector(".form-status");
  const submit = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      message: String(data.get("message") || ""),
    };

    submit.disabled = true;
    submit.textContent = "Sending…";
    status.textContent = "";
    delete status.dataset.state;

    try {
      const res = await fetch(API_BASE + "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        let msg = "Failed to send message.";
        try {
          const body = await res.json();
          if (body && body.error) {
            msg = body.error + (body.hint ? " " + body.hint : "");
          }
        } catch {
          /* non-JSON error body */
        }
        throw new Error(msg);
      }

      form.innerHTML =
        '<p class="contact-success">Thanks — we’ll get back to you shortly.</p>';
    } catch (err) {
      status.dataset.state = "error";
      status.textContent =
        (err && err.message ? err.message : "Failed to send message.") +
        " You can also email contact@veloste.com.";
      submit.disabled = false;
      submit.textContent = "Send message";
    }
  });
})();
