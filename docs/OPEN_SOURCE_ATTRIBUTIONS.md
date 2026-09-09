# Open Source & Reference Attribution Register

Updated: 2026-09-09

This document separates **visual inspiration**, **implementation patterns**, **direct code reuse**, **runtime dependencies**, and **development-only QA tooling**. A public source repository does not automatically mean its assets, branding, screenshots or design may be redistributed.

## Governing rules

1. Do not ship third-party personal assets, portraits, logos, Dribbble mockups, screenshots or project content unless rights are independently established.
2. Prefer reimplementation of a behavior over wholesale copying when the source has custom redistribution restrictions or when copying would make the site derivative.
3. When MIT/ISC/OFL/MPL or other licensed code/assets are substantially copied or distributed, preserve the notices required by the applicable license.
4. Aceternity source remains inspiration-only until an exact downloaded/source artifact and its applicable license are recorded.
5. The repository itself remains unlicensed for now. A project-level license will be chosen only after the third-party boundary is stable.
6. The committed lockfile is the package-level source of truth for exact installed dependency versions. Run a transitive license inventory before any public repository release.

## Primary reference sources

| Source | URL | Verified terms | Production classification | Allowed use in this project | Attribution / action |
|---|---|---|---|---|---|
| React Bits Portfolio | https://github.com/DavidHDev/rbp-portfolio | README permits personal/commercial end products but prohibits resale/redistribution of the template itself; no separate root LICENSE found during audit | **ADAPT / REIMPLEMENT** | Chassis ideas, Lenis behavior, pill nav, stack concept, performance/a11y patterns, project-image treatment | Do not wholesale copy or redistribute template source. Do not ship included Dribbble/personal assets. Record any future directly copied fragment individually. |
| Motion Primitives | https://github.com/ibelick/motion-primitives | **MIT**, copyright 2024 ibelick | **REFERENCE / REIMPLEMENT** | Text/motion interaction references only; no Motion runtime is currently required by the site | Preserve MIT notice if substantial source is ever copied. |
| Aceternity UI Minimal / Minimalist | https://ui.aceternity.com/website-templates | Current Aceternity license allows end products but prohibits source redistribution/template creation; Apr 7 2026 changelog called Minimalist “Completely Free and open source,” while current catalog surfaces also place templates under paid access | **INSPIRATION ONLY / HOLD CODE** | Typography, spacing, composition, microinteraction density, hero/project layout references | No production source copying until the exact artifact and terms governing that artifact are captured. |
| Kintarowwwards | https://github.com/xkintaro/kintarowwwards | **MIT**, copyright 2026 Mustafa TAŞAL (kintaro) | **ADAPT** | Categorized tech-stack structure, hover disclosure, restrained microinteraction ideas | Preserve MIT notice for substantial copied code. Do not copy personal content/branding/assets. |
| MotionFolio | https://github.com/zickrian/motionfolio | **MIT**, copyright 2026 Firdaus Zickrian | **REFERENCE / SELECTIVE ADAPT** | Reduced-motion/scroll utility and case-study sequencing references | Preserve MIT notice for substantial copied code. Do not import its broad Motion-emulation layer. |
| koloNatalie | https://github.com/kolonatalie/portfolio | **MIT**, copyright 2026 Natalia | **INSPIRATION / SELECTIVE REIMPLEMENT** | Image/text rhythm, one-shot reveal discipline, magnetic/motion feel | Prefer original reimplementation with softer values; preserve MIT notice if source is materially copied. |
| Aitezaz Portfolio | https://github.com/aitezazdev/Portfolio | **MIT**, copyright 2026 Aitezaz Sikandar | **INSPIRATION / SELECTIVE REIMPLEMENT** | Typographic confidence, mixed serif/grotesk language, page-flow and heading-transition ideas | Prefer original implementation; preserve MIT notice if source is materially copied. |

## Runtime and design dependencies

Exact installed versions are governed by `package.json` and the committed `package-lock.json`.

| Dependency | Upstream | License / status | Notes |
|---|---|---|---|
| Next.js | https://github.com/vercel/next.js | MIT | Production framework; hardened to the supported 16.3.4 baseline in Iteration 6. |
| React / React DOM | https://github.com/facebook/react | MIT (upstream package) | Runtime UI framework. |
| Lenis | https://github.com/darkroomengineering/lenis | MIT | Optional smooth scrolling; reduced-motion mode disables smooth-scroll ownership. |
| Lucide | https://github.com/lucide-icons/lucide | ISC; some Feather-derived icons carry MIT notice | Interface icons; keep upstream notices in dependency distribution. |
| Tailwind CSS | https://github.com/tailwindlabs/tailwindcss | MIT | Styling infrastructure. |
| Manrope | Google Fonts `ofl/manrope` | SIL OFL 1.1 | Sans family; preserve OFL/copyright notice when redistributing font files. |
| Newsreader | Google Fonts `ofl/newsreader` | SIL OFL 1.1 | Serif family; preserve OFL/copyright notice when redistributing font files. |

### Removed / not installed

| Dependency | Status | Reason / boundary |
|---|---|---|
| Motion | **REMOVED** | Iteration 6 found the remaining Motion usage unnecessary. Core content no longer depends on client-side reveal state. |
| Matter.js | **REMOVED** | Optional/game-like interaction infrastructure was unused and did not justify its dependency surface. |
| next-themes | **REMOVED** | Theme infrastructure was unused; current production system remains intentionally light. |
| OGL | **NOT INSTALLED** | Removed during reference/licensing audit because no concrete WebGL need justified retaining it; exact package terms must be verified before reintroduction. |
| GSAP | **NOT INSTALLED** | Add only if a concrete choreography justifies the dependency and current commercial terms are re-checked. |

## Development-only QA tooling

These packages are not shipped as the site's browser runtime; they exist to validate the production artifact.

| Tool | Upstream | License / status | Use |
|---|---|---|---|
| Playwright | https://github.com/microsoft/playwright | Apache-2.0 | Chromium rendered QA, desktop/mobile layout, keyboard, reduced-motion and JavaScript-disabled tests. |
| axe-core / @axe-core/playwright | https://github.com/dequelabs/axe-core-npm | MPL-2.0 package family | Automated serious/critical accessibility checks in the rendered browser suite. |
| Lighthouse | https://github.com/GoogleChrome/lighthouse | Apache-2.0 | Performance, accessibility, best-practices, SEO and agentic-browsing benchmarking. |
| ESLint | https://github.com/eslint/eslint | MIT | Static linting. Current 9.39.1 pin is deliberate because the tested Next.js 16.3.4 React-plugin stack crashes under ESLint 10 rule loading. |
| Prettier | https://github.com/prettier/prettier | MIT | Formatting. |
| TypeScript | https://github.com/microsoft/TypeScript | Apache-2.0 | Static typing. |

## Third-party asset policy

Never ship reference-site assets merely because the source code is available. This includes:
- Dribbble placeholder project images in React Bits;
- reference-site portraits;
- reference-site logos/marks;
- personal project screenshots owned by reference authors;
- paid-template assets from Aceternity;
- sound files, photographs, illustrations or fonts whose asset license differs from the source-code license.

Mohammed-owned or explicitly public-safe project evidence should be the default visual material.

## Release gate

Before a public repository or production release:
- generate a dependency/transitive license inventory from the committed lockfile;
- verify OGL's exact installed-package terms if OGL is ever reintroduced;
- re-check GSAP terms if GSAP enters production;
- verify every copied/adapted source fragment has a recorded origin and required notice;
- verify all visual assets have provenance/permission;
- decide the license, if any, for Mohammed-authored repository code;
- create a consolidated `THIRD_PARTY_NOTICES` file if distribution requires it.
