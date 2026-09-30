# READ THIS FIRST — Selected Work artboard handoff

This pack removes the major discovery/asset/research blockers for the six-card homepage rebuild.

## What has already been done

- Original ZIP inspected and deduplicated.
- Canonical PNG full-card references selected.
- Canonical clean PNG background plates selected.
- Responsive WebP background derivatives generated at 960/1280/1683 px.
- Supplied logos normalized and renamed.
- Ghareeb Oglu white/gold logo converted to a transparent production derivative without redrawing it.
- Oversized Makhbazy production logos downscaled while preserving full-size canonical sources.
- 100 px coordinate-grid references generated for all six cards.
- Interactive local reference/background overlay viewer created with canonical coordinate readout.
- Machine-readable 1683×935 artboard seed manifest prepared.
- Exact production copy/truth corrections prepared.
- Source-truth notes prepared against the live/public repositories and portfolio authority rules.
- Current repository branch/PR/dependency state recorded.
- Library research recorded: Embla 8.6.0, Motion 13.4.4, native View Transition API, current React/Next constraints.
- Mobile art-direction rules written.
- QA/acceptance gates written.
- Full phased implementation strategy written.
- A complete Codex execution prompt is included as `CODEX_EXECUTION_PROMPT.md`.

## Canonical file roles

- `reference/full/` — approved finished visuals. **Reference only. Never ship these as the production cards.**
- `reference/grid/` — same references with a 100 px coordinate grid.
- `source/backgrounds/` — clean source background plates.
- `source/logos/` — canonical supplied/derived source logos.
- `runtime/backgrounds/` — production-ready responsive WebP plates.
- `runtime/logos/` — production-ready logo assets.
- `manifest/` — geometry, copy, truth, types, hashes.
- `docs/` — implementation/research/mobile/QA rules.
- `tools/reference-viewer.html` — visual overlay/coordinate tool.
- `tools/reference-diff.py` — optional candidate-vs-reference diff heatmap.

## Required reading order for Codex

1. `README_FIRST.md`
2. `repo-context/CURRENT_REPO_STATE.md`
3. `docs/DESIGN_TRUTH.md`
4. `docs/ASSET_NORMALIZATION.md`
5. `manifest/source-truth.json`
6. `manifest/production-copy.json`
7. `manifest/artboards.json`
8. `docs/ARTBOARD_IMPLEMENTATION_CONTRACT.md`
9. `docs/IMPLEMENTATION_STRATEGY.md`
10. `docs/MOBILE_ADAPTATION.md`
11. `docs/RESEARCH_AND_DEPENDENCIES.md`
12. `docs/QA_ACCEPTANCE.md`
13. `CODEX_EXECUTION_PROMPT.md`

## One critical distinction

The approved full references and the clean background plates were generated separately. Their underlying raster pixels are therefore not identical. Do not waste time chasing a whole-card zero-diff target that cannot exist. The goal is foreground/layout/art-direction parity using the approved clean background, sharp live text, real supplied logos and truthful data.

## Starting checkpoint

Do not jump directly to all six + motion. Prove the architecture with **Presaira static parity first**, then scale the system. The implementation strategy intentionally contains incremental commits so a bad architectural choice does not contaminate all six cards.
