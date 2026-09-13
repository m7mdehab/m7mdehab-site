import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const domain = "https://m7mdehab.com";
const artifactRoot = path.resolve("artifacts", "phase-l");
const screenshotRoot = path.join(artifactRoot, "screenshots");

const htmlRoutes = [
  "/", "/about", "/work",
  "/work/presaira", "/work/opportunityos", "/work/ghareeb-oglu",
  "/work/oil-spill-detection", "/work/solar-site-selection", "/work/makhbazy",
  "/services", "/writing",
  "/writing/when-to-trust-a-probabilistic-forecast",
  "/writing/why-accuracy-is-not-enough-for-oil-spill-detection",
  "/writing/what-an-ai-agent-should-do-when-evidence-is-missing",
] as const;
const topLevelLaunchRoutes = ["/", "/about", "/work", "/services", "/writing"] as const;
const retiredArabicRoutes = ["/ar", "/ar/about", "/ar/work", "/ar/work/presaira", "/ar/services", "/ar/writing"] as const;

function absolute(route: string) {
  return route === "/" ? domain : `${domain}${route}`;
}

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(200);
}

async function viewportMetrics(page: Page) {
  return page.evaluate(() => ({
    viewportWidth: document.documentElement.clientWidth,
    viewportHeight: innerHeight,
    scrollWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
    viewportCount: Math.round((document.documentElement.scrollHeight / innerHeight) * 100) / 100,
  }));
}

async function expectNoHorizontalOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
}

test.describe("Final English-only public production acceptance", () => {
  test("all 14 public HTML routes are English, self-canonical, and expose no Arabic alternate", async ({ page }) => {
    const evidence: Array<{ route: string; canonical: string }> = [];
    for (const route of htmlRoutes) {
      const response = await page.goto(route);
      expect(response?.ok(), `route failed: ${route}`).toBeTruthy();
      await settle(page);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", absolute(route));
      await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(0);
      await expectNoHorizontalOverflow(page);
      evidence.push({ route, canonical: await page.locator('link[rel="canonical"]').getAttribute("href") ?? "" });
    }
    await mkdir(artifactRoot, { recursive: true });
    await writeFile(path.join(artifactRoot, "route-parity.json"), JSON.stringify(evidence, null, 2));
  });

  test("retired Arabic routes remain unavailable", async ({ page }) => {
    for (const route of retiredArabicRoutes) {
      const response = await page.goto(route);
      expect(response?.status(), `${route} should be retired`).toBe(404);
    }
  });

  test("top-level English launch surfaces pass full-page axe", async ({ page }) => {
    for (const route of topLevelLaunchRoutes) {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      await settle(page);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `${route} axe violations`).toEqual([]);
    }
  });

  test("final English Home matrix preserves accepted composition at 1920, 430 and 390", async ({ page }) => {
    await mkdir(screenshotRoot, { recursive: true });
    const evidence: Record<string, Awaited<ReturnType<typeof viewportMetrics>>> = {};
    for (const viewport of [
      { label: "1920", width: 1920, height: 1080 },
      { label: "430", width: 430, height: 932 },
      { label: "390", width: 390, height: 844 },
    ] as const) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto("/");
      expect(response?.ok()).toBeTruthy();
      await settle(page);
      for (const selector of ["h1", "#work", "#method", "#writing", "#contact"]) await expect(page.locator(selector)).toBeVisible();
      await expect(page.getByRole("link", { name: "AR", exact: true })).toHaveCount(0);
      await expectNoHorizontalOverflow(page);
      const metrics = await viewportMetrics(page);
      if (viewport.width >= 1900) expect(metrics.viewportCount).toBeLessThanOrEqual(7.25);
      if (viewport.width <= 430) expect(metrics.viewportCount).toBeLessThanOrEqual(10);
      evidence[viewport.label] = metrics;
      await page.screenshot({ path: path.join(screenshotRoot, `english-home-${viewport.label}.png`), fullPage: true });
    }
    await writeFile(path.join(artifactRoot, "home-matrix-metrics.json"), JSON.stringify(evidence, null, 2));
  });

  test("English About remains readable at desktop and mobile", async ({ page }) => {
    await mkdir(screenshotRoot, { recursive: true });
    for (const viewport of [
      { label: "1920", width: 1920, height: 1080 },
      { label: "390", width: 390, height: 844 },
    ] as const) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      const response = await page.goto("/about");
      expect(response?.ok()).toBeTruthy();
      await settle(page);
      await expect(page.locator("h1")).toBeVisible();
      await expectNoHorizontalOverflow(page);
      await page.screenshot({ path: path.join(screenshotRoot, `english-about-${viewport.label}.png`), fullPage: true });
    }
  });

  test("reduced-motion and no-JS fallbacks preserve the English Home narrative", async ({ browser }) => {
    const reducedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto("/");
    await settle(reducedPage);
    await expect(reducedPage.locator("h1")).toBeVisible();
    await expect(reducedPage.locator("#work")).toBeVisible();
    await expectNoHorizontalOverflow(reducedPage);
    expect(await reducedPage.locator(".credibility-track").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
    await reducedContext.close();

    const noJsContext = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
    const noJsPage = await noJsContext.newPage();
    const response = await noJsPage.goto("/");
    expect(response?.ok()).toBeTruthy();
    for (const selector of ["h1", "#work", "#method", "#writing", "#contact"]) await expect(noJsPage.locator(selector)).toBeVisible();
    await expectNoHorizontalOverflow(noJsPage);
    await noJsContext.close();
  });

  test("writes a machine-readable English-only acceptance manifest", async () => {
    await mkdir(artifactRoot, { recursive: true });
    await writeFile(path.join(artifactRoot, "release-evidence.json"), JSON.stringify({
      contract: "English-only public surface; Arabic source retained dormant",
      htmlRoutes,
      retiredArabicRoutes,
      homeViewports: ["1920x1080", "430x932", "390x844"],
      aboutViewports: ["1920x1080", "390x844"],
    }, null, 2));
  });
});
