import { expect, test } from "@playwright/test";
import { getWritingArticleOptionalContent, type WritingArticle } from "@/data/writing";

const independentNote: WritingArticle = {
  slug: "a-note-without-project-evidence",
  title: "A note without project evidence",
  description: "An independent personal note for the renderer contract.",
  status: "published",
  publishedAt: "2026-10-03",
  category: "notes",
  topics: ["Reflection"],
  readingMinutes: 3,
  listenMinutes: 3,
  cover: { kind: "visual", visual: "agent-provenance" },
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
    relatedProjectSlug: undefined,
  });
});
