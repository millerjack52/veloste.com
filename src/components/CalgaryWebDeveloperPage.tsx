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

const sectionLabel: CSSProperties = {
  margin: 0,
  marginBottom: 8,
  fontFamily: fontMono,
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "rgba(160, 164, 178, 0.9)",
};

const paragraph: CSSProperties = {
  margin: 0,
  fontFamily: fontBody,
  fontSize: 15,
  lineHeight: 1.7,
  color: "rgba(220, 222, 232, 0.88)",
  maxWidth: "64ch",
};

const listItem: CSSProperties = {
  ...paragraph,
  marginBottom: 8,
};

const homeSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Veloste",
  url: "https://www.veloste.com",
  logo: "https://www.veloste.com/vstar.svg",
  image: "https://www.veloste.com/og-image.png",
  email: "contact@veloste.com",
  description:
    "Calgary web developer and design studio building custom websites for small businesses, with motion-led interfaces and performance-focused implementation.",
  telephone: "+1-825-521-4542",
  priceRange: "$$",
  areaServed: [
    { "@type": "City", name: "Calgary" },
    { "@type": "City", name: "Airdrie" },
    { "@type": "City", name: "Cochrane" },
    { "@type": "City", name: "Okotoks" },
    { "@type": "City", name: "Chestermere" },
    { "@type": "Country", name: "Canada" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "contact@veloste.com",
    telephone: "+1-825-521-4542",
    availableLanguage: ["English"],
  },
  founder: {
    "@type": "Person",
    name: "Jack Miller",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Veloste Services",
    itemListElement: [
      {
        "@type": "Service",
        name: "Web developer in Calgary for small businesses",
        areaServed: { "@type": "City", name: "Calgary" },
      },
      {
        "@type": "Service",
        name: "Custom website design and development",
      },
      {
        "@type": "Service",
        name: "Interaction and motion system design",
      },
    ],
  },
};

const calgaryPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://www.veloste.com/web-developer-calgary/#webpage",
  url: "https://www.veloste.com/web-developer-calgary/",
  name: "Calgary Web Developer for Lead-Generating Websites | Veloste",
  description:
    "Need more leads from your website? Veloste is a Calgary web developer building custom small-business websites with in-house design, conversion-focused UX, and clear scope.",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://www.veloste.com/#website",
    url: "https://www.veloste.com/",
    name: "Veloste",
  },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://www.veloste.com/og-image.png",
  },
};

const calgaryFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do you work with Calgary small businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Veloste works with Calgary small businesses and founder-led teams that need custom websites built for clarity, speed, and conversion.",
      },
    },
    {
      "@type": "Question",
      name: "How long does a Calgary web development project take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most engagements begin with discovery and scope planning. Timeline depends on complexity, content readiness, and integrations, and is provided in your proposal.",
      },
    },
    {
      "@type": "Question",
      name: "Do you use templates?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Veloste builds custom systems in-house around your goals, brand, and conversion requirements instead of re-skinning templates.",
      },
    },
    {
      "@type": "Question",
      name: "Do you serve nearby cities outside Calgary?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Veloste serves Calgary first and also supports Airdrie, Cochrane, Okotoks, and Chestermere.",
      },
    },
  ],
};

export default function CalgaryWebDeveloperPage() {
  return (
    <>
      <SeoHead
        title="Calgary Web Developer for Lead-Generating Websites | Veloste"
        description="Need more leads from your website? Veloste is a Calgary web developer building custom small-business websites with in-house design, conversion-focused UX, and clear scope."
        canonicalPath="/web-developer-calgary/"
        structuredData={[homeSchema, calgaryPageSchema, calgaryFaqSchema]}
      />
      <main style={pageWrap}>
        <article style={cardStyle}>
          <p style={sectionLabel}>Calgary web developer</p>
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
            Custom websites for Calgary small businesses.
          </h1>
          <p style={{ ...paragraph, marginTop: 16 }}>
            Veloste is a Calgary web developer and design studio for businesses
            that need more than a theme: clean structure, conversion-focused
            UX, strong visual systems, and code you can iterate with confidence.
          </p>
          <p style={{ ...paragraph, marginTop: 12 }}>
            We keep delivery in-house and collaborate directly with founders,
            operators, and lean teams.
          </p>
          <p style={{ ...paragraph, marginTop: 12 }}>
            Need local coverage beyond Calgary?{" "}
            <a href="/service-areas/calgary-region/">
              See Calgary-region service details
            </a>
            . Ready for scope and next steps?{" "}
            <a href="mailto:contact@veloste.com">Email Veloste</a>.
          </p>

          <section style={{ marginTop: 32 }}>
            <p style={sectionLabel}>Who this is for</p>
            <h2 style={sectionTitle}>Built for teams that need clarity and momentum.</h2>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              <li style={listItem}>
                Local service businesses in Calgary that need their site to
                generate qualified leads.
              </li>
              <li style={listItem}>
                Founder-led teams replacing dated websites that do not explain
                value clearly.
              </li>
              <li style={listItem}>
                Businesses launching a new offer and needing a conversion-ready
                web presence quickly.
              </li>
            </ul>
          </section>

          <section style={{ marginTop: 32 }}>
            <p style={sectionLabel}>Process</p>
            <h2 style={sectionTitle}>How engagements run</h2>
            <ol style={{ margin: 0, paddingLeft: 18 }}>
              <li style={listItem}>
                Discovery: goals, audience, constraints, and the conversion path.
              </li>
              <li style={listItem}>
                Structure + visual direction: information architecture, copy
                hierarchy, and art direction.
              </li>
              <li style={listItem}>
                Build: custom implementation, responsive QA, and performance
                tuning.
              </li>
              <li style={listItem}>
                Launch + support: go-live checks and post-launch iteration.
              </li>
            </ol>
          </section>

          <section style={{ marginTop: 32 }}>
            <p style={sectionLabel}>Pricing + timelines</p>
            <h2 style={sectionTitle}>Scoped to what your business needs</h2>
            <p style={paragraph}>
              Every project is quoted after discovery. Cost and timeline depend
              on content volume, integrations, animation complexity, and review
              cycles. You get a clear proposal with deliverables, phases, and
              timeline expectations before work starts.
            </p>
          </section>

          <section style={{ marginTop: 32 }}>
            <p style={sectionLabel}>Local service area</p>
            <h2 style={sectionTitle}>Calgary first, nearby cities supported</h2>
            <p style={paragraph}>
              Veloste is Calgary-based and supports nearby businesses in
              Airdrie, Cochrane, Okotoks, and Chestermere with the same
              custom-first delivery model.
            </p>
            <p style={{ ...paragraph, marginTop: 12 }}>
              <a href="/service-areas/calgary-region/">
                See full Calgary region service details.
              </a>
            </p>
          </section>

          <section style={{ marginTop: 32 }}>
            <p style={sectionLabel}>FAQ</p>
            <h2 style={sectionTitle}>Common questions</h2>
            <div style={{ display: "grid", gap: 14 }}>
              <p style={paragraph}>
                <strong>Do you work with Calgary small businesses?</strong>
                <br />
                Yes. Veloste works with Calgary small businesses and founder-led
                teams that need custom websites built for clarity, speed, and
                conversion.
              </p>
              <p style={paragraph}>
                <strong>
                  How long does a Calgary web development project take?
                </strong>
                <br />
                Most engagements begin with discovery and scope planning.
                Timeline depends on complexity, content readiness, and
                integrations, and is provided in your proposal.
              </p>
              <p style={paragraph}>
                <strong>Do you use templates?</strong>
                <br />
                No. Veloste builds custom systems in-house around your goals,
                brand, and conversion requirements instead of re-skinning
                templates.
              </p>
            </div>
          </section>

          <section style={{ marginTop: 36 }}>
            <p style={sectionLabel}>Start</p>
            <h2 style={sectionTitle}>Get a scoped quote</h2>
            <p style={paragraph}>
              Email <a href="mailto:contact@veloste.com">contact@veloste.com</a>{" "}
              or call <a href="tel:+18255214542">(825) 521-4542</a>.
            </p>
            <p style={{ ...paragraph, marginTop: 12 }}>
              <a href="/">Return to Veloste homepage experience</a>
            </p>
          </section>
        </article>
      </main>
    </>
  );
}
