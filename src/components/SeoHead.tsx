import React from "react";

type SeoHeadProps = {
  title: string;
  description: string;
  canonicalPath: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  robots?: string;
  structuredData?: readonly Record<string, unknown>[];
};

const SITE_ORIGIN = "https://www.veloste.com";
const DEFAULT_OG_IMAGE = `${SITE_ORIGIN}/og-image.png`;

function upsertMeta(
  selector: string,
  createAttrs: Record<string, string>,
  content: string,
) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(createAttrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(
  selector: string,
  createAttrs: Record<string, string>,
  href: string,
) {
  let el = document.head.querySelector<HTMLLinkElement>(selector);
  if (!el) {
    el = document.createElement("link");
    Object.entries(createAttrs).forEach(([k, v]) => el!.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export default function SeoHead({
  title,
  description,
  canonicalPath,
  ogTitle,
  ogDescription,
  ogImage = DEFAULT_OG_IMAGE,
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  structuredData = [],
}: SeoHeadProps) {
  React.useEffect(() => {
    const canonicalUrl = canonicalPath.startsWith("http")
      ? canonicalPath
      : `${SITE_ORIGIN}${canonicalPath}`;
    const nextOgTitle = ogTitle ?? title;
    const nextOgDescription = ogDescription ?? description;

    document.title = title;

    upsertMeta('meta[name="description"]', { name: "description" }, description);
    upsertMeta('meta[name="robots"]', { name: "robots" }, robots);
    upsertMeta('meta[property="og:type"]', { property: "og:type" }, "website");
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, "Veloste");
    upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);
    upsertMeta('meta[property="og:title"]', { property: "og:title" }, nextOgTitle);
    upsertMeta(
      'meta[property="og:description"]',
      { property: "og:description" },
      nextOgDescription,
    );
    upsertMeta('meta[property="og:image"]', { property: "og:image" }, ogImage);
    upsertMeta(
      'meta[property="og:image:width"]',
      { property: "og:image:width" },
      "1200",
    );
    upsertMeta(
      'meta[property="og:image:height"]',
      { property: "og:image:height" },
      "630",
    );
    upsertMeta('meta[property="og:locale"]', { property: "og:locale" }, "en_CA");
    upsertMeta(
      'meta[property="og:image:alt"]',
      { property: "og:image:alt" },
      "Veloste — Calgary web developer and custom websites",
    );
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, nextOgTitle);
    upsertMeta(
      'meta[name="twitter:description"]',
      { name: "twitter:description" },
      nextOgDescription,
    );
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, ogImage);

    upsertLink('link[rel="canonical"]', { rel: "canonical" }, canonicalUrl);
    upsertLink(
      'link[rel="alternate"][hreflang="en-CA"]',
      { rel: "alternate", hreflang: "en-CA" },
      canonicalUrl,
    );
    upsertLink(
      'link[rel="alternate"][hreflang="x-default"]',
      { rel: "alternate", hreflang: "x-default" },
      canonicalUrl,
    );

    document
      .querySelectorAll('script[type="application/ld+json"]')
      .forEach((script) => script.remove());

    structuredData.forEach((node) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(node);
      script.setAttribute("data-seo-jsonld", "true");
      document.head.appendChild(script);
    });
  }, [
    canonicalPath,
    description,
    ogDescription,
    ogImage,
    ogTitle,
    robots,
    structuredData,
    title,
  ]);

  return null;
}
