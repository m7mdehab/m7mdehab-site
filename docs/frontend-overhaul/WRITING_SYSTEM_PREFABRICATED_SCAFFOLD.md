# Writing System — Prefabricated Scaffold

**Status:** NON-LIVE / READY TO INTEGRATE

The Writing rebuild now has a code scaffold in addition to the design/specification packet.

Prepared files:

- `components/writing-system-contract.ts`
- `components/writing-system-cover.tsx`
- `components/writing-system-card.tsx`
- `components/home-writing-section.tsx`
- `components/writing-system-article-blocks.tsx`
- `app/writing-system.css`

## Purpose

These files remove component-level invention from the execution pass.

They are intentionally **not wired into the live homepage or routes yet**. The accepted public site remains untouched until the execution agent can migrate the data model, integrate the prepared components, update tests, render the target viewport matrix and complete production delivery as one coherent pass.

## What is already implemented in the scaffold

- locked Home header/copy;
- 3/2/1 responsive grid CSS;
- one-link editorial card grammar;
- current three cover treatments;
- real Presaira calibration evidence for the forecast visual;
- real public Oil Spill Detection case-study image source;
- public-safe OpportunityOS provenance/authority diagram;
- CSS-only hover/focus behavior;
- reduced-motion fallback;
- typed future article contract;
- `homeRank` selection helper;
- typed blocks plus legacy paragraph/bullet rendering support.

## Integration rule

Do not preserve `writing-system-contract.ts` as a second long-term editorial model.

During activation:
1. migrate the contract into `data/writing.ts`;
2. make the prepared components import the canonical types/helpers from `data/writing.ts`;
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
