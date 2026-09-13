import { skillGroupsAr } from "@/data/public-ar";

/**
 * Purpose-built Arabic editorial projection for /ar/about.
 * Truth-bearing facts remain aligned with the governed September 2026 baseline.
 */
export const aboutIntroAr = {
  headline: "الخيط الذي يربط الأدوار أهم من أسماء الوظائف.",
  body: "عملت عبر هندسة البيانات وترحيلها، والتحليلات، وتعلّم الآلة، والذكاء الاصطناعي، والبرمجيات والعمليات التجارية. الرابط بينها واحد: تحويل القيود المتشابكة إلى بيانات وتحليلات وأنظمة يمكن للناس فهمها والثقة بها واستخدامها.",
  currentRole: "مهندس بيانات",
  currentEmployer: "Network International",
  location: "القاهرة، مصر",
  languages: "العربية + الإنجليزية",
} as const;

export const primaryExperienceAr = [
  {
    period: "2026 — حتى الآن",
    role: "مهندس بيانات",
    company: "Network International",
    mode: "الدور الحالي",
    summary: "هندسة وتكامل وترحيل بيانات مؤسسية لعملاء مصرفيين في أفريقيا ودول الخليج، مع عمل مباشر على ETL، والربط بين المصدر والهدف، والتحويل، والتنميط، والتنظيف، والتحقق والتسوية.",
    boundary: "تفاصيل العملاء والتنفيذ الداخلي المملوك تبقى محدودة عمداً حفاظاً على السرية.",
  },
  {
    period: "2025 — 2026",
    role: "قائد فريق تحليل الأعمال",
    company: "Al Tayseer International",
    mode: "Al Tayseer Group",
    summary: "وحّدت بيانات أداء متعددة العلامات والوكالات الخارجية في رؤية تقارير واحدة، مع مواءمة مؤشرات الأداء والجداول الزمنية والتسليمات لدعم القرارات التجارية الشهرية.",
  },
  {
    period: "2025",
    role: "محلل بيانات ومحلل سلاسل إمداد",
    company: "Guksu",
    mode: "Al Tayseer Group",
    summary: "بنيت تقارير دورية للمبيعات والمخزون والإنتاج والمستودعات، ثم واءمت خطط التصنيع والمبيعات مع توافر المواد الخام والمنتجات النهائية.",
  },
  {
    period: "2024 — 2025",
    role: "قائد فريق تقني / محلل بيانات",
    company: "Egyptian African Trade",
    mode: "Al Tayseer Group",
    summary: "استخرجت بيانات المبيعات والمخزون والمستودعات من ERPNext، وحددت منطق مؤشرات الأداء والتقارير مع فرق العمليات والمالية، وربطت بيانات أداء الإعلانات بالنتائج التجارية.",
  },
] as const;

export const parallelExperienceAr = [
  {
    period: "2024 — حتى الآن",
    role: "مدرّس خاص",
    company: "Orcas Online",
    summary: "أدرّس Python وJava وتحليل البيانات وعلم البيانات وتعلّم الآلة، مع تكييف الشرح والتمارين حسب مستوى كل طالب وهدفه.",
  },
  {
    period: "عمل مستقل",
    role: "مطور ويب / مستشار مستقل",
    company: "Self-employed",
    summary: "سلّمت موقعي أعمال من البداية إلى النهاية: المتطلبات والهيكلة، ثم التنفيذ البرمجي والإطلاق والاستضافة والنطاقات والتحليلات.",
  },
] as const;

export const earlyExperienceAr = [
  {
    period: "نوفمبر — ديسمبر 2023",
    role: "متدرب بيانات / تعلّم آلة",
    company: "National Authority for Remote Sensing & Space Sciences (NARSS)",
    summary: "بنيت أنظمة لتحليل بيانات الاستشعار عن بُعد باستخدام تعلّم الآلة والتعلّم العميق على بنية سحابية.",
  },
  {
    period: "سبتمبر 2023",
    role: "متدرب تقنية معلومات",
    company: "Pharaonic Petroleum Company (PhPC)",
    summary: "صممت ونفذت حلولاً تقنية خلال تدريب عملي في بيئة بترولية مؤسسية.",
  },
  {
    period: "أغسطس 2023",
    role: "متدرب تعلّم آلة",
    company: "Zewail City for Science & Technology",
    summary: "نفذت مشروعات في تعلّم الآلة والتعلّم العميق والتعلّم المعزز.",
  },
] as const;

export const aboutEducationAr = [
  {
    period: "2021 — 2024",
    qualification: "بكالوريوس علوم الحاسب — تخصص علم البيانات",
    institution: "Canadian International College",
    detail: "المعدل التراكمي 3.55",
  },
  {
    period: "2023 — 2024",
    qualification: "منحة علم البيانات والذكاء الاصطناعي",
    institution: "ExploreAI Academy / ALX / African Leadership University",
    detail: "برنامج لمدة 15 شهراً",
  },
] as const;

export const aboutCertificationsAr = [
  { year: "2026", name: "Databricks Certified Data Engineer Associate", issuer: "Databricks" },
  { year: "2025", name: "AI / LLM Engineering", issuer: "Udemy · Ed Donner" },
  { year: "2024", name: "McKinsey Forward — Foundation & Advanced", issuer: "McKinsey Academy" },
  { year: "2023", name: "Problem Solving with C++", issuer: "Coach Academy" },
  { year: "2022", name: "Database Management with SQL", issuer: "Canadian International College" },
] as const;

export const aboutSkillGroupsAr = skillGroupsAr;

export const workingPrinciplesAr = [
  {
    index: "01",
    title: "اجعل الحقيقة مرئية.",
    copy: "ابدأ بما نعرفه فعلاً، وما ينقصنا، وما لا ينبغي الادعاء به. تصبح الأنظمة الأسلم أسهل في البناء عندما تكون حدود الدليل واضحة منذ البداية.",
  },
  {
    index: "02",
    title: "قلّل الغموض.",
    copy: "حوّل المتطلبات غير الواضحة والبيانات المتفرقة والقيود المتعارضة إلى نموذج مشترك يمكن للفرق التقنية وفرق الأعمال التفكير من خلاله معاً.",
  },
  {
    index: "03",
    title: "ابنِ أصغر نظام موثوق.",
    copy: "استخدم أبسط بنية تستطيع حمل المهمة الحقيقية، ثم أضف التعقيد فقط عندما يفرضه الدليل أو التشغيل.",
  },
] as const;
