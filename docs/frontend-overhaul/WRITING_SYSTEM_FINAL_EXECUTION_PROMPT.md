# Codex / Luna — Writing System Final Refinement + Activation Prompt

Implement the Writing System on `m7mdehab/m7mdehab-site` using the prepared groundwork branch.

This is an execution task, not an ideation task.

## Source of truth

Read, in order:

1. `AGENTS.md`
2. `docs/LOCALIZATION_POLICY.md`
3. `docs/frontend-overhaul/WRITING_SYSTEM_REFINEMENT_PACKET.md`
4. `docs/frontend-overhaul/WRITING_SYSTEM_EXECUTION_PACKET.md`
5. `docs/frontend-overhaul/WRITING_SYSTEM_DATA_MIGRATION_PATCH.md`
6. `docs/frontend-overhaul/WRITING_SYSTEM_ROUTE_ACTIVATION_PATCH.md`
7. `docs/frontend-overhaul/WRITING_SYSTEM_VISUAL_QA.md`
8. `docs/frontend-overhaul/WRITING_SYSTEM_TEST_MATRIX.md`
9. `docs/frontend-overhaul/WRITING_SYSTEM_SEO_AI_CONTRACT.md`
10. `docs/frontend-overhaul/WRITING_SYSTEM_AUTHORING_GUIDE.md`
11. `docs/frontend-overhaul/WRITING_SYSTEM_PREFABRICATED_SCAFFOLD.md`
12. `design/writing-system/writing-system.spec.json`

The refinement packet supersedes older card/header details wherever they conflict.

Read the local Next.js 16 docs required by AGENTS.md before metadata changes.

## Repository state

Start from or incorporate the current `writing-system-groundwork` work.

Do not rebuild the Writing component system from scratch.

Prepared code already exists:
- `components/home-writing-section.tsx`
- `components/writing-system-card.tsx`
- `components/writing-system-cover.tsx`
- `components/writing-system-index.tsx`
- `components/writing-system-article-blocks.tsx`
- `components/writing-system-article.tsx`
- `components/writing-system-listen.tsx`
- `components/writing-system-schema.ts`
- temporary `components/writing-system-contract.ts`
- `app/writing-system.css`

Refresh main / open PR state first and rebase as necessary before final rendered QA.

## Locked visible result

### Home title
**What I’m thinking through.**

No explanatory lede beneath it.

### CTA
**All writing ↗**

Placement:
- bottom-right;
- after the card grid;
- not in the header.

### Grid
- desktop: 3 columns;
- tablet: 2;
- mobile: 1;
- current 3 posts all visible;
- max 6 Home posts via homeRank;
- no carousel / swipe / dots / placeholders.

## Card — exact structure

```
[ 16:9 cover
  bottom-left: CATEGORY · FIRST TOPIC
  bottom-right: READ TIME · LISTEN TIME
]
TITLE — max 2 visible lines
short description — desktop/tablet only, max 2 lines
```

Do not add another metadata row below the cover.

Remove old top-left cover labels.

### Current labels
- DATA · FORECASTING
- DATA · COMPUTER VISION
- AI · AI AGENTS

### Timing
Current cards:
- use existing read time;
- add ~8 min listen to each current article until narration exists.

Examples:
- 9 min read · ~8 min listen
- 8 min read · ~8 min listen

If space is objectively insufficient at 320px, compact punctuation/wording without removing either read/listen meaning. Do not move timing below the cover.

## Card titles

Hard maximum: 2 visible lines.

Implement robust 2-line clamp:
- full semantic title remains in DOM;
- no JS truncation;
- no title rewrite just for layout.

Test it at:
- 1920
- 1440
- 1280
- 1024
- 430
- 390
- 320

Any 3-line title is a blocker.

## Card descriptions

Keep on desktop/tablet for now.

Use:
- `cardDescription ?? description`;
- 2-line clamp;
- max 140-character authored cardDescription recommended.

Current cardDescription values are defined in the data migration patch.

At <720px:
- hide descriptions.

## Mobile density

Tighten the section.

Target:
- compact heading;
- 24px-ish heading-to-grid rhythm;
- ~30px card row gap;
- no description;
- titles around 23–27px depending viewport;
- cover metadata compact but readable;
- CTA after final card.

Do not reproduce the long mobile layout from the first grid version.

## Cover refinement

### Forecast
Keep the real Presaira reliability data.

### Oil
Keep real SAR evidence.
Crop/scale/object-position to minimize the baked-in source text strip at top.
No fake edits.
No duplicate label.

### Agent
Keep public-safe governance diagram.
No fake product UI.

## Audio / listen support

Canonical data model must support:

```ts
listenMinutes: number;
audio?: {
  src: string;
  mimeType: string;
  durationSeconds: number;
};
```

Current articles:
- `listenMinutes: 8`;
- do NOT fabricate `audio`.

Card:
- no audio -> "~8 min listen"
- real audio -> "8 min listen"

Article:
- no audio -> no Listen player
- audio -> render prepared `WritingSystemListen` near top

Do not create a custom JS audio player in this pass.
Use native `<audio controls preload="metadata">`.

## Canonical data migration

Fold the temporary contract into `data/writing.ts`.

Canonical type must support:
- status
- publishedAt
- updatedAt?
- category
- topics[]
- series?
- readingMinutes
- listenMinutes
- audio?
- cardDescription?
- homeRank?
- cover
- origin
- thesis?
- evidence?
- sections
- takeaways?
- takeawaysTitle?
- sources?

Then:
- repoint all prepared components to `@/data/writing`;
- delete `components/writing-system-contract.ts`;
- verify zero runtime references remain.

Do not leave a second content model.

## Current article migration

Preserve:
- slugs;
- article body;
- evidence;
- sources;
- project relationships;
- factual claims.

Add metadata exactly from `WRITING_SYSTEM_DATA_MIGRATION_PATCH.md`.

## Home activation

Target order:

`SystemHero → CredibilityRail → SelectedWorkGallery → SolveThinkBridge → HomeWritingSection → HomeClosing`

HomeClosing:
- Opportunity + Footer only;
- remove Writing carousel state/effects/markup;
- delete `use-timed-carousel.ts` if final rg shows zero consumers.

Do not change Selected Work carousel.

## Archive

Visible archive H1:
**What I’m thinking through.**

Optional small eyebrow:
**Writing**

No explanatory lede required.

Use same shared card component.

All published posts only.

No category filters, search or pagination yet.

## Article route

Use prepared conditional article renderer.

Always:
- back to Writing
- taxonomy
- read/listen timing
- title
- article description
- dates

Conditional:
- Listen block only if real audio exists
- thesis
- evidence
- sources
- takeaways
- related projects
- disclosure

No empty scaffolding.

## Schema / metadata

Use BlogPosting.

Keep:
- canonical
- title
- description
- datePublished
- dateModified only when real updatedAt exists
- author
- keywords
- image only when stable
- citation only when sources exist
- project about only when applicable

Optional audio:
If and only if a real audio asset exists and the existing schema layer can express it cleanly without unsupported metadata hacks, include an associated audio object/encoding. Do not block this pass on audio schema before any real audio exists.

## Discovery

Generalize:
- /writing.json
- data/discoverability.ts
- llms.txt
- profile projection
- sitemap

Include:
- category
- topics
- publishedAt
- readingMinutes
- listenMinutes
- relatedProjects[]
- optional audio URL only when real

No drafts.
No active /ar Writing links under current English-only policy.

## Tests to add/update

### Home/card
- 3 current cards
- max 6
- 3/2/1 grid
- metadata is inside cover frame
- no separate metadata row
- no old top-left cover label
- CTA appears after grid
- title rendered height <= 2 line-heights + tolerance at every acceptance viewport
- description <=2 lines desktop/tablet
- description display:none mobile
- listen time visible
- no fake audio player

### Audio
Fixture without audio:
- timing shows ~ listen estimate
- Listen block absent

Fixture with audio:
- timing has no ~
- Listen block exists
- source and MIME type correct
- accessible label exists

### Existing
- no Writing carousel
- no dots
- no horizontal overflow
- no JS required
- axe clean
- article URLs unchanged
- BlogPosting schema
- independent article works without project/evidence/sources/takeaways/thesis

## Render matrix

Home Writing:
- 1920×1080
- 1440×1000
- 1280×800
- 1024×768
- 430×932
- 390×844
- 320×568

Archive:
- 1440×1000
- 390×844
- 320×568

Article:
- 1440×1000
- 390×844

Full Home:
- 1920×1080
- 390×844

## Visual acceptance

At desktop:
- section should read as a personal publication;
- heading has personality without becoming decorative;
- covers dominate scanning;
- metadata is readable but subordinate;
- title is never 3 lines;
- descriptions are compact;
- CTA closes the section.

At mobile:
- the section must feel substantially denser than the first version;
- thumbnails + 2-line titles carry the feed;
- descriptions are absent;
- all metadata stays in-cover;
- no oversized dead header area;
- CTA follows the final card.

## Validation

Run, in order:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
CLOUDFLARE_STATIC_EXPORT=1 npm run build
```

Focused Playwright:
- Writing groundwork/schema/audio tests
- iteration12 writing authority
- discoverability
- Phase G
- mobile composition

Then:

```bash
npm run test:browser
git diff --check
```

Automated tests are not sufficient. Review the rendered matrix.

## Scope protection

Do not redesign:
- Selected Work
- Method
- Opportunity
- Footer
- Hero
- credibility rail

Only fix regressions caused by Writing integration.

## Delivery

Follow AGENTS.md through:
- coherent commits;
- push;
- PR;
- checks;
- rendered review;
- merge;
- production deployment;
- live route verification.

Return only after execution is complete, with:
- branch;
- files changed;
- data migration summary;
- screenshot review;
- test counts/results;
- feature SHAs;
- PR;
- merge SHA;
- deploy result;
- live verification for /, /writing, all 3 articles and /writing.json;
- any genuine blocker.

Do not return “ready for review” if there is no blocker.
