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
- Motion Primitives — restrained motion vocabulary reference
- Aceternity Minimal / Minimalist — typography, spacing and composition references
- Kintarowwwards — stack and microinteraction references
- MotionFolio — case-study and progressive-enhancement implementation references
- koloNatalie — visual restraint and image/text rhythm
- Aitezaz — flow, transitions and typographic confidence

The production site must not become a reskin of any source.

## Current stack

- Next.js 16.3.4
- React 19.2.7
- TypeScript 5
- Tailwind CSS 4 + custom CSS design tokens
- Lenis — optional smooth-scroll polish with reduced-motion fallback
- Lucide — interface icons
- Playwright + axe-core — rendered desktop/mobile/accessibility/progressive-enhancement QA
- Lighthouse — performance/accessibility/best-practices/SEO/agentic-browsing benchmarking
- Cloudflare Workers Static Assets — selected production deployment target for the current fully prerenderable site

Motion, Matter.js and `next-themes` were removed during Iteration 6 after runtime inspection showed they were no longer required. GSAP and OGL are not installed; either may be reconsidered only for a concrete justified need with licensing and performance review.

## Deterministic local validation

Node 22 and the committed npm lockfile are the supported baseline.

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run test:browser
```

`npm ci` is the normal install path for validation and CI. Dependency changes must update both `package.json` and `package-lock.json` in the same change.

## Cloudflare deployment lane

The source remains a normal Next.js application. Cloudflare deployment is an explicit static-export mode:

```bash
CLOUDFLARE_STATIC_EXPORT=1 npm run build
```

That produces `out/`, which is validated and packaged by `.github/workflows/deployment-readiness.yml` before production deployment is allowed.

Production deployment is intentionally manual through `.github/workflows/deploy-cloudflare-production.yml` and targets the apex canonical host `m7mdehab.com`. It requires authorized Cloudflare account credentials and a real zone/domain; repository readiness is never treated as evidence that the domain is live.

See `docs/DEPLOYMENT.md` for the custom-domain, `www` redirect, TLS, preview/noindex, rollback and post-deployment verification contract.

## Current routes

- `/` — rich primary homepage
- `/work/[slug]` — evidence-first project case studies
- `/profile.json` — machine-readable public profile
- `/projects.json` — machine-readable project data
- `/services.json` — machine-readable governed service data
- `/llms.txt` — compact first-party entity/project/service guide
- `/robots.txt`
- `/sitemap.xml`

## Core principles

1. Truth and public-safe evidence before marketing copy.
2. Real project proof before résumé chronology.
3. Truth completeness and homepage inclusion are separate decisions.
4. Capabilities and concrete skills are separate information types.
5. Typography and imagery do more work than decoration.
6. Motion is enhancement, never a gate on readable/crawlable content.
7. SEO, entity SEO and AI extractability are architectural requirements.
8. Accessibility, performance, progressive enhancement and mobile usability can veto an aesthetic treatment.
9. Professional data stays centralized and extensible.
10. Any direct third-party source adaptation must update the attribution register in the same change.

See `/docs` for the governing product, design, truth, SEO, reference, deployment and licensing system.
