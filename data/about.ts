import { skillGroups } from "@/data/public";

export const aboutIntro = {
  headline: "The useful part of my background is the through-line.",
  body: "I have worked across data migration, analytics, machine learning, AI, software and commercial operations. The through-line is translating messy constraints into systems, analysis and products people can actually trust and use.",
  currentRole: "Data Migration Engineer",
  currentEmployer: "Network International",
  location: "Cairo, Egypt",
  languages: "English + Arabic",
} as const;

export const primaryExperience = [
  {
    period: "2026 — Present",
    role: "Data Migration Engineer",
    company: "Network International",
    mode: "Current role",
    summary: "Enterprise data migration for banking clients across Africa and the GCC, focused on source-to-target mapping, transformation, validation, profiling, cleansing and reconciliation.",
    boundary: "Client-identifying project detail remains intentionally limited.",
  },
  {
    period: "2025 — 2026",
    role: "Marketing Team Lead",
    company: "Al Tayseer International for Mills & Food Industries",
    mode: "Al Tayseer Group",
    summary: "Built and maintained two WordPress brand websites and consolidated multi-brand and external-agency performance data across four group companies into one reporting view for commercial decision-making.",
  },
  {
    period: "2025",
    role: "Supply Chain Specialist & Data Analyst",
    company: "Guksu",
    mode: "Al Tayseer Group",
    summary: "Aligned manufacturing and sales plans with available materials and finished goods, while building recurring sales, inventory, production and warehouse reporting for planning decisions.",
  },
  {
    period: "2024 — 2025",
    role: "Technical Team Lead / Data Analyst",
    company: "Egyptian African Trade",
    mode: "Al Tayseer Group",
    summary: "Extracted ERPNext sales, inventory and warehouse data, defined KPI and reporting logic with operations and finance, and connected paid-social performance to commercial outcomes.",
  },
] as const;

export const parallelExperience = [
  {
    period: "2024 — Present",
    role: "Private Tutor — Computer Science & Data",
    company: "Orcas Online",
    summary: "Tutor Python, Java, data analysis, data science and machine learning, adapting explanations and exercises to different levels, ages and goals.",
  },
  {
    period: "2024 — Present",
    role: "Freelance Web Developer / Consultant",
    company: "Self-employed",
    summary: "Delivered two business websites end-to-end, from requirements and structure through launch, hosting, domains and basic analytics.",
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
    summary: "Implemented machine-learning, deep-learning and reinforcement-learning projects in Python.",
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
  { year: "2025", name: "AI / LLM Engineering", issuer: "Udemy · Ed Donner" },
  { year: "2024", name: "McKinsey Forward — Foundation & Advanced", issuer: "McKinsey Academy" },
  { year: "2023", name: "Problem Solving with C++", issuer: "Coach Academy" },
  { year: "2022", name: "Database Management with SQL", issuer: "Canadian International College" },
  { year: "2020", name: "Data Analysis, Web Development & Digital Marketing", issuer: "Udacity / ITIDA · Challenger, Professional & Advanced" },
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
