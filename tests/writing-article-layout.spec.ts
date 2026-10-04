import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";

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
      await expect(page.getByLabel("Follow narration")).not.toBeChecked();
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
      if (width >= 1000) expect(geometry.h1FontSize).toBeLessThanOrEqual(58);
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

test("follow narration never forces the reader back to the active word", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/writing/when-to-trust-a-probabilistic-forecast");
  await settle(page);

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
