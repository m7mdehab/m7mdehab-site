# Surgical Pass 02: Hero Spacing and Continuous Credibility Rail

Date: 2026-09-27
Branch: `feat/mobile-composition-pass`
Base: `9d03bc76b0d689cca19047200de9c3e850a0a761`

## Scope completed

- Kept the accepted hero typography, role sequence, value proposition, CTAs, desktop navigation, mobile dock, ambient field, and name reveal.
- Removed the `View full background ↗` rail link.
- Added one shared invisible logo stage and caption stage for every relationship item. Captions remain on one line at a fixed baseline; source images keep their natural aspect ratio and stay inside the logo stage.
- Implemented a ResizeObserver-measured, duplicated marquee pair. The source set is repeated only as needed to exceed 1.25× the viewport, and the animation translates by the measured first-group width at a constant 30 CSS px/s.
- Replaced the mobile 90svh hero plus 84px spacer with a content-led composition. The rail directly follows the dark hero and meets the light Work section.
- Preserved reduced-motion behavior as one static, manually scrollable source group.

## Rendered measurements

| Viewport | Item width | Source repeats per group | Logical group width | Duration at 30px/s |
| --- | ---: | ---: | ---: | ---: |
| 390px mobile | 171.6px | 1 | 1,688.34px | 56.28s |
| 1440px desktop | 190px | 1 | 1,998px | 66.60s |
| 1920px desktop | 240px | 1 | 2,448px | 81.60s |

The source set contains nine items. Both rendered groups are structurally identical, including their assets, item order, widths, and inter-item seam spacing.

| Geometry | Desktop | Mobile |
| --- | ---: | ---: |
| Logo stage height | 56px | 46px |
| Maximum logo image height | 42px | 36px |
| Stage-to-caption gap | 12px | 10px |
| Caption font size / line height | 10px / 12px | 9px / 11px |
| Rail total height | 112px | 103px |

At 844px mobile height, location metadata starts at 13svh (about 110px). The CTA-to-rail gap is 52px. The hero and rail share the same dark background, and the light Work section begins at the rail’s bottom edge.

## Verification

- `npm run typecheck`: pass.
- `npm run lint`: pass.
- `npm run build`: pass.
- `npm run test:browser`: **118/118 pass**.
- Caption stages align within 2px, stay at one line, and leave at least 10px between the logo stage and caption. Logo image boxes remain inside their shared stages.
- Coverage is tested at 390, 1440, and 1920px at 0%, 25%, 50%, 75%, and 99% animation positions. The maximum blank interval remains no more than twice the normal item gap.
- Mobile spacing, rail height, transition into Work, reduced motion, and horizontal overflow are tested at the requested widths.
- Real-time visual observation completed two cycles at 390px (2 × 56.28s) and two at 1920px (2 × 81.60s), sampling 0%, 25%, 50%, 75%, and 99% each cycle. No empty segment or visible reset appeared.
- Full-page screenshots for 320, 360, 390, 430, 480, 1440, and 1920px are in the local workspace output folder `outputs/hero-credibility-pass-02/`. Live loop samples are in `outputs/hero-credibility-pass-02/live-loop/`. These QA images are local artifacts and are not committed.

## Deployment

No deployment was performed. The existing draft PR remains the review surface.
