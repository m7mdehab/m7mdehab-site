# Surgical Pass 05: Final Part 1 Interaction Polish

Date: 2026-09-28
Branch: `feat/mobile-composition-pass`
Reviewed base: `ed12ac988b3e0c3ec43cb7727e15824fe5e85185`

## Scope and changes

- Expanded the signature reveal clip to preserve the final script flourish. Mobile tracking is `-0.005em`, word spacing is `0.08em`, and the surname span gap is `0.08em`. The font, name, one-line rule, reveal, hero layout, roles, proposition and CTA remain unchanged.
- Enabled independent slow float paths on three of every four visible ambient items (75%). Mobile float amplitude and cycle duration are slightly smaller than desktop. Reduced motion explicitly disables all orbit animation.
- Replaced the transformed CSS marquee with a native horizontally scrollable three-group rail. A single requestAnimationFrame loop advances `scrollLeft`; it pauses for reduced motion, hidden/offscreen state, hover, focus and manual input. It recenters by one measured group when crossing either equivalent boundary. Touch scroll, desktop drag and horizontal wheel input remain usable, and tooltips still work on clones and the keyboard-accessible canonical items.
- Added a fractional-pixel accumulator because browsers round `scrollLeft` assignments to whole pixels. Without it, 52px/s accumulated as approximately 60px/s. With it, the measured mobile and desktop rates match the configured values.

No later homepage section was modified. Existing mobile navigation, rail copy, item geometry, Network source, CTA and hero spacing were preserved.

## Rendered measurements

### Signature

| Width | Font size | Letter spacing | Word spacing | Rendered width / container | Lines |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 320 | 35.84px | -0.1792px (`-0.005em`) | 2.8672px (`0.08em`) | 289.78 / 296px | 1 |
| 390 | 43.68px | -0.2184px (`-0.005em`) | 3.4944px (`0.08em`) | 353.19 / 366px | 1 |
| 430 | 48.16px | -0.2408px (`-0.005em`) | 3.8528px (`0.08em`) | 389.39 / 406px | 1 |

The full one-line check also passed at 360, 375, 412 and 480px. Reveal diagnostics compare the current expanded clip, legacy clip and no-clip version at 390 and 1440px.

### Credibility rail

| Width | Default / long item | Gap | Logo max | Stage | Caption | Speed | Equivalent items visible |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 320 | 160 / 180px | 9px | 114×29px | 40px | 8px | 52px/s | 1.89 |
| 390 | 160 / 180px | 9px | 114×29px | 40px | 8px | 52px/s | 2.28 |
| 430 | 160 / 180px | 9px | 114×29px | 40px | 8px | 52px/s | 2.50 |

Orcas and CIC use 180px to fit their factual captions without clipping. Other items use 160px. At 390px, measured `scrollLeft` was 1661 at t=0, 1923 at t=5.03s and 2185 at t=10.05s: +262px and +524px, respectively. Three additional unique relationships entered within ten seconds (NARSS, Zewail City and Databricks). Desktop remains 30px/s.

The three-group loop passed seam and recenter checks at 390, 1440 and 1920px. Tests confirmed pause/resume without resetting position, desktop hover/focus pause, mouse drag, horizontal wheel input, native mobile touch scrolling, tooltip behavior and resize/visibility handling.

### Network International

The selected source remains the repository-supplied, transparent native-color `logoAssets.network` WebP. At DPR 2 and both 390px and 1440px viewports it reports natural size **140×32px**, rendered size **70×16 CSS px**, source-to-CSS width ratio **2.0**, and matching source/rendered aspect ratio **4.375:1**. There is no stretching or enlargement above the source's 2× density. Crops are in the evidence directory.

## Verification

- `npm run typecheck` — PASS
- `npm run lint` — PASS
- `npm run build` — PASS (Next.js 16.3.4 production build)
- `npm run test:browser -- --reporter=line` — PASS, **134/134**

Evidence is in `outputs/hero-credibility-pass-05/`: `viewport-{320,360,390,430,480,1440,1920}.png`, `network-logo-{390,1440}-dpr2.png`, six ambient phase screenshots, three signature diagnostics at 390/1440, and `qa-metrics.json`.

PR #26 remains open. No merge or production deployment was performed.
