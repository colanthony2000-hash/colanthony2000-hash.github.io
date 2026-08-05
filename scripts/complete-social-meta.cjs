const fs = require("fs");
const path = require("path");

const root = process.cwd();
const skipDirs = new Set([".git", "archive", "oldassets", "assets"]);
const skipFiles = new Set(["404.html"]);

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!skipDirs.has(entry.name)) files.push(...walk(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".html")) files.push(fullPath);
  }
  return files;
}

function get(source, pattern, fallback) {
  const match = source.match(pattern);
  return match ? match[1].trim() : fallback;
}

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function insertBeforeHeadEnd(source, tag) {
  return source.replace(/<\/head>/i, `${tag}\n</head>`);
}

const changed = [];

for (const file of walk(root)) {
  const base = path.basename(file);
  if (skipFiles.has(base) || /^google[0-9a-f]+\.html$/i.test(base)) continue;

  let source = fs.readFileSync(file, "utf8");
  const original = source;
  const title = get(source, /<meta property=["']og:title["'] content=["']([^"']*)["']/i, get(source, /<title>([^<]+)<\/title>/i, "JENECONK"));
  const description = get(
    source,
    /<meta property=["']og:description["'] content=["']([^"']*)["']/i,
    get(source, /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i, "Practical JENECONK technology, education, business, training, and productivity resources.")
  );

  if (!source.includes('property="og:image"')) {
    source = insertBeforeHeadEnd(source, '  <meta property="og:image" content="https://jeneconk.com/assets/og-preview.svg">');
  }
  if (!source.includes('name="twitter:card"')) {
    const block = `  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(title)}">
  <meta name="twitter:description" content="${escapeAttr(description)}">
  <meta name="twitter:image" content="https://jeneconk.com/assets/og-preview.svg">`;
    source = insertBeforeHeadEnd(source, block);
  }

  if (source !== original) {
    fs.writeFileSync(file, source, "utf8");
    changed.push(path.relative(root, file).replace(/\\/g, "/"));
  }
}

console.log(changed.join("\n"));
console.error(`changed=${changed.length}`);
