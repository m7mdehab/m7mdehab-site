# Open Source & Reference Attribution Register

Updated: 2026-09-09

This document separates **visual inspiration**, **implementation patterns**, **direct code reuse**, and **runtime dependencies**. A public source repository does not automatically mean its assets, branding, screenshots or design may be redistributed.

## Governing rules

1. Do not ship third-party personal assets, portraits, logos, Dribbble mockups, screenshots or project content unless rights are independently established.
2. Prefer reimplementation of a behavior over wholesale copying when the source has custom redistribution restrictions or when copying would make the site derivative.
3. When MIT/ISC/OFL code or assets are substantially copied or distributed, preserve the required copyright/license notices.
4. Aceternity source remains inspiration-only until an exact downloaded/source artifact and its applicable license are recorded.
5. The repository itself remains unlicensed for now. A project-level license will be chosen only after the third-party boundary is stable.
6. Run a package-level/transitive license report from the installed lockfile before any public repository release.

## Primary reference sources

| Source | URL | Verified terms | Production classification | Allowed use in this project | Attribution / action |
|---|---|---|---|---|---|
| React Bits Portfolio | https://github.com/DavidHDev/rbp-portfolio | README permits personal/commercial end products but prohibits resale/redistribution of the template itself; no separate root LICENSE found during audit | **ADAPT / REIMPLEMENT** | Chassis ideas, Lenis behavior, pill nav, stack concept, performance/a11y patterns, project-image treatment | Do not wholesale copy or redistribute template source. Do not ship included Dribbble/personal assets. Record any future directly copied fragment individually. |
| Motion Primitives | https://github.com/ibelick/motion-primitives | **MIT**, copyright 2024 ibelick | **ADOPT / ADAPT** | Preferred source for reusable text effects, magnetic interaction, morphing continuity and selected microinteractions | Preserve MIT notice when substantial source is copied. Maintain third-party notice if adapted code enters production. |
| Aceternity UI Minimal / Minimalist | https://ui.aceternity.com/website-templates | Current Aceternity license allows end products but prohibits source redistribution/template creation; Apr 7 2026 changelog called Minimalist “Completely Free and open source,” while current catalog surfaces also place templates under paid access | **INSPIRATION ONLY / HOLD CODE** | Typography, spacing, composition, microinteraction density, hero/project layout references | No production source copying until the exact artifact and terms governing that artifact are captured. |
| Kintarowwwards | https://github.com/xkintaro/kintarowwwards | **MIT**, copyright 2026 Mustafa TAŞAL (kintaro) | **ADAPT** | Categorized tech-stack structure, hover disclosure, restrained microinteraction ideas | Preserve MIT notice for substantial copied code. Do not copy personal content/branding/assets. |
| MotionFolio | https://github.com/zickrian/motionfolio | **MIT**, copyright 2026 Firdaus Zickrian | **REFERENCE / SELECTIVE ADAPT** | Lazy GSAP loading, reduced-motion/scroll utility ideas, case-study sequencing | Preserve MIT notice for substantial copied code. Do not import its broad Motion-emulation layer. |
| koloNatalie | https://github.com/kolonatalie/portfolio | **MIT**, copyright 2026 Natalia | **INSPIRATION / SELECTIVE REIMPLEMENT** | Image/text rhythm, one-shot reveal discipline, magnetic/motion feel | Prefer original reimplementation with softer values; preserve MIT notice if source is materially copied. |
| Aitezaz Portfolio | https://github.com/aitezazdev/Portfolio | **MIT**, copyright 2026 Aitezaz Sikandar | **INSPIRATION / SELECTIVE REIMPLEMENT** | Typographic confidence, mixed serif/grotesk language, page-flow and heading-transition ideas | Prefer original implementation; preserve MIT notice if source is materially copied. |

## Runtime and design dependencies

These are package/runtime dependencies rather than design-template reuse. Exact installed versions are governed by `package.json`/future lockfiles.

| Dependency | Upstream | License / status | Notes |
|---|---|---|---|
| Next.js | https://github.com/vercel/next.js | MIT | Framework. |
| React / React DOM | https://github.com/facebook/react | MIT (upstream package) | Runtime UI framework. Verify installed package metadata in release license report. |
| Motion | https://github.com/motiondivision/motion | MIT | Primary animation runtime. |
| Lenis | https://github.com/darkroomengineering/lenis | MIT | Smooth scrolling; must respect reduced motion and clean teardown. |
| Matter.js | https://github.com/liabru/matter-js | MIT | Optional desktop/fine-pointer enhancement only; not core semantic stack content. |
| next-themes | https://github.com/pacocoursey/next-themes | MIT | Theme support if retained. |
| Lucide | https://github.com/lucide-icons/lucide | ISC; some Feather-derived icons carry MIT notice | Keep upstream notices in dependency distribution. |
| Tailwind CSS | https://github.com/tailwindlabs/tailwindcss | MIT | Styling infrastructure. |
| Manrope | Google Fonts `ofl/manrope` | SIL OFL 1.1 | Current sans candidate. If font files are redistributed, preserve OFL/copyright notice. |
| Newsreader | Google Fonts `ofl/newsreader` | SIL OFL 1.1 | Current serif candidate. If font files are redistributed, preserve OFL/copyright notice. |
| OGL | https://github.com/oframe/ogl | **HOLD — upstream GitHub currently exposes no license metadata/file in this audit** | Dependency may remain installed but must not become a production requirement until the exact distributed package license is verified from installed/package metadata. |
| GSAP | https://gsap.com / Webflow | Commercial website/app use currently permitted under current GSAP/Webflow terms; not treated as MIT | Add only if a concrete interaction justifies it; re-check terms before public release. |

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
- generate a dependency/transitive license inventory from the installed lockfile;
- verify OGL's exact installed-package terms if OGL remains used;
- re-check GSAP terms if GSAP enters production;
- verify every copied/adapted source fragment has a recorded origin and required notice;
- verify all visual assets have provenance/permission;
- decide the license, if any, for Mohammed-authored repository code;
- create a consolidated `THIRD_PARTY_NOTICES` file if distribution requires it.
