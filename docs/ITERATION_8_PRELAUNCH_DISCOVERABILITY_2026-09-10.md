# Iteration 8 — Pre-launch Discoverability & Launch Readiness

Date: 2026-09-10
Status: **ACTIVE — validation pending**
Branch: `iteration-8-prelaunch-discoverability`
Base: verified Iteration 7 merge `c3a0fc667d9b8c06181c8cdb2f322c1095316905`

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

No new visual concept phase is part of this iteration unless QA uncovers a real defect.

## Starting state

Iteration 7 was fully closed before this branch started:

- PR #3 squash merged to `main` at `c3a0fc667d9b8c06181c8cdb2f322c1095316905`;
- post-merge Application CI run `34418232760` passed deterministic install, typecheck, lint, Next production build and route smoke tests on that exact merge commit.

## Audit findings

### 1. Project canonical inheritance needed an explicit override

The root layout defines the homepage canonical. Project `generateMetadata` previously supplied only title and description, leaving nested metadata exposed to parent canonical inheritance semantics.

Fix: every `/work/<slug>` page now publishes its own absolute canonical and matching Open Graph URL.

### 2. Sitemap generated artificial freshness

`app/sitemap.ts` previously used `new Date()` for every URL on every build. That is not evidence that the page content changed.

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

`/llms.txt` is treated as auxiliary machine-readable context. It is not considered a substitute for semantic HTML, canonicals, structured data or normal crawl/indexing architecture.

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

### Sitemap

The sitemap contains exactly seven indexable HTML URLs:

- homepage;
- six project case studies.

Machine-readable support routes are intentionally omitted from the sitemap and remain directly crawlable.

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

`tests/iteration8.discoverability.spec.ts` adds regression coverage for:

1. homepage + six project self-canonicals;
2. project Open Graph URL parity;
3. ProfilePage/Person/service/project JSON-LD structure;
4. identity-equivalent `sameAs` links;
5. synchronized `/profile.json`, `/projects.json` and `/services.json`;
6. Presaira direct-service mapping without an Analytics/Power BI overclaim;
7. Analytics and migration evidence boundaries;
8. `/llms.txt` service/interpretation content;
9. seven-URL sitemap with no artificial `lastmod`;
10. crawlable robots + canonical sitemap advertisement.

The existing 21 browser tests remain part of the same full-suite gate; Iteration 8 adds six more tests rather than replacing older coverage.

## External blockers that do not prevent repository-side completion

- production hosting/runtime access;
- DNS and canonical-host configuration;
- Google Search Console ownership;
- Bing Webmaster Tools ownership;
- production analytics property/provider authorization;
- final consent/privacy configuration dependent on the selected provider and launch jurisdictions.

These must remain explicit blockers/checklist items rather than invented account state.

## Closure gate

Iteration 8 becomes complete when:

1. Application CI passes on the exact branch head;
2. Rendered Browser QA passes the full browser suite including Iteration 8 tests;
3. strict axe, mobile, reduced-motion and no-JS regressions remain green;
4. structured/machine-readable routes pass their new assertions;
5. documentation/status records the exact validated head;
6. the PR is squash merged;
7. push-triggered `main` CI passes on the resulting merge commit.

Repository-side closure does **not** imply the public launch has occurred.
