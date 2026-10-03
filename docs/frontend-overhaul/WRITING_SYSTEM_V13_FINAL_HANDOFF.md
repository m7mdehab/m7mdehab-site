# Writing v1.3 — Final Narrow Handoff

**Branch:** `writing-system-v13-two-column-groundwork`  
**Base:** current `main` at handoff time  
**PR:** #52 (draft until rendered acceptance)

## Locked copy

Do not rewrite this.

Heading:

**What I’m thinking through.**

Subtitle:

**Ideas, experiments, and everything that piques my curiosity as I navigate my career.**

The subtitle uses **navigate**, not **venture**. “Navigate my career” is the natural idiom for progressing through choices, uncertainty and change. “Venture through my career” is understandable but less idiomatic; *venture* more naturally takes forms such as “venture into”, “venture out” or “venture beyond”.

Canonical runtime source:

`data/writing.ts -> writingSectionCopy`

Both Home and /writing already consume this shared source.

## What is already done

Implementation is already scaffolded:

- one-line Home/archive heading;
- exact one-line subtitle;
- desktop 3-column Writing grid unchanged;
- tablet 2-column grid;
- phone 2-column grid;
- phone card descriptions hidden;
- phone card titles constrained to one visual line with ellipsis;
- full title preserved in DOM/accessibility;
- taxonomy remains inside cover bottom-left;
- read/listen timing remains inside cover bottom-right;
- phone read/listen timing stacks into two lines;
- tighter phone forecast/agent SVG insets;
- 12px phone section gutters and 12px card gap;
- odd final card remains left-aligned in normal grid flow;
- All writing stays after the grid at bottom-right;
- v1.3 tests and design contracts are already updated.

Do not rebuild any of this.

## Your job

Start with QA, not implementation.

1. refresh/rebase branch only if main moved;
2. run focused v1.3 tests;
3. render Home Writing at 430, 390 and 320;
4. inspect heading, subtitle, card legibility, metadata, orphan-card balance and overflow;
5. if something is visually wrong, tune **only `app/writing-system.css` first**;
6. rerun focused tests;
7. run full browser/build regression;
8. merge and ship through the normal repository workflow;
9. verify live Home and /writing on desktop + phone.

## Do not change

Unless a concrete test/render defect proves it is required, do not touch:

- subtitle copy;
- `data/writing.ts` article records;
- schema/SEO/audio architecture;
- card data model;
- article routes;
- article-body layout;
- Selected Work;
- Method;
- Opportunity/contact;
- Footer;
- Hero;
- credibility rail.

Do not switch mobile back to one column.

Do not let phone card titles return to two lines.

Do not wrap the heading or subtitle.

## Acceptance at 320 / 390 / 430

Must all pass:

- Writing grid = 2 columns;
- no document horizontal overflow;
- heading = one visual line;
- subtitle = one visual line;
- subtitle fully visible, not clipped;
- card title = one visual line;
- descriptions = hidden;
- cover ratio ≈ 16:9;
- metadata fully inside cover;
- read + listen both legible;
- forecast/agent graphic still readable;
- third current card remains in left cell of row two.

The 320px subtitle is intentionally compact. If it feels unreadable in the screenshot, tune typography/gutters first; do not wrap it and do not alter the copy.

## Required validation

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

## Final report

Return only after a real stopping point.

Report:
- final branch/head;
- any CSS corrections made after screenshots;
- focused + full test results;
- screenshot matrix reviewed;
- PR/check status;
- merge SHA;
- production deployment result;
- live Home and /writing desktop/mobile verification;
- blocker only if genuine.
