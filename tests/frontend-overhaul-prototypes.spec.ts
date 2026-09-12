import { expect, test } from "@playwright/test";

const directions = ["cinematic", "spatial", "kinetic"] as const;

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = Array.from(document.images);
    await Promise.all(images.map((image) => image.complete ? Promise.resolve() : new Promise<void>((resolve) => {
      image.addEventListener("load", () => resolve(), { once: true });
      image.addEventListener("error", () => resolve(), { once: true });
    })));
  });
}

for (const direction of directions) {
  test.describe(`frontend overhaul prototype: ${direction}`, () => {
    test(`${direction} renders at desktop without horizontal overflow`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width: 1440, height: 1000 });
      const response = await page.goto(`/prototypes/${direction}`);
      expect(response?.ok()).toBeTruthy();
      await settle(page);

      await expect(page.locator("h1")).toContainText("Mohammed", { ignoreCase: true });
      await expect(page.locator(".proto-rail")).toBeVisible();
      await expect(page.locator("#work")).toBeVisible();
      await expect(page.locator("#think")).toBeVisible();
      await expect(page.locator("#contact")).toBeVisible();

      const dimensions = await page.evaluate(() => ({
        width: document.documentElement.scrollWidth,
        client: document.documentElement.clientWidth,
        height: document.documentElement.scrollHeight,
      }));
      expect(dimensions.width).toBeLessThanOrEqual(dimensions.client + 2);
      expect(dimensions.height).toBeLessThan(8500);

      await page.screenshot({ path: testInfo.outputPath(`${direction}-desktop.png`), fullPage: true });
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
      await page.screenshot({ path: testInfo.outputPath(`${direction}-mobile.png`), fullPage: true });
    });
  });
}
