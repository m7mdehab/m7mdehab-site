# Mobile Composition Pass 2 — 2026-09-27

**Status:** Local and remote validation complete; draft PR #26 is ready for overseer review.
**Branch:** `feat/mobile-composition-pass`  
**Pass 1 tip:** `9ff426ac572d793e18542d42ca1608ffe35cf89f`
**PR:** https://github.com/m7mdehab/m7mdehab-site/pull/26
**Deployment boundary:** staging only; no production deployment or merge.

## Composition and copy

- The mobile hero centers the canonical name on one line, all five role labels on one line, the Cairo/remote line, the proposition and the two compact CTAs. The nav keeps M7 left, the identity geometrically centered and Work right. Decorative hero numbering was removed.
- The credibility rail uses typographic wordmarks over one shared dark surface. The audit found 11 embedded WebP marks with inconsistent dimensions and transparency, including near-opaque white backing. No verified official transparent replacement set was available in the repository, so the home rail avoids those image defects with text wordmarks. Other routes retain their existing brand-logo treatment. Normal motion uses a duplicated 38-second mobile marquee and 42-second desktop rail; reduced motion makes the rail static and manually scrollable.
- Selected Work now uses the exact two-line heading, shortened introduction and one work-index CTA. The mobile card is 480px high. The OpportunityOS mobile card presents Discover, Ingest, Qualify, Score, Truth-lock and Prepare in a 3×2 grid; its authority and action modes stay horizontal. The complete project record and case-study visual remain intact.
- How I Work uses the requested concise introduction, four input rows, five output rows, SEE / REDUCE / BUILD tabs and one active mobile panel. The section is 787px high at 390px and ranges from 757px to 837px across 320–480px.
- Writing places evidence visuals before copy on mobile. Its featured card is 382px high at phone widths and its heading remains on one line.
- Opportunity paths use the requested role/project copy and three CTAs per path. The compact icon-only footer is approximately 191px high on mobile, with 44px social targets and the current-year copyright.
- Visible homepage copy was pruned without changing public project records, route destinations, service/writing data, schema, canonicals or machine-readable endpoints.

## Carousel behavior

Work and Writing share a 6000ms timer and circular active-dot progress. Dot selection, swipe/scroll and autoplay stay synchronized. Autoplay pauses during hover, focus, pointer/touch interaction, when the document is hidden or when a carousel is outside the viewport. Reduced-motion users get no autoplay and retain manual navigation. Controls are labelled by slide position and do not use a live region.

## Rendered QA

The production build was rendered at 320, 360, 375, 390, 412, 430, 480, 1440 and 1920px. No horizontal document overflow was found. Phone full-page heights range from 3129px to 3192px; at 390px the page is 3189px, with a 311px hero, 480px work card, 787px How I Work section, 382px Writing card and 191px footer. Desktop document heights are 4601px at 1440px and 5090px at 1920px. Screenshot files and viewport metrics are delivered in `outputs/mobile-composition-pass-2/`.

- `npm run build`: passed; English public routes statically generated.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run test:browser`: 109 passed against `next start`, including mobile widths, desktop regression, reduced motion, axe, carousel timing and pause, and OpportunityOS workflow-state visibility.
- `git diff --check`: run before commit.

The packet referenced five founder screenshots, but no screenshot image files were included in the accessible attachment set. Visual critique therefore used the written acceptance criteria and the newly rendered viewport and focused-card screenshots.

## Deployment verification

The PR application/rendered-QA, Cloudflare static-export/Vinext and workers.dev staging workflows passed. The staging root and `/work` returned HTTP 200, the response included `X-Robots-Tag: noindex`, and its canonical remained `https://m7mdehab.com`. The accepted staged revision is the pushed PR head; the PR remains a draft.

Production remains untouched.
