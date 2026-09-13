import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";

const domain = "https://m7mdehab.com";
const allSlugs = ["presaira", "opportunityos", "ghareeb-oglu", "oil-spill-detection", "solar-site-selection", "makhbazy"] as const;
const screenshotRoot = path.join(process.cwd(), "artifacts", "screenshots");

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => { await document.fonts.ready; });
}

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

test.describe("Phase E selected work rebuild", () => {
  test.use({ viewport: { width: 1440, height: 1000 } });

  test("home exposes all six projects through one-project carousel frames", async ({ page }) => {
    await mkdir(screenshotRoot, { recursive: true });
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    const section = page.locator("[data-selected-work]");
    await expect(section).toBeVisible();
    const slugs = await section.locator("[data-project-slug]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-project-slug")));
    expect(slugs).toEqual(allSlugs);
    await expect(section.locator("[data-carousel-track]")).toHaveCount(1);
    await expect(section.getByRole("button", { name: "Previous project" })).toBeVisible();
    await expect(section.getByRole("button", { name: "Next project" })).toBeVisible();
    await expect(section.getByRole("link", { name: /Open the work index/i })).toHaveAttribute("href", "/work");
    await expect(page.locator(".work-list")).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    await section.screenshot({ path: path.join(screenshotRoot, "phase-e-selected-work-1440.png") });
  });

  test("manual carousel controls move exactly one project at a time", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    const carousel = page.locator(".selected-work-carousel");
    await expect(carousel).toHaveAttribute("data-active-project", "presaira");
    await carousel.getByRole("button", { name: "Next project" }).click();
    await expect(carousel).toHaveAttribute("data-active-project", "opportunityos");
    await carousel.getByRole("button", { name: "Previous project" }).click();
    await expect(carousel).toHaveAttribute("data-active-project", "presaira");
  });

  test("English work directory exposes all six projects without an Arabic alternate", async ({ page }) => {
    await page.goto("/work");
    await settle(page);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${domain}/work`);
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(0);
    const slugs = await page.locator("[data-work-directory] [data-project-slug]").evaluateAll((nodes) => nodes.map((node) => node.getAttribute("data-project-slug")));
    expect(slugs).toEqual(allSlugs);
    expect((await page.goto("/ar/work"))?.status()).toBe(404);
  });

  test("new English work surfaces pass axe on desktop", async ({ page }) => {
    for (const route of ["/", "/work"]) {
      await page.goto(route);
      await settle(page);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `${route}: ${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
    }
  });

  test("selected work and English work directory fit a 390px viewport", async ({ page }) => {
    await mkdir(screenshotRoot, { recursive: true });
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto("/");
    await settle(page);
    await expectNoHorizontalOverflow(page);
    await page.locator("[data-selected-work]").screenshot({ path: path.join(screenshotRoot, "phase-e-selected-work-390.png") });

    await page.goto("/work");
    await settle(page);
    await expectNoHorizontalOverflow(page);
    await expect(page.locator("[data-work-directory] [data-project-slug]")).toHaveCount(6);
  });

  test("reduced motion keeps the carousel manual and readable", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await settle(page);

    const carousel = page.locator(".selected-work-carousel");
    await expect(carousel).toHaveAttribute("data-active-project", "presaira");
    expect(await page.locator(".selected-work-carousel-progress-fill").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
    expect(await page.locator("[data-carousel-track]").evaluate((element) => getComputedStyle(element).transitionDuration)).toBe("0s");
    await carousel.getByRole("button", { name: "Next project" }).click();
    await expect(carousel).toHaveAttribute("data-active-project", "opportunityos");
  });
});
