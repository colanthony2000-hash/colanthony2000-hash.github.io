const fs = require("fs");
const path = require("path");

const today = "2026-08-04";

// These early resource drafts stay out of indexing and ad delivery until each
// topic receives a substantive, individually reviewed rewrite.
const ads = `<meta name="robots" content="noindex, follow">`;

const articles = [
  {
    slug: "ai-tools-for-teachers-nigeria",
    cat: "AI for Education",
    title: "AI Tools for Teachers in Nigeria: A Practical Guide",
    desc: "A practical guide to AI tools Nigerian teachers can use for lesson notes, assessments, report comments, teaching visuals, and classroom productivity.",
    intent: "Teachers are searching for AI help that respects the Nigerian classroom, not generic theory.",
    primary: "education.html",
    primaryText: "Explore the Education Hub",
    related: [["lesson-note-generator.html", "Lesson note generator"], ["report-comment-generator.html", "Report comment generator"], ["ai-for-schools.html", "AI for schools"]],
    points: ["Use AI to draft lesson notes, then review objectives, examples, and local context before teaching.", "Generate assessments at multiple difficulty levels so pupils are tested fairly, not only quickly.", "Create report comment drafts that teachers can personalize for each learner.", "Use diagrams, tables, and teaching visuals to make abstract topics easier to explain.", "Keep a school policy for accuracy, privacy, and responsible classroom use."],
    mistakes: ["Copying AI output directly without checking curriculum fit.", "Using foreign examples where local examples would help learners more.", "Entering private learner information into tools without a school-approved process."]
  },
  {
    slug: "prompt-engineering-for-teachers",
    cat: "AI for Education",
    title: "Prompt Engineering for Teachers: Better Lesson Notes, Questions, and Reports",
    desc: "Learn prompt writing techniques teachers can use to get clearer lesson notes, assessments, classroom activities, and report comments from AI.",
    intent: "A good prompt turns AI from a guessing tool into a teaching assistant with context.",
    primary: "training.html",
    primaryText: "Explore AI Training",
    related: [["education-suite.html", "Edu Suite 2.0"], ["lesson-note-generator.html", "Lesson note generator"], ["resources.html", "Resource center"]],
    points: ["State the class, subject, topic, duration, curriculum style, and learner level.", "Ask for output in the exact format needed, such as tabular, 5E, Montessori, British, or microteaching.", "Request examples that fit the learner environment.", "Ask AI to produce alternatives for slow, average, and fast learners.", "End prompts with a review instruction: check clarity, age level, and assessment alignment."],
    mistakes: ["Writing one-line prompts and expecting a full teaching document.", "Forgetting to specify class level and lesson duration.", "Using prompts as final answers instead of editable drafts."]
  },
  {
    slug: "ai-policy-for-schools-nigeria",
    cat: "AI Governance",
    title: "How Nigerian Schools Can Create a Simple AI Policy",
    desc: "A practical AI policy guide for Nigerian schools covering privacy, teacher use, learner safety, academic honesty, and approved tools.",
    intent: "Schools need AI adoption rules before confusion becomes a problem.",
    primary: "education.html",
    primaryText: "Open Education Solutions",
    related: [["ai-for-schools.html", "AI for schools"], ["cybersecurity-awareness-for-schools.html", "Cybersecurity awareness"], ["contact.html", "Contact JENECONK"]],
    points: ["Define what teachers may use AI for, including planning, reports, visuals, admin drafts, and assessment support.", "Separate allowed learner use from restricted exam or assignment use.", "Protect learner data by banning unnecessary personal details in public AI tools.", "Require human review before any AI-generated material is published or shared.", "Train staff so the policy is understood in practice, not just saved as a document."],
    mistakes: ["Banning AI without teaching staff how to handle it.", "Allowing every tool without privacy review.", "Treating AI output as automatically correct."]
  },
  {
    slug: "ai-for-office-administration",
    cat: "AI for Work",
    title: "AI for Office Administration: Practical Workflows for Busy Teams",
    desc: "How office administrators can use AI to draft letters, summarize records, prepare minutes, organize schedules, and improve daily productivity.",
    intent: "Office teams need AI workflows that save time without weakening professionalism.",
    primary: "business.html",
    primaryText: "Open Business Solutions",
    related: [["business-suite.html", "Business Suite"], ["ai-for-small-business-productivity.html", "AI for small business"], ["training.html", "Training programs"]],
    points: ["Draft routine letters, memos, minutes, notices, and emails from structured instructions.", "Summarize meeting notes into decisions, action items, and deadlines.", "Turn rough instructions into checklists and standard operating procedures.", "Use AI to improve tone, clarity, and formatting before documents leave the office.", "Keep confidential data out of tools unless the organization has approved the workflow."],
    mistakes: ["Letting AI invent details that were not in the brief.", "Sending drafts without checking names, dates, figures, and commitments.", "Using AI as a replacement for filing discipline."]
  },
  {
    slug: "ai-for-small-business-productivity",
    cat: "AI for Business",
    title: "AI for Small Business Productivity in Nigeria",
    desc: "A practical guide for Nigerian SMEs using AI for proposals, invoices, customer messages, marketing drafts, and operational planning.",
    intent: "Small businesses want simple AI use cases that lead to real work output.",
    primary: "business-suite.html",
    primaryText: "Explore Business Suite",
    related: [["invoice-generator.html", "Invoice generator"], ["business-document-templates-guide.html", "Business document templates"], ["solutions-for-smes.html", "Solutions for SMEs"]],
    points: ["Create first drafts of proposals, quotations, invoices, and business letters.", "Prepare customer messages for WhatsApp, email, and social media.", "Turn informal notes into proper business plans and operating checklists.", "Analyze simple sales records and ask for trends, risks, and next actions.", "Build reusable templates so each task becomes faster next time."],
    mistakes: ["Depending on generic AI answers instead of business-specific details.", "Publishing marketing claims that cannot be proven.", "Ignoring records and numbers while asking AI for strategy."]
  },
  {
    slug: "excel-skills-for-office-admins",
    cat: "Excel",
    title: "Excel Skills Every Office Administrator Should Learn",
    desc: "Essential Excel skills for office administrators, including tables, formulas, data validation, charts, filtering, summaries, and clean reporting.",
    intent: "Excel remains one of the fastest ways to organize office work when staff know the foundations.",
    primary: "training.html",
    primaryText: "View Excel Training",
    related: [["excel-for-school-administration.html", "Excel for school administration"], ["data-cleaning-in-excel.html", "Data cleaning in Excel"], ["business.html", "Business solutions"]],
    points: ["Use tables so records filter, sort, and expand correctly.", "Master SUM, COUNTIF, XLOOKUP, IF, TEXT functions, and date formulas.", "Apply data validation to reduce spelling variations and wrong entries.", "Create simple dashboards with pivot tables and charts.", "Protect formulas and keep raw data separate from reports."],
    mistakes: ["Merging cells inside data tables.", "Typing totals manually instead of using formulas.", "Saving many conflicting copies of the same record."]
  },
  {
    slug: "excel-dashboard-for-school-management",
    cat: "Excel",
    title: "How to Build an Excel Dashboard for School Management",
    desc: "A school-focused Excel dashboard guide for attendance, fees, results, staff records, and management reporting.",
    intent: "School owners and administrators need dashboards that reveal the state of the school quickly.",
    primary: "excel-for-school-administration.html",
    primaryText: "Read Excel for Schools",
    related: [["school-fee-calculator.html", "School fee calculator"], ["term-average-calculator.html", "Term average calculator"], ["education.html", "Education hub"]],
    points: ["Start with clean tables for pupils, payments, attendance, results, and staff.", "Choose a few management questions before designing charts.", "Use pivot tables for summaries by class, term, gender, payment status, and subject.", "Create visual indicators for unpaid fees, low attendance, and weak performance.", "Review the dashboard weekly so it supports decisions, not decoration."],
    mistakes: ["Building charts before cleaning source data.", "Putting too many metrics on one screen.", "Forgetting to document what each figure means."]
  },
  {
    slug: "excel-formulas-for-business-owners",
    cat: "Excel",
    title: "Excel Formulas Nigerian Business Owners Should Know",
    desc: "Useful Excel formulas for small business owners managing sales, expenses, invoices, stock, customers, and monthly reports.",
    intent: "Business owners do not need every formula; they need the right formulas for decisions.",
    primary: "business.html",
    primaryText: "Open Business Hub",
    related: [["invoice-generator.html", "Invoice generator"], ["ai-for-small-business-productivity.html", "AI for small business"], ["training.html", "Training"]],
    points: ["Use SUMIFS to summarize sales or expenses by category and period.", "Use XLOOKUP to pull prices, customer details, and product information.", "Use IF to flag low stock, overdue invoices, or missing information.", "Use TEXT and date formulas to format periods and deadlines.", "Use pivot tables to compare products, locations, and months."],
    mistakes: ["Mixing personal and business expenses in one unclear sheet.", "Deleting old records instead of filtering by date.", "Relying on color alone to mean status."]
  },
  {
    slug: "excel-vs-google-sheets-for-schools",
    cat: "Excel",
    title: "Excel vs Google Sheets for Schools: Which Should You Use?",
    desc: "A balanced comparison of Microsoft Excel and Google Sheets for school administration, collaboration, results, fees, and reports.",
    intent: "Schools need the right spreadsheet tool for their workflow, devices, and staff strength.",
    primary: "education.html",
    primaryText: "Open Education Hub",
    related: [["excel-for-school-administration.html", "Excel for school administration"], ["best-school-management-software-nigeria.html", "School management software"], ["training.html", "Training"]],
    points: ["Use Excel when advanced formulas, offline work, and detailed dashboards matter most.", "Use Google Sheets when many staff must update records at the same time.", "For sensitive records, decide who can view, edit, download, or share files.", "Keep one master structure so records do not scatter across many files.", "Move repeated school workflows into dedicated software when spreadsheets become too fragile."],
    mistakes: ["Choosing a tool before defining the workflow.", "Allowing everyone to edit sensitive sheets.", "Using spreadsheets as a permanent replacement for proper school systems."]
  },
  {
    slug: "data-cleaning-in-excel",
    cat: "Excel",
    title: "Data Cleaning in Excel: A Practical Guide for Offices and Schools",
    desc: "Learn how to clean messy names, dates, duplicates, categories, and records in Excel before reporting or analysis.",
    intent: "Clean data is the difference between a report people trust and a report people doubt.",
    primary: "training.html",
    primaryText: "Learn Data Skills",
    related: [["data-analysis-for-beginners-nigeria.html", "Data analysis for beginners"], ["excel-skills-for-office-admins.html", "Excel for admins"], ["resources.html", "Resources"]],
    points: ["Standardize names, classes, categories, dates, and phone numbers before analysis.", "Remove duplicates carefully, after saving a backup copy.", "Use TRIM, CLEAN, PROPER, TEXTSPLIT, filters, and conditional formatting.", "Create validation lists so new entries remain consistent.", "Document cleaning rules so another staff member can repeat the process."],
    mistakes: ["Cleaning data directly without backup.", "Deleting unusual records without confirming them.", "Fixing one sheet while leaving the source process unchanged."]
  },
  {
    slug: "cybersecurity-awareness-for-schools",
    cat: "Cybersecurity",
    title: "Cybersecurity Awareness for Schools in Nigeria",
    desc: "A practical cybersecurity guide for schools covering passwords, phishing, devices, learner data, staff accounts, and backups.",
    intent: "Schools now handle digital records, payments, and communication, so cybersecurity is a management issue.",
    primary: "training.html",
    primaryText: "Explore Cybersecurity Training",
    related: [["ai-policy-for-schools-nigeria.html", "AI policy for schools"], ["password-and-2fa-guide.html", "Password and 2FA guide"], ["data-privacy-for-schools-nigeria.html", "Data privacy for schools"]],
    points: ["Train staff to recognize suspicious links, fake login pages, and payment diversion messages.", "Use strong passwords and two-factor authentication for email, portals, and admin tools.", "Control who can access learner records, fee records, and staff documents.", "Back up important records in at least two approved places.", "Create a simple incident process for lost devices, hacked accounts, and suspicious messages."],
    mistakes: ["Sharing one school email password among many staff.", "Using personal devices without basic protection.", "Ignoring backups until a device fails."]
  },
  {
    slug: "phishing-awareness-training-nigeria",
    cat: "Cybersecurity",
    title: "Phishing Awareness Training in Nigeria: What Staff Should Know",
    desc: "A practical guide to phishing awareness for Nigerian schools, churches, NGOs, SMEs, and offices.",
    intent: "Most cyber incidents begin with one person clicking or replying too quickly.",
    primary: "training.html",
    primaryText: "Book Staff Training",
    related: [["cybersecurity-for-small-businesses.html", "Cybersecurity for SMEs"], ["password-and-2fa-guide.html", "Password and 2FA"], ["contact.html", "Contact JENECONK"]],
    points: ["Verify sender addresses before clicking links or downloading attachments.", "Treat urgent payment changes and password requests as high-risk messages.", "Check login page URLs carefully before entering credentials.", "Report suspicious messages early instead of silently deleting them.", "Run short simulations so staff learn through realistic practice."],
    mistakes: ["Blaming staff instead of training them.", "Assuming only technical people need cybersecurity awareness.", "Trusting messages because they use the logo of a known brand."]
  },
  {
    slug: "password-and-2fa-guide",
    cat: "Cybersecurity",
    title: "Password and Two-Factor Authentication Guide for Teams",
    desc: "A simple guide for using strong passwords and two-factor authentication across schools, businesses, and professional teams.",
    intent: "Good password discipline is one of the cheapest security improvements an organization can make.",
    primary: "training.html",
    primaryText: "Explore Digital Safety Training",
    related: [["cybersecurity-awareness-for-schools.html", "Cybersecurity for schools"], ["cybersecurity-for-small-businesses.html", "Cybersecurity for SMEs"], ["resources.html", "Resources"]],
    points: ["Use long unique passwords for important accounts.", "Set up two-factor authentication for email, finance, cloud storage, and admin portals.", "Use a password manager where the team is ready for it.", "Remove access quickly when staff leave or roles change.", "Review recovery phone numbers and backup emails before emergencies happen."],
    mistakes: ["Reusing one password across many systems.", "Keeping passwords in public notebooks or shared chats.", "Leaving old staff accounts active."]
  },
  {
    slug: "data-privacy-for-schools-nigeria",
    cat: "Cybersecurity",
    title: "Data Privacy for Schools in Nigeria: Practical Steps",
    desc: "A practical school data privacy guide for learner records, report cards, fees, staff files, and digital tools.",
    intent: "Parents trust schools with sensitive information, and that trust must be protected.",
    primary: "education.html",
    primaryText: "Open Education Hub",
    related: [["ai-policy-for-schools-nigeria.html", "AI policy guide"], ["cybersecurity-awareness-for-schools.html", "Cybersecurity awareness"], ["contact.html", "Contact JENECONK"]],
    points: ["List the types of learner, parent, staff, payment, and health data the school stores.", "Limit access based on staff roles instead of convenience.", "Use approved channels for sharing reports and records.", "Avoid posting identifiable learner information without consent and purpose.", "Train staff to handle printed and digital records carefully."],
    mistakes: ["Collecting more data than the school actually needs.", "Sending sensitive files to broad WhatsApp groups.", "Ignoring printed documents left on desks."]
  },
  {
    slug: "cybersecurity-for-small-businesses",
    cat: "Cybersecurity",
    title: "Cybersecurity for Small Businesses in Nigeria",
    desc: "A practical cybersecurity guide for SMEs covering payments, staff devices, passwords, customer data, backups, and phishing.",
    intent: "Small businesses are targeted because attackers know they often have weak processes.",
    primary: "solutions-for-smes.html",
    primaryText: "Solutions for SMEs",
    related: [["phishing-awareness-training-nigeria.html", "Phishing awareness"], ["password-and-2fa-guide.html", "Password guide"], ["business.html", "Business hub"]],
    points: ["Secure email accounts because many payment and customer conversations begin there.", "Confirm bank detail changes through a second trusted channel.", "Back up invoices, customer records, receipts, and contracts.", "Protect staff devices with screen locks, updates, and antivirus where appropriate.", "Give staff simple rules for links, attachments, payments, and lost devices."],
    mistakes: ["Using one shared login for everything.", "Depending only on phone storage for business records.", "Waiting for fraud before creating approval rules."]
  },
  {
    slug: "coding-for-kids-nigeria",
    cat: "Coding",
    title: "Coding for Kids in Nigeria: What Parents and Schools Should Know",
    desc: "A practical guide to coding for kids in Nigeria, including age-appropriate learning, Scratch, Python, web design, and AI-assisted creativity.",
    intent: "Coding for children should build confidence, logic, creativity, and problem-solving.",
    primary: "academy.html",
    primaryText: "Explore JENECONK AI Academy",
    related: [["academy-gallery.html", "Academy gallery"], ["academy-moments.html", "Academy moments"], ["https://maths.jeneconk.com/", "Maths gateway"]],
    points: ["Begin with visual logic, stories, games, and simple problem-solving before heavy syntax.", "Let children build visible projects so progress feels real.", "Introduce Python and web development when typing, reading, and reasoning are ready.", "Combine coding with maths, English, design, and responsible AI use.", "Celebrate projects, not only certificates."],
    mistakes: ["Starting with abstract theory too early.", "Comparing children instead of tracking individual progress.", "Treating coding as typing rather than thinking and creating."]
  },
  {
    slug: "python-for-beginners-nigeria",
    cat: "Coding",
    title: "Python for Beginners in Nigeria: A Learning Roadmap",
    desc: "A beginner-friendly Python roadmap for students, professionals, and young learners in Nigeria.",
    intent: "Python is popular because beginners can build useful things quickly.",
    primary: "training.html",
    primaryText: "View Coding Training",
    related: [["coding-for-kids-nigeria.html", "Coding for kids"], ["data-analysis-for-beginners-nigeria.html", "Data analysis roadmap"], ["academy.html", "AI Academy"]],
    points: ["Start with variables, input, output, conditions, loops, lists, and functions.", "Build small projects such as calculators, quizzes, record systems, and text tools.", "Learn file handling and simple data analysis before advanced frameworks.", "Use AI to explain errors, but still understand the correction.", "Create a portfolio of small working projects."],
    mistakes: ["Jumping into frameworks before fundamentals.", "Copying code without being able to explain it.", "Stopping at tutorials without building independent projects."]
  },
  {
    slug: "web-development-roadmap-nigeria",
    cat: "Coding",
    title: "Web Development Roadmap for Nigerian Beginners",
    desc: "A practical web development roadmap covering HTML, CSS, JavaScript, responsive design, GitHub, hosting, and portfolio projects.",
    intent: "A clear roadmap helps beginners move from confusion to visible websites.",
    primary: "training.html",
    primaryText: "Explore Web Training",
    related: [["ai-integrated-web-development.html", "AI integrated web development"], ["coding-bootcamp-for-secondary-school-students.html", "Coding bootcamp"], ["contact.html", "Contact JENECONK"]],
    points: ["Learn HTML structure, semantic tags, forms, links, images, and accessibility basics.", "Use CSS for layout, responsive design, typography, spacing, and states.", "Use JavaScript for interaction, validation, and dynamic content.", "Publish projects on GitHub Pages or another simple host.", "Build portfolio projects tied to real school, business, or community needs."],
    mistakes: ["Skipping responsive design.", "Relying only on drag-and-drop tools without understanding web basics.", "Building many incomplete projects instead of a few polished ones."]
  },
  {
    slug: "ai-integrated-web-development",
    cat: "Coding and AI",
    title: "AI-Integrated Web Development: How Beginners Can Build Faster",
    desc: "How learners and professionals can use AI responsibly while building websites, apps, landing pages, and dashboards.",
    intent: "AI can accelerate web development when the learner still owns the thinking.",
    primary: "training.html",
    primaryText: "View AI and Web Training",
    related: [["web-development-roadmap-nigeria.html", "Web development roadmap"], ["coding-for-kids-nigeria.html", "Coding for kids"], ["business.html", "Business hub"]],
    points: ["Use AI to plan page structure, generate starter code, explain errors, and improve copy.", "Review generated code for accessibility, mobile layout, links, and security.", "Ask AI for alternatives when a layout or component feels weak.", "Keep a project brief so AI output stays consistent.", "Learn enough HTML, CSS, and JavaScript to judge what AI creates."],
    mistakes: ["Deploying generated code without testing it.", "Letting every page look generic.", "Using AI to avoid learning the fundamentals."]
  },
  {
    slug: "coding-bootcamp-for-secondary-school-students",
    cat: "Coding",
    title: "Coding Bootcamp for Secondary School Students: What Works",
    desc: "A guide for planning effective coding bootcamps for secondary school students, with projects, pace, mentoring, and assessment.",
    intent: "A good student bootcamp should produce confidence and visible projects in a short time.",
    primary: "academy.html",
    primaryText: "Explore AI Academy",
    related: [["coding-for-kids-nigeria.html", "Coding for kids"], ["web-development-roadmap-nigeria.html", "Web roadmap"], ["academy-moments.html", "Academy moments"]],
    points: ["Choose a small number of project outcomes before the bootcamp begins.", "Mix explanation with hands-on building every session.", "Use pairs, mentors, and checkpoints so slower learners do not disappear.", "Include presentation time so students explain what they built.", "Document projects with photos, videos, and simple write-ups."],
    mistakes: ["Trying to cover too many languages at once.", "Teaching only syntax without projects.", "Ending without a showcase or next learning path."]
  },
  {
    slug: "data-analysis-for-beginners-nigeria",
    cat: "Data Analysis",
    title: "Data Analysis for Beginners in Nigeria: A Practical Roadmap",
    desc: "A beginner roadmap for data analysis covering Excel, data cleaning, charts, Power BI, storytelling, and portfolio projects.",
    intent: "Data analysis becomes easier when learners start with real questions and clean data.",
    primary: "training.html",
    primaryText: "View Data Analysis Training",
    related: [["data-cleaning-in-excel.html", "Data cleaning in Excel"], ["power-bi-for-business-reporting.html", "Power BI reporting"], ["career-roadmap-data-analyst-nigeria.html", "Data analyst career roadmap"]],
    points: ["Learn spreadsheet basics, clean tables, formulas, and pivot tables first.", "Practice charts that answer business or school questions.", "Move into Power BI or similar tools for interactive dashboards.", "Write short insights that explain what changed, why it matters, and what to do next.", "Build portfolio projects from sales, school, finance, or public datasets."],
    mistakes: ["Learning tools without learning questions.", "Making beautiful dashboards from dirty data.", "Reporting numbers without interpretation."]
  },
  {
    slug: "power-bi-for-business-reporting",
    cat: "Data Analysis",
    title: "Power BI for Business Reporting: A Beginner Guide",
    desc: "A beginner guide to using Power BI for business dashboards, sales reports, expense summaries, and management decisions.",
    intent: "Power BI helps teams turn repeated reporting into dashboards leaders can understand.",
    primary: "training.html",
    primaryText: "Explore Power BI Training",
    related: [["ai-powered-data-analysis-excel-powerbi.html", "AI data analysis"], ["excel-dashboard-for-school-management.html", "Excel dashboards"], ["business.html", "Business hub"]],
    points: ["Start with clean source data in Excel, CSV, or a database.", "Model tables so relationships are clear and calculations make sense.", "Create measures for revenue, costs, profit, attendance, or performance.", "Design dashboards around decisions, not decoration.", "Refresh and review reports on a schedule."],
    mistakes: ["Importing messy sheets and expecting accurate dashboards.", "Using too many visuals on one page.", "Forgetting that users need definitions for each metric."]
  },
  {
    slug: "data-analysis-for-school-administrators",
    cat: "Data Analysis",
    title: "Data Analysis for School Administrators",
    desc: "How school administrators can use data analysis for attendance, fees, results, staffing, parent communication, and planning.",
    intent: "School data should help leaders see problems early and act with confidence.",
    primary: "education.html",
    primaryText: "Open Education Hub",
    related: [["excel-dashboard-for-school-management.html", "School Excel dashboard"], ["term-average-calculator.html", "Term average calculator"], ["school-fee-calculator.html", "School fee calculator"]],
    points: ["Track attendance patterns by class, week, and term.", "Monitor fees by payment status and follow-up priority.", "Analyze results by subject, teacher, class, and assessment type.", "Use report summaries to identify learners needing support.", "Review data during management meetings, not only at term end."],
    mistakes: ["Keeping records only for compliance.", "Treating low scores as learner failure without checking teaching and assessment patterns.", "Waiting too long before acting on attendance or fee signals."]
  },
  {
    slug: "ai-powered-data-analysis-excel-powerbi",
    cat: "Data Analysis and AI",
    title: "AI-Powered Data Analysis with Excel and Power BI",
    desc: "How AI can support data cleaning, formula help, dashboard planning, insight writing, and reporting in Excel and Power BI.",
    intent: "AI can help analysts work faster, but the data and questions still need human judgment.",
    primary: "training.html",
    primaryText: "Learn AI Data Skills",
    related: [["data-analysis-for-beginners-nigeria.html", "Data analysis roadmap"], ["power-bi-for-business-reporting.html", "Power BI guide"], ["excel-skills-for-office-admins.html", "Excel skills"]],
    points: ["Use AI to explain formulas, DAX measures, and cleaning steps.", "Ask AI to suggest dashboard questions before building visuals.", "Generate first drafts of insight summaries from verified numbers.", "Use AI to check whether charts match the question being asked.", "Protect confidential data when using AI-assisted analysis."],
    mistakes: ["Pasting sensitive datasets into unapproved tools.", "Accepting AI interpretations without checking the source data.", "Asking AI for insights before cleaning and validating records."]
  },
  {
    slug: "career-roadmap-data-analyst-nigeria",
    cat: "Data Careers",
    title: "Data Analyst Career Roadmap in Nigeria",
    desc: "A practical roadmap for becoming a data analyst in Nigeria, including Excel, SQL, Power BI, Python, portfolios, and job readiness.",
    intent: "Aspiring analysts need a path that connects skills to proof of work.",
    primary: "training.html",
    primaryText: "Explore Data Training",
    related: [["data-analysis-for-beginners-nigeria.html", "Data analysis for beginners"], ["python-for-beginners-nigeria.html", "Python roadmap"], ["contact.html", "Contact JENECONK"]],
    points: ["Start with Excel, data cleaning, charts, and pivot tables.", "Learn SQL to query structured data.", "Use Power BI for dashboards and storytelling.", "Add Python when you are ready for automation and deeper analysis.", "Build portfolio projects that explain the business question, process, findings, and recommendation."],
    mistakes: ["Chasing certificates without projects.", "Learning advanced tools before clean data habits.", "Applying for roles with no public proof of skill."]
  }
];

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderArticle(article) {
  const related = article.related
    .map(([href, label]) => `<a href="${href}">${esc(label)}</a>`)
    .join("");
  const points = article.points.map((point) => `<li>${esc(point)}</li>`).join("\n              ");
  const mistakes = article.mistakes.map((point) => `<li>${esc(point)}</li>`).join("\n              ");
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.desc,
    datePublished: today,
    dateModified: today,
    author: { "@type": "Organization", name: "JENECONK Integrated Global Solutions Ltd" },
    publisher: {
      "@type": "Organization",
      name: "JENECONK",
      logo: { "@type": "ImageObject", url: "https://jeneconk.com/assets/logo.png" }
    },
    mainEntityOfPage: `https://jeneconk.com/${article.slug}.html`
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${esc(article.desc)}">
  <title>${esc(article.title)} | JENECONK Resources</title>
  <link rel="canonical" href="https://jeneconk.com/${article.slug}.html">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/styles.css?v=20260701-2">
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="apple-touch-icon" href="assets/logo.png">
  <meta property="og:title" content="${esc(article.title)}">
  <meta property="og:description" content="${esc(article.desc)}">
  <meta property="og:url" content="https://jeneconk.com/${article.slug}.html">
  <meta property="og:image" content="https://jeneconk.com/assets/og-preview.svg">
  <script type="application/ld+json">
${schema.split("\n").map((line) => `  ${line}`).join("\n")}
  </script>
  ${ads}
</head>
<body>
  <header class="site-header" data-header>
    <a class="brand" href="index.html"><img class="brand-logo" src="assets/logo.png" alt="" width="40" height="38"><span><strong>JENECONK</strong><small>Integrated Global Solutions</small></span></a>
    <button class="nav-toggle" type="button" data-nav-toggle aria-label="Open navigation"><span></span><span></span><span></span></button>
    <nav class="nav" data-nav>
      <a href="education.html">Education</a><a href="business.html">Business</a><a href="training.html">Training</a><a href="tools.html">Tools</a><a href="resources.html" aria-current="page">Resources</a><a href="about.html">Company</a><a class="nav-cta edu" href="https://edu.jeneconk.com" target="_blank" rel="noreferrer">Edu Suite 2.0</a><a class="nav-cta" href="https://business.jeneconk.com" target="_blank" rel="noreferrer">Business Suite</a><a class="nav-cta alt" href="cbt-portal.html">CBT Setup</a>
    </nav>
  </header>
  <main>
    <section class="page-hero section-pad">
      <div class="container narrow">
        <nav class="breadcrumb"><a href="index.html">Home</a><span>/</span><a href="resources.html">Resources</a><span>/</span><span>${esc(article.cat)}</span></nav>
        <p class="eyebrow">${esc(article.cat)}</p>
        <h1>${esc(article.title)}</h1>
        <p>${esc(article.desc)}</p>
        <div class="hero-actions"><a class="btn btn-primary" href="${article.primary}">${esc(article.primaryText)}</a><a class="btn btn-secondary" href="resources.html">Browse resources</a></div>
      </div>
    </section>
    <section class="section-pad">
      <div class="container article-layout">
        <article class="article-body">
          <p class="article-meta">Updated ${today} by JENECONK</p>
          <h2>Why this matters</h2>
          <p>${esc(article.intent)} The practical aim is simple: better documents, cleaner records, safer systems, stronger learning, and faster decisions.</p>
          <p>This guide keeps the advice practical. It is designed for people who need to do real work this week, whether they are teachers preparing classes, administrators managing records, business owners serving customers, or learners building new skills.</p>
          <h2>Practical steps</h2>
          <ol>
              ${points}
          </ol>
          <h2>Common mistakes to avoid</h2>
          <ul>
              ${mistakes}
          </ul>
          <h2>Next steps with JENECONK</h2>
          <p>Use this guide as a starting point, then continue with the related JENECONK pages for deeper guidance, tools, or training. Where the work involves school planning, reporting, assessment, or classroom productivity, Edu Suite 2.0 can shorten preparation time while still leaving teachers in control. Where the work involves proposals, business documents, invoices, policies, and office workflows, Business Suite can help teams move from rough notes to structured drafts faster.</p>
          <p>For schools and organizations, the strongest next step is usually a simple working routine: define the task, choose the tool, review the output, document the process, and train the people who will repeat it. That is how digital adoption becomes a habit rather than a one-time event.</p>
        </article>
        <aside class="article-sidebar">
          <div class="sidebar-card">
            <span>${esc(article.cat)}</span>
            <h3>Make this practical</h3>
            <p>Connect this guide to the right JENECONK product, training path, or free tool.</p>
            <a class="btn btn-primary" href="${article.primary}">${esc(article.primaryText)}</a>
          </div>
          <div class="sidebar-card">
            <span>Related pages</span>
            <div class="sidebar-links">${related}<a href="resources.html">All resources</a></div>
          </div>
        </aside>
      </div>
    </section>
  </main>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div><a class="brand footer-brand" href="index.html"><img class="brand-logo" src="assets/logo.png" alt="" width="40" height="38"><span><strong>JENECONK</strong><small>Integrated Global Solutions</small></span></a><p>AI-powered education, business, training, tools, and digital transformation systems.</p></div>
      <div><strong>Products</strong><a href="https://edu.jeneconk.com" target="_blank" rel="noreferrer">Edu Suite 2.0</a><a href="jems.html">JEMS English Mastery</a><a href="https://business.jeneconk.com" target="_blank" rel="noreferrer">Business Suite</a><a href="smart-procurement.html">Smart Procurement</a><a href="cbt-portal.html">CBT Setup Enquiry</a></div>
      <div><strong>Ecosystem</strong><a href="education.html">Education</a><a href="business.html">Business</a><a href="training.html">Training</a><a href="tools.html">Tools</a><a href="resources.html" aria-current="page">Resources</a></div>
      <div><strong>Company &amp; Policies</strong><a href="about.html">About</a><a href="contact.html">Contact</a><a href="privacy-policy.html">Privacy Policy</a><a href="terms-of-use.html">Terms of Use</a><a href="cookie-policy.html">Cookie Policy</a><a href="editorial-policy.html">Editorial Policy</a><a href="content-transparency.html">Content Transparency</a><a href="mailto:info@jeneconk.com">info@jeneconk.com</a><span>Port Harcourt, Nigeria</span></div>
    </div>
  </footer>
  <script src="assets/main.js"></script>
</body>
</html>
`;
}

for (const article of articles) {
  fs.writeFileSync(path.join(process.cwd(), `${article.slug}.html`), renderArticle(article));
}

console.log(`CREATED=${articles.length}`);
