/**
 * Curated runtime projection of data/project-evidence.public.yaml for Iteration 4 visuals.
 * This file contains visual-treatment metadata and public/public-safe evidence only.
 * It is not a replacement truth registry and must remain reconciled with the YAML evidence registry.
 */

export type EvidenceProjectSlug =
  | "presaira"
  | "opportunityos"
  | "ghareeb-oglu"
  | "oil-spill-detection"
  | "solar-site-selection"
  | "makhbazy";

export type ProjectVisualLayout = "feature" | "system" | "reverse" | "technical" | "map" | "journey";

const oilCommit = "6c18c292153b3c617dd1e015dbe00f86272f9437";
const solarCommit = "c82acc83f285050878cee1a3e6d84c5ec9ba56e9";

export const projectVisuals = {
  presaira: {
    layout: "feature",
    verb: "Plot / evolve",
    provenance: "public_code_renderable",
    evidenceHref: "https://presaira.com",
    label: "Committed 2026 calibration evidence",
    caption: "Forecast confidence compared with observed outcomes after the completed 104-match tournament.",
    reliability: [
      { predicted: 0.2555866549, observed: 0.2173913043, n: 23 },
      { predicted: 0.3462108304, observed: 0.35, n: 20 },
      { predicted: 0.4322259652, observed: 0.65, n: 20 },
      { predicted: 0.5487644572, observed: 0.7727272727, n: 22 },
      { predicted: 0.643368812, observed: 0.8, n: 10 },
    ],
    proof: ["104 matches forecast", "50,000-iteration Monte Carlo", "post-event evaluation"],
  },
  opportunityos: {
    layout: "system",
    verb: "Trace / authorize",
    provenance: "public_safe_derived",
    evidenceHref: "https://github.com/m7mdehab/opportunityos-docs",
    label: "Public architecture diagram — not product UI",
    caption: "Truth and provenance constrain matching, generation and outbound action authority.",
    stages: ["Discover", "Ingest", "Qualify", "Score", "Truth-lock", "Prepare", "Monitor", "Learn"],
    authority: ["Truth Graph", "EvidenceClaim", "DRY_RUN", "ASSISTED", "CONTROLLED_SUBMIT"],
  },
  "ghareeb-oglu": {
    layout: "reverse",
    verb: "Reveal / browse",
    provenance: "public_safe_derived",
    evidenceHref: "https://ghareeboglu.com",
    label: "Public-safe live-commerce flow — not a screenshot",
    caption: "A restrained representation of the public storefront journey without redistributing uncleared brand/product imagery.",
    stages: ["Browse", "Product", "Cart", "Fulfillment"],
  },
  "oil-spill-detection": {
    layout: "technical",
    verb: "Compare / detect",
    provenance: "public_repo_asset",
    evidenceHref: "https://github.com/m7mdehab/oil-spill-detection",
    label: "MV Wakashio case-study output",
    caption: "Real Sentinel-1 SAR case-study evidence with oil-class evaluation from the committed test run.",
    image: `https://raw.githubusercontent.com/m7mdehab/oil-spill-detection/${oilCommit}/docs/case_study/wakashio_detection.png`,
    imageAlt: "MV Wakashio Sentinel-1 SAR oil-spill detection case-study output from the public Oil Spill Detection repository",
    metrics: [
      { label: "Oil IoU", value: "0.566" },
      { label: "Oil recall", value: "0.764" },
      { label: "Mean IoU", value: "0.696" },
      { label: "Macro F1", value: "0.802" },
    ],
  },
  "solar-site-selection": {
    layout: "map",
    verb: "Layer / rank",
    provenance: "public_repo_asset",
    evidenceHref: "https://github.com/m7mdehab/SolarSiteSelection",
    label: "Public application + validation evidence",
    caption: "Actual AOI/criteria screens and the committed five-class Land Suitability Index map.",
    images: [
      {
        src: `https://raw.githubusercontent.com/m7mdehab/SolarSiteSelection/${solarCommit}/docs/assets/demo-1-landing.png`,
        alt: "Solar Site Selection public application landing and map interface",
        label: "AOI",
      },
      {
        src: `https://raw.githubusercontent.com/m7mdehab/SolarSiteSelection/${solarCommit}/docs/assets/demo-2-aoi-criteria.png`,
        alt: "Solar Site Selection public application area-of-interest and criteria interface",
        label: "Criteria",
      },
      {
        src: `https://raw.githubusercontent.com/m7mdehab/SolarSiteSelection/${solarCommit}/docs/validation/lsi_map.png`,
        alt: "Solar Site Selection five-class Land Suitability Index validation map",
        label: "Suitability",
      },
    ],
  },
  makhbazy: {
    layout: "journey",
    verb: "Sequence / progress",
    provenance: "public_safe_derived",
    label: "Public-safe product-journey abstraction",
    caption: "The original internal journey remains unpublished; this treatment communicates UI/UX and product-delivery leadership without reproducing protected screens.",
    stages: ["Discover", "Order", "Track", "Receive"],
  },
} as const satisfies Record<EvidenceProjectSlug, Record<string, unknown> & { layout: ProjectVisualLayout; verb: string; provenance: string; label: string; caption: string }>;
