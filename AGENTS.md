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

## Service proof and conversion
The governed conversion path is:

`project → capability → relevant service → contact`

Service presentation must preserve evidence asymmetry instead of forcing every service into the same proof density.

- Data migration/reconciliation may use verified role/skill evidence and clearly labelled generic capability explanation, but never fabricated client screenshots, datasets, bank diagrams or proprietary migration flows.
- Analytics & Power BI may reference verified reporting/KPI experience and skills. Presaira/Solar may appear only as adjacent analytical evidence and must never be relabelled as Power BI artifacts.
- ML/AI and product/web services may use the strong public project proof registered in `data/project-evidence.public.yaml`.
- Project-detail pages may link only to services that the evidence registry marks as directly supported. Adjacent evidence shown on a service card does not widen the project's own service claims.
- Keep service anchors server rendered and stable. Current canonical anchors use `#service-<service-id>`.
- Provider-neutral conversion attributes such as `data-conversion` and `data-service-id` form a future analytics contract. Do not silently change their semantics when binding a provider later.
- Do not add an analytics provider, cookie system, contact backend or thin `/services` route merely for convention. Add them only when they have a substantive user/measurement benefit and the privacy/operational cost is justified.
- Contextual email intents are the current primary service-contact mechanism and must continue to work without JavaScript.

## Design rule
The site is a custom synthesis of multiple references. Do not reskin one template. Favor exceptional typography, real project visuals, generous spacing, restrained state-change motion, semantic HTML and distinctive project treatments.

## Visual evidence and asset provenance
Use `data/project-evidence.public.yaml` as the governing registry for project proof, visual candidates, asset status and project-specific interaction direction. See `docs/PROJECT_EVIDENCE_VISUAL_AUDIT_2026-09-09.md` for the audit rationale.

Rules:

- Real project evidence outranks generated or decorative visuals.
- Public repository assets and public-code-derived renders may be used only within their actual meaning and source/licensing context.
- Public live-site captures may demonstrate a product experience. Do not extract unrelated product photography, logos or brand artwork from a screenshot into a separate reusable asset pack unless rights are independently established.
- Connected Drive/internal project material is **not automatically publishable** merely because it is accessible. An `internal_candidate` may support verification and guide an original public-safe treatment without shipping the original bytes.
- Never invent screenshots, dashboards, client data, product states, metrics or confidential architectures to fill a visual slot.
- A `public_safe_derived` architecture/concept graphic must be recognizably explanatory. Never make it resemble a hidden/internal screenshot.
- Makhbazy visuals must preserve the distinction between UI/UX/product leadership and sole coding ownership.
- OpportunityOS visuals must remain within the allowlisted public architecture/product framing; no private founder/application data or private UI.
- Network International work must not receive reconstructed client screenshots, data models, bank diagrams or proprietary migration visuals.
- Every project-specific visual introduced in code should map to a registry entry or cause the registry to be updated in the same change.
- Reduced-motion and mobile fallbacks must preserve the same truthful proof in static form rather than substitute generic decoration.

## SEO / AI visibility
Keep visible content, structured data and machine-readable outputs consistent with the governed public truth model. Do not fabricate schema claims that do not appear visibly or lack evidence. Never leak private facts through JSON-LD, `/profile.json`, `/projects.json`, `/services.json`, `/llms.txt`, metadata or hidden HTML.

### Discoverability and launch contract

- Every indexable HTML route must self-canonicalize. A nested page must not inherit the homepage canonical by accident.
- `data/discoverability.ts` is a machine-readable/public-discovery projection only. It is subordinate to `data/source-of-truth.public.yaml`, `data/project-evidence.public.yaml` and `data/public.ts`; never treat it as a new truth authority.
- `/profile.json`, `/projects.json`, `/services.json` and `/llms.txt` must remain consistent projections of governed public data and visible claims.
- `/llms.txt` is auxiliary context, not a substitute for semantic HTML, canonical metadata, structured data, robots or sitemap architecture.
- Sitemap entries should be canonical indexable HTML pages. Add `lastmod` only when the timestamp reliably represents when that URL's content materially changed; never use build time as fake freshness.
- Structured `sameAs` is for identity-equivalent public URLs. Project/product URLs belong in project relationships, not Person identity equivalence.
- Search-crawler permission and model-training crawler policy are separate decisions. In particular, OAI-SearchBot readiness must not silently decide GPTBot policy.
- Robots permission is only the repository layer. CDN, firewall and WAF behavior must be verified against the deployed origin before claiming crawler accessibility.
- Do not claim `m7mdehab.com` is deployed, DNS-configured, indexed, verified in Search Console/Bing, or measured by analytics until that external state has been directly verified.
- Use `docs/LAUNCH_READINESS_CHECKLIST.md` for production launch gates and `docs/ANALYTICS_BINDING_CONTRACT.md` for future provider binding.
- A future analytics adapter must preserve the stable `data-conversion` / `data-service-id` semantics and the site's privacy/confidentiality boundaries. Provider naming should map to the internal vocabulary, not replace it.

## Performance / accessibility / progressive enhancement
Respect reduced motion. Avoid unnecessary client components. Keep animated effects isolated and pausable. Aesthetic treatments lose when they damage crawlability, Core Web Vitals, accessibility, clarity, conversion or mobile usability.

Core narrative and evidence must be readable in server-rendered HTML and must remain visible when JavaScript is unavailable. Never use an animation library's initial hidden state as the semantic default for substantive content. Mobile layouts must be checked for real horizontal overflow rather than masked with global `overflow-x: hidden`.

## Dependency and validation discipline
`package-lock.json` is part of the production baseline. Use Node 22 and `npm ci` for normal CI/reproducible validation. A dependency change must update `package.json` and `package-lock.json` together.

Do not upgrade a framework, linter or test tool merely because a newer major exists. Resolve security advisories promptly, but verify peer/runtime compatibility in CI. The current Next.js 16 baseline intentionally uses the compatible ESLint 9 line because the tested ESLint 10 + Next React-plugin combination crashes at rule load time.

The durable rendered gate is the **Rendered Browser QA** workflow. `npm run test:browser` runs the full `tests` directory and currently covers:

- homepage and all six project routes on desktop and 390px mobile;
- broken evidence images and horizontal overflow;
- **any** axe violation on the desktop route set;
- reduced motion;
- keyboard navigation;
- JavaScript-disabled progressive enhancement;
- Iteration 7 service-anchor, direct-support and contact-conversion semantics;
- Iteration 8 canonical, structured-data, machine-readable, sitemap and robots semantics.

Do not narrow this suite when an iteration ends. Lighthouse is a comparative lab signal, not a substitute for behavioral checks. Interpret score changes with the report's CPU `benchmarkIndex`, payload/chunk changes and actual runtime behavior before modifying useful content merely to chase a score.

## Content model
Keep professional content centralized under `data/`. Adding a job, certification, skill, service or project should not require redesigning components. Homepage omission does not mean a fact should disappear from the governed source registry; strategic curation and truth completeness are separate concerns.

`data/case-studies.ts` is the curated runtime narrative projection for project-detail routes. It may deepen a project with current public repository evidence, but it does not outrank `data/source-of-truth.public.yaml` or `data/project-evidence.public.yaml`. Case-study depth is intentionally unequal: public technical projects can expose architecture, evaluation and limitations, while public-safe projects must remain narrower when evidence or publication rights are narrower. Every production case study should make its proof and its limits legible rather than padding weak evidence into visual or narrative symmetry.

## Before shipping
- reconcile `data/source-of-truth.public.yaml` with `data/public.ts`;
- reconcile project visuals/evidence against `data/project-evidence.public.yaml`;
- reconcile service proof/direct-support relationships against the same evidence registry;
- reconcile `data/case-studies.ts` against the public truth/evidence registries and its cited public project sources;
- reconcile machine-readable resources/structured data against the same public runtime claims;
- verify every indexable HTML route has the intended canonical URL;
- verify sitemap/robots and launch-readiness contracts without inventing external account state;
- verify third-party licenses and attribution;
- install with `npm ci` from the committed lockfile;
- run typecheck, lint and production build;
- run the full rendered browser/conversion/discoverability suite;
- verify JavaScript-disabled and reduced-motion readability;
- run performance/SEO checks and interpret Lighthouse with runner benchmark context;
- scan for confidential material, private facts and secrets;
- update `docs/EXECUTION_STATUS.md`.
