# Reference Implementation Audit — 2026-09-09

## Purpose

This audit converts the chosen reference pool into concrete production rules for `m7mdehab-site`. It is not a ranking exercise. Each source is evaluated for implementation value, licensing, performance, mobile behavior, accessibility and risk of making the final site feel derivative.

## Executive decisions

1. **Motion is the primary animation runtime.**
2. **GSAP is exceptional, not parallel-default infrastructure.** Use it only for interactions where Motion is materially inferior, such as advanced split-text choreography or complex scroll timelines.
3. **Lenis is allowed as a polish layer, not scroll hijacking.** It must opt out for reduced motion and have reliable RAF teardown.
4. **Skills/stack is semantic first.** Categorized readable text is the baseline; physics is an optional desktop enhancement, never the only representation.
5. **Real Mohammed project evidence replaces all reference/template imagery.**
6. **Aceternity is inspiration-only until exact source/license provenance is unambiguous.**
7. **React Bits is reimplemented/adapted rather than wholesale copied** because its README permits end-product use but restricts template redistribution.
8. **Natalie and Aitezaz are art-direction/motion references first**, despite their MIT code licenses, to keep the site authored rather than derivative.
9. **No custom cursor, WebGL, sound, preloader, particles or physics survives merely because a reference uses it.** Every such effect must earn its cost.
10. **Third-party assets never inherit the source-code license automatically.**

---

# 1. React Bits Portfolio

Source: `DavidHDev/rbp-portfolio`

### Useful implementation evidence inspected
- `README.md`
- `components/layout/smooth-scroll.tsx`
- `components/layout/nav.tsx`
- `components/about/stack.tsx`
- `components/projects/projects.tsx`

### Strong patterns
- Next 16 / React / Tailwind / Motion architecture closely matches our chosen stack.
- Pill navigation has a measured spring-active indicator, good focus semantics and reduced-motion-aware theme transition.
- Smooth-scroll wrapper explicitly skips Lenis under `prefers-reduced-motion` and integrates anchor navigation.
- Matter.js stack uses dynamic import, measurement, drag behavior and responsive wall repositioning.
- Project imagery is given meaningful visual weight without excessive UI chrome.
- README documents explicit WebGL performance safeguards: capped DPR, offscreen pausing, cleanup and isolated dynamic loading.

### Issues / reasons not to copy wholesale
- Project presentation is still a repeated card system. Mohammed's six flagship projects need distinct narratives and visual treatments.
- Included Dribbble imagery is placeholder-only and must never ship.
- Matter.js stack continuously animates and uses `touchAction: none`; therefore it needs fine-pointer/desktop gating and a static semantic fallback.
- Smooth-scroll implementation recursively schedules RAF but only retains/cancels the initially returned RAF id. We should implement our own clean loop or use supported Lenis auto-RAF rather than copying it verbatim.
- README grants commercial end-product use but explicitly forbids redistribution of the template. Because this repository may later be public, direct wholesale source import is undesirable.

### Decision
**ADAPT / REIMPLEMENT.**

Use it as the closest technical chassis reference, not as a source tree to transplant.

---

# 2. Motion Primitives

Source: `ibelick/motion-primitives`
License: MIT.

### Components inspected
- `magnetic.tsx`
- `text-effect.tsx`
- `progressive-blur.tsx`
- `morphing-dialog.tsx`
- registry/navigation for available primitives

### Magnetic
Strong, compact Motion-value/spring abstraction. It attaches a document-level `mousemove` listener per instance, so it should be restricted to a tiny number of high-value controls rather than used across every button/card.

**Decision:** ADOPT/ADAPT for approximately 1–3 desktop/fine-pointer controls. Neutral on touch/reduced-motion.

### Text Effect
Supports word/character/line segmentation, multiple subtle presets and a screen-reader-only full-text copy when visual segments are aria-hidden.

**Decision:** ADOPT/ADAPT as the main heading/reveal vocabulary. Prefer word/line effects; reserve per-character effects for rare signature moments. Add explicit reduced-motion behavior at our wrapper/system level.

### Progressive Blur
Creates multiple absolute backdrop-filter/mask layers. Visually useful but potentially compositor/GPU expensive.

**Decision:** RESERVE. One localized image/modal edge at most unless profiling proves it inexpensive. Never use as a site-wide visual signature.

### Morphing Dialog
Includes layout continuity, portal rendering, Escape handling, focus containment, return-focus behavior and dialog semantics.

**Decision:** RESERVE/ADAPT for project-preview/detail continuity only if it helps navigation. Full case-study pages remain canonical; no modal-only project content.

---

# 3. Aceternity UI — Minimal / Minimalist

Source: `ui.aceternity.com`

### Current licensing/access finding
The Apr 7 2026 changelog described the Minimalist Portfolio Template as "Completely Free and open source." Current Aceternity surfaces also place portfolio templates within paid/Pro access and the Aceternity license allows end-product creation while prohibiting source redistribution and template derivative resale. No authoritative public GitHub source artifact for the exact current Minimalist template was identified during this audit.

### Value to us
- typography-led composition;
- deliberate whitespace;
- low-chrome sections;
- restrained microinteraction density;
- clean mobile hierarchy;
- useful hero/project/credentials composition references.

### Decision
**INSPIRATION ONLY / CODE HOLD.**

We may independently reproduce visual principles. Do not copy current template source until the exact artifact and its applicable terms are captured and entered in the attribution register.

---

# 4. Kintarowwwards

Source: `xkintaro/kintarowwwards`
License: MIT.

### Relevant source tree inspected
- `components/effects/blur-reveal.tsx`
- `components/layout/*`
- `components/sections/hero.tsx`
- `components/sections/projects.tsx`
- `components/sections/roadmap.tsx`
- `components/sections/stack.tsx`
- `components/widgets/hanging-profile.tsx`

### Stack finding
Its stack is more useful to Mohammed as a semantic/mobile baseline than pure physics:
- explicit categories;
- compact visible icon + text rows;
- muted/grayscale resting state;
- color/scale response on hover;
- optional hover disclosure;
- clear section labeling.

### Decision
**ADAPT.**

Use the category-and-readable-text principle, but replace frontend/backend/database/tools with Mohammed-native capability groups. Combine with Motion Primitives for subtle interaction. A React-Bits-style physics area may later exist as an optional progressive enhancement, not the core stack.

### Reject by default
- preloader;
- particles;
- roadmap-as-CV structure;
- custom cursor unless later usability testing proves a genuine benefit;
- hanging-profile gimmick without a strong portrait/use case.

---

# 5. MotionFolio

Source: `zickrian/motionfolio`
License: MIT.

### Relevant implementation inspected
`src/utils/gsapAnimate.jsx` and project/source structure.

### Useful ideas
- lazy/dynamic GSAP loading;
- one abstraction point for scroll/reveal behavior;
- IntersectionObserver-based in-view behavior;
- reduced-motion hook;
- centralized data and case-study structure;
- explicit separation of project details.

### Rejected architecture
MotionFolio implements a broad Motion-like abstraction over GSAP (`Gsap`, presence handling, custom motion values, transformations and scroll helpers). We already use Motion. Importing a second animation abstraction would increase code size, cognitive load and debugging complexity without enough benefit.

### Decision
**REFERENCE / SELECTIVE ADAPT.**

Use GSAP only for special choreography. Do not copy the Motion-emulation layer. Reject terminal/AI novelty UI.

---

# 6. koloNatalie

Source: `kolonatalie/portfolio`
License: MIT.

### Relevant implementation inspected
- project architecture
- `src/hooks/useScrollReveal.ts`
- supporting hooks including sound

### Useful ideas
- centralized, data-driven reveal convention;
- one-shot ScrollTrigger reveals;
- image/text rhythm;
- good restraint relative to highly animated portfolios;
- magnetic interactions as punctuation rather than structure.

### Adjustment required
The stock reveal values are stronger than our current target: 50px travel, blur, scale-from-zero and 3D text rotation can feel demonstrative rather than naturally fluid.

### Decision
**INSPIRATION / SELECTIVE REIMPLEMENT.**

Keep the centralized reveal vocabulary, but use shorter travel, less blur, little/no 3D rotation and fewer staggered characters. Sound is rejected by default unless a future opt-in interaction makes it genuinely useful.

---

# 7. Aitezaz Portfolio

Source: `aitezazdev/Portfolio`
License: MIT.

### Relevant implementation inspected
- application/page structure
- project detail routes
- `SmoothScrollProvider`
- `HomeBanner`
- `Projects`
- `TechStack`
- custom cursor/preloader/nav
- `AnimateHeading.tsx`

### Heading finding
`AnimateHeading.tsx` is a useful reference for:
- mixing a bold grotesk vocabulary with selective serif-accent words;
- preserving an accessible semantic label while aria-hiding animated fragments;
- reduced-motion handling;
- scroll-triggered reveal timing.

Its default implementation is intentionally more theatrical: per-character split, large vertical movement and 3D rotation.

### Decision
**INSPIRATION / SELECTIVE REIMPLEMENT.**

Use the typographic contrast and accessible-reveal pattern. Prefer Motion Primitives word/line reveals for normal sections. Introduce GSAP/SplitText only for a single signature heading if testing shows it adds enough value.

---

# Cross-reference production rules

## Animation runtime
- **Primary:** Motion.
- **Secondary exceptional tool:** GSAP + ScrollTrigger only when justified.
- Avoid two overlapping motion abstraction systems.

## Smooth scroll
- Lenis enhancement only.
- Native document semantics remain intact.
- No scroll hijacking or forced scene progression.
- Skip under reduced motion.
- Ensure complete RAF/listener cleanup.

## Typography animation
- Default: short-distance fade/translate/mask, usually word or line level.
- Character splitting: rare signature moments only.
- Always preserve accessible full text.
- No animation may hide important text from crawlers or no-JS semantics.

## Skills / stack
- Semantic categorized text is canonical.
- Desktop may add tactile hover/magnetic/physics behavior.
- Touch/mobile must never depend on hover or drag.
- No giant logo wall.

## Projects
- Real Mohammed-owned/public-safe evidence only.
- No repeated six-card visual template.
- Visual treatment follows the proof story of each project.

## Expensive effects
WebGL, physics, progressive blur, custom cursor, large pinned timelines and heavy split-text must each pass:
- purpose test;
- mobile test;
- reduced-motion test;
- accessibility test;
- performance test.

## Licensing boundary
See `OPEN_SOURCE_ATTRIBUTIONS.md`. Any future direct code import must be added there in the same commit that introduces it.
