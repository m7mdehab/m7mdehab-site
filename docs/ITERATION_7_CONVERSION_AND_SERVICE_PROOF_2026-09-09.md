# Iteration 7 — Conversion Architecture & Service Proof

Date: 2026-09-09
Status: **ACTIVE — final confirmation gate**
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

## Iteration 7 implementation decisions

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

No tracking library, cookie system or third-party analytics script is introduced.

### 7. Do not create a thin `/services` route

The master plan says a dedicated service page should exist only when substantive content justifies it. The strengthened homepage service surface plus project/service bridges are currently the more coherent information architecture. A standalone `/services` route remains a future content-substance decision, not a conventional SEO checkbox.

### 8. Keep service conversion as contextual email intent for now

A first-party contact form is not justified in this iteration. Contextual `mailto:` intents are fast, provider-independent, work without JavaScript and avoid introducing spam handling, form persistence, personal-data storage or backend/runtime obligations without a clear user benefit.

This may be revisited after public launch if real conversion data shows that a form would materially reduce friction.

### 9. Preserve recruiter/client convergence rather than adding an audience switch

The site should not ask visitors to self-classify as "recruiter" or "client" before they can understand Mohammed's work. The same evidence should support both audiences naturally:

- projects establish proof;
- capabilities explain transferable competence;
- services make commercial relevance explicit where appropriate;
- experience remains available for employment context;
- contact remains a common low-friction action.

No audience-toggle gimmick is introduced.

## Test contract

`tests/iteration7.conversion.spec.ts` verifies:

- all four stable service anchors exist;
- the five capability rows resolve to relevant service anchors;
- service contact links are provider-neutral `mailto:` intents with subject context;
- Analytics exposes its Power BI evidence boundary;
- Migration exposes its public-visual confidentiality boundary;
- Presaira maps directly to ML/AI + Product/Web but **not** Analytics/Power BI;
- Makhbazy maps directly to Product/Web only;
- service proof/contact semantics remain available with JavaScript disabled.

`npm run test:browser` now runs the complete `tests` directory so the strict Iteration 6 regression suite and Iteration 7 conversion coverage execute together.

The rendered workflow is renamed from the iteration-specific `Iteration 6 Rendered QA` to **Rendered Browser QA**. Artifact names are also generalized. Lighthouse logging now includes the runner `benchmarkIndex` so performance-score variance can be interpreted against runner CPU capability instead of treated as an isolated score.

## Validation evidence

### First full Iteration 7 branch run

Validated code head: `4850e9c7154738f875aee49f0fed0019119b9074`

- Application CI run `34369348657`: **PASS**.
  - deterministic `npm ci`
  - TypeScript
  - ESLint
  - Next.js 16.3.4 production build
  - production-route smoke tests
- Rendered QA run `34369348645`: **PASS**.
- Browser suite: **21/21 PASS**.
  - 17 strict Iteration 6 regression tests
  - 4 Iteration 7 conversion/progressive-enhancement tests
- The successful desktop route suite preserves the strict policy where **any axe violation fails**.
- Desktop and 390px service composition were visually inspected from the uploaded artifact and remain readable, coherent and overflow-safe.
- Production dependency/security evidence continues to be captured with each rendered run.

### Lighthouse variance investigation

The first Iteration 7 run returned:

- homepage: **88 performance / 100 accessibility / 100 best practices / 100 SEO / 100 agentic browsing**
- Presaira: **97 / 100 / 100 / 100 / 100**

The homepage performance score was investigated against the final Iteration 6 strict artifact rather than accepted or optimized blindly.

Findings:

- Iteration 6 homepage performance score: **96**.
- Iteration 6 Lighthouse CPU `benchmarkIndex`: **2351.5**.
- Iteration 7 first-run `benchmarkIndex`: **1802.5**, about 23% lower/slower.
- JavaScript request count is unchanged at **6**.
- JavaScript transfer is byte-for-byte unchanged at **144,553 bytes** in both reports.
- The same production JavaScript chunk URLs/hashes are present in both artifacts.
- Intentional Iteration 7 transfer growth is mainly server-rendered evidence copy and CSS:
  - document transfer: about **16.4 KB → 20.8 KB**;
  - stylesheet transfer: about **11.2 KB → 11.7 KB**.
- CLS is unchanged at approximately **0.011**.
- The slower lab run spent substantially more time evaluating the same JavaScript chunks, consistent with the lower runner benchmark rather than a newly introduced client bundle.

Decision: **do not remove truthful service evidence or invent a client-side optimization solely to recover a noisy lab score.** The durable response is to log benchmark capability and use Lighthouse as a comparative signal, while continuing to gate actual browser behavior, accessibility, overflow, progressive enhancement and production correctness.

A second confirmation run on the generalized Browser QA workflow is the final validation gate before closure.

## Closure gate

Iteration 7 will be marked complete and merged when the latest branch head satisfies:

1. deterministic Application CI PASS;
2. generalized Rendered Browser QA PASS;
3. 21/21 browser/conversion tests remain green;
4. strict axe policy remains green;
5. no new mobile overflow or no-JS regression is observed;
6. final governance/status docs record the validated head and next iteration.

## What Iteration 7 deliberately does not claim

- No production analytics provider/property has been configured.
- No live conversion data exists yet.
- No client outcomes, revenue, user counts or conversion lifts are invented.
- No publishable Power BI screenshot has appeared.
- No confidential migration artifact has become public.
- No dedicated `/services` page is claimed necessary.
- No contact form/backend is added without evidence that it improves real conversion.
- No claim is made that `m7mdehab.com` is deployed.

## Next autonomous stage after closure

**Iteration 8 — pre-launch discoverability & launch readiness**

Priority should move from portfolio construction toward publication readiness:

- synchronize visible service/case-study claims with machine-readable identity/project surfaces;
- audit sitemap/robots/metadata/LLM surfaces against the now-final conversion architecture;
- prepare launch/deployment contracts and environment checklist without claiming external account state;
- run direct T0 AI/search visibility checks where execution is available;
- prepare privacy-conscious analytics binding requirements for whichever provider/property is later authorized;
- isolate truly external blockers: domain/DNS/runtime access, Search Console, Bing Webmaster and production analytics property access.

External setup remains a boundary, not a reason to continue redesigning the site.