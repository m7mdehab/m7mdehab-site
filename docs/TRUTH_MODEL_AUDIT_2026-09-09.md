# Truth Model & Content Completeness Audit — 2026-09-09

## Status
Iteration 2 is complete.

This audit reconciles the currently available sources into a governed, public-safe model for the website. It does **not** copy private source material into the public repository.

## Sources reviewed

### 1. Current CV — August 2026
Used for current employment, prior employment, education, certifications, skills, languages and public contact data.

### 2. Prior CV — June 2026
Text extraction was compared against the August 2026 CV on 2026-09-09. No textual differences were found. The August file therefore becomes the current CV reference; June is retained as a historical duplicate source, not a competing truth source.

### 3. OpportunityOS founder truth pack — generated 2026-09-02
Useful as an internal evidence/provenance model and for founder-stated service/career preferences. It is **not** itself public website content. It contains fields that must stay private or operational.

### 4. Website Master Plan + newest explicit instructions
Authoritative for canonical identity, confidentiality, strategic positioning and the permitted ownership wording for Ghareeb Oglu and Makhbazy.

### 5. Current public GitHub evidence
Reviewed current public repositories for:
- Presaira / World Cup 2026 Live Prediction Engine;
- Oil Spill Detection;
- Solar Site Selection;
- OpportunityOS public documentation mirror.

GitHub is preferred over older CV phrasing when it contains more current public project facts.

### 6. Connected Drive corpus
Confirmed substantive project corpora for Ghareeb Oglu and Makhbazy. Drive presence supports project provenance/existence, but filenames/assets alone are not used to infer Mohammed's exact personal role; role wording continues to come from Mohammed's explicit statements/master plan.

### 7. Existing website runtime data
`data/public.ts` was audited as a **curated public runtime projection**, not as the complete professional truth model.

---

## Authority / precedence

When sources conflict, use this order:

1. Mohammed's newest explicit instruction.
2. Current verified public evidence (for facts that are public by nature, especially project state/results).
3. Current August 2026 CV.
4. Governed public source registry in `data/source-of-truth.public.yaml`.
5. Older June 2026 CV / historical documents.
6. Existing site copy/data.
7. Inference.

A private/internal source may prove a fact without granting permission to publish it.

---

## Classification semantics

| Classification | Meaning | Website treatment |
|---|---|---|
| **public** | Safe and appropriate to publish | May appear visibly and in machine-readable outputs |
| **public-safe** | Only explicitly authorized fields/summaries may be published | Publish the minimum allowed representation |
| **public-eligible / deprioritized** | Safe, but strategically secondary | Preserve in source model; omit from homepage unless useful |
| **private** | Personal/operational information not required for public identity | Do not publish |
| **confidential** | Employer/client/project information that must not be exposed | Do not publish; use only to enforce boundaries |
| **obsolete** | Fact was once true but is no longer current | Do not present as current; may be historical where relevant |
| **superseded** | Replaced by a newer explicit statement/evidence | Use only for audit history |
| **unverified** | Insufficient evidence | Do not make as a factual claim |
| **editorial** | Positioning/copy rather than independently verifiable biography | Allowed when it does not imply unsupported facts |

---

## Major reconciliation decisions

### Canonical identity
**Mohammed Ehab ElNomany** is the canonical spelling everywhere public.

The truth pack title/older records use `Elnomany`; that spelling is treated as historical/source spelling, not canonical public identity.

`M7mdehab` remains a secondary handle and identity signal, not the primary name.

### Current professional role
Current factual job title: **Data Migration Engineer at Network International**.

`Data Scientist`, `AI Engineer` and `BI Analyst` may be used as capability/positioning descriptors, but must not be rendered in a way that falsely implies they are simultaneous current employer titles.

### Network International — strict publication boundary
The CV contains detailed current-work information including banking clients, client counts, data domains, platform/system references and migration workflow details.

Those details are **not website-public**, despite being factual.

Allowed public representation:
- Network International;
- Data Migration Engineer;
- employment period;
- broad professional credibility only where it does not reveal client/project/internal detail.

Do not expose:
- bank/client names or counts;
- card/account migration specifics;
- Way4/OpenWay or other internal/client systems as work-detail claims;
- mapping/cutover/proprietary workflow specifics;
- private implementation detail.

### Al Tayseer Group employment
The three overlapping roles are valid and should not be incorrectly flattened into one job.

Public chronology:
- Technical Team Lead / Data Analyst — Egyptian African Trade — Jul 2024–Jun 2025;
- Marketing Team Lead — Al Tayseer International — Jun 2025–Jan 2026;
- Supply Chain Specialist & Data Analyst — Guksu — Aug 2025–Nov 2025.

The overlap is intentional and reflects concurrent sister-company responsibilities.

### Additional experience
Public source model now preserves:
- Orcas Online tutoring;
- freelance web development/consulting;
- NARSS internship;
- Zewail City internship;
- Pharaonic Petroleum Company internship.

The homepage may intentionally show only the most strategically useful subset.

### Education
The complete public-safe model now retains:
- BSc Computer Science, Data Science major — Canadian International College — CGPA 3.55;
- 15-month Data Science & AI Scholarship — ExploreAI / ALX / African Leadership University;
- Manarat Jeddah International Schools — British Curriculum / IGCSE — 2017.

High school is intentionally low-priority for the homepage, not missing from the source model.

### Certifications
Five completed certifications/courses are retained with issuer and year. No additional credential may be implied without evidence.

### Capabilities vs. skills
These are now formally separate concepts.

**Capabilities answer:** what kinds of problems can Mohammed solve?
- Data Engineering & Migration
- Analytics & BI
- Data Science & Machine Learning
- AI Engineering
- Product & Software

**Skills answer:** what concrete tools/methods does Mohammed meaningfully use?
Examples include SQL, PostgreSQL, Power BI, Python, pandas, NumPy, scikit-learn, TensorFlow, PyTorch, Next.js, Supabase, Vercel, WordPress, data migration/mapping/reconciliation and stakeholder/requirements work.

This distinction must survive every future design iteration. A capability section cannot become a logo wall; a skill section cannot pretend every tool is a strategic business capability.

---

## Project reconciliation

### Presaira — updated state
The existing site projection still described Presaira in active/future tense as “Forecasting the 2026 World Cup”. That is now stale.

Current public repository evidence shows that the system **forecast all 104 matches** of the 2026 World Cup and is now supported by full-tournament scoring, postmortem/evaluation artifacts, reproducible runs and a 50,000-iteration Monte Carlo simulation.

Decision:
- use historical/completed-event wording;
- emphasize forecasting rigor, reproducibility, evaluation, testing and technical honesty;
- avoid wording that implies the tournament is still upcoming.

### OpportunityOS
Publicly safe framing:
- governed opportunity-acquisition / opportunity-discovery system;
- truth management / provenance;
- autonomous or multi-stage workflows;
- product and architecture thinking.

Do not publish:
- private founder truth data;
- private working code;
- confidential internals beyond the public documentation mirror/allowlist.

The public docs repository itself explicitly identifies the private repository as authoritative and excludes working code/private founder data.

### Ghareeb Oglu Commerce
Authorized ownership wording permits the website to state that Mohammed:
- planned the product/site;
- designed the solution;
- selected/implemented tools;
- built it from scratch;
- handled execution end-to-end.

Strategic proof dimensions:
- ecommerce;
- product thinking;
- frontend/backend/software architecture;
- deployment;
- payments;
- fulfillment/logistics integration;
- business understanding.

Drive contains a substantial Ghareeb Oglu project corpus, but only explicitly public-safe assets/evidence may later be surfaced.

### Makhbazy
Authorized wording permits the website to state that Mohammed:
- designed UI/UX;
- led product/development;
- monitored and supervised implementation;
- approved delivery;
- oversaw Android/iOS execution from start to finish.

Do **not** convert that into a false claim that he personally coded the entire mobile application.

Drive contains a substantive Makhbazy research/product corpus. Public visual evidence must still be selected intentionally.

### Oil Spill Detection
Current repository evidence is materially stronger than the old CV summary.

Public-safe current framing may include:
- Sentinel-1 C-band SAR;
- five-class semantic segmentation;
- SegFormer/U-Net/DeepLabV3+ evaluation;
- oil-class IoU/recall and full evaluation artifacts;
- ONNX inference;
- georeferenced outputs;
- FastAPI + React/MapLibre delivery;
- real-event Wakashio case study;
- documented limitations.

Avoid reusing obsolete legacy accuracy claims without the current repository's caveats.

### Solar Site Selection
Current repository evidence is also stronger than the old CV summary.

Public-safe current framing may include:
- web-based PV siting engine;
- multiple public geodata sources;
- AHP/MCDA analysis;
- five-class Land Suitability Index;
- ranked candidate sites;
- pvlib energy and LCOE estimates;
- FastAPI + React/MapLibre;
- PDF export;
- live Hugging Face demo;
- validation and documented limitations.

---

## Services reconciliation

The founder truth pack supports six service families:
1. Data migration and reconciliation.
2. Power BI dashboards and reporting.
3. Machine learning and AI product development.
4. Web development and deployment.
5. Digital marketing analytics and reporting.
6. Tutoring in Python/Java/data/ML topics.

Website strategy remains narrower:
- the first four are primary opportunity-conversion services;
- digital marketing analytics is valid but secondary;
- tutoring is valid but should not become a major acquisition surface unless Mohammed later chooses that direction.

The service source model is therefore complete while the homepage remains intentionally curated.

---

## Private / confidential information explicitly excluded from public repository data

The following source facts must not leak into visible copy, JSON outputs, schema, analytics labels or static build artifacts unless Mohammed explicitly changes the policy:

- phone number;
- compensation thresholds;
- full-time/on-site ranking preferences;
- immigration plan / Canada goal;
- freelancer legal-capacity/registration details;
- service currencies;
- transient availability date;
- industry refusal/red-line rules;
- Network International client identities/counts/internal systems/workflows;
- OpportunityOS private founder data and private implementation details.

Important distinction: **a fact can be verified and still be private.** Verification is not publication permission.

---

## Current website-data defects found and resolved / queued

### Resolved in Iteration 2
- Added a governed public-safe completeness/provenance registry: `data/source-of-truth.public.yaml`.
- Established explicit source precedence and classification semantics.
- Normalized the distinction between capabilities and concrete skills.
- Preserved low-priority but valid experience/education facts without forcing them onto the homepage.
- Identified Presaira future-tense copy as stale and updated the runtime projection.
- Updated Oil Spill and Solar Site Selection descriptions toward current public repository reality.
- Corrected `Data Validation` to the source-supported `Data Cleansing & Validation` wording.
- Added explicit Machine Learning / Deep Learning skills to the runtime skill grouping.

### Intentionally not changed into homepage content
- high school;
- PhPC internship;
- digital-marketing service;
- tutoring service;
- private career preferences;
- Network implementation detail.

Completeness belongs in the governed source model; homepage inclusion is a separate strategic decision.

---

## Writing inventory

Current writing titles in `data/public.ts` are treated as **editorial inventory**, not as factual career evidence.

A title/status such as `Drafted` should only remain if a substantive draft actually exists in the repository/project source. Until a writing-content audit confirms the article body, these entries must not be used as external authority proof or schema `Article` objects.

This is not a blocker for the website build; it is a publication-quality gate for the writing section.

---

## Machine-readable consistency rule

Visible biography, project pages, schema, `/profile.json`, `/projects.json`, `/llms.txt` and future Arabic output must all project from the same governed public facts.

They may differ in format and level of detail, but they must not contradict one another.

Do not place a claim in schema that is absent from the visible/public-safe content model merely to improve SEO/AI visibility.

---

## Exit criteria

Iteration 2 / source-of-truth phase now satisfies:

- [x] canonical public name locked;
- [x] current/prior CV reconciled;
- [x] public/private/confidential boundary documented;
- [x] employment chronology normalized;
- [x] education/certifications/skills normalized;
- [x] capabilities separated from skills;
- [x] complete public-safe source registry created;
- [x] project ownership wording captured;
- [x] current public GitHub project evidence reconciled;
- [x] connected Drive project presence checked for Ghareeb Oglu/Makhbazy;
- [x] services reconciled without forcing all services into homepage positioning;
- [x] confidential Network/OpportunityOS boundaries enforced;
- [x] runtime data defects identified and corrected;
- [x] future updates can be made in data rather than React components.

## Next iteration
Iteration 3 should be the **project evidence & visual asset audit**: identify the strongest publishable screenshots, diagrams, interfaces, maps, metrics and technical proof for each of the six flagship projects, with explicit provenance and public-use status.
