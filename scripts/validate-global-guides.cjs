const fs = require('node:fs');

const files = [
  'ai-lesson-planning-guide-for-teachers.html',
  'ai-report-card-comments-guide.html',
  'ai-tools-for-special-education-teachers.html',
  'ai-tools-for-school-administrators.html',
  'school-ai-policy-template.html',
  'excel-inventory-management-guide.html',
  'excel-invoice-tracker-guide.html',
  'ai-grading-and-feedback-guide.html'
];

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const schemas = [...source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (schemas.length !== 1) throw new Error(`${file}: expected one JSON-LD block`);
  JSON.parse(schemas[0][1]);

  const title = source.match(/<title>(.*?)<\/title>/)?.[1] || '';
  const description = source.match(/<meta name="description" content="(.*?)">/)?.[1] || '';
  if (title.length < 20 || title.length > 100) throw new Error(`${file}: title length ${title.length}`);
  if (description.length < 80 || description.length > 180) throw new Error(`${file}: description length ${description.length}`);
  if (!source.includes(`<link rel="canonical" href="https://jeneconk.com/${file}">`)) throw new Error(`${file}: canonical mismatch`);
  if ((source.match(/<details>/g) || []).length !== 3) throw new Error(`${file}: expected three FAQs`);
}

console.log(`GLOBAL_GUIDES_OK files=${files.length}`);
