# Writing System — Repository Audit

**Audit date:** 2026-10-03  
**Audited main:** `67736af9dc39520d7b942c798f5af41fe636c1bb`

## Current Home architecture

`app/(en)/page.tsx` currently renders:

`SystemHero → CredibilityRail → SelectedWorkGallery → SolveThinkBridge → HomeClosing(articles)`

Writing is therefore still embedded inside HomeClosing.

## Current Home Writing

`components/home-closing.tsx` currently:

- is a client component;
- hard-selects two essays;
- uses `useTimedCarousel`;
- uses effects/ref/scroll sync;
- hides inactive slide from tab order/accessibility tree;
- auto-advances;
- renders dot navigation;
- uses two project-specific visual treatments;
- says “What the work taught me.”;
- says “Evidence-backed notes from the work.”

This is structurally incompatible with the new editorial purpose.

## Current data model

`data/writing.ts` requires:

- a single display topic;
- `createdAt`;
- mandatory project slug/title;
- thesis;
- evidence;
- sections;
- takeaways;
- sources.

A general non-project personal post cannot exist cleanly.

## Current archive/article UI

`components/writing-authority.tsx`:

- already uses three archive columns;
- uses large text-only bordered cards with no covers;
- archive hero says the work taught Mohammed the content;
- lede says each essay begins with a real project;
- article renderer always renders project-oriented evidence/takeaways/sources;
- article footer always links to a project;
- global disclaimer says the essay derives from project evidence.

## Current schema/discovery

`app/(en)/writing/[slug]/page.tsx`:

- universal `TechArticle`;
- `dateCreated`;
- mandatory project `about`.

`app/writing.json/route.ts`:

- mandatory project object;
- stale Arabic alternate URL.

`data/discoverability.ts`:

- mandatory `derivedFromProject`;
- stale Arabic alternate URL.

`app/llms.txt/route.ts`:

- every article is written as “Derived from: <project>”;
- global note says authority writing is project-derived.

All must be generalized together.

## Tests requiring change

`tests/iteration12.writing-authority.spec.ts`:

- expects `TechArticle`;
- expects project provenance for every article;
- expects two Home article links.

`tests/frontend-overhaul-phase-g.spec.ts`:

- explicitly expects two evidence notes;
- uses `.closing-note`.

`tests/mobile-composition.spec.ts`:

- excludes `.closing-notes` from overflow detection;
- tests Writing dots;
- tests Writing six-second autoplay;
- tests fixed Writing-card height;
- uses old heading selectors.

`tests/iteration8.discoverability.spec.ts`:

- expects the current project-only shape.

Selected Work carousel tests are separate and must remain.

## CSS collision audit

Legacy Writing selectors are spread across:

- `app/frontend-overhaul-phase-g.css`;
- `app/frontend-overhaul-phase-j.css`;
- `app/frontend-overhaul-phase-m.css`;
- `app/frontend-overhaul-phase-n.css`;
- `app/mobile-composition.css`.

Decision: isolate the rebuild in `.writing-system-*` and import `app/writing-system.css` after historical phase/mobile CSS.

Do not solve the rebuild through legacy cascade archaeology.

## Dead-code opportunity

Repository search shows `useTimedCarousel` is currently referenced only by:

- `components/home-closing.tsx`.

After Writing extraction, delete `components/use-timed-carousel.ts` if a final search confirms zero consumers.

## Duplicate editorial inventory

`data/public.ts` contains a small second `writing` array while full article truth lives in `data/writing.ts`.

Prefer `data/writing.ts` as the editorial authority. Remove/deprecate the duplicate only after consumer audit; do not break dormant source accidentally and do not create a third inventory.

## Concurrent PR state at audit

### PR #29 — Method Story rebuild

Draft. Touches:

- `app/(en)/layout.tsx`;
- `components/home-solve-think.tsx`;
- Phase F test.

Writing should branch/rebase from the accepted Method Story state before final rendered QA if it lands concurrently.

### PR #28 — Selected Work mobile polish

Writing must not disturb its carousel behavior.

### PR #25 — older sitewide refinement draft

Contains a partial copy-level broadening of Writing, but does **not** generalize `data/writing.ts` and does not implement this Writing grid architecture.

Do not use it as the Writing authority.

## Localization conflict discovered

`docs/LOCALIZATION_POLICY.md` currently states the public site is English-only and `/ar*` is dormant/404.

Before this groundwork commit, `AGENTS.md` still contained an older public Arabic/reciprocal-hreflang contract.

This groundwork must reconcile `AGENTS.md` to the current English-only policy so the executor does not reintroduce Arabic routes or writing alternates.


## Concurrent PR update — direct integration conflict

### PR #31 — Refine closing contact, footer, and mobile header

This PR directly touches:
- `components/home-closing.tsx`;
- `components/opportunity-paths.tsx`;
- `tests/frontend-overhaul-phase-g.spec.ts`;
- `tests/mobile-composition.spec.ts`;
- `app/(en)/layout.tsx`;
- additional navigation/closing CSS/tests.

Those are also activation surfaces for the Writing rebuild.

Therefore the Writing **execution** branch must not be cut from a base that omits an accepted PR #31. Preferred sequence:

1. finish/merge the accepted closing/contact work;
2. refresh latest `main`;
3. branch/rebase Writing activation from that state;
4. extract Writing from the newest `HomeClosing` without overwriting the accepted Opportunity/Footer changes;
5. update Phase G/mobile tests from that newest baseline.

Do not restore the older HomeClosing merely because the groundwork audit captured it earlier.

### PR #29 — Method Story

PR #29 still touches `app/(en)/layout.tsx`, `home-solve-think.tsx` and the Method test. Writing must preserve whatever Method version is accepted on latest `main`.

The Writing implementation should begin from the latest accepted main after these concurrent section changes, not by merging stale file snapshots.
