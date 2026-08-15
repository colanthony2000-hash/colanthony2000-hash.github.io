const fs = require("fs");
const cp = require("child_process");

const today = new Date().toISOString().slice(0, 10);
const explicitPages = new Set(["resources.html"]);

const changedPages = cp
  .execSync("git diff --name-only", { encoding: "utf8" })
  .split(/\r?\n/)
  .filter((file) => file.endsWith(".html"));

for (const page of changedPages) explicitPages.add(page.replace(/\\/g, "/"));

function pageToUrl(page) {
  if (page === "index.html") return "https://jeneconk.com/";
  if (page === "tools/class-timetable-generator/index.html") {
    return "https://jeneconk.com/tools/class-timetable-generator/";
  }
  return `https://jeneconk.com/${page}`;
}

let sitemap = fs.readFileSync("sitemap.xml", "utf8");
const updated = [];

for (const page of explicitPages) {
  const url = pageToUrl(page);
  const old = sitemap;
  const start = `<url><loc>${url}</loc><lastmod>`;
  const startIndex = sitemap.indexOf(start);
  if (startIndex === -1) continue;
  const dateStart = startIndex + start.length;
  const dateEnd = sitemap.indexOf("</lastmod>", dateStart);
  if (dateEnd === -1) continue;
  sitemap = `${sitemap.slice(0, dateStart)}${today}${sitemap.slice(dateEnd)}`;
  if (sitemap !== old) updated.push(url);
}

fs.writeFileSync("sitemap.xml", sitemap, "utf8");
console.log(updated.sort().join("\n"));
console.error(`updated=${updated.length}`);
