/* eslint-disable @next/next/no-img-element -- These are immutable, commit-pinned public evidence assets; keep their source URLs explicit rather than proxying them through the site image pipeline. */
import { projectVisuals, type EvidenceProjectSlug } from "@/data/project-visuals";
import styles from "./project-visual.module.css";

function cx(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(" ");
}

function PresairaVisual({ context }: { context: "card" | "case" }) {
  const data = projectVisuals.presaira;
  const x = (value: number) => 38 + value * 388;
  const y = (value: number) => 238 - value * 196;
  const points = data.reliability.map((point) => `${x(point.predicted)},${y(point.observed)}`).join(" ");

  return (
    <figure className={cx(styles.visual, styles.presaira, context === "case" && styles.caseVisual)}>
      <div className={styles.visualHeader}><span>{data.verb}</span><span>{data.provenance}</span></div>
      <div className={styles.chartFrame}>
        <svg viewBox="0 0 464 280" role="img" aria-labelledby="presaira-chart-title presaira-chart-desc">
          <title id="presaira-chart-title">Presaira 2026 home-win reliability evidence</title>
          <desc id="presaira-chart-desc">Committed calibration points compare mean predicted home-win probability with observed frequency. The diagonal is ideal calibration.</desc>
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
              <title>{`${Math.round(point.predicted * 100)}% predicted → ${Math.round(point.observed * 100)}% observed; n=${point.n}`}</title>
            </g>
          ))}
          <text className={styles.axisLabel} x="230" y="272">Mean predicted probability</text>
        </svg>
      </div>
      <div className={styles.proofStrip}>{data.proof.map((item) => <span key={item}>{item}</span>)}</div>
      <figcaption><strong>{data.label}</strong><span>{data.caption}</span></figcaption>
    </figure>
  );
}

function OpportunityVisual({ context }: { context: "card" | "case" }) {
  const data = projectVisuals.opportunityos;
  return (
    <figure className={cx(styles.visual, styles.opportunity, context === "case" && styles.caseVisual)}>
      <div className={styles.visualHeader}><span>{data.verb}</span><span>{data.provenance}</span></div>
      <div className={styles.opportunityFlow} aria-label="OpportunityOS public architecture flow">
        <div className={styles.opportunityStages}>
          {data.stages.map((stage, index) => <span key={stage}><i>{String(index + 1).padStart(2, "0")}</i>{stage}</span>)}
        </div>
        <div className={styles.authoritySpine}>
          <div><small>Factual authority</small><strong>{data.authority[0]}</strong><span>{data.authority[1]}</span></div>
          <div className={styles.modeStack}>
            {data.authority.slice(2).map((mode) => <span key={mode}>{mode}</span>)}
          </div>
        </div>
      </div>
      <figcaption><strong>{data.label}</strong><span>{data.caption}</span></figcaption>
    </figure>
  );
}

function GhareebVisual({ context }: { context: "card" | "case" }) {
  const data = projectVisuals["ghareeb-oglu"];
  return (
    <figure className={cx(styles.visual, styles.ghareeb, context === "case" && styles.caseVisual)}>
      <div className={styles.visualHeader}><span>{data.verb}</span><span>{data.provenance}</span></div>
      <div className={styles.storefrontFrame}>
        <div className={styles.browserBar}><span /><span /><span /><strong>ghareeboglu.com</strong></div>
        <div className={styles.storefrontBody}>
          <p>Live commerce product</p>
          <h4>Browse to fulfillment.</h4>
          <div className={styles.commerceStages}>{data.stages.map((stage, index) => <span key={stage}><i>0{index + 1}</i>{stage}</span>)}</div>
        </div>
      </div>
      <figcaption><strong>{data.label}</strong><span>{data.caption}</span></figcaption>
    </figure>
  );
}

function OilVisual({ context }: { context: "card" | "case" }) {
  const data = projectVisuals["oil-spill-detection"];
  return (
    <figure className={cx(styles.visual, styles.oil, context === "case" && styles.caseVisual)}>
      <div className={styles.visualHeader}><span>{data.verb}</span><span>{data.provenance}</span></div>
      <div className={styles.oilImageWrap}>
        <img src={data.image} alt={data.imageAlt} loading="lazy" decoding="async" />
        <span className={styles.scanLine} aria-hidden="true" />
      </div>
      <div className={styles.metricGrid}>{data.metrics.map((metric) => <span key={metric.label}><strong>{metric.value}</strong><small>{metric.label}</small></span>)}</div>
      <figcaption><strong>{data.label}</strong><span>{data.caption}</span></figcaption>
    </figure>
  );
}

function SolarVisual({ context }: { context: "card" | "case" }) {
  const data = projectVisuals["solar-site-selection"];
  return (
    <figure className={cx(styles.visual, styles.solar, context === "case" && styles.caseVisual)}>
      <div className={styles.visualHeader}><span>{data.verb}</span><span>{data.provenance}</span></div>
      <div className={styles.solarStack}>
        {data.images.map((image, index) => (
          <div className={styles.solarLayer} key={image.src} data-layer={index}>
            <span>{image.label}</span>
            <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
      <figcaption><strong>{data.label}</strong><span>{data.caption}</span></figcaption>
    </figure>
  );
}

function MakhbazyVisual({ context }: { context: "card" | "case" }) {
  const data = projectVisuals.makhbazy;
  return (
    <figure className={cx(styles.visual, styles.makhbazy, context === "case" && styles.caseVisual)}>
      <div className={styles.visualHeader}><span>{data.verb}</span><span>{data.provenance}</span></div>
      <div className={styles.phoneJourney} aria-label="Makhbazy public-safe mobile product journey abstraction">
        {data.stages.map((stage, index) => (
          <div className={styles.phoneStep} key={stage}>
            <div className={styles.phoneShell}><span className={styles.phoneNotch} /><i>{String(index + 1).padStart(2, "0")}</i><b>{stage}</b><span className={styles.phoneLines} /></div>
            {index < data.stages.length - 1 ? <span className={styles.journeyArrow} aria-hidden="true">→</span> : null}
          </div>
        ))}
      </div>
      <figcaption><strong>{data.label}</strong><span>{data.caption}</span></figcaption>
    </figure>
  );
}

export function ProjectVisual({ slug, context = "card" }: { slug: EvidenceProjectSlug; context?: "card" | "case" }) {
  switch (slug) {
    case "presaira": return <PresairaVisual context={context} />;
    case "opportunityos": return <OpportunityVisual context={context} />;
    case "ghareeb-oglu": return <GhareebVisual context={context} />;
    case "oil-spill-detection": return <OilVisual context={context} />;
    case "solar-site-selection": return <SolarVisual context={context} />;
    case "makhbazy": return <MakhbazyVisual context={context} />;
  }
}
