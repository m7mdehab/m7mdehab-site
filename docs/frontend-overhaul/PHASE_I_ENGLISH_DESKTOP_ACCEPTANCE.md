# Phase I — English Desktop Visual Acceptance

**Program:** Frontend Rebuild — Visual Identity & Homepage Architecture  
**Status:** ACTIVE  
**Date:** 2026-09-12  
**Baseline:** Phase H merged at `daec5ac797279f5004e7b796dbbea402461cbaa0`

## 1. Purpose

Phase I is a whole-page visual acceptance pass. It does not add another homepage chapter and it does not reopen already accepted information architecture by default.

The task is to inspect the **complete English Home as one continuous desktop experience** after Phases D–H removed the CV-derived bulk and established the final chapter system.

Automated checks support the review but cannot close it. The full rendered page must be inspected at a large desktop viewport and defects corrected before acceptance.

## 2. Governing baseline

The current Home sequence is:

1. Systems/evidence hero;
2. semantic credibility rail;
3. three-project Selected Work gallery;
4. `SEE → REDUCE → BUILD` solve/think chapter;
5. two evidence-led writing previews;
6. two-path opportunity close;
7. intentional route directory footer.

Professional-history depth now lives on `/about`; service depth lives on `/services`; all projects remain available on `/work`.

Career/profile facts are governed by Mohammed's latest explicit instruction and the September 2026 CV. Phase I must not reintroduce superseded titles, WordPress or obsolete credential signals while making visual corrections.

## 3. Review viewport

Primary acceptance viewport:

- **1920 × 1080** desktop;
- full-page screenshot;
- browser-rendered production build;
- fonts and images settled before capture.

The target homepage attention budget remains approximately **5–7 viewport heights**, preferably close to 6. This is a review target, not a CSS minimum-height requirement.

## 4. Acceptance questions

### 4.1 Whole-page rhythm

- Does the page feel like one authored system rather than stacked presentation slides?
- Do dark/light transitions create chaptering without fragmentation?
- Is there enough breathing room without restoring giant dead zones?
- Does the complete page remain inside the intended attention budget?

### 4.2 Identity and evidence

- Does the hero communicate identity + technical range before heavy reading?
- Is the evidence atlas the memory point rather than giant typography alone?
- Does the credibility rail remain shallow and secondary?
- Are real project motifs carrying visual weight throughout the page?

### 4.3 Selected Work

- Are Presaira, OpportunityOS and Ghareeb Oglu visually differentiated?
- Does Presaira retain the strongest weight without consuming an entire screen by itself?
- Does Ghareeb Oglu read as a coded product/ecommerce system rather than a generic project card?
- Is the complete `/work` route discoverable without returning six large projects to Home?

### 4.4 Solve / Think

- Does `I like the messy part.` retain human personality without becoming another manifesto screen?
- Is `SEE → REDUCE → BUILD` understandable visually before the explanatory prose is read?
- Is the transformation graphic evidence-bearing rather than decorative?

### 4.5 Writing and opportunity

- Do the two essays feel subject-derived rather than generic blog cards?
- Is the transition into the opportunity close deliberate?
- Are the hiring/role and project/system paths immediately distinguishable?
- Does the footer feel like a designed discovery layer rather than utility residue?

### 4.6 Typography

- Hero display type may be exceptional; ordinary chapter headings should normally remain one or two desktop lines.
- No uncontrolled 3–5-line display headings.
- Metadata must remain readable instead of collapsing into decorative microtype.
- Serif/sans/script emphasis must remain selective rather than omnipresent.

### 4.7 Navigation

Inspect the floating nav at:

- top/hero;
- middle of the page;
- closing section.

It must not obscure important evidence or headings and must preserve clear access to Work, About, Writing, Contact and AR.

## 5. Automated acceptance instrumentation

`tests/frontend-overhaul-phase-i.spec.ts` captures and records:

- full 1920 × 1080 Home screenshot;
- page-height / viewport-height ratio;
- major chapter bounding boxes;
- ordinary H2 line-count estimates;
- horizontal-overflow state;
- absence of CV-derived Home chapters;
- presence of the final major chapter sequence;
- desktop captures of each major chapter;
- top/middle/closing navigation state screenshots.

The automated height contract is deliberately broad enough to avoid optimizing for a number at the expense of composition: the page must not regress beyond the seven-viewport budget, while review records the actual ratio for human judgment.

## 6. Rejection triggers

Phase I must be rejected/corrected if any of these appear in the rendered page:

- Home again reads like a résumé/CV;
- page length drifts materially back toward the rejected ~15-screen experience;
- ordinary headings wrap into uncontrolled multi-line display blocks;
- project cards become repetitive or equally weighted;
- credibility rail becomes a prestige/logo wall;
- hero returns to typography + empty space;
- writing becomes generic cards without evidence identity;
- opportunity paths are visually ambiguous;
- nav repeatedly collides with content;
- large dead zones reappear;
- chapter transitions feel like disconnected slides;
- horizontal overflow exists at the desktop review viewport.

## 7. Phase boundary

Phase I closes only after:

1. CI/rendered QA is green;
2. the 1920 × 1080 full-page artifact is downloaded and inspected;
3. any desktop defects are corrected and rerendered;
4. the resulting English desktop experience is explicitly accepted.

Phase J then owns responsive/mobile recomposition. Phase K owns the full Arabic RTL visual/editorial pass. Phase L owns final staging and production-readiness acceptance.
