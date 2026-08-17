const fs = require('node:fs');

const updated = '2026-08-10';

const guides = [
  {
    slug: 'ai-lesson-planning-guide-for-teachers', badge: 'PLAN', category: 'AI for teaching',
    title: 'AI Lesson Planning Guide for Teachers',
    description: 'Plan stronger lessons with AI while keeping curriculum alignment, teacher judgement, differentiation, assessment, and learner safety in view.',
    intro: 'A useful AI lesson plan starts with the learning goal, not the tool. Follow a repeatable workflow that works across elementary, primary, middle, secondary, and high school settings.',
    sections: `
      <h2 id="workflow">A seven-step AI lesson-planning workflow</h2>
      <div class="guide-grid">
        <div class="guide-card"><strong>1. Fix the learning outcome</strong><p>State what learners should know, explain, create, or demonstrate by the end of the lesson. Use the curriculum or standards language your school already follows.</p></div>
        <div class="guide-card"><strong>2. Add classroom reality</strong><p>Include age or year level, lesson duration, prior knowledge, available materials, class size, language needs, and any accessibility requirements.</p></div>
        <div class="guide-card"><strong>3. Request a lesson sequence</strong><p>Ask for an opening check, explicit teaching, guided practice, independent practice, assessment, and closure. Change the sequence when your pedagogy requires it.</p></div>
        <div class="guide-card"><strong>4. Build in differentiation</strong><p>Request scaffolds, extension work, vocabulary support, and alternative ways for learners to show understanding without lowering the core objective.</p></div>
        <div class="guide-card"><strong>5. Check assessment alignment</strong><p>Every question or task should measure the stated outcome. Remove attractive activities that do not contribute to the learning goal.</p></div>
        <div class="guide-card"><strong>6. Verify and adapt</strong><p>Check facts, examples, calculations, reading level, cultural context, safeguarding concerns, and whether the pace is realistic for your class.</p></div>
      </div>
      <h2 id="prompt">Copy-ready lesson-planning prompt</h2>
      <div class="guide-template">Prepare a [DURATION]-minute lesson for [GRADE/YEAR] [SUBJECT] on [TOPIC]. Learners already know [PRIOR KNOWLEDGE]. By the end, they should be able to [MEASURABLE OUTCOME]. Use [CURRICULUM OR STANDARD]. Include an opening check, explicit teaching, guided practice, independent practice, differentiation, formative assessment, closure, and materials. The class context is [DETAILS]. Flag facts or requirements that need teacher verification.</div>
      <h2 id="review">Review the draft before class</h2>
      <ul class="guide-checklist"><li>The objective is measurable and appropriate for the available time.</li><li>Examples fit the learners' language, culture, and prior knowledge.</li><li>Activities are possible with the materials and space available.</li><li>Support and extension preserve the same core learning goal.</li><li>Assessment questions actually measure the objective.</li><li>No private learner information appears in the prompt or output.</li></ul>
      <h2 id="regions">Translate the plan into local school language</h2>
      <div class="regional-grid"><div><strong>United States</strong><p>Use grade level, state or district standards, accommodations, formative assessment, and report card language.</p></div><div><strong>United Kingdom</strong><p>Use year group, National Curriculum or exam specification, learning objective, success criteria, and SEND support.</p></div><div><strong>Canada</strong><p>Name the province or territory, curriculum expectations, grade level, and board-approved assessment language.</p></div><div><strong>Australia</strong><p>Use year level, Australian Curriculum or state curriculum, achievement standards, adjustments, and learning intentions.</p></div></div>
      <div class="guide-note"><p><strong>Teacher judgement remains central.</strong> AI can accelerate preparation, but the teacher decides what is accurate, suitable, inclusive, and ready for the classroom.</p></div>`,
    faqs: [
      ['Can AI write a complete lesson plan?', 'AI can draft a complete structure, but a teacher should verify curriculum alignment, content accuracy, timing, differentiation, and assessment before use.'],
      ['What information should I include in a lesson-planning prompt?', 'Include the class or year level, subject, topic, duration, learning outcome, curriculum, prior knowledge, resources, learner needs, and required format.'],
      ['Should I enter student information into an AI lesson planner?', 'Avoid names and identifiable learner information unless your school has approved the tool and its data-handling process.']
    ], related: [['prompt-engineering-for-teachers.html','Prompt engineering for teachers'],['lesson-note-generator.html','Lesson note generator'],['50-ai-tools-for-teachers-2026.html','50 AI tools for teachers']]
  },
  {
    slug: 'ai-report-card-comments-guide', badge: 'REPORT', category: 'Assessment and reporting',
    title: 'AI Report Card Comments: A Teacher Review Guide',
    description: 'Draft specific, evidence-based report card comments with AI while protecting learner privacy and keeping the teacher responsible for the final wording.',
    intro: 'A strong report comment describes evidence, progress, and a realistic next step. AI can help shape the sentence, but it should never invent achievement, behaviour, or personal information.',
    sections: `
      <h2 id="structure">Use an evidence-progress-next-step structure</h2>
      <div class="guide-grid"><div class="guide-card"><strong>Evidence</strong><p>Name a demonstrated strength, completed skill, assessment pattern, or classroom habit you have actually observed.</p></div><div class="guide-card"><strong>Progress</strong><p>Describe what has improved over the reporting period without exaggerating or comparing the learner unfairly with classmates.</p></div><div class="guide-card"><strong>Next step</strong><p>Give one achievable action the learner, teacher, or family can understand and support.</p></div><div class="guide-card"><strong>Professional tone</strong><p>Use clear, respectful language. Remove labels, predictions, vague praise, and wording that could embarrass or discourage the learner.</p></div></div>
      <h2 id="prompt">A privacy-conscious report comment prompt</h2>
      <div class="guide-template">Draft three report card comments of [WORD COUNT] words. Use only this anonymised evidence: demonstrated strengths [LIST], progress [LIST], area for development [LIST], and next step [LIST]. Use a warm, specific, professional tone. Do not invent scores, behaviour, diagnoses, family circumstances, or personal details. Avoid labels and absolute predictions.</div>
      <h2 id="examples">Turn vague comments into useful feedback</h2>
      <div class="guide-grid"><div class="guide-card"><strong>Instead of</strong><p>Alex is a good student who is doing well.</p></div><div class="guide-card"><strong>Use verified evidence</strong><p>Alex explains the main ideas in independent reading and increasingly supports responses with details from the text. Regular practice summarising longer passages will strengthen confidence further.</p></div><div class="guide-card"><strong>Instead of</strong><p>Sam needs to work harder in maths.</p></div><div class="guide-card"><strong>Use a clear next step</strong><p>Sam accurately solves one-step problems and is beginning to explain the chosen method. Checking each operation before submitting multi-step work will improve consistency.</p></div></div>
      <h2 id="review">Final review checklist</h2>
      <ul class="guide-checklist"><li>Every statement is supported by teacher evidence.</li><li>The comment names progress as well as an area for development.</li><li>The next step is specific and achievable.</li><li>Pronouns, names, subjects, grades, and scores are correct.</li><li>The language is respectful and free of stereotypes or labels.</li><li>The final wording follows the school's reporting policy.</li></ul>
      <h2 id="regions">Regional reporting language</h2>
      <div class="regional-grid"><div><strong>United States</strong><p>Report card, grade level, standards, accommodations, and family communication are common terms.</p></div><div><strong>United Kingdom</strong><p>School report, year group, attainment, progress, targets, and parents or carers are widely used.</p></div><div><strong>Canada</strong><p>Report card wording and achievement categories vary by province and school board.</p></div><div><strong>Australia</strong><p>Reporting commonly connects achievement standards, progress, effort, and next learning steps.</p></div></div>`,
    faqs: [['Can AI generate personalised report card comments?', 'It can draft comments from anonymised evidence, but the teacher must verify every statement and personalise the final wording.'],['What should never be placed in a public AI prompt?', 'Do not include names, student IDs, diagnoses, health information, family circumstances, or other identifiable learner data.'],['How long should a report comment be?', 'Follow the school reporting system. A concise comment usually needs enough space for evidence, progress, and one clear next step.']],
    related: [['report-comment-generator.html','Report comment generator'],['prompt-engineering-for-teachers.html','Teacher prompt guide'],['data-privacy-for-schools-nigeria.html','School data privacy guide']]
  },
  {
    slug: 'ai-tools-for-special-education-teachers', badge: 'ACCESS', category: 'Inclusive education',
    title: 'AI Tools for Special Education Teachers: A Safe Planning Guide',
    description: 'Use AI to support accessible materials, differentiated instruction, communication, and planning without outsourcing professional judgement or exposing learner data.',
    intro: 'AI can reduce preparation time for accessible materials and differentiated activities. It must not diagnose learners, determine provision, or replace the professionals and families responsible for individual support decisions.',
    sections: `
      <h2 id="uses">Where AI can support preparation</h2>
      <div class="guide-grid"><div class="guide-card"><strong>Accessible versions</strong><p>Rewrite teacher-created text at different reading levels, create plain-language summaries, propose visual schedules, and suggest alternative representations.</p></div><div class="guide-card"><strong>Instructional scaffolds</strong><p>Generate step-by-step instructions, vocabulary previews, worked examples, chunked tasks, and extension options around the same learning goal.</p></div><div class="guide-card"><strong>Communication drafts</strong><p>Prepare neutral meeting agendas, progress-summary structures, and family-friendly explanations from anonymised notes.</p></div><div class="guide-card"><strong>Teacher organisation</strong><p>Create observation checklists, resource lists, routine cards, and planning templates that teachers can adapt to approved support plans.</p></div></div>
      <h2 id="boundaries">Set firm boundaries</h2>
      <ul class="guide-checklist"><li>Do not ask AI to diagnose a disability or learning need.</li><li>Do not let AI determine eligibility, placement, services, or accommodations.</li><li>Do not enter an IEP, EHCP, individual plan, medical detail, or identifiable observation into an unapproved tool.</li><li>Do not assume simplified work is automatically accessible or age-respectful.</li><li>Do not use generated text without checking bias, dignity, accuracy, and learner voice.</li><li>Keep decisions with qualified staff, the learner, and family according to local requirements.</li></ul>
      <h2 id="prompt">Prompt for differentiated materials</h2>
      <div class="guide-template">Adapt this teacher-created activity for [AGE/YEAR] learners while keeping the same learning objective: [OBJECTIVE]. Provide: a plain-language instruction set, a vocabulary preview, a worked example, optional visual cues, a low-distraction version, and an extension task. Do not diagnose learners or infer needs. I will select adjustments based on approved plans and professional knowledge.</div>
      <h2 id="review">Evaluate an AI tool before classroom use</h2>
      <div class="guide-grid"><div class="guide-card"><strong>Privacy</strong><p>What data is collected, retained, used for training, or shared? Can staff use anonymised inputs and delete histories?</p></div><div class="guide-card"><strong>Accessibility</strong><p>Does the product work with keyboard navigation, screen readers, captions, zoom, colour contrast, and alternative input methods?</p></div><div class="guide-card"><strong>Control</strong><p>Can teachers edit, reject, and explain outputs? Avoid systems that make hidden high-impact decisions about learners.</p></div><div class="guide-card"><strong>Evidence</strong><p>What educational claim is being made, and what evidence supports it for the learners and context in which it will be used?</p></div></div>
      <div class="guide-note"><p><strong>Use person-respecting language.</strong> Follow each learner's and community's preferred terminology rather than allowing a generated draft to choose labels.</p></div>`,
    faqs: [['Can AI create accommodations for a learner?', 'AI may suggest options, but approved accommodations and adjustments must come from the responsible educational process and qualified professionals.'],['Can I upload an individual education plan to an AI tool?', 'Only use learner records in tools formally approved for that purpose by your school or authority. Public chat tools should not receive identifiable plans.'],['What is the safest first use?', 'Start with non-identifiable teacher materials, such as simplifying instructions, generating vocabulary previews, or proposing alternative examples.']],
    related: [['ai-lesson-planning-guide-for-teachers.html','AI lesson planning'],['school-ai-policy-template.html','School AI policy template'],['ai-policy-for-schools-nigeria.html','Nigeria school AI policy']]
  },
  {
    slug: 'ai-tools-for-school-administrators', badge: 'ADMIN', category: 'School administration',
    title: 'AI Tools for School Administrators: Practical Workflows and Controls',
    description: 'Use AI for agendas, communications, policies, summaries, planning, and administration while protecting school data and preserving accountable decisions.',
    intro: 'The best administrative uses of AI are repetitive, reviewable, and low risk. Begin with drafts and structure; keep sensitive records and consequential decisions inside approved systems.',
    sections: `
      <h2 id="workflows">Low-risk workflows worth testing first</h2>
      <div class="guide-grid"><div class="guide-card"><strong>Meetings</strong><p>Turn a non-confidential agenda into a preparation checklist, create a minute-taking structure, or convert approved minutes into an action register.</p></div><div class="guide-card"><strong>Communications</strong><p>Draft newsletters, event reminders, staff notices, and parent or carer messages from verified facts without including personal data.</p></div><div class="guide-card"><strong>Policy review</strong><p>Compare two public policy versions, identify missing headings, or turn approved requirements into a staff checklist.</p></div><div class="guide-card"><strong>Planning</strong><p>Structure implementation plans, training schedules, risk questions, procurement criteria, and project updates for human review.</p></div></div>
      <h2 id="risk">Match controls to risk</h2>
      <div class="regional-grid"><div><strong>Low risk</strong><p>Formatting public text, brainstorming event themes, summarising non-confidential material, and creating blank templates.</p></div><div><strong>Moderate risk</strong><p>Drafting official communication, analysing anonymised trends, or preparing policy content that requires named approval.</p></div><div><strong>High risk</strong><p>Discipline, admissions, safeguarding, staff performance, special education decisions, predictive profiling, or any use of identifiable records.</p></div><div><strong>Required response</strong><p>Approve tools centrally, minimise data, document review, restrict access, and keep a named human accountable for the outcome.</p></div></div>
      <h2 id="process">A controlled administrative workflow</h2>
      <ol><li>Define the task and decide whether AI is necessary.</li><li>Classify the information before opening a tool.</li><li>Use an approved account and remove personal or confidential details.</li><li>Ask for a draft, structure, or options rather than a final decision.</li><li>Verify facts, tone, policy alignment, and accessibility.</li><li>Record approval where the output becomes an official document.</li></ol>
      <h2 id="procurement">Questions to ask a vendor</h2>
      <ul class="guide-checklist"><li>Where is data stored and which subprocessors can access it?</li><li>Are prompts and outputs used to train models?</li><li>Can the school control retention, deletion, accounts, and permissions?</li><li>What accessibility and age-assurance measures are supported?</li><li>How are incidents, model changes, and security updates communicated?</li><li>Can the vendor demonstrate compliance with the school's jurisdiction and contract requirements?</li></ul>
      <div class="guide-note"><p><strong>Do not automate accountability away.</strong> A polished AI draft can still contain an error, unfair assumption, privacy breach, or policy conflict.</p></div>`,
    faqs: [['What is the easiest administrative task to start with?', 'Start with blank templates, public communications, meeting structures, or summaries of non-confidential material.'],['Can administrators use AI for student discipline?', 'AI should not make or recommend consequential discipline decisions. Such processes require authorised human judgement, evidence, policy, and procedural fairness.'],['Does anonymising a name remove every privacy risk?', 'No. Details can sometimes identify a person indirectly, so remove combinations of information that could reveal identity.']],
    related: [['ai-and-prompt-engineering-professional-guide.html','AI and prompt engineering guide'],['school-ai-policy-template.html','School AI policy template'],['https://admintraining.jeneconk.com','AI Admin Workbench']]
  },
  {
    slug: 'school-ai-policy-template', badge: 'POLICY', category: 'AI governance',
    title: 'School AI Policy Template: A Practical International Framework',
    description: 'Build a clear school AI policy covering approved use, privacy, safeguarding, assessment, transparency, staff review, procurement, and incident response.',
    intro: 'A useful AI policy tells staff and learners what they may do, what they must never do, and who makes the final decision. Adapt this framework with your legal, safeguarding, IT, curriculum, and data-protection leads.',
    sections: `
      <div class="guide-note"><p><strong>Important:</strong> This is an operational starting point, not legal advice. Schools must align the final policy with national, state, provincial, territorial, local, contractual, safeguarding, and examination requirements.</p></div>
      <h2 id="sections">Ten sections every school AI policy needs</h2>
      <div class="guide-grid"><div class="guide-card"><strong>1. Purpose and scope</strong><p>State who and what the policy covers, including staff, learners, contractors, devices, accounts, and school-approved AI systems.</p></div><div class="guide-card"><strong>2. Approved uses</strong><p>List permitted teacher, administrative, and learner activities, including when disclosure or citation is required.</p></div><div class="guide-card"><strong>3. Prohibited uses</strong><p>Ban unsafe data entry, impersonation, harmful content, undisclosed assessed work, and automated high-impact decisions.</p></div><div class="guide-card"><strong>4. Privacy and security</strong><p>Set rules for tool approval, data minimisation, access, retention, deletion, accounts, and incident reporting.</p></div><div class="guide-card"><strong>5. Teaching and assessment</strong><p>Explain acceptable assistance, authorship, verification, citation, misconduct procedures, and teacher responsibility.</p></div><div class="guide-card"><strong>6. Safeguarding and inclusion</strong><p>Address age limits, harmful outputs, accessibility, bias, learner wellbeing, and escalation routes.</p></div><div class="guide-card"><strong>7. Human oversight</strong><p>Name decisions AI cannot make and identify the people accountable for review and approval.</p></div><div class="guide-card"><strong>8. Procurement</strong><p>Require privacy, security, accessibility, evidence, contract, and data-location checks before adoption.</p></div><div class="guide-card"><strong>9. Training and communication</strong><p>Set expectations for recurring staff learning and clear information for learners and families.</p></div><div class="guide-card"><strong>10. Review cycle</strong><p>Assign an owner, review date, version history, feedback route, and emergency update process.</p></div></div>
      <h2 id="template">Copy-ready policy opening</h2>
      <div class="guide-template">[SCHOOL NAME] uses approved artificial intelligence tools to support teaching, learning, and administration where they provide a clear educational or operational benefit. AI output is treated as a draft or source of options, not as an unquestioned authority. Users must protect personal and confidential information, verify accuracy, disclose AI assistance where required, follow assessment and safeguarding rules, and keep final decisions with authorised people.</div>
      <h2 id="rules">Minimum acceptable-use rules</h2>
      <ul class="guide-checklist"><li>Use only school-approved tools and accounts for school work.</li><li>Do not enter personal, confidential, safeguarding, medical, or special-category information unless specifically authorised.</li><li>Verify generated facts, sources, calculations, images, and recommendations.</li><li>Disclose AI assistance in assessed or published work when required.</li><li>Do not use AI to impersonate, harass, deceive, discriminate, or create harmful material.</li><li>Report unsafe output, suspected data exposure, or inappropriate use promptly.</li></ul>
      <h2 id="regions">Official regional starting points</h2>
      <div class="regional-grid"><div><strong>United States</strong><p>Review FERPA and state or district requirements. The US Department of Education provides guidance on privacy and data sharing.</p><a href="https://studentprivacy.ed.gov/privacy-and-data-sharing" target="_blank" rel="noreferrer">US student privacy guidance</a></div><div><strong>United Kingdom</strong><p>Align with UK GDPR, the Data Protection Act, safeguarding duties, and Department for Education guidance.</p><a href="https://www.gov.uk/guidance/data-protection-in-schools/generative-artificial-intelligence-ai-and-data-protection-in-schools" target="_blank" rel="noreferrer">UK school AI data guidance</a></div><div><strong>Canada</strong><p>Education and privacy obligations vary by province and territory. Canada's privacy regulators emphasise children's privacy in EdTech.</p><a href="https://www.priv.gc.ca/en/about-the-opc/what-we-do/provincial-and-territorial-collaboration/joint-resolutions-with-provinces-and-territories/res_20251008_edtech/" target="_blank" rel="noreferrer">Canadian EdTech privacy resolution</a></div><div><strong>Australia</strong><p>Use the national framework alongside state, territory, sector, privacy, and safeguarding requirements.</p><a href="https://www.education.gov.au/schooling/resources/australian-framework-generative-artificial-intelligence-ai-schools" target="_blank" rel="noreferrer">Australian school AI framework</a></div></div>`,
    faqs: [['Who should approve a school AI policy?', 'Approval should follow the school governance structure and involve leadership, teaching, safeguarding, IT, data protection, legal or compliance, and assessment responsibilities.'],['How often should the policy be reviewed?', 'Set a regular review date and allow interim updates when tools, contracts, guidance, incidents, or assessment requirements change.'],['Should students be allowed to use AI?', 'The policy should define age-appropriate permitted uses, supervision, disclosure, assessment boundaries, privacy rules, and alternatives for learners who cannot or should not use a tool.']],
    related: [['ai-policy-for-schools-nigeria.html','Nigeria school AI policy'],['ai-tools-for-school-administrators.html','AI for administrators'],['data-privacy-for-schools-nigeria.html','School data privacy']]
  },
  {
    slug: 'excel-inventory-management-guide', badge: 'STOCK', category: 'Excel for business',
    title: 'Excel Inventory Management Guide for Small Businesses',
    description: 'Build a practical Excel inventory tracker for products, stock movements, reorder alerts, suppliers, costs, and monthly review.',
    intro: 'A useful inventory workbook answers three questions quickly: what is in stock, what moved, and what needs attention. Start with clean transaction records before adding dashboards.',
    sections: `
      <h2 id="structure">Use four connected tables</h2>
      <div class="guide-grid"><div class="guide-card"><strong>Products</strong><p>SKU, product name, category, unit, supplier, cost, selling price, reorder level, and active status.</p></div><div class="guide-card"><strong>Stock movements</strong><p>Date, reference, SKU, movement type, quantity in, quantity out, location, and responsible person.</p></div><div class="guide-card"><strong>Suppliers</strong><p>Supplier ID, contact details, lead time, payment terms, and products supplied.</p></div><div class="guide-card"><strong>Cycle counts</strong><p>Count date, SKU, system quantity, physical quantity, variance, explanation, and approval.</p></div></div>
      <h2 id="formulas">Core inventory formulas</h2>
      <div class="guide-template">Stock balance
=SUMIFS(Movements[Qty In],Movements[SKU],[@SKU])-SUMIFS(Movements[Qty Out],Movements[SKU],[@SKU])

Reorder status
=IF([@[Stock Balance]]&lt;=[@[Reorder Level]],"Reorder","OK")

Inventory value
=[@[Stock Balance]]*[@[Unit Cost]]

Supplier lookup
=XLOOKUP([@SKU],Products[SKU],Products[Supplier],"Check SKU")</div>
      <h2 id="controls">Controls that prevent expensive errors</h2>
      <ul class="guide-checklist"><li>Give every product one permanent SKU and avoid duplicate naming.</li><li>Record adjustments as movements instead of overwriting balances.</li><li>Use data validation for movement types, units, locations, and status.</li><li>Protect formula columns and keep an untouched backup before imports.</li><li>Count high-value and fast-moving stock more frequently.</li><li>Investigate variances and record the reason and approval.</li></ul>
      <h2 id="review">A useful monthly inventory review</h2>
      <p>Review items below reorder level, zero-movement products, negative balances, high variances, expiring stock, supplier lead times, gross margin, and total inventory value. A PivotTable can compare movements by product, location, supplier, or month without adding more formulas.</p>
      <div class="guide-note"><p><strong>Know when to move beyond Excel.</strong> Multiple simultaneous users, barcode operations, serial tracking, complex manufacturing, and real-time multi-location stock may require a dedicated inventory system.</p></div>`,
    faqs: [['Can Excel manage inventory for a small business?', 'Yes, when the product range and transaction volume are manageable and the workbook has clear ownership, validation, backups, and review controls.'],['Should I type the current balance directly?', 'A stronger system calculates balance from stock-in and stock-out movements, preserving an audit trail.'],['What is the most important inventory field?', 'A consistent unique SKU prevents confusion when product descriptions or suppliers change.']],
    related: [['excel-formulas-for-business-owners.html','Excel formulas for business'],['data-cleaning-in-excel.html','Data cleaning in Excel'],['business.html','Business solutions']]
  },
  {
    slug: 'excel-invoice-tracker-guide', badge: 'INVOICE', category: 'Excel for business',
    title: 'Excel Invoice Tracker Guide for Small Businesses',
    description: 'Create an Excel invoice tracker that shows issued, paid, overdue, and outstanding invoices without losing the underlying records.',
    intro: 'An invoice tracker should make follow-up easier, not create another reconciliation problem. Keep one row per invoice, use consistent status rules, and separate the tracker from the invoice document itself.',
    sections: `
      <h2 id="columns">Essential invoice tracker columns</h2>
      <div class="guide-grid"><div class="guide-card"><strong>Identity</strong><p>Invoice number, customer, customer ID, project or order reference, and responsible account owner.</p></div><div class="guide-card"><strong>Dates</strong><p>Issue date, due date, payment date, and follow-up date stored as real Excel dates.</p></div><div class="guide-card"><strong>Money</strong><p>Subtotal, tax, total, amount paid, balance, currency, and payment reference.</p></div><div class="guide-card"><strong>Status</strong><p>Draft, issued, part paid, paid, overdue, disputed, or cancelled, selected from a controlled list.</p></div></div>
      <h2 id="formulas">Formulas for balance and status</h2>
      <div class="guide-template">Outstanding balance
=[@[Invoice Total]]-[@[Amount Paid]]

Payment status
=IF([@[Balance]]&lt;=0,"Paid",IF([@[Due Date]]&lt;TODAY(),"Overdue",IF([@[Amount Paid]]&gt;0,"Part paid","Issued")))

Days overdue
=MAX(0,TODAY()-[@[Due Date]])

Total overdue value
=SUMIFS(Invoices[Balance],Invoices[Status],"Overdue")</div>
      <h2 id="process">A reliable weekly process</h2>
      <ol><li>Enter new invoices from the approved invoice sequence.</li><li>Import or record received payments with a reference.</li><li>Reconcile amounts against the bank or payment platform.</li><li>Review overdue and part-paid balances.</li><li>Send accurate reminders from verified contact details.</li><li>Record disputes, promises, adjustments, and next follow-up dates.</li></ol>
      <h2 id="controls">Protect the financial record</h2>
      <ul class="guide-checklist"><li>Never reuse or silently delete an issued invoice number.</li><li>Keep tax and currency rules appropriate to the business jurisdiction.</li><li>Protect formula cells and restrict who can change payment records.</li><li>Use credit notes or documented adjustments instead of rewriting history.</li><li>Reconcile the tracker to accounting and bank records regularly.</li><li>Back up the workbook and retain records according to applicable requirements.</li></ul>
      <div class="guide-note"><p><strong>The tracker supports accounting; it does not replace it.</strong> Confirm local invoicing, tax, retention, and financial-reporting requirements with a qualified professional.</p></div>`,
    faqs: [['Can one workbook track invoices in several currencies?', 'It can, but keep the original currency and amount and use a documented exchange-rate method for reporting. Do not add unlike currencies together.'],['What makes an invoice overdue?', 'Use the agreed due date and recorded unpaid balance. Contract terms and local requirements may affect follow-up or fees.'],['Should paid invoices be deleted?', 'No. Keep the record and mark the payment date, amount, and reference so totals can be reconciled and audited.']],
    related: [['invoice-generator.html','Free invoice generator'],['excel-formulas-for-business-owners.html','Excel formula guide'],['business-document-templates-guide.html','Business document templates']]
  },
  {
    slug: 'ai-grading-and-feedback-guide', badge: 'FEEDBACK', category: 'Assessment and feedback',
    title: 'AI Grading and Feedback Guide for Teachers',
    description: 'Use AI to prepare rubrics, feedback structures, and practice questions while keeping grading fair, explainable, private, and teacher-led.',
    intro: 'AI is safest when it supports feedback preparation rather than making an unreviewed final judgement about a learner. Begin with criteria, anonymised work, and a clear human verification process.',
    sections: `
      <h2 id="uses">Useful teacher-led applications</h2>
      <div class="guide-grid"><div class="guide-card"><strong>Rubric drafting</strong><p>Turn approved learning outcomes into proposed criteria and performance descriptors, then check progression and language carefully.</p></div><div class="guide-card"><strong>Feedback banks</strong><p>Create editable comments for recurring strengths and misconceptions without assigning them automatically to named learners.</p></div><div class="guide-card"><strong>Question review</strong><p>Check whether practice questions cover recall, application, reasoning, and the intended curriculum content.</p></div><div class="guide-card"><strong>Exemplar discussion</strong><p>Generate fictional examples for class critique, clearly labelling them and checking that they genuinely illustrate the criteria.</p></div></div>
      <h2 id="workflow">A defensible feedback workflow</h2>
      <ol><li>Set the learning outcome and approved marking criteria before using AI.</li><li>Decide whether the tool and data are approved for the task.</li><li>Remove names and details that could identify the learner.</li><li>Ask AI to reference the supplied criteria and show its reasoning.</li><li>Compare suggestions with the actual work and teacher evidence.</li><li>Write or approve the final grade and feedback yourself.</li><li>Provide a route for questions, correction, or appeal under school policy.</li></ol>
      <h2 id="prompt">Prompt for criterion-based feedback</h2>
      <div class="guide-template">Using only the rubric below, identify two demonstrated strengths, one area for improvement, and one actionable next step in this anonymised practice response. Quote brief evidence from the response. Do not assign a final grade, infer personal characteristics, or introduce criteria that are not in the rubric. Flag any judgement that requires subject-teacher review.</div>
      <h2 id="fairness">Fairness and quality checks</h2>
      <ul class="guide-checklist"><li>The same criteria are applied consistently across learners.</li><li>The tool has not rewarded writing style when content knowledge is being assessed.</li><li>Feedback does not infer effort, ability, disability, background, or intent.</li><li>Teachers can explain and correct the final judgement.</li><li>Learner work is handled under approved privacy and retention rules.</li><li>Assessment regulations permit the proposed use of AI.</li></ul>
      <div class="guide-note"><p><strong>A grade is a consequential decision.</strong> Do not rely on an opaque AI score as the sole basis for a result, intervention, placement, or report.</p></div>`,
    faqs: [['Can AI grade student work automatically?', 'A school may use approved systems for limited support, but final grading should remain explainable, policy-compliant, and subject to qualified human review.'],['Can I paste essays into a public chatbot?', 'Not when the work or surrounding details identify a learner or when the school has not approved that data use.'],['What is a safer first use?', 'Draft a rubric or feedback bank from public curriculum criteria, then review it before applying it to any learner work.']],
    related: [['assessment-generator.html','Assessment generator'],['continuous-assessment-guide.html','Continuous assessment guide'],['ai-report-card-comments-guide.html','AI report comments']]
  }
];

function esc(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function schemaFor(guide) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article', headline: guide.title, description: guide.description,
        datePublished: updated, dateModified: updated,
        author: {'@type':'Organization', name:'JENECONK Integrated Global Solutions Ltd', url:'https://jeneconk.com'},
        publisher: {'@type':'Organization', name:'JENECONK', logo:{'@type':'ImageObject', url:'https://jeneconk.com/assets/logo.png'}},
        mainEntityOfPage: `https://jeneconk.com/${guide.slug}.html`
      },
      {
        '@type': 'BreadcrumbList', itemListElement: [
          {'@type':'ListItem', position:1, name:'Home', item:'https://jeneconk.com/'},
          {'@type':'ListItem', position:2, name:'Resources', item:'https://jeneconk.com/resources.html'},
          {'@type':'ListItem', position:3, name:guide.title, item:`https://jeneconk.com/${guide.slug}.html`}
        ]
      },
      {
        '@type': 'FAQPage', mainEntity: guide.faqs.map(([q,a]) => ({'@type':'Question', name:q, acceptedAnswer:{'@type':'Answer', text:a}}))
      }
    ]
  }, null, 2).replace(/</g, '\\u003c');
}

function page(guide) {
  const jumpLinks = [...guide.sections.matchAll(/<h2 id="([^"]+)">([^<]+)<\/h2>/g)]
    .map(([,id,label]) => `<a href="#${id}">${label}</a>`).join('');
  const faqHtml = guide.faqs.map(([q,a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('');
  const related = guide.related.map(([href,label]) => `<a href="${href}"${href.startsWith('http') ? ' target="_blank" rel="noreferrer"' : ''}>${label}</a>`).join('');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="${esc(guide.description)}">
  <title>${esc(guide.title)} | JENECONK Resources</title>
  <link rel="canonical" href="https://jeneconk.com/${guide.slug}.html">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/styles.css?v=20260810-2">
  <link rel="stylesheet" href="assets/global-guides.css?v=20260810-1">
  <link rel="icon" href="favicon.ico" sizes="any">
  <link rel="apple-touch-icon" href="assets/logo.png">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${esc(guide.title)}">
  <meta property="og:description" content="${esc(guide.description)}">
  <meta property="og:url" content="https://jeneconk.com/${guide.slug}.html">
  <meta property="og:image" content="https://jeneconk.com/assets/og-preview.svg">
  <meta property="article:published_time" content="${updated}">
  <meta property="article:modified_time" content="${updated}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(guide.title)}">
  <meta name="twitter:description" content="${esc(guide.description)}">
  <meta name="twitter:image" content="https://jeneconk.com/assets/og-preview.svg">
  <meta name="google-adsense-account" content="ca-pub-1616319355564791">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1616319355564791" crossorigin="anonymous"></script>
  <script type="application/ld+json">${schemaFor(guide)}</script>
</head>
<body>
  <header class="site-header" data-header>
    <a class="brand" href="index.html"><img class="brand-logo" src="assets/logo.png" alt="" width="40" height="38"><span><strong>JENECONK</strong><small>Integrated Global Solutions</small></span></a>
    <button class="nav-toggle" type="button" data-nav-toggle aria-label="Open navigation"><span></span><span></span><span></span></button>
    <nav class="nav" data-nav><a href="education.html">Education</a><a href="business.html">Business</a><a href="training.html">Training</a><a href="tools.html">Tools</a><a href="resources.html" aria-current="page">Resources</a><a href="about.html">Company</a><a class="nav-cta edu" href="https://edu.jeneconk.com" target="_blank" rel="noreferrer">Edu Suite 2.0</a><a class="nav-cta" href="https://business.jeneconk.com" target="_blank" rel="noreferrer">Business Suite</a><a class="nav-cta alt" href="cbt-portal.html">CBT Setup</a></nav>
  </header>
  <main>
    <section class="guide-hero"><div class="container"><nav class="breadcrumb"><a href="index.html">Home</a><span>/</span><a href="resources.html">Resources</a><span>/</span><span>${esc(guide.category)}</span></nav><p class="eyebrow">${esc(guide.category)}</p><h1>${esc(guide.title)}</h1><p class="lead">${esc(guide.intro)}</p><div class="hero-actions"><a class="btn btn-primary" href="resources.html">Explore resources</a><a class="btn btn-secondary" href="site-index.html">Browse site index</a></div></div></section>
    <section class="section-pad"><div class="container guide-shell">
      <article class="guide-article"><div class="guide-meta"><span>Updated ${updated}</span><span>JENECONK editorial team</span><span>International edition</span></div><nav class="guide-jump" aria-label="Guide sections">${jumpLinks}<a href="#faq">Questions</a></nav>${guide.sections}<section class="guide-faq" id="faq"><h2>Frequently asked questions</h2>${faqHtml}</section></article>
      <aside class="guide-sidebar"><div class="guide-side-card"><strong>Work with JENECONK</strong><p>Bring structured AI, education, business, and training workflows into your school or organisation.</p><a class="btn btn-primary" href="contact.html">Contact JENECONK</a></div><div class="guide-side-card"><strong>Related resources</strong>${related}<a href="resources.html">All resources</a></div></aside>
    </div></section>
  </main>
  <footer class="site-footer"><div class="container footer-grid"><div><a class="brand footer-brand" href="index.html"><img class="brand-logo" src="assets/logo.png" alt="" width="40" height="38"><span><strong>JENECONK</strong><small>Integrated Global Solutions</small></span></a><p>AI-powered education, business, training, tools, and digital transformation systems.</p></div><div><strong>Products</strong><a href="https://edu.jeneconk.com" target="_blank" rel="noreferrer">Edu Suite 2.0</a><a href="jems.html">JEMS English Mastery</a><a href="https://business.jeneconk.com" target="_blank" rel="noreferrer">Business Suite</a><a href="smart-procurement.html">Smart Procurement</a><a href="cbt-portal.html">CBT Setup Enquiry</a></div><div><strong>Ecosystem</strong><a href="education.html">Education</a><a href="business.html">Business</a><a href="training.html">Training</a><a href="tools.html">Tools</a><a href="resources.html">Resources</a></div><div><strong>Company &amp; Policies</strong><a href="about.html">About</a><a href="contact.html">Contact</a><a href="privacy-policy.html">Privacy Policy</a><a href="terms-of-use.html">Terms of Use</a><a href="cookie-policy.html">Cookie Policy</a><a href="editorial-policy.html">Editorial Policy</a><a href="content-transparency.html">Content Transparency</a><a href="mailto:info@jeneconk.com">info@jeneconk.com</a><span>Port Harcourt, Nigeria</span></div></div></footer>
  <script src="assets/main.js"></script>
</body>
</html>`;
}

for (const guide of guides) fs.writeFileSync(`${guide.slug}.html`, page(guide), 'utf8');
console.log(`Generated ${guides.length} international guides.`);
