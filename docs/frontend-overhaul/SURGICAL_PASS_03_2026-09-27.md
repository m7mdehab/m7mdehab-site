# Surgical Pass 03: First-Chapter Closeout

Date: 2026-09-27 | Branch: `feat/mobile-composition-pass` | Base: `d656fb32aa3d1d2584ff829da35dba0309159204` | Pull request: #26, open and draft

## Scope completed

- Kept the approved hero name, reveal, five roles, proposition, CTAs, desktop navigation, mobile dock, dark visual system and measured marquee architecture.
- Replaced the nine homepage relationship captions with titles from the public truth model:

| Organization                   | Visible title                             |
| ------------------------------ | ----------------------------------------- |
| Network International          | Data Engineer                             |
| Al Tayseer International       | Business Analyst Team Lead                |
| Orcas                          | Private Tutor · Computer Science & Data   |
| NARSS                          | Data / ML Intern                          |
| Zewail City                    | ML Intern                                 |
| Databricks                     | Certified Data Engineer Associate         |
| McKinsey Forward               | Foundation & Advanced                     |
| Canadian International College | BSc Computer Science · Data Science Major |
| ExploreAI / ALX                | Data Science & AI Scholarship             |

- Rebuilt `public/logos/network-international.png` from the already-present native blue/red mark and removed the white/invert/opacity treatment. The transparent asset and rendered desktop/mobile screenshots retain blue and red pixels; the browser check confirms `filter: none` and `opacity: 1`.
- Replaced the clipped pseudo-element tooltip with one React tooltip portaled to `document.body`. Its fixed position follows the pointer, clamps to viewport bounds, disappears on leave, and appears on focus. The tooltip is not inside the clipped marquee; duplicated items remain unfocusable.
- Removed the obsolete mobile `n + 9` visibility caps and old first-eight coordinate overrides. Mobile uses deterministic edge placements and displays 20 icons plus 6 small code/data fragments. Desktop displays 39 icons plus 14 code/data fragments, with the rail’s ambient layer kept especially faint.
- Added Bot, Boxes, Cable, ChartSpline, CloudCog, CircuitBoard, GitMerge, HardDrive and Layers to the used Lucide vocabulary. `JSON` and `RAG` join the existing deterministic text signals.
- Extended the decorative layer into the credibility band. Pointer response is limited to 12 hero elements; the rail continuation is static. Reduced-motion CSS disables all ambient and tooltip animation.
- Added measured breathing room without changing hero type scale or CTA styling.

## Rendered measurements

| Viewport | Metadata → name | Name → roles | Roles → proposition | Proposition → CTA | Document overflow |
| -------- | --------------: | -----------: | ------------------: | ----------------: | ----------------: |
| 390px    |            32px |         22px |                25px |              28px |               0px |
| 1440px   |           212px |         11px |                28px |              30px |               0px |

Ambient totals: 53 visible elements at desktop (39 icons, 14 code/data details); 26 at mobile (20 icons, 6 code/data details). The hero and rail layers are both `aria-hidden`, do not receive pointer events, and have no mobile pointer loop.

The nine captions remain single-line and share a baseline within 2px. Their item footprints widen to fit the longest verified titles while preserving the measured duplicated-group loop. At 1920px the logical group is 2,538px, giving an 84.6-second cycle at 30px/s. The live browser observed two complete `animationiteration` events at 84.6 and 169.2 seconds; the visible group coverage remained filled at both cycle boundaries.

## Verification

- `npm run typecheck`: pass.
- `npm run lint`: pass.
- `npm run build`: pass.
- `npm run test:browser`: **122/122 pass**.
- `npx playwright test tests/surgical-pass-03.spec.ts`: **4/4 pass**.
- All nine original source items show their matching hover name; pointer movement, body-level portal placement, viewport clamping, keyboard focus and leave behavior pass.
- Network image pixels confirm blue, red and transparent regions; computed filter and opacity remain native.
- Mobile/desktop caption widths and caption baselines pass. Ambient visible counts, rail continuation and reduced-motion behavior pass.
- The unchanged name reveal was observed in progress at 417ms and settled at 1,670ms.
- Full-page captures cover 320, 360, 390, 430, 480, 1440 and 1920px; the mobile dock remains fixed and non-overlapping. Full-browser, axe, reduced-motion and no-JavaScript checks pass in the complete suite.
- The marquee was observed through two full desktop cycles at 1920px; no seam or blank interval appeared.

## Evidence paths

Screenshots are in `outputs/hero-credibility-pass-03/`:

- `home-320.png`, `home-360.png`, `home-390.png`, `home-430.png`, `home-480.png`, `home-1440.png`, `home-1920.png`
- `name-reveal-in-progress.png`, `name-reveal-settled.png`
- `marquee-cycle-01.png`, `marquee-cycle-02.png`

## Cleanup and disposition

- Removed the white Network filter, pseudo-element tooltip, old mobile ambient cap and redundant fixed first-eight mobile positions.
- Verified the homepage/credibility rail contains no `View full background ↗` link.
- No later homepage section, carousel, opportunity block, footer or mobile dock implementation was changed.
- Known issues: none.
- Verdict: **READY FOR OVERSEER REVIEW**.
- PR #26 remains open and draft. No merge or production deployment was performed.
