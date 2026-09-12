import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";

const screenshotRoot = path.join(process.cwd(), "artifacts", "screenshots");

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => { await document.fonts.ready; });
}

async function expectNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

async function hideAcceptanceCaptureChrome(page: import("@playwright/test").Page) {
  for (const selector of [".site-nav-wrap", ".skip-link"]) {
    const locator = page.locator(selector);
    if (await locator.count()) {
      await locator.evaluate((element) => { (element as HTMLElement).style.visibility = "hidden"; });
    }
  }
}

test.describe("Phase F solve-think bridge", () => {
  test.use({ viewport: { width: 1440, height: 1000 } });

  test("home replaces capability, skill and oversized about chapters with one transformation system", async ({ page }) => {
    await mkdir(screenshotRoot, { recursive: true });
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    const section = page.locator("[data-solve-think]");
    await expect(section).toBeVisible();
    await expect(section.getByRole("heading", { name: /I like the messy part/i })).toBeVisible();
    await expect(section.getByRole("heading", { name: "Make the truth visible." })).toBeVisible();
    await expect(section.getByRole("heading", { name: "Reduce ambiguity." })).toBeVisible();
    await expect(section.getByRole("heading", { name: "Carry the job." })).toBeVisible();
    await expect(section.locator(".solve-think-step")).toHaveCount(3);
    await expect(section.locator(".solve-think-output-stack > div")).toHaveCount(5);

    await expect(page.locator(".capability-list")).toHaveCount(0);
    await expect(page.locator(".skills-section")).toHaveCount(0);
    await expect(page.locator(".about-section")).toHaveCount(0);
    await expectNoHorizontalOverflow(page);

    await hideAcceptanceCaptureChrome(page);
    await section.screenshot({ path: path.join(screenshotRoot, "phase-f-solve-think-1440.png") });
  });

  test("solve-think chapter passes axe on desktop", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    const results = await new AxeBuilder({ page }).include("[data-solve-think]").analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test("solve-think chapter fits and remains legible at 390px", async ({ page }) => {
    await mkdir(screenshotRoot, { recursive: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settle(page);

    const section = page.locator("[data-solve-think]");
    await expect(section).toBeVisible();
    await expectNoHorizontalOverflow(page);
    await hideAcceptanceCaptureChrome(page);
    await section.screenshot({ path: path.join(screenshotRoot, "phase-f-solve-think-390.png") });
  });

  test("reduced motion stops the transformation tracer without hiding content", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await settle(page);

    const section = page.locator("[data-solve-think]");
    await expect(section).toBeVisible();
    await expect(section.locator(".solve-think-step")).toHaveCount(3);
    const animation = await section.locator(".solve-think-flow span").first().evaluate((element) => getComputedStyle(element).animationName);
    expect(animation).toBe("none");
  });
});