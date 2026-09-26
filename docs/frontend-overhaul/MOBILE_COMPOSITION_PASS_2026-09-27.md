# Mobile Composition Pass — 2026-09-27

**Status:** IMPLEMENTED / AWAITING OVERSEER REVIEW  
**Branch:** `feat/mobile-composition-pass`  
**Baseline:** `main` at `be77f82d5b4037753f690e78806e3723144a28cd`

## Interaction and layout changes

- The phone header keeps M7, shows a textual Mohammed identity and a 44px Work action. Safe-area gutters, section scroll offsets, readable type and reduced decorative motion are scoped to phone widths.
- Selected work keeps the shared `data/public.ts` project model. Phones browse six evidence cards with native horizontal snap, live active progress, keyboard buttons below the card and no autoplay; desktop retains its single-card presentation and active-only focus order.
- The existing SEE → REDUCE → BUILD method becomes a phone tab stepper. Writing previews use horizontal snap. Opportunity paths use Role / Hiring and Project / System tabs. All states remain in server-rendered markup and are exposed together when JavaScript is unavailable.
- The Ghareeb Oglu visualization uses shorter browser chrome and a compact four-stage strip. SAR evidence retains its comparison image and presents metrics in a compact 2×2 grid. Footer links remain complete with larger touch targets.

## Affected areas

`app/mobile-composition.css`, English homepage layout, floating navigation, selected-work gallery, method bridge, writing close, opportunity-path component, project-visual mobile rules, and `tests/mobile-composition.spec.ts`.

## Rendered QA

Browser coverage targets 320, 360, 375, 390, 412, 430 and 480px; landscape 844×390; desktop 1440 and 1920px. It checks document/child bounds, hero identity and actions, header identity, section offsets, project navigation, keyboard step/path selection, reduced motion and mobile axe. Full-page and focused screenshots are saved under `artifacts/mobile-composition/` during local QA.

- `npm run build`: passed; the Next.js production build statically generated the English routes.
- `npm run test:browser` with `BASE_URL=http://localhost:3000`: 105 passed against `next start`; axe found no mobile-home violations.
- `npm run typecheck` and `npm run lint`: passed. New and changed feature files were formatted with Prettier; the repository-wide formatter check reports existing style warnings in unrelated files.
- Automated document widths equal their viewport widths at every phone target; no visible child bounds escaped the viewport. At 320/390/430px the homepage height changed from 6433/6285/6251px to 5569/5070/4923px (13%/19%/21% shorter).
- Visual screenshots for 320, 390 and 430px mobile, selected work, method, writing, opportunity, footer, and 1440px desktop are in the task `outputs/mobile-composition/` folder.

Production deployment remains manual per `docs/DEPLOYMENT.md`; this branch is not a live-site acceptance or production launch.
