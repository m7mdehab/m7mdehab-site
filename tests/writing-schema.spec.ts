import { expect, test } from "@playwright/test";
import type { WritingArticle } from "@/data/writing";
import { buildWritingBlogPostingSchema } from "@/data/writing-schema";

function fixture(overrides: Partial<WritingArticle> = {}): WritingArticle {
  return {
    slug: "independent-audio-note",
    title: "Independent audio note",
    description: "Fixture only.",
    cardDescription: "Fixture only.",
    status: "published",
    publishedAt: "2026-10-03",
    category: "notes",
    topics: ["Reflection"],
    readingMinutes: 3,
    listenMinutes: 4,
    cover: { kind: "visual", visual: "agent-provenance" },
    origin: { kind: "independent" },
    sections: [{ title: "Body", paragraphs: ["Fixture body."] }],
    ...overrides,
  };
}

test.describe("Writing BlogPosting schema", () => {
  test("independent article omits optional relationships and audio when no asset exists", () => {
    const schema = buildWritingBlogPostingSchema(fixture());

    expect(schema["@type"]).toBe("BlogPosting");
    expect(schema.timeRequired).toBe("PT3M");
    expect(schema).not.toHaveProperty("audio");
    expect(schema).not.toHaveProperty("about");
    expect(schema).not.toHaveProperty("citation");
    expect(schema).not.toHaveProperty("image");
  });

  test("real narration produces an AudioObject without changing article text semantics", () => {
    const schema = buildWritingBlogPostingSchema(
      fixture({
        audio: {
          src: "/media/writing/independent-audio-note.mp3",
          mimeType: "audio/mpeg",
          durationSeconds: 238,
        },
      }),
    );

    expect(schema.audio).toEqual({
      "@type": "AudioObject",
      contentUrl:
        "https://m7mdehab.com/media/writing/independent-audio-note.mp3",
      encodingFormat: "audio/mpeg",
      duration: "PT238S",
      caption: "Audio narration of this article",
    });
  });
});
