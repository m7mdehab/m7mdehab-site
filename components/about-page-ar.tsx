import Link from "next/link";
import { ArrowDownLeft, ArrowLeft, ArrowUpLeft, Mail } from "lucide-react";
import { Reveal } from "@/components/reveal";
import {
  aboutCertificationsAr,
  aboutEducationAr,
  aboutIntroAr,
  aboutSkillGroupsAr,
  earlyExperienceAr,
  parallelExperienceAr,
  primaryExperienceAr,
  workingPrinciplesAr,
} from "@/data/about-ar";
import { profile } from "@/data/public";

function AboutSectionHeadAr({ index, eyebrow, title, copy }: { index: string; eyebrow: string; title: string; copy?: string }) {
  return (
    <Reveal className="about-section-head">
      <div className="about-section-index"><span>{index}</span><i aria-hidden="true" /></div>
      <div>
        <p className="about-eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {copy ? <p className="about-section-copy">{copy}</p> : null}
    </Reveal>
  );
}

function ThroughLineMapAr() {
  const nodes = ["الترحيل", "التحليلات", "ML / AI", "المنتج"];
  return (
    <div className="about-through-map" aria-label="الخيط المهني بين ترحيل البيانات والتحليلات وتعلّم الآلة والذكاء الاصطناعي وتسليم المنتجات">
      <div className="about-through-map-head">
        <span>الموقع الحالي</span>
        <strong>{aboutIntroAr.currentRole}</strong>
        <small dir="ltr">{aboutIntroAr.currentEmployer}</small>
      </div>
      <div className="about-through-map-rail" aria-hidden="true"><i /><i /><i /></div>
      <div className="about-through-map-nodes">
        {nodes.map((node, index) => <span key={node}><small>0{index + 1}</small>{node}</span>)}
      </div>
      <div className="about-through-map-meta"><span>{aboutIntroAr.location}</span><span>{aboutIntroAr.languages}</span></div>
    </div>
  );
}

export function AboutPageAr() {
  return (
    <main id="main-content" className="about-page about-page-ar">
      <section className="about-hero">
        <div className="shell about-hero-shell">
          <Reveal className="about-hero-meta"><span>عني · السيرة المهنية</span><Link href="/ar">العودة للرئيسية <ArrowUpLeft size={14} aria-hidden="true" /></Link></Reveal>
          <div className="about-hero-grid">
            <Reveal className="about-hero-copy">
              <p className="about-eyebrow">الخيط الرابط</p>
              <h1>{aboutIntroAr.headline}</h1>
              <p>{aboutIntroAr.body}</p>
              <div className="about-hero-actions">
                <a href="#career">اتبع خريطة المسار <ArrowDownLeft size={16} aria-hidden="true" /></a>
                <Link href="/ar/work">افحص الأعمال <ArrowUpLeft size={16} aria-hidden="true" /></Link>
              </div>
            </Reveal>
            <Reveal delay={0.08}><ThroughLineMapAr /></Reveal>
          </div>
        </div>
      </section>

      <section id="career" className="about-career">
        <div className="shell">
          <AboutSectionHeadAr
            index="01"
            eyebrow="خريطة المسار"
            title="أدوار مختلفة. اتجاه مهني واحد."
            copy="التسلسل الزمني مهم، لكن الانتقالات أهم: عمق تقني اقترب من قرارات الأعمال، ثم عاد إلى أنظمة مؤسسية بانضباط أقوى في التسليم."
          />
          <div className="about-timeline">
            {primaryExperienceAr.map((item, index) => (
              <Reveal as="article" key={`${item.company}-${item.role}`} delay={index * 0.04} className="about-timeline-row">
                <div className="about-timeline-period"><span>{item.period}</span><i aria-hidden="true" /></div>
                <div className="about-timeline-role">
                  <p><bdi>{item.mode}</bdi></p>
                  <h3>{item.role}</h3>
                  <strong><bdi>{item.company}</bdi></strong>
                </div>
                <div className="about-timeline-context">
                  <p>{item.summary}</p>
                  {"boundary" in item && item.boundary ? <small>{item.boundary}</small> : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-parallel">
        <div className="shell">
          <AboutSectionHeadAr
            index="02"
            eyebrow="مسارات متوازية"
            title="التدريس والعمل مع العملاء استمرا إلى جوار المسار الرئيسي."
            copy="ليسا هامشاً في السيرة؛ كلاهما يختبر التواصل، وتحديد النطاق، وملكية التسليم من البداية إلى النهاية."
          />
          <div className="about-parallel-grid">
            {parallelExperienceAr.map((item, index) => (
              <Reveal as="article" key={item.company} delay={index * 0.06} className="about-parallel-card">
                <div className="about-parallel-top"><span>{item.period}</span><span>0{index + 1}</span></div>
                <p><bdi>{item.company}</bdi></p>
                <h3>{item.role}</h3>
                <div className="about-parallel-rule" aria-hidden="true" />
                <span>{item.summary}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-foundation">
        <div className="shell">
          <AboutSectionHeadAr index="03" eyebrow="البدايات" title="ثلاثة تدريبات، وثلاث بيئات تقنية مختلفة." />
          <div className="about-foundation-strip">
            {earlyExperienceAr.map((item, index) => (
              <Reveal as="article" key={item.company} delay={index * 0.05} className="about-foundation-item">
                <span className="about-foundation-index">0{index + 1}</span>
                <p>{item.period}</p>
                <h3>{item.role}</h3>
                <strong><bdi>{item.company}</bdi></strong>
                <span>{item.summary}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-learning">
        <div className="shell">
          <AboutSectionHeadAr
            index="04"
            eyebrow="سجل التعلم"
            title="أساس رسمي، ثم توسع موجّه."
            copy="التعليم والشهادات موجودة هنا لأنها تشرح اتساع المجال؛ لا تحتاج إلى شاشات مستقلة على الصفحة الرئيسية."
          />
          <div className="about-learning-grid">
            <div className="about-education-block">
              <p className="about-ledger-label">التعليم</p>
              {aboutEducationAr.map((item) => (
                <Reveal as="article" key={item.qualification} className="about-ledger-row">
                  <span>{item.period}</span>
                  <div><h3>{item.qualification}</h3><p><bdi>{item.institution}</bdi></p></div>
                  <strong>{item.detail}</strong>
                </Reveal>
              ))}
            </div>
            <div className="about-certification-block">
              <p className="about-ledger-label">الشهادات</p>
              {aboutCertificationsAr.map((item) => (
                <Reveal as="article" key={item.name} className="about-ledger-row about-cert-row">
                  <span>{item.year}</span>
                  <div><h3><bdi>{item.name}</bdi></h3><p><bdi>{item.issuer}</bdi></p></div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="about-stack">
        <div className="shell">
          <AboutSectionHeadAr
            index="05"
            eyebrow="أدوات التشغيل"
            title="الأدوات مجمّعة بحسب المشكلات التي تساعد على حلها."
            copy="لا نسب مئوية ولا جدار شعارات. الإشارة المفيدة هي جمع المجالات والأدوات في سياق عمل واحد."
          />
          <div className="about-stack-grid">
            {aboutSkillGroupsAr.map((group, index) => (
              <Reveal as="article" key={group.title} delay={index * 0.035} className="about-stack-group">
                <div className="about-stack-group-head"><span>0{index + 1}</span><h3>{group.title}</h3></div>
                <ul>{group.skills.map((skill) => <li key={skill} lang="en" dir="ltr">{skill}</li>)}</ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-principles">
        <div className="shell">
          <AboutSectionHeadAr index="06" eyebrow="كيف أعمل" title="قواعد قليلة للمشكلات غير المرتبة." />
          <div className="about-principles-grid">
            {workingPrinciplesAr.map((principle, index) => (
              <Reveal as="article" key={principle.title} delay={index * 0.05} className="about-principle">
                <span>{principle.index}</span>
                <h3>{principle.title}</h3>
                <p>{principle.copy}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="about-close">
        <div className="shell about-close-grid">
          <Reveal className="about-close-copy">
            <p className="about-eyebrow">التالي</p>
            <h2>الخلفية تعطي السياق. العمل هو الدليل.</h2>
            <p>اختر المسار الذي يناسب ما تريد تقييمه.</p>
          </Reveal>
          <Reveal delay={0.06} className="about-close-links">
            <Link href="/ar/work">الأعمال المختارة <ArrowLeft size={15} aria-hidden="true" /></Link>
            <Link href="/ar/services">سياق الخدمات <ArrowLeft size={15} aria-hidden="true" /></Link>
            <Link href="/ar/writing">الكتابة <ArrowLeft size={15} aria-hidden="true" /></Link>
            <a href={`mailto:${profile.email}`} data-conversion="about-contact-ar">ناقش فرصة <Mail size={15} aria-hidden="true" /></a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
