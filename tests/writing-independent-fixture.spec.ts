import { expect, test } from "@playwright/test";
import { assertWritingIntegrity, getHomepageWriting, getWritingArticleOptionalContent, isPublishedWritingArticle, publishedWritingArticles, type DraftWritingArticle, type PublishedWritingArticle } from "@/data/writing";

const independentNote: PublishedWritingArticle = {
  slug: "a-note-without-project-evidence",
  title: "A note without project evidence",
  description: "An independent personal note for the renderer contract.",
  format: "note",
  status: "published",
  publishedAt: "2026-10-03",
  category: "notes",
  topics: ["Reflection"],
  readingMinutes: 3,
  listenMinutes: 3,
  cover: { kind: "visual", visual: "agent-provenance", alt: "Public-safe governance diagram." },
  origin: { kind: "independent" },
  sections: [{ title: "The note", paragraphs: ["This post stands on its own."] }],
};

test("independent published writing renders without project-only fields", () => {
  const optional = getWritingArticleOptionalContent(independentNote);
  expect(independentNote.sections[0].paragraphs).toContain("This post stands on its own.");
  expect(optional).toEqual({
    thesis: undefined,
    evidence: [],
    takeaways: [],
    takeawaysTitle: undefined,
    sources: [],
  });
  expect(() => assertWritingIntegrity([independentNote])).not.toThrow();
  expect(independentNote).not.toHaveProperty("projectSlug");
  expect(independentNote).not.toHaveProperty("evidence");
  expect(independentNote).not.toHaveProperty("sources");
  expect(independentNote).not.toHaveProperty("takeaways");
  expect(independentNote).not.toHaveProperty("thesis");
});

test("drafts may omit publication dates and stay outside published and Home selectors", () => {
  const { publishedAt, ...draftFields } = independentNote;
  const draft: DraftWritingArticle = { ...draftFields, status: "draft" };

  expect(publishedAt).toBe("2026-10-03");
  expect(isPublishedWritingArticle(draft)).toBe(false);
  expect(publishedWritingArticles.every(isPublishedWritingArticle)).toBe(true);
  expect(getHomepageWriting(100)).toHaveLength(3);
  expect(getHomepageWriting(100).every(isPublishedWritingArticle)).toBe(true);
});
