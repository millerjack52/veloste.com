import type { CSSProperties } from "react";
import SeoHead from "./SeoHead";

const fontDisplay = `'VelosteFont', system-ui, Avenir, Helvetica, Arial, sans-serif`;
const fontBody = `system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`;
const fontMono = `ui-monospace, 'Cascadia Code', 'SF Mono', Consolas, monospace`;

const pageWrap: CSSProperties = {
  minHeight: "100vh",
  background: "#000",
  color: "rgba(252, 252, 255, 0.96)",
  padding:
    "max(40px, calc(env(safe-area-inset-top, 0px) + 24px)) max(20px, calc(env(safe-area-inset-right, 0px) + 20px)) max(56px, calc(env(safe-area-inset-bottom, 0px) + 28px)) max(20px, calc(env(safe-area-inset-left, 0px) + 20px))",
};

const cardStyle: CSSProperties = {
  maxWidth: 920,
  margin: "0 auto",
  background: "rgba(255, 255, 255, 0.04)",
  borderRadius: 12,
  boxShadow: "0 20px 56px rgba(0, 0, 0, 0.42)",
  backdropFilter: "saturate(140%) blur(12px)",
  WebkitBackdropFilter: "saturate(140%) blur(12px)",
  padding: "28px",
};

const sectionLabel: CSSProperties = {
  margin: 0,
  marginBottom: 8,
  fontFamily: fontMono,
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(160, 164, 178, 0.9)",
};

const sectionTitle: CSSProperties = {
  margin: "0 0 12px",
  fontFamily: fontDisplay,
  fontSize: "clamp(20px, 3vw, 30px)",
  lineHeight: 1.14,
  letterSpacing: "0.02em",
  fontWeight: 500,
  color: "rgba(252, 252, 255, 0.96)",
  textTransform: "none",
};

const paragraph: CSSProperties = {
  margin: 0,
  fontFamily: fontBody,
  fontSize: 15,
  lineHeight: 1.7,
  color: "rgba(220, 222, 232, 0.88)",
  maxWidth: "64ch",
};

const serviceAreaPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.veloste.com/service-areas/calgary-region/#webpage",
  url: "https://www.veloste.com/service-areas/calgary-region/",
  name: "Calgary Region Web Developer Services | Veloste",
  description:
    "Need a local web developer in the Calgary region? Veloste supports Calgary, Airdrie, Cochrane, Okotoks, and Chestermere with custom lead-focused website design and development.",
};

const serviceAreaSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Calgary region website design and development",
  provider: {
    "@type": "ProfessionalService",
    name: "Veloste",
    url: "https://www.veloste.com",
    telephone: "+1-825-521-4542",
    email: "contact@veloste.com",
  },
  areaServed: [
    { "@type": "City", name: "Calgary" },
    { "@type": "City", name: "Airdrie" },
    { "@type": "City", name: "Cochrane" },
    { "@type": "City", name: "Okotoks" },
    { "@type": "City", name: "Chestermere" },
  ],
  serviceType: "Custom website design and development",
};

export default function CalgaryRegionServiceAreaPage() {
  return (
    <>
      <SeoHead
        title="Calgary Region Web Developer Services | Veloste"
        description="Need a local web developer in the Calgary region? Veloste supports Calgary, Airdrie, Cochrane, Okotoks, and Chestermere with custom lead-focused website design and development."
        canonicalPath="/service-areas/calgary-region/"
        structuredData={[serviceAreaPageSchema, serviceAreaSchema]}
      />
      <main style={pageWrap}>
        <article style={cardStyle}>
          <p style={sectionLabel}>Service area</p>
          <h1
            style={{
              margin: 0,
              fontFamily: fontDisplay,
              fontSize: "clamp(30px, 5vw, 54px)",
              lineHeight: 1.04,
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: "rgba(252, 252, 255, 0.96)",
              textTransform: "none",
            }}
          >
            Calgary region web development coverage.
          </h1>
          <p style={{ ...paragraph, marginTop: 16 }}>
            Veloste serves Calgary first and supports nearby businesses that
            need custom websites with clear positioning, conversion-focused
            structure, and performance-minded implementation.
          </p>
          <p style={{ ...paragraph, marginTop: 12 }}>
            If you want a Calgary-first build plan with nearby-city support,{" "}
            <a href="mailto:contact@veloste.com">email your goals and timeline</a>{" "}
            or review our{" "}
            <a href="/web-developer-calgary/">
              Calgary web developer service page
            </a>
            .
          </p>

          <section style={{ marginTop: 30 }}>
            <p style={sectionLabel}>Primary city</p>
            <h2 style={sectionTitle}>Calgary</h2>
            <p style={paragraph}>
              Calgary is our core market and where we prioritize collaboration
              windows and project kickoff availability.
            </p>
          </section>

          <section style={{ marginTop: 30 }}>
            <p style={sectionLabel}>Nearby areas</p>
            <h2 style={sectionTitle}>Airdrie, Cochrane, Okotoks, Chestermere</h2>
            <p style={paragraph}>
              We support nearby-city clients with the same process: discovery,
              design direction, custom implementation, QA, and launch support.
            </p>
            <p style={{ ...paragraph, marginTop: 12 }}>
              City-specific details are scoped per project based on timeline,
              complexity, and communication requirements.
            </p>
          </section>

          <section style={{ marginTop: 30 }}>
            <p style={sectionLabel}>How we work</p>
            <h2 style={sectionTitle}>Service-area expectations</h2>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li style={{ ...paragraph, marginBottom: 8 }}>
                Discovery and planning happen before build starts.
              </li>
              <li style={{ ...paragraph, marginBottom: 8 }}>
                Milestones and delivery windows are confirmed in your proposal.
              </li>
              <li style={{ ...paragraph, marginBottom: 8 }}>
                Launch support is included for launch-related fixes.
              </li>
            </ul>
          </section>

          <section style={{ marginTop: 34 }}>
            <p style={sectionLabel}>Next step</p>
            <h2 style={sectionTitle}>Get your Calgary-region project scoped</h2>
            <p style={paragraph}>
              Email <a href="mailto:contact@veloste.com">contact@veloste.com</a>{" "}
              or call <a href="tel:+18255214542">(825) 521-4542</a>.
            </p>
            <p style={{ ...paragraph, marginTop: 12 }}>
              <a href="/web-developer-calgary/">
                View Calgary web developer page
              </a>{" "}
              · <a href="/">Return to homepage experience</a>
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
