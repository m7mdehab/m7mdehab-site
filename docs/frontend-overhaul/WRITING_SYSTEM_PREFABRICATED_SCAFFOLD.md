# Writing System — Prefabricated Scaffold

**Status:** NON-LIVE / READY TO INTEGRATE

The Writing rebuild now has a code scaffold in addition to the design/specification packet.

Prepared files:

- `components/writing-system-contract.ts`
- `components/writing-system-cover.tsx`
- `components/writing-system-card.tsx`
- `components/writing-system-index.tsx`
- `components/home-writing-section.tsx`
- `components/writing-system-article-blocks.tsx`
- `components/writing-system-article.tsx`
- `components/writing-system-listen.tsx`
- `components/writing-system-schema.ts`
- `app/writing-system.css`
- `tests/writing-system-groundwork.spec.ts`
- `tests/writing-system-schema.spec.ts`

## Purpose

These files remove component-level invention from the execution pass.

They are intentionally **not wired into the live homepage or routes yet**. The accepted public site remains untouched until the execution agent can migrate the data model, integrate the prepared components, update tests, render the target viewport matrix and complete production delivery as one coherent pass.

## What is already implemented in the scaffold

- refined Home heading `What I’m thinking through.` with no redundant lede;
- bottom-right post-grid All writing CTA;
- 3/2/1 responsive grid CSS;
- one-link editorial card grammar;
- cover-bottom taxonomy + read/listen metadata overlay;
- hard two-line title and card-description clamps;
- concise per-card description support;
- current three cover treatments;
- real Presaira calibration evidence for the forecast visual;
- real public Oil Spill Detection case-study image source;
- public-safe OpportunityOS provenance/authority diagram;
- CSS-only hover/focus behavior;
- reduced-motion fallback;
- typed future article contract including estimated listen time + real audio metadata;
- publication/draft filtering and integrity-guard tests;
- `homeRank` selection helper;
- typed blocks plus legacy paragraph/bullet rendering support;
- full conditional article-view scaffold that omits absent thesis/evidence/takeaways/sources/projects cleanly;
- native top-of-article Listen component that renders only for a real audio source;
- pure `BlogPosting` schema builder that emits image/citations/project relationships/AudioObject only when real values exist;
- schema tests for both independent and project-origin writing;
- article-page CSS for the prepared renderer.

## Integration rule

Do not preserve `writing-system-contract.ts` as a second long-term editorial model.

During activation:
1. migrate the contract into `data/writing.ts`;
2. make the prepared components, article renderer and schema builder import the canonical types/helpers from `data/writing.ts`;
3. delete `components/writing-system-contract.ts`;
4. keep `data/writing.ts` as the one editorial authority.

The scaffold file exists only to keep the prepared non-live components compile-independent before the canonical data migration.

## Visual rule

`app/writing-system.css` is deliberately unimported.

Import it only when the new Home/archive markup is activated, after the historical phase/mobile styles. The isolated `.writing-system-*` namespace is designed to avoid old `.closing-note*` cascade conflicts.

## Do not

- wire only the Home section while leaving the old project-only article model;
- ship the temporary contract as a permanent third inventory;
- add new article copy to the scaffold;
- add a carousel library;
- replace the evidence-backed cover inputs with decorative stock imagery;
- import the stylesheet before the live component migration is ready.

The v1.1 refinement is governed by `docs/frontend-overhaul/WRITING_SYSTEM_REFINEMENT_2026-10-03.md`; do not restore the earlier heading/lede/metadata placement during integration.
