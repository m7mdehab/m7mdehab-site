# Selected Work Pass — 2026-09-29

## Scope

Refined only the English homepage Selected Work presentation and the authorized mobile navigation safe-area clearance. The six `/work/<slug>` routes, canonical `/work` order, case-study content, first-chapter composition and later homepage sections remain unchanged.

Homepage presentation order: Presaira, OpportunityOS, Oil Spill Detection, Solar Site Selection, Ghareeb Oglu, Makhbazy. The presentation-only copy lives in `data/home-selected-work.ts`; canonical project data in `data/public.ts` is not reordered or rewritten.

The section now reads “Six projects. One standard.”, with “Each project opens to a full case study with inspectable evidence.” and the “View all work ↗” index link. Every card exposes “View case study ↗”. Desktop cards share one 590px-tall frame at 1440px. The evidence region stretches the full card height. Mobile cards cap at 360px wide and use a 174px visual stage with a fixed proof/caption stage. The active carousel indicator uses a stationary six-second conic progress ring, with a 32px mobile ring inside a 44px touch target; inactive marks have slightly stronger contrast.

Project card visuals keep their evidence-specific treatments. OpportunityOS presents six stages and title-case modes with a non-overlapping mobile authority row. Presaira keeps its calibration chart and proof labels. Oil Spill Detection keeps its real SAR imagery and metrics. Solar Site Selection uses the committed application imagery. Makhbazy keeps the four-stage phone journey.

## Ghareeb Oglu asset review

The only supplied logo source found is `logoAssets.ghareeb` in `data/logo-assets-b.ts`. It decodes as a 78×74 RGBA WebP, with alpha values 243–255 and no transparent pixels; its pale background is baked into the image. No separate vector or alternate higher-quality asset was present in the repository history. The homepage card therefore uses a plain text wordmark and does not show the opaque logo tile. The existing case-study logo rendering remains unchanged.

## Viewport measurements

Mobile measurements are from Chromium at DPR 1; document width equaled viewport width at every listed phone size. The 390px six-card pass measured all six project cards.

| Viewport | Card width | Card height | Evidence stage | Notes |
| --- | ---: | ---: | ---: | --- |
| 320 | 292px | 323.3px | 174px | Proof fits; no document overflow |
| 360 | 332px | 324.8px | 174px | Proof fits; no document overflow |
| 375 | 347px | 325.9px | 174px | Proof fits; no document overflow |
| 390 | 360px | 325.4–326.9px | 174px | Evidence occupies 53.2–53.5% of card height |
| 412 | 360px | 328.4px | 174px | Proof fits; no document overflow |
| 430 | 360px | 329.7px | 174px | Proof fits; no document overflow |
| 480 | 360px | 330.2px | 174px | Proof fits; no document overflow |

Section overflow checks and screenshots also cover 768, 900, 1024, 1280, 1440 and 1920px. At 1440px, cards measured 1390×590.4px; every project title fit in one line and the right copy panel shared the same card bounds. The fixed mobile dock now sits at `12px + safe-area inset`; document padding and anchor clearances account for the dock height.

## Test results

Fresh install from `package-lock.json` completed with 0 reported vulnerabilities. The local host provided Node v24.19.0; WebKit was not installed, so this was Chromium QA.

- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm run build` — PASS
- `npm run test:browser` — **140/140 PASS**
- `git diff --check` — PASS

The browser suite includes the full repository rendered/accessibility/localization gate plus Selected Work order/copy, all-six mobile and desktop card captures, phone-width containment, tablet/desktop geometry, proof fit, Ghareeb asset treatment, safe-area clearance and existing carousel behavior.

## Screenshot evidence

Evidence is saved to `outputs/selected-work-pass/`:

- `mobile-390-<slug>.png` and `desktop-1440-<slug>.png` for each of the six projects;
- `mobile-320-selected-work.png` and `mobile-430-selected-work.png`;
- `selected-work-768.png`, `selected-work-900.png`, `selected-work-1024.png`, `selected-work-1280.png`, `desktop-1440-section.png`, and `selected-work-1920.png`;
- `geometry.json` and `phone-widths.json` with rendered measurements.

The worktree base for this pass was `aabd3185ad62942b4151456550cecc3f47255782` on `feat/mobile-composition-pass`. PR #26 remains open; no merge or production deployment was performed.
