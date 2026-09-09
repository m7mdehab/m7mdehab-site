# Iteration 5 — Production Case-Study Storytelling & Validation

Updated: 2026-09-09
Status: **COMPLETE pending final documentation-only CI/merge gate**

## Goal

Turn the six project-detail routes from thin evidence placeholders into substantive, evidence-first case studies while preserving the truth model, confidentiality boundaries, visual provenance rules and the restrained Natalie + Aitezaz taste calibration established in earlier iterations.

Iteration 5 also establishes the first real clean-checkout application CI baseline so future visual/content work is validated by installed dependencies rather than syntax inspection alone.

## What changed

### 1. Governed case-study runtime projection

Created `data/case-studies.ts` as a curated narrative projection for project-detail pages.

It does **not** replace or outrank:
- `data/source-of-truth.public.yaml`;
- `data/project-evidence.public.yaml`;
- current verified public project repositories;
- Mohammed's newest explicit instructions.

Each case study now has a common information contract:
- thesis;
- challenge;
- role/scope;
- approach steps;
- checkable evidence;
- limitations / publication boundaries;
- public evidence links where available.

Depth is intentionally unequal. A public technical repository can support architectural/evaluation detail that a public-safe commercial or internal product project cannot safely expose.

### 2. Production editorial case-study renderer

Created:
- `components/case-study.tsx`;
- `components/case-study.module.css`.

The shared narrative rhythm is:

1. large editorial thesis;
2. challenge context;
3. explicit role and scope;
4. short system/decision sequence;
5. evidence cards;
6. high-contrast limits and boundaries section;
7. publication/source note;
8. next-project continuation.

The structure is semantic server-rendered content. No project requires scroll choreography, a modal, WebGL or an immersive microsite to understand the work.

### 3. Project-route integration

`app/work/[slug]/page.tsx` now renders the full case-study narrative below the existing evidence-specific visual hero.

The old generic "Evidence-first case study in progress" placeholder has been removed.

Project metadata now identifies each project route as a case study, and the routes preserve direct links to public evidence when governed evidence exists.

## Six project decisions

### Presaira

The case study centers **forecast integrity after the event**, not a football/sportsbook aesthetic.

Public proof used:
- Dixon-Coles + Elo model blend;
- 50,000-iteration full-tournament simulation;
- 104/104 World Cup match evaluation coverage;
- pre-cutoff/leakage protections and tests;
- calibration/backtest/postmortem evidence;
- committed failed convergence target rather than rewriting it as success.

Publication boundary:
- the public repository is a curated extract;
- live ingestion/database/publication internals remain outside the site narrative.

### OpportunityOS

The case study proves the system through **authority and invariants**, not an invented private dashboard.

Public-safe proof used:
- discovery → ingest → qualify → score → truth-locked tailor → prepare/fill/controlled-submit → monitor → learn flow;
- Truth Graph / EvidenceClaim factual authority;
- open-world qualification semantics;
- evidence-aware matching;
- `DRY_RUN`, `ASSISTED`, `CONTROLLED_SUBMIT` action modes;
- explicit stop/authority boundaries.

Publication boundary:
- private repository remains authoritative;
- founder truth, application data, credentials and private implementation remain excluded.

### Ghareeb Oglu Commerce

The case study emphasizes **end-to-end commerce ownership**, not invented business KPIs.

Governed public scope used:
- product planning;
- solution design/architecture;
- tool selection/implementation;
- build from scratch;
- storefront/backend/payments/fulfillment/deployment breadth.

Publication boundary:
- internal design/product assets remain evidence candidates, not automatically publishable assets;
- historical import files are not treated as proof of the current stack;
- no revenue/conversion/traffic outcome is invented for narrative completeness.

### Oil Spill Detection

The case study is deliberately **oil-class and deployment-path specific**.

Public proof used:
- Sentinel-1 SAR five-class segmentation;
- U-Net / DeepLabV3+ / SegFormer comparison;
- selected SegFormer oil IoU `0.566`;
- oil recall `0.764`;
- mean IoU `0.696`;
- ONNX + tiled full-scene/geospatial pipeline;
- real MV Wakashio case study.

Documented limitations remain visible:
- small/imbalanced dataset;
- oil occupies roughly 1% of pixels;
- single VV channel;
- raw-scene preprocessing/domain gap;
- case-study detected area is not presented as false measurement certainty.

### Solar Site Selection

The case study is framed as an **inspectable decision system**, not simply a map.

Public proof used:
- multiple public geodata sources;
- twelve documented criteria;
- AHP/MCDA with consistency checking;
- five-class LSI;
- hard exclusions;
- ranked candidate sites;
- pvlib energy and simplified LCOE;
- FastAPI + React/MapLibre + PDF delivery;
- public validation artifact and documented divergence from the paper anchor.

Limitations remain explicit:
- deployed WDPA exclusion coverage limitation;
- subjective/editable AHP defaults;
- simplified economic assumptions.

### Makhbazy

The case study proves **product/UI/UX leadership and supervised mobile delivery** without exposing internal screens or inflating ownership.

Governed proof used:
- substantial internal customer-journey evidence;
- UI/UX design;
- product/development leadership;
- implementation supervision;
- Android + iOS delivery oversight;
- release/delivery approval.

Publication boundary:
- raw internal journey and visual-identity materials remain unpublished;
- the public website uses an original journey abstraction;
- no claim is made that Mohammed personally coded the entire application.

## Design-system decision

`docs/DESIGN_SYSTEM.md` now formalizes an evidence-first case-study grammar.

Case studies should feel richer than the homepage but remain within the same authored visual system:
- large editorial statements;
- generous whitespace;
- real evidence moments;
- controlled asymmetry;
- readable narrative pacing;
- no game-like interaction layer;
- no repeated six-page template feel created through fake visual symmetry.

## Responsive / reduced-motion behavior

The new case-study layout includes explicit tablet/mobile linearization and a reduced-motion fallback for interactive link/next-project transitions.

This is an **implemented code path**, not a claim of screenshot/device validation. The same semantic content remains available at every breakpoint and under reduced motion.

## CI baseline established

Created `.github/workflows/ci.yml` and `eslint.config.mjs`.

The CI job runs on pull requests to `main` and pushes to `main`, with stale runs cancelled. It uses current Node-24-based GitHub Actions while testing the application itself on Node 22.

Current gate:
1. fresh dependency installation;
2. `npm run typecheck`;
3. `npm run lint`;
4. `npm run build`;
5. production server smoke tests.

The production smoke test verifies HTTP success for:
- `/`;
- `/work/presaira`;
- `/work/opportunityos`;
- `/work/ghareeb-oglu`;
- `/work/oil-spill-detection`;
- `/work/solar-site-selection`;
- `/work/makhbazy`;
- `/llms.txt`;
- `/profile.json`;
- `/projects.json`.

### Source-stable validation result

GitHub Actions run `34317360117` on commit `8c0a8b2d75960b14bc1ee29683c9298138f1edc1` completed successfully:
- dependency install: **PASS**;
- TypeScript typecheck: **PASS**;
- ESLint: **PASS**;
- Next.js production build: **PASS**;
- production-route smoke tests: **PASS**.

### Defects found and fixed by the first real checkout

The first validation passes surfaced older repository defects that syntax-only validation had not caught:

1. `projects` is a literal union, so `project.href` cannot be accessed on entries that intentionally have no `href`. The project route and `/llms.txt` now narrow the optional property correctly.
2. ESLint 9 had been declared but no flat `eslint.config.*` existed, so `npm run lint` could not work on a fresh checkout. A Next.js flat config now exists.
3. `Reveal` created a Motion component during render. It now selects between stable predeclared Motion elements and exposes only the semantic variants actually used by the site.
4. The external Oil/Solar `<img>` use is now explicitly documented as intentional because those URLs are immutable, source-pinned evidence assets rather than normal site-owned image-library content.
5. The PostCSS config no longer emits the anonymous-default-export lint warning.
6. CI no longer duplicates every branch commit through both push and pull-request events.

## What is still not tested

Do **not** interpret the CI pass as rendered visual QA.

The following remain unrun in this environment:
- desktop browser screenshot review;
- 390px/other mobile screenshot review;
- real-device interaction review;
- visual regression testing;
- Playwright browser interaction testing;
- Lighthouse performance/SEO/accessibility scoring;
- automated axe/accessibility audit;
- rendered `prefers-reduced-motion` screenshot comparison;
- external image-availability visual verification in the built browser.

These are Iteration 6 production-hardening inputs, not hidden Iteration 5 passes.

## Dependency/reproducibility observation

The repository still has no committed lockfile, so CI currently uses `npm install`, not `npm ci`. The install also reports that the resolved ESLint 9.x package line is no longer supported by its publisher.

Do not silently change major framework/tooling versions inside this storytelling iteration. Dependency/security review, lockfile generation and deterministic `npm ci` should be handled explicitly in the next production-hardening iteration.

## Licensing / provenance

Iteration 5 introduces:
- no new runtime dependency;
- no copied reference-portfolio implementation;
- no new third-party visual asset;
- no publication of internal Ghareeb/Makhbazy source files.

No attribution-register change is required for Iteration 5.

## Iteration 6 recommendation

**Rendered QA, Production Hardening & Homepage Refinement**

Priority order:
1. render and inspect desktop/tablet/mobile project/home surfaces;
2. explicitly inspect reduced-motion behavior;
3. run Lighthouse and automated accessibility checks;
4. add browser-level route/interaction coverage where useful;
5. generate/commit a lockfile and switch CI to deterministic installation;
6. review current framework/lint/dependency security/support baselines;
7. fix observed layout/performance/a11y defects before adding more motion;
8. improve the remaining homepage modules from rendered evidence rather than abstract redesign;
9. reconsider a true contextual Ghareeb live-site capture only if publication/asset handling remains safe.
