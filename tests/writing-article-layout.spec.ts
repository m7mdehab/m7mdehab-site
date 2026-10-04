import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";
import { getWritingNarrationSegments, writingArticles } from "../data/writing";

const output = path.resolve("artifacts", "writing-article-system");
const slugs = [
  "when-to-trust-a-probabilistic-forecast",
  "why-accuracy-is-not-enough-for-oil-spill-detection",
  "what-an-ai-agent-should-do-when-evidence-is-missing",
] as const;

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => { await document.fonts.ready; });
}

test("all current articles use the same readable publication shell", async ({ page }) => {
  test.setTimeout(180_000);
  await mkdir(output, { recursive: true });

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });

    for (const slug of slugs) {
      await page.goto(`/writing/${slug}`);
      await settle(page);

      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      await expect(page.getByText("By Mohammed Ehab ElNomany")).toBeVisible();
      await expect(page.getByText("Key idea")).toBeVisible();
      await expect(page.getByText("Sources & further reading.")).toBeVisible();
      await expect(page.locator('[data-writing-card][data-writing-context="related"]')).toHaveCount(2);
      await expect(page.locator("[data-writing-listen]")).toHaveCount(1);
      await expect(page.getByLabel("Narration voice")).toHaveValue("female");
      await expect(page.getByLabel("Narration voice").locator("option")).toHaveText(["Female", "Male"]);
      await expect(page.getByLabel("Narration speed")).toHaveValue("1");
      await expect(page.getByLabel("Follow narration")).toHaveCount(1);
      await expect(page.getByLabel("Follow narration")).toBeChecked();
      expect(await page.locator("[data-narration-cue]").count()).toBeGreaterThan(20);
      await expect(page.locator(".writing-system-article-cover")).toHaveCount(0);

      const geometry = await page.evaluate(() => {
        const article = document.querySelector<HTMLElement>("article")!;
        const firstParagraph = article.querySelector<HTMLElement>("section p:not([class])") ?? article.querySelector<HTMLElement>("section p")!;
        const style = getComputedStyle(firstParagraph);
        return {
          articleWidth: article.getBoundingClientRect().width,
          paragraphLineHeight: Number.parseFloat(style.lineHeight),
          paragraphFontSize: Number.parseFloat(style.fontSize),
          textAlign: style.textAlign,
          bodyLeft: article.getBoundingClientRect().left,
          heroLeft: document.querySelector<HTMLElement>("main h1")!.getBoundingClientRect().left,
          h1FontSize: Number.parseFloat(getComputedStyle(document.querySelector<HTMLElement>("main h1")!).fontSize),
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });

      expect(geometry.overflow).toBeLessThanOrEqual(1);
      expect(geometry.paragraphLineHeight / geometry.paragraphFontSize).toBeGreaterThanOrEqual(1.6);
      expect(geometry.textAlign).toBe("justify");
      expect(Math.abs(geometry.bodyLeft - geometry.heroLeft)).toBeLessThanOrEqual(2);
      if (width >= 1000) {
        expect(geometry.h1FontSize).toBeGreaterThanOrEqual(44);
        expect(geometry.h1FontSize).toBeLessThanOrEqual(64);
      }
      if (width >= 1000) {
        expect(geometry.articleWidth).toBeGreaterThanOrEqual(900);
        expect(geometry.articleWidth).toBeLessThanOrEqual(1160);
      }

      const contents = page.getByRole("navigation", { name: "Article contents" });
      if (width >= 1000) await expect(contents.last()).toBeVisible();

      await page.screenshot({ path: path.join(output, `${slug}-${width}.png`), fullPage: true });
    }
  }
});

test("follow narration defaults on, stays optional, and never forces the reader back to the active word", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/writing/when-to-trust-a-probabilistic-forecast");
  await settle(page);

  const follow = page.getByLabel("Follow narration");
  await expect(follow).toBeChecked();
  await follow.uncheck();
  await page.reload();
  await settle(page);
  await expect(page.getByLabel("Follow narration")).not.toBeChecked();

  await page.evaluate(() => window.scrollTo({ top: 700, behavior: "instant" }));
  const manualPosition = await page.evaluate(() => window.scrollY);
  expect(manualPosition).toBeGreaterThan(0);

  await page.evaluate(() => {
    const first = document.querySelector<HTMLElement>("[data-narration-cue]");
    first?.setAttribute("data-narration-active", "true");
  });

  expect(await page.evaluate(() => window.scrollY)).toBe(manualPosition);
  await expect(page.locator('[data-narration-active="true"]')).toHaveCount(1);
});


test("article lists keep visible markers and narration never says literal bullet point", async ({ page }) => {
  const article = writingArticles.find(
    (candidate) => candidate.slug === "when-to-trust-a-probabilistic-forecast",
  );
  expect(article).toBeTruthy();

  const segments = getWritingNarrationSegments(article!);
  const bulletSegments = segments.filter((segment) =>
    segment.id.includes("-bullet-"),
  );
  expect(bulletSegments.length).toBeGreaterThan(0);
  expect(bulletSegments.map((segment) => segment.prefix)).not.toContain("Bullet point.");
  expect(bulletSegments.slice(0, 3).map((segment) => segment.prefix)).toEqual([
    "First.",
    "Second.",
    "Third.",
  ]);

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/writing/when-to-trust-a-probabilistic-forecast");
  await settle(page);

  const scoreHeading = page.getByRole("heading", {
    name: /Use proper scores, then inspect reliability/i,
  });
  const scoreSection = scoreHeading.locator("..");
  const list = scoreSection.locator("ul").first();
  await expect(list.locator("li")).toHaveCount(3);
  expect(
    await list.evaluate((element) => getComputedStyle(element).listStyleType),
  ).toBe("disc");
});
