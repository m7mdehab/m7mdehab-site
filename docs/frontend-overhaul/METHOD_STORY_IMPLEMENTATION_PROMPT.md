# Codex / Luna Execution Prompt — Method Story Rebuild

Implement the English homepage method-story rebuild. The design is already decided. Do not propose alternatives and do not redesign it.

Read, in this order:

1. `AGENTS.md`
2. `docs/frontend-overhaul/METHOD_STORY_EXECUTION_PACKET.md`
3. `design/method-story/method-story.spec.json`
4. `design/method-story/METHOD_STORY_BLUEPRINT.svg`
5. `components/method-story-contract.ts`
6. `components/method-story-icons.tsx`
7. current `components/home-solve-think.tsx`
8. current Phase F test and CSS

Then execute the packet exactly.

Key constraints:
- use existing `motion/react`; no GSAP or new runtime dependency;
- rebuild with native HTML + custom inline SVG;
- keep `home-solve-think.tsx` semantic/server-oriented and isolate scroll motion in `method-story-canvas.tsx`;
- use new `.method-story*` CSS classes so later legacy `.solve-think*` overrides cannot corrupt the new design;
- create `app/method-story.css` and import it last in the English layout;
- no tabs on mobile;
- no scroll pin/hijack;
- no fake data or decorative dashboard;
- no continuous tracer loop;
- base/no-JS state is the complete final composition;
- update Phase F Playwright acceptance to the new contract;
- render and inspect 1440×1000, 1920×1080, 1024×768 and 390×844;
- run typecheck, lint, production build, Phase F tests, then the full browser suite;
- do not merge/deploy if validation fails.

The visual acceptance target is not “functionally similar.” It must preserve the blueprint's clarity and premium quality: disorder on the left, reveal/convergence/assembly through the middle, calm validated outcomes on the right, restrained mint accent, fine custom line work, and one coherent motion sequence.

Only adjust geometry, spacing, typography, contrast, and motion timing during implementation. Do not change the narrative, copy, component strategy, animation library, responsive model, or art direction unless Mohammed gives a newer explicit instruction.

## Prefabricated implementation now available

The groundwork is further advanced. Do **not** start the section from a blank file.

Ready-to-integrate files now exist:
- `components/method-story-section.tsx` — complete server/semantic section shell;
- `components/method-story-canvas.tsx` — complete Motion-based story canvas with staged connectors, inputs, evidence, convergence, system assembly and outputs;
- `components/method-story-icons.tsx` — custom icon system;
- `components/method-story-contract.ts` — locked copy/geometry/motion data;
- `app/method-story.css` — complete responsive styling scaffold.

Your implementation job is now primarily **integration + rendered visual tuning**:
1. replace the live `SolveThinkBridge` implementation with/re-export the prepared `MethodStorySection`;
2. import `method-story.css` last in the English layout;
3. update the Phase F Playwright test to the locked new contract;
4. render all four target viewports;
5. tune geometry/spacing/contrast/timing only;
6. run the complete validation and delivery workflow.

Do not throw away the prepared files and rebuild them differently unless a concrete compile/runtime defect requires it.

## Final execution aids

Before coding, also read:
- `docs/frontend-overhaul/METHOD_STORY_INTEGRATION_PATCH.md` for the exact activation/test changes;
- `docs/frontend-overhaul/METHOD_STORY_VISUAL_QA.md` for screenshot acceptance.

A known pre-existing Cloudflare staging issue is documented there: `/writing.json` returned 404 at the deployed staging origin even though the static artifact contained `out/writing.json`. Do not attribute that baseline deployment issue to this section without evidence.
