# Project Evidence & Visual Asset Audit — 2026-09-09

## Status

Iteration 3 is complete.

This audit converts the six flagship projects and four primary service propositions into an evidence-first visual system. Its purpose is not to collect as many screenshots as possible. Its purpose is to determine which proof is real, publishable, strategically useful and visually strong enough to carry the website.

The structured companion registry is:

`data/project-evidence.public.yaml`

The governing factual registry remains:

`data/source-of-truth.public.yaml`

These files serve different purposes:

- `source-of-truth.public.yaml` answers **what may be claimed**;
- `project-evidence.public.yaml` answers **what may be shown as proof, how strong it is, and how it should be visualized**;
- `data/public.ts` remains the curated runtime projection used by the current interface.

---

# 1. Executive conclusions

## 1.1 The portfolio is not visually evidence-poor

The public technical projects already contain unusually strong first-party evidence:

- real model outputs;
- real interfaces;
- real maps;
- committed evaluation data;
- reproducibility artifacts;
- public source code;
- methodology and validation material.

The website therefore does not need generic generated tech artwork for Presaira, Oil Spill Detection or Solar Site Selection.

OpportunityOS has substantial public-safe architecture evidence, but intentionally does not expose the private product/code/data. It should therefore receive an **original architecture/provenance visual derived only from the public mirror**, not an invented dashboard screenshot.

Ghareeb Oglu and Makhbazy have substantial internal project material. That material is useful for validating the work and planning the case studies, but internal availability does not automatically establish permission to republish the original asset bytes. Until rights are explicit, internal material is an **evidence source and design reference**, not a public asset library.

## 1.2 The four primary service propositions have unequal visual proof — and that is acceptable

The strongest public proof currently clusters around ML/AI products and product/web delivery.

| Primary service | Evidence strength | Public visual strength | Current treatment |
|---|---|---:|---|
| Data migration & reconciliation | Strong | Low | Experience/capability proof; no fabricated client visuals |
| Analytics & Power BI | Strong | Low–medium | Experience/capability proof; do not mislabel non-Power-BI analytics as Power BI |
| ML & AI product development | Very strong | Very strong | Presaira + OpportunityOS + Oil Spill + Solar |
| Product & web development | Very strong | Very strong | Ghareeb + Makhbazy + Presaira + Oil Spill + Solar |

This means the website should **not force visual symmetry between service cards**. A migration service can be persuasive through role credibility, methods and explicit outcomes even when confidential client work cannot be screenshotted. Likewise, Power BI should not be “proved” with an unrelated chart merely because a visual slot exists.

## 1.3 The current generic project visual must be retired

`components/project-visual.tsx` currently gives every project the same grid/orbit/sparkline treatment.

That was acceptable as an early scaffold. It is not acceptable as production art direction because it erases the strongest difference between the projects: each one has a different kind of proof.

Iteration 4 should replace that one generic component with project-specific visual treatments backed by the evidence registry.

---

# 2. Evidence and asset status model

Every visual candidate is now classified as one of the following.

### `public_repo_asset`

Already published in Mohammed's public repository. Suitable for direct use when the repository/asset licensing context permits it.

Examples:

- Oil Spill Wakashio case-study figure;
- Solar Site Selection application screenshots;
- Solar LSI validation map.

### `public_code_renderable`

Public source/data is sufficient to recreate, render or capture a truthful first-party visual.

Examples:

- Presaira probability-over-time chart;
- Presaira reliability/calibration chart;
- Oil Spill model-comparison chart derived from committed result JSON.

### `public_live_capture`

A currently public product/page can be captured in context as project evidence.

Rule: a page screenshot is evidence of the product experience. It is **not** permission to extract unrelated product photography, logos or brand illustrations into a separate reusable asset pack.

### `public_safe_derived`

An original explanatory graphic may be created from public-safe facts.

It must look and read like an explanatory diagram, not a hidden/internal product screenshot.

OpportunityOS is the main case.

### `internal_candidate`

An internal connected source is visually useful and supports the project story, but the original bytes are not cleared for public shipping merely because they are accessible to this project.

Ghareeb Oglu and Makhbazy contain important candidates in this category.

### `evidence_only`

Useful to substantiate implementation/history but not suitable as a visual artifact.

Example: historical commerce-import files in the Ghareeb website corpus.

### `reject`

Do not use publicly.

This includes confidential client material, private OpportunityOS data/code, invented screenshots, and any asset whose rights or factual meaning are unclear.

---

# 3. Service-proof audit

## 3.1 Data migration & reconciliation

### What is genuinely supported

The current professional role establishes direct migration credibility, while the governed skills model supports:

- data migration;
- ETL;
- source-to-target mapping;
- data cleansing and validation;
- reconciliation;
- PostgreSQL.

### What is intentionally unavailable

The strongest real migration examples are enterprise/client work and therefore sit behind the Network International confidentiality boundary.

The public website must not invent or reconstruct:

- a bank/client migration dashboard;
- a source database screenshot;
- a target platform screen;
- client schemas;
- a cutover diagram presented as actual client architecture;
- proprietary reconciliation outputs;
- internal systems/platform names.

### Production implication

Treat this service as **credibility + method + outcome**, not as screenshot theater.

A small clearly generic/process-level visual can explain concepts such as map → transform → validate → reconcile, provided it is labelled as a capability illustration and contains no fictional client data.

The absence of a public migration screenshot is a confidentiality signal, not a credibility defect.

---

## 3.2 Analytics & Power BI

### What is genuinely supported

The professional history includes recurring reporting, KPI definition, multi-source consolidation, operational analysis and commercial reporting. The verified skill model includes:

- Power BI;
- Advanced Excel;
- KPI design;
- dashboards;
- reporting and analytics.

### Current visual gap

No verified publishable Power BI dashboard screenshot was found in the currently accessible public/project-safe sources.

Presaira and Solar Site Selection demonstrate strong analytical reasoning, but they are not Power BI artifacts. They must never be relabelled as such.

### Production implication

Keep this proposition on the site because it is genuine and commercially useful, but represent it through:

- experience-backed outcomes;
- capability language;
- possibly a restrained original analytics composition;
- a real Power BI artifact only if a publishable one becomes available later.

Do not manufacture visual proof to fill the gap.

---

## 3.3 ML & AI product development

This is the strongest evidence cluster.

### Presaira

Evidence of probabilistic modeling, simulation, evaluation, reproducibility, testing and a public product.

### OpportunityOS

Evidence of governed AI architecture, provenance, truth management, evidence-aware qualification and controlled autonomy.

### Oil Spill Detection

Evidence of deep learning, computer vision, remote sensing, deployment, model evaluation and end-to-end inference/product delivery.

### Solar Site Selection

Evidence of analytical modeling, geospatial decision systems, optimization/multi-criteria analysis and end-to-end application delivery.

### Production implication

This service should be proved by **showing the actual systems**, not by writing a long skills list or rendering generic LLM/network imagery.

---

## 3.4 Product & web development

Also very strong, but the proof is deliberately diverse.

### Ghareeb Oglu

Shows end-to-end product planning, design, commerce architecture and execution in a real consumer-brand context.

### Makhbazy

Shows UI/UX design, product leadership, journey design and supervised mobile delivery.

### Presaira

Shows a public technical product around a rigorous modeling system.

### Oil Spill / Solar

Show that Mohammed can turn technical engines into usable web applications rather than stopping at notebooks/models.

### Production implication

This proposition should be visually broader than “web developer.” It should communicate the ability to move from problem/requirements → architecture/design → implementation/delivery → usable product.

---

# 4. Project-by-project evidence audit

## 4.1 Presaira

### Public sources

- `https://github.com/m7mdehab/WC2026-Live-Prediction-Engine`
- `https://presaira.com`

### Strongest proof

The public repository currently documents:

- forecasting of all 104 World Cup 2026 matches;
- Dixon-Coles goal modeling blended with Elo;
- 50,000-iteration Monte Carlo tournament simulation;
- committed calibration/backtest evidence;
- reproducible/versioned runs;
- automated tests;
- retrospective/postmortem material after the event.

This makes Presaira valuable because it is no longer merely a future-looking demo. It can be judged after reality occurred.

### Best visual candidates

**Primary — current live product capture**

Use the current public product to show the real interface rather than manufacturing a portfolio mockup.

**Primary — probability-over-time visualization**

`web/src/components/home/ProbabilityOverTimeChart.tsx` is based on retained real champion-probability history. It is a strong candidate for a localized interactive visual on the portfolio site.

**Secondary — reliability/calibration**

`web/src/components/methodology/ReliabilityChart.tsx` plus the committed reliability data can show the evaluation side of the story.

**Supporting — bracket/product views**

Useful for context, but the case study should not devolve into generic football aesthetics.

### Recommended interaction

A probability trajectory develops as the project enters view, then the surrounding copy shifts from “forecast” to “evaluation.” On reduced-motion/mobile paths, use a static chart or current-product screenshot.

### Reject

- gambling/sportsbook visual language;
- fake odds;
- generic football poster art;
- pre-tournament/future-tense copy;
- motion that implies live data when the rendered state is static.

---

## 4.2 OpportunityOS

### Public source

`https://github.com/m7mdehab/opportunityos-docs`

The public mirror explicitly exists as an allowlisted documentation projection. The private repository remains authoritative.

### Strongest public-safe proof

The current architecture publishes this product flow:

`discover -> ingest -> qualify -> score -> truth-locked tailor -> prepare/fill/controlled-submit -> monitor outcomes -> learn safely`

It also publicly documents:

- Truth Graph / EvidenceClaim authority;
- evidence-aware matching;
- explicit outbound action modes;
- fail-closed behavior around unsupported claims/actions;
- source policy and persisted state.

### Best visual candidate

**Primary — original provenance/authority flow**

Create a new portfolio-specific diagram from the published architecture. The visual should communicate that truth/provenance constrains later automation.

It must be visibly an explanatory architecture treatment, not a screenshot of a hidden/private product.

**Supporting — action-authority states**

A compact DRY_RUN → ASSISTED → CONTROLLED_SUBMIT treatment can demonstrate graduated authority.

### Recommended interaction

Use a small number of staged state changes: source/evidence becomes a claim, then later actions illuminate only when authority exists. Keep the visual quiet and deterministic.

### Reject

- invented OpportunityOS dashboard screenshots;
- private founder/application data;
- private code/internal UI;
- large “multi-agent network” node spaghetti;
- autonomous-agent spectacle that obscures governance.

---

## 4.3 Ghareeb Oglu Commerce

### Evidence sources

- current public Ghareeb Oglu commerce site;
- connected internal Ghareeb Oglu project corpus;
- Mohammed-authorized ownership wording from the website master plan.

### What the internal corpus establishes

The accessible project corpus includes substantial website/product/brand material, including website categories, product/brand assets and historical commerce-import material.

This supports the existence and breadth of the project work. It does **not** mean every internal image is automatically cleared for republishing.

Historical WooCommerce/import files are evidence of an earlier implementation stage only. They must not be used to infer the current production architecture.

### Best visual candidates

**Primary — current live storefront capture**

Capture the actual public site at implementation time. This is the strongest UI proof because it is the real product rather than a presentation mockup.

**Secondary — brand/product composition**

The internal corpus contains visually strong product/brand compositions. These may become supporting material only after publication rights are established.

**Supporting — coffee-tools/product concept image**

Useful as atmosphere if cleared, but not evidence of a shipped interface.

### Recommended interaction

A single strong storefront/device visual can transition between browse/product/cart states or use an elegant image mask/scale treatment. A small commerce-flow indicator may connect product discovery to fulfillment.

### Reject

- presenting internal marketing mockups as shipped UI;
- presenting AI-assisted creative imagery as documentary evidence;
- extracting public-site product photography into standalone portfolio decoration without rights;
- claiming current stack from legacy WooCommerce import artifacts.

---

## 4.4 Makhbazy

### Evidence sources

- Mohammed-authorized public role wording;
- connected Makhbazy handover corpus;
- internal 23-page **Makhbazy Customer Journey** design document;
- internal visual-identity material.

### Strongest UX/product evidence found

The customer-journey document contains a coherent multi-stage mobile product flow, including:

- onboarding/verification;
- company setup and approval;
- home/reorder;
- catalog browsing;
- product detail;
- cart;
- checkout;
- branch/delivery/payment selection;
- delivery tracking;
- receiving/problem reporting;
- invoices/support/repeat ordering.

This is materially stronger evidence for the case study than a generic mobile mockup because it demonstrates product architecture and journey design.

### Publication boundary

The document is internal project material. It may be used to verify and design the case study internally. Its original slides/screens should not be copied to the public website until publication rights are explicit.

### Best visual candidates

**Primary if cleared — customer-journey screens**

The best raw evidence of the UI/UX work.

**Secondary if cleared — visual-identity/device mockups**

Good product atmosphere, but distinguish mockups from shipped functionality.

**Fallback — original public-safe journey abstraction**

If raw UI remains uncleared, build an original phone/journey treatment from the authorized high-level product facts. It must not reproduce protected screens or imply that invented UI is a screenshot.

### Recommended interaction

A compact phone sequence can move through discover → order → track → receive. This interaction should communicate product/UX leadership, not claim that Mohammed personally coded every Android/iOS screen.

### Reject

- publishing the internal deck by default;
- sole-coding claims not supported by the authorized role statement;
- calling identity/mockup screens “production screenshots” without evidence.

---

## 4.5 Oil Spill Detection

### Public source

`https://github.com/m7mdehab/oil-spill-detection`

### Strongest proof

The public repository documents:

- Sentinel-1 SAR semantic segmentation;
- five-class classification including oil and look-alikes;
- selected SegFormer mit-b2 model;
- committed model evaluation;
- a real MV Wakashio case study;
- ONNX inference;
- georeferenced outputs;
- FastAPI service;
- React/MapLibre product surface.

The strongest current headline metrics are oil-specific rather than background-dominated pixel accuracy:

- Oil IoU: 0.566
- Oil recall: 0.764
- Mean IoU: 0.696
- Macro F1: 0.802

### Best visual candidates

**Primary — `docs/case_study/wakashio_detection.png`**

This is the strongest individual visual artifact found in the audit: real SAR context plus actual detected oil in a documented event case study.

**Secondary — SAR sample gallery**

Use real repository samples to explain the problem of oil vs look-alikes.

**Secondary — model comparison**

Render a concise first-party comparison from the committed result JSON rather than recreating vague “AI accuracy” graphics.

### Recommended interaction

A controlled before/after or mask-reveal interaction between SAR and detected oil is justified because the interaction directly explains the computer-vision task.

Reduced motion: static side-by-side figure.

### Reject

- generic satellite stock photography;
- overall pixel accuracy as the hero metric;
- claims of certainty that ignore documented limitations.

---

## 4.6 Solar Site Selection

### Public source

`https://github.com/m7mdehab/SolarSiteSelection`

The repository also links a public live demo.

### Strongest proof

- map-based AOI workflow;
- multiple public geodata sources;
- consistency-checked AHP multi-criteria analysis;
- five-class Land Suitability Index;
- ranked candidate sites;
- energy/LCOE estimation;
- PDF/report output;
- documented validation/limitations.

### Best visual candidates

**Primary — `docs/assets/demo-1-landing.png`**

Real application context.

**Primary — `docs/assets/demo-2-aoi-criteria.png`**

Strongest UI evidence for the actual decision inputs.

**Secondary — `docs/validation/lsi_map.png`**

A clear analytical result showing the suitability surface.

### Recommended interaction

A lightweight map-layer transition can move from AOI/criteria → suitability surface → ranked site output. This should be a contained visual, not an embedded full GIS application on the homepage.

### Reject

- generic solar-panel stock photography;
- implying global protected-area exclusions when the project documents a WDPA coverage limitation;
- turning the homepage into a heavy interactive map.

---

# 5. Evidence-first project visual grammar

The six projects should intentionally use different visual verbs:

| Project | Primary visual verb | What it proves |
|---|---|---|
| Presaira | **Plot / evolve** | probabilistic thinking + evaluation |
| OpportunityOS | **Trace / authorize** | governance + provenance + controlled autonomy |
| Ghareeb Oglu | **Reveal / browse** | end-to-end consumer product execution |
| Makhbazy | **Sequence / progress** | journey design + product leadership |
| Oil Spill | **Compare / detect** | computer vision + validation |
| Solar | **Layer / rank** | geospatial analysis + decision systems |

This is more important than giving every project the same card shape.

The system can still share typography, spacing, transition timing and navigation language. What should vary is the **evidence interaction**, not the entire brand identity.

---

# 6. Homepage storytelling implication

The strategic priority order remains unchanged by this audit. However, Iteration 4 may prototype a visually varied sequence rather than mechanically listing projects by rank.

One sequencing hypothesis worth testing is:

1. Presaira — analytical/interactive technical opener
2. Ghareeb Oglu — immediate shift into consumer product craft
3. OpportunityOS — architecture/governance depth
4. Oil Spill Detection — visual technical validation
5. Makhbazy — mobile product/journey leadership
6. Solar Site Selection — map/decision-system close

This is **not yet a locked IA change**. It is a prototype hypothesis to prevent repetitive adjacent technical visuals while keeping Presaira first.

---

# 7. Asset-publication rules locked by Iteration 3

1. Real project evidence outranks generated decoration.
2. A public repository asset may be used only within its actual meaning and licensing/source context.
3. A public live-site screenshot may prove the product experience; it does not automatically free every underlying brand/image asset for separate reuse.
4. Internal Drive/project material is **not automatically publishable**.
5. Internal material may validate the case study and guide an original public-safe visual without shipping the original bytes.
6. A conceptual diagram must look and be described as a conceptual/architecture diagram, never as a screenshot.
7. No fake customer data, fake metrics, fake dashboards or reconstructed confidential systems.
8. Reduced-motion/mobile fallbacks must retain the same truthful evidence, not replace it with decorative placeholders.
9. Every project-specific visual introduced in source code must remain traceable to an entry in `data/project-evidence.public.yaml`.
10. If an asset's publication status changes, update the registry first, then the UI.

---

# 8. Iteration 4 handoff

Iteration 4 should move from audit to implementation/prototyping.

Primary tasks:

- replace the generic `ProjectVisual` scaffold with project-specific evidence components;
- prototype Presaira's probability/evaluation visual;
- prototype Oil Spill's SAR/detection reveal;
- prototype Solar's map/suitability treatment;
- create a public-safe OpportunityOS provenance/authority diagram;
- capture/prepare the real Ghareeb storefront treatment without repackaging uncleared brand assets;
- use a public-safe Makhbazy journey treatment unless raw UI publication rights are established;
- test a visually varied selected-work sequence without changing the strategic IA prematurely;
- preserve semantic text and static fallbacks for SEO, AI extraction, accessibility and reduced motion.

No external setup is required to start those prototypes.
