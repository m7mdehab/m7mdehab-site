# Phase A — Homepage IA Demolition & Content Triage

**Status:** COMPLETE  
**Date:** 2026-09-12

## Objective

Remove the assumption that the existing homepage section structure must survive. Keep only what earns homepage attention, relocate CV detail, restore the credibility logo rail, and establish a shorter route/content architecture before visual prototyping.

## Current homepage inventory

Current source renders: Hero → Work (6 projects) → Capabilities → Skills → Experience → Certifications/Education → Additional Experience → About → Services → Writing → Contact → Footer.

The repeated visual grammar is the deeper problem: large heading → small copy → large gap → list/cards → repeat. It reads like a CV with an editorial skin.

## Triage

| Current module | Decision | Home replacement | Detail destination |
|---|---|---|---|
| Hero | Rebuild from root | compact identity + real system visual | `/about` for biography |
| Work — 6 projects | Compress | 3 flagship projects | `/work` + case studies |
| Capabilities | Merge | graphical Solve/Think chapter | About/Services/projects |
| Skills | Remove from Home | demonstrate through work | `/about` + projects + structured data |
| Experience | Compress | current-role signal + logo rail | `/about` |
| Certifications | Compress | issuer logos in credibility rail | `/about` |
| Education | Compress/move | issuer/logo signal if useful | `/about` |
| Additional Experience | Move | no Home chapter | `/about` |
| About manifesto | Rebuild smaller | merge into Solve/Think | `/about` |
| Services detail | Move | compact opportunity paths | `/services` |
| Writing | Keep/compress/visualize | 2–3 visual articles | `/writing` |
| Contact | Keep/rebuild | focused closing conversion | contact methods/footer |
| Footer | Expand as directory | compact route/entity directory | — |

## Homepage attention budget

Target large desktop total: roughly **5–7 viewport heights**, preferably about **6**, with content-driven heights rather than `min-height` rules.

Approximate budget:

- Hero: 0.9–1.1
- Credibility rail: 0.12–0.18
- Selected Work: 2.0–2.6
- Solve/Think: 0.8–1.1
- Writing/Signal: 0.6–0.9
- Opportunity/Footer: 0.7–0.9

## Credibility logo rail

Hard requirement. It replaces most of the current Experience, Certifications, Education and Additional Experience homepage area.

Possible display models:

- one mixed rail with explicit EXPERIENCE / LEARNING separators; or
- two shallow rails: Experience and Education & credentials.

Behavior: seamless right-to-left loop, slow pace, hover/focus pause or slowdown, edge masks, reduced-motion static/touch-scroll fallback.

Never call the strip “Trusted by.”

## Relationship data contract

```ts
type CredibilityRelationship =
  | "employment"
  | "internship"
  | "teaching"
  | "education"
  | "scholarship"
  | "credential"
  | "client";

type CredibilitySignal = {
  id: string;
  entityName: string;
  relationship: CredibilityRelationship;
  group: "experience" | "learning";
  publicSafe: boolean;
  homepageEligible: boolean;
  sourceEvidenceIds: string[];
  officialUrl?: string;
  logoAsset?: string;
  logoMode?: "full-color" | "monochrome" | "wordmark" | "typographic-fallback";
  ariaLabel: string;
  shortRelationshipLabel: string;
  visualPriority?: number;
};
```

Accessible relationship wording remains exact: Worked at, Interned at, Teaching through, Studied at, Scholarship through, Credential from, or public-safe Delivered work for.

## SEO / AI preservation review

The current architecture already decouples discoverability from visible homepage presentation:

- `data/discoverability.ts` exports a profile record containing capabilities, skills, experience, education, services and writing.
- Machine-readable endpoints already expose `/profile.json`, `/projects.json`, `/services.json`, `/writing.json` and `/llms.txt`.
- English root layout emits ProfilePage + Person schema, current employer/role, alumniOf, knowsAbout, offers and project CreativeWork records independently of visible Home sections.

Therefore visible Home can be shortened without deleting factual/search coverage.

Required migrations:

1. `serviceContextUrl()` currently points to `/#service-*`; after `/services` exists it must point to `/services#service-*` and tests/machine-readable records must be updated.
2. Dedicated `/work`, `/about`, and `/services` routes do not yet exist and must be created to receive content removed from Home.
3. Sitemap must add substantive new EN/AR routes with reciprocal alternates.
4. Do not add hidden SEO prose to compensate for visible compression.

## Route decision

Use `/about` as the primary detailed human-readable professional-history route. Do not create a duplicate HTML `/resume` route by default. About can expose a Download CV action later.

Planned English route set:

- `/`
- `/work`
- `/work/[slug]`
- `/about`
- `/services`
- `/writing`
- `/writing/[slug]`

Arabic equivalents follow after the English structure is stable.

## Gate result

Phase A is complete for architecture. Exact visual form, final three Home projects, final logo inclusion list and microcopy are intentionally deferred to research/prototype phases.
