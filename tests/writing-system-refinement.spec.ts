import { expect, test } from "@playwright/test";
import {
  assertWritingSystemIntegrity,
  writingSystemTimingLabel,
  type PublishedWritingSystemArticle,
} from "../components/writing-system-contract";

function article(
  overrides: Partial<PublishedWritingSystemArticle> = {},
): PublishedWritingSystemArticle {
  return {
    status: "published",
    slug: "refinement-test",
    title: "A deliberately long title that remains semantically complete even when the card visually clamps it",
    description: "Canonical article description.",
    cardDescription: "Short browse description.",
    category: "notes",
    topics: ["Ideas"],
    publishedAt: "2026-10-03",
    readingMinutes: 6,
    listenMinutes: 8,
    cover: {
      kind: "visual",
      visual: "agent-provenance",
      alt: "Editorial fixture.",
    },
    origin: { kind: "independent" },
    sections: [
      {
        id: "body",
        blocks: [{ type: "paragraph", text: "Fixture body." }],
      },
    ],
    ...overrides,
  };
}

test.describe("Writing system final refinement contract", () => {
  test("timing distinguishes estimated listen time from real audio duration", () => {
    expect(writingSystemTimingLabel(article())).toBe(
      "6 min read · ~8 min listen",
    );

    expect(
      writingSystemTimingLabel(
        article({
          audio: {
            src: "/media/writing/refinement-test.mp3",
            mimeType: "audio/mpeg",
            durationSeconds: 469,
          },
        }),
      ),
    ).toBe("6 min read · 8 min listen");
  });

  test("audio is optional but must be valid when configured", () => {
    expect(() => assertWritingSystemIntegrity([article()])).not.toThrow();

    expect(() =>
      assertWritingSystemIntegrity([
        article({
          audio: {
            src: "",
            mimeType: "audio/mpeg",
            durationSeconds: 469,
          },
        }),
      ]),
    ).toThrow(/empty src/);

    expect(() =>
      assertWritingSystemIntegrity([
        article({
          audio: {
            src: "/media/writing/refinement-test.mp3",
            mimeType: "audio/mpeg",
            durationSeconds: 0,
          },
        }),
      ]),
    ).toThrow(/invalid durationSeconds/);
  });

  test("cardDescription remains deliberately compact", () => {
    expect(() =>
      assertWritingSystemIntegrity([
        article({ cardDescription: "x".repeat(141) }),
      ]),
    ).toThrow(/cardDescription is too long/);
  });
});
