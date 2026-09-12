# Phase G — Writing, Opportunity & Footer

**Program:** Frontend Rebuild — Visual Identity & Homepage Architecture  
**Phase:** G  
**Status:** IMPLEMENTATION ACTIVE  
**Created:** 2026-09-12

## Objective

Replace the remaining long-form homepage close — detailed Services cards, typographic Writing list, oversized Contact block and thin utility footer — with one compact closing system that follows the accepted **Cinematic Systems × Spatial Evidence × Kinetic Density** direction.

Home should end with curiosity, a clear next action and an intentional directory. Detailed service proof moves to `/services`; full writing remains at `/writing`.

## Inputs reviewed

- accepted Phase C prototypes, especially Kinetic Density's compact CTA grammar;
- Phase D visual system and credibility compression rules;
- Phase E spatial evidence weighting;
- Phase F transformation-system rhythm;
- current evidence-backed writing hub;
- governed service/conversion contract from Iteration 7;
- Phase A requirement to migrate canonical service anchors from `/#service-*` to `/services#service-*`.

No new visual language is introduced for its own sake. Phase G is a closing composition problem inside the already accepted system.

## Focused composition comparison

### A — Editorial writing wall

Two large essay rows followed by a separate contact section.

**Strength:** strongest editorial clarity.  
**Risk:** recreates the old giant-heading / row-list / giant-heading rhythm and spends too much height on prose.

**Decision:** reject as production structure.

### B — Kinetic signal deck

Two evidence-led writing tiles, each with a subject-derived visual, followed immediately by a compact two-path opportunity block and an integrated footer directory.

**Strength:** compresses writing and conversion while changing visual grammar; preserves direct access to `/writing`, `/services`, email, LinkedIn and GitHub.  
**Risk:** can become generic card UI if every tile is boxed identically.

**Decision:** selected foundation.

### C — Single dark terminal close

Writing, opportunity and footer merged into one uninterrupted dark systems panel.

**Strength:** strongest cinematic ending and shortest total height.  
**Risk:** overextends the dark systems vocabulary already used by the Hero and Phase F; weakens page rhythm and makes writing feel secondary.

**Decision:** use only selectively for the final opportunity/footer band, not the whole close.

## Production composition

### 1. Thinking signal

- exactly two homepage essays;
- visual evidence is subject-derived rather than decorative;
- Forecasting uses a compact calibration plot derived from Presaira public evidence;
- Oil Spill uses the public SAR case-study image and metric signal;
- article title, topic and read time remain immediately legible;
- one compact `All writing` route action.

### 2. Opportunity split

Two truthful paths only:

- **Hiring for a technical/data/product role?** → email / LinkedIn / inspect work;
- **Have a system or product problem worth solving?** → `/services` / email.

Do not rebuild the four service cards on Home.

### 3. Footer as directory

Footer is a real navigation surface, not a copyright afterthought. It exposes the intentional destinations omitted from Home while keeping the visible set small:

- Work
- How I work
- Services
- Writing
- Email
- LinkedIn
- GitHub

A future `/about` link replaces the temporary Home method target in Phase H.

## Service-route migration

Phase G creates dedicated English and Arabic service routes so project/service conversion no longer depends on service cards living on Home.

Required contract changes:

- `/services#service-<id>` becomes the English canonical service context;
- `/ar/services#service-<id>` becomes the Arabic visible service context;
- project case-study links migrate to those routes;
- structured/machine-readable service URLs migrate to `/services`;
- sitemap gains reciprocal EN/AR services routes;
- service proof remains server-rendered and no-JS-safe;
- existing `data-conversion` and `data-service-id` analytics semantics are preserved.

## Motion

- writing visuals may use restrained plot/dataset motion only when motion is enabled;
- hover/focus changes hierarchy, never hides information;
- opportunity arrows may translate a few pixels;
- reduced motion removes all decorative animation while preserving the same information and controls.

## Acceptance criteria

Phase G is acceptable only if:

1. the four detailed service cards are absent from English Home;
2. Home previews exactly two evidence-led essays;
3. the close contains two clear opportunity paths, not a service catalogue;
4. footer acts as an intentional route directory;
5. `/services` and `/ar/services` expose all four governed service anchors;
6. project-to-service links resolve to dedicated service routes;
7. no-JS, keyboard, reduced-motion, mobile overflow and axe checks pass;
8. the closing sequence is materially shorter and visually different from the old Writing + Contact stack;
9. rendered desktop/mobile captures are inspected before merge.

Phase G does **not** yet remove Experience, Credentials or Additional Experience from Home; those move in Phase H when `/about` is built, avoiding a temporary loss of human-readable chronology.
