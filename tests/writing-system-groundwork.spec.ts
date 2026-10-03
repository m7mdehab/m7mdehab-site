import { expect, test } from "@playwright/test";
import {
  assertWritingSystemIntegrity,
  getHomepageWritingSystemArticles,
  getPublishedWritingSystemArticles,
  type PublishedWritingSystemArticle,
  type WritingSystemArticle,
} from "../components/writing-system-contract";

function article(
  overrides: Partial<PublishedWritingSystemArticle> = {},
): PublishedWritingSystemArticle {
  return {
    status: "published",
    slug: "independent-test-note",
    title: "Independent test note",
    description: "Fixture only.",
    category: "notes",
    topics: ["Notes"],
    publishedAt: "2026-10-03",
    readingMinutes: 1,
    listenMinutes: 1,
    cover: {
      kind: "visual",
      visual: "agent-provenance",
      alt: "Abstract editorial fixture cover.",
    },
    origin: { kind: "independent" },
    sections: [
      {
        id: "body",
        blocks: [{ type: "paragraph", text: "Test-only body." }],
      },
    ],
    ...overrides,
  };
}

test.describe("Writing system groundwork contract", () => {
  test("independent published writing requires no project/evidence/source/takeaway/thesis fields", () => {
    const fixture = article();
    expect(fixture.origin).toEqual({ kind: "independent" });
    expect(fixture.thesis).toBeUndefined();
    expect(fixture.evidence).toBeUndefined();
    expect(fixture.sources).toBeUndefined();
    expect(fixture.takeaways).toBeUndefined();
    expect(() => assertWritingSystemIntegrity([fixture])).not.toThrow();
  });

  test("drafts stay outside the published projection", () => {
    const records: WritingSystemArticle[] = [
      article(),
      {
        ...article({ slug: "draft-note" }),
        status: "draft",
        publishedAt: undefined,
      },
    ];
    expect(getPublishedWritingSystemArticles(records).map((item) => item.slug)).toEqual([
      "independent-test-note",
    ]);
  });

  test("homepage selection is explicit, ordered and capped", () => {
    const records = [
      article({ slug: "rank-3", homeRank: 3 }),
      article({ slug: "rank-1", homeRank: 1 }),
      article({ slug: "rank-2", homeRank: 2 }),
      article({ slug: "not-featured", homeRank: undefined }),
    ];
    expect(getHomepageWritingSystemArticles(records, 2).map((item) => item.slug)).toEqual([
      "rank-1",
      "rank-2",
    ]);
  });

  test("integrity guard accepts concise card copy and audio timing metadata", () => {
    const fixture = article({
      cardDescription: "A concise card-only description.",
      listenMinutes: 8,
      audio: {
        src: "/media/writing/test.mp3",
        mimeType: "audio/mpeg",
        durationSeconds: 463,
      },
    });
    expect(() => assertWritingSystemIntegrity([fixture])).not.toThrow();
  });

  test("integrity guard rejects invalid card/audio metadata", () => {
    expect(() =>
      assertWritingSystemIntegrity([
        article({
          cardDescription: "x".repeat(141),
        }),
      ]),
    ).toThrow(/cardDescription is too long/);

    expect(() =>
      assertWritingSystemIntegrity([
        article({
          listenMinutes: 0,
        }),
      ]),
    ).toThrow(/Invalid listenMinutes/);

  });

  test("integrity guard rejects duplicate slugs and homepage ranks", () => {
    expect(() =>
      assertWritingSystemIntegrity([
        article({ slug: "same", homeRank: 1 }),
        article({ slug: "same", homeRank: 2 }),
      ]),
    ).toThrow(/Duplicate writing slug/);

    expect(() =>
      assertWritingSystemIntegrity([
        article({ slug: "a", homeRank: 1 }),
        article({ slug: "b", homeRank: 1 }),
      ]),
    ).toThrow(/Duplicate writing homeRank/);
  });
});
