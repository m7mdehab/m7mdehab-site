import { skillGroups } from "@/data/public";

export const aboutIntro = {
  headline: "The through-line matters more than titles.",
  body: "I have worked across data engineering, migration, analytics, machine learning, AI, software and commercial operations. The through-line is translating messy constraints into reliable data products, analysis and systems people can actually trust and use.",
  currentRole: "Data Engineer",
  currentEmployer: "Network International",
  location: "Cairo, Egypt",
  languages: "English + Arabic",
} as const;

export const primaryExperience = [
  {
    period: "2026 — Present",
    role: "Data Engineer",
    company: "Network International",
    mode: "Current role",
    summary: "Enterprise data engineering, integration and migration for banking clients across Africa and the GCC, with hands-on ETL, source-to-target mapping, transformation, profiling, cleansing, validation and reconciliation.",
    boundary: "Client-identifying and proprietary implementation detail remains intentionally limited.",
  },
  {
    period: "2025 — 2026",
    role: "Business Analyst Team Lead",
    company: "Al Tayseer International",
    mode: "Al Tayseer Group",
    summary: "Consolidated multi-brand and external-agency performance data across four group companies into a unified reporting view, aligning KPIs, timelines and deliverables for monthly commercial decision-making.",
  },
  {
    period: "2025",
    role: "Data Analyst & Supply Chain Analyst",
    company: "Guksu",
    mode: "Al Tayseer Group",
    summary: "Built recurring sales, inventory, production and warehouse reporting, then aligned manufacturing and sales plans with raw-material and finished-goods availability.",
  },
  {
    period: "2024 — 2025",
    role: "Technical Team Lead / Data Analyst",
    company: "Egyptian African Trade",
    mode: "Al Tayseer Group",
    summary: "Extracted ERPNext sales, inventory and warehouse data, defined KPI and reporting logic with operations and finance, and connected paid-social performance data with commercial outcomes.",
  },
] as const;

export const parallelExperience = [
  {
    period: "2024 — Present",
    role: "Private Tutor",
    company: "Orcas Online",
    summary: "Tutor Python, Java, data analysis, data science and machine learning, adapting explanations and exercises to different levels and goals.",
  },
  {
    period: "Independent",
    role: "Freelance Web Developer / Consultant",
    company: "Self-employed",
    summary: "Delivered two business websites end-to-end, from requirements and structure through coded implementation, launch, hosting, domains and analytics.",
  },
] as const;

export const earlyExperience = [
  {
    period: "Nov — Dec 2023",
    role: "Data / ML Intern",
    company: "National Authority for Remote Sensing & Space Sciences (NARSS)",
    summary: "Built remote-sensing data-analysis systems using machine learning and deep learning on cloud infrastructure.",
  },
  {
    period: "Sep 2023",
    role: "IT Intern",
    company: "Pharaonic Petroleum Company (PhPC)",
    summary: "Designed and implemented IT solutions during a technical internship.",
  },
  {
    period: "Aug 2023",
    role: "ML Intern",
    company: "Zewail City for Science & Technology",
    summary: "Implemented machine-learning, deep-learning and reinforcement-learning projects.",
  },
] as const;

export const aboutEducation = [
  {
    period: "2021 — 2024",
    qualification: "BSc Computer Science — Data Science Major",
    institution: "Canadian International College",
    detail: "CGPA 3.55",
  },
  {
    period: "2023 — 2024",
    qualification: "Data Science & AI Scholarship",
    institution: "ExploreAI Academy / ALX / African Leadership University",
    detail: "15-month scholarship",
  },
] as const;

export const aboutCertifications = [
  { year: "2026", name: "Databricks Certified Data Engineer Associate", issuer: "Databricks" },
  { year: "2025", name: "AI / LLM Engineering", issuer: "Udemy · Ed Donner" },
  { year: "2024", name: "McKinsey Forward — Foundation & Advanced", issuer: "McKinsey Academy" },
  { year: "2023", name: "Problem Solving with C++", issuer: "Coach Academy" },
  { year: "2022", name: "Database Management with SQL", issuer: "Canadian International College" },
] as const;

export const aboutSkillGroups = skillGroups;

export const workingPrinciples = [
  {
    index: "01",
    title: "Make the truth visible.",
    copy: "Start by understanding what is known, what is missing and what should not be claimed. Good systems become easier to build once the evidence boundary is explicit.",
  },
  {
    index: "02",
    title: "Reduce ambiguity.",
    copy: "Turn unclear requirements, fragmented data and competing constraints into a shared model that technical and business stakeholders can reason about together.",
  },
  {
    index: "03",
    title: "Build the smallest reliable system.",
    copy: "Use the simplest architecture that can carry the real job, then add complexity only when the evidence or operating constraints require it.",
  },
] as const;
