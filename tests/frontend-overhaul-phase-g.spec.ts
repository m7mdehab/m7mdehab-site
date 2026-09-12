import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

const screenshotRoot = path.join(process.cwd(), "artifacts", "screenshots");

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => { await document.fonts.ready; });
}

async function noHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
}

async function hideFixedChrome(page: Page) {
  const nav = page.locator(".site-nav-wrap");
  if (await nav.count()) await nav.evaluate((element) => { (element as HTMLElement).style.visibility = "hidden"; });
  const skip = page.locator(".skip-link");
  if (await skip.count()) await skip.evaluate((element) => { (element as HTMLElement).style.visibility = "hidden"; });
}

test.describe("Phase G closing system", () => {
  test.use({ viewport: { width: 1440, height: 1000 } });

  test("English Home closes with two evidence notes and two opportunity paths instead of the service catalogue", async ({ page }) => {
    await mkdir(screenshotRoot, { recursive: true });
    await page.goto("/");
    await settle(page);

    await expect(page.locator(".closing-note")).toHaveCount(2);
    await expect(page.locator(".closing-path")).toHaveCount(2);
    await expect(page.locator("#services")).toHaveCount(0);
    await expect(page.locator('[data-conversion="home-to-services"]')).toHaveAttribute("href", "/services");
    await expect(page.locator(".closing-directory-nav")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();
    await noHorizontalOverflow(page);

    await hideFixedChrome(page);
    await page.locator(".closing-thinking").screenshot({ path: path.join(screenshotRoot, "phase-g-thinking-1440.png") });
    await page.locator(".closing-opportunity").screenshot({ path: path.join(screenshotRoot, "phase-g-opportunity-1440.png") });
  });

  test("closing sequence and dedicated services route pass axe", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    const homeResults = await new AxeBuilder({ page }).include(".closing-thinking").include(".closing-opportunity").include(".closing-directory").analyze();
    expect(homeResults.violations, JSON.stringify(homeResults.violations, null, 2)).toEqual([]);

    await page.goto("/services");
    await settle(page);
    const serviceResults = await new AxeBuilder({ page }).include("#services").analyze();
    expect(serviceResults.violations, JSON.stringify(serviceResults.violations, null, 2)).toEqual([]);
  });

  test("services are bilingual, self-canonical and expose all governed anchors", async ({ page }) => {
    await page.goto("/services");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://m7mdehab.com/services");
    await expect(page.locator("#services .service-card")).toHaveCount(4);
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute("href", "https://m7mdehab.com/ar/services");

    await page.goto("/ar/services");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://m7mdehab.com/ar/services");
    await expect(page.locator("#services .service-card")).toHaveCount(4);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", "https://m7mdehab.com/services");
  });

  test("mobile close recomposes without overflow and reduced motion stops decorative animation", async ({ page }) => {
    await mkdir(screenshotRoot, { recursive: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await settle(page);

    await expect(page.locator(".closing-note")).toHaveCount(2);
    await expect(page.locator(".closing-path")).toHaveCount(2);
    await noHorizontalOverflow(page);
    expect(await page.locator(".closing-note-curve").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");

    await hideFixedChrome(page);
    await page.locator(".closing-thinking").screenshot({ path: path.join(screenshotRoot, "phase-g-thinking-390.png") });
    await page.locator(".closing-opportunity").screenshot({ path: path.join(screenshotRoot, "phase-g-opportunity-390.png") });
  });
});
