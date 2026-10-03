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
      await expect(page.locator('[data-writing-card][data-writing-context="archive"]')).toHaveCount(2);
      await expect(page.locator("[data-writing-listen]")).toHaveCount(0);

      const geometry = await page.evaluate(() => {
        const article = document.querySelector<HTMLElement>("article")!;
        const firstParagraph = article.querySelector<HTMLElement>("section p:not([class])") ?? article.querySelector<HTMLElement>("section p")!;
        const style = getComputedStyle(firstParagraph);
        return {
          articleWidth: article.getBoundingClientRect().width,
          paragraphLineHeight: Number.parseFloat(style.lineHeight),
          paragraphFontSize: Number.parseFloat(style.fontSize),
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });

      expect(geometry.overflow).toBeLessThanOrEqual(1);
      expect(geometry.paragraphLineHeight / geometry.paragraphFontSize).toBeGreaterThanOrEqual(1.6);
      if (width >= 1000) expect(geometry.articleWidth).toBeLessThanOrEqual(780);

      const contents = page.getByRole("navigation", { name: "Article contents" });
      if (width >= 1000) await expect(contents.last()).toBeVisible();

      await page.screenshot({ path: path.join(output, `${slug}-${width}.png`), fullPage: true });
    }
  }
});