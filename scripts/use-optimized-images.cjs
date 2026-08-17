const fs = require("fs");
const path = require("path");

const root = process.cwd();
const replacements = new Map([
  ["assets/academy/live-ai-bootcamp-class-1.png", "assets/academy/live-ai-bootcamp-class-1.webp"],
  ["assets/aitrain.png", "assets/aitrain.webp"],
  ["assets/businessflow.jpeg", "assets/businessflow.webp"],
  ["assets/cbt-service-real.png", "assets/cbt-service-real.webp"],
  ["assets/community/ogiame-atuwatse-iii-5th-coronation-anniversary.png", "assets/community/ogiame-atuwatse-iii-5th-coronation-anniversary.webp"],
  ["assets/lessonnote.png", "assets/lessonnote.webp"],
  ["assets/products/jems-platform.png", "assets/products/jems-platform.webp"],
  ["assets/products/smart-procurement-dashboard.png", "assets/products/smart-procurement-dashboard.webp"],
  ["assets/success-stories/rccg-rivers-family-ai-training-hands-on.png", "assets/success-stories/rccg-rivers-family-ai-training-hands-on.webp"],
  ["assets/success-stories/rccg-rivers-family-ai-training-interactive.png", "assets/success-stories/rccg-rivers-family-ai-training-interactive.webp"],
]);

const skip = new Set(["archive", "oldassets", ".git"]);
function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && skip.has(entry.name)) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.isFile() && /\.(?:html|css)$/i.test(entry.name) ? [full] : [];
  });
}

let updated = 0;
for (const file of walk(root)) {
  let source = fs.readFileSync(file, "utf8");
  let next = source;
  const prefix = path.relative(root, path.dirname(file)).split(path.sep).filter(Boolean).map(() => "../").join("");
  for (const [before, after] of replacements) {
    next = next.replaceAll(prefix + before, prefix + after);
    if (!prefix) next = next.replaceAll(before, after);
  }
  if (path.basename(file) === "styles.css") {
    next = next.replaceAll('url("lessonnote.png")', 'url("lessonnote.webp")');
    next = next.replaceAll('url("businessflow.jpeg")', 'url("businessflow.webp")');
  }
  if (next !== source) {
    fs.writeFileSync(file, next);
    updated += 1;
  }
}
console.log(`OPTIMIZED_IMAGE_REFERENCES updated=${updated}`);
