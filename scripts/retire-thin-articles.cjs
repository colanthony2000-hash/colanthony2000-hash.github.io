const fs = require("fs");
const path = require("path");

const root = process.cwd();
const retired = [
  "ai-for-office-administration.html",
  "ai-for-small-business-productivity.html",
  "ai-integrated-web-development.html",
  "ai-policy-for-schools-nigeria.html",
  "ai-powered-data-analysis-excel-powerbi.html",
  "ai-tools-for-teachers-nigeria.html",
  "career-roadmap-data-analyst-nigeria.html",
  "coding-bootcamp-for-secondary-school-students.html",
  "coding-for-kids-nigeria.html",
  "cybersecurity-awareness-for-schools.html",
  "cybersecurity-for-small-businesses.html",
  "data-analysis-for-beginners-nigeria.html",
  "data-analysis-for-school-administrators.html",
  "data-cleaning-in-excel.html",
  "data-privacy-for-schools-nigeria.html",
  "excel-dashboard-for-school-management.html",
  "excel-skills-for-office-admins.html",
  "excel-vs-google-sheets-for-schools.html",
  "password-and-2fa-guide.html",
  "phishing-awareness-training-nigeria.html",
  "power-bi-for-business-reporting.html",
  "python-for-beginners-nigeria.html",
  "web-development-roadmap-nigeria.html",
];

const adsenseScript = /\s*<meta name="google-adsense-account"[^>]*>\s*<script async src="https:\/\/pagead2\.googlesyndication\.com\/pagead\/js\/adsbygoogle\.js\?client=ca-pub-1616319355564791"\s*crossorigin="anonymous"><\/script>/g;

for (const file of retired) {
  const full = path.join(root, file);
  let source = fs.readFileSync(full, "utf8");
  source = source.replace(adsenseScript, "");
  if (!/name="robots"/i.test(source)) {
    source = source.replace(/(<meta name="description"[^>]*>)/, '$1\n  <meta name="robots" content="noindex, follow">');
  }
  fs.writeFileSync(full, source);
}

let sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8");
for (const file of retired) {
  const escaped = file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  sitemap = sitemap.replace(new RegExp(`\\s*<url><loc>https://jeneconk\\.com/${escaped}<\\/loc>[\\s\\S]*?<\\/url>`, "g"), "");
}
fs.writeFileSync(path.join(root, "sitemap.xml"), sitemap);

for (const indexFile of ["resources.html", "site-index.html"]) {
  const full = path.join(root, indexFile);
  let source = fs.readFileSync(full, "utf8");
  for (const file of retired) {
    const escaped = file.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    source = source.replace(new RegExp(`<article class="link-card">(?:(?!<\\/article>)[\\s\\S])*?href="${escaped}"(?:(?!<\\/article>)[\\s\\S])*?<\\/article>`, "g"), "");
    source = source.replace(new RegExp(`\\s*<a href="${escaped}">[^<]*<\\/a>`, "g"), "");
  }
  fs.writeFileSync(full, source);
}

const replacementLinks = new Map([
  ["ai-for-office-administration.html", "ai-and-prompt-engineering-professional-guide.html"],
  ["ai-for-small-business-productivity.html", "business-document-templates-guide.html"],
  ["ai-integrated-web-development.html", "training.html"],
  ["ai-policy-for-schools-nigeria.html", "school-ai-policy-template.html"],
  ["ai-powered-data-analysis-excel-powerbi.html", "sql-for-data-analysis-beginners-guide.html"],
  ["ai-tools-for-teachers-nigeria.html", "ai-lesson-planning-guide-for-teachers.html"],
  ["career-roadmap-data-analyst-nigeria.html", "sql-for-data-analysis-beginners-guide.html"],
  ["coding-bootcamp-for-secondary-school-students.html", "academy.html"],
  ["coding-for-kids-nigeria.html", "academy.html"],
  ["cybersecurity-awareness-for-schools.html", "school-ai-policy-template.html"],
  ["cybersecurity-for-small-businesses.html", "business.html"],
  ["data-analysis-for-beginners-nigeria.html", "sql-for-data-analysis-beginners-guide.html"],
  ["data-analysis-for-school-administrators.html", "excel-for-school-administration.html"],
  ["data-cleaning-in-excel.html", "excel-inventory-management-guide.html"],
  ["data-privacy-for-schools-nigeria.html", "privacy-policy.html"],
  ["excel-dashboard-for-school-management.html", "excel-for-school-administration.html"],
  ["excel-skills-for-office-admins.html", "excel-formulas-for-business-owners.html"],
  ["excel-vs-google-sheets-for-schools.html", "excel-for-school-administration.html"],
  ["password-and-2fa-guide.html", "school-ai-policy-template.html"],
  ["phishing-awareness-training-nigeria.html", "school-ai-policy-template.html"],
  ["power-bi-for-business-reporting.html", "sql-for-data-analysis-beginners-guide.html"],
  ["python-for-beginners-nigeria.html", "training.html"],
  ["web-development-roadmap-nigeria.html", "training.html"],
]);

for (const file of fs.readdirSync(root).filter((name) => name.endsWith(".html") && !retired.includes(name))) {
  const full = path.join(root, file);
  let source = fs.readFileSync(full, "utf8");
  for (const [before, after] of replacementLinks) {
    source = source.replaceAll(`href="${before}"`, `href="${after}"`);
    source = source.replaceAll(`href="https://jeneconk.com/${before}"`, `href="https://jeneconk.com/${after}"`);
  }
  fs.writeFileSync(full, source);
}

console.log(`RETIRED_THIN_ARTICLES count=${retired.length}`);
