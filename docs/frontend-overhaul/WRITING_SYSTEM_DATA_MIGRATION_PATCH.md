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
- cover with blank alt.

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
   - `writing-system-article-blocks.tsx`;
2. point imports at `@/data/writing`;
3. delete `components/writing-system-contract.ts`;
4. run `rg "WritingSystemArticle|writing-system-contract"`;
5. zero runtime references must remain.

That closes the temporary scaffold and restores one editorial source of truth.
