import { expect, test } from "@playwright/test";
import { assertWritingIntegrity, getWritingListenDetails, getWritingTimingLabel, type PublishedWritingArticle } from "@/data/writing";
import { buildWritingBlogPostingSchema, getRelatedWritingProjects } from "@/data/writing-schema";

function fixture(overrides: Partial<PublishedWritingArticle> = {}): PublishedWritingArticle {
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
    cover: { kind: "visual", visual: "agent-provenance", alt: "Public-safe governance diagram." },
    origin: { kind: "independent" },
    sections: [{ title: "Body", paragraphs: ["Fixture body."] }],
    ...overrides,
  };
}

test.describe("Writing BlogPosting schema", () => {
  test("canonical current articles satisfy the data integrity contract", () => {
    expect(() => assertWritingIntegrity()).not.toThrow();
  });

  test("independent article omits optional relationships and audio when no asset exists", () => {
    const schema = buildWritingBlogPostingSchema(fixture());

    expect(schema["@type"]).toBe("BlogPosting");
    expect(schema.timeRequired).toBe("PT3M");
    expect(schema).not.toHaveProperty("audio");
    expect(schema).not.toHaveProperty("about");
    expect(schema).not.toHaveProperty("citation");
    expect(schema).not.toHaveProperty("image");
    expect(getRelatedWritingProjects(fixture())).toEqual([]);
  });

  test("real narration produces an AudioObject without changing article text semantics", () => {
    const narrated = fixture({
      audio: {
        src: "/media/writing/independent-audio-note.mp3",
        mimeType: "audio/mpeg",
        durationSeconds: 238,
      },
    });
    const schema = buildWritingBlogPostingSchema(narrated);
    const listen = getWritingListenDetails(narrated);

    expect(schema.audio).toEqual({
      "@type": "AudioObject",
      contentUrl:
        "https://m7mdehab.com/media/writing/independent-audio-note.mp3",
      encodingFormat: "audio/mpeg",
      duration: "PT238S",
      caption: "Audio narration of this article",
    });
    expect(listen).toEqual({
      sectionLabel: "Listen to this article",
      playerLabel: "Audio narration of Independent audio note",
      listenMinutes: 4,
      src: "/media/writing/independent-audio-note.mp3",
      mimeType: "audio/mpeg",
      preload: "metadata",
      controls: true,
    });
    expect(getWritingTimingLabel(narrated)).toBe("3 min read · 4 min listen");
  });

  test("estimated listen timing appears without a player until narration exists", () => {
    const article = fixture();

    expect(getWritingTimingLabel(article)).toBe("3 min read · ~4 min listen");
    expect(getWritingListenDetails(article)).toBeUndefined();
  });

  test("project relationships resolve from the public registry for BlogPosting about", () => {
    const article = fixture({ origin: { kind: "project", projectSlugs: ["presaira"] } });
    expect(getRelatedWritingProjects(article)).toEqual([
      { slug: "presaira", title: expect.any(String), caseStudyUrl: "https://m7mdehab.com/work/presaira" },
    ]);
    expect(buildWritingBlogPostingSchema(article).about).toEqual([
      { "@type": "CreativeWork", name: expect.any(String), url: "https://m7mdehab.com/work/presaira" },
    ]);
  });

  test("unknown project relationships fail validation", () => {
    expect(() => getRelatedWritingProjects(fixture({
      origin: { kind: "project", projectSlugs: ["missing-project"] },
    }))).toThrow("Unknown Writing project relationship: missing-project");
  });
});
