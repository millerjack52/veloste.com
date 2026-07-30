import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");

const pages = [
  {
    path: "index.html",
    canonical: "https://www.veloste.com/",
    title: "Veloste | Custom Web Design Studio in Calgary",
  },
  {
    path: "web-developer-calgary/index.html",
    canonical: "https://www.veloste.com/web-developer-calgary/",
    title: "Web Developer Calgary | Custom Websites by Veloste",
    minWords: 1200,
  },
  {
    path: "case-studies/uptown-workroom/index.html",
    canonical: "https://www.veloste.com/case-studies/uptown-workroom/",
    title: "Uptown Workroom Website Case Study | Veloste",
    minWords: 350,
  },
  {
    path: "resources/website-brief-calgary/index.html",
    canonical: "https://www.veloste.com/resources/website-brief-calgary/",
    title: "Free Website Brief Template for Calgary Businesses | Veloste",
    minWords: 900,
  },
];

const errors = [];
const pageDocuments = new Map();

function textContent(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

for (const page of pages) {
  const file = resolve(dist, page.path);
  if (!existsSync(file)) {
    errors.push(`${page.path}: missing from dist`);
    continue;
  }

  const html = readFileSync(file, "utf8");
  pageDocuments.set(page.path, html);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  const canonical = html.match(
    /<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i,
  )?.[1];
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;
  const robots = html.match(
    /<meta\s+name=["']robots["']\s+content=["']([^"']+)["']/i,
  )?.[1];

  if (title !== page.title) {
    errors.push(`${page.path}: unexpected title "${title ?? "missing"}"`);
  }
  if (canonical !== page.canonical) {
    errors.push(`${page.path}: unexpected canonical "${canonical ?? "missing"}"`);
  }
  if (h1Count !== 1) {
    errors.push(`${page.path}: expected 1 H1, found ${h1Count}`);
  }
  if (!robots?.includes("index") || !robots.includes("follow")) {
    errors.push(`${page.path}: expected index, follow robots directive`);
  }

  if (page.minWords) {
    const words = textContent(html).split(/\s+/).filter(Boolean).length;
    if (words < page.minWords) {
      errors.push(`${page.path}: expected at least ${page.minWords} visible words, found ${words}`);
    }
  }

  const jsonLdBlocks = [
    ...html.matchAll(
      /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi,
    ),
  ];
  for (const [index, match] of jsonLdBlocks.entries()) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${page.path}: invalid JSON-LD block ${index + 1} (${error.message})`);
    }
  }
}

const sitemapFile = resolve(dist, "sitemap.xml");
if (!existsSync(sitemapFile)) {
  errors.push("sitemap.xml: missing from dist");
} else {
  const sitemap = readFileSync(sitemapFile, "utf8");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );

  for (const pathname of locations) {
    const relative = pathname === "/" ? "index.html" : `${pathname.slice(1)}index.html`;
    if (!existsSync(resolve(dist, relative))) {
      errors.push(`sitemap.xml: ${pathname} does not resolve to ${relative}`);
    }
  }

  const expectedLocations = pages.map((page) => new URL(page.canonical).pathname);
  for (const pathname of expectedLocations) {
    if (!locations.includes(pathname)) {
      errors.push(`sitemap.xml: missing canonical page ${pathname}`);
    }
  }
  for (const pathname of locations) {
    if (!expectedLocations.includes(pathname)) {
      errors.push(`sitemap.xml: unexpected indexable URL ${pathname}`);
    }
  }
}

const titles = pages.map((page) => page.title);
if (new Set(titles).size !== titles.length) {
  errors.push("canonical pages must not share duplicate titles");
}

for (const page of pages) {
  const html = pageDocuments.get(page.path);
  if (!html) continue;

  const hrefs = [...html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)].map(
    (match) => match[1],
  );

  for (const href of hrefs) {
    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:") ||
      href.startsWith("javascript:")
    ) {
      continue;
    }

    const destination = new URL(href, page.canonical);
    if (destination.hostname !== "www.veloste.com") continue;

    const pathname = destination.pathname;
    const relative =
      pathname === "/"
        ? "index.html"
        : pathname.endsWith("/")
          ? `${pathname.slice(1)}index.html`
          : pathname.slice(1);
    if (!existsSync(resolve(dist, relative))) {
      errors.push(`${page.path}: broken internal link ${href}`);
    }
  }
}

const targetPath = "web-developer-calgary/index.html";
const targetHtml = pageDocuments.get(targetPath) ?? "";
if (!targetHtml.includes('href="/resources/website-brief-calgary/"')) {
  errors.push(`${targetPath}: must link to the Calgary website brief resource`);
}

for (const supportingPath of [
  "case-studies/uptown-workroom/index.html",
  "resources/website-brief-calgary/index.html",
]) {
  const html = pageDocuments.get(supportingPath) ?? "";
  if (!html.includes('href="/web-developer-calgary/"')) {
    errors.push(`${supportingPath}: must link to the primary Calgary service page`);
  }
}

const resourceScript = resolve(
  dist,
  "resources/website-brief-calgary/brief-builder.js",
);
if (!existsSync(resourceScript)) {
  errors.push("website brief builder: missing brief-builder.js");
} else {
  const source = readFileSync(resourceScript, "utf8");
  for (const behavior of ["navigator.clipboard.writeText", "window.print", "form.addEventListener"]) {
    if (!source.includes(behavior)) {
      errors.push(`website brief builder: missing expected behavior ${behavior}`);
    }
  }
}

const resourceHtml =
  pageDocuments.get("resources/website-brief-calgary/index.html") ?? "";
if (
  !resourceHtml.includes(
    'src="/resources/website-brief-calgary/brief-builder.js"',
  ) ||
  !resourceHtml.includes("<noscript>")
) {
  errors.push("website brief builder: missing script reference or no-JavaScript guidance");
}

const redirectFile = resolve(dist, "service-areas/calgary-region/index.html");
if (existsSync(redirectFile)) {
  const redirect = readFileSync(redirectFile, "utf8");
  if (
    !redirect.includes('content="noindex, follow"') ||
    !redirect.includes('href="https://www.veloste.com/web-developer-calgary/"')
  ) {
    errors.push("service-area consolidation page is missing noindex or target canonical");
  }
}

const previewFiles = [
  "uptown-workroom/index.html",
  "uptown-workroom/assets/images/UWLogo.html",
];
for (const relative of previewFiles) {
  const file = resolve(dist, relative);
  if (existsSync(file)) {
    const html = readFileSync(file, "utf8");
    if (!/name=["']robots["'][^>]+noindex/i.test(html)) {
      errors.push(`${relative}: private preview must remain noindex`);
    }
    if (
      !html.includes('href="https://www.veloste.com/case-studies/uptown-workroom/"') ||
      !/http-equiv=["']refresh["'][^>]+case-studies\/uptown-workroom/i.test(html)
    ) {
      errors.push(`${relative}: stale preview must consolidate into the case study`);
    }
  }
}

if (errors.length) {
  console.error(`SEO audit failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log(`SEO audit passed for ${pages.length} canonical pages.`);
