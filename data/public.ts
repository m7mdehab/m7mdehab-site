// Curated runtime projection for the website UI.
// The governed completeness/provenance layer is data/source-of-truth.public.yaml.
// Never add private/confidential source facts here merely because they are verified.

export type ProjectTone = "blue" | "graphite" | "emerald" | "teal" | "amber" | "coral";

export const profile = {
  name: "Mohammed Ehab ElNomany",
  handle: "M7mdehab",
  location: "Cairo, Egypt",
  role: "Data Engineer",
  employer: "Network International",
  proposition: "I turn complex data and business problems into reliable systems, models, analytics and products.",
  shortBio:
    "I work across data engineering, analytics, machine learning, AI and product delivery — translating ambiguous business problems into systems people can trust and use.",
  email: "M7mdehab999@gmail.com",
  github: "https://github.com/m7mdehab",
  linkedin: "https://www.linkedin.com/in/mohammed-ehab",
  domain: "https://m7mdehab.com",
} as const;

export const capabilities = [
  { title: "Data Engineering & Migration", detail: "Pipelines, mapping, transformation, profiling, cleansing, validation, reconciliation and reliable movement between systems." },
  { title: "Analytics & BI", detail: "KPI design, reporting systems, dashboards and decision-focused analysis." },
  { title: "Data Science & ML", detail: "Forecasting, probabilistic models, deep learning and practical model validation." },
  { title: "AI Engineering", detail: "LLM applications, RAG, governed workflows and agentic product architecture." },
  { title: "Product & Software", detail: "Web products, ecommerce, product delivery and end-to-end technical execution." },
] as const;

export const skillGroups = [
  { title: "Data engineering", skills: ["Advanced SQL", "ETL & Data Pipelines", "Data Migration", "Source-to-Target Mapping", "Data Transformation", "Data Profiling", "Data Cleansing & Validation", "Data Reconciliation", "PostgreSQL"] },
  { title: "Cloud & platforms", skills: ["Databricks", "AWS Foundations", "Supabase", "ERPNext"] },
  { title: "Programming", skills: ["Python", "pandas", "NumPy", "scikit-learn", "SQL", "TypeScript / JavaScript (basic)"] },
  { title: "Analytics & BI", skills: ["Power BI", "Advanced Excel", "KPI Design", "Dashboards", "Reporting & Analytics"] },
  { title: "ML & AI", skills: ["Deep Learning", "TensorFlow", "PyTorch", "NLP", "Generative AI & LLMs", "RAG", "Agents", "Statistical & Probabilistic Modeling"] },
  { title: "Business & delivery", skills: ["Requirements Gathering", "Stakeholder Management", "Cross-functional Collaboration", "Problem Solving", "Team Leadership"] },
] as const;

export const projects = [
  { slug: "presaira", title: "Presaira", kicker: "Probabilistic forecasting product", statement: "A full-tournament forecasting system that forecast all 104 matches of the 2026 World Cup, with reproducible runs, model evaluation and 50,000-iteration Monte Carlo simulation.", proof: "Data science · forecasting · calibration & evaluation · Monte Carlo · reproducibility", tone: "blue" as ProjectTone, href: "https://presaira.com" },
  { slug: "opportunityos", title: "OpportunityOS", kicker: "Governed AI system", statement: "A truth-locked opportunity workflow built around governed autonomous agents, provenance and controlled generation.", proof: "AI engineering · multi-agent architecture · governance · product systems", tone: "graphite" as ProjectTone, href: "https://github.com/m7mdehab/opportunityos-docs" },
  { slug: "ghareeb-oglu", title: "Ghareeb Oglu Commerce", kicker: "End-to-end ecommerce product", statement: "A commerce platform planned, architected and built from scratch in code — spanning storefront, backend, payments, fulfillment and deployment.", proof: "Product ownership · software architecture · ecommerce · coded execution", tone: "emerald" as ProjectTone },
  { slug: "oil-spill-detection", title: "Oil Spill Detection", kicker: "SAR computer vision", statement: "A Sentinel-1 SAR semantic-segmentation pipeline for detecting marine oil spills, with model evaluation, georeferenced outputs, API serving and an interactive map UI.", proof: "Deep learning · computer vision · remote sensing · validation", tone: "teal" as ProjectTone, href: "https://github.com/m7mdehab/oil-spill-detection" },
  { slug: "solar-site-selection", title: "Solar Site Selection", kicker: "Geospatial decision system", statement: "A photovoltaic siting engine combining public geodata, AHP multi-criteria analysis, suitability mapping, ranked candidate sites and energy/LCOE estimates.", proof: "Geospatial analytics · optimization · data integration · decision systems", tone: "amber" as ProjectTone, href: "https://github.com/m7mdehab/SolarSiteSelection" },
  { slug: "makhbazy", title: "Makhbazy", kicker: "Mobile product leadership", statement: "Designed the UI/UX and led Android and iOS product delivery from concept through implementation, supervision and release approval.", proof: "Product leadership · UI/UX · technical supervision · mobile delivery", tone: "coral" as ProjectTone },
] as const;

export const experience = [
  { company: "Network International", role: "Data Engineer", period: "2026 — Present", note: "Enterprise data engineering, integration and migration; project and client details intentionally limited for confidentiality." },
  { company: "Al Tayseer International", role: "Business Analyst Team Lead", period: "2025 — 2026", note: "Unified multi-brand reporting, KPI alignment and commercial decision support." },
  { company: "Guksu", role: "Data Analyst & Supply Chain Analyst", period: "2025", note: "Sales, inventory, production and warehouse reporting with manufacturing and sales planning." },
  { company: "Egyptian African Trade", role: "Technical Team Lead / Data Analyst", period: "2024 — 2025", note: "ERP data, KPI design, performance reporting and commercial analysis." },
] as const;

export const additionalExperience = [
  { company: "Orcas Online", role: "Private Tutor — Computer Science & Data", note: "Python, Java, data analysis, data science and machine learning." },
  { company: "Self-employed", role: "Freelance Web Developer / Consultant", note: "Business websites delivered from requirements through coded implementation, launch, hosting, domains and analytics." },
  { company: "NARSS", role: "Data / ML Intern", note: "Remote-sensing machine-learning and deep-learning systems." },
  { company: "Zewail City", role: "ML Intern", note: "Machine learning, deep learning and reinforcement-learning projects." },
] as const;

export const certifications = [
  { name: "Databricks Certified Data Engineer Associate", issuer: "Databricks", year: 2026 },
  { name: "AI / LLM Engineering", issuer: "Udemy · Ed Donner", year: 2025 },
  { name: "McKinsey Forward", issuer: "McKinsey Academy · Foundation & Advanced", year: 2024 },
  { name: "Problem Solving with C++", issuer: "Coach Academy", year: 2023 },
  { name: "Database Management with SQL", issuer: "Canadian International College", year: 2022 },
] as const;

export const education = [
  { qualification: "BSc Computer Science — Data Science Major", institution: "Canadian International College", period: "2021 — 2024", detail: "CGPA 3.55" },
  { qualification: "Data Science & AI Scholarship", institution: "ExploreAI Academy / ALX / African Leadership University", period: "2023 — 2024", detail: "15-month program" },
] as const;

// Runtime service/conversion projection. Proof strength and project relationships are reconciled
// against data/project-evidence.public.yaml. This is presentation metadata, not a new truth authority.
export const services = [
  {
    id: "data-migration-reconciliation",
    title: "Data migration & reconciliation",
    description: "Make complex system moves auditable, validated and dependable.",
    capability: "Data Engineering & Migration",
    evidence: "Current enterprise data-engineering role plus verified pipeline, mapping, transformation, profiling, cleansing, validation and reconciliation skills.",
    proofLabel: "Experience-backed · public visual evidence intentionally limited",
    projectSlugs: [] as readonly string[],
    directProjectSlugs: [] as readonly string[],
    projectContext: "Confidential enterprise work is not reconstructed into fake public screenshots or client diagrams.",
    contactSubject: "Data migration and reconciliation opportunity",
  },
  {
    id: "analytics-power-bi",
    title: "Analytics & Power BI",
    description: "Turn fragmented operational data into decision-ready reporting.",
    capability: "Analytics & BI",
    evidence: "Reporting and KPI work across Al Tayseer, Guksu and Egyptian African Trade, supported by verified Power BI, dashboard and Advanced Excel skills.",
    proofLabel: "Experience-backed · no publishable Power BI screenshot claimed",
    projectSlugs: ["presaira", "solar-site-selection"] as readonly string[],
    directProjectSlugs: [] as readonly string[],
    projectContext: "Related projects show analytical decision-making, not Power BI artifacts.",
    contactSubject: "Analytics and Power BI opportunity",
  },
  {
    id: "ml-ai-product-development",
    title: "ML & AI product development",
    description: "Build useful models and AI applications with evidence, testing and governance.",
    capability: "Data Science & ML · AI Engineering",
    evidence: "Strong public proof spans probabilistic forecasting, governed agentic workflows, computer vision and geospatial decision systems.",
    proofLabel: "Strong public project evidence",
    projectSlugs: ["presaira", "opportunityos", "oil-spill-detection", "solar-site-selection"] as readonly string[],
    directProjectSlugs: ["presaira", "opportunityos", "oil-spill-detection", "solar-site-selection"] as readonly string[],
    projectContext: "Public models, evaluation artifacts, system architecture and product interfaces provide direct inspectable proof.",
    contactSubject: "ML and AI product opportunity",
  },
  {
    id: "product-web-development",
    title: "Product & web development",
    description: "Take digital products from requirements and architecture through coded implementation and launch.",
    capability: "Product & Software",
    evidence: "Cross-project proof covers coded ecommerce, forecasting products, governed AI systems, technical web interfaces, geospatial applications and mobile product leadership.",
    proofLabel: "Strong cross-project product evidence",
    projectSlugs: ["ghareeb-oglu", "makhbazy", "presaira", "opportunityos", "oil-spill-detection", "solar-site-selection"] as readonly string[],
    directProjectSlugs: ["ghareeb-oglu", "makhbazy", "presaira", "opportunityos", "oil-spill-detection", "solar-site-selection"] as readonly string[],
    projectContext: "Ownership language remains project-specific; product leadership is not inflated into sole coding where the evidence does not support it.",
    contactSubject: "Product and web development opportunity",
  },
] as const;

// Editorial inventory only. Substantive article bodies and evidence links live in data/writing.ts.
export const writing = [
  { slug: "when-to-trust-a-probabilistic-forecast", title: "When should you trust a probabilistic forecast?", topic: "Forecasting · calibration · evaluation", status: "Essay" },
  { slug: "why-accuracy-is-not-enough-for-oil-spill-detection", title: "Why accuracy alone is not enough for oil-spill detection", topic: "Computer vision · metrics · validation", status: "Essay" },
  { slug: "what-an-ai-agent-should-do-when-evidence-is-missing", title: "What should an AI agent do when the evidence is missing?", topic: "AI agents · provenance · governance", status: "Essay" },
] as const;