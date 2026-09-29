/* eslint-disable @next/next/no-img-element -- These are immutable, commit-pinned public evidence assets; keep their source URLs explicit rather than proxying them through the site image pipeline. */
import { BrandLogo } from "@/components/brand-logo";
import { projectVisuals, type EvidenceProjectSlug } from "@/data/project-visuals";
import styles from "./project-visual.module.css";

type Locale = "en" | "ar";

function cx(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

function PresairaVisual({ context, locale }: { context: "card" | "case"; locale: Locale }) {
  const data = projectVisuals.presaira;
  const homeCard = context === "card" && locale === "en";
  const x = (value: number) => 38 + value * 388;
  const y = (value: number) => 238 - value * 196;
  const points = data.reliability.map((point) => `${x(point.predicted)},${y(point.observed)}`).join(" ");
  const ar = locale === "ar";
  const proof = ar
    ? ["توقع 104 مباراة", "50,000 تكرار Monte Carlo", "تقييم بعد الحدث"]
    : homeCard
      ? ["104 matches", "50,000 Monte Carlo runs", "Post-event evaluation"]
      : data.proof;

  return (
    <figure dir={ar ? "rtl" : "ltr"} className={cx(styles.visual, styles.presaira, context === "case" && styles.caseVisual, homeCard && styles.homeCardVisual, homeCard && "home-selected-work-visual")}>
      <div className={styles.visualHeader}><span>{ar ? "ارسم / طوّر" : homeCard ? "Forecast / calibrate" : data.verb}</span><span>{ar ? "دليل من الكود العام" : data.provenance}</span></div>
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
      <div className={`${styles.proofStrip}${homeCard ? " presaira-card-proof" : ""}`}>
        {proof.map((item) => <span className={homeCard ? "presaira-proof-desktop" : undefined} key={item}>{item}</span>)}
        {homeCard ? <>
          <span className="presaira-proof-mobile">104 matches</span>
          <span className="presaira-proof-mobile">Post-event evaluation</span>
        </> : null}
      </div>
      <figcaption>
        <strong>{ar ? "دليل معايرة 2026 المحفوظ" : homeCard ? "2026 calibration evidence" : data.label}</strong>
        <span className={homeCard ? "presaira-caption-desktop" : undefined}>{ar ? "ثقة التوقع مقارنة بالنتائج المرصودة بعد اكتمال مباريات البطولة الـ104." : homeCard ? "Predicted probabilities compared with observed outcomes across all 104 matches." : data.caption}</span>
        {homeCard ? <span className="presaira-caption-mobile">Predicted probabilities vs. observed outcomes across all 104 matches.</span> : null}
      </figcaption>
    </figure>
  );
}

function OpportunityVisual({ context, locale }: { context: "card" | "case"; locale: Locale }) {
  const data = projectVisuals.opportunityos;
  const homeCard = context === "card" && locale === "en";
  const ar = locale === "ar";
  const stages = ar
    ? ["اكتشاف", "إدخال", "تأهيل", "تقييم", "قفل الحقيقة", "تحضير", "مراقبة", "تعلم"]
    : homeCard
      ? ["Discover", "Ingest", "Qualify", "Score", "Truth-lock", "Prepare"]
      : data.stages;
  const modes = homeCard ? ["Dry run", "Assisted", "Controlled submit"] : data.authority.slice(2);
  return (
    <figure dir={ar ? "rtl" : "ltr"} className={cx(styles.visual, styles.opportunity, context === "case" && styles.caseVisual, homeCard && styles.homeCardVisual, homeCard && "home-selected-work-visual", context === "card" ? "opportunity-card-visual" : "opportunity-case-visual")}>
      <div className={`${styles.visualHeader} ${homeCard ? "opportunity-card-header" : ""}`}><span>{ar ? "تتبّع / صرّح" : homeCard ? "Govern / verify" : data.verb}</span><span>{ar ? "مشتق عام آمن" : data.provenance}</span></div>
      <div className={`${styles.opportunityFlow} ${context === "card" ? "opportunity-card-flow" : ""}`} aria-label={ar ? "تدفق الهندسة العامة لنظام OpportunityOS" : "OpportunityOS public architecture flow"}>
        <div className={`${styles.opportunityStages} ${context === "card" ? "opportunity-card-stages" : ""}`}>
          {stages.map((stage, index) => <span key={stage} data-opportunity-stage={stage} className={context === "card" ? "opportunity-card-stage" : undefined}><i>{String(index + 1).padStart(2, "0")}</i>{stage}</span>)}
        </div>
        <div className={`${styles.authoritySpine} ${context === "card" ? "opportunity-card-authority" : ""}`}>
          <div><small>{ar ? "سلطة الحقائق" : "Factual authority"}</small><strong>{data.authority[0]}</strong><span>{data.authority[1]}</span></div>
          <div className={`${styles.modeStack} ${context === "card" ? "opportunity-card-modes" : ""}`}>
            {modes.map((mode) => <span key={mode} className={homeCard ? "opportunity-card-mode" : undefined} lang="en" dir="ltr">{mode}</span>)}
          </div>
        </div>
      </div>
      <figcaption className={homeCard ? "opportunity-card-caption" : undefined}><strong>{ar ? "مخطط هندسة عام — وليس واجهة المنتج" : homeCard ? "Governed architecture overview" : data.label}</strong><span>{ar ? "الحقيقة والمصدر يقيّدان المطابقة والتوليد وصلاحية الإجراءات الخارجية." : homeCard ? "Truth and provenance constrain matching, generation and outbound actions." : data.caption}</span></figcaption>
    </figure>
  );
}

function GhareebVisual({ context, locale }: { context: "card" | "case"; locale: Locale }) {
  const data = projectVisuals["ghareeb-oglu"];
  const homeCard = context === "card" && locale === "en";
  const ar = locale === "ar";
  const stages = ar ? ["تصفح", "منتج", "سلة", "تنفيذ"] : data.stages;
  return (
    <figure dir={ar ? "rtl" : "ltr"} className={cx(styles.visual, styles.ghareeb, context === "case" && styles.caseVisual, homeCard && styles.homeCardVisual, homeCard && "home-selected-work-visual")}>
      <div className={styles.visualHeader}><span>{ar ? "اكشف / تصفح" : homeCard ? "Browse / fulfill" : data.verb}</span><span>{ar ? "مشتق عام آمن" : "Public-safe commerce model"}</span></div>
      <div className={styles.storefrontFrame}>
        <div className={styles.browserBar}><span /><span /><span /><strong dir="ltr">ghareeboglu.com</strong></div>
        <div className={styles.storefrontBody}>
          <div className="ghareeb-storefront-brand">
            {homeCard ? (
              <span className={styles.ghareebCardWordmark} data-ghareeb-wordmark>
                Ghareeb Oglu
              </span>
            ) : (
              <BrandLogo brand="ghareeb" mode="native" />
            )}
            {!homeCard ? <span>{ar ? "منتج تجارة إلكترونية حي" : "Live commerce product"}</span> : null}
          </div>
          <p className={styles.storefrontHeadline}>{ar ? "من التصفح إلى التنفيذ." : "Browse to fulfillment."}</p>
          <div className={styles.commerceStages}>{stages.map((stage, index) => <span key={stage}><i>0{index + 1}</i>{stage}</span>)}</div>
        </div>
      </div>
      <figcaption className={homeCard ? "ghareeb-card-caption" : undefined}><strong>{ar ? "تدفق تجارة عام آمن — وليس لقطة شاشة" : homeCard ? "Public-safe commerce flow" : data.label}</strong><span>{ar ? "تمثيل منضبط لرحلة المتجر العام دون إعادة توزيع صور علامة أو منتجات غير مصرح بها." : homeCard ? "A storefront journey from browse to fulfillment, represented without redistributing protected product imagery." : data.caption}</span></figcaption>
    </figure>
  );
}

function OilVisual({ context, locale }: { context: "card" | "case"; locale: Locale }) {
  const data = projectVisuals["oil-spill-detection"];
  const homeCard = context === "card" && locale === "en";
  const ar = locale === "ar";
  return (
    <figure dir={ar ? "rtl" : "ltr"} className={cx(styles.visual, styles.oil, context === "case" && styles.caseVisual, homeCard && styles.homeCardVisual, homeCard && "home-selected-work-visual")}>
      <div className={styles.visualHeader}><span>{ar ? "قارن / اكتشف" : homeCard ? "Detect / validate" : data.verb}</span><span>{ar ? "أصل من مستودع عام" : data.provenance}</span></div>
      <div className={styles.oilImageWrap}>
        <img src={data.image} alt={ar ? "مخرج اكتشاف تسرّب MV Wakashio من صور Sentinel-1 SAR في مستودع Oil Spill Detection العام" : data.imageAlt} loading="lazy" decoding="async" />
        <span className={styles.scanLine} aria-hidden="true" />
      </div>
      <div className={styles.metricGrid}>{data.metrics.map((metric) => <span key={metric.label}><strong dir="ltr">{metric.value}</strong><small lang="en" dir="ltr">{metric.label}</small></span>)}</div>
      <figcaption className={homeCard ? "oil-card-caption" : undefined}><strong>{ar ? "مخرج دراسة حالة MV Wakashio" : homeCard ? "MV Wakashio case study" : data.label}</strong><span>{ar ? "دليل حقيقي من Sentinel-1 SAR مع تقييم لفئة النفط من تشغيل الاختبار المحفوظ." : homeCard ? "Sentinel-1 SAR output with oil-class metrics from the committed test run." : data.caption}</span></figcaption>
    </figure>
  );
}

function SolarVisual({ context, locale }: { context: "card" | "case"; locale: Locale }) {
  const data = projectVisuals["solar-site-selection"];
  const homeCard = context === "card" && locale === "en";
  const ar = locale === "ar";
  const labels = ar ? ["منطقة الدراسة", "المعايير", "الملاءمة"] : data.images.map((image) => image.label);
  const alts = ar ? [
    "واجهة تطبيق Solar Site Selection العامة مع الخريطة",
    "واجهة منطقة الدراسة والمعايير في تطبيق Solar Site Selection العام",
    "خريطة التحقق ذات الخمس فئات لمؤشر ملاءمة الأرض في Solar Site Selection",
  ] : data.images.map((image) => image.alt);
  return (
    <figure dir={ar ? "rtl" : "ltr"} className={cx(styles.visual, styles.solar, context === "case" && styles.caseVisual, homeCard && styles.homeCardVisual, homeCard && "home-selected-work-visual")}>
      <div className={styles.visualHeader}><span>{ar ? "طبّق / رتّب" : homeCard ? "Map / rank" : data.verb}</span><span>{ar ? "أصل من مستودع عام" : data.provenance}</span></div>
      <div className={styles.solarStack}>
        {data.images.map((image, index) => (
          <div className={styles.solarLayer} key={image.src} data-layer={index}>
            <span>{labels[index]}</span>
            <img src={image.src} alt={alts[index]} loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
      <figcaption className={homeCard ? "solar-card-caption" : undefined}>
        <strong className={homeCard ? "solar-caption-desktop" : undefined}>{ar ? "دليل من التطبيق العام والتحقق" : homeCard ? "Public application · validation evidence" : data.label}</strong>
        <span className={homeCard ? "solar-description-desktop" : undefined}>{ar ? "شاشات حقيقية لمنطقة الدراسة والمعايير مع خريطة Land Suitability Index ذات الخمس فئات." : homeCard ? "AOI and criteria screens with the committed five-class Land Suitability Index map." : data.caption}</span>
        {homeCard ? <strong className="solar-caption-mobile">Five-class Land Suitability Index</strong> : null}
      </figcaption>
    </figure>
  );
}

function MakhbazyVisual({ context, locale }: { context: "card" | "case"; locale: Locale }) {
  const data = projectVisuals.makhbazy;
  const homeCard = context === "card" && locale === "en";
  const ar = locale === "ar";
  const stages = ar ? ["اكتشاف", "طلب", "تتبع", "استلام"] : data.stages;
  return (
    <figure dir={ar ? "rtl" : "ltr"} className={cx(styles.visual, styles.makhbazy, context === "case" && styles.caseVisual, homeCard && styles.homeCardVisual, homeCard && "home-selected-work-visual")}>
      <div className={styles.visualHeader}><span>{ar ? "سلسِل / تقدّم" : homeCard ? "Design / deliver" : data.verb}</span><span>{ar ? "مشتق عام آمن" : data.provenance}</span></div>
      <div className={styles.phoneJourney} aria-label={ar ? "تمثيل عام آمن لرحلة منتج Makhbazy على الموبايل" : "Makhbazy public-safe mobile product journey abstraction"}>
        {stages.map((stage, index) => (
          <div className={styles.phoneStep} key={stage}>
            <div className={styles.phoneShell}><span className={styles.phoneNotch} /><i>{String(index + 1).padStart(2, "0")}</i><b>{stage}</b><span className={styles.phoneLines} /></div>
            {index < stages.length - 1 ? <span className={styles.journeyArrow} aria-hidden="true">{ar ? "←" : "→"}</span> : null}
          </div>
        ))}
      </div>
      <figcaption>
        <strong>{ar ? "تمثيل آمن لرحلة المنتج" : homeCard ? "Mobile product journey" : data.label}</strong>
        <span className={homeCard ? "makhbazy-caption-desktop" : undefined}>{ar ? "تبقى الرحلة الداخلية الأصلية غير منشورة؛ يوضح هذا العرض قيادة UI/UX وتسليم المنتج دون إعادة إنتاج شاشات محمية." : homeCard ? "A public-safe view of the mobile journey without exposing protected internal screens." : data.caption}</span>
        {homeCard ? <span className="makhbazy-caption-mobile">Public-safe journey without protected internal screens.</span> : null}
      </figcaption>
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
