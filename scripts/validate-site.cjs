const fs = require("fs");
const path = require("path");

const root = process.cwd();
const skipDirs = new Set([".git", "archive", "oldassets"]);
const skipHtmlFiles = new Set(["404.html"]);
const policyFiles = ["privacy-policy.html", "terms-of-use.html", "cookie-policy.html", "editorial-policy.html", "content-transparency.html"];
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
  const sourceIsNoindex = /name="robots" content="noindex/i.test(source);

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
    if (!fs.existsSync(target)) {
      errors.push(`${relative}: missing local target ${match[1]}`);
    } else if (!sourceIsNoindex && target.endsWith(".html") && /name="robots" content="noindex/i.test(fs.readFileSync(target, "utf8"))) {
      errors.push(`${relative}: indexed page links to noindex target ${match[1]}`);
    }
  }

  if (source.includes('<footer class="site-footer">')) {
    for (const policy of policyFiles) {
      const prefix = path.relative(root, path.dirname(file)).split(path.sep).filter(Boolean).map(() => "../").join("");
      if (!source.includes(`href="${prefix}${policy}"`)) errors.push(`${relative}: footer missing ${policy}`);
    }
  }

  if (/name="robots" content="noindex/i.test(source) && /pagead2\.googlesyndication\.com/.test(source)) {
    errors.push(`${relative}: noindex page must not load AdSense`);
  }

  if (/<form[^>]+action=["']mailto:/i.test(source)) errors.push(`${relative}: form depends on a mail client`);
}

for (const policy of policyFiles) {
  if (!fs.existsSync(path.join(root, policy))) errors.push(`missing required policy page ${policy}`);
}

const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
if (urls.includes("https://maths.jeneconk.com/maths.html")) errors.push("sitemap: obsolete Maths 404 URL");
for (const url of urls) {
  if (!url.startsWith("https://jeneconk.com/")) continue;
  let page = url.replace("https://jeneconk.com/", "");
  if (!page) page = "index.html";
  if (page.endsWith("/")) page += "index.html";
  const full = path.join(root, page);
  if (!fs.existsSync(full)) errors.push(`sitemap: missing local page for ${url}`);
  if (fs.existsSync(full) && /name="robots" content="noindex/i.test(fs.readFileSync(full, "utf8"))) {
    errors.push(`sitemap: noindex page included ${url}`);
  }
}

const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
for (const match of homepage.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) {
  const target = localTarget(path.join(root, "index.html"), match[1]);
  if (target && fs.existsSync(target) && fs.statSync(target).size > 400_000) {
    errors.push(`index.html: homepage image exceeds 400 KB ${match[1]}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`VALIDATION_FAILED ${errors.length}`);
  process.exit(1);
}

console.log(`VALIDATION_OK html=${htmlFiles.length} sitemapUrls=${urls.length}`);
