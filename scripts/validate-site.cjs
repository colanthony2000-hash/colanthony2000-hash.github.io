const fs = require("fs");
const path = require("path");

const root = process.cwd();
const skipDirs = new Set([".git", "archive", "oldassets"]);
const skipHtmlFiles = new Set(["404.html"]);
const policyFiles = ["privacy-policy.html", "terms-of-use.html", "cookie-policy.html", "editorial-policy.html", "content-transparency.html"];
const strengthenedAudiencePages = [
  "edu-suite-for-primary-schools.html",
  "edu-suite-for-secondary-schools.html",
  "edu-suite-for-private-schools.html",
  "edu-suite-for-government-schools.html",
  "edu-suite-for-montessori-schools.html",
  "edu-suite-for-cambridge-schools.html",
  "solutions-for-churches.html",
  "solutions-for-ngos.html",
  "solutions-for-hotels.html",
  "solutions-for-smes.html",
  "solutions-for-government.html",
];
const strengthenedLocationPages = [
  "school-management-software-lagos.html",
  "school-management-software-abuja.html",
  "school-management-software-port-harcourt.html",
  "school-management-software-kano.html",
  "school-management-software-enugu.html",
  "school-management-software-yobe-state-damaturu.html",
];
const substantialResourcePages = [
  ["sql-for-data-analysis-beginners-guide.html", 1800],
  ["wireshark-for-beginners-packet-analysis-guide.html", 1800],
];
const strengthenedCorePages = [
  ["about.html", 525],
  ["solutions.html", 550],
  ["education-suite.html", 625],
  ["products.html", 575],
  ["edu-suite-vs-microsoft-word.html", 525],
  ["edu-suite-vs-manual-lesson-notes.html", 525],
  ["best-school-management-software-nigeria.html", 550],
  ["sample-lesson-notes.html", 550],
  ["sample-report-comments.html", 525],
  ["lesson-note-generator.html", 525],
  ["report-comment-generator.html", 475],
  ["scheme-of-work-generator.html", 475],
  ["assessment-generator.html", 475],
  ["record-of-work-generator.html", 450],
  ["teacher-productivity.html", 500],
  ["ict-solutions.html", 500],
  ["academy-gallery.html", 450],
  ["academy-moments.html", 450],
  ["business.html", 550],
  ["business-suite.html", 525],
  ["cbt-portal.html", 500],
  ["success-stories/index.html", 375],
  ["continuous-assessment-guide.html", 550],
  ["business-document-templates-guide.html", 550],
  ["ai-for-schools.html", 525],
  ["excel-for-school-administration.html", 525],
  ["success-stories/ai-bootcamp-guided-practice.html", 750],
];
const strengthenedToolPages = [
  "age-calculator.html",
  "waec-grade-calculator.html",
  "school-fee-calculator.html",
  "lesson-duration-calculator.html",
  "exam-score-percentage-calculator.html",
  "term-average-calculator.html",
  "invoice-generator.html",
  "cv-checker.html",
];
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
  /cbt\.jeneconk\.com/i,
  /jeneconk-study-coach\.vercel\.app/i,
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

function visibleWordCount(source) {
  const plain = source
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z0-9#]+;/gi, " ");
  return (plain.match(/\b[\p{L}\p{N}'-]+\b/gu) || []).length;
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

for (const page of strengthenedAudiencePages) {
  const source = fs.readFileSync(path.join(root, page), "utf8");
  const words = visibleWordCount(source);
  if (words < 600) errors.push(`${page}: strengthened audience page is too thin (${words} words)`);
  if (!source.includes('"@type":"FAQPage"')) errors.push(`${page}: missing FAQPage structured data`);
}

for (const [page, minimumWords] of substantialResourcePages) {
  const source = fs.readFileSync(path.join(root, page), "utf8");
  const words = visibleWordCount(source);
  if (words < minimumWords) errors.push(`${page}: substantial resource is too thin (${words} words)`);
  if (!source.includes('"@type": "Article"')) errors.push(`${page}: missing Article structured data`);
  if (!source.includes('"@type": "FAQPage"')) errors.push(`${page}: missing FAQPage structured data`);
}

for (const [page, minimumWords] of strengthenedCorePages) {
  const source = fs.readFileSync(path.join(root, page), "utf8");
  const words = visibleWordCount(source);
  if (words < minimumWords) errors.push(`${page}: strengthened core page is too thin (${words} words)`);
}

for (const page of strengthenedToolPages) {
  const words = visibleWordCount(fs.readFileSync(path.join(root, page), "utf8"));
  if (words < 350) errors.push(`${page}: practical tool page is too thin (${words} words)`);
}

const timetableFallback = fs.readFileSync(path.join(root, "tools/class-timetable-generator/index.html"), "utf8");
if (visibleWordCount(timetableFallback) < 250) errors.push("tools/class-timetable-generator/index.html: crawlable fallback is too thin");

const studyCoach = fs.readFileSync(path.join(root, "study-coach.html"), "utf8");
if (visibleWordCount(studyCoach) < 1000) errors.push("study-coach.html: product overview is too thin");
if (!studyCoach.includes('"@type": "SoftwareApplication"')) errors.push("study-coach.html: missing SoftwareApplication structured data");
if (!studyCoach.includes('"@type": "FAQPage"')) errors.push("study-coach.html: missing FAQPage structured data");
if (!studyCoach.includes("https://studycoach.jeneconk.com/")) errors.push("study-coach.html: missing branded live application URL");
for (const page of ["index.html", "education.html", "products.html", "academy.html", "site-index.html"]) {
  if (!fs.readFileSync(path.join(root, page), "utf8").includes('href="study-coach.html"')) {
    errors.push(`${page}: missing Study Coach overview link`);
  }
}

const locationHub = fs.readFileSync(path.join(root, "school-software-support-nigeria.html"), "utf8");
if (visibleWordCount(locationHub) < 900) errors.push("school-software-support-nigeria.html: consolidated location guide is too thin");
for (const page of strengthenedLocationPages) {
  const source = fs.readFileSync(path.join(root, page), "utf8");
  const url = `https://jeneconk.com/${page}`;
  const words = visibleWordCount(source);
  if (words < 800) errors.push(`${page}: strengthened location page is too thin (${words} words)`);
  if (/name="robots" content="noindex/i.test(source)) errors.push(`${page}: strengthened location page must be indexable`);
  if (!source.includes(`rel="canonical" href="${url}"`)) errors.push(`${page}: missing self-referencing canonical`);
  if (!source.includes('"@type":"FAQPage"')) errors.push(`${page}: missing FAQPage structured data`);
  if (!urls.includes(url)) errors.push(`sitemap: strengthened location URL missing ${url}`);
}

const homepage = fs.readFileSync(path.join(root, "index.html"), "utf8");
if (/class="launch-strip"[^>]+aria-label=/i.test(homepage)) {
  errors.push("index.html: launch strip must use its visible text as its accessible name");
}
for (const match of homepage.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)) {
  const target = localTarget(path.join(root, "index.html"), match[1]);
  if (target && fs.existsSync(target) && fs.statSync(target).size > 400_000) {
    errors.push(`index.html: homepage image exceeds 400 KB ${match[1]}`);
  }
}

const products = fs.readFileSync(path.join(root, "products.html"), "utf8");
if (products.includes('class="story-image"') && !products.includes("assets/success-stories.css")) {
  errors.push("products.html: story images require the responsive success-stories stylesheet");
}

const academyDemo = path.join(root, "assets", "academy", "maths-and-english-bot-child-demo.mp4");
if (fs.existsSync(academyDemo) && fs.statSync(academyDemo).size > 5_000_000) {
  errors.push("academy demo video exceeds the 5 MB delivery budget");
}

for (const file of htmlFiles) {
  const source = fs.readFileSync(file, "utf8");
  for (const match of source.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch (error) {
      errors.push(`${path.relative(root, file)}: invalid JSON-LD (${error.message})`);
    }
  }
}

const geoCorePages = ["about.html", "products.html", "education-suite.html", "training.html", "academy.html", "jems.html", "business-suite.html", "smart-procurement.html", "resources.html", "tools.html"];
for (const page of geoCorePages) {
  const source = fs.readFileSync(path.join(root, page), "utf8");
  if (!source.includes('data-geo-aeo="entity-clarity"')) errors.push(`${page}: missing GEO/AEO entity-clarity section`);
  if (!source.includes('data-geo-aeo="20260823"')) errors.push(`${page}: missing GEO/AEO structured data`);
}

const geoAuthorityPages = ["how-to-write-lesson-notes.html", "how-to-prepare-scheme-of-work.html", "continuous-assessment-guide.html", "50-ai-tools-for-teachers-2026.html", "prompt-engineering-for-teachers.html", "ai-for-schools.html", "ai-and-prompt-engineering-professional-guide.html", "sql-for-data-analysis-beginners-guide.html", "wireshark-for-beginners-packet-analysis-guide.html", "excel-formulas-for-business-owners.html", "excel-inventory-management-guide.html", "business-document-templates-guide.html"];
for (const page of geoAuthorityPages) {
  const source = fs.readFileSync(path.join(root, page), "utf8");
  if (!source.includes('data-geo-aeo="answer-engine"')) errors.push(`${page}: missing answer-engine section`);
  if (!source.includes('data-geo-aeo="20260823"')) errors.push(`${page}: missing GEO/AEO structured data`);
}

const geoBaseline = fs.readFileSync(path.join(root, ".github", "geo-aeo-baseline.md"), "utf8");
const baselineQuestions = [...geoBaseline.matchAll(/^\d+\.\s+/gm)].length;
if (baselineQuestions < 20 || baselineQuestions > 30) errors.push(`GEO/AEO baseline must contain 20-30 questions (found ${baselineQuestions})`);
if (/currently ranks|already ranks/i.test(geoBaseline)) errors.push("GEO/AEO baseline must not claim current rankings");

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(`VALIDATION_FAILED ${errors.length}`);
  process.exit(1);
}

console.log(`VALIDATION_OK html=${htmlFiles.length} sitemapUrls=${urls.length}`);
