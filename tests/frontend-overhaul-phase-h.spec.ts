import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const artifactRoot = path.resolve("artifacts", "screenshots");

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => { await document.fonts.ready; });
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({ clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
}

test.describe("Phase H About architecture", () => {
  test("Home removes CV-derived chapters and routes depth to About", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    await settle(page);
    await expect(page.locator(".timeline")).toHaveCount(0);
    await expect(page.locator(".credential-grid")).toHaveCount(0);
    await expect(page.locator(".compact-grid")).toHaveCount(0);
    await expect(page.getByRole("link", { name: /Full background/i })).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    await expect(page.getByRole("navigation", { name: "Footer directory" }).getByRole("link", { name: "About" })).toHaveAttribute("href", "/about");
    await mkdir(artifactRoot, { recursive: true });
    await page.screenshot({ path: path.join(artifactRoot, "phase-h-home-1440.png"), fullPage: true });
  });

  test("About carries the relocated professional history without inventing a resume route", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto("/about");
    expect(response?.ok()).toBeTruthy();
    await settle(page);
    await expect(page.getByRole("heading", { level: 1, name: "The through-line matters more than titles." })).toBeVisible();
    await expect(page.getByText("Network International", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Business Analyst Team Lead", { exact: true })).toBeVisible();
    await expect(page.getByText("Data Analyst & Supply Chain Analyst", { exact: true })).toBeVisible();
    await expect(page.getByText("Orcas Online", { exact: true })).toBeVisible();
    await expect(page.getByText("Pharaonic Petroleum Company (PhPC)", { exact: true })).toBeVisible();
    await expect(page.getByText("Canadian International College", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Databricks", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("McKinsey Academy", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Tools grouped by the problems they help solve." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "The main lane is not the whole story." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Make the truth visible." })).toBeVisible();
    await expect(page.getByText("WordPress", { exact: true })).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://m7mdehab.com/about");
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "location");
    await expect(page.getByRole("link", { name: /Download CV/i })).toHaveCount(0);
    await mkdir(artifactRoot, { recursive: true });
    await page.screenshot({ path: path.join(artifactRoot, "phase-h-about-1440.png"), fullPage: true });
  });


  test("About logos stay transparent, bounded and use crisp vectors for Databricks and McKinsey", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/about");
    await settle(page);

    const logoGeometry = await page.locator(".about-v2-logo").evaluateAll((marks) =>
      marks.map((mark) => {
        const image = mark.querySelector<HTMLImageElement>("img")!;
        const markBox = mark.getBoundingClientRect();
        const imageBox = image.getBoundingClientRect();
        const style = getComputedStyle(mark);
        return {
          brand: mark.getAttribute("data-brand-logo"),
          src: image.getAttribute("src") ?? "",
          background: style.backgroundColor,
          borderTop: style.borderTopWidth,
          markWidth: markBox.width,
          markHeight: markBox.height,
          imageWidth: imageBox.width,
          imageHeight: imageBox.height,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
          overflowX:
            Math.max(0, markBox.left - imageBox.left) +
            Math.max(0, imageBox.right - markBox.right),
          overflowY:
            Math.max(0, markBox.top - imageBox.top) +
            Math.max(0, imageBox.bottom - markBox.bottom),
        };
      }),
    );

    expect(logoGeometry.length).toBeGreaterThan(5);
    for (const logo of logoGeometry) {
      expect(logo.background).toBe("rgba(0, 0, 0, 0)");
      expect(logo.borderTop).toBe("0px");
      expect(logo.imageWidth).toBeLessThanOrEqual(logo.markWidth + 1);
      expect(logo.imageHeight).toBeLessThanOrEqual(logo.markHeight + 1);
      expect(logo.overflowX).toBeLessThanOrEqual(1);
      expect(logo.overflowY).toBeLessThanOrEqual(1);
      expect(logo.naturalWidth).toBeGreaterThan(0);
      expect(logo.naturalHeight).toBeGreaterThan(0);
    }

    const databricks = logoGeometry.find((logo) => logo.brand === "databricks");
    const mckinsey = logoGeometry.find((logo) => logo.brand === "mckinsey");
    expect(databricks?.src).toContain("/brand/databricks.svg");
    expect(mckinsey?.src).toContain("/brand/mckinsey.svg");
  });

  test("About passes axe on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/about");
    await settle(page);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
  });

  test("About recomposes at 390px without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/about");
    await settle(page);
    await expectNoHorizontalOverflow(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("Data Engineer", { exact: true }).first()).toBeVisible();
    await mkdir(artifactRoot, { recursive: true });
    await page.screenshot({ path: path.join(artifactRoot, "phase-h-about-390.png"), fullPage: true });
  });

  test("reduced motion preserves About content and disables smooth-scroll ownership", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/about");
    await settle(page);
    expect(await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.className)).not.toMatch(/\blenis\b/);
    await expect(page.getByText("One direction of travel.", { exact: true })).toBeVisible();
    await expect(page.getByText("Foundation first. Expansion where it matters.", { exact: true })).toBeVisible();
  });

  test("About remains readable without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
    const page = await context.newPage();
    const response = await page.goto("/about");
    expect(response?.ok()).toBeTruthy();
    await page.waitForLoadState("domcontentloaded");
    await expect(page.locator(".about-hero")).toBeVisible();
    await expect(page.locator("#career")).toBeVisible();
    await expect(page.locator(".about-learning")).toBeVisible();
    await expect(page.locator(".about-stack")).toBeVisible();
    await expect(page.locator(".about-principles")).toBeVisible();
    await context.close();
  });

  test("discovery surfaces expose English About only", async ({ page }) => {
    const sitemapResponse = await page.request.get("/sitemap.xml");
    expect(sitemapResponse.ok()).toBeTruthy();
    const sitemap = await sitemapResponse.text();
    expect(sitemap).toContain("https://m7mdehab.com/about");
    expect(sitemap).not.toContain("/ar/about");
    expect(sitemap).not.toContain('hreflang="ar"');

    const llmsResponse = await page.request.get("/llms.txt");
    expect(llmsResponse.ok()).toBeTruthy();
    expect(await llmsResponse.text()).toContain("[Professional history / About](https://m7mdehab.com/about)");
    expect((await page.goto("/ar/about"))?.status()).toBe(404);
  });
});
