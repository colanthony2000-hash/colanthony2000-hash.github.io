const fs = require("fs");
const path = require("path");

const root = process.cwd();
const skipDirs = new Set([".git", "archive", "oldassets"]);

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && skipDirs.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.isFile() && entry.name.endsWith(".html") ? [full] : [];
  });
}

function relativePrefix(file) {
  const relativeDir = path.relative(root, path.dirname(file));
  if (!relativeDir) return "";
  return "../".repeat(relativeDir.split(path.sep).length);
}

function activeTarget(file) {
  const name = path.basename(file);
  if (["education-suite.html", "jems.html", "business-suite.html", "smart-procurement.html", "cbt-portal.html"].includes(name)) return "products.html";
  if (["academy.html", "academy-gallery.html", "academy-moments.html"].includes(name)) return "training.html";
  return name;
}

function activeAttribute(file, target) {
  return activeTarget(file) === target ? ' aria-current="page"' : "";
}

function navigation(file, prefix) {
  const items = [
    ["education.html", "Education"],
    ["business.html", "Business"],
    ["training.html", "AI Training Academy"],
    ["resources.html", "Resources"],
    ["tools.html", "Tools"],
    ["products.html", "Products"],
    ["about.html", "Company"],
  ];

  return items
    .map(([target, label]) => `<a href="${prefix}${target}"${activeAttribute(file, target)}>${label}</a>`)
    .join("");
}

function footer(prefix) {
  return `<footer class="site-footer">
    <div class="container footer-grid">
      <div><a class="brand footer-brand" href="${prefix}index.html"><img class="brand-logo" src="${prefix}assets/logo.png" alt="" width="40" height="38"><span><strong>JENECONK</strong><small>Integrated Global Solutions</small></span></a><p>Practical technology systems for education, business, training and operational work.</p></div>
      <div><strong>Products</strong><a href="${prefix}education-suite.html">Edu Suite 2.0</a><a href="${prefix}jems.html">JEMS English Mastery</a><a href="${prefix}business-suite.html">Business Suite</a><a href="${prefix}smart-procurement.html">Smart Procurement</a><a href="${prefix}cbt-portal.html">CBT Setup Enquiry</a></div>
      <div><strong>Explore</strong><a href="${prefix}education.html">Education</a><a href="${prefix}business.html">Business</a><a href="${prefix}training.html">AI Training Academy</a><a href="${prefix}resources.html">Resources</a><a href="${prefix}tools.html">Tools</a><a href="${prefix}products.html">Products</a></div>
      <div><strong>Company &amp; Policies</strong><a href="${prefix}about.html">About</a><a href="${prefix}contact.html">Contact</a><a href="${prefix}privacy-policy.html">Privacy Policy</a><a href="${prefix}terms-of-use.html">Terms of Use</a><a href="${prefix}cookie-policy.html">Cookie Policy</a><a href="${prefix}editorial-policy.html">Editorial Policy</a><a href="${prefix}content-transparency.html">Content Transparency</a><a href="mailto:info@jeneconk.com">info@jeneconk.com</a><a href="https://wa.me/2348154008438" target="_blank" rel="noreferrer">+234 815 400 8438</a><span>Port Harcourt, Nigeria</span></div>
    </div>
  </footer>`;
}

function routeApplicationsThroughOverviews(source, file, prefix) {
  const name = path.basename(file);
  let next = source;

  if (name !== "education-suite.html") {
    next = next.replace(/href="https:\/\/edu\.jeneconk\.com\/?"(?: target="_blank")?(?: rel="noreferrer")?/g, `href="${prefix}education-suite.html"`);
    next = next.replace(/>Open Edu Suite 2\.0</g, ">Explore Edu Suite 2.0<");
    next = next.replace(/>Open Edu Suite</g, ">Explore Edu Suite<");
    next = next.replace(/>Open Education Suite</g, ">Explore Education Suite<");
  }

  if (name !== "business-suite.html") {
    next = next.replace(/href="https:\/\/business\.jeneconk\.com\/?"(?: target="_blank")?(?: rel="noreferrer")?/g, `href="${prefix}business-suite.html"`);
    next = next.replace(/>Open Business Suite</g, ">Explore Business Suite<");
  }

  return next;
}

let updated = 0;
for (const file of walk(root)) {
  let source = fs.readFileSync(file, "utf8");
  const prefix = relativePrefix(file);
  let next = source.replace(
    /(<nav class="nav" data-nav>)[\s\S]*?(<\/nav>)/,
    `$1${navigation(file, prefix)}$2`,
  );

  if (/<footer class="site-footer">[\s\S]*?<\/footer>/.test(next)) {
    next = next.replace(/<footer class="site-footer">[\s\S]*?<\/footer>/, footer(prefix));
  }

  next = routeApplicationsThroughOverviews(next, file, prefix);

  if (next !== source) {
    fs.writeFileSync(file, next);
    updated += 1;
  }
}

console.log(`NORMALIZED_NAVIGATION updated=${updated}`);
