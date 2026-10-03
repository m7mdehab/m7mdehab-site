# Writing System — Authoring Guide

This guide defines how new Writing entries are added after the rebuild. It is part of the foundation: publishing a new post should be a content task, not a component-design task.

## 1. Editorial principle

Writing is personal authored work.

A post should exist because Mohammed has something worth saying, explaining, testing or documenting. Do not manufacture articles to fill a content calendar or to hit SEO keywords.

The system supports:
- technical essays;
- project retrospectives;
- career observations;
- AI/technology opinions;
- tutorials;
- research notes;
- experiments;
- personal notes.

A project relationship is optional.

## 2. Choose the minimum metadata

Every post needs:
- status;
- slug;
- title;
- description;
- optional concise cardDescription is strongly recommended for browse surfaces;
- category;
- at least one topic;
- publishedAt once published;
- readingMinutes;
- cover;
- origin;
- at least one body section.

Everything else is optional, including project evidence and audio.

If the canonical description is too long for cards, do not weaken it. Add a separate `cardDescription` capped at 140 characters.

Do not add empty evidence/sources/project arrays just to satisfy a template.

## 3. Slug rules

Use:
- lowercase;
- words separated by hyphens;
- stable descriptive phrase;
- no dates unless the date is part of the subject;
- no category prefix;
- no marketing keyword stuffing.

Once public, treat the slug as permanent.

If a public slug must change later, implement an explicit redirect rather than silently breaking the old URL.

## 4. Category selection

Choose one primary category:

- ai — AI models, agents, governance, applied AI;
- technology — software/platform/tool observations that are broader than AI/data;
- data — analytics, data engineering, ML evaluation, statistics;
- career — work, leadership, job/career observations;
- projects — project-specific retrospectives where the project itself is the primary subject;
- notes — general/personal writing that does not fit the others.

Topics are more granular and may be multiple.

Do not create a new category for every subject. Add a new category only when multiple articles genuinely need it.

## 5. Series

Series is optional.

Use:
- what-the-work-taught-me

for essays explicitly drawn from work/project experience.

A general AI opinion or personal note should not be forced into that series.

## 6. Origin

Independent post:

    origin: { kind: "independent" }

Project-derived post:

    origin: {
      kind: "project",
      projectSlugs: ["canonical-project-slug"],
      disclosure:
        "This essay is derived from public project evidence and does not widen the ownership or publication boundaries of the underlying case study.",
    }

Use only canonical project slugs already governed by the public project registry.

If the article references a project casually but is not substantively derived from it, keep origin independent and link contextually in the prose instead.

## 7. Cover choice

Preferred order:

1. real public evidence when the article is about a project/evaluation;
2. original site-native editorial diagram;
3. owned photograph;
4. licensed/publicly permitted image;
5. restrained typographic treatment.

Never:
- invent a dashboard;
- fabricate a screenshot;
- expose internal/private project material;
- use a copyrighted image merely because it is easy to find;
- reuse unrelated project art just to make a card look full.

Current native visual IDs:
- forecast-calibration;
- oil-sar;
- agent-provenance.

Add another visual ID only when a new article genuinely needs a reusable native visual.

## 8. Independent article template

After canonical migration, the semantic template is:

    {
      status: "draft",
      slug: "your-stable-slug",
      title: "Article title",
      description: "One concise sentence explaining what the article gives the reader.",
      cardDescription: "Shorter browse-surface sentence when useful.",
      category: "notes",
      topics: ["Topic"],
      readingMinutes: 5,
      listenMinutes: 4,
      cover: {
        kind: "image",
        src: "/media/writing/example.webp",
        alt: "Meaningful description of the cover image.",
      },
      origin: { kind: "independent" },
      sections: [
        {
          id: "opening",
          title: "First section title",
          blocks: [
            {
              type: "paragraph",
              text: "Article text.",
            },
          ],
        },
      ],
    }

When ready to publish:
- change status to published;
- set publishedAt to the real publication date;
- optionally set homeRank if it belongs on Home.

Do not add a fake publishedAt to drafts.

## 9. Project-derived article template

    {
      status: "draft",
      slug: "stable-project-essay-slug",
      title: "Article title",
      description: "One concise sentence explaining the argument.",
      cardDescription: "Short browse-surface version of the argument.",
      category: "data",
      topics: ["Evaluation", "Calibration"],
      series: "what-the-work-taught-me",
      readingMinutes: 8,
      listenMinutes: 7,
      cover: {
        kind: "visual",
        visual: "forecast-calibration",
        alt: "Meaningful description.",
      },
      origin: {
        kind: "project",
        projectSlugs: ["presaira"],
        disclosure:
          "This essay is derived from public project evidence and does not widen the ownership or publication boundaries of the underlying case study.",
      },
      thesis: "Optional thesis statement.",
      evidence: [
        {
          label: "Evidence label",
          value: "Measured value",
          detail: "What the value actually establishes.",
        },
      ],
      sections: [],
      takeaways: [],
      takeawaysTitle: "What I carry into the next system.",
      sources: [],
    }

Only use evidence claims already supported by public/public-safe sources.

## 10. Body blocks

Preferred new-post blocks:

Paragraph:
- type paragraph
- text

Bullets:
- type bullets
- items

Quote:
- type quote
- text
- optional attribution

Image:
- type image
- src
- alt
- optional caption

Code:
- type code
- code
- optional language

Callout:
- type callout
- optional title
- text

The existing three essays may continue to use legacy paragraphs/bullets until deliberately edited.

## 11. Home curation

homeRank is editorial selection, not chronology.

Rules:
- integer >= 1;
- unique;
- maximum six cards are rendered;
- rank 1 is the first card;
- absence of homeRank means archive-only;
- do not fill Home merely because there is spare capacity.

When a new post displaces an older Home post, remove or change the old homeRank explicitly.

## 12. Dates

publishedAt:
- real first publication date;
- YYYY-MM-DD;
- immutable unless correcting an actual error.

updatedAt:
- only for a meaningful editorial/content revision;
- not for formatting, deployment or build changes;
- YYYY-MM-DD.

## 13. Sources

Sources are optional.

Use them when:
- a factual/technical claim relies on external material;
- a project-derived claim has public evidence;
- a research essay depends on primary documentation.

Prefer:
- first-hand/public project evidence;
- standards;
- official documentation;
- primary research.

Do not add citations merely to make an opinion look academic.

## 14. Reading and listen time

Reading:
- use a consistent estimate based on body word count, roughly 220–250 words/minute;
- round to a whole minute with a floor of 1;
- do not manually inflate it.

Listening:
- `listenMinutes` is the expected narration duration;
- before audio exists, estimate at roughly 145–160 spoken words/minute and the card will display `~`;
- once a real audio file exists, replace the estimate from the actual audio duration and add the audio object;
- do not publish a fake audio source just to remove the `~`.

Real audio shape:

    audio: {
      src: "/media/writing/<slug>.mp3",
      mimeType: "audio/mpeg",
      durationSeconds: 463,
    }

The prepared article renderer exposes native audio controls only when this real asset metadata exists.

The article text on the same page remains the equivalent text representation of the narration.

## 15. Publication checklist

Before status becomes published:
- title is specific and human;
- description is useful outside the article;
- cardDescription is concise when provided and <= 140 characters;
- title still scans well when visually clamped to two lines;
- listenMinutes is reasonable if configured;
- audio metadata points to a real playable asset if configured;
- slug is stable;
- category/topics are accurate;
- cover is truthful/public-safe;
- cover alt is meaningful;
- project relationship is correct or absent;
- claims stay within evidence boundaries;
- sources are valid where needed;
- no private/confidential details leak;
- mobile rendering is readable;
- canonical/JSON-LD/discovery are generated;
- no draft appears publicly before publication.

## 16. Editorial tone

Prefer:
- direct first-person reasoning when relevant;
- concrete examples;
- clear distinctions between fact, experience, inference and opinion;
- admitting uncertainty;
- visible failures/limitations in technical pieces;
- normal human titles.

Avoid:
- corporate thought-leadership filler;
- generic "10 ways AI will transform..." content;
- forced personal-brand language;
- SEO-first phrasing;
- pretending every note is a definitive framework;
- turning a personal observation into a project case study without reason.

The visual system should be consistent. The writing itself should be allowed to vary.

## 17. Card browse contract

The browse surfaces deliberately show less than the article page.

Card order:
1. cover;
2. taxonomy/timing inside the bottom of the cover;
3. title, max two visible lines;
4. cardDescription/description, max two visible lines.

Do not put category or timing back beneath the cover.

Do not duplicate taxonomy as a permanent top-left cover label.

When a title truncates visually, keep the complete semantic title in the link/DOM. Do not rewrite a strong title merely to make the card prettier.
