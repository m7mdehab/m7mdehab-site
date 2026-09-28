import { projects } from "@/data/public";

const presentation = [
  {
    slug: "presaira",
    title: "Presaira",
    kicker: "Probabilistic forecasting product",
    summary:
      "A tournament-wide forecasting system covering all 104 matches of the 2026 World Cup, with reproducible simulation and post-event evaluation.",
    mobileSummary:
      "Forecasted all 104 World Cup matches with reproducible simulation and post-event evaluation.",
    proof: "Data science · Forecasting · Calibration · Monte Carlo",
    mobileProof: "Data science · Forecasting · Calibration",
  },
  {
    slug: "opportunityos",
    title: "OpportunityOS",
    kicker: "Governed AI system",
    summary:
      "A governed opportunity workflow built around autonomous agents, provenance and controlled generation.",
    mobileSummary:
      "A governed agent workflow built around provenance, controlled generation and explicit action boundaries.",
    proof: "AI engineering · Multi-agent architecture · Governance · Product systems",
    mobileProof: "AI engineering · Multi-agent · Governance",
  },
  {
    slug: "oil-spill-detection",
    title: "Oil Spill Detection",
    kicker: "SAR computer vision",
    summary:
      "A Sentinel-1 SAR segmentation pipeline for marine oil-spill detection, with model evaluation, georeferenced outputs, API serving and an interactive map.",
    mobileSummary:
      "Sentinel-1 SAR segmentation for marine oil-spill detection, evaluation and georeferenced outputs.",
    proof: "Deep learning · Computer vision · Remote sensing · Validation",
    mobileProof: "Computer vision · Remote sensing · Validation",
  },
  {
    slug: "solar-site-selection",
    title: "Solar Site Selection",
    kicker: "Geospatial decision system",
    summary:
      "A photovoltaic siting engine combining public geodata, AHP scoring, suitability mapping, ranked candidate sites and energy/LCOE estimates.",
    mobileSummary:
      "A geospatial siting engine combining AHP scoring, suitability mapping and ranked candidate sites.",
    proof: "Geospatial analytics · AHP · Optimization · Decision support",
    mobileProof: "Geospatial · AHP · Decision support",
  },
  {
    slug: "ghareeb-oglu",
    title: "Ghareeb Oglu",
    kicker: "End-to-end commerce platform",
    summary:
      "A commerce platform designed and built end to end — storefront, backend, payments, fulfillment and deployment.",
    mobileSummary:
      "An end-to-end commerce platform spanning storefront, backend, payments and fulfillment.",
    proof: "Product ownership · Software architecture · Ecommerce · End-to-end delivery",
    mobileProof: "Product ownership · Architecture · Ecommerce",
  },
  {
    slug: "makhbazy",
    title: "Makhbazy",
    kicker: "Mobile product leadership",
    summary:
      "Led UI/UX and Android/iOS product delivery from concept through implementation, supervision and release approval.",
    mobileSummary:
      "Led UI/UX and Android/iOS product delivery from concept through release approval.",
    proof: "Product leadership · UI/UX · Technical supervision · Mobile delivery",
    mobileProof: "Product leadership · UI/UX · Mobile delivery",
  },
] as const;

export const selectedWorkProjects = presentation.map((entry) => {
  const project = projects.find((candidate) => candidate.slug === entry.slug);
  if (!project) throw new Error(`Unknown homepage project: ${entry.slug}`);
  return { ...project, ...entry };
});
