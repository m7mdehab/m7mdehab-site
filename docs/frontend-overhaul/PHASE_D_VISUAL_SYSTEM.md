# Phase D — Visual System Foundation + Hero + Navigation + Credibility Rail

**Program:** Frontend Rebuild — Visual Identity & Homepage Architecture  
**Status:** ACTIVE  
**Started:** 2026-09-12  
**Authority:** Mohammed Ehab ElNomany

## 1. Production direction

Phase C is accepted. Production is not a copy of any single prototype.

The locked system is:

> **Cinematic Systems × Spatial Evidence × Kinetic Density**

Responsibilities:

- **Cinematic Systems** — identity, atmosphere, hero memory point, systems vocabulary.
- **Spatial Evidence** — heterogeneous evidence composition and project weighting.
- **Kinetic Density** — compression, navigation, secondary information, mobile and reduced-motion discipline.

Phase D changes the actual English homepage foundation. The lower legacy sections remain temporarily during this checkpoint so existing evidence/conversion contracts keep functioning while Phases E–H replace them deliberately. Their temporary presence is not a reversal of the target IA.

## 2. Visual tokens

### Typography

Keep the existing font infrastructure:

- **Manrope Variable** — interface, body, labels, numbers, navigation.
- **Newsreader Variable** — selective editorial emphasis, identity moments, not every heading.

Production rules:

- only the hero name may approach spectacular display scale;
- ordinary section headings target one or two desktop lines;
- small text floor increases to approximately 12–13px;
- body copy remains approximately 16–18px depending on context;
- project titles receive their own lower display ceiling;
- italic Newsreader emphasis remains sparse and semantic.

### Core surfaces

- `--ov-ink: #0b0d10` — cinematic foundation.
- `--ov-ink-2: #15191f` — raised dark surface.
- `--ov-paper: #f3f1ea` — retained warm editorial surface.
- `--ov-paper-2: #e7e3d8` — soft paper transition.
- `--ov-white: #f8f8f5` — high-contrast foreground.
- `--ov-muted-dark: #a9afb8` — secondary copy on ink.
- `--ov-muted-light: #676862` — secondary copy on paper.
- `--ov-line-dark: rgba(255,255,255,.14)`.
- `--ov-line-light: rgba(11,13,16,.14)`.

Project accent colors remain evidence-specific. Phase D hero may borrow a cool forecasting blue and restrained SAR green as evidence cues, but the palette must not become a generic neon gradient system.

### Grid and width

- content max: approximately 1440px;
- desktop side gutter: 24–48px depending on viewport;
- 12-column mental model, implemented only where it improves composition;
- hero copy and atlas occupy different visual fields rather than one centered stack;
- avoid arbitrary viewport-height sections after the hero.

### Spacing

Use a compact stepped scale instead of one universal section padding:

- `8 / 12 / 16 / 24 / 32 / 48 / 64 / 88 / 120`;
- major transitions may reach 120px on large desktop;
- dense related modules stay in the 48–88px range;
- content determines height wherever possible.

### Borders and radii

- thin 1px boundaries;
- square-to-soft geometry rather than giant pill/card language;
- small controls may be pill-shaped;
- evidence fragments: roughly 14–22px radius;
- major containers: maximum roughly 24px unless the geometry has a specific reason.

### Background treatment

Allowed:

- technical grid;
- subtle paper grain/noise if cheap and nonessential;
- evidence-derived contour/line language;
- deliberate dark-to-paper chapter transitions.

Rejected:

- random glowing balls;
- generic purple/blue SaaS gradients;
- decorative node diagrams unrelated to real work;
- heavy glassmorphism.

## 3. Motion grammar

One primary timing family:

- standard reveal: 520–760ms;
- emphasized atlas settle: 900–1200ms;
- hover/focus: 180–320ms;
- default easing: `cubic-bezier(.22,1,.36,1)`.

Motion responsibilities:

- reveal hierarchy;
- communicate atlas depth/state;
- signal interactive affordance;
- keep the credibility rail moving slowly enough to read.

No semantic content depends on animation.

`prefers-reduced-motion: reduce` requirements:

- rail animation stops;
- evidence fragments stop drifting/parallax behavior;
- nav remains available;
- all content remains present and readable;
- no forced smooth-scroll ownership.

## 4. Hero production contract

The hero is rebuilt around a compact evidence atlas, not around an oversized name alone.

It must communicate in the first viewport:

1. **Who:** Mohammed Ehab ElNomany.
2. **What:** Data · AI · Product.
3. **Value:** complex data/business problems → reliable systems, models, analytics and products.
4. **Proof vocabulary:** forecasting/calibration, computer-vision/SAR evidence, governed-agent/system stages.
5. **Action:** explore selected work and discuss an opportunity.

The evidence atlas uses only motifs supported by existing public project evidence:

- Presaira probability/calibration curve language;
- Oil Spill Detection SAR image/evaluation language;
- OpportunityOS truth/provenance/workflow language.

The composition must have no empty half-screen and must remain understandable before animation completes.

## 5. Navigation contract

English primary navigation becomes:

- Work
- About
- Writing
- Contact
- AR

The M7 mark remains the top/home affordance.

The existing scroll-aware floating behavior is retained in principle:

- visible near top;
- yields while scrolling down;
- returns on upward intent/focus;
- persistent under reduced motion.

The new nav should be smaller and visually compatible with the dark hero without becoming a glass-heavy decorative object.

Services are removed from primary navigation and exposed contextually later.

## 6. Credibility rail decision

### Selected structure

Use **one shallow rail** with explicit semantic grouping rather than two stacked rails.

The loop contains two groups:

- **Experience across** — Network International, Al Tayseer, Orcas, NARSS, Zewail City.
- **Learning & credentials** — McKinsey Forward, Udacity / ITIDA, Canadian International College, ExploreAI / ALX.

Each item retains its precise relationship in accessible text: employment, teaching, internship, credential, education or scholarship.

### Asset policy

The rail does not invent logos.

Initial production implementation uses restrained **typographic fallbacks** for organizations whose mark-reuse permission is not established. This is intentional, not a placeholder accident.

A public McKinsey media page explicitly states that its logo should not be used without prior permission, therefore the McKinsey Forward item remains typographic unless permission or an authorized badge asset is supplied.

For other entities, official-site presence confirms identity but does not automatically grant mark-reuse rights. Their names may be rendered typographically until an explicit reusable asset or user-supplied authorized file exists.

This policy satisfies the truth rule: absence of a licensed logo is preferable to a fabricated or misleading mark.

### Motion

- continuous right-to-left loop;
- duplicated track for seamless reset;
- 34–46 second cycle depending on viewport;
- pause on hover/focus-within;
- subtle edge mask;
- reduced motion: static/touch-scrollable layout.

The rail is never labelled `Trusted by`.

## 7. Accessibility and performance

- semantic heading order preserved;
- hero evidence that carries meaning receives accessible text; decorative lines are hidden;
- all CTA targets remain keyboard reachable;
- visible focus treatment survives dark and light surfaces;
- no horizontal overflow at 390px;
- hero image usage stays limited and reuses already-governed local project evidence;
- no new animation/runtime library is required for Phase D.

## 8. Phase D implementation sequence

1. Add scoped production visual-system CSS after existing refinement CSS.
2. Add production `SystemHero` and `CredibilityRail` components.
3. Replace only the English Home hero and insert the rail.
4. Reduce English primary navigation.
5. Add Phase D browser regression tests for identity, rail semantics, motion fallback, nav reduction and mobile overflow.
6. Run typecheck, lint, build and full Playwright suite.
7. Capture desktop/laptop/mobile rendered QA.
8. Critique and correct before Phase D acceptance.

## 9. Acceptance gate

Phase D is accepted only when rendered review confirms:

- the new hero is recognizably more distinctive than Iteration 13;
- evidence, not typography alone, creates the memory point;
- first-screen comprehension is fast;
- nav is compact and collision-safe;
- credibility rail is shallow, readable and semantically truthful;
- reduced motion is complete;
- mobile has no overflow or collapsed evidence hierarchy;
- CI remains green.

Until that rendered gate passes, Phase E remains not started.
