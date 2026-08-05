const fs = require("fs");
const path = require("path");

const root = process.cwd();
const skipDirs = new Set([".git", "archive", "oldassets", "assets"]);
const skipFiles = new Set(["404.html"]);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const rel = path.relative(root, fullPath).replace(/\\/g, "/");
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) files.push(...walk(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(rel);
  }
  return files;
}

function attrEscape(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getMatch(source, pattern, fallback) {
  const match = source.match(pattern);
  return match ? match[1].trim() : fallback;
}

const changed = [];

for (const rel of walk(root)) {
  const base = path.basename(rel);
  if (skipFiles.has(base) || /^google[0-9a-f]+\.html$/i.test(base)) continue;

  const filePath = path.join(root, rel);
  let source = fs.readFileSync(filePath, "utf8");
  if (/property=["']og:title["']/.test(source)) continue;

  const title = getMatch(source, /<title>([^<]+)<\/title>/i, "JENECONK");
  const description = getMatch(
    source,
    /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i,
    "Practical JENECONK technology, education, business, training, and productivity resources."
  );
  const canonical = getMatch(
    source,
    /<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i,
    `https://jeneconk.com/${rel}`
  );

  const block = `
  <meta property="og:site_name" content="JENECONK Integrated Global Solutions Ltd">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${attrEscape(title)}">
  <meta property="og:description" content="${attrEscape(description)}">
  <meta property="og:url" content="${attrEscape(canonical)}">
  <meta property="og:image" content="https://jeneconk.com/assets/og-preview.svg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${attrEscape(title)}">
  <meta name="twitter:description" content="${attrEscape(description)}">
  <meta name="twitter:image" content="https://jeneconk.com/assets/og-preview.svg">`;

  if (/<meta name="theme-color"[^>]*>/i.test(source)) {
    source = source.replace(/(<meta name="theme-color"[^>]*>)/i, `$1${block}`);
  } else if (/<link rel="canonical"[^>]*>/i.test(source)) {
    source = source.replace(/(<link rel="canonical"[^>]*>)/i, `$1${block}`);
  } else {
    source = source.replace(/<\/head>/i, `${block}\n</head>`);
  }

  fs.writeFileSync(filePath, source, "utf8");
  changed.push(rel);
}

console.log(changed.join("\n"));
console.error(`changed=${changed.length}`);
