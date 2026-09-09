# Iteration 4 — Evidence-Driven Project Visual Prototypes & Storytelling

Updated: 2026-09-09

## Status

**COMPLETE** for the repository-level prototype pass.

Iteration 4 replaces the one-size-fits-all abstract project visual with six evidence-specific treatments while keeping the existing strategic project order unchanged.

## Production decisions

| Project | Treatment | Evidence used | Publication behavior |
|---|---|---|---|
| Presaira | Plot / evolve | Committed 2026 reliability/calibration CSV + verified 104-match / 50k Monte Carlo proof | First-party SVG derived from committed values; no fake live odds |
| OpportunityOS | Trace / authorize | Public `ARCHITECTURE_CURRENT.md` flow, Truth Graph/EvidenceClaim and execution-mode model | Original explanatory architecture visual; explicitly not product UI |
| Ghareeb Oglu | Reveal / browse | Public live storefront existence + authorized end-to-end commerce role | Original public-safe commerce-flow treatment; explicitly not a screenshot; no isolated product/brand asset redistribution |
| Makhbazy | Sequence / progress | Authorized high-level journey and product-leadership facts | Original public-safe phone/journey abstraction; no internal screen bytes and no sole-coding implication |
| Oil Spill Detection | Compare / detect | Public Wakashio case-study figure + committed SegFormer test metrics | Real first-party repository image + oil-specific metrics |
| Solar Site Selection | Layer / rank | Public application screenshots + committed LSI validation map | Real first-party repository images, layered responsively |

## Selected-work rhythm

The strategic ranking remains:

1. Presaira
2. OpportunityOS
3. Ghareeb Oglu
4. Oil Spill Detection
5. Solar Site Selection
6. Makhbazy

Iteration 4 changes visual rhythm rather than strategic ranking. Rows now vary in scale, visual/copy order and evidence density, preventing six-card repetition without distorting project priority.

## Motion and interaction

No new animation dependency was added. The prototypes use CSS state transitions on hover/focus and remain fully meaningful when static:

- Presaira resolves a partially drawn calibration path and emphasizes real points.
- OpportunityOS increases authority/state legibility rather than animating agent particles.
- Ghareeb uses one restrained storefront-frame scale shift.
- Oil uses a small scan-line cue over the real case-study artifact.
- Solar separates the real evidence layers slightly.
- Makhbazy advances the phone/journey rhythm without reproducing internal UI.

`prefers-reduced-motion` removes choreography and shows the same proof immediately. Touch/mobile receives static evidence-first layouts rather than hover-dependent behavior.

## Accessibility / semantics

- Real evidence figures use semantic `figure` / `figcaption` structure.
- Presaira SVG has a title and description; each evidence point exposes its actual predicted/observed/sample values.
- Oil and Solar images carry descriptive alt text.
- OpportunityOS and Makhbazy conceptual treatments are explicitly labeled as diagrams/abstractions, not screenshots.
- No essential claim exists only inside animation.
- Project rows remain canonical links to case-study routes.

## Licensing / provenance

- Oil Spill Detection and Solar Site Selection repositories are MIT-licensed and owned by Mohammed; visual URLs are pinned to audited source commits for reproducibility.
- No reference-portfolio imagery or code was copied.
- Ghareeb and Makhbazy internal assets remain unpublished because internal access is not publication permission.
- Ghareeb's fallback is intentionally original rather than scraping or extracting product photography from the public store.

## Validation performed

Repository/source validation:

- Confirmed `main` started at Iteration 3 commit `2c765ede260976c113ac1f05d405b21e0adac624`.
- Re-read governing truth, evidence, design, IA, licensing and execution documents before implementation.
- Confirmed Oil Spill and Solar public asset paths and source commits.
- Confirmed Oil Spill selected-model metrics from `docs/results/segformer-mit-b2.json`.
- Confirmed Presaira reliability data from `web/public/methodology/reliability_2026.csv`.
- Confirmed OpportunityOS public flow and action-authority model from the public architecture mirror.
- Performed local TypeScript/TSX syntax transpilation on the authored source files.

## Checks not available in this environment

A full `npm install`, Next.js build, ESLint run, browser screenshot pass, Lighthouse/Core Web Vitals measurement and Playwright device matrix could not be executed because this session has GitHub API access but no authenticated/local repository checkout with installed project dependencies and no network path for cloning/installing packages.

These checks are **not** marked as passed. The code was kept dependency-neutral and uses existing platform/runtime capabilities so the first environment with a normal checkout can run:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
```

Then capture at minimum desktop, 390px mobile and reduced-motion screenshots before deployment.

## Remaining evidence gap (not an Iteration 4 blocker)

A true live Ghareeb storefront capture remains preferable to the current derived commerce-flow treatment once a reliable capture can be produced and its contextual asset usage is cleared. The current fallback is intentionally honest and does not manufacture visual proof.
