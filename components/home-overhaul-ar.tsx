/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpLeft,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { ProjectVisual } from "@/components/project-visual";
import { profile } from "@/data/public";
import { profileAr, projectsAr } from "@/data/public-ar";
import { projectVisuals } from "@/data/project-visuals";
import { writingArticlesAr } from "@/data/writing-ar";
import type { WritingArticle } from "@/data/writing";

const experienceSignalsAr = [
  { name: "Network International", relationship: "وظيفة" },
  { name: "Al Tayseer", relationship: "وظيفة" },
  { name: "Orcas", relationship: "تدريس" },
  { name: "NARSS", relationship: "تدريب" },
  { name: "Zewail City", relationship: "تدريب" },
] as const;

const learningSignalsAr = [
  { name: "Databricks", relationship: "شهادة" },
  { name: "McKinsey Forward", relationship: "شهادة" },
  { name: "Canadian International College", relationship: "تعليم" },
  { name: "ExploreAI / ALX", relationship: "منحة" },
] as const;

const calibration = projectVisuals.presaira.reliability;
const heroChartPoints = calibration
  .map(({ predicted, observed }) => {
    const x = 18 + predicted * 284;
    const y = 160 - observed * 132;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  })
  .join(" ");

const opportunityStagesAr = [
  ["01", "اكتشاف"],
  ["02", "تثبيت الحقيقة"],
  ["03", "إعداد"],
  ["04", "مراقبة"],
  ["05", "تعلّم"],
] as const;

function EvidenceAtlasAr() {
  return (
    <div className="hero-evidence-atlas" aria-label="خريطة أدلة من مشروعات محمد العامة">
      <div className="atlas-grid" aria-hidden="true" />

      <figure className="atlas-panel atlas-forecast">
        <figcaption>
          <span dir="ltr">Presaira</span>
          <strong>معايرة الاحتمالات</strong>
        </figcaption>
        <svg viewBox="0 0 320 180" role="img" aria-label="دليل معايرة احتمالات Presaira بعد البطولة">
          <line className="atlas-axis" x1="18" x2="302" y1="160" y2="28" />
          {[52, 88, 124, 160].map((y) => (
            <line className="atlas-guide" key={y} x1="18" x2="302" y1={y} y2={y} />
          ))}
          <polyline className="atlas-curve" points={heroChartPoints} />
          {calibration.map(({ predicted, observed }, index) => (
            <circle
              className="atlas-point"
              key={`${predicted}-${observed}`}
              cx={18 + predicted * 284}
              cy={160 - observed * 132}
              r={index === calibration.length - 1 ? 5 : 4}
            />
          ))}
        </svg>
        <div className="atlas-proof" aria-label="ملخص دليل Presaira">
          <span>104 مباراة</span>
          <span>50 ألف محاكاة Monte Carlo</span>
        </div>
      </figure>

      <figure className="atlas-panel atlas-sar">
        <img
          src={projectVisuals["oil-spill-detection"].image}
          alt="مخرج عام من دراسة حالة لاكتشاف تسرب نفطي بصور Sentinel-1 SAR"
          width={1024}
          height={640}
          fetchPriority="low"
        />
        <figcaption>
          <span>اكتشاف التسرب النفطي</span>
          <strong dir="ltr">Sentinel-1 · SAR</strong>
        </figcaption>
      </figure>

      <div className="atlas-panel atlas-system" aria-label="دليل مسار OpportunityOS المحكوم">
        <div className="atlas-system-head">
          <span dir="ltr">OpportunityOS</span>
          <strong>الحقيقة تقيّد الفعل</strong>
        </div>
        <div className="atlas-stages">
          {opportunityStagesAr.map(([index, stage]) => (
            <span key={stage}><i aria-hidden="true">{index}</i>{stage}</span>
          ))}
        </div>
      </div>

      <div className="atlas-coordinate atlas-coordinate-a" aria-hidden="true">احتمال / دليل</div>
      <div className="atlas-coordinate atlas-coordinate-b" aria-hidden="true">نظام / قرار</div>
    </div>
  );
}

export function SystemHeroAr() {
  return (
    <section id="top" className="hero overhaul-hero phase-k-home">
      <div className="overhaul-hero-shell shell">
        <div className="overhaul-hero-meta">
          <span>البيانات · الذكاء الاصطناعي · المنتجات</span>
          <span>{profileAr.location}</span>
        </div>

        <EvidenceAtlasAr />

        <div className="overhaul-hero-copy">
          <p className="overhaul-hero-index" aria-hidden="true">M7 / 01</p>
          <h1 className="overhaul-hero-title" lang="en" dir="ltr">
            <span>Mohammed Ehab</span> <em className="display-script">ElNomany</em>
          </h1>
          <p className="overhaul-hero-proposition">{profileAr.proposition}</p>
          <div className="overhaul-hero-actions">
            <a className="overhaul-action overhaul-action-primary" href="#work">
              استكشف الأعمال المختارة <ArrowDownLeft size={17} aria-hidden="true" />
            </a>
            <a className="overhaul-action overhaul-action-secondary" href={`mailto:${profile.email}`} data-conversion="hero-contact-ar">
              ناقش فرصة <ArrowUpLeft size={17} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="overhaul-hero-route" aria-hidden="true">
          <span>تنبؤ</span><span>حوكمة</span><span>اكتشاف</span><span>قرار</span>
        </div>
      </div>
    </section>
  );
}

function RailSequenceAr({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="credibility-sequence" aria-hidden={duplicate ? "true" : undefined}>
      <span className="credibility-group">خبرة عملية</span>
      {experienceSignalsAr.map((signal) => (
        <span
          className="credibility-item"
          aria-label={`${signal.relationship}: ${signal.name}`}
          key={`experience-${signal.name}`}
        >
          <small>{signal.relationship}</small>
          <strong dir="ltr">{signal.name}</strong>
        </span>
      ))}
      <span className="credibility-group">تعلم وشهادات</span>
      {learningSignalsAr.map((signal) => (
        <span
          className="credibility-item"
          aria-label={`${signal.relationship}: ${signal.name}`}
          key={`learning-${signal.name}`}
        >
          <small>{signal.relationship}</small>
          <strong dir="ltr">{signal.name}</strong>
        </span>
      ))}
    </div>
  );
}

export function CredibilityRailAr() {
  return (
    <section className="credibility-rail" aria-label="خبرة وتعليم وشهادات مختارة">
      <div className="credibility-rail-label shell">
        <p>المصداقية، في مساحة صغيرة.</p>
        <Link href="/ar/about">السيرة المهنية كاملة <ArrowUpLeft size={13} aria-hidden="true" /></Link>
      </div>
      <div className="credibility-viewport" tabIndex={0} aria-label="علاقات مهنية وتعليمية مختارة">
        <div className="credibility-track">
          <RailSequenceAr />
          <RailSequenceAr duplicate />
        </div>
      </div>
    </section>
  );
}

const presairaAr = projectsAr.find((project) => project.slug === "presaira")!;
const opportunityAr = projectsAr.find((project) => project.slug === "opportunityos")!;
const ghareebAr = projectsAr.find((project) => project.slug === "ghareeb-oglu")!;
const ghareebStagesAr = ["استكشاف", "المنتج", "السلة", "التنفيذ"] as const;

export function SelectedWorkGalleryAr() {
  return (
    <section id="work" className="selected-work" data-selected-work-ar>
      <div className="shell selected-work-shell">
        <header className="selected-work-intro">
          <div>
            <p className="selected-work-eyebrow">أعمال مختارة · 01</p>
            <h2>ثلاثة مداخل إلى العمل. <em>معيار واحد.</em></h2>
          </div>
          <div className="selected-work-intro-copy">
            <p>
              تحتفظ الصفحة الرئيسية بثلاثة أنظمة فقط. لكل واحد منها نوع مختلف من الدليل، والتفاصيل الكاملة موجودة في دراسة الحالة عندما تحتاج إلى التعمق.
            </p>
            <Link href="/ar/work">استعرض المشروعات الستة <ArrowUpLeft size={15} aria-hidden="true" /></Link>
          </div>
        </header>

        <div className="selected-work-gallery">
          <Link
            className="selected-work-card selected-work-feature"
            href={`/ar/work/${presairaAr.slug}`}
            data-project-slug={presairaAr.slug}
            data-conversion="selected-work-to-case-study-ar"
          >
            <div className="selected-work-feature-visual">
              <ProjectVisual slug="presaira" locale="ar" />
            </div>
            <div className="selected-work-card-copy">
              <div className="selected-work-card-meta"><span>01</span><span>{presairaAr.kicker}</span></div>
              <h3><bdi>{presairaAr.title}</bdi></h3>
              <p>{presairaAr.statement}</p>
              <div className="selected-work-proof"><span>{presairaAr.proof}</span><ArrowUpLeft size={18} aria-hidden="true" /></div>
            </div>
          </Link>

          <Link
            className="selected-work-card selected-work-system"
            href={`/ar/work/${opportunityAr.slug}`}
            data-project-slug={opportunityAr.slug}
            data-conversion="selected-work-to-case-study-ar"
          >
            <div className="selected-work-system-top">
              <div className="selected-work-card-meta"><span>02</span><span>{opportunityAr.kicker}</span></div>
              <ArrowUpLeft size={18} aria-hidden="true" />
            </div>
            <div className="selected-work-system-map" aria-label="مسار عام وآمن لـ OpportunityOS">
              {opportunityStagesAr.map(([index, stage]) => (
                <span key={stage}><i aria-hidden="true">{index}</i>{stage}</span>
              ))}
            </div>
            <div className="selected-work-card-copy selected-work-card-copy-compact">
              <h3><bdi>{opportunityAr.title}</bdi></h3>
              <p>{opportunityAr.statement}</p>
              <span className="selected-work-boundary">بنية عامة آمنة · الحقيقة والمصدر يحددان سلطة الفعل</span>
            </div>
          </Link>

          <Link
            className="selected-work-card selected-work-commerce"
            href={`/ar/work/${ghareebAr.slug}`}
            data-project-slug={ghareebAr.slug}
            data-conversion="selected-work-to-case-study-ar"
          >
            <div className="selected-work-commerce-head">
              <div className="selected-work-card-meta"><span>03</span><span>{ghareebAr.kicker}</span></div>
              <ArrowUpLeft size={18} aria-hidden="true" />
            </div>
            <div className="selected-work-browser" aria-label="رحلة تجارة إلكترونية عامة وآمنة لـ Ghareeb Oglu">
              <div className="selected-work-browser-bar"><span /><span /><span /><strong dir="ltr">ghareeboglu.com</strong></div>
              <div className="selected-work-browser-body">
                <p>من الاستكشاف إلى التنفيذ.</p>
                <div>
                  {ghareebStagesAr.map((stage, index) => (
                    <span key={stage}><i aria-hidden="true">0{index + 1}</i>{stage}</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="selected-work-card-copy selected-work-card-copy-compact">
              <h3><bdi>{ghareebAr.title}</bdi></h3>
              <p>{ghareebAr.statement}</p>
              <span className="selected-work-boundary">رحلة تجارة عامة آمنة · صور العلامة والمنتجات المحمية غير منشورة</span>
            </div>
          </Link>
        </div>

        <div className="selected-work-footer">
          <span>3 هنا · 6 دراسات حالة عامة</span>
          <Link href="/ar/work">كل الأعمال <ArrowUpLeft size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}

const rawSignalsAr = [
  ["مصدر 01", "بيانات متفرقة"],
  ["مصدر 02", "تعريفات متعارضة"],
  ["السؤال", "ما الذي يهم فعلاً؟"],
  ["الحدود", "الدليل غير مكتمل"],
] as const;

const outputsAr = [
  ["انقل", "ترحيل متحقق منه"],
  ["اشرح", "تحليلات جاهزة للقرار"],
  ["تنبأ", "نموذج مُقيّم"],
  ["احكم", "مسار AI بحدود واضحة"],
  ["سلّم", "منتج قابل للاستخدام"],
] as const;

const methodStepsAr = [
  {
    index: "01",
    verb: "اكشف",
    title: "اجعل الحقيقة مرئية.",
    detail: "اكشف البيانات والأدلة والقيود وما لا نعرفه قبل أن تحسّن أي شيء حولها.",
  },
  {
    index: "02",
    verb: "قلّل",
    title: "قلّل الغموض.",
    detail: "حوّل سؤال الأعمال الضبابي إلى خرائط ونماذج وقرارات وواجهات يمكن للجميع فهمها.",
  },
  {
    index: "03",
    verb: "ابنِ",
    title: "احمل المهمة حتى النهاية.",
    detail: "ابنِ أصغر نظام موثوق يستطيع الصمود أمام الاستخدام الحقيقي والقرارات الحقيقية.",
  },
] as const;

function EvidenceGlyphAr() {
  return (
    <svg className="solve-think-glyph" viewBox="0 0 180 76" aria-hidden="true">
      <g className="solve-think-glyph-noise">
        <circle cx="12" cy="19" r="3" /><circle cx="32" cy="52" r="3" /><circle cx="49" cy="28" r="3" />
        <circle cx="72" cy="61" r="3" /><circle cx="84" cy="15" r="3" /><circle cx="103" cy="43" r="3" />
      </g>
      <path d="M12 65 C48 65, 48 11, 88 11 S128 65, 168 65" />
      <line x1="118" y1="18" x2="168" y2="18" /><line x1="118" y1="31" x2="168" y2="31" />
      <line x1="118" y1="44" x2="168" y2="44" /><line x1="118" y1="57" x2="168" y2="57" />
    </svg>
  );
}

function DecisionGlyphAr() {
  return (
    <svg className="solve-think-glyph" viewBox="0 0 180 76" aria-hidden="true">
      <path d="M10 38 H46" /><path d="M46 38 C68 38 63 14 88 14 H110" /><path d="M46 38 C68 38 63 62 88 62 H110" />
      <path className="solve-think-glyph-muted" d="M46 38 H110" />
      <rect x="118" y="7" width="50" height="14" rx="2" /><rect className="solve-think-glyph-muted" x="118" y="31" width="50" height="14" rx="2" />
      <rect className="solve-think-glyph-muted" x="118" y="55" width="50" height="14" rx="2" />
      <path d="M131 14 L137 19 L149 8" />
    </svg>
  );
}

function SystemGlyphAr() {
  return (
    <svg className="solve-think-glyph" viewBox="0 0 180 76" aria-hidden="true">
      <rect x="10" y="11" width="42" height="54" rx="3" /><rect x="69" y="11" width="42" height="54" rx="3" /><rect x="128" y="11" width="42" height="54" rx="3" />
      <path d="M52 38 H69" /><path d="M111 38 H128" />
      <line x1="18" y1="24" x2="43" y2="24" /><line x1="18" y1="34" x2="38" y2="34" /><line x1="18" y1="44" x2="45" y2="44" />
      <polyline points="77,48 83,40 89,43 96,28 103,24" />
      <circle cx="148" cy="38" r="10" /><path d="M143 38 L147 42 L154 33" />
    </svg>
  );
}

const methodGlyphsAr = [<EvidenceGlyphAr key="evidence" />, <DecisionGlyphAr key="decision" />, <SystemGlyphAr key="system" />] as const;

export function SolveThinkBridgeAr() {
  return (
    <section id="method" className="solve-think" data-solve-think-ar>
      <div className="shell solve-think-shell">
        <header className="solve-think-intro">
          <div>
            <p className="solve-think-eyebrow">كيف أعمل · 02</p>
            <h2>أحب الجزء <em>غير المرتّب.</em></h2>
          </div>
          <div className="solve-think-intro-copy">
            <p>
              المرحلة التي تسبق لوحة المعلومات أو النموذج أو المنتج: السؤال ما زال ضبابياً، والبيانات متفرقة، وكل طرف يستخدم تعريفاً مختلفاً.
            </p>
            <p>
              لا أبدأ بالأداة. أجعل المشكلة قابلة للفهم، وأقلّل الغموض، ثم أبني أصغر نظام موثوق يستطيع حمل المهمة.
            </p>
          </div>
        </header>

        <div className="solve-think-board" aria-label="تحويل المشكلة إلى نظام">
          <div className="solve-think-raw" aria-label="حالة المشكلة المعتادة">
            <div className="solve-think-board-label"><span>المدخل</span><strong>واقع غير مرتب</strong></div>
            <div className="solve-think-raw-stack">
              {rawSignalsAr.map(([key, value], index) => (
                <div className="solve-think-raw-line" key={key} data-offset={index % 3}>
                  <span>{key}</span><strong>{value}</strong>
                </div>
              ))}
            </div>
            <div className="solve-think-noise" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
          </div>

          <div className="solve-think-process">
            {methodStepsAr.map((step, index) => (
              <article className="solve-think-step" key={step.index}>
                <div className="solve-think-step-head"><span>{step.index}</span><strong>{step.verb}</strong></div>
                {methodGlyphsAr[index]}
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </article>
            ))}
          </div>

          <div className="solve-think-output" aria-label="أنواع الأنظمة التي تنتجها هذه الطريقة">
            <div className="solve-think-board-label"><span>المخرج</span><strong>نظام موثوق</strong></div>
            <div className="solve-think-output-stack">
              {outputsAr.map(([verb, label]) => (
                <div key={verb}><span>{verb}</span><strong>{label}</strong></div>
              ))}
            </div>
            <div className="solve-think-status"><i aria-hidden="true" /> جاهز للقرار</div>
          </div>

          <div className="solve-think-flow" aria-hidden="true"><span /><span /><span /></div>
        </div>

        <footer className="solve-think-footer">
          <p><strong>الوسيط يتغير.</strong> مسار ترحيل، توقع، لوحة معلومات، مسار ذكاء اصطناعي أو منتج للعميل. الانضباط التشغيلي يبقى نفسه.</p>
          <Link href="/ar/work" data-conversion="method-to-work-ar">افحص الدليل <ArrowUpLeft size={15} aria-hidden="true" /></Link>
        </footer>
      </div>
    </section>
  );
}

const closingCalibrationPoints = calibration
  .map(({ predicted, observed }) => {
    const x = 20 + predicted * 250;
    const y = 145 - observed * 112;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  })
  .join(" ");

function ForecastNoteVisualAr() {
  return (
    <div className="closing-note-visual closing-note-forecast" aria-label="دليل معايرة احتمالات Presaira">
      <div className="closing-note-visual-head"><span>تنبؤ / معايرة</span><strong>104 / 104</strong></div>
      <svg viewBox="0 0 290 165" role="img" aria-label="مقارنة النتائج المرصودة باحتمالات التوقع">
        <line className="closing-note-reference" x1="20" x2="270" y1="145" y2="33" />
        {[48, 80, 112, 145].map((y) => <line className="closing-note-guide" key={y} x1="20" x2="270" y1={y} y2={y} />)}
        <polyline className="closing-note-curve" points={closingCalibrationPoints} />
        {calibration.map(({ predicted, observed }) => (
          <circle key={`${predicted}-${observed}`} cx={20 + predicted * 250} cy={145 - observed * 112} r="4" />
        ))}
      </svg>
      <div className="closing-note-proof"><span>تقييم سليم</span><span>تغطية</span><span>اعتمادية</span></div>
    </div>
  );
}

function OilNoteVisualAr() {
  const visual = projectVisuals["oil-spill-detection"];
  return (
    <div className="closing-note-visual closing-note-oil" aria-label="دليل SAR لاكتشاف التسرب النفطي">
      <img src={visual.image} alt="دليل عام من دراسة حالة لاكتشاف تسرب نفطي بصور SAR" width={1024} height={640} loading="lazy" />
      <div className="closing-note-oil-overlay" aria-hidden="true" />
      <div className="closing-note-visual-head"><span>SAR / تجزئة</span><strong dir="ltr">Oil IoU 0.566</strong></div>
      <div className="closing-note-proof"><span dir="ltr">Recall 0.764</span><span>5 فئات</span><span dir="ltr">Sentinel-1</span></div>
    </div>
  );
}

function noteVisualAr(article: WritingArticle) {
  if (article.projectSlug === "presaira") return <ForecastNoteVisualAr />;
  if (article.projectSlug === "oil-spill-detection") return <OilNoteVisualAr />;
  return null;
}

export function HomeClosingAr() {
  const featured = [
    writingArticlesAr.find((article) => article.slug === "when-to-trust-a-probabilistic-forecast"),
    writingArticlesAr.find((article) => article.slug === "why-accuracy-is-not-enough-for-oil-spill-detection"),
  ].filter((article): article is WritingArticle => Boolean(article));

  return (
    <>
      <section id="writing" className="closing-thinking">
        <div className="shell closing-thinking-shell">
          <header className="closing-heading">
            <div>
              <p className="closing-eyebrow">تفكير · 03</p>
              <h2>ما علّمني إياه العمل.</h2>
            </div>
            <div className="closing-heading-side">
              <p>ملاحظتان مبنيتان على الدليل. المسار الكامل يبقى في المقالات ودراسات الحالة التي تقف خلفها.</p>
              <Link href="/ar/writing">كل الكتابات <ArrowUpLeft size={15} aria-hidden="true" /></Link>
            </div>
          </header>

          <div className="closing-notes">
            {featured.map((article, index) => (
              <Link
                key={article.slug}
                className="closing-note"
                href={`/ar/writing/${article.slug}`}
                data-authority-link="article-ar"
              >
                <div className="closing-note-copy">
                  <div className="closing-note-meta"><span>0{index + 1}</span><span>{article.topic}</span><span>{article.readingMinutes} دقائق</span></div>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <span className="closing-note-action">اقرأ الملاحظة <ArrowUpLeft size={15} aria-hidden="true" /></span>
                </div>
                {noteVisualAr(article)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="closing-opportunity">
        <div className="shell closing-opportunity-shell">
          <header className="closing-opportunity-head">
            <p className="closing-eyebrow">فرصة · 04</p>
            <h2>ابدأ من السياق الصحيح.</h2>
            <p>دور مهني، مشروع، أو مشكلة نظام — أسرع طريق هو الذي يصل ومعه السياق الذي يجعل الحوار مفيداً.</p>
          </header>

          <div className="closing-paths">
            <article className="closing-path">
              <div className="closing-path-index"><span>01</span><i aria-hidden="true" /></div>
              <p className="closing-path-kicker">توظيف / دور مهني</p>
              <h3>تبحث عن شخص لدور تقني أو في البيانات أو المنتجات؟</h3>
              <p>ابدأ بالأعمال، ثم أرسل الدور ومساحة المشكلة مباشرة.</p>
              <div className="closing-path-actions">
                <a href={`mailto:${profile.email}?subject=${encodeURIComponent("فرصة لدور تقني")}`} data-conversion="contact-role-email-ar">راسلني عن الدور <Mail size={15} aria-hidden="true" /></a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" data-conversion="contact-role-linkedin-ar"><span dir="ltr">LinkedIn</span> <Linkedin size={15} aria-hidden="true" /></a>
                <Link href="/ar/work">افحص الأعمال <ArrowUpLeft size={15} aria-hidden="true" /></Link>
              </div>
            </article>

            <article className="closing-path closing-path-project">
              <div className="closing-path-index"><span>02</span><i aria-hidden="true" /></div>
              <p className="closing-path-kicker">مشروع / نظام</p>
              <h3>لديك مشكلة نظام أو منتج تستحق الحل؟</h3>
              <p>ترحيل بيانات، تحليلات، تعلّم آلة وذكاء اصطناعي أو تسليم منتج — صفحة الخدمات توضّح ما تدعمه الأدلة العامة وما تدعمه الخبرة.</p>
              <div className="closing-path-actions">
                <Link href="/ar/services" data-conversion="home-to-services-ar">سياق الخدمات <ArrowLeft size={15} aria-hidden="true" /></Link>
                <a href={`mailto:${profile.email}?subject=${encodeURIComponent("فرصة مشروع أو نظام")}`} data-conversion="contact-project-email-ar">ناقش المشكلة <Mail size={15} aria-hidden="true" /></a>
              </div>
            </article>
          </div>
        </div>
      </section>

      <footer className="closing-directory">
        <div className="shell closing-directory-grid">
          <div className="closing-directory-brand">
            <Link className="closing-directory-mark" href="/ar#top" aria-label="M7 — العودة إلى الأعلى">M7</Link>
            <div><strong dir="ltr">{profile.name}</strong><span>البيانات · الذكاء الاصطناعي · المنتجات</span></div>
          </div>

          <nav className="closing-directory-nav" aria-label="دليل الموقع">
            <div><p>استكشف</p><Link href="/ar#work">الأعمال</Link><Link href="/ar/about">عني</Link><Link href="/ar/services">الخدمات</Link><Link href="/ar/writing">الكتابة</Link></div>
            <div><p>تواصل</p><a href={`mailto:${profile.email}`} data-conversion="footer-email-ar">البريد الإلكتروني</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><span dir="ltr">LinkedIn</span></a><a href={profile.github} target="_blank" rel="noreferrer"><span dir="ltr">GitHub</span></a></div>
          </nav>

          <div className="closing-directory-end">
            <a className="closing-directory-email" href={`mailto:${profile.email}`}><span dir="ltr">{profile.email}</span> <ArrowUpLeft size={14} aria-hidden="true" /></a>
            <p>© {new Date().getFullYear()} <span dir="ltr">{profile.name}</span>. هوية مهنية رقمية تتطور مع العمل.</p>
            <div className="closing-directory-icons" aria-hidden="true"><Mail size={14} /><Linkedin size={14} /><Github size={14} /></div>
          </div>
        </div>
      </footer>
    </>
  );
}
