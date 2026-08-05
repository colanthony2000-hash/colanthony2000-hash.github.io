const fs = require("fs");
const path = require("path");

const root = process.cwd();
const skipDirs = new Set([".git", "archive", "oldassets"]);
const skipHtmlFiles = new Set(["404.html"]);
const bannedPatterns = [
  /Ã/,
  /Â/,
  /â/,
  /Internal linking/i,
  /before they need/i,
  /JENECONK resources are built/i,
  /sell second/i,
  /doorways/i,
  /localhost:3000/i,
  /AdminFlow/i,
  /SchoolOS/i,
  /\bCBT Pro\b/i,
];

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && skipDirs.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(fullPath));
    if (entry.isFile()) files.push(fullPath);
  }
  return files;
}

function rel(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function isGoogleVerification(file) {
  return /^google[0-9a-f]+\.html$/i.test(path.basename(file));
}

function localTarget(fromFile, rawUrl) {
  if (!rawUrl || rawUrl.startsWith("#")) return null;
  if (/^(https?:|mailto:|tel:|sms:|whatsapp:|data:|javascript:)/i.test(rawUrl)) return null;
  if (rawUrl.startsWith("//")) return null;

  const clean = rawUrl.split("#")[0].split("?")[0];
  if (!clean) return null;

  const normalized = clean.startsWith("/")
    ? path.join(root, clean.slice(1))
    : path.resolve(path.dirname(fromFile), clean);

  return clean.endsWith("/") ? path.join(normalized, "index.html") : normalized;
}

const allFiles = walk(root);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const errors = [];

for (const file of htmlFiles) {
  const source = fs.readFileSync(file, "utf8");
  const relative = rel(file);
  const shouldHaveMeta = !skipHtmlFiles.has(path.basename(file)) && !isGoogleVerification(file);

  if (shouldHaveMeta) {
    for (const tag of ["og:title", "og:description", "og:url", "og:image"]) {
      if (!source.includes(`property="${tag}"`)) errors.push(`${relative}: missing ${tag}`);
    }
    if (!source.includes('name="twitter:card"')) errors.push(`${relative}: missing twitter:card`);
  }

  for (const pattern of bannedPatterns) {
    if (pattern.test(source)) errors.push(`${relative}: banned text/pattern ${pattern}`);
  }

  for (const match of source.matchAll(/\s(?:href|src)=["']([^"']+)["']/gi)) {
    const target = localTarget(file, match[1]);
    if (!target) continue;
    if (!fs.existsSync(target)) errors.push(`${relative}: missing local target ${match[1]}`);
  }
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
for (const url of urls) {
  if (!url.startsWith("https://jeneconk.com/")) continue;
  let page = url.replace("https://jeneconk.com/", "");
  if (!page) page = "index.html";
  if (page.endsWith("/")) page += "index.html";
  if (!fs.existsSync(path.join(root, page))) errors.push(`sitemap: missing local page for ${url}`);
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`VALIDATION_FAILED ${errors.length}`);
  process.exit(1);
}

console.log(`VALIDATION_OK html=${htmlFiles.length} sitemapUrls=${urls.length}`);
