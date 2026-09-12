# Phase F — What I Solve / How I Think

**Program:** Frontend Rebuild — Visual Identity & Homepage Architecture  
**Status:** IMPLEMENTED / AWAITING RENDERED ACCEPTANCE  
**Date:** 2026-09-12  
**Authority:** Mohammed Ehab ElNomany

## Objective

Replace three CV-like homepage chapters — Capabilities, Skills & Stack, and the oversized About block — with one compact graphical chapter that communicates both working philosophy and practical breadth.

The chapter must make Mohammed feel authored and human without manufacturing personality through giant typography. It must show a repeated operating method rather than list tools.

## Exploration source

Phase C already produced three real-content prototypes for this exact slice of the homepage. Phase F re-used those runnable artifacts as the comparison set rather than inventing another disconnected prototype family.

### Cinematic Systems treatment

Strengths:
- clearest explanation of the three-step method;
- strongest verbal personality;
- direct connection between philosophy and technical execution.

Weaknesses:
- three large cards repeat a common portfolio grammar;
- too much of the meaning is carried by copy rather than transformation.

### Spatial Evidence treatment

Strengths:
- strongest graphical idea;
- communicates movement from problem state to system state;
- best fit with the accepted evidence/exhibition language.

Weaknesses:
- original prototype under-explained the practical breadth;
- a bare three-node map risks becoming generic process-diagram decoration.

### Kinetic Density treatment

Strengths:
- shortest and easiest to scan;
- strong recruiter readability;
- compact enough to protect the homepage height budget.

Weaknesses:
- row-based treatment is visually close to the resume tables being removed;
- insufficient personality on its own.

## Production decision

Use a hybrid consistent with the Phase C production direction:

> **Spatial transformation skeleton × Cinematic explanatory clarity × Kinetic density discipline.**

The resulting chapter is not a capability matrix and not a skill wall. It behaves like a small transformation console:

1. **Messy reality** arrives as fragmented data, conflicting definitions, fuzzy questions and evidence boundaries.
2. **SEE** — make the truth visible.
3. **REDUCE** — reduce ambiguity.
4. **BUILD** — build the smallest reliable system that can carry the job.
5. The output resolves into five kinds of outcome Mohammed can truthfully produce: validated migration, decision-ready analytics, evaluated models, governed AI workflows and usable products.

## Copy decision

Primary human statement:

> **I like the messy part.**

This preserves the strongest idea from the previous About section while removing its oversized editorial treatment.

Supporting principle:

> I do not start with tools. I make the problem legible, reduce ambiguity, then build the smallest reliable system that can carry the job.

## Visual language

- deep graphite systems surface after the warm Selected Work chapter;
- subtle research-grid background, not glow filler;
- raw input fragments are intentionally irregular;
- the three transformation stages become progressively more structured;
- outputs align into a clean decision-ready stack;
- one restrained tracer moves through the transformation on normal-motion clients;
- reduced-motion removes the tracer entirely without hiding meaning;
- no skill chips, logo wall, node-cloud spectacle or fake data visualization.

## Homepage changes in this phase

Removed from English Home:
- legacy `Expertise` / Capabilities chapter;
- legacy `Skills` chapter;
- legacy oversized `About` chapter.

Added:
- `SolveThinkBridge` directly after Selected Work.

Detailed skill taxonomy and professional biography remain in the governed public data and are intentionally reserved for the future `/about` rebuild in Phase H.

## Acceptance criteria

- exactly one solve/think chapter replaces the three legacy chapters;
- the section contains the three working-method stages;
- no skill-chip wall is visible on Home;
- capability breadth is communicated through outcome types rather than tool names;
- desktop chapter remains approximately one viewport or less in perceived travel;
- 390px composition is intentionally recomposed, not merely scaled down;
- no horizontal overflow;
- section passes axe;
- reduced motion removes the moving tracer;
- rendered desktop/mobile screenshots are inspected before merge.

## Files

- `components/home-solve-think.tsx`
- `app/frontend-overhaul-phase-f.css`
- `tests/frontend-overhaul-phase-f.spec.ts`
- `app/(en)/page.tsx`
- `app/(en)/layout.tsx`

## Merge rule

Do not merge Phase F until CI passes and Mohammed visually accepts the rendered desktop/mobile result.
