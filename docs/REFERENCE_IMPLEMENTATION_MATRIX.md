# Reference Implementation Matrix — Locked after Iteration 1

Updated: 2026-09-09

This matrix converts reference research into explicit production decisions. **Reference** does not mean **code donor**. The final site must remain recognizably Mohammed-native and may combine ideas from several rows in one component.

Legend:
- **ADOPT** — compatible source can be used/adapted with required notice.
- **ADAPT** — retain the principle; rework implementation substantially.
- **INSPIRE** — visual/behavioral reference only; independently implement.
- **RESERVE** — optional enhancement pending real-content/performance validation.
- **REJECT** — do not bring into the production direction.

| Surface / behavior | Source(s) | Classification | Exact production decision | Performance / mobile / a11y rule |
|---|---|---|---|---|
| Overall application chassis | React Bits Portfolio + custom | **ADAPT** | Keep Next/React/Motion/Lenis alignment and edge-friendly discipline; our IA, data model, routes and design remain original | Server/semantic content first; animated layers are enhancements |
| Runtime motion engine | Motion Primitives / Motion | **ADOPT** | Motion is the default runtime for reveals, layout continuity, spring states and microinteraction | Respect reduced motion globally; avoid unnecessary client boundaries |
| Advanced timeline/split text | MotionFolio + Natalie + Aitezaz / GSAP | **RESERVE** | Add GSAP only for a concrete interaction Motion cannot express cleanly; never build a second generic motion framework | Lazy-load where possible; no broad ScrollTrigger registration without need |
| Smooth scrolling | React Bits + MotionFolio / Lenis | **ADAPT** | Lenis as a subtle polish layer, not navigation logic | Disable for reduced motion; preserve native anchors; reliable RAF/listener teardown |
| Primary navigation | React Bits pill nav + Motion Primitives | **ADAPT** | Compact floating navigation with spring-active state; custom labels/IA and mobile treatment | Full keyboard/focus support; touch targets; no hover dependency |
| Theme transition | React Bits | **RESERVE** | View-transition reveal only if light/dark modes materially improve final design | No animation under reduced motion; graceful unsupported-browser fallback |
| Hero composition | Aceternity + Aitezaz + Natalie + custom | **INSPIRE** | Typography-led hero with one restrained signature visual/interaction and concise positioning | H1 remains real semantic text; no blocking preloader |
| Hero heading reveal | Motion Primitives + Aitezaz | **ADOPT / ADAPT** | Default to word/line reveal; mixed serif/sans accent vocabulary can be custom-designed | Accessible full text always present; no aggressive per-character animation by default |
| Section reveals | Motion Primitives + Natalie | **ADOPT / ADAPT** | Centralized one-shot fade/translate/mask vocabulary with short travel and low blur | Reduced-motion returns immediate static content; avoid layout shifts |
| Magnetic CTA | Motion Primitives | **ADOPT** | Use on only a few high-value desktop/fine-pointer controls | Disable/neutralize for touch and reduced motion; do not attach many global mouse listeners |
| Progressive blur | Motion Primitives | **RESERVE** | Localized image/modal edge only if visually useful | Profile GPU/compositor cost; no site-wide stack of backdrop filters |
| Project overview | React Bits + Natalie + custom | **ADAPT** | Large visual-first treatments, but each flagship project gets a different composition and proof narrative | Real assets only; responsive image sizing; semantic title/summary/link |
| Project hover | React Bits + Motion Primitives | **ADAPT** | Small image scale/clip/metadata response; no excessive cursor chasing | Equivalent focus state and touch behavior |
| Project open transition | Aitezaz + Motion Primitives | **RESERVE** | Shared-image/morph/mask continuity only if it improves wayfinding into canonical case-study pages | Case study URL/content works without transition; no modal-only SEO content |
| Morphing project preview | Motion Primitives | **RESERVE** | Optional preview on selected work, not required for access | Preserve focus trap, Escape and return focus; mobile must remain simple |
| Skills / stack structure | Kintarowwwards + custom data | **ADAPT** | Mohammed-native categories with visible readable text, compact icons where useful and optional disclosure | This semantic list is canonical on every device |
| Skills physics layer | React Bits / Matter.js | **RESERVE** | Optional progressive enhancement on larger fine-pointer devices after profiling | Dynamic import; static fallback; no `touchAction:none` requirement on core mobile content |
| Stack hover cards | Kintarowwwards + Motion Primitives | **ADAPT** | Subtle color/emphasis or concise contextual disclosure | No essential info hidden behind hover; keyboard/focus alternative |
| Capability section | Aceternity minimal composition + custom | **INSPIRE** | Large typographic capability rows with brief outcome-oriented descriptions | Low DOM/chrome; semantic headings and visible text |
| Experience | React Bits + custom | **ADAPT** | Compact high-credibility timeline/list, not a CV dump | Network International stays public-safe; mobile linearizes cleanly |
| Certifications | Aceternity + custom | **INSPIRE** | Separate visual credential module; avoid generic badge wall | Issuer/name/date/credential links remain semantic |
| Education | Aceternity + custom | **INSPIRE** | Separate calm module, visually related but distinct from certifications | Semantic institution/degree/date content |
| Additional experience | Custom | **ADOPT ORIGINAL** | Teaching/mentoring supports communication evidence without dominating identity | Plain readable content; no decorative complexity required |
| About / working approach | Natalie + custom | **INSPIRE** | Human, concise, visually breathable narrative with selective image only if strong | No portrait dependency; body typography optimized for reading |
| Services | Aceternity composition + custom | **INSPIRE** | Problem/outcome/proof conversion layer, not freelancer package cards | Descriptive links connect service relevance to project evidence |
| Writing preview | Custom + minimal references | **ADOPT ORIGINAL** | Small authority layer with high-quality article previews | Crawlable titles/excerpts/authorship and strong internal linking |
| Contact CTA | React Bits + Motion Primitives + custom | **ADAPT** | Strong closing statement, direct channels, one restrained magnetic/hover treatment | Email/LinkedIn/GitHub work without JS; no hidden contact path |
| Custom cursor | Aitezaz / Kintarowwwards / Natalie | **REJECT DEFAULT / RESERVE** | Native cursor remains default unless a future project-specific mode clearly improves interaction | Never suppress expected touch/pointer behavior |
| Preloader | Aitezaz / Kintarowwwards | **REJECT** | Do not delay access to content for branding animation | Better LCP, crawlability and perceived speed |
| Sound | Natalie | **REJECT DEFAULT** | No ambient/interface sound in baseline product | Only reconsider as explicit opt-in feature with accessible control |
| Particles / decorative physics | Kintarowwwards | **REJECT DEFAULT** | Do not use as generic atmosphere | Prevent needless CPU/GPU cost and visual noise |
| WebGL shader/background | React Bits / OGL | **HOLD / RESERVE** | Only reconsider after OGL package-license verification and once a concrete visual need exists | Isolated, pausable, DPR-capped, offscreen-stopped; static fallback mandatory |
| Case-study sequence | MotionFolio + Aitezaz + custom evidence model | **ADAPT** | Use deliberate narrative pacing and real evidence; unique visual treatment per project | No pinned-scroll dependency for comprehension; semantic content complete |
| Case-study content model | Existing project governance | **ADOPT ORIGINAL** | Problem/context/role/constraints/approach/evidence/results/lessons/public links as supported | No fabricated results; confidential details excluded |
| Mobile experience | Custom informed by all references | **ADOPT ORIGINAL** | Design a first-class mobile layout rather than shrinking desktop spectacle | No hover-only interaction, no forced physics/WebGL, preserve visual hierarchy |
| Reduced-motion mode | React Bits + MotionFolio + custom | **ADOPT / HARD RULE** | Disable smooth/state choreography and expose content immediately | Feature parity in information and navigation |
| SEO / AI extractability | Existing governed architecture | **ADOPT ORIGINAL** | SSR/static meaningful content, schema, sitemap, robots, machine-readable profile/projects/llms outputs | Visual animation never becomes the only carrier of important content |

## Source-level reuse boundary

### Safe for selective code adaptation with notice
- Motion Primitives — MIT
- Kintarowwwards — MIT
- MotionFolio — MIT
- koloNatalie — MIT
- Aitezaz — MIT

Even where code reuse is legally possible, prefer original implementation when it prevents a derivative feel or avoids unnecessary architecture.

### Reimplement rather than import wholesale
- React Bits Portfolio — commercial end-product use is permitted by its README, but template redistribution is prohibited. Because this repository may later become public, use its implementation as a technical reference and reimplement relevant behaviors.

### Inspiration-only until clarified per artifact
- Aceternity Minimal / Minimalist — current licensing/access surfaces are not sufficiently unambiguous for us to treat the exact current template as freely redistributable source.

## Dependency decisions

- **Motion:** production default.
- **Lenis:** production candidate, restricted to optional smooth scroll.
- **Matter.js:** optional enhancement only; dynamic import when used.
- **GSAP:** add only when an identified animation requires it.
- **OGL:** hold from production use until the exact installed-package license is verified.

## Asset rule

No reference-site/project assets are reusable by implication. All production visuals must come from Mohammed-owned/public-safe evidence, separately licensed assets, or original generated/designed material with documented provenance.
