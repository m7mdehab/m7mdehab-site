# m7mdehab-site

The production repository for **Mohammed Ehab ElNomany's professional web identity and opportunity-acquisition system**.

This is intentionally broader than a portfolio. The site is designed to increase visibility, approachability, awareness, search presence, AI-search understanding, technical credibility, recruiter conversion, client acquisition and long-term professional authority.

## Truth and content architecture

The repository deliberately separates **truth completeness** from **homepage curation**:

- `data/source-of-truth.public.yaml` — governed public/public-safe completeness and provenance registry.
- `data/public.ts` — curated runtime projection used by the current UI.
- `docs/TRUTH_MODEL_AUDIT_2026-09-09.md` — source reconciliation, classification semantics, confidentiality boundaries and resolved data defects.

A fact being verified does not automatically make it publishable. Private/confidential source material must never leak through visible copy, JSON-LD, machine-readable endpoints, metadata or static build artifacts.

## Product direction

The visual/interaction system is a custom synthesis of patterns studied from:

- React Bits Portfolio — production chassis, project presentation, stack interaction and performance discipline
- Motion Primitives — restrained motion vocabulary
- Aceternity Minimal / Minimalist — typography, spacing and composition references
- Kintarowwwards — stack and microinteraction references
- MotionFolio — GSAP/Lenis/case-study implementation patterns
- koloNatalie — visual restraint and image/text rhythm
- Aitezaz — flow, transitions and typographic confidence

The production site must not become a reskin of any source.

## Current stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4 + custom CSS design tokens
- Motion — primary animation runtime
- Lenis — optional smooth-scroll polish with reduced-motion fallback
- Matter.js — reserved for optional progressive-enhancement interactions only
- GSAP — not currently installed; may be introduced only for a specific justified choreography

OGL was removed from the scaffold during the reference/licensing audit because the current upstream GitHub source did not expose sufficiently clear license metadata for us to carry an unused dependency. It can be reconsidered only after exact package terms are verified.

## Current routes

- `/` — rich primary homepage
- `/work/[slug]` — evidence-first project case studies
- `/profile.json` — machine-readable public profile
- `/projects.json` — machine-readable project data
- `/llms.txt` — compact first-party entity/project guide
- `/robots.txt`
- `/sitemap.xml`

## Core principles

1. Truth and public-safe evidence before marketing copy.
2. Real project proof before résumé chronology.
3. Truth completeness and homepage inclusion are separate decisions.
4. Capabilities and concrete skills are separate information types.
5. Typography and imagery do more work than decoration.
6. Motion is concentrated around state change, not ambient spectacle.
7. SEO, entity SEO and AI extractability are architectural requirements.
8. Accessibility, performance and mobile usability can veto an aesthetic treatment.
9. Professional data stays centralized and extensible.
10. Any direct third-party source adaptation must update the attribution register in the same change.

See `/docs` for the governing product, design, truth, SEO, reference and licensing system.
