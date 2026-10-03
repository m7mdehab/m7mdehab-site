# Luna / Codex Final Execution Prompt — Writing System Refinement v1.2

Implement, validate, visually tune and ship the locked Writing System v1.2 refinement for `m7mdehab/m7mdehab-site`.

This is **not** a design exploration task. The product direction, visible copy, card hierarchy, mobile density, audio architecture and SEO/discovery behavior are already decided and partially implemented.

## 1. Correct branch / repository state

Primary working branch:

`writing-system-refinement-v12`

This branch was created from the then-current accepted `main` SHA:

`50e110b24eaba1366de037c3167e0a96578d496d`

Before doing anything:

1. `git fetch --all --prune`
2. inspect current `main`
3. if `main` moved, rebase/reconcile `writing-system-refinement-v12` onto the latest accepted `main` before final rendered QA
4. preserve unrelated accepted changes
5. do **not** use stale draft PR #25
6. do **not** use old `writing-system-groundwork` / PR #32 as the implementation base; it is superseded groundwork
7. read the local Next.js 16 docs required by `AGENTS.md` before changing metadata APIs

Do not rebuild the Writing system from scratch. The active implementation already exists on main and the v1.2 refinement code is already on this branch.

## 2. Read authority in this order

1. `AGENTS.md`
2. `docs/LOCALIZATION_POLICY.md`
3. `docs/frontend-overhaul/WRITING_SYSTEM_REFINEMENT_2026-10-03.md`
4. `design/writing-system/writing-system.spec.json`
5. `design/writing-system/WRITING_SYSTEM_BLUEPRINT.html`
6. `docs/frontend-overhaul/WRITING_SYSTEM_VISUAL_QA.md`
7. `docs/frontend-overhaul/WRITING_SYSTEM_TEST_MATRIX.md`
8. this execution prompt

Older Writing execution/integration documents remain historical architecture context only. Where they conflict with the v1.2 refinement, **v1.2 wins**.

## 3. What is already implemented on the branch

Do not redo these unless tests expose a concrete defect.

### Data

`data/writing.ts` already has:

- optional `cardDescription`
- required `listenMinutes`
- optional real audio:
  ```ts
  audio?: {
    src: string;
    mimeType: string;
    durationSeconds: number;
  }
  ```
- current concise card copy:
  - forecast: `A practical test for knowing when a probabilistic forecast deserves trust.`
  - oil: `Why rare oil pixels make accuracy a weak headline metric.`
  - AI agent: `How agents should handle missing evidence without inventing certainty.`
- current listen estimates:
  - forecast: 9 min read / ~8 min listen
  - oil: 8 min read / ~8 min listen
  - AI agent: 9 min read / ~8 min listen

The three existing slugs, article bodies, project relationships and evidence claims are unchanged.

### Home

`components/home-writing.tsx` already uses:

- H2: **What I’m thinking through.**
- no explanatory lede
- existing 3/2/1 grid
- `All writing ↗` after the grid at bottom-right

### Cards

`components/writing-card.tsx` already uses:

1. cover
2. metadata **inside cover bottom edge**
3. title
4. concise card description

Bottom-left:
- category + first topic

Bottom-right:
- read time + listen time
- estimated listen time has `~` while no real audio exists

### Covers

`components/writing-cover.tsx` already removes the redundant top taxonomy labels.

`app/writing-system.css` already:

- adds the dark bottom metadata gradient
- hard-clamps card titles to 2 lines
- clamps desktop/tablet descriptions to 2 lines
- hides card descriptions below 720px
- tightens mobile gaps
- crops/zooms the SAR visual
- preserves reduced-motion behavior

### Archive / article

`components/writing-authority.tsx` already:

- keeps archive eyebrow `Writing`
- changes visible H1 to **What I’m thinking through.**
- removes archive lede
- shows read + listen timing on article pages
- conditionally inserts a Listen block before the article cover

`components/writing-listen.tsx` already:

- renders only when a real `article.audio` exists
- uses native `<audio controls preload="metadata">`
- never autoplays

### Schema / discovery

`data/writing-schema.ts` already centralizes:

- `BlogPosting`
- `timeRequired`
- conditional project `about`
- conditional citations
- conditional stable image
- conditional `AudioObject` only when real audio exists

`/writing.json` and `data/discoverability.ts` already expose:

- cardDescription
- readingMinutes
- listenMinutes
- real audio metadata only when it exists

## 4. Locked visible result

### Home

- section id remains `writing`
- H2: **What I’m thinking through.**
- no supporting lede/subtitle
- current three posts render
- future Home maximum stays six via `homeRank`
- 3 columns desktop, 2 tablet, 1 mobile
- `All writing ↗` is **after the grid, bottom-right**
- no Writing carousel, dots, autoplay, swipe rail or placeholders

### Archive

- route remains `/writing`
- eyebrow: `Writing`
- H1: **What I’m thinking through.**
- no archive lede
- same shared card grammar
- all and only published posts
- no filters/search/category navigation yet

## 5. Card contract

### Cover

- 16:9
- taxonomy/timing overlay inside the bottom edge
- dedicated dark gradient for contrast
- no duplicated top-left taxonomy label

### Bottom-left

Examples:

- `DATA · FORECASTING`
- `DATA · COMPUTER VISION`
- `AI · AI AGENTS`

### Bottom-right

Examples:

- `9 MIN READ · ~8 MIN LISTEN`
- `8 MIN READ · ~8 MIN LISTEN`

When a real audio file exists, remove only the estimate marker:

- `9 MIN READ · 8 MIN LISTEN`

### Title

**Hard maximum: two visible lines at every viewport.**

No exceptions.

Do not:

- shorten semantic title text
- insert manual line breaks
- hide title words
- allow a third line

Use the existing line-clamp implementation. If a real render still exceeds two lines, fix typography/geometry rather than content.

### Description

Desktop/tablet:
- concise `cardDescription`
- maximum two visible lines

Mobile below 720px:
- hidden completely
- thumbnail + metadata + two-line title form the entire browse unit

Do not restore mobile descriptions without a new explicit decision.

## 6. Heading / CTA hierarchy

Do not restore:

- `Writing.` as the visible Home/archive headline
- `Notes on AI, technology, work, projects, and whatever else I’m thinking through.` as visible section copy
- header-level `All writing`

The route/nav taxonomy can still be called **Writing**.

The visible editorial identity is:

**What I’m thinking through.**

## 7. SAR cover acceptance

The real public-safe SAR evidence remains the image.

The baked-in technical strip at the extreme top must no longer compete with the card UI.

Current CSS uses a modest crop/scale. During rendered QA:

- verify the source strip is visually suppressed/cropped enough
- keep meaningful imagery
- do not fabricate new annotations
- do not replace the real evidence image with decorative stock art

## 8. Audio contract

Every published article has `listenMinutes`.

A real audio asset is optional.

### No real audio

- card shows `~X min listen`
- article shows no player
- JSON-LD has no `AudioObject`
- article text remains fully available

### Real audio

- card removes `~`
- article renders the prepared Listen block near the top before the cover
- native controls
- `preload="metadata"`
- no autoplay
- JSON-LD adds `AudioObject` with canonical contentUrl, MIME type and duration

Do not use browser speech synthesis as a substitute for authored narration.

Do not add a fake/disabled player just to demonstrate future functionality.

## 9. Files already changed by the refinement

Inspect and preserve the intended changes in:

- `data/writing.ts`
- `data/writing-schema.ts`
- `components/home-writing.tsx`
- `components/writing-card.tsx`
- `components/writing-cover.tsx`
- `components/writing-authority.tsx`
- `components/writing-authority.module.css`
- `components/writing-listen.tsx`
- `app/writing-system.css`
- `app/(en)/writing/page.tsx`
- `app/(en)/writing/[slug]/page.tsx`
- `app/writing.json/route.ts`
- `data/discoverability.ts`
- relevant Writing/browser tests
- v1.2 design/QA docs

Do not rename components merely for aesthetics.

## 10. Test work already prepared

The branch already includes or updates:

- `tests/writing-schema.spec.ts`
- `tests/writing-independent-fixture.spec.ts`
- `tests/writing-visual-matrix.spec.ts`
- `tests/iteration12.writing-authority.spec.ts`
- `tests/iteration8.discoverability.spec.ts`
- `tests/frontend-overhaul-phase-g.spec.ts`
- `tests/mobile-composition.spec.ts`

First run them. Fix implementation defects rather than weakening assertions.

## 11. Required automated validation

Run in this order:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
CLOUDFLARE_STATIC_EXPORT=1 npm run build
```

Then focused tests:

```bash
npx playwright test tests/writing-schema.spec.ts
npx playwright test tests/writing-independent-fixture.spec.ts
npx playwright test tests/iteration12.writing-authority.spec.ts
npx playwright test tests/iteration8.discoverability.spec.ts
npx playwright test tests/frontend-overhaul-phase-g.spec.ts
npx playwright test tests/mobile-composition.spec.ts
npx playwright test tests/writing-visual-matrix.spec.ts
```

Then:

```bash
npm run test:browser
git diff --check
```

If repository conventions require `BASE_URL` against a production/dev server, use the established repository command rather than changing tests to avoid it.

## 12. Mandatory geometry assertions

At desktop and mobile verify:

- metadata overlay remains entirely inside cover bounds
- no old metadata row exists beneath the cover
- no old top taxonomy labels exist
- title rendered height <= 2.1 × computed line-height
- read and listen labels are both present
- CTA is vertically below the final card row

Desktop/tablet:
- excerpt rendered height <= 2.1 × computed line-height

Mobile:
- excerpt computes to `display: none`
- grid is one column
- no horizontal overflow
- cards remain normal vertical document flow

## 13. Rendered QA matrix

Capture and inspect:

### Home Writing

- 1920×1080
- 1440×1000
- 1280×800
- 1024×768
- 430×932
- 390×844
- 320×568

### Archive

- 1440×1000
- 390×844

### Article

- 1440×1000
- 390×844

### Full Home

- 1920×1080
- 390×844

Do **not** treat passing DOM tests as visual acceptance.

Review against `WRITING_SYSTEM_VISUAL_QA.md`.

## 14. Visual questions that must be answered

### Desktop

- Does the section still feel calm, editorial and premium?
- Do all three cards read as one system without becoming SaaS boxes?
- Does the personal heading have enough personality without becoming theatrical?
- Are the covers still the primary scan target?
- Are read/listen labels legible but subordinate?
- Is the bottom CTA obvious without dominating?

### Mobile

- Does it now scan like a compact publication feed rather than three long article previews?
- Is the heading materially less dominant than the v1.0 screenshot?
- Are descriptions actually gone?
- Do titles stay at two lines?
- Is the inter-card rhythm tight without cards visually colliding?
- Is the metadata legible at 320/390/430?
- Is the total section materially shorter than the previous screenshot?

## 15. Rejection conditions

Reject/fix before merge if any are true:

- visible Home/archive headline is still only `Writing.`
- old visible explanatory lede returns
- CTA is in the header
- taxonomy/timing remains below the cover
- any old top cover label remains
- any title reaches three lines
- mobile descriptions remain visible
- read or listen time is missing
- fake audio player appears without an audio asset
- SAR source header visibly competes
- mobile remains excessively tall
- overlay text lacks reliable contrast
- cards become boxed SaaS panels
- Writing carousel/swipe/dots return
- independent writing again requires project/evidence fields
- current article URLs change
- dormant Arabic Writing routes are republished
- tests are weakened to accommodate a defect
- screenshots are not inspected

## 16. Scope boundary

Do not redesign:

- Selected Work
- Method
- Opportunity/contact
- Footer
- Hero
- credibility rail

Only touch shared styles/tests where the Writing refinement genuinely requires it, and verify no regression.

## 17. Documentation

After final visual acceptance:

- update `docs/EXECUTION_STATUS.md`
- preserve historical v1.0 decisions as history, but mark v1.2 as superseding visible presentation
- keep `AGENTS.md` pointed to the v1.2 authority
- do not resurrect stale pre-activation scaffold instructions

## 18. PR / delivery cleanup

The old draft groundwork PR #32 is obsolete as an implementation vehicle.

Once this refinement branch has its own valid PR:

- close/archive PR #32 with a note pointing to the v1.2 refinement PR
- do not merge PR #32

For the v1.2 branch:

1. make coherent commits
2. push
3. open/update PR against latest `main`
4. wait for required checks
5. fix any CI/rendered-QA failures
6. merge only after rendered acceptance
7. allow production workflow
8. verify live routes

## 19. Live verification

After deployment verify:

- `/`
- `/writing`
- all three current article routes
- `/writing.json`
- `/profile.json`
- `/llms.txt`
- sitemap

Verify the actual live Home section at desktop and mobile, not only HTTP status.

## 20. Final report

Return only after execution reaches a real stopping point.

Report:

- working branch
- base/main SHA
- files changed
- data/audio architecture status
- exact typecheck/lint/build results
- focused test results
- full browser-suite result
- screenshot matrix reviewed
- any visual corrections made after screenshots
- feature commit SHA(s)
- PR number
- CI/check status
- merge SHA if merged
- deployment workflow result if deployed
- live verification status
- genuine blocker, if one remains

Do not return with new design alternatives. Execute and validate the locked v1.2 system.
