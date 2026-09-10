# Iteration 8 — Pre-launch Discoverability & Launch Readiness

Date: 2026-09-10
Status: **COMPLETE — repository scope**
Branch: `iteration-8-prelaunch-discoverability`
Base: verified Iteration 7 merge `c3a0fc667d9b8c06181c8cdb2f322c1095316905`
Validated runtime head: `990a686eff0bd278d6f20b64fcb8688d839c5840`

## Objective

Move the site from production-ready portfolio construction into publication readiness without pretending external deployment/account state already exists.

Iteration 8 focuses on:

- canonical and social metadata correctness;
- crawl/indexing surfaces;
- synchronization of visible services/projects with machine-readable resources;
- structured identity/project/service data;
- deployment/search/analytics launch contracts;
- a direct T0 visibility baseline;
- explicit separation of repository-controlled work from DNS, hosting, webmaster and analytics-account state.

No new visual concept phase was introduced because QA did not expose a visual defect requiring one.

## Starting state

Iteration 7 was fully closed before this branch started:

- PR #3 squash merged to `main` at `c3a0fc667d9b8c06181c8cdb2f322c1095316905`;
- post-merge Application CI run `34418232760` passed deterministic install, typecheck, lint, Next production build and route smoke tests on that exact merge commit.

## Audit findings and fixes

### 1. Project canonical inheritance needed an explicit override

The root layout defines the homepage canonical. Project `generateMetadata` previously supplied only title and description, leaving nested metadata exposed to parent canonical inheritance semantics.

Fix: every `/work/<slug>` page now publishes its own absolute canonical and matching Open Graph URL.

### 2. Sitemap generated artificial freshness

`app/sitemap.ts` previously used `new Date()` for every URL on every build. That is not evidence that page content changed.

Fix: `lastModified` is omitted until a trustworthy per-URL content-change timestamp exists. The sitemap contains only the homepage and six canonical project HTML routes.

### 3. Iteration 7 service architecture was not fully machine-readable

The visible service system had become materially richer than `/profile.json`, `/projects.json` and `/llms.txt`.

Fix: add a shared `data/discoverability.ts` projection and expose synchronized profile, project and service records without creating a new truth authority.

### 4. Structured identity conflated a product site with identity equivalence

The root Person `sameAs` previously included Presaira. Presaira is public project evidence, not an identity-equivalent profile URL.

Fix: Person `sameAs` now contains Mohammed's GitHub and LinkedIn only. Presaira and the other six flagship case studies are represented as project/CreativeWork records instead.

### 5. Social metadata claimed a large-card mode without an explicit social image

The root Twitter metadata previously requested `summary_large_image` without an intentional launch image.

Fix: use `summary` until a real social-card asset is intentionally created and validated.

## Implemented architecture

### `data/discoverability.ts`

A public-data-derived discoverability projection now centralizes:

- canonical case-study URLs;
- canonical service-anchor URLs;
- service proof/boundary records;
- direct vs adjacent project relationships;
- project records with direct service support;
- profile record with machine-readable resource links.

This projection is subordinate to `data/source-of-truth.public.yaml`, `data/project-evidence.public.yaml` and `data/public.ts`.

### Machine-readable routes

- `/profile.json` now includes public capabilities, skills, experience, education, service summaries and resource links.
- `/projects.json` now exposes canonical case-study URLs, public evidence URLs where available and directly supported services.
- `/services.json` is new and exposes the four governed services, proof strength, evidence boundaries, related project relationships and provider-neutral contact intent.
- `/llms.txt` now includes services, selected work, direct service support and interpretation boundaries.

`/llms.txt` is auxiliary machine-readable context. It is not a substitute for semantic HTML, canonicals, structured data or normal crawl/indexing architecture.

### Structured data

The root JSON-LD now uses an `@graph` containing:

- ProfilePage;
- Person;
- four service Offers/Services;
- six CreativeWork case-study records.

The graph preserves the same public truth/evidence boundaries as the visible site.

### Canonical metadata

Each case study now sets:

- absolute canonical URL;
- Open Graph URL matching that canonical;
- project-specific title and description;
- project-specific Twitter summary metadata.

The homepage canonical intentionally renders as `https://m7mdehab.com` without a trailing slash. The first Iteration 8 browser run caught a test that over-specified a trailing slash; production metadata was correct, so the assertion was corrected rather than changing the canonical policy to satisfy the test.

### Sitemap

The sitemap contains exactly seven indexable HTML URLs:

- homepage;
- six project case studies.

Machine-readable support routes are intentionally omitted from the sitemap and remain directly crawlable. Artificial build-time `lastmod` values are gone.

### Launch and measurement contracts

Added:

- `docs/LAUNCH_READINESS_CHECKLIST.md`
- `docs/ANALYTICS_BINDING_CONTRACT.md`

These keep repository readiness separate from external DNS/hosting/webmaster/analytics state and preserve the provider-neutral conversion semantics established in Iteration 7.

## T0 external visibility baseline — 2026-09-10

Direct web-search checks were run before launch-readiness closure.

Observed state:

- searches scoped to `m7mdehab.com` returned no indexed site result;
- exact domain/name queries did not surface the personal site;
- current searchable footprint is instead dominated by existing public traces such as Mohammed's public GitHub project presence and older handle/profile mentions;
- the execution environment's direct `curl` attempt could not resolve `m7mdehab.com`, so a live production origin could not be verified from this environment.

Interpretation:

- this is recorded as **T0/pre-launch external state**, not as an implementation regression;
- no claim is made that the domain is deployed, DNS-configured, indexed or verified in webmaster tools;
- Search Console, Bing Webmaster, DNS/runtime and production analytics property state remain external/setup-dependent until actual authorized access or public deployment evidence exists.

## Validation contract

`tests/iteration8.discoverability.spec.ts` adds six tests covering:

1. homepage + six project self-canonicals and project Open Graph URL parity;
2. ProfilePage/Person/service/project JSON-LD structure and identity-equivalent `sameAs` links;
3. synchronized `/profile.json`, `/projects.json` and `/services.json`, including direct-vs-adjacent evidence semantics;
4. `/llms.txt` service and interpretation boundaries;
5. seven-URL sitemap with no artificial `lastmod` or machine-readable support routes;
6. crawlable robots + canonical sitemap advertisement.

The existing 21 browser tests remain part of the same full-suite gate; Iteration 8 adds coverage rather than replacing older regression checks.

## Validation evidence

### Initial branch run

Branch head: `bc28a021007cedc5b3ecadfb5031138d44973d7b`

- Application CI `34418910958`: **PASS**.
- Rendered Browser QA `34418910972`: **FAIL — test assertion only**.
- Browser suite: **26/27 PASS**.
- Failure: homepage canonical test expected `https://m7mdehab.com/`; rendered production metadata correctly emitted `https://m7mdehab.com`.
- All five other Iteration 8 discoverability tests and all 21 inherited tests passed.
- No runtime metadata change was made for this failure; the over-specified test was corrected.

### Corrected exact runtime head

Validated head: `990a686eff0bd278d6f20b64fcb8688d839c5840`

- Application CI `34419171636`: **PASS**.
  - deterministic `npm ci`
  - TypeScript
  - ESLint
  - Next.js 16.3.4 production build
  - production-route smoke tests, including new `/services.json`
- Rendered Browser QA `34419171748`: **PASS**.
- Full browser suite: **27/27 PASS** in 52.6s.
- Seven desktop axe reports: **0 violations**.
- Production `npm audit --omit=dev`: **0 vulnerabilities at every severity**.
- Lighthouse on this runner:
  - homepage: **87 performance / 100 accessibility / 100 best practices / 100 SEO / 100 agentic browsing**; benchmarkIndex **1886.5**; TBT **326 ms**; CLS **0.01098**;
  - Presaira: **97 / 100 / 100 / 100 / 100**; benchmarkIndex **2657.5**; TBT **45 ms**; CLS **0.00718**.

The homepage performance score remains a comparative lab signal. Iteration 8 does not add a new client bundle or visual runtime system; its primary additions are server-rendered metadata/structured content and static machine-readable routes. The behavioral, accessibility, SEO and production correctness gates are green, so no useful discoverability content is removed merely to chase one runner-dependent score.

## External blockers that do not prevent repository-side completion

- production hosting/runtime access;
- DNS and canonical-host configuration;
- Google Search Console ownership;
- Bing Webmaster Tools ownership;
- production analytics property/provider authorization;
- final consent/privacy configuration dependent on the selected provider and launch jurisdictions.

These remain explicit setup-dependent items in `docs/LAUNCH_READINESS_CHECKLIST.md` rather than invented account state.

## Closure decision

Iteration 8 repository scope is complete. The validated runtime head satisfies:

- deterministic Application CI;
- full 27-test Rendered Browser QA;
- strict axe/mobile/reduced-motion/no-JS regression coverage;
- structured/machine-readable assertions;
- production dependency security audit;
- documented T0 external baseline and launch/account boundaries.

The commits after validated runtime head `990a686...` are documentation/status closure records only. PR #4 may be squash merged once those records pass the normal exact-head repository gates. Repository-side completion does **not** imply that the public launch, DNS configuration, webmaster verification or production analytics setup has occurred.
