import type { EvidenceProjectSlug } from "@/data/project-visuals";

export type CaseStudyStep = {
  eyebrow: string;
  title: string;
  detail: string;
};

export type CaseStudyEvidence = {
  label: string;
  value?: string;
  detail: string;
};

export type CaseStudyLink = {
  label: string;
  href: string;
};

export type CaseStudy = {
  slug: EvidenceProjectSlug;
  thesis: string;
  challenge: string;
  scope: string;
  steps: readonly CaseStudyStep[];
  evidence: readonly CaseStudyEvidence[];
  constraints: readonly string[];
  publicationNote: string;
  links: readonly CaseStudyLink[];
};

/**
 * Production case-study projection for Iteration 5.
 *
 * Sources:
 * - data/source-of-truth.public.yaml
 * - data/project-evidence.public.yaml
 * - public project repositories linked below
 *
 * Do not add private/internal detail here merely because it is available elsewhere.
 */
export const caseStudies = {
  presaira: {
    slug: "presaira",
    thesis:
      "The interesting part was not producing probabilities. It was building a forecast that could still be inspected after every one of the 104 outcomes was known.",
    challenge:
      "Tournament forecasting is easy to overstate when future results leak into evaluation, missing matches quietly disappear, or simulation choices cannot be reproduced. Presaira was structured so those failure modes stay visible rather than being polished away.",
    scope:
      "The public project spans the Dixon-Coles and Elo model blend, full-tournament simulation, reproducible prediction artifacts, backtesting, calibration, tests and the product surface that presents the forecast.",
    steps: [
      {
        eyebrow: "01 — Model",
        title: "Blend scoring dynamics with team strength.",
        detail:
          "A Dixon-Coles goal model is combined with Elo ratings so the forecast has both match-score structure and an independent strength signal.",
      },
      {
        eyebrow: "02 — Simulate",
        title: "Run the tournament, not just isolated fixtures.",
        detail:
          "Each published run simulates the full competition 50,000 times at a fixed seed, preserving group rules, knockout progression and tournament-level uncertainty.",
      },
      {
        eyebrow: "03 — Guard",
        title: "Make leakage and ordering errors fail loudly.",
        detail:
          "Pre-cutoff assertions, non-vacuous negative tests and tie-break ordering tests are part of the evidence. A failed convergence target is committed rather than hidden, with production held at the higher simulation count.",
      },
      {
        eyebrow: "04 — Evaluate",
        title: "Score the forecast after reality happens.",
        detail:
          "All 104 World Cup matches are covered and scored, with calibration artifacts, historical backtests and a postmortem that discusses the direction of the model's misses.",
      },
    ],
    evidence: [
      {
        label: "Tournament coverage",
        value: "104 / 104",
        detail: "Every 2026 World Cup match is represented in the committed evaluation coverage; none is silently imputed away.",
      },
      {
        label: "Simulation",
        value: "50,000×",
        detail: "Full-tournament Monte Carlo iterations per production forecast run, using a fixed seed and versioned provenance.",
      },
      {
        label: "Evaluation posture",
        value: "Post-event",
        detail: "Calibration, backtests, incident notes and a tournament postmortem remain inspectable after the event finished.",
      },
    ],
    constraints: [
      "The public repository is a curated extract; the live ingestion, database and publication pipeline are deliberately not published.",
      "A committed convergence check records a failed 0.5 percentage-point target between 10k and 50k simulations instead of rewriting the result as a pass.",
      "The portfolio treatment avoids live-odds and sportsbook language because this is model-evaluation proof, not betting theater.",
    ],
    publicationNote:
      "Public case-study claims are limited to the repository, committed evaluation artifacts and the live Presaira product. Private operating code and planning material remain outside the website narrative.",
    links: [
      { label: "Open Presaira", href: "https://presaira.com" },
      { label: "Public repository", href: "https://github.com/m7mdehab/WC2026-Live-Prediction-Engine" },
      { label: "Methodology", href: "https://presaira.com/methodology" },
    ],
  },

  opportunityos: {
    slug: "opportunityos",
    thesis:
      "Autonomy is only useful when the system can explain what it knows, what it is allowed to claim, and exactly where it must stop.",
    challenge:
      "Opportunity automation crosses factual, policy and external-action boundaries. The architecture therefore has to keep generation flexible without letting it invent material founder facts, reinterpret missing evidence as rejection, or silently escalate into an external submission.",
    scope:
      "Product architecture, truth/provenance authority, evidence-aware matching, truth-locked artifact generation and controlled outbound-action modes, represented only through the allowlisted public documentation mirror.",
    steps: [
      {
        eyebrow: "01 — Acquire",
        title: "Discover under source policy, not around it.",
        detail:
          "Opportunities enter through a central source-policy model that separates measured access behavior from permission and preserves provenance through normalization and deduplication.",
      },
      {
        eyebrow: "02 — Qualify",
        title: "Treat missing evidence as unknown, not negative.",
        detail:
          "Matching is evidence-aware: a hard rejection needs an explicit requirement plus a verified conflict or versioned policy. Scoring may rank evidence but may not fabricate fit.",
      },
      {
        eyebrow: "03 — Generate",
        title: "Keep every material claim attached to truth authority.",
        detail:
          "The Truth Graph and EvidenceClaim model constrain generated CVs, cover letters and related artifacts. Verified facts may be selected and rewritten, but material claims may not be invented.",
      },
      {
        eyebrow: "04 — Act",
        title: "Escalate authority deliberately.",
        detail:
          "DRY_RUN, ASSISTED and CONTROLLED_SUBMIT separate preparation from external mutation. Sensitive ambiguity, CAPTCHA/MFA and uncertain outcomes are stop conditions rather than invitations to guess or retry.",
      },
      {
        eyebrow: "05 — Learn",
        title: "Improve operations without weakening deterministic truth.",
        detail:
          "Monitoring, feedback and outcome learning sit downstream of the same authority model so operational autonomy cannot create a weaker parallel path for facts or permissions.",
      },
    ],
    evidence: [
      {
        label: "Factual authority",
        value: "Truth Graph",
        detail: "Material claims remain traceable through the public EvidenceClaim authority model.",
      },
      {
        label: "Action authority",
        value: "3 modes",
        detail: "DRY_RUN, ASSISTED and CONTROLLED_SUBMIT make external-action escalation explicit rather than implicit.",
      },
      {
        label: "Decision semantics",
        value: "Open-world",
        detail: "Unknown or absent evidence is not automatically treated as false, ineligible or a reason to reject.",
      },
    ],
    constraints: [
      "The private OpportunityOS repository is authoritative; the public repository is an allowlisted documentation mirror.",
      "Founder truth, application data, credentials and private implementation details are intentionally excluded from the public case study.",
      "The website uses explanatory architecture, never a synthetic dashboard that pretends to be hidden product UI.",
    ],
    publicationNote:
      "This case study describes only the public architecture contract and governance model. It deliberately proves the system through invariants and authority boundaries rather than exposing private operational data.",
    links: [{ label: "Public architecture mirror", href: "https://github.com/m7mdehab/opportunityos-docs" }],
  },

  "ghareeb-oglu": {
    slug: "ghareeb-oglu",
    thesis:
      "A commerce product is more than a storefront: browsing, transaction, fulfillment and deployment have to resolve into one customer-facing system.",
    challenge:
      "Translate a real consumer brand into an operational ecommerce product while owning the product and technical path end-to-end, rather than stopping at a visual website layer.",
    scope:
      "Mohammed planned the product, designed the solution, selected and implemented the tools, built the commerce product from scratch and handled execution end-to-end across storefront, backend, payments, fulfillment/logistics integration and deployment.",
    steps: [
      {
        eyebrow: "01 — Plan",
        title: "Start from the commerce journey, not a page list.",
        detail:
          "The product is framed around how a customer moves from discovery into a product decision and then through a real transaction.",
      },
      {
        eyebrow: "02 — Build",
        title: "Connect the visible experience to the operating system behind it.",
        detail:
          "Storefront and backend responsibilities are treated as one product scope rather than separate portfolio pieces.",
      },
      {
        eyebrow: "03 — Transact",
        title: "Carry the journey through payment and fulfillment.",
        detail:
          "Payments and fulfillment/logistics integration are part of the authorized project scope, which is why the case study represents the flow beyond product browsing.",
      },
      {
        eyebrow: "04 — Deliver",
        title: "Own the path through deployment.",
        detail:
          "Deployment is part of the end-to-end ownership statement, keeping the project anchored in product execution rather than design-only authorship.",
      },
    ],
    evidence: [
      {
        label: "Public product",
        value: "Live",
        detail: "A public Ghareeb Oglu ecommerce site exists and remains the strongest external product proof.",
      },
      {
        label: "Ownership",
        value: "End-to-end",
        detail: "The permitted public wording covers planning, design, architecture, implementation and execution through deployment.",
      },
      {
        label: "System breadth",
        value: "Commerce",
        detail: "The verified scope includes storefront, backend, payments and fulfillment/logistics integration.",
      },
    ],
    constraints: [
      "Internal Ghareeb Oglu design and product assets are evidence candidates, not automatically publishable website assets.",
      "Historical commerce-import files do not prove the current production stack and are not used to make stack claims.",
      "The current portfolio visual is a public-safe explanatory commerce flow, not a fabricated screenshot or extracted product-photography pack.",
    ],
    publicationNote:
      "No revenue, conversion, traffic or operational performance metrics are published because none are currently governed as public proof. The case study stays strong by showing ownership breadth without inventing business outcomes.",
    links: [{ label: "Open live storefront", href: "https://ghareeboglu.com" }],
  },

  "oil-spill-detection": {
    slug: "oil-spill-detection",
    thesis:
      "The hard class is oil, not background. The evaluation therefore has to reward finding oil instead of hiding behind headline pixel accuracy.",
    challenge:
      "Oil slicks appear as dark patches in Sentinel-1 SAR, but low-wind zones, biogenic films and rain cells can look almost identical. The technical problem is distinguishing oil from those look-alikes while carrying the result from a trained model into georeferenced, usable output.",
    scope:
      "A five-class semantic-segmentation system spanning training and model comparison, oil-specific evaluation, ONNX export, Sentinel-1 ingestion/preprocessing, tiled inference, vectorized geospatial output, FastAPI serving and a React/MapLibre interface.",
    steps: [
      {
        eyebrow: "01 — Frame",
        title: "Model the confusing classes explicitly.",
        detail:
          "The task uses five classes — sea surface, oil spill, look-alike, ship and land — so look-alike confusion is represented rather than folded into background.",
      },
      {
        eyebrow: "02 — Compare",
        title: "Select on oil-specific evidence.",
        detail:
          "U-Net, DeepLabV3+ and SegFormer are evaluated on the committed test split. SegFormer mit-b2 is selected using oil IoU, oil recall and broader per-class metrics rather than background-dominated accuracy.",
      },
      {
        eyebrow: "03 — Operationalize",
        title: "Move from chips to full georeferenced scenes.",
        detail:
          "The selected model is exported to ONNX, reused for tiled scene inference and converted into GeoTIFF plus oil polygons before API delivery.",
      },
      {
        eyebrow: "04 — Challenge",
        title: "Run the pipeline on a real unseen event.",
        detail:
          "The public Wakashio case study applies the end-to-end pipeline to a Sentinel-1B scene over Mauritius and documents both the detected location and the limitations of measured area.",
      },
    ],
    evidence: [
      {
        label: "Oil IoU",
        value: "0.566",
        detail: "Selected SegFormer mit-b2 result on the committed 110-image test split.",
      },
      {
        label: "Oil recall",
        value: "0.764",
        detail: "Oil-class recall from the same committed evaluation output.",
      },
      {
        label: "Mean IoU",
        value: "0.696",
        detail: "Five-class mean IoU; reported alongside, not instead of, oil-specific quality.",
      },
      {
        label: "Real-event test",
        value: "Wakashio",
        detail: "A previously unseen August 2020 Sentinel-1B scene over the MV Wakashio spill is included as a public case study.",
      },
    ],
    constraints: [
      "The official dataset is small and imbalanced: 1002 training images, 110 test images, with oil occupying roughly 1% of pixels.",
      "Training uses a single VV SAR channel; dual-polarization information is not exploited.",
      "The raw-scene case study crosses a preprocessing/domain gap, so detected area is presented as an approximate lower bound rather than false measurement certainty.",
    ],
    publicationNote:
      "The modernized repository explicitly avoids using the original project's background-dominated accuracy as the headline result. The case study preserves that same metric discipline.",
    links: [
      { label: "Public repository", href: "https://github.com/m7mdehab/oil-spill-detection" },
      { label: "Wakashio case study", href: "https://github.com/m7mdehab/oil-spill-detection/tree/main/docs/case_study" },
      { label: "Committed results", href: "https://github.com/m7mdehab/oil-spill-detection/blob/main/docs/results.md" },
    ],
  },

  "solar-site-selection": {
    slug: "solar-site-selection",
    thesis:
      "A siting recommendation is useful only when the criteria, weights, exclusions and trade-offs remain inspectable after the map looks convincing.",
    challenge:
      "PV site selection combines data with judgment: terrain, climate, infrastructure, land cover, exclusions and economic assumptions all shape the answer. The project turns those inputs into a defensible workflow rather than presenting a suitability heatmap as unexplained truth.",
    scope:
      "A web-based geospatial engine that acquires public data, runs consistency-checked AHP/MCDA, produces a five-class Land Suitability Index, extracts and ranks candidate sites, estimates pvlib energy/LCOE and exposes the workflow through FastAPI, React/MapLibre and PDF export.",
    steps: [
      {
        eyebrow: "01 — Acquire",
        title: "Build the AOI from public geodata.",
        detail:
          "PVGIS, Copernicus GLO-30, OSM/Overpass, ESA WorldCover, Open-Meteo and WDPA feed the analysis, with repeat results cached for reproducibility and speed.",
      },
      {
        eyebrow: "02 — Analyze",
        title: "Make the weighting model inspectable.",
        detail:
          "Twelve criteria across economic, technical and environmental groups are reclassified and combined through AHP. Pairwise matrices with a consistency ratio above 0.10 are rejected.",
      },
      {
        eyebrow: "03 — Exclude",
        title: "Remove impossible areas before ranking attractive ones.",
        detail:
          "Protected areas where available, water, urban cores and safety buffers are applied as hard exclusions before suitability scoring and site extraction.",
      },
      {
        eyebrow: "04 — Rank",
        title: "Turn a raster into decisions a user can inspect.",
        detail:
          "The continuous score becomes a five-class LSI, connected candidate polygons are ranked, and per-site energy plus simplified LCOE estimates are attached for comparison and export.",
      },
    ],
    evidence: [
      {
        label: "Decision model",
        value: "12 criteria",
        detail: "Criteria are grouped under documented economic, technical and environmental weights rather than hidden in a single opaque score.",
      },
      {
        label: "Suitability output",
        value: "5 classes",
        detail: "The public validation output spans Most Suitable through Least Suitable and is preserved as a committed map artifact.",
      },
      {
        label: "NW coast validation",
        value: "34.22%",
        detail: "Share of valid area classified in the top suitability class for the documented 500 m validation run; divergence from the paper anchor is explicitly discussed.",
      },
      {
        label: "Delivery",
        value: "Map → PDF",
        detail: "The public product carries a drawn AOI through analysis, ranked sites, map layers, energy/economic estimates and report export.",
      },
    ],
    constraints: [
      "WDPA protected-area exclusions are Egypt-only in the deployed workflow because the licence-restricted dataset is not bundled globally; the UI states when the exclusion is unavailable.",
      "AHP weights are documented MCDA defaults, not the paywalled pairwise matrices from the comparison paper, and remain subjective/editable inputs.",
      "LCOE values use simplified fixed defaults and are not a substitute for project-specific land, grid and financing economics.",
    ],
    publicationNote:
      "The validation difference is kept visible rather than presented as reproduction parity. The larger AOI, newer datasets and different documented AHP weights materially change the comparison.",
    links: [
      { label: "Public repository", href: "https://github.com/m7mdehab/SolarSiteSelection" },
      { label: "Live demo", href: "https://huggingface.co/spaces/M7mdehab/solar-site-selection" },
      { label: "Validation notes", href: "https://github.com/m7mdehab/SolarSiteSelection/tree/main/docs/validation" },
    ],
  },

  makhbazy: {
    slug: "makhbazy",
    thesis:
      "The product-design problem spans the customer's whole ordering lifecycle. A few polished screens would be weaker proof than the journey connecting them.",
    challenge:
      "Design and supervise a multi-role mobile ordering experience from onboarding and company approval through repeat ordering, catalog discovery, checkout, delivery tracking, receiving and support.",
    scope:
      "Mohammed designed the UI/UX, led product/development, monitored and supervised implementation, approved delivery and oversaw Android/iOS execution from start to finish. The evidence supports product/design leadership; it does not support a claim that he personally coded the entire mobile application.",
    steps: [
      {
        eyebrow: "01 — Map",
        title: "Treat onboarding and account readiness as product states.",
        detail:
          "The internal journey evidence covers onboarding, company setup and approval before the purchasing flow becomes available.",
      },
      {
        eyebrow: "02 — Design",
        title: "Connect discovery to repeat purchase.",
        detail:
          "Catalog, product detail, reorder, cart and checkout are represented as one UX path rather than isolated mockups.",
      },
      {
        eyebrow: "03 — Supervise",
        title: "Carry the designed journey into Android and iOS delivery.",
        detail:
          "The authorized role wording includes leading development, monitoring implementation and supervising cross-platform execution.",
      },
      {
        eyebrow: "04 — Close",
        title: "Design beyond checkout into operational completion.",
        detail:
          "Delivery tracking, receiving, support and documentation extend the product journey through the customer's post-order experience.",
      },
    ],
    evidence: [
      {
        label: "Journey evidence",
        value: "23 pages",
        detail: "An internal customer-journey document provides substantive UX/product evidence but remains unpublished until rights are explicitly cleared.",
      },
      {
        label: "Platforms",
        value: "Android + iOS",
        detail: "The authorized project statement covers supervised delivery across both mobile platforms.",
      },
      {
        label: "Public role",
        value: "Design + lead",
        detail: "UI/UX design, product/development leadership, implementation supervision and delivery approval are the governed public ownership boundary.",
      },
    ],
    constraints: [
      "Raw customer-journey screens and internal visual-identity material are not published merely because the project corpus is accessible.",
      "The case study never converts delivery leadership into a false claim of sole Android/iOS coding ownership.",
      "Mockups and internal design artifacts are not described as shipped screenshots unless publication and implementation evidence explicitly support that wording.",
    ],
    publicationNote:
      "Until original interface assets are cleared, the site uses a deliberately abstract phone/journey treatment. That preserves product-story credibility without leaking protected company material.",
    links: [],
  },
} as const satisfies Record<EvidenceProjectSlug, CaseStudy>;
