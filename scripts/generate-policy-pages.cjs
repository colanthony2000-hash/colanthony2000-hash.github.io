const fs = require("fs");
const path = require("path");

const root = process.cwd();
const updated = "17 August 2026";

const pages = [
  {
    file: "privacy-policy.html",
    title: "Privacy Policy",
    description: "How JENECONK collects, uses, protects, and shares personal information submitted through jeneconk.com.",
    intro: "This policy explains what information JENECONK Integrated Global Solutions Ltd receives through this website, why we use it, and the choices available to you.",
    sections: [
      ["Information we collect", `<p>We may receive information you choose to provide, including your name, email address, telephone number, organisation, area of interest, and the content of an enquiry. We also receive limited technical information such as browser type, device type, referring page, approximate location, and pages visited when analytics, advertising, or security services are active.</p>`],
      ["How we use information", `<ul><li>Respond to enquiries, arrange demonstrations, and provide requested support.</li><li>Deliver products, training, tools, and services you request.</li><li>Protect the website, prevent abuse, and diagnose technical problems.</li><li>Understand which pages and resources are useful and improve the site.</li><li>Meet legal, accounting, and regulatory obligations.</li></ul>`],
      ["Contact form and service providers", `<p>The contact form is delivered through FormSubmit, which processes the submitted information so it can reach our business email. Our website is hosted through GitHub Pages and may use Google services, including AdSense and its consent tools. These providers may process limited data under their own terms and privacy notices.</p><p>Do not submit passwords, card details, health records, student records, examination answers, or other highly sensitive information through the general contact form.</p>`],
      ["Advertising, cookies, and consent", `<p>Google AdSense may use cookies or similar technologies to serve, measure, and protect advertising. Where consent is legally required, visitors may be shown a Google-certified consent message before relevant storage or personalised advertising is used. More information is available in our <a href="cookie-policy.html">Cookie Policy</a>.</p>`],
      ["How long we keep information", `<p>We keep enquiry records only for as long as reasonably necessary to respond, maintain appropriate business records, resolve disputes, and meet legal obligations. Retention periods depend on the nature of the relationship and the information involved.</p>`],
      ["Your choices and rights", `<p>You may ask us to explain, correct, update, or delete personal information we hold about you, subject to applicable legal exceptions. You may also object to certain processing or withdraw consent where consent is the basis for processing.</p><p>Send privacy requests to <a href="mailto:info@jeneconk.com">info@jeneconk.com</a>. We may need to verify your identity before acting on a request.</p>`],
      ["Children and school information", `<p>This parent website is intended for general information, product discovery, and business enquiries. Children should not submit personal information through the contact form without the involvement of a parent, guardian, teacher, or authorised school representative. Schools using separate JENECONK products should review the privacy information provided for those products.</p>`],
      ["Data protection and contact", `<p>JENECONK is based in Port Harcourt, Nigeria and aims to handle personal information in line with applicable Nigerian data-protection requirements. Questions or complaints may be sent to <a href="mailto:info@jeneconk.com">info@jeneconk.com</a> or through our <a href="contact.html">contact page</a>.</p>`],
    ],
  },
  {
    file: "terms-of-use.html",
    title: "Terms of Use",
    description: "Terms governing access to jeneconk.com, its free resources, calculators, product information, and external application links.",
    intro: "These terms apply when you browse jeneconk.com or use the free information and utilities available on the parent website.",
    sections: [
      ["Using this website", `<p>You may use the website for lawful personal, educational, and business purposes. You must not attempt to disrupt the site, bypass security controls, submit malicious material, scrape it in a way that harms availability, or misrepresent JENECONK content as your own.</p>`],
      ["Educational information", `<p>Articles, calculators, examples, templates, and guides are provided for general learning and productivity. They are not a substitute for professional legal, financial, medical, tax, regulatory, or examination advice. Verify important decisions with a suitably qualified professional or relevant institution.</p>`],
      ["Free tools and generated results", `<p>Free tools may produce estimates based on the information entered. You are responsible for reviewing results before relying on them. School policies, grading systems, tax rules, prices, and institutional requirements can differ, so a result should not be treated as an official determination unless the responsible authority confirms it.</p>`],
      ["Products and separate services", `<p>JENECONK products and subdomains may have additional terms, privacy notices, pricing, account rules, and acceptable-use requirements. If separate product terms conflict with these parent-site terms, the product-specific terms govern that product.</p>`],
      ["Intellectual property", `<p>Unless otherwise stated, the website design, original writing, product names, graphics, templates, and downloadable materials belong to JENECONK or are used with permission. You may quote short portions with attribution and link to the original page. Republishing complete articles, selling free materials, or removing branding requires written permission.</p>`],
      ["External links", `<p>The site links to JENECONK applications and third-party services. External sites control their own availability, security, content, and policies. A link does not mean JENECONK guarantees every statement, service, or transaction on the destination.</p>`],
      ["Availability and changes", `<p>We work to keep information accurate and services available, but we do not promise uninterrupted access. Features, prices, URLs, and content may change. Material changes to these terms will be reflected by the updated date on this page.</p>`],
      ["Liability and contact", `<p>To the extent permitted by applicable law, JENECONK is not responsible for indirect loss resulting from reliance on general website information, temporary unavailability, or misuse of a free tool. Nothing in these terms excludes rights or responsibilities that cannot lawfully be excluded.</p><p>Questions may be sent to <a href="mailto:info@jeneconk.com">info@jeneconk.com</a>.</p>`],
    ],
  },
  {
    file: "cookie-policy.html",
    title: "Cookie Policy",
    description: "Information about cookies, advertising technologies, consent choices, and browser controls on jeneconk.com.",
    intro: "This page explains how cookies and similar technologies may be used on jeneconk.com and how visitors can control them.",
    sections: [
      ["What cookies are", `<p>Cookies are small text files stored by a browser. Similar technologies can store or read identifiers for security, preferences, measurement, and advertising. Some are necessary for a service to work; others depend on your choices or local legal requirements.</p>`],
      ["How this site may use them", `<ul><li>Maintain security and prevent fraudulent or abusive traffic.</li><li>Remember privacy and consent choices.</li><li>Measure page performance and understand aggregate usage.</li><li>Serve and measure advertising through Google AdSense.</li></ul>`],
      ["Google AdSense", `<p>JENECONK uses Google AdSense publisher code. Google and its advertising partners may use cookies or similar technologies to deliver, limit, personalise, and measure ads, depending on your region and consent choices. Advertising partners may receive technical information such as browser identifiers, device details, approximate location, and interactions with ads.</p>`],
      ["Consent choices", `<p>Where required, a Google-certified consent message may allow you to consent, decline, or manage available purposes and vendors. Your choice is generally remembered until the message is updated, consent must be collected again, or browser storage is cleared.</p>`],
      ["Browser controls", `<p>You can delete or block cookies through your browser settings. Blocking all storage may affect consent memory, embedded services, sign-in features on linked applications, or parts of the website. Browser controls do not automatically stop all server-side logs or every form of measurement.</p>`],
      ["Updates and questions", `<p>Services and regulatory requirements change, so this policy may be updated. For questions about our use of cookies, contact <a href="mailto:info@jeneconk.com">info@jeneconk.com</a>. See the <a href="privacy-policy.html">Privacy Policy</a> for broader information about personal data.</p>`],
    ],
  },
  {
    file: "editorial-policy.html",
    title: "Editorial Policy",
    description: "The standards JENECONK follows when researching, reviewing, updating, correcting, and publishing educational resources.",
    intro: "JENECONK publishes practical education, technology, business, and professional-development resources. This policy explains the standard readers should expect.",
    sections: [
      ["Our editorial purpose", `<p>We publish material that helps readers understand a subject, complete a task, compare realistic options, or make better use of technology. Pages should answer a clear reader need and contain enough original explanation, examples, or practical guidance to stand on their own.</p>`],
      ["Research and accuracy", `<p>Writers and reviewers should use primary or authoritative sources where accuracy depends on laws, standards, product features, examinations, safety, or technical documentation. Facts that can change should be checked close to publication and reviewed when material changes occur.</p>`],
      ["Human review", `<p>Every substantive guide should receive human review for accuracy, usefulness, tone, originality, and product claims before publication. Artificial intelligence may assist with planning, transcription, structure, or early drafting, but it is not treated as the final authority and must not replace subject review.</p>`],
      ["Product references", `<p>JENECONK may mention its own products when they genuinely help with the reader's task. Product references should be clearly identifiable and must not replace the educational substance of an article. Comparisons should acknowledge meaningful strengths and limitations rather than misrepresent alternatives.</p>`],
      ["Authorship and expertise", `<p>Where an article relies on professional experience, teaching practice, training delivery, or original examples, the responsible author or reviewer should be identified. Organisational bylines may be used for company documentation, but substantial educational guides should increasingly include named authorship and relevant experience.</p>`],
      ["Corrections and updates", `<p>Material errors should be corrected promptly. Significant corrections should be noted on the page when the original error could have affected a reader's decision. Updated dates should reflect meaningful editorial changes, not automatic date changes.</p>`],
      ["Feedback", `<p>Readers can report an error, unclear explanation, broken resource, or undisclosed conflict through <a href="contact.html">the contact page</a> or by emailing <a href="mailto:info@jeneconk.com">info@jeneconk.com</a>. Please include the page URL and the specific passage involved.</p>`],
    ],
  },
  {
    file: "content-transparency.html",
    title: "Content Transparency",
    description: "How JENECONK identifies authorship, product relationships, AI assistance, demonstrations, comparisons, and planned features.",
    intro: "Readers should be able to tell who published a page, why it exists, what evidence supports it, and where JENECONK has a commercial interest.",
    sections: [
      ["Who publishes this site", `<p>jeneconk.com is published by JENECONK Integrated Global Solutions Ltd, Port Harcourt, Nigeria. The site introduces JENECONK products and training while also publishing free educational resources and utilities.</p>`],
      ["AI-assisted work", `<p>JENECONK develops and teaches AI-supported workflows. AI tools may assist with outlines, language refinement, examples, transcription, code suggestions, or image concepts. Human responsibility remains with the named author, reviewer, or JENECONK editorial team. We do not intentionally publish unreviewed AI output as authoritative guidance.</p>`],
      ["Commercial relationships", `<p>Links to Edu Suite, JEMS, Business Suite, Smart Procurement, the Digital Academy, and other JENECONK services promote products operated or supported by JENECONK. Articles should still provide useful information before asking readers to visit a product.</p>`],
      ["Advertising", `<p>The site uses Google AdSense publisher code and may display third-party advertising after approval and subject to consent requirements. An advertisement does not represent a JENECONK endorsement of every advertised claim, product, or destination.</p>`],
      ["Screenshots, samples, and demonstrations", `<p>Product screenshots should represent real interfaces or clearly labelled previews. Sample documents and calculated outputs are illustrative unless identified as actual customer work. Personal or confidential information should be removed from public examples.</p>`],
      ["Current and planned functionality", `<p>Product pages should distinguish working features from pilots, previews, roadmap items, or planned functionality. JENECONK does not guarantee examination scores, business outcomes, procurement savings, or other results that depend on a user's circumstances and actions.</p>`],
      ["Sponsored and affiliate content", `<p>If JENECONK publishes sponsored content, accepts a material benefit for coverage, or uses an affiliate link, the relationship should be disclosed clearly on the relevant page. At the date shown above, ordinary product links on the parent site primarily lead to JENECONK's own services.</p>`],
    ],
  },
];

function footer() {
  return `<footer class="site-footer"><div class="container footer-grid"><div><a class="brand footer-brand" href="index.html"><img class="brand-logo" src="assets/logo.png" alt="" width="40" height="38"><span><strong>JENECONK</strong><small>Integrated Global Solutions</small></span></a><p>Practical technology systems for education, business, training and operational work.</p></div><div><strong>Products</strong><a href="education-suite.html">Edu Suite 2.0</a><a href="jems.html">JEMS English Mastery</a><a href="business-suite.html">Business Suite</a><a href="smart-procurement.html">Smart Procurement</a><a href="cbt-portal.html">CBT Setup Enquiry</a></div><div><strong>Explore</strong><a href="education.html">Education</a><a href="business.html">Business</a><a href="training.html">AI Training Academy</a><a href="resources.html">Resources</a><a href="tools.html">Tools</a><a href="products.html">Products</a></div><div><strong>Company &amp; Policies</strong><a href="about.html">About</a><a href="contact.html">Contact</a><a href="privacy-policy.html">Privacy Policy</a><a href="terms-of-use.html">Terms of Use</a><a href="cookie-policy.html">Cookie Policy</a><a href="editorial-policy.html">Editorial Policy</a><a href="content-transparency.html">Content Transparency</a><a href="mailto:info@jeneconk.com">info@jeneconk.com</a><span>Port Harcourt, Nigeria</span></div></div></footer>`;
}

function render(page) {
  const links = pages.map((item) => `<a href="${item.file}"${item.file === page.file ? ' aria-current="page"' : ""}>${item.title}</a>`).join("");
  const sections = page.sections.map(([title, body]) => `<section><h2>${title}</h2>${body}</section>`).join("\n");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title} | JENECONK</title>
  <meta name="description" content="${page.description}">
  <link rel="canonical" href="https://jeneconk.com/${page.file}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/styles.css?v=20260817-1">
  <link rel="icon" href="favicon.ico" sizes="any">
  <meta name="theme-color" content="#07111f">
  <meta property="og:site_name" content="JENECONK Integrated Global Solutions Ltd">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${page.title} | JENECONK">
  <meta property="og:description" content="${page.description}">
  <meta property="og:url" content="https://jeneconk.com/${page.file}">
  <meta property="og:image" content="https://jeneconk.com/assets/og-preview.svg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="google-adsense-account" content="ca-pub-1616319355564791">
</head>
<body>
  <header class="site-header" data-header><a class="brand" href="index.html" aria-label="JENECONK home"><img class="brand-logo" src="assets/logo.png" alt="" width="40" height="38"><span><strong>JENECONK</strong><small>Integrated Global Solutions</small></span></a><button class="nav-toggle" type="button" data-nav-toggle aria-label="Open navigation"><span></span><span></span><span></span></button><nav class="nav" data-nav><a href="education.html">Education</a><a href="business.html">Business</a><a href="training.html">AI Training Academy</a><a href="resources.html">Resources</a><a href="tools.html">Tools</a><a href="products.html">Products</a><a href="about.html">Company</a></nav></header>
  <main>
    <section class="page-hero section-pad"><div class="container narrow"><p class="eyebrow">Trust and transparency</p><h1>${page.title}</h1><p>${page.intro}</p><p><strong>Last updated:</strong> ${updated}</p></div></section>
    <section class="section-pad"><div class="container policy-shell"><article class="policy-content"><p class="policy-note">This page applies to the JENECONK parent website. Separate applications may provide additional product-specific terms or privacy information.</p>${sections}</article><aside class="policy-nav" aria-label="Policies"><strong>Policies and standards</strong>${links}</aside></div></section>
  </main>
  ${footer()}
  <script src="assets/main.js"></script>
</body>
</html>`;
}

for (const page of pages) fs.writeFileSync(path.join(root, page.file), render(page));
console.log(`POLICY_PAGES_GENERATED count=${pages.length}`);
