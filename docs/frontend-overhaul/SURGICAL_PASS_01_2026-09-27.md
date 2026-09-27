# Surgical Pass 01: Hero, Credibility Rail, and Mobile Navigation

Date: 2026-09-27
Branch: `feat/mobile-composition-pass`

## Scope

Updated the English homepage name reveal, nine-item credibility rail, mobile hero composition, existing ambient icons, and mobile navigation. Desktop navigation and all work, method, writing, opportunity, and footer sections retain their existing content and structure.

## Hero

- The desktop hero keeps its accepted type, copy, proposition, and actions. The full name now reveals as intact script text from left to right over 1.55 seconds and remains visible. Reduced motion displays it immediately.
- Mobile hero height is 90svh. Location, the single-line name, the five-role line, proposition, and current CTAs stay centered. Existing icon artwork appears in eight low-opacity positions around the copy.
- The name spans 88.4% of the viewport at 320px, 390px, and 430px. Role row font sizes at those widths are 6px, 7.02px, and 7.74px; all five role titles fit on one line. Proposition font sizes are 15px, 16.77px, and 18px, constrained to 31ch.

## Credibility image audit

All source images were checked for successful browser decoding and alpha transparency. Existing native assets remain in the `data/logo-assets-*.ts` maps. Network International needed a transparent derived file because its existing 140×32 WebP was effectively opaque and included a light background; its existing wordmark is now alpha-masked into `public/logos/network-international.png` and rendered in a light monochrome treatment for contrast.

| Relationship | Image source | Source dimensions | Transparent | Rail treatment |
| --- | --- | ---: | :---: | --- |
| Network International | `logo-assets-a.ts` `network`, transparent derivative at `public/logos/network-international.png` | 140×32 | Yes, derived | Wordmark only |
| Al Tayseer | `logo-assets-a.ts` `altayseer` | 73×46 | Yes | Emblem + Business analysis & reporting |
| Orcas | `logo-assets-a.ts` `orcas` | 143×34 | Yes | Logo + Computer science & data tutoring |
| NARSS | `logo-assets-a.ts` `narss` | 48×48 | Yes | Mark + Data & machine learning |
| Zewail City | `logo-assets-a.ts` `zewail` | 48×47 | Yes | Mark + Machine learning |
| Databricks | `logo-assets-b.ts` `databricks` | 38×50 | Yes | Mark + Data Engineer Associate |
| McKinsey Forward | `logo-assets-b.ts` `mckinsey` | 44×44 | Yes | Mark + Foundation & Advanced |
| Canadian International College | `logo-assets-b.ts` `cic` | 143×46 | Yes | Logo + BSc Computer Science · Data Science |
| ExploreAI / ALX | `logo-assets-b.ts` `exploreai` and `logo-assets-c.ts` `alx` | 109×50; 234×120 | Yes | Both marks + Data Science & AI Scholarship |

Each relationship uses only image marks and its descriptive title in the rail. Organization names remain in accessible labels and desktop hover titles, not as repeated visible copy. There are no logo cards, borders, or background panels. The rail auto-scrolls on desktop and mobile; reduced motion stops the marquee, removes its duplicate sequence, and leaves the first sequence manually browsable. The desktop pointer tooltip shows the organization name beside the hovered relationship. The only rail caption is `View full background ↗` to `/about`.

## Mobile navigation

The mobile top bar is replaced by a fixed 60px frosted dock, 96vw wide up to 540px, with M7, Work, About, Writing, and Contact. Each link keeps a 44px minimum tap target. Safe-area offsets and page-end padding keep the dock clear of the last content. Desktop navigation is unchanged.

## Rendered measures

| Viewport width | Hero height | Name size | Name width / viewport | Roles size | Proposition size | Visible icons | Document width |
| ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 320 | 759.6px | 42.56px | 88.4% | 6px | 15px | 8 | 320px |
| 360 | 759.6px | 47.88px | 88.4% | 6.48px | 15.48px | 8 | 360px |
| 375 | 759.6px | 49.875px | 88.4% | 6.75px | 16.125px | 8 | 375px |
| 390 | 759.6px | 51.87px | 88.4% | 7.02px | 16.77px | 8 | 390px |
| 412 | 759.6px | 54.796px | 88.4% | 7.416px | 17.716px | 8 | 412px |
| 430 | 759.6px | 57.19px | 88.4% | 7.74px | 18px | 8 | 430px |
| 480 | 759.6px | 63.84px | 88.8% | 8.5px | 18px | 8 | 480px |
| 1440 | 860px | 109.44px | — | 10px | 19.44px | 26 | 1440px |
| 1920 | 860px | 138.4px | — | 10px | 19.52px | 26 | 1920px |

Rendered screenshots and detailed viewport measurements are in the task output folder `outputs/hero-credibility-mobile-nav-pass-01/`.

## Validation

- `npm run typecheck`: PASS.
- `npm run lint`: PASS.
- `npm run build`: PASS.
- Focused hero/rail/navigation checks: 13/13 PASS.
- `npm run test:browser`: **113/113 PASS** (5.6 minutes), including desktop/mobile, reduced motion, axe, navigation, no-JavaScript, localization, and route coverage.
