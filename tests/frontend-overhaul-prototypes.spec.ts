import { expect, test } from "@playwright/test";

const directions = ["cinematic", "spatial", "kinetic"] as const;

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await page.waitForTimeout(450);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(120);
}

for (const direction of directions) {
  test.describe(`frontend overhaul prototype: ${direction}`, () => {
    test(`${direction} renders at desktop and laptop without horizontal overflow`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      const response = await page.goto(`/prototypes/${direction}`);
      expect(response?.ok()).toBeTruthy();
      await settle(page);

      await expect(page.locator("h1")).toContainText("Mohammed", { ignoreCase: true });
      await expect(page.locator(".proto-rail")).toBeVisible();
      await expect(page.locator("#work")).toBeVisible();
      await expect(page.locator("#think")).toBeVisible();
      await expect(page.locator("#contact")).toBeVisible();

      const desktopDimensions = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
        height: document.documentElement.scrollHeight,
      }));
      expect(desktopDimensions.width).toBeLessThanOrEqual(desktopDimensions.client + 2);
      expect(desktopDimensions.height).toBeLessThan(8500);
      await page.screenshot({ path: testInfo.outputPath(`${direction}-desktop-1920.png`), fullPage: true });

      await page.setViewportSize({ width: 1440, height: 900 });
      await settle(page);
      const laptopDimensions = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
      expect(laptopDimensions.width).toBeLessThanOrEqual(laptopDimensions.client + 2);
      await page.screenshot({ path: testInfo.outputPath(`${direction}-laptop-1440.png`), fullPage: true });
    });

    test(`${direction} renders at mobile and respects reduced motion`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      const response = await page.goto(`/prototypes/${direction}`);
      expect(response?.ok()).toBeTruthy();
      await settle(page);

      const dimensions = await page.evaluate(() => ({ width: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
      expect(dimensions.width).toBeLessThanOrEqual(dimensions.client + 2);

      const trackAnimation = await page.locator(".proto-track").evaluate((element) => getComputedStyle(element).animationName);
      expect(trackAnimation).toBe("none");
      await page.screenshot({ path: testInfo.outputPath(`${direction}-mobile-390.png`), fullPage: true });
    });
  });
}
