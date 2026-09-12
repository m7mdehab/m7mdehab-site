# Phase I — English Desktop Visual Acceptance

**Program:** Frontend Rebuild — Visual Identity & Homepage Architecture  
**Status:** COMPLETE / ACCEPTED  
**Date:** 2026-09-12  
**Baseline:** Phase H merged at `daec5ac797279f5004e7b796dbbea402461cbaa0`

## 1. Purpose

Phase I is the whole-page English desktop acceptance pass. It adds no new homepage chapter. Its job is to judge the complete Home as one continuous production-rendered experience after Phases D–H established the final information architecture.

The acceptance viewport is **1920 × 1080**. Automated instrumentation supports the decision, but the final full-page render is also inspected visually before acceptance.

## 2. Governing baseline

Home remains:

1. Systems/evidence hero;
2. semantic credibility rail;
3. three-project Selected Work gallery;
4. `SEE → REDUCE → BUILD` solve/think chapter;
5. two evidence-led writing previews;
6. two-path opportunity close;
7. intentional route-directory footer.

Professional-history depth lives on `/about`, service depth on `/services`, and all project discovery on `/work`.

Career/profile facts remain governed by Mohammed's September 2026 CV plus explicit corrections: current role `Data Engineer`, Databricks credential/skill coverage, corrected Al Tayseer/Guksu titles, and no WordPress implementation/skill claim.

## 3. Acceptance instrumentation

`tests/frontend-overhaul-phase-i.spec.ts` records:

- full 1920 × 1080 Home capture;
- total page height in viewport equivalents;
- major chapter geometry;
- visible `main h2` line counts;
- desktop horizontal-overflow state;
- absence of CV-derived Home chapters and WordPress regression;
- individual captures for Hero, credibility, Work, Method, Writing, Opportunity and Footer;
- navigation captures at top, middle and closing states.

The page-height contract remains **4.5–7 viewport heights**, with the design target preferably near six. Ordinary H2 display headings may not exceed two lines at the acceptance viewport.

## 4. First acceptance run — REJECTED / CORRECTED

The first Phase I rendered gate did its job and caught a real visual-hierarchy regression rather than a functional defect.

Deployment Readiness passed, but Application CI failed with **78/79 Playwright tests passing** because two ordinary H2 headings wrapped to three lines at 1920px:

- `Three entrances into the work. Different evidence, same standard.`
- `Choose the conversation that fits.`

The acceptance rule was **not weakened**. The copy was tightened instead:

- Selected Work → **`Three ways into the work. One standard.`**
- Opportunity → **`Choose the right conversation.`**

This directly addresses the frontend-overhaul rejection criterion that ordinary section headings must not return to oversized three-to-five-line display blocks.

## 5. Final measured desktop result

Final 1920 × 1080 geometry:

| Surface | Top | Height |
|---|---:|---:|
| Hero | 0 | 880 px |
| Credibility rail | 880 | 123 px |
| Selected Work | 1003 | 1407 px |
| Method | 2410 | 923 px |
| Writing | 3333 | 1124 px |
| Opportunity | 4457 | 1019 px |
| Footer | 5476 | 226 px |

Whole Home:

- viewport width: **1920 px**;
- scroll width: **1920 px**;
- scroll height: **5702 px**;
- desktop length: **5.28 viewport heights**;
- horizontal overflow: **none**.

Final ordinary H2 line counts:

- `Three ways into the work. One standard.` — **2 lines**;
- `I like the messy part.` — **1 line**;
- `What the work taught me.` — **2 lines**;
- `Choose the right conversation.` — **2 lines**.

The page therefore lands inside the 5–7 viewport attention budget and removes the exact uncontrolled-heading issue found by the first run.

## 6. Human rendered review

The final `phase-i-home-1920.png` production render was inspected after the corrective rerun.

### Whole-page rhythm

Accepted. The page now reads as one authored visual system rather than a stack of résumé chapters. The tonal sequence is coherent:

**dark systems hero → shallow credibility signal → warm Selected Work → dark method → warm writing → dark opportunity/footer**.

The page is materially shorter than the rejected ~15-screen version without feeling under-explained.

### Hero and credibility

Accepted. The project-evidence atlas remains the primary memory point rather than empty space or typography alone. The credibility rail stays shallow and secondary instead of expanding back into Experience/Education/Certification sections.

### Selected Work

Accepted after the heading correction. Presaira retains dominant weight, OpportunityOS and Ghareeb Oglu use different evidence grammars, and the complete work directory remains discoverable without restoring six giant project cards.

### Method

Accepted. `I like the messy part.` remains concise and human; `SEE → REDUCE → BUILD` carries the chapter visually without a skill-chip wall or manifesto-length prose.

### Writing

Accepted. The two previews use subject-derived forecasting/calibration and SAR/segmentation evidence rather than generic blog-card styling.

### Opportunity and footer

Accepted after the heading correction. Hiring/role and project/system paths remain clearly distinct, and the compact footer functions as the discovery directory for detail intentionally removed from Home.

### Navigation

Accepted at top, middle and closing states. No blocking collision or legibility defect was found in the rendered captures.

## 7. Final validation

Final branch head: `17242755469f7363f79a7cbe06c4bc0b2bcd9045`.

- Deployment Readiness `34708286502` — **PASS**;
- Application CI `34708286573` — **PASS**;
- Playwright — **79/79 PASS**;
- typecheck — PASS;
- lint — PASS;
- build — PASS;
- production route smoke — PASS;
- rendered/accessibility QA — PASS;
- existing mobile overflow, reduced-motion and no-JavaScript suites — PASS.

Lighthouse:

- English Home: **92 / 100 / 100 / 100 / 100**;
- Presaira: **98 / 100 / 100 / 100 / 100**;
- Arabic Home: **95 / 100 / 100 / 100 / 100**.

Rendered QA artifact:

- artifact ID: `10302891370`;
- SHA-256: `c3a956b869fcd619386a945f7e42f43b542747ec574020c9531f292c0ae46748`.

## 8. Acceptance decision

**Phase I is COMPLETE / ACCEPTED.**

No blocking English-desktop visual defect remains in the final acceptance render. The page meets the intended attention budget, keeps ordinary headings controlled, preserves evidence-led differentiation, avoids the rejected CV-dump structure and maintains the September 2026 truth baseline.

Phase J now owns intentional responsive/mobile art direction and recomposition. Phase K owns the full Arabic RTL design/editorial pass. Phase L owns final staging and production-readiness acceptance.
