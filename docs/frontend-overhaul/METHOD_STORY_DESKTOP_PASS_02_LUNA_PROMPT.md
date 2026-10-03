Continue the Method Story desktop precision pass in:

m7mdehab/m7mdehab-site

WORKING BRANCH:
method-story-desktop-pass-02-setup

Do not start from main.
Do not redesign the section.
Do not redo the geometry work already prepared.

READ FIRST:
1. AGENTS.md
2. docs/frontend-overhaul/METHOD_STORY_DESKTOP_PASS_02_EXECUTION.md
3. components/method-story-connector-geometry.ts
4. components/use-method-story-desktop-geometry.ts
5. components/method-story-desktop-connectors.tsx
6. components/method-story-canvas.tsx
7. app/method-story.css
8. tests/frontend-overhaul-phase-f.spec.ts

The heavy setup is already done.

Your job is now:
- integrate the prepared measured desktop connector system into MethodStoryCanvas;
- keep the legacy connector SVG only for tablet/mobile;
- hide the legacy CSS build bus on desktop once the measured bus is active;
- visually tune the prepared desktop CSS;
- add the final measured-endpoint Playwright assertions;
- render and review 1440×1000 and 1920×1080;
- validate and open/finish the PR.

LOCKED REQUIREMENTS:
- desktop only: >=1100px;
- APPPROACH eyebrow hidden on desktop;
- title one line;
- support one smaller line directly below;
- exactly 4 Messy→Expose paths;
- exactly 10 Expose→Reduce paths;
- exactly 1 Reduce→Build path;
- exactly 5 Build→Outcome paths;
- exactly 5 build bus nodes;
- every path endpoint must physically touch the actual DOM edge it targets;
- endpoint tolerance <=2px;
- Reduce card taller and centered;
- Build system centered;
- animation fully resolved while the section is centered in the viewport;
- no mobile/tablet redesign.

IMPORTANT:
Do not replace the measured geometry system with hand-authored SVG path coordinates.
Do not install anything.
Do not add GSAP.
Do not ask design questions unless the execution packet contains a genuine contradiction.

Run:
npm ci
npm run typecheck
npm run lint
npm run build

Then run Phase F and the full browser suite.

Before finishing, report:
- files changed
- commit SHAs
- validation results
- 1440/1920 screenshot findings
- maximum measured endpoint error in px
- remaining desktop defects
- whether ready to merge
- confirmation that mobile/tablet were not redesigned.
