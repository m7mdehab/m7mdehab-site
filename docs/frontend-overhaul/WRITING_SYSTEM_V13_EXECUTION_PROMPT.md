# Luna / Codex Execution Prompt — Writing System Refinement v1.3

Implement, render, validate and ship the v1.3 Writing refinement from the prepared branch `writing-system-v13-two-column-groundwork`.

This is not a fresh redesign. The v1.2 Writing system is already live and accepted. v1.3 changes only the section identity wrapping and phone browse density.

## 1. Read authority in this order

1. `AGENTS.md`
2. `docs/LOCALIZATION_POLICY.md`
3. `docs/frontend-overhaul/WRITING_SYSTEM_V13_REFINEMENT_2026-10-03.md`
4. `design/writing-system/writing-system.spec.json`
5. `design/writing-system/WRITING_SYSTEM_BLUEPRINT.html`
6. `docs/frontend-overhaul/WRITING_SYSTEM_VISUAL_QA.md`
7. `docs/frontend-overhaul/WRITING_SYSTEM_TEST_MATRIX.md`
8. `docs/frontend-overhaul/WRITING_SYSTEM_V12_EXECUTION_PROMPT.md` for unchanged v1.2 architecture

Where v1.3 conflicts with v1.2 on heading/subtitle wrapping, phone columns, phone title lines or phone metadata geometry, v1.3 wins. Everywhere else preserve v1.2.

## 2. Refresh repository state

- `git fetch --all --prune`
- inspect current `main`
- rebase/reconcile the prepared branch if `main` moved
- preserve unrelated accepted work
- do not restart from old groundwork branches

## 3. Prepared code already on the branch

Do not redo these from scratch:

- Home subtitle markup in `components/home-writing.tsx`
- archive subtitle markup in `components/writing-authority.tsx`
- decomposed timing markup in `components/writing-card.tsx`
- one-line desktop/mobile heading rules in `app/writing-system.css`
- two-column phone grid
- one-line phone title truncation
- stacked phone read/listen timing
- tighter phone SVG insets
- updated geometry tests

Treat them as the starting implementation and adjust only if rendered QA exposes a concrete defect.

## 4. Locked visible copy

Heading:

**What I’m thinking through.**

Subtitle:

**Ideas, experiments, and everything that piques my curiosity as I navigate my career.**

Home CTA remains:

**All writing ↗**

Do not restore the old Notes on AI sentence.

## 5. Heading / subtitle geometry

Home and `/writing`:

- heading is exactly one visible line at desktop and all accepted phone widths
- subtitle is exactly one visible line at desktop and all accepted phone widths
- no manual `<br>`
- no clipping or horizontal overflow
- preserve the full text

Phone typography target from the prepared CSS:

- heading roughly 25–34px responsive
- subtitle roughly 10–11.5px responsive

If the 320px render does not fit, tune font-size/letter-spacing slightly rather than allowing wrapping.

## 6. Grid contract

Desktop >=1120px: 3 columns.

Tablet 720–1119px: 2 columns.

Phone <720px: **2 columns**.

Phone:

- 12px column gap target
- ~24px row gap target
- keep 16:9 covers
- do not switch back to a one-column feed
- do not make the third current card span both columns
- do not center/stretch the orphan card

With the current 3 posts, row 2 contains the third card in the left cell. This is intentional.

## 7. Phone card contract

At <720px:

- card description remains hidden
- title is one visible line only
- visual overflow uses ellipsis
- full semantic title remains in the DOM/link accessible name
- no separate mobile-title data field

Do not shorten article titles in `data/writing.ts` just to fit.

## 8. Phone cover metadata

Bottom-left remains taxonomy.

Bottom-right keeps both effort measures, but stacks them vertically on phone:

- `9 min read`
- `~8 min listen`

Desktop/tablet keeps the one-line `9 min read · ~8 min listen` arrangement.

Metadata must remain inside the cover at 320, 390 and 430 with no scroll overflow.

Future long taxonomy labels may ellipsize; timing must remain fully legible.

## 9. Cover graphics

Because phone cards are smaller:

- forecast and agent SVGs must remain readable at 320px
- use the prepared tighter phone insets as the baseline
- preserve the real SAR image and current crop
- do not change evidence/content

## 10. Desktop preservation

Desktop v1.2 was accepted. Do not redesign it.

Only visible desktop changes should be:

- heading stays on one line
- compact subtitle appears below

Keep:

- 3-column grid
- current cover sizes
- 2-line maximum card titles
- 2-line maximum card descriptions
- in-cover metadata
- bottom-right All writing CTA

## 11. Archive

`/writing` uses the same 3/2/2 grid.

Archive header:

- eyebrow: Writing
- H1: What I’m thinking through.
- subtitle: Ideas, experiments, and everything that piques my curiosity as I navigate my career.

Heading and subtitle both one line.

## 12. Tests

Run the existing v1.2 suites plus the updated v1.3 geometry tests.

Mandatory assertions at 320 / 390 / 430:

- grid columns == 2
- document has no horizontal overflow
- heading height <= 1.1 line heights
- heading scrollWidth <= clientWidth + 1
- subtitle height <= 1.1 line heights
- subtitle scrollWidth <= clientWidth + 1
- card title height <= 1.15 line heights
- card descriptions display:none
- cover ratio approximately 16:9
- metadata entirely inside cover
- metadata scrollWidth <= clientWidth + 1

At >=720 preserve v1.2 title/excerpt constraints.

Do not weaken tests to make an overfull design pass.

## 13. Render matrix

Capture and inspect:

Home Writing:
- 1920×1080
- 1440×1000
- 1280×800
- 1024×768
- 430×932
- 390×844
- 320×568

Archive:
- 1440×1000
- 430×932
- 390×844
- 320×568

Full Home:
- 1920×1080
- 390×844
- 320×568

Do not accept based only on DOM tests.

## 14. Visual questions

Desktop:
- does the one-line heading still feel balanced rather than stretched?
- is the subtitle restrained enough not to compete?

Phone:
- does the section now scan like a compact visual index?
- are two cards per row still legible rather than merely miniature?
- are titles useful despite one-line ellipsis?
- is taxonomy readable?
- are read/listen timings readable?
- does the third-card orphan plus bottom-right CTA feel intentional?
- is total section height materially reduced?

If the two-column phone result is objectively worse at 320 only, do not silently revert to one column. Surface the 320-specific evidence and tune geometry first.

## 15. Scope protection

Do not change:

- article body layout
- Writing SEO/schema/audio architecture
- Selected Work
- Method
- Opportunity/contact
- Footer
- Hero
- credibility rail

Only touch data/SEO files if a test proves this presentation-only refinement requires it.

## 16. Validation

Run:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
CLOUDFLARE_STATIC_EXPORT=1 npm run build
npx playwright test tests/writing-visual-matrix.spec.ts
npx playwright test tests/mobile-composition.spec.ts
npx playwright test tests/frontend-overhaul-phase-g.spec.ts
npm run test:browser
git diff --check
```

Fix rendered defects in the same pass, then rerun affected tests.

## 17. Delivery

Follow `AGENTS.md` through PR, checks, merge, production deployment and live verification unless a genuine blocker exists.

Verify live:

- `/` desktop + phone
- `/writing` desktop + phone
- current article routes remain unchanged

## 18. Final report

Return:

- branch / base SHA
- files changed
- rendered corrections
- exact test/build results
- screenshot matrix reviewed
- feature commit SHA(s)
- PR
- merge/main SHA
- production workflow result
- live desktop/mobile verification
- genuine blocker if any

Do not return new design alternatives. Execute the prepared v1.3 prototype and judge it from the renders.