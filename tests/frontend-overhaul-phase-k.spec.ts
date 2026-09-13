import { access } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";

const dormantArabicAssets = [
  "components/home-overhaul-ar.tsx",
  "components/home-sections-ar.tsx",
  "components/about-page-ar.tsx",
  "components/case-study-ar.tsx",
  "components/site-nav-ar.tsx",
  "data/about-ar.ts",
  "data/case-studies-ar.ts",
  "data/public-ar.ts",
  "data/writing-ar.ts",
  "app/arabic.css",
  "app/frontend-overhaul-phase-k.css",
  "app/frontend-overhaul-phase-k-fixes.css",
] as const;

const retiredRoutes = [
  "/ar",
  "/ar/about",
  "/ar/work",
  "/ar/work/presaira",
  "/ar/services",
  "/ar/writing",
  "/ar/writing/when-to-trust-a-probabilistic-forecast",
] as const;

test.describe("Phase K dormant Arabic capability", () => {
  test("authored Arabic source remains recoverable in the repository", async () => {
    for (const file of dormantArabicAssets) {
      await expect(access(path.resolve(file)), `${file} should remain available for a future localization decision`).resolves.toBeUndefined();
    }
  });

  test("Arabic route family is not publicly rendered", async ({ page }) => {
    for (const route of retiredRoutes) {
      const response = await page.goto(route);
      expect(response?.status(), `${route} should be retired`).toBe(404);
    }
  });

  test("English Home exposes no Arabic navigation or metadata", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('a[href="/ar"]')).toHaveCount(0);
    await expect(page.getByRole("link", { name: "AR", exact: true })).toHaveCount(0);
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(0);
    await expect(page.locator('meta[property="og:locale:alternate"]')).toHaveCount(0);
  });

  test("English mobile navigation remains usable after removing the locale control", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const navLinks = page.locator(".site-nav a");
    expect(await navLinks.count()).toBe(5);

    const visibleTargets = await navLinks.evaluateAll((links) => links.flatMap((link) => {
      const element = link as HTMLAnchorElement;
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      if (rect.width <= 0 || rect.height <= 0 || style.display === "none" || style.visibility === "hidden") return [];
      return [{ href: element.getAttribute("href"), height: rect.height }];
    }));

    expect(visibleTargets.map((target) => target.href)).toEqual(["/#top", "/#work"]);
    for (const target of visibleTargets) expect(target.height).toBeGreaterThanOrEqual(36);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
