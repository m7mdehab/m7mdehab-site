# Writing System — Canonical Data Migration Patch

This is the exact target for the `data/writing.ts` migration. It is deliberately written as a migration aid rather than another runtime source.

## 1. Registries

Add near the top of `data/writing.ts`:

```ts
export const writingCategories = {
  ai: { label: "AI" },
  technology: { label: "Technology" },
  data: { label: "Data" },
  career: { label: "Career" },
  projects: { label: "Projects" },
  notes: { label: "Notes" },
} as const;

export const writingSeries = {
  "what-the-work-taught-me": { label: "What the Work Taught Me" },
} as const;

export type WritingCategoryId = keyof typeof writingCategories;
export type WritingSeriesId = keyof typeof writingSeries;
```

## 2. Publication model

Use the type structure already prepared in `components/writing-system-contract.ts`.

After migration, rename the prepared `WritingSystem*` types to canonical `Writing*` names inside `data/writing.ts`.

Required union:

```ts
export type PublishedWritingArticle = WritingArticleBase & {
  status: "published";
  publishedAt: string;
};

export type DraftWritingArticle = WritingArticleBase & {
  status: "draft";
  publishedAt?: string;
};

export type WritingArticle =
  | PublishedWritingArticle
  | DraftWritingArticle;
```

Do not keep mandatory `projectSlug` / `projectTitle` in the canonical type.

Also add to the canonical base type:

```ts
cardDescription?: string;
listenMinutes: number;
audio?: {
  src: string;
  mimeType: string;
  durationSeconds: number;
};
```

`cardDescription` is for browse surfaces only. Keep canonical `description` as the article/metadata description.

`listenMinutes` may exist before audio publication and is treated as an estimate. A real `audio` object makes it an exact published listen duration.

## 3. Existing body compatibility

Do not rewrite the existing long-form prose merely to migrate types.

Keep:

```ts
export type WritingSection = {
  id: string;
  eyebrow?: string;
  title?: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  blocks?: readonly WritingBlock[];
};
```

For each current section, derive a stable id from its sequence/title during the migration, for example:

- `define-the-claim`
- `score-honestly`
- `protect-the-timeline`

The exact id text is not user-facing.

## 4. Current article 1 metadata

Insert on the forecast essay:

```ts
status: "published",
publishedAt: "2026-09-11",
category: "data",
topics: ["Forecasting", "Calibration", "Evaluation"],
series: "what-the-work-taught-me",
cardDescription:
  "A practical test for knowing when a probabilistic forecast deserves trust.",
listenMinutes: 8,
homeRank: 1,
cover: {
  kind: "visual",
  visual: "forecast-calibration",
  alt: "Probability calibration curve comparing forecast confidence with observed outcomes.",
},
origin: {
  kind: "project",
  projectSlugs: ["presaira"],
},
```

Remove after all consumers are migrated:

```ts
topic
createdAt
projectSlug
projectTitle
```

## 5. Current article 2 metadata

```ts
status: "published",
publishedAt: "2026-09-11",
category: "data",
topics: ["Computer vision", "Metrics", "Validation"],
series: "what-the-work-taught-me",
cardDescription:
  "Why rare oil pixels make accuracy a weak headline metric.",
listenMinutes: 8,
homeRank: 2,
cover: {
  kind: "visual",
  visual: "oil-sar",
  alt: "Sentinel-1 SAR oil-spill segmentation case-study imagery.",
},
origin: {
  kind: "project",
  projectSlugs: ["oil-spill-detection"],
},
```

## 6. Current article 3 metadata

```ts
status: "published",
publishedAt: "2026-09-11",
category: "ai",
topics: ["AI agents", "Provenance", "Governance"],
series: "what-the-work-taught-me",
cardDescription:
  "How agents should handle missing evidence without inventing certainty.",
listenMinutes: 8,
homeRank: 3,
cover: {
  kind: "visual",
  visual: "agent-provenance",
  alt: "Public-safe agent governance diagram showing evidence, uncertainty, claims and action authority.",
},
origin: {
  kind: "project",
  projectSlugs: ["opportunityos"],
},
```

## 6.1 Preserve current project-essay disclosure and takeaway heading

The current three articles already communicate an explicit evidence boundary. Preserve that boundary as optional per-article data rather than a universal template.

For all three current project-origin essays, use:

    disclosure:
      "This essay is derived from public project evidence and does not widen the ownership or publication boundaries of the underlying case study."

Also preserve the current takeaway heading for these three essays with:

    takeawaysTitle: "What I carry into the next system."

Future independent/general articles do not inherit either field automatically.

## 6.2 Read/listen timing and audio

Every article carries both `readingMinutes` and `listenMinutes`.

Until a real narration asset exists, `listenMinutes` is an estimate and cards render it with a leading `~`. For the current three essays, use 8 minutes as the conservative rounded estimate for their roughly 1.1k-word bodies.

When narration is produced, add:

```ts
audio: {
  src: "/media/writing/<slug>.mp3",
  mimeType: "audio/mpeg",
  durationSeconds: <real-duration>,
},
```

Once `audio` exists the UI removes the estimate marker and uses the rounded display timing. Never render a fake player before an audio asset exists.

## 7. Public projections

Add:

```ts
export function isPublishedWritingArticle(
  article: WritingArticle,
): article is PublishedWritingArticle {
  return article.status === "published";
}

export const publishedWritingArticles =
  writingArticles.filter(isPublishedWritingArticle);

export function getHomepageWriting(limit = 6) {
  return [...publishedWritingArticles]
    .filter((article) => article.homeRank != null)
    .sort((a, b) => (a.homeRank ?? 999) - (b.homeRank ?? 999))
    .slice(0, limit);
}

export function getWritingArticle(slug: string) {
  return publishedWritingArticles.find((article) => article.slug === slug);
}

export const writingSlugs =
  publishedWritingArticles.map((article) => article.slug);
```

## 8. Integrity guard

Move the prepared `assertWritingSystemIntegrity` logic into `data/writing.ts` as `assertWritingIntegrity`.

At minimum detect:

- duplicate slugs;
- duplicate `homeRank`;
- invalid/non-positive `homeRank`;
- published article without ISO date;
- article with no topics;
- cover with blank alt;
- `cardDescription` longer than 140 characters;
- invalid/non-positive `listenMinutes`;
- real audio without non-empty src/mime type/positive duration;
- real audio without `listenMinutes`.

Call it from tests. Do not make production rendering depend on a client runtime check.

## 9. Project resolution

Do not duplicate project title or URL in article data.

For `origin.kind === "project"`, resolve `projectSlugs` against `projects` from `data/public.ts`.

If a configured slug is missing from the canonical project registry, fail tests/build validation rather than silently dropping it.

## 10. Remove temporary scaffold contract

After the migration compiles:

1. update:
   - `writing-system-cover.tsx`;
   - `writing-system-card.tsx`;
   - `home-writing-section.tsx`;
   - `writing-system-index.tsx`;
   - `writing-system-article-blocks.tsx`;
   - `writing-system-article.tsx`;
   - `writing-system-listen.tsx`;
   - `writing-system-schema.ts`;
2. point imports at `@/data/writing`;
3. delete `components/writing-system-contract.ts`;
4. run `rg "WritingSystemArticle|writing-system-contract"`;
5. zero runtime references must remain.

That closes the temporary scaffold and restores one editorial source of truth.


## 11. Audio publication rule

The current three entries should receive `listenMinutes: 8` but **no fake `audio` object yet** unless a real narration file is supplied.

Card behavior:
- with `listenMinutes` but no `audio`: render `~8 min listen`;
- with both: render `8 min listen`.

Article behavior:
- no `audio` → no player;
- real `audio` → render the prepared Listen block near the top.

When narration is produced, derive the final listen time from the real audio duration and replace the estimate.

## 12. Current body-length basis

A repository-source word-count pass on 2026-10-03 found each current essay at roughly 1.1k words of prose.

At approximately 150 words/minute narration, each is roughly 8 minutes. This justifies the initial estimate without inventing an audio asset.
