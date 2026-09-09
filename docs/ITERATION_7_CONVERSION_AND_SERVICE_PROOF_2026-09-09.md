# Iteration 7 — Conversion Architecture & Service Proof

Date: 2026-09-09
Status: **COMPLETE — MERGE READY**
Branch: `iteration-7-conversion-and-service-proof`
Base: Iteration 6 merged `main` at `2911733d8afb9e0750a45b928448bf9633a41084`
Validated runtime head: `20a03dc762b0b0bde6c1d6176751cc021f85b653`

## Objective

Turn the website's strong project and capability evidence into a deliberate, truthful conversion path:

`project → capability → relevant service → contact`

The implementation preserves the same truth, evidence, confidentiality and publication-rights boundaries that govern the project case studies. It does not force every service into equal proof density or invent a sales-funnel persona switch.

## Governing evidence decisions

The project evidence registry defines service-proof asymmetry and Iteration 7 preserves it:

- **Data migration & reconciliation** — strong experience evidence, weak public visual evidence. No client migration artifact is fabricated or reconstructed.
- **Analytics & Power BI** — strong experience/skills evidence, limited publishable artifact evidence. Presaira and Solar may support analytical thinking but are explicitly not Power BI proof.
- **ML & AI product development** — very strong public project evidence from Presaira, OpportunityOS, Oil Spill Detection and Solar Site Selection.
- **Product & web development** — very strong cross-project evidence, with project-specific ownership wording preserved.

Authority remains `data/source-of-truth.public.yaml` + `data/project-evidence.public.yaml`; `data/public.ts` remains the curated runtime projection.

## Production implementation

### Evidence-backed service model

Each primary service now carries:

- stable service ID;
- capability association;
- evidence statement;
- proof-strength label;
- related project evidence where appropriate;
- a distinction between adjacent evidence and direct project-to-service support;
- publication-boundary/context copy;
- provider-neutral contact intent and subject.

### Stable conversion architecture

Homepage service anchors are first-party, server rendered and no-JS-safe:

- `#service-data-migration-reconciliation`
- `#service-analytics-power-bi`
- `#service-ml-ai-product-development`
- `#service-product-web-development`

Capability rows resolve into relevant service anchors. Case studies expose only services directly supported by the evidence registry.

Important conversion links expose stable provider-neutral semantics such as:

- `data-conversion="capability-to-service"`
- `data-conversion="service-to-project"`
- `data-conversion="service-to-contact"`
- `data-conversion="project-to-service"`
- `data-conversion="project-service-to-contact"`
- `data-service-id="..."`

No analytics provider, cookie framework or tracking library is embedded by this iteration.

### Contact and route decisions

- Contextual `mailto:` intents remain the current service-contact mechanism because they are fast, provider-independent and work without JavaScript.
- No first-party contact form/backend is added without evidence that its spam, persistence, privacy and runtime obligations improve real conversion.
- No thin `/services` route is created merely for convention or SEO; the strengthened homepage plus case-study bridges currently provide the more coherent IA.
- No recruiter/client audience switch is introduced. Projects, capabilities, experience, services and contact support both audiences through one evidence hierarchy.

### Client-boundary hardening discovered during performance QA

The performance investigation exposed an architectural issue unrelated to the truth/content density itself: `SmoothScroll` was a client component wrapping the entire server-rendered site tree even though it only needed to install Lenis in an effect.

Iteration 7 changed it into a leaf client island:

- `SmoothScroll` renders no children and returns `null`;
- `SiteNav` and page content remain direct server-rendered siblings in `app/layout.tsx`;
- Lenis remains progressive enhancement and still disables itself for reduced-motion users;
- substantive content no longer grows the payload of a client boundary merely because the homepage becomes richer.

Service evidence-project links were also changed to native anchors because they do not need Next client-prefetch/navigation behavior. The six flagship selected-work links retain Next navigation.

## Durable QA contract

`tests/iteration7.conversion.spec.ts` adds four conversion/progressive-enhancement checks to the existing strict rendered suite. `npm run test:browser` now runs the full `tests` directory.

The 21-test suite verifies:

- homepage + all six case studies on desktop;
- all seven surfaces at 390px mobile;
- no horizontal overflow;
- broken evidence-image checks;
- **any** axe violation on the desktop route set;
- reduced motion;
- keyboard navigation;
- JavaScript-disabled homepage visibility;
- all four stable service anchors;
- capability → service links;
- service proof + provider-neutral contact intents;
- direct project → service relationships;
- no-JS service conversion access.

The rendered workflow is now durably named **Rendered Browser QA** rather than carrying an Iteration 6 name. Artifacts are generic, and Lighthouse logging records runner `benchmarkIndex` alongside category scores.

## Validation history and performance investigation

### First full Iteration 7 run

Code head: `4850e9c7154738f875aee49f0fed0019119b9074`

- Application CI `34369348657`: **PASS**.
- Rendered QA `34369348645`: **PASS**.
- Browser suite: **21/21 PASS**.
- Desktop + 390px service composition: inspected and overflow-safe.
- Lighthouse: homepage 88, Presaira 97; all non-performance categories 100.

The homepage score movement from the Iteration 6 baseline of 96 triggered a deeper artifact comparison rather than copy removal or score chasing.

### What the artifacts showed

Across Iteration 6 and the initial Iteration 7 runs:

- production JavaScript request count stayed at **6**;
- JavaScript transfer stayed exactly **144,553 bytes**;
- the same six production script resources were present;
- intentional transfer growth was primarily richer server-rendered evidence copy and a small CSS increase;
- CLS stayed at approximately **0.011**;
- Lighthouse TBT/script-evaluation results varied substantially between runs, including runs with stronger CPU `benchmarkIndex` values.

A native-anchor-only experiment did not improve the noisy score, confirming that Next Link count alone was not the root cause.

The more important architectural finding was the whole-site `SmoothScroll` client boundary. Removing that unnecessary ownership made the client/server boundary scale correctly with richer content.

### Final validated runtime run

Runtime head: `20a03dc762b0b0bde6c1d6176751cc021f85b653`

- Application CI `34396268944`: **PASS**.
  - deterministic `npm ci`
  - TypeScript
  - ESLint
  - Next.js 16.3.4 production build
  - route smoke tests
- Rendered Browser QA `34396268923`: **PASS**.
- Browser suite: **21/21 PASS**.
- Final seven desktop axe artifacts: **0 violations**.
- Production `npm audit --omit=dev`: **0 vulnerabilities at every severity**.
- Homepage Lighthouse: **95 performance / 100 accessibility / 100 best practices / 100 SEO / 100 agentic browsing**.
- Homepage runner `benchmarkIndex`: **2416.5**.
- Homepage final TBT: **124 ms**.
- Homepage CLS: approximately **0.011**.
- Presaira Lighthouse: **99 / 100 / 100 / 100 / 100**.

This is close to the Iteration 6 homepage performance baseline while retaining all new service proof and conversion content. No evidence was removed to manufacture a score.

The two commits after the validated runtime head are documentation/status closure records only and do not alter runtime code, dependency state or test configuration.

## Locked Iteration 7 decisions

1. The governing path is `project → capability → relevant service → contact`.
2. Service evidence remains intentionally asymmetric.
3. Direct project/service relationships must come from the evidence registry; adjacent proof does not widen project claims.
4. Analytics/Power BI does not acquire fake Power BI proof from Presaira or Solar.
5. Migration confidentiality is preserved instead of visualized as fake enterprise evidence.
6. Provider-neutral conversion attributes are a durable future analytics contract.
7. Contextual email intent is the current primary service conversion mechanism.
8. A contact backend or `/services` route requires substantive evidence of value, not convention.
9. Recruiter and client journeys converge through evidence rather than an audience toggle.
10. Smooth-scroll enhancement remains a leaf client island; substantive site content must not be owned by it.
11. Lighthouse is a comparative lab signal. Behavioral QA, accessibility, progressive enhancement, payload evidence and real regressions outrank isolated score movement.

## What this iteration does not claim

- No production analytics provider/property is configured.
- No live conversion data exists yet.
- No client outcomes, revenue, user counts or conversion lifts are invented.
- No publishable Power BI screenshot has appeared.
- No confidential migration artifact has become public.
- No deployment of `m7mdehab.com` is claimed.

## Next autonomous stage

**Iteration 8 — Pre-launch Discoverability & Launch Readiness**

Move from portfolio construction toward publication readiness:

- synchronize final service/case-study claims with machine-readable identity/project surfaces;
- audit sitemap, robots, metadata and `/llms.txt` against the final public architecture;
- prepare deployment/environment contracts and launch checklist without claiming external account state;
- run direct T0 AI/search visibility checks where execution is available;
- prepare privacy-conscious analytics binding requirements for a later authorized provider/property;
- isolate truly external blockers: domain/DNS/runtime access, Search Console, Bing Webmaster and production analytics property access.

External setup is a launch boundary, not a reason to continue redesigning the site.