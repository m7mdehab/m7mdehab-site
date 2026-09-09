# Design System — Working Direction 2026-09-09

## Status
The previous "Editorial Systems" concept and its 4.5/10 creativity ceiling are superseded by the latest explicit direction. They remain historical reference only.

The production direction is now a hybrid system synthesized from React Bits Portfolio, Motion Primitives, Aceternity, Kintarowwwards, MotionFolio, koloNatalie and Aitezaz.

## Experience target
Professional, minimal, clean, visual, typography-led and naturally flowy.

The site should feel:
- polished rather than corporate;
- expressive rather than loud;
- interactive rather than gimmicky;
- visual rather than document-like;
- calm enough to read;
- memorable enough to increase awareness;
- approachable enough to encourage contact.

## Visual priorities
1. Exceptional typography and font pairing.
2. Large, high-quality project imagery and real product evidence.
3. Generous whitespace and strong visual rhythm.
4. Controlled asymmetry where it improves composition.
5. Clear hierarchy with short, high-impact copy.
6. Distinct project treatments instead of repeated cards.
7. Strong light/dark behavior only if it genuinely enhances the experience.

## Motion philosophy
Motion should be concentrated around state change:
- page load / reveal;
- entering a section;
- hovering or focusing work;
- opening a project;
- navigation transitions;
- CTA interaction;
- selective image or text transitions.

Preferred motion qualities:
- smooth;
- soft acceleration/deceleration;
- short travel distances;
- masked text reveals;
- subtle parallax;
- image scale/clip transitions;
- magnetic behavior on a very small number of high-value controls;
- one coherent page-transition language.

Avoid constant ambient motion unless extremely subtle and performance-safe.

Iteration 6 tightened this philosophy into a progressive-enhancement rule: **motion may enhance content that is already visible, but it may not own the initial visibility of substantive narrative or evidence**. Server-rendered content must remain readable when JavaScript is unavailable. Reduced-motion mode must remove motion ownership rather than merely shorten animation duration.

## Imagery
Real project visuals are primary design material:
- Presaira: forecasting/product UI, probability/analytics visuals;
- OpportunityOS: public-safe architecture/product UI;
- Ghareeb Oglu: product/ecommerce/brand/product imagery;
- Makhbazy: mobile-product and UI/UX imagery;
- Oil Spill Detection: SAR imagery / segmentation / technical validation;
- Solar Site Selection: maps / geospatial decision visuals.

Decorative visuals may support, but must not replace real evidence.

Use `data/project-evidence.public.yaml` as the project-visual provenance registry. Internal/project-source availability is not the same as publication permission.

## Evidence-first project visual grammar

The projects share one brand system, but they must not share one generic evidence animation. Their visual behavior should match the type of proof each project actually contains.

| Project | Primary visual verb | Evidence direction |
|---|---|---|
| Presaira | Plot / evolve | real probability trajectories, product UI, calibration/evaluation |
| OpportunityOS | Trace / authorize | public-safe provenance, truth authority and controlled-action flow |
| Ghareeb Oglu | Reveal / browse | current live storefront/product experience; cleared brand imagery only |
| Makhbazy | Sequence / progress | mobile journey/product design; internal screens only if publication rights are explicit |
| Oil Spill Detection | Compare / detect | SAR → segmentation/detection + oil-specific evaluation |
| Solar Site Selection | Layer / rank | AOI/criteria → suitability map → ranked decision output |

The generic grid/orbit/sparkline `ProjectVisual` was an Iteration 3 scaffold and is superseded by the evidence-specific treatments introduced in Iteration 4.

### Shared rules across project treatments

- Keep common typography, spacing, motion timing and navigation language so the site remains one authored system.
- Let the evidence interaction vary by project instead of giving every project a different visual brand.
- Never fabricate a screenshot, metric, client dataset or product state for compositional symmetry.
- Public-safe conceptual diagrams must look like diagrams, not hidden-product screenshots.
- Each animated treatment needs a truthful static fallback for reduced motion and constrained mobile contexts.
- Prefer one excellent evidence interaction per project over several decorative effects.

## Evidence-first case-study grammar

Project-detail pages are not expanded résumé entries and are not six long-form clones. They use one shared editorial narrative system with intentionally unequal depth according to the available public proof.

Default sequence:
1. **Thesis** — the interesting problem or judgment behind the project, expressed in one strong editorial statement.
2. **Challenge** — why the problem is non-trivial and what can go wrong.
3. **Role & scope** — what Mohammed actually owned or what the public project demonstrably spans; never inflate supervised delivery into sole coding.
4. **Approach** — a short sequence of the system decisions that earn the result.
5. **Evidence** — metrics, artifacts, public product state or governed ownership proof that can actually be checked.
6. **Limits & boundaries** — limitations, publication constraints and claims the case study explicitly refuses to make.
7. **Publication boundary / sources** — link outward to public evidence where it exists and state why private/internal material is absent where relevant.
8. **Next project** — preserve narrative momentum without modal-only navigation or scroll hijacking.

Case-study visual rhythm should stay close to the Natalie + Aitezaz calibration: large editorial statements, generous space, strong image/data moments and controlled asymmetry. The deeper page may feel richer than the homepage, but it must not become an immersive microsite or mini-game.

### Case-study truth rules

- Unequal evidence density is a feature, not a layout defect.
- Public technical projects may expose architecture, tests, evaluation and documented limitations when their repositories support those claims.
- Public-safe projects may be deliberately shorter and more ownership/journey oriented.
- A limitations section is proof of rigor when it reflects the project's real documented constraints; it is not a place to invent generic caveats.
- Do not manufacture business KPIs, user counts, conversion uplift, revenue or client outcomes merely to make a case study feel complete.
- Keep all substantive narrative as semantic server-rendered text; visuals and motion are enhancement layers.

## Rendered mobile grammar

Iteration 6 replaces assumption-based responsive review with rendered constraints:

- 390px is a mandatory browser QA width for the homepage and all six case studies.
- Long project names, eyebrow labels and next-project navigation must be allowed to shrink and wrap; CSS Grid/Flex children that can contain long text should use `min-width: 0` where required.
- Do not hide layout defects with a global `overflow-x: hidden`; horizontal overflow tests should identify the responsible element.
- Project evidence must remain legible at mobile sizes without replacing real proof with generic decoration.
- Touch/reduced-motion fallbacks should preserve the evidence hierarchy rather than merely remove animation.

## Service-proof visual rule

The four primary service propositions have intentionally unequal public visual evidence.

### Data migration & reconciliation
Strong experience and skills evidence; confidential enterprise work means public screenshots are limited. Use credibility, methods and outcomes. Any process visual must be clearly generic and must not reconstruct client systems, banks, data or proprietary workflows.

### Analytics & Power BI
Strong experience and skills evidence, but no currently verified publishable Power BI dashboard asset. Do not label Presaira/Solar analytics as Power BI. Use experience-backed proof until a real publishable dashboard is available.

### ML & AI product development
Strong public visual proof from Presaira, OpportunityOS, Oil Spill Detection and Solar Site Selection. Lead with the real systems rather than generic AI imagery.

### Product & web development
Strong cross-project proof from Ghareeb Oglu, Makhbazy, Presaira, Oil Spill Detection and Solar Site Selection. Present this as end-to-end product delivery, not a narrow frontend/web-design service.

Do not force four service cards to have identical screenshot density or visual weight merely for symmetry.

## Skills / stack
Skills are a substantive section, not an icon wall. Use grouped, tactile, compact interactions inspired by React Bits and Kintarowwwards. Preserve semantic text for crawlers, AI systems and accessibility.

## Non-negotiable product constraints
Aesthetic treatments lose if they materially damage:
- crawlability;
- AI extractability;
- SEO;
- Core Web Vitals;
- accessibility;
- clarity;
- conversion;
- mobile usability.

## Anti-patterns
- CV/resume page composition as the dominant experience;
- generic portfolio bento grids;
- meaningless logo walls;
- excessive glassmorphism;
- neon developer styling;
- giant terminal motifs;
- gratuitous 3D;
- scroll hijacking;
- continuous motion everywhere;
- animation for animation's sake;
- animation-gated semantic content;
- identical project cards;
- decorative complexity that competes with Mohammed's work;
- fabricated evidence or screenshot-like conceptual art;
- forcing confidential work into fake visual proof.
