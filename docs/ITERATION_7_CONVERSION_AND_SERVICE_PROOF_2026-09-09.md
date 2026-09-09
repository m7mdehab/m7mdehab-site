# Iteration 7 — Conversion Architecture & Service Proof

Date: 2026-09-09
Status: **ACTIVE**
Branch: `iteration-7-conversion-and-service-proof`
Base: Iteration 6 merged `main` at `2911733d8afb9e0750a45b928448bf9633a41084`

## Objective

Turn the website's strong project and capability evidence into a deliberate, truthful conversion path:

`project → capability → relevant service → contact`

This is not a sales-funnel rewrite and not a request to make all services look equally visual. The conversion architecture must preserve the same truth, evidence, confidentiality and publication-rights boundaries that govern the project case studies.

## Governing source basis

The current project evidence registry already defines service-proof asymmetry:

- **Data migration & reconciliation** — strong experience evidence, weak public visual evidence. No publishable client migration artifact is currently available.
- **Analytics & Power BI** — strong experience/skills evidence, limited publishable artifact evidence. Presaira and Solar can support analytical thinking but must not be represented as Power BI proof.
- **ML & AI product development** — very strong public project evidence from Presaira, OpportunityOS, Oil Spill Detection and Solar Site Selection.
- **Product & web development** — very strong cross-project evidence. Project-level service support also includes OpportunityOS, while ownership wording remains project-specific.

No implementation may cosmetically fill the weaker evidence categories with fake screenshots, proprietary reconstructions or relabeled project visuals.

## Iteration 7 first-slice decisions

### 1. Keep the service model inside the existing runtime projection

`data/public.ts` remains the curated website runtime projection. The service entries are enriched with presentation/conversion metadata rather than creating a new truth registry.

Each primary service now carries:

- stable service ID;
- capability association;
- evidence statement;
- explicit proof-strength label;
- contextual project links where appropriate;
- a distinction between **related evidence projects** and **direct project-to-service support**;
- publication-boundary/context wording;
- provider-neutral contact intent/subject.

The authority remains `data/source-of-truth.public.yaml` + `data/project-evidence.public.yaml`.

### 2. Distinguish direct support from adjacent analytical proof

This distinction is important for Analytics & Power BI.

Presaira and Solar Site Selection may appear on the Analytics service card because they demonstrate analytical decision-making. They are explicitly labelled as **not Power BI artifacts** and do **not** cause those project case studies to claim Analytics & Power BI as a directly supported service.

The project-to-service bridge uses only the registry-backed direct support relationship.

### 3. Use stable semantic anchors, not client-only state

The homepage service section now has stable first-party IDs such as:

- `#service-data-migration-reconciliation`
- `#service-analytics-power-bi`
- `#service-ml-ai-product-development`
- `#service-product-web-development`

Capability rows link to their relevant service anchor. These anchors are server rendered and remain valid without JavaScript.

### 4. Make service proof legible

The service cards now expose:

- the capability domain;
- proof-strength classification;
- a concise evidence statement;
- relevant/adjacent project evidence where publication-safe;
- the reason evidence is intentionally limited where appropriate;
- a direct contact intent.

This replaces the previous four-card service section where every service had only a title and one generic outcome sentence.

### 5. Connect project case studies to only directly supported services

Case-study pages now derive a relevant-service bridge from the direct project/service relationship. The bridge appears before next-project navigation and offers:

- a link back to the precise service context on the homepage;
- a direct provider-neutral email intent for that service.

The bridge explicitly states that it does not widen the claims made in the case study.

### 6. Keep conversion instrumentation provider-neutral

Important links carry stable `data-conversion` and `data-service-id` attributes. This creates a future analytics contract without selecting or embedding an analytics provider during Iteration 7.

Examples:

- `capability-to-service`
- `service-to-project`
- `service-to-contact`
- `project-to-service`
- `project-service-to-contact`
- top-level contact channel intents

No tracking library, cookie system or third-party analytics script is introduced by this first slice.

### 7. Do not create a thin `/services` route yet

The master plan says a dedicated service page should exist only when substantive content justifies it. The current first slice deepens the homepage service surface and project links first. A standalone `/services` route remains a content-substance decision, not a conventional SEO checkbox.

## Test contract added

`tests/iteration7.conversion.spec.ts` verifies:

- all four stable service anchors exist;
- the five capability rows resolve to relevant service anchors;
- service contact links are provider-neutral `mailto:` intents with subject context;
- Analytics exposes its Power BI evidence boundary;
- Migration exposes its public-visual confidentiality boundary;
- Presaira maps directly to ML/AI + Product/Web but **not** Analytics/Power BI;
- Makhbazy maps directly to Product/Web only;
- service proof/contact semantics remain available with JavaScript disabled.

The browser script now runs the complete `tests` directory so Iteration 6 rendered/a11y regression coverage and Iteration 7 conversion coverage execute together.

## Validation status

Pending first PR CI/rendered-QA execution for this branch. No pass claim is made until the GitHub Actions runs complete.

## Remaining Iteration 7 work after the first slice

- inspect the rendered conversion/service composition at desktop and mobile sizes;
- verify strict axe remains at zero violations with the added service content;
- confirm the expanded service cards do not degrade homepage performance materially;
- audit link/copy hierarchy for recruiter vs client conversion without creating audience-switch gimmicks;
- decide whether service-specific contact messaging should remain direct email intent or use a future first-party contact form;
- decide from real content depth whether a `/services` route is justified;
- reconcile machine-readable service semantics if/when visible service content becomes rich enough to warrant an explicit public structured-data surface;
- update `docs/EXECUTION_STATUS.md` as the iteration progresses.
