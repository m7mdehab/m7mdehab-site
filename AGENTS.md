# Agent Guide

## What this repository is
A durable professional web identity and opportunity-acquisition system for Mohammed Ehab ElNomany. Do not reduce it to "a portfolio website."

## Authority
The newest explicit instruction from Mohammed overrides older documentation. Otherwise follow the Project Master Plan and repository docs.

## Public-truth rule
Never expose private/confidential source material merely because it exists in Project files.

Use `data/source-of-truth.public.yaml` as the governed **public/public-safe completeness and provenance registry**. Use `data/public.ts` as the **curated runtime projection** for the current website UI. If they differ accidentally, reconcile them before shipping; do not silently invent a third version in a React component.

A fact being verified does **not** mean it is approved for publication.

Network International content is deliberately public-safe only: company, role and dates where appropriate, plus only high-level credibility that does not reveal protected detail. Do not publish customer/bank names or counts, card/account migration specifics, client/internal systems, platform names, proprietary migration workflows, cutover detail, customer data or private implementation detail.

OpportunityOS private founder data and private implementation remain private even when they support a public-safe summary.

Do not publish private operational/career facts such as phone number, compensation thresholds, immigration plans, legal-capacity details, transient availability dates or internal opportunity-ranking preferences unless Mohammed explicitly changes the policy.

## Source precedence
When facts conflict:
1. Mohammed's newest explicit instruction.
2. Current verified public evidence for public project facts.
3. Current CV / governed current source.
4. `data/source-of-truth.public.yaml`.
5. Historical documents.
6. Existing UI copy.
7. Inference.

See `docs/TRUTH_MODEL_AUDIT_2026-09-09.md` for the reconciliation record and classification semantics.

## Canonical identity
Preserve canonical entity spelling: **Mohammed Ehab ElNomany**. `M7mdehab` is a secondary handle, never a replacement for the real name.

## Capabilities vs skills
Keep these separate:
- **capabilities** describe problem/outcome domains (migration, analytics, ML, AI engineering, product/software);
- **skills** describe concrete tools, technologies and methods.

Do not collapse either into a generic logo wall.

## Design rule
The site is a custom synthesis of multiple references. Do not reskin one template. Favor exceptional typography, real project visuals, generous spacing, restrained state-change motion, semantic HTML and distinctive project treatments.

## SEO / AI visibility
Keep visible content, structured data and machine-readable outputs consistent with the governed public truth model. Do not fabricate schema claims that do not appear visibly or lack evidence. Never leak private facts through JSON-LD, `/profile.json`, `/projects.json`, `/llms.txt`, metadata or hidden HTML.

## Performance / accessibility
Respect reduced motion. Avoid unnecessary client components. Keep animated/WebGL effects isolated and pausable. Aesthetic treatments lose when they damage crawlability, Core Web Vitals, accessibility, clarity, conversion or mobile usability.

## Content model
Keep professional content centralized under `data/`. Adding a job, certification, skill, service or project should not require redesigning components. Homepage omission does not mean a fact should disappear from the governed source registry; strategic curation and truth completeness are separate concerns.

## Before shipping
- reconcile `data/source-of-truth.public.yaml` with `data/public.ts`;
- verify third-party licenses and attribution;
- run typecheck/lint/build when dependencies are available;
- run accessibility/performance/SEO checks;
- scan for confidential material, private facts and secrets;
- verify mobile and reduced-motion paths;
- update `docs/EXECUTION_STATUS.md`.
