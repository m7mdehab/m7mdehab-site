import { expect, test } from "@playwright/test";
import {
  assertWritingIntegrity,
  getWritingListenDetails,
  getWritingTimingLabel,
  type PublishedWritingArticle,
} from "@/data/writing";
import {
  buildWritingBlogPostingSchema,
  getRelatedWritingProjects,
} from "@/data/writing-schema";

function fixture(
  overrides: Partial<PublishedWritingArticle> = {},
): PublishedWritingArticle {
  return {
    slug: "independent-audio-note",
    title: "Independent audio note",
    description: "Fixture only.",
    cardDescription: "Fixture only.",
    format: "note",
    status: "published",
    publishedAt: "2026-10-03",
    category: "notes",
    topics: ["Reflection"],
    readingMinutes: 3,
    listenMinutes: 4,
    cover: {
      kind: "visual",
      visual: "agent-provenance",
      alt: "Public-safe governance diagram.",
    },
    origin: { kind: "independent" },
    sections: [{ title: "Body", paragraphs: ["Fixture body."] }],
    ...overrides,
  };
}

test.describe("Writing BlogPosting schema", () => {
  test("canonical current articles satisfy the data integrity contract", () => {
    expect(() => assertWritingIntegrity()).not.toThrow();
  });

  test("independent article exposes the governed two-voice narration contract", () => {
    const article = fixture();
    const schema = buildWritingBlogPostingSchema(article);
    const listen = getWritingListenDetails(article);

    expect(schema["@type"]).toBe("BlogPosting");
    expect(schema.timeRequired).toBe("PT3M");
    expect(schema).not.toHaveProperty("about");
    expect(schema).not.toHaveProperty("citation");
    expect(schema).not.toHaveProperty("image");
    expect(schema.audio).toEqual([
      {
        "@type": "AudioObject",
        name: "Independent audio note — Female narration",
        contentUrl:
          "https://m7mdehab.com/audio/writing/independent-audio-note/female.mp3",
        encodingFormat: "audio/mpeg",
        caption: "Female AI narration of this article",
      },
      {
        "@type": "AudioObject",
        name: "Independent audio note — Male narration",
        contentUrl:
          "https://m7mdehab.com/audio/writing/independent-audio-note/male.mp3",
        encodingFormat: "audio/mpeg",
        caption: "Male AI narration of this article",
      },
    ]);
    expect(listen.defaultVoice).toBe("female");
    expect(listen.sources.map((source) => [source.id, source.kokoroVoice])).toEqual([
      ["female", "af_heart"],
      ["male", "am_michael"],
    ]);
    expect(getWritingTimingLabel(article)).toBe("3 min read · ~4 min listen");
    expect(getRelatedWritingProjects(article)).toEqual([]);
  });

  test("legacy explicit audio metadata does not replace governed Kokoro narration", () => {
    const article = fixture({
      audio: {
        src: "/media/writing/legacy.mp3",
        mimeType: "audio/mpeg",
        durationSeconds: 238,
      },
    });

    const schema = buildWritingBlogPostingSchema(article);
    expect(schema.audio).toHaveLength(2);
    expect(schema.audio[0].contentUrl).toContain("/female.mp3");
    expect(schema.audio[1].contentUrl).toContain("/male.mp3");
  });

  test("project relationships resolve from the public registry for BlogPosting about", () => {
    const article = fixture({
      origin: { kind: "project", projectSlugs: ["presaira"] },
    });
    expect(getRelatedWritingProjects(article)).toEqual([
      {
        slug: "presaira",
        title: expect.any(String),
        caseStudyUrl: "https://m7mdehab.com/work/presaira",
      },
    ]);
    expect(buildWritingBlogPostingSchema(article).about).toEqual([
      {
        "@type": "CreativeWork",
        name: expect.any(String),
        url: "https://m7mdehab.com/work/presaira",
      },
    ]);
  });

  test("unknown project relationships fail validation", () => {
    expect(() =>
      getRelatedWritingProjects(
        fixture({
          origin: {
            kind: "project",
            projectSlugs: ["missing-project"],
          },
        }),
      ),
    ).toThrow("Unknown Writing project relationship: missing-project");
  });
});
