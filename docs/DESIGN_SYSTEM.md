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

The current generic grid/orbit/sparkline `ProjectVisual` is a temporary scaffold, not a production pattern.

### Shared rules across project treatments

- Keep common typography, spacing, motion timing and navigation language so the site remains one authored system.
- Let the evidence interaction vary by project instead of giving every project a different visual brand.
- Never fabricate a screenshot, metric, client dataset or product state for compositional symmetry.
- Public-safe conceptual diagrams must look like diagrams, not hidden-product screenshots.
- Each animated treatment needs a truthful static fallback for reduced motion and constrained mobile contexts.
- Prefer one excellent evidence interaction per project over several decorative effects.

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
- identical project cards;
- decorative complexity that competes with Mohammed's work;
- fabricated evidence or screenshot-like conceptual art;
- forcing confidential work into fake visual proof.
