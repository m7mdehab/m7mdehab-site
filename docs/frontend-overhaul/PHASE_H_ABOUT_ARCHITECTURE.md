# Phase H — About / Professional History Architecture

**Program:** Frontend Rebuild — Visual Identity & Homepage Architecture  
**Status:** IMPLEMENTATION  
**Date:** 2026-09-12

## 1. Purpose

Create the dedicated human-readable destination for the professional history deliberately removed from Home. The route must carry the depth recruiters, collaborators and clients may need without recreating the rejected “CV with a .com domain” experience.

Phase A already established `/about` as the primary detailed professional-history route. A separate HTML `/resume` route is intentionally not created because it would duplicate employment, education and credential content. A downloadable CV can be added later only when a canonical public asset is approved.

**Truth baseline:** the September 2026 CV is the current governing career/profile source. It supersedes older June/August CV wording where they conflict. Mohammed's explicit 2026-09-12 correction also removes WordPress from the public skill/implementation model: the relevant websites/products were built in code.

## 2. What moves off Home in this phase

The English homepage must stop rendering the standalone:

- Experience timeline;
- Certifications / Education chapter;
- Additional Experience cards.

The existing credibility rail remains the compressed Home signal. Its “Full background” route moves from the obsolete `/#about` target to `/about`.

## 3. Reference exploration

Phase H reuses the accepted frontend-overhaul vocabulary and adds a focused route-level reference pass. The goal is pattern extraction, not visual copying.

| Reference | Useful mechanism | Use here | Risk / rejection |
|---|---|---|---|
| RIxiV1/portfolio | deeper case-study routes while Home stays selective | reinforces progressive disclosure | do not inherit generic project-card grammar |
| zaccesss/isaac-adjei-portfolio | separate About, Experience, Skills and CV destinations | confirms that deep career material benefits from dedicated routing | too many separate routes would fragment Mohammed’s story; consolidate into `/about` |
| agungkurniawanid/portfolio | typed timeline categories and dedicated certificate/timeline pages | useful category clarity | reject animated proficiency percentages and resume-dashboard feel |
| Existing M7 Phase D–G system | evidence atlas, kinetic compression, restrained dark systems band | maintain continuity with the accepted Home | do not turn About into another Home clone |

License status is irrelevant to Phase H implementation because no source code or visual asset is copied from those references; they are conceptual IA references only.

## 4. Three route concepts considered

### A — Resume Ledger
A dense editorial ledger: biography, chronological roles, education, credentials, skills.

**Strength:** recruiter-efficient.  
**Failure:** too close to the rejected CV-in-browser pattern.

### B — Personal Manifesto
A narrative-led biography with large statements and a few selected career moments.

**Strength:** personality.  
**Failure:** under-serves recruiter verification and hides useful factual depth.

### C — Career Signal Map — SELECTED
A structured professional-history page that explains the through-line, then reveals chronology, parallel tracks, foundations, learning and operating stack as different visual systems.

**Why selected:** it keeps factual completeness while changing interaction grammar between chapters. The page reads as a professional system evolving over time, not as stacked résumé sections.

## 5. Final page architecture

### 01 — Through-line
- concise identity statement;
- current role and employer;
- Cairo location;
- English + Arabic;
- one short biography paragraph;
- links to Work and contact.

No invented personal anecdotes and no inflated prestige language.

### 02 — Career map
Primary chronological roles, aligned to the September 2026 CV:
- Network International — Data Engineer;
- Al Tayseer International — Business Analyst Team Lead;
- Guksu — Data Analyst & Supply Chain Analyst;
- Egyptian African Trade — Technical Team Lead / Data Analyst.

Each entry carries only public-safe responsibility context. The current Network International role is intentionally abstracted away from client-identifying detail.

### 03 — Parallel tracks
Work that should not be visually collapsed into the primary employment lane:
- Orcas Online — Private Tutor;
- Self-employed — Freelance Web Developer / Consultant.

The freelance web-development wording describes coded implementation. WordPress is not part of the public implementation model.

### 04 — Foundation
Early technical placements are compressed into a short foundation strip:
- NARSS — Data / ML Intern;
- Pharaonic Petroleum Company — IT Intern;
- Zewail City for Science & Technology — ML Intern.

### 05 — Learning ledger
Education:
- BSc Computer Science (Data Science Major), Canadian International College, 2021–2024, CGPA 3.55;
- Data Science & AI Scholarship, ExploreAI Academy / ALX / African Leadership University, 2023–2024, 15 months.

Current CV credentials:
- Databricks Certified Data Engineer Associate — Databricks, 2026;
- AI / LLM Engineering — Udemy (Ed Donner), 2025;
- McKinsey Forward Foundation & Advanced — McKinsey Academy, 2024;
- Problem Solving with C++ — Coach Academy, 2023;
- Database Management with SQL — Canadian International College, 2022.

High school is not promoted in this professional route because it does not materially help current evaluation; it remains in the source-of-truth model.

### 06 — Operating stack
Skills remain readable text grouped by the current CV/problem domains rather than badges, progress bars, logos or percentages:
- Data engineering;
- Cloud & platforms;
- Programming;
- Analytics & BI;
- ML & AI;
- Business & delivery.

### 07 — Working principles / next routes
Three principles already established by the site narrative:
- make the truth visible;
- reduce ambiguity;
- build the smallest reliable system that can carry the job.

Close with routes to Work, Services, Writing and direct contact.

## 6. Visual grammar

- warm paper base, not a full dark page;
- one dark current-role panel as an anchor, not a repeated card system;
- chronological rail uses rules, years and asymmetric columns rather than rounded containers;
- parallel tracks use a two-lane band to make concurrency visible;
- foundation uses a compact three-node strip;
- learning uses a ledger grid, not certificate cards;
- skills are inline textual inventories with strong category labels;
- type scale remains disciplined: one display statement, then normal section headings;
- motion is restrained to line growth, entry transitions and small state changes;
- no content depends on animation;
- reduced-motion, no-JavaScript and mobile contracts remain mandatory.

## 7. Routing and discoverability changes

- add `/about` canonical route;
- point primary nav About to `/about`;
- point credibility rail “Full background” to `/about`;
- add About to footer directory;
- add `/about` to sitemap;
- add `/about` to CI smoke routes and static-export verification;
- retain machine-readable profile facts independently of Home removal;
- do not create hidden SEO copy;
- do not advertise a downloadable CV until an approved public CV asset exists.

Arabic `/ar/about` is intentionally deferred to the later Arabic structural/editorial phase, consistent with the accepted program order. The English structure must first be visually accepted.

## 8. Acceptance gate

Phase H is not complete merely because the route builds. Acceptance requires:

1. Home no longer renders the three CV-derived chapters;
2. `/about` exposes the relocated professional history clearly;
3. current career/profile facts match the September 2026 CV and explicit corrections;
4. no WordPress claim remains in current runtime/About data;
5. no horizontal overflow at 390 px;
6. Axe passes on desktop;
7. reduced-motion and no-JavaScript readability pass;
8. sitemap/navigation/footer route correctly;
9. desktop and mobile rendered captures are inspected before merge.
