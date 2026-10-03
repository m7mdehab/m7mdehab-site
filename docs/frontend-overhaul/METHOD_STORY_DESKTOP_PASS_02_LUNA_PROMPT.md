Continue Method Story Desktop Pass 02 in:

m7mdehab/m7mdehab-site

BRANCH:
method-story-desktop-pass-02-setup

DRAFT PR:
#50

Do not start from main.
Do not redesign the section.
Do not rebuild the connector architecture.

READ FIRST:
1. AGENTS.md
2. docs/frontend-overhaul/METHOD_STORY_DESKTOP_PASS_02_EXECUTION.md
3. components/method-story-connector-geometry.ts
4. components/use-method-story-desktop-geometry.ts
5. components/method-story-desktop-connectors.tsx
6. components/method-story-canvas.tsx
7. app/method-story.css
8. tests/helpers/method-story-geometry.ts
9. tests/frontend-overhaul-phase-f.spec.ts

THE HEAVY WORK IS ALREADY DONE.

Already implemented:
- exact invisible source/destination edge ports;
- live DOM-measured geometry;
- 4 Messy→Expose connectors;
- 10 Expose→Reduce connectors;
- exact Reduce→Build connection;
- measured Build bus;
- 5 bus nodes aligned to outcome centers;
- 5 Build→Outcome connectors;
- measured desktop renderer integrated into MethodStoryCanvas;
- legacy connector system preserved for tablet/mobile;
- desktop one-line title/subtitle CSS;
- taller Reduce card;
- smaller/less-cramped Messy and Expose visuals;
- endpoint geometry test helpers;
- <=2px endpoint acceptance test.

YOUR JOB IS NOW:
1. run validation immediately;
2. fix any concrete compile/lint/test issue without changing the architecture;
3. render normal-motion 1440×1000 and 1920×1080;
4. visually tune only spacing, scale, centering, curve tension and contrast;
5. keep every measured endpoint test <=2px;
6. run Phase F, then the full browser suite;
7. finish PR #50 when all gates and visual review pass.

LOCKED:
- desktop only >=1100px;
- no mobile/tablet redesign;
- no APPPROACH eyebrow on desktop;
- title one line;
- support line one smaller line underneath;
- 4 / 10 / 1 / 5 connector counts;
- 5 build bus nodes;
- Reduce card tall and centered;
- Build system centered;
- animation fully resolved while the section is centered;
- no new dependencies;
- no GSAP;
- no hand-authored desktop endpoint coordinates.

If a connector misses:
fix the DOM port or visual geometry.
Do not manually fake the SVG endpoint.

Run:
npm ci
npm run typecheck
npm run lint
npm run build

Then Phase F and the full browser suite.

Final report:
- files changed
- commits
- validation
- 1440 findings
- 1920 findings
- maximum endpoint error
- remaining desktop defects
- whether PR #50 is ready
- confirm tablet/mobile unchanged.

Do not ask design questions unless the repository contains a real contradiction.
