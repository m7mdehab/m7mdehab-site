import { expect, test } from "@playwright/test";
import type { PublishedWritingSystemArticle } from "../components/writing-system-contract";
import { buildWritingSystemBlogPostingSchema } from "../components/writing-system-schema";

function fixture(
  overrides: Partial<PublishedWritingSystemArticle> = {},
): PublishedWritingSystemArticle {
  return {
    status: "published",
    slug: "independent-note",
    title: "Independent note",
    description: "Fixture only.",
    category: "notes",
    topics: ["Notes"],
    publishedAt: "2026-10-03",
    readingMinutes: 1,
    listenMinutes: 1,
    cover: {
      kind: "visual",
      visual: "agent-provenance",
      alt: "Editorial fixture.",
    },
    origin: { kind: "independent" },
    sections: [
      {
        id: "body",
        blocks: [{ type: "paragraph", text: "Fixture." }],
      },
    ],
    ...overrides,
  };
}

test.describe("Writing system schema scaffold", () => {
  test("independent note emits a clean BlogPosting without fabricated project/citation/image fields", () => {
    const schema = buildWritingSystemBlogPostingSchema({
      article: fixture(),
      authorName: "Mohammed Ehab ElNomany",
      authorId: "https://m7mdehab.com/#person",
    });

    expect(schema["@type"]).toBe("BlogPosting");
    expect(schema.datePublished).toBe("2026-10-03");
    expect(schema).not.toHaveProperty("about");
    expect(schema).not.toHaveProperty("citation");
    expect(schema).not.toHaveProperty("image");
    expect(schema).not.toHaveProperty("audio");
    expect(schema).not.toHaveProperty("dateModified");
  });

  test("project article adds only the relationships and fields that really exist", () => {
    const schema = buildWritingSystemBlogPostingSchema({
      article: fixture({
        slug: "project-note",
        updatedAt: "2026-10-04",
        origin: { kind: "project", projectSlugs: ["presaira"] },
        cover: {
          kind: "image",
          src: "https://m7mdehab.com/media/example.webp",
          alt: "Example.",
        },
        listenMinutes: 8,
        audio: {
          src: "https://m7mdehab.com/media/writing/project-note.mp3",
          mimeType: "audio/mpeg",
          durationSeconds: 463,
        },
        sources: [
          {
            label: "Evidence",
            href: "https://example.com/evidence",
            kind: "first-hand",
          },
        ],
      }),
      authorName: "Mohammed Ehab ElNomany",
      authorId: "https://m7mdehab.com/#person",
      relatedProjects: [
        {
          slug: "presaira",
          title: "Presaira",
          url: "https://m7mdehab.com/work/presaira",
        },
      ],
    });

    expect(schema.dateModified).toBe("2026-10-04");
    expect(schema.image).toBe("https://m7mdehab.com/media/example.webp");
    expect(schema.audio).toEqual({
      "@type": "AudioObject",
      contentUrl: "https://m7mdehab.com/media/writing/project-note.mp3",
      encodingFormat: "audio/mpeg",
      duration: "PT463S",
      caption: "Audio narration of this article",
    });
    expect(schema.citation).toEqual(["https://example.com/evidence"]);
    expect(schema.about).toEqual([
      {
        "@type": "CreativeWork",
        name: "Presaira",
        url: "https://m7mdehab.com/work/presaira",
      },
    ]);
  });
});
