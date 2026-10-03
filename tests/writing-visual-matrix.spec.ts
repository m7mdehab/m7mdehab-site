import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";

const output = path.resolve("artifacts", "writing-system", "screenshots");
const homeTargets = [
  { width: 1920, height: 1080, name: "home-writing-1920x1080" },
  { width: 1440, height: 1000, name: "home-writing-1440x1000" },
  { width: 1280, height: 800, name: "home-writing-1280x800" },
  { width: 1024, height: 768, name: "home-writing-1024x768" },
  { width: 430, height: 932, name: "home-writing-430x932" },
  { width: 390, height: 844, name: "home-writing-390x844" },
  { width: 320, height: 568, name: "home-writing-320x568" },
] as const;

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images).map((image) => image.complete
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          const finish = () => resolve();
          image.addEventListener("load", finish, { once: true });
          image.addEventListener("error", finish, { once: true });
          window.setTimeout(finish, 5_000);
        })));
  });
}

async function hideFixedChrome(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    for (const selector of [".site-nav-wrap", ".skip-link"]) {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) element.style.visibility = "hidden";
    }
  });
}

test("capture the locked Writing render matrix", async ({ page }) => {
  test.setTimeout(180_000);
  await mkdir(output, { recursive: true });
  for (const viewport of homeTargets) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await settle(page);
    const section = page.locator("[data-writing-home]");
    await expect(section.locator("[data-writing-card]")).toHaveCount(3);
    const columns = await section.locator(".writing-system-grid").evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
    expect(columns, viewport.name).toBe(viewport.width >= 1120 ? 3 : viewport.width >= 720 ? 2 : 1);
    await hideFixedChrome(page);
    await section.screenshot({ path: path.join(output, `${viewport.name}.png`) });
  }

  for (const viewport of [
    { width: 1440, height: 1000, name: "archive-1440x1000" },
    { width: 390, height: 844, name: "archive-390x844" },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/writing");
    await settle(page);
    await expect(page.getByRole("heading", { level: 1, name: "Writing." })).toBeVisible();
    await expect(page.locator('[data-writing-card][data-writing-context="archive"]')).toHaveCount(3);
    await hideFixedChrome(page);
    await page.screenshot({ path: path.join(output, `${viewport.name}.png`), fullPage: true });
  }

  for (const viewport of [
    { width: 1440, height: 1000, name: "article-1440x1000" },
    { width: 390, height: 844, name: "article-390x844" },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/writing/when-to-trust-a-probabilistic-forecast");
    await settle(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await hideFixedChrome(page);
    await page.screenshot({ path: path.join(output, `${viewport.name}.png`), fullPage: true });
  }

  for (const viewport of [
    { width: 1920, height: 1080, name: "full-home-1920x1080" },
    { width: 390, height: 844, name: "full-home-390x844" },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await settle(page);
    await hideFixedChrome(page);
    await page.screenshot({ path: path.join(output, `${viewport.name}.png`), fullPage: true });
  }
});
