import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const artifactRoot = path.resolve("artifacts", "screenshots");

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

async function expectNoHorizontalOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
  }));
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
    await expect(page.getByRole("heading", { name: /Enterprise credibility/i })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /Continuous learning with receipts/i })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: /Teaching, consulting/i })).toHaveCount(0);

    await expect(page.locator(".credibility-rail-label").getByRole("link", { name: /Full background/i })).toHaveAttribute("href", "/about");
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
    await expect(page.getByRole("heading", { name: "Make the truth visible." })).toBeVisible();
    await expect(page.getByText("WordPress", { exact: true })).toHaveCount(0);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://m7mdehab.com/about");
    await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "location");
    await expect(page.getByRole("link", { name: /Download CV/i })).toHaveCount(0);

    await mkdir(artifactRoot, { recursive: true });
    await page.screenshot({ path: path.join(artifactRoot, "phase-h-about-1440.png"), fullPage: true });
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
    await expect(page.getByText("Different roles. One direction of travel.", { exact: true })).toBeVisible();
    await expect(page.getByText("Formal foundation, then targeted expansion.", { exact: true })).toBeVisible();
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

  test("discovery surfaces expose reciprocal English and Arabic About routes", async ({ page }) => {
    const sitemapResponse = await page.request.get("/sitemap.xml");
    expect(sitemapResponse.ok()).toBeTruthy();
    const sitemap = await sitemapResponse.text();
    expect(sitemap).toContain("https://m7mdehab.com/about");
    expect(sitemap).toContain("https://m7mdehab.com/ar/about");
    expect(sitemap).toContain('hreflang="en" href="https://m7mdehab.com/about"');
    expect(sitemap).toContain('hreflang="ar" href="https://m7mdehab.com/ar/about"');

    const llmsResponse = await page.request.get("/llms.txt");
    expect(llmsResponse.ok()).toBeTruthy();
    expect(await llmsResponse.text()).toContain("[Professional history / About](https://m7mdehab.com/about)");
  });
});
