# Project Case Study System v1

**Status:** production authority for `/work/[slug]`  
**Scope:** Work directory handoff, project-detail layout, project storytelling, evidence presentation, future case-study authoring

## Locked objective

Every project page should feel like part of one deliberate publication system: calm, minimal, readable, evidence-first and technically credible.

The shell is uniform. The project personality is not.

The visual model deliberately inherits the strongest rules from Writing Article System v1.4 instead of inventing a second editorial language. Project pages use the same restrained typography, wide reading canvas, source-aware structure, sticky desktop contents rail and mobile-first readability. The project-specific layer comes from real evidence, project tone and the governed project visual.

## Authority

For project facts and publication rights, precedence remains:

1. Mohammed's newest explicit instruction.
2. Current verified public evidence.
3. `data/source-of-truth.public.yaml`.
4. `data/project-evidence.public.yaml`.
5. `data/public.ts` and `data/case-studies.ts` as curated runtime projections.
6. Historical documents.
7. Existing UI copy.
8. Inference.

A verified fact is not automatically publishable.

## Standard project shell

Every public case study renders through the same structural shell:

1. Back to Work + Case study label
2. Project category/kicker
3. One restrained H1
4. One concise project deck
5. Evidence-domain metadata
6. Public-evidence action when a real public target exists
7. One substantial project-specific evidence visual
8. Evidence anchors
9. On-this-page navigation
10. The project / challenge
11. Role & scope
12. Approach
13. Limits & boundaries
14. Public record / publication boundary
15. Relevant service pathways only where the governed map supports them
16. Next project

Do not add sections merely to make different projects look equally deep.

## Reading geometry

Desktop:
- page frame <=1360px;
- use the same broad reading geometry as Writing v1.4;
- main prose column plus a subtle 200–220px sticky contents rail;
- body text roughly 16–17px with line-height around 1.68;
- deck and body prose may be justified with the final line left-aligned;
- automatic hyphenation disabled;
- H1/H2 scale remains restrained;
- no poster-scale headings inside the body.

Mobile/tablet:
- one content column;
- contents becomes a compact static navigation block;
- same evidence, limits and public-record trail;
- no horizontal overflow;
- no hover-only meaning.

## Project personality layer

A project may feel distinct through:
- its governed `ProjectVisual`;
- its real project evidence;
- one restrained project accent derived from the existing tone;
- project-specific terminology and proof.

A project must not feel distinct through:
- a completely different page template;
- decorative 3D;
- random gradients or glowing effects;
- fake dashboards or reconstructed private product UI;
- unique motion that changes how the content must be read.

Real evidence outranks decoration.

## Content contract for future projects

A production case study must have:
- a clear thesis;
- the problem/challenge;
- Mohammed's truthful role and scope;
- a finite approach sequence;
- checkable evidence where available;
- explicit limits/boundaries;
- a publication boundary;
- public links only when they are actually public and relevant.

If a project has limited public evidence, keep the case study narrower. Do not pad it with invented metrics, generic process language or decorative evidence cards.

## Work directory contract

`/work` is the complete six-project browse surface.

The directory title is a two-line editorial statement, not a three-line poster. Project rows must keep the index, project accent, title, description, evidence domain and destination affordance visually separate. Project-specific accents are a scanning aid, not decoration.

The directory may use restrained hover/focus motion, but every row must remain fully understandable without motion.

## Evidence presentation

Evidence anchors are concise. They summarize what can be checked; they do not replace the deeper explanation.

For each anchor:
- use a real value only when verified;
- pair the value with a short explanation;
- avoid vanity metrics;
- avoid making unavailable evidence look equivalent to stronger public proof.

The public-record section is the project equivalent of Writing's Sources & further reading. It must make the evidence trail and publication boundary easy to inspect.

## SEO / AI-search contract

Each case study must keep:
- one descriptive H1;
- a permanent slug;
- a unique title and description;
- a self-canonical URL;
- semantic headings and visible project facts;
- useful public evidence links;
- project relationships in the governed CreativeWork graph;
- sitemap and machine-readable project outputs synchronized with visible claims.

Do not add hidden AI-only summaries, unsupported schema, fake freshness dates, keyword stuffing or claims that are absent from the visible page.

## Motion

Project-detail comprehension must never depend on animation.

Allowed:
- the existing selected-work → case-study transition;
- restrained hover/focus motion on links;
- project visual motion only when it already exists and preserves reduced-motion parity.

Avoid pinned reading, scroll hijacking and decorative ambient motion.

## Acceptance

For every current case study:
- exactly one H1;
- same shell and hierarchy;
- project-specific visual present;
- Evidence, Role & scope, Approach, Limits & boundaries and Public record visible;
- sticky contents rail on desktop;
- single-column readable mobile layout;
- public-evidence links match governed evidence;
- service links preserve governed direct-support semantics;
- `data-case-next` remains available;
- selected-work view-transition anchor remains available;
- no horizontal overflow at 390px;
- reduced-motion remains complete;
- axe clean;
- no project claim is altered merely for layout symmetry.

## Maintenance

When adding a future project:

1. update governed truth/evidence first;
2. add the project to the structured project registry;
3. add a `caseStudies` narrative projection without widening claims;
4. add/verify its public visual evidence;
5. let the shared project shell render it;
6. validate desktop, mobile, reduced motion, accessibility, metadata and machine-readable outputs.

Do not create a one-off project page unless a real content requirement cannot be expressed by this system.
