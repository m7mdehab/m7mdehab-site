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
    const heroHeading = page.getByRole("heading", { level: 1, name: "The through-line matters more than titles." });
    await expect(heroHeading).toBeVisible();
    await expect(heroHeading.locator("span")).toHaveCount(2);
    await expect(page.getByText("Network International", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Business Analyst Team Lead", { exact: true })).toBeVisible();
    await expect(page.getByText("Data Analyst & Supply Chain Analyst", { exact: true })).toBeVisible();
    await expect(page.getByText("Orcas Online", { exact: true })).toBeVisible();
    await expect(page.getByText("Pharaonic Petroleum Company (PhPC)", { exact: true })).toBeVisible();
    await expect(page.getByText("Canadian International College", { exact: true }).first()).toBeVisible();
    await expect(page.getByText(/Manarat Jeddah International Schools/)).toBeVisible();
    await expect(page.getByText("Databricks", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("McKinsey Academy", { exact: true })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Tools grouped by the problems they help solve." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Make the truth visible." })).toBeVisible();
    const learningColumns = page.locator(".about-v2-learning-grid > div");
    await expect(learningColumns.nth(0).locator(".about-v2-subhead")).toHaveText("Credentials");
    await expect(learningColumns.nth(1).locator(".about-v2-subhead")).toHaveText("Education");

    const headingLayout = await page.locator(".about-v2-section-head").evaluateAll((heads) =>
      heads.map((head) => {
        const kicker = head.querySelector<HTMLElement>(".about-v2-section-kicker")!;
        const title = head.querySelector<HTMLElement>(".about-v2-section-title h2")!;
        return {
          deltaX: Math.abs(kicker.getBoundingClientRect().left - title.getBoundingClientRect().left),
        };
      }),
    );
    expect(headingLayout.every((item) => item.deltaX <= 1)).toBeTruthy();

    const titleLines = await page
      .locator(".about-v2-hero-copy h1, .about-v2-section-title h2, .about-v2-close h2")
      .evaluateAll((titles) =>
        titles.map((title) => {
          const style = getComputedStyle(title);
          const lineHeight = Number.parseFloat(style.lineHeight);
          return Math.ceil(title.getBoundingClientRect().height / lineHeight - 0.05);
        }),
      );
    expect(titleLines.every((lines) => lines <= 2)).toBeTruthy();
    await expect(page.getByText("WordPress", { exact: true })).toHaveCount(0);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://m7mdehab.com/about");
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "About" })).toHaveAttribute("aria-current", "location");
    await expect(page.getByRole("link", { name: /Download CV/i })).toHaveCount(0);
    await mkdir(artifactRoot, { recursive: true });
    await page.screenshot({ path: path.join(artifactRoot, "phase-h-about-1440.png"), fullPage: true });
  });

  test("About logos stay optically contained without white cards", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/about");
    await settle(page);

    const report = await page.locator(".about-v2-logo, .about-v2-issuer-mark").evaluateAll((marks) =>
      marks.map((mark) => {
        const rect = mark.getBoundingClientRect();
        const style = getComputedStyle(mark);
        const image = mark.querySelector<HTMLImageElement>("img");
        const imageRect = image?.getBoundingClientRect();
        return {
          background: style.backgroundColor,
          overflow:
            imageRect
              ? imageRect.left < rect.left - 1 ||
                imageRect.right > rect.right + 1 ||
                imageRect.top < rect.top - 1 ||
                imageRect.bottom > rect.bottom + 1
              : false,
          imageLoaded: image ? image.naturalWidth > 0 : true,
        };
      }),
    );

    expect(report.length).toBeGreaterThanOrEqual(5);
    expect(report.every((item) => item.background === "rgba(0, 0, 0, 0)")).toBeTruthy();
    expect(report.every((item) => !item.overflow)).toBeTruthy();
    expect(report.every((item) => item.imageLoaded)).toBeTruthy();
    await expect(page.locator(".about-v2-career .about-v2-logo")).toHaveCount(0);
    await expect(page.locator(".about-v2-secondary .about-v2-logo")).toHaveCount(0);

    await expect(page.locator(".about-v2-databricks img")).toHaveAttribute(
      "src",
      "/brand/databricks.svg",
    );
    await expect(page.locator(".about-v2-mckinsey-name")).toHaveText("McKinsey");
    await expect(page.locator(".about-v2-mckinsey-forward")).toHaveText("Forward");
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
    const mobileTitleLines = await page
      .locator(".about-v2-hero-copy h1, .about-v2-section-title h2, .about-v2-close h2")
      .evaluateAll((titles) =>
        titles.map((title) => {
          const style = getComputedStyle(title);
          const lineHeight = Number.parseFloat(style.lineHeight);
          return Math.ceil(title.getBoundingClientRect().height / lineHeight - 0.05);
        }),
      );
    expect(mobileTitleLines.every((lines) => lines <= 2)).toBeTruthy();
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
    await expect(page.locator(".about-v2-hero")).toBeVisible();
    await expect(page.locator("#career")).toBeVisible();
    await expect(page.locator(".about-v2-learning")).toBeVisible();
    await expect(page.locator(".about-v2-stack")).toBeVisible();
    await expect(page.locator(".about-v2-principles")).toBeVisible();
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
