# Reference System — 2026-09-09

## Governing rule
The production site is not a reskin of any single template or personal website. It is a deliberately composed system that selects the strongest legitimate ideas and implementations from multiple references, then reworks them around Mohammed Ehab ElNomany's content, goals, evidence, brand, SEO/AI visibility requirements, accessibility and performance constraints.

See also:
- `REFERENCE_AUDIT_2026-09-09.md` — implementation findings;
- `REFERENCE_IMPLEMENTATION_MATRIX.md` — component/surface decisions;
- `OPEN_SOURCE_ATTRIBUTIONS.md` — licensing and attribution register.

## Runtime architecture decision

### Motion is primary
Use Motion as the default animation runtime for:
- in-view reveals;
- spring state transitions;
- layout continuity;
- restrained magnetic interactions;
- small hover/focus responses;
- page/project continuity where suitable.

### GSAP is exceptional
GSAP/ScrollTrigger may be added only when an identified effect is materially better served by timeline/split-text/complex-scroll choreography. Do not create a second general motion abstraction beside Motion.

### Lenis is optional polish
Smooth scrolling must:
- preserve native document semantics and anchors;
- never become scroll hijacking;
- opt out under reduced motion;
- cleanly tear down its RAF/listeners.

### Expensive effects are progressive enhancement
Matter.js physics, WebGL, layered backdrop blur and custom cursor behavior are optional. The semantic/readable experience must remain complete without them.

## Primary sources

### React Bits Portfolio
Role: closest technical chassis / interaction baseline.

Use selectively for:
- smooth-scroll architecture;
- project-first visual presentation;
- skills / stack interaction concept;
- animated navigation;
- controlled shader/background performance ideas;
- magnetic CTA patterns;
- accessibility/performance safeguards.

**Reuse class: ADAPT / REIMPLEMENT.** Its README permits personal/commercial end products but prohibits redistribution of the template itself. Since this repository may later become public, do not wholesale import the source tree. Do not use included personal/Dribbble assets.

### Motion Primitives
Role: primary reusable motion vocabulary.

Use selectively for:
- text effects;
- animated groups / in-view transitions;
- magnetic interactions;
- morphing continuity;
- localized progressive blur where profiling permits;
- accessible microinteraction patterns.

**Reuse class: ADOPT / ADAPT.** MIT licensed. Preserve required notice when substantial code is copied. Use word/line animation more often than per-character spectacle.

### Aceternity UI — Minimal / Minimalist references
Role: layout, typography, spacing, section composition and selected effects.

Use selectively for:
- hero composition;
- editorial typography;
- generous whitespace;
- project/credentials composition;
- polished interaction density.

**Reuse class: INSPIRATION ONLY / CODE HOLD.** Current access/licensing signals for the exact template artifact are not sufficiently unambiguous for source redistribution. Independently implement principles; do not copy current template code until exact artifact terms are recorded.

### Kintarowwwards
Role: skills / stack and selected microinteraction reference.

Use selectively for:
- categorized visible stack content;
- muted-to-emphasized hover treatment;
- compact contextual disclosure;
- selected mobile-friendly interaction ideas.

**Reuse class: ADAPT.** MIT licensed. Its categorized semantic stack is the stronger baseline for Mohammed than physics-only chips. Replace generic frontend/backend categories with Mohammed-native capability groups.

Reject its roadmap/CV bias, particles and preloader by default.

### MotionFolio
Role: GSAP / ScrollTrigger / case-study implementation reference.

Use selectively for:
- lazy GSAP loading;
- complex timeline patterns where justified;
- case-study pacing;
- reduced-motion/scroll utility ideas;
- centralized project-data philosophy.

**Reuse class: REFERENCE / SELECTIVE ADAPT.** MIT licensed. Do not import its broad Motion-emulation layer; Motion already fills that role. Reject terminal/AI gimmicks.

### koloNatalie
Role: visual restraint and motion discipline reference.

Use for:
- image/text rhythm;
- elegant project storytelling;
- clean composition;
- one-shot reveal discipline;
- high-end creative-development tone.

**Reuse class: INSPIRATION / SELECTIVE REIMPLEMENT.** MIT licensed, but primarily use as art-direction reference to avoid derivative output. Soften its stronger travel/blur/3D reveal values for our current natural-flow target. No sound by default.

### Aitezaz
Role: flow, transitions and typographic confidence reference.

Use for:
- large-scale typography;
- mixed serif/grotesk display language;
- accessible animated-heading concepts;
- page/project transition ideas;
- cinematic-but-professional pacing.

**Reuse class: INSPIRATION / SELECTIVE REIMPLEMENT.** MIT licensed. Prefer Motion word/line reveals normally; reserve SplitText-style character choreography for a rare signature moment.

## Skills / stack synthesis
Canonical content is a categorized semantic list driven from our structured truth layer. Enhance it progressively:
1. visible categorized skill/tool text on every device;
2. subtle icon/color/hover/focus response inspired by Kintarowwwards;
3. selected Motion Primitives interaction;
4. optional React-Bits-style physics play area only on suitable fine-pointer/desktop devices after profiling.

The physics layer must never be required to discover or understand a skill.

## Project synthesis
Use real Mohammed-owned/public-safe project visuals. React Bits contributes image prominence; Natalie contributes rhythm; Aitezaz contributes transition confidence; MotionFolio contributes case-study pacing. The six flagship projects must not share one repeated card treatment.

## Selection test for every borrowed idea
An element survives only if it improves at least one of:
- visibility / memorability;
- approachability / human trust;
- recruiter comprehension;
- client conversion;
- project understanding;
- typography / visual quality;
- interaction quality;
- SEO / AI extractability;
- accessibility;
- performance.

It must not materially damage any of the other critical dimensions.

## Integration principle
Prefer a small number of exceptional interactions over a large number of animated widgets. The final site should feel naturally fluid, visually rich and intentionally authored while remaining calm enough to read and trust.

Any future direct code import must update `OPEN_SOURCE_ATTRIBUTIONS.md` in the same change.
