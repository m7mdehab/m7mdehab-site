import { expect, test } from "@playwright/test";
import {
  getWritingArticleOptionalContent,
  writingAudioObject,
  writingTimingLabel,
  type WritingArticle,
} from "@/data/writing";

const independentNote: WritingArticle = {
  slug: "a-note-without-project-evidence",
  title: "A note without project evidence",
  description: "An independent personal note for the renderer contract.",
  cardDescription: "A concise independent note.",
  status: "published",
  publishedAt: "2026-10-03",
  category: "notes",
  topics: ["Reflection"],
  readingMinutes: 3,
  listenMinutes: 2,
  cover: { kind: "visual", visual: "agent-provenance" },
  origin: { kind: "independent" },
  sections: [{ title: "The note", paragraphs: ["This post stands on its own."] }],
};

test("independent published writing renders without project-only fields", () => {
  const optional = getWritingArticleOptionalContent(independentNote);
  expect(independentNote.sections[0].paragraphs).toContain(
    "This post stands on its own.",
  );
  expect(optional).toEqual({
    thesis: undefined,
    evidence: [],
    takeaways: [],
    takeawaysTitle: undefined,
    sources: [],
    relatedProjectSlug: undefined,
  });
});

test("listen time stays explicitly estimated until a real audio asset exists", () => {
  expect(writingTimingLabel(independentNote)).toBe(
    "3 min read · ~2 min listen",
  );
  expect(
    writingAudioObject(independentNote, "https://m7mdehab.com"),
  ).toBeUndefined();
});

test("real narration removes the estimate marker and projects a valid AudioObject", () => {
  const narrated: WritingArticle = {
    ...independentNote,
    audio: {
      src: "/media/writing/a-note-without-project-evidence.mp3",
      mimeType: "audio/mpeg",
      durationSeconds: 127,
    },
  };

  expect(writingTimingLabel(narrated)).toBe("3 min read · 2 min listen");
  expect(writingAudioObject(narrated, "https://m7mdehab.com")).toEqual({
    "@type": "AudioObject",
    contentUrl:
      "https://m7mdehab.com/media/writing/a-note-without-project-evidence.mp3",
    encodingFormat: "audio/mpeg",
    duration: "PT127S",
    caption: "Audio narration of this article",
  });
});
