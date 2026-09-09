# Iteration 6 — Rendered QA & Production Hardening

Date: 2026-09-09
Status: **COMPLETE**
PR: #2 — `iteration-6-production-hardening`
Validated code head before closure-only documentation: `c0d8df4142bf356ddc78a1ef7bc573dbcfff96b4`

## Objective

Turn the Iteration 5 clean-checkout baseline into a reproducible production-quality validation system, inspect the actual rendered website rather than reasoning only from source, correct observed defects, and leave the repository with deterministic dependency and browser/a11y/performance gates.

## Production hardening completed

- Upgraded Next.js from the earlier vulnerable 16.1.x baseline to **16.3.4**.
- Kept React / React DOM on the tested 19.2.3 baseline for this iteration rather than taking unrelated maintenance upgrades during the security fix.
- Pinned **ESLint 9.39.1** because the tested ESLint 10 path crashes inside the current Next.js bundled React lint plugin. This is an upstream compatibility boundary, not a reason to downgrade Next.js. Revisit when the Next lint stack supports ESLint 10 cleanly.
- Added and committed a real npm lockfile generated in GitHub Actions.
- Converted application and rendered-QA CI installs to deterministic `npm ci` using `package-lock.json`.
- Removed dependencies that were not part of the production implementation rather than preserving speculative surface area.
- Kept QA tooling explicit: Playwright, axe-core Playwright integration and Lighthouse.

## Rendered QA coverage

The final strict browser matrix runs against the production build in Chromium and covers:

1. desktop homepage;
2. desktop Presaira case study;
3. desktop OpportunityOS case study;
4. desktop Ghareeb Oglu case study;
5. desktop Oil Spill Detection case study;
6. desktop Solar Site Selection case study;
7. desktop Makhbazy case study;
8. the same seven surfaces at a 390 × 844 mobile viewport;
9. reduced-motion homepage behavior;
10. keyboard navigation including the skip link, primary section navigation and next-project navigation;
11. a JavaScript-disabled homepage to verify progressive enhancement and semantic content availability.

Each routed visual test also checks horizontal overflow and broken evidence images. Desktop routes receive axe analysis.

## Defects found and corrected from real rendering

### Narrow project-route overflow

The rendered mobile matrix exposed width assumptions in the fixed navigation and next-project treatment, most visibly on Presaira. The fix addressed the actual grid/text constraints instead of hiding overflow globally.

### Ghareeb heading semantics

The first artifact audit found one **moderate axe `heading-order` violation** in the Ghareeb evidence visual. `Browse to fulfillment.` was visually styled as display copy but implemented as an `h4`, creating a document-outline jump.

The element was changed to non-heading display text while preserving its visual treatment. The test policy was then strengthened: rendered QA now fails on **any axe violation**, not only serious/critical violations.

The strict final artifact contains **zero axe violations across all seven desktop reports**.

## Final validation evidence

### Application CI

Final code head `c0d8df4142bf356ddc78a1ef7bc573dbcfff96b4`:

- deterministic `npm ci` — PASS
- TypeScript typecheck — PASS
- ESLint — PASS
- Next.js 16.3.4 production build — PASS
- production-route HTTP smoke tests — PASS

GitHub Actions run: `34367220033`.

### Strict rendered QA

GitHub Actions run: `34367219961`
Job: `102519802220`
Artifact ID: `10110561590`
Artifact SHA256: `8c12149b2def25e75cb9ac6e7db82c28aedebfa7f0084e575a858d66c9971547`

Results:

- Playwright: **17 / 17 passed**
- axe: **0 violations** on homepage + all six desktop case-study routes
- mobile horizontal-overflow checks: PASS on homepage + all six case studies
- evidence-image loading checks: PASS
- reduced motion: PASS
- keyboard navigation: PASS
- JavaScript-disabled semantic homepage: PASS

### Lighthouse — final strict run

| Surface | Performance | Accessibility | Best practices | SEO | Agentic browsing |
|---|---:|---:|---:|---:|---:|
| Homepage | **96** | **100** | **100** | **100** | **100** |
| Presaira | **99** | **100** | **100** | **100** | **100** |

Lighthouse remains lab measurement and will naturally vary between runners. The purpose of these figures is the validated baseline, not a promise that every future run will reproduce the same integer score.

### Production dependency audit

The final artifact's `npm audit --omit=dev` result reports:

- info: 0
- low: 0
- moderate: 0
- high: 0
- critical: 0
- **total: 0**

`npm outdated` still identifies newer package versions, including major-version jumps. Those are maintenance signals rather than automatic upgrade requirements. In particular, ESLint 10 remains deliberately deferred until the tested Next lint-plugin compatibility boundary is resolved.

## Governance decisions locked by Iteration 6

- A committed lockfile is part of the production baseline.
- CI uses `npm ci`; dependency drift must not be silently accepted by clean-checkout validation.
- Browser validation must test the rendered production build, not only source syntax or component compilation.
- Important content must remain server-rendered and usable without JavaScript; animation is enhancement, not content ownership.
- Reduced motion is a first-class path.
- Mobile overflow must be corrected at the responsible component/layout; global clipping is not an acceptable concealment strategy.
- Axe artifacts are inspected, and the browser gate now treats **every** reported axe violation as a failure.
- Lighthouse is a lab regression signal, not a vanity-score optimization target.
- Production dependency security is explicitly checked and archived with rendered-QA artifacts.

## Explicitly not claimed

- No claim is made that `m7mdehab.com` is deployed from this repository merely because `main` is production-ready.
- No real-user Core Web Vitals/RUM claim is made; production RUM requires deployment and analytics access.
- No Google Search Console/Bing verification claim is made.
- No external anonymous-LLM visibility benchmark is claimed where direct execution/access is unavailable.

Those remain setup-dependent launch/growth operations rather than Iteration 6 engineering defects.

## Next autonomous iteration

**Iteration 7 — Conversion architecture & service proof.**

The next repository-level gap is no longer visual QA. It is converting the strong project/capability evidence into a deliberate visitor path:

`project → capability → relevant service → contact`

Iteration 7 should strengthen service proof and contact pathways without fabricating visual symmetry for confidential/low-public-evidence services, decide whether the homepage remains the right service surface or whether a substantive `/services` route is justified, and prepare privacy-conscious conversion instrumentation without depending on a live analytics account.
