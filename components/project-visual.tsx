/* eslint-disable @next/next/no-img-element -- These are immutable, commit-pinned public evidence assets; keep their source URLs explicit rather than proxying them through the site image pipeline. */
import { projectVisuals, type EvidenceProjectSlug } from "@/data/project-visuals";
import styles from "./project-visual.module.css";

type Locale = "en" | "ar";

function cx(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

function PresairaVisual({ context, locale }: { context: "card" | "case"; locale: Locale }) {
  const data = projectVisuals.presaira;
  const x = (value: number) => 38 + value * 388;
  const y = (value: number) => 238 - value * 196;
  const points = data.reliability.map((point) => `${x(point.predicted)},${y(point.observed)}`).join(" ");
  const ar = locale === "ar";
  const proof = ar ? ["توقع 104 مباراة", "50,000 تكرار Monte Carlo", "تقييم بعد الحدث"] : data.proof;

  return (
    <figure dir={ar ? "rtl" : "ltr"} className={cx(styles.visual, styles.presaira, context === "case" && styles.caseVisual)}>
      <div className={styles.visualHeader}><span>{ar ? "ارسم / طوّر" : data.verb}</span><span>{ar ? "دليل من الكود العام" : data.provenance}</span></div>
      <div className={styles.chartFrame} dir="ltr">
        <svg viewBox="0 0 464 280" role="img" aria-labelledby="presaira-chart-title presaira-chart-desc">
          <title id="presaira-chart-title">{ar ? "دليل معايرة Presaira لاحتمالات فوز صاحب الأرض في 2026" : "Presaira 2026 home-win reliability evidence"}</title>
          <desc id="presaira-chart-desc">{ar ? "تقارن نقاط المعايرة المحفوظة متوسط احتمال الفوز المتوقع بالتكرار المرصود. الخط القطري يمثل المعايرة المثالية." : "Committed calibration points compare mean predicted home-win probability with observed frequency. The diagonal is ideal calibration."}</desc>
          {[0.2, 0.4, 0.6, 0.8].map((tick) => (
            <g key={tick} className={styles.chartGrid}>
              <line x1={38} x2={426} y1={y(tick)} y2={y(tick)} />
              <text x={12} y={y(tick) + 4}>{Math.round(tick * 100)}%</text>
            </g>
          ))}
          <line className={styles.idealLine} x1={x(0.2)} y1={y(0.2)} x2={x(0.8)} y2={y(0.8)} />
          <polyline className={styles.presairaLine} points={points} pathLength="1" />
          {data.reliability.map((point) => (
            <g key={point.predicted} className={styles.presairaPoint}>
              <circle cx={x(point.predicted)} cy={y(point.observed)} r={5.5} />
              <title>{ar ? `${Math.round(point.predicted * 100)}% متوقع → ${Math.round(point.observed * 100)}% مرصود؛ n=${point.n}` : `${Math.round(point.predicted * 100)}% predicted → ${Math.round(point.observed * 100)}% observed; n=${point.n}`}</title>
            </g>
          ))}
          <text className={styles.axisLabel} x="230" y="272">{ar ? "متوسط الاحتمال المتوقع" : "Mean predicted probability"}</text>
        </svg>
      </div>
      <div className={styles.proofStrip}>{proof.map((item) => <span key={item}>{item}</span>)}</div>
      <figcaption><strong>{ar ? "دليل معايرة 2026 المحفوظ" : data.label}</strong><span>{ar ? "ثقة التوقع مقارنة بالنتائج المرصودة بعد اكتمال مباريات البطولة الـ104." : data.caption}</span></figcaption>
    </figure>
  );
}

function OpportunityVisual({ context, locale }: { context: "card" | "case"; locale: Locale }) {
  const data = projectVisuals.opportunityos;
  const ar = locale === "ar";
  const stages = ar ? ["اكتشاف", "إدخال", "تأهيل", "تقييم", "قفل الحقيقة", "تحضير", "مراقبة", "تعلم"] : data.stages;
  return (
    <figure dir={ar ? "rtl" : "ltr"} className={cx(styles.visual, styles.opportunity, context === "case" && styles.caseVisual)}>
      <div className={styles.visualHeader}><span>{ar ? "تتبّع / صرّح" : data.verb}</span><span>{ar ? "مشتق عام آمن" : data.provenance}</span></div>
      <div className={styles.opportunityFlow} aria-label={ar ? "تدفق الهندسة العامة لنظام OpportunityOS" : "OpportunityOS public architecture flow"}>
        <div className={styles.opportunityStages}>
          {stages.map((stage, index) => <span key={stage}><i>{String(index + 1).padStart(2, "0")}</i>{stage}</span>)}
        </div>
        <div className={styles.authoritySpine}>
          <div><small>{ar ? "سلطة الحقائق" : "Factual authority"}</small><strong>{data.authority[0]}</strong><span>{data.authority[1]}</span></div>
          <div className={styles.modeStack}>
            {data.authority.slice(2).map((mode) => <span key={mode} lang="en" dir="ltr">{mode}</span>)}
          </div>
        </div>
      </div>
      <figcaption><strong>{ar ? "مخطط هندسة عام — وليس واجهة المنتج" : data.label}</strong><span>{ar ? "الحقيقة والمصدر يقيّدان المطابقة والتوليد وصلاحية الإجراءات الخارجية." : data.caption}</span></figcaption>
    </figure>
  );
}

function GhareebVisual({ context, locale }: { context: "card" | "case"; locale: Locale }) {
  const data = projectVisuals["ghareeb-oglu"];
  const ar = locale === "ar";
  const stages = ar ? ["تصفح", "منتج", "سلة", "تنفيذ"] : data.stages;
  return (
    <figure dir={ar ? "rtl" : "ltr"} className={cx(styles.visual, styles.ghareeb, context === "case" && styles.caseVisual)}>
      <div className={styles.visualHeader}><span>{ar ? "اكشف / تصفح" : data.verb}</span><span>{ar ? "مشتق عام آمن" : data.provenance}</span></div>
      <div className={styles.storefrontFrame}>
        <div className={styles.browserBar}><span /><span /><span /><strong dir="ltr">ghareeboglu.com</strong></div>
        <div className={styles.storefrontBody}>
          <p>{ar ? "منتج تجارة إلكترونية حي" : "Live commerce product"}</p>
          <p className={styles.storefrontHeadline}>{ar ? "من التصفح إلى التنفيذ." : "Browse to fulfillment."}</p>
          <div className={styles.commerceStages}>{stages.map((stage, index) => <span key={stage}><i>0{index + 1}</i>{stage}</span>)}</div>
        </div>
      </div>
      <figcaption><strong>{ar ? "تدفق تجارة عام آمن — وليس لقطة شاشة" : data.label}</strong><span>{ar ? "تمثيل منضبط لرحلة المتجر العام دون إعادة توزيع صور علامة أو منتجات غير مصرح بها." : data.caption}</span></figcaption>
    </figure>
  );
}

function OilVisual({ context, locale }: { context: "card" | "case"; locale: Locale }) {
  const data = projectVisuals["oil-spill-detection"];
  const ar = locale === "ar";
  return (
    <figure dir={ar ? "rtl" : "ltr"} className={cx(styles.visual, styles.oil, context === "case" && styles.caseVisual)}>
      <div className={styles.visualHeader}><span>{ar ? "قارن / اكتشف" : data.verb}</span><span>{ar ? "أصل من مستودع عام" : data.provenance}</span></div>
      <div className={styles.oilImageWrap}>
        <img src={data.image} alt={ar ? "مخرج اكتشاف تسرّب MV Wakashio من صور Sentinel-1 SAR في مستودع Oil Spill Detection العام" : data.imageAlt} loading="lazy" decoding="async" />
        <span className={styles.scanLine} aria-hidden="true" />
      </div>
      <div className={styles.metricGrid}>{data.metrics.map((metric) => <span key={metric.label}><strong dir="ltr">{metric.value}</strong><small lang="en" dir="ltr">{metric.label}</small></span>)}</div>
      <figcaption><strong>{ar ? "مخرج دراسة حالة MV Wakashio" : data.label}</strong><span>{ar ? "دليل حقيقي من Sentinel-1 SAR مع تقييم لفئة النفط من تشغيل الاختبار المحفوظ." : data.caption}</span></figcaption>
    </figure>
  );
}

function SolarVisual({ context, locale }: { context: "card" | "case"; locale: Locale }) {
  const data = projectVisuals["solar-site-selection"];
  const ar = locale === "ar";
  const labels = ar ? ["منطقة الدراسة", "المعايير", "الملاءمة"] : data.images.map((image) => image.label);
  const alts = ar ? [
    "واجهة تطبيق Solar Site Selection العامة مع الخريطة",
    "واجهة منطقة الدراسة والمعايير في تطبيق Solar Site Selection العام",
    "خريطة التحقق ذات الخمس فئات لمؤشر ملاءمة الأرض في Solar Site Selection",
  ] : data.images.map((image) => image.alt);
  return (
    <figure dir={ar ? "rtl" : "ltr"} className={cx(styles.visual, styles.solar, context === "case" && styles.caseVisual)}>
      <div className={styles.visualHeader}><span>{ar ? "طبّق / رتّب" : data.verb}</span><span>{ar ? "أصل من مستودع عام" : data.provenance}</span></div>
      <div className={styles.solarStack}>
        {data.images.map((image, index) => (
          <div className={styles.solarLayer} key={image.src} data-layer={index}>
            <span>{labels[index]}</span>
            <img src={image.src} alt={alts[index]} loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
      <figcaption><strong>{ar ? "دليل من التطبيق العام والتحقق" : data.label}</strong><span>{ar ? "شاشات حقيقية لمنطقة الدراسة والمعايير مع خريطة Land Suitability Index ذات الخمس فئات." : data.caption}</span></figcaption>
    </figure>
  );
}

function MakhbazyVisual({ context, locale }: { context: "card" | "case"; locale: Locale }) {
  const data = projectVisuals.makhbazy;
  const ar = locale === "ar";
  const stages = ar ? ["اكتشاف", "طلب", "تتبع", "استلام"] : data.stages;
  return (
    <figure dir={ar ? "rtl" : "ltr"} className={cx(styles.visual, styles.makhbazy, context === "case" && styles.caseVisual)}>
      <div className={styles.visualHeader}><span>{ar ? "سلسِل / تقدّم" : data.verb}</span><span>{ar ? "مشتق عام آمن" : data.provenance}</span></div>
      <div className={styles.phoneJourney} aria-label={ar ? "تمثيل عام آمن لرحلة منتج Makhbazy على الموبايل" : "Makhbazy public-safe mobile product journey abstraction"}>
        {stages.map((stage, index) => (
          <div className={styles.phoneStep} key={stage}>
            <div className={styles.phoneShell}><span className={styles.phoneNotch} /><i>{String(index + 1).padStart(2, "0")}</i><b>{stage}</b><span className={styles.phoneLines} /></div>
            {index < stages.length - 1 ? <span className={styles.journeyArrow} aria-hidden="true">{ar ? "←" : "→"}</span> : null}
          </div>
        ))}
      </div>
      <figcaption><strong>{ar ? "تمثيل آمن لرحلة المنتج" : data.label}</strong><span>{ar ? "تبقى الرحلة الداخلية الأصلية غير منشورة؛ يوضح هذا العرض قيادة UI/UX وتسليم المنتج دون إعادة إنتاج شاشات محمية." : data.caption}</span></figcaption>
    </figure>
  );
}

export function ProjectVisual({ slug, context = "card", locale = "en" }: { slug: EvidenceProjectSlug; context?: "card" | "case"; locale?: Locale }) {
  switch (slug) {
    case "presaira": return <PresairaVisual context={context} locale={locale} />;
    case "opportunityos": return <OpportunityVisual context={context} locale={locale} />;
    case "ghareeb-oglu": return <GhareebVisual context={context} locale={locale} />;
    case "oil-spill-detection": return <OilVisual context={context} locale={locale} />;
    case "solar-site-selection": return <SolarVisual context={context} locale={locale} />;
    case "makhbazy": return <MakhbazyVisual context={context} locale={locale} />;
  }
}
