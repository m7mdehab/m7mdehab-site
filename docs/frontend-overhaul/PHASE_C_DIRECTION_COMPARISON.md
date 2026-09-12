# Phase C — Real-Content Direction Comparison

**Program:** Frontend Rebuild — Visual Identity & Homepage Architecture  
**Status:** COMPLETE / ACCEPTED  
**Accepted:** 2026-09-12  
**Authority:** Mohammed Ehab ElNomany

## Purpose

Phase C converted the reference research into three runnable, real-content homepage directions so the production art direction could be selected from rendered evidence rather than from moodboards or attachment to the existing implementation.

All prototypes are isolated under `/prototypes`, are intentionally `noindex`, and do not alter the production information architecture.

## Comparison set

### 1. Cinematic Systems Portfolio

Route: `/prototypes/cinematic`

Core idea:

- dark, layered system-atlas hero;
- real project vocabulary from forecasting, computer vision and governed AI;
- graphical evidence before résumé exposition;
- strong contrast and controlled technical atmosphere.

Strengths observed in rendered review:

- strongest identity breakthrough;
- immediate sense of systems, modelling, AI and technical range;
- project motifs behave as one visual language instead of separate claims;
- memorable first viewport without relying on typography alone;
- evidence atlas remains legible when recomposed for mobile.

Weaknesses observed:

- a fully dark homepage would become too severe;
- the prototype Selected Work treatment still spends too much space on one flagship;
- some display typography remains larger than the final production density target.

### 2. Spatial Evidence Gallery

Route: `/prototypes/spatial`

Core idea:

- lighter exhibition/gallery composition;
- asymmetric evidence fragments;
- heterogeneous project weighting rather than repeated cards;
- technical work treated as inspectable exhibits.

Strengths observed:

- strongest Selected Work composition;
- very effective hierarchy between Oil Spill Detection, OpportunityOS and Solar Site Selection;
- avoids the six-card-wall feeling;
- gives different evidence types different visual weights.

Weaknesses observed:

- hero still leans too heavily on oversized editorial typography;
- less distinctive as an overall identity system than Cinematic;
- can drift toward art-direction-for-art-direction's-sake if evidence is not kept primary.

### 3. Kinetic Editorial / Product

Route: `/prototypes/kinetic`

Core idea:

- shortest and fastest-scanning option;
- direct project rows;
- product/editorial density;
- restrained motion and low implementation complexity.

Strengths observed:

- best density discipline;
- strongest recruiter-speed scan;
- simplest performance profile;
- useful model for secondary information, navigation, writing, CTA and mobile compression.

Weaknesses observed:

- too close to a highly polished conventional professional portfolio;
- does not create enough visual personality on its own;
- insufficient answer to the core complaint that the previous homepage felt like a CV rendered beautifully.

## Accepted production direction

The production system is locked as:

> **Cinematic Systems × Spatial Evidence × Kinetic Density**

This is not a compromise average between three concepts. Each donor has a defined responsibility:

- **Cinematic Systems** owns the identity, atmosphere, hero memory point and systems vocabulary.
- **Spatial Evidence** owns heterogeneous Selected Work composition and project weighting.
- **Kinetic Density** owns compression discipline for navigation, secondary information, writing, CTA and mobile.

The production homepage must therefore **not** become a direct copy of the dark Cinematic prototype.

## Production implications

The following are accepted for Phase D and later implementation:

1. The hero is rebuilt from scratch around a real evidence/system atlas.
2. The page may use dark/ink atmosphere prominently, but not as an uninterrupted all-page theme.
3. The warm editorial identity may survive as a secondary surface/chaptering device if it strengthens contrast.
4. Selected Work will not inherit the Cinematic prototype's single giant project slab; Phase E will use Spatial's heterogeneous evidence logic.
5. Secondary sections must obey Kinetic's density discipline.
6. The homepage remains aggressively filtered; full Experience, Skills, Certifications and Education do not return as stacked Home sections.
7. Credibility remains a shallow relationship-labeled rail, never a `Trusted by` logo wall.
8. Motion remains one coherent grammar with reduced-motion fallbacks and no semantic dependency on animation.
9. Mobile is recomposed, not scaled down.

## Rendered QA evidence

Final accepted Phase C branch validation:

- Deployment Readiness run `34663301936` — **PASS**.
- Application CI run `34663301934` — **PASS**.
- Consolidated Playwright suite — **50/50 PASS**.
- Prototype coverage includes large desktop/laptop rendering, 390px mobile, horizontal-overflow checks and reduced-motion behavior.
- Rendered QA artifact ID: `10287424549`.
- Artifact SHA-256: `faf238c62b414ec1b97ea52f05718c36c4d4567e7222cf5c3a690503baf177bf`.

The production-home Lighthouse score from this CI run is not treated as a Phase C design metric because Phase C adds isolated prototypes rather than replacing production Home. Existing production accessibility, best-practice, SEO and agentic-browsing categories remained at 100 in the recorded run; performance remains a later production implementation gate.

## Acceptance decision

**Phase C is COMPLETE.**

The rendered comparison is accepted and there is no remaining direction-selection ambiguity. Phase D may now implement the visual foundation, production hero, reduced navigation and credibility rail using the locked hybrid direction above.
