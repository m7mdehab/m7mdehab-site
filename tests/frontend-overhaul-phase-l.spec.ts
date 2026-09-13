import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const domain = "https://m7mdehab.com";
const artifactRoot = path.resolve("artifacts", "phase-l");
const screenshotRoot = path.join(artifactRoot, "screenshots");

const routePairs = [
  ["/", "/ar"],
  ["/about", "/ar/about"],
  ["/work", "/ar/work"],
  ["/work/presaira", "/ar/work/presaira"],
  ["/work/opportunityos", "/ar/work/opportunityos"],
  ["/work/ghareeb-oglu", "/ar/work/ghareeb-oglu"],
  ["/work/oil-spill-detection", "/ar/work/oil-spill-detection"],
  ["/work/solar-site-selection", "/ar/work/solar-site-selection"],
  ["/work/makhbazy", "/ar/work/makhbazy"],
  ["/services", "/ar/services"],
  ["/writing", "/ar/writing"],
  ["/writing/when-to-trust-a-probabilistic-forecast", "/ar/writing/when-to-trust-a-probabilistic-forecast"],
  ["/writing/why-accuracy-is-not-enough-for-oil-spill-detection", "/ar/writing/why-accuracy-is-not-enough-for-oil-spill-detection"],
  ["/writing/what-an-ai-agent-should-do-when-evidence-is-missing", "/ar/writing/what-an-ai-agent-should-do-when-evidence-is-missing"],
] as const;

const topLevelLaunchRoutes = [
  "/",
  "/about",
  "/work",
  "/services",
  "/writing",
  "/ar",
  "/ar/about",
  "/ar/work",
  "/ar/services",
  "/ar/writing",
] as const;

function absolute(route: string) {
  return route === "/" ? domain : `${domain}${route}`;
}

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images).map((image) => image.complete ? Promise.resolve() : new Promise<void>((resolve) => {
      const done = () => resolve();
      image.addEventListener("load", done, { once: true });
      image.addEventListener("error", done, { once: true });
      window.setTimeout(done, 5_000);
    })));
  });
  await page.waitForTimeout(250);
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

test.describe("Phase L final EN/AR/responsive production acceptance", () => {
  test("every public HTML route pair is reciprocal and self-canonical", async ({ page }) => {
    const evidence: Array<{ route: string; canonical: string; lang: string; dir: string | null }> = [];

    for (const [englishRoute, arabicRoute] of routePairs) {
      for (const entry of [
        { route: englishRoute, language: "en", alternate: arabicRoute, alternateLanguage: "ar" },
        { route: arabicRoute, language: "ar", alternate: englishRoute, alternateLanguage: "en" },
      ] as const) {
        const response = await page.goto(entry.route);
        expect(response?.ok(), `route failed: ${entry.route}`).toBeTruthy();
        await settle(page);

        await expect(page.locator("html")).toHaveAttribute("lang", entry.language);
        if (entry.language === "ar") await expect(page.locator("html")).toHaveAttribute("dir", "rtl");

        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", absolute(entry.route));
        await expect(page.locator(`link[rel="alternate"][hreflang="${entry.alternateLanguage}"]`)).toHaveAttribute("href", absolute(entry.alternate));
        await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", absolute(englishRoute));
        await expect(page.locator('script[type="application/ld+json"]').first()).toBeAttached();
        await expectNoHorizontalOverflow(page);

        evidence.push({
          route: entry.route,
          canonical: await page.locator('link[rel="canonical"]').getAttribute("href") ?? "",
          lang: await page.locator("html").getAttribute("lang") ?? "",
          dir: await page.locator("html").getAttribute("dir"),
        });
      }
    }

    await mkdir(artifactRoot, { recursive: true });
    await writeFile(path.join(artifactRoot, "route-parity.json"), JSON.stringify(evidence, null, 2));
  });

  test("top-level English and Arabic launch surfaces pass full-page axe", async ({ page }) => {
    for (const route of topLevelLaunchRoutes) {
      const response = await page.goto(route);
      expect(response?.ok(), `route failed: ${route}`).toBeTruthy();
      await settle(page);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `${route} axe violations`).toEqual([]);
    }
  });

  test("final Home matrix preserves accepted composition at 1920, 430 and 390 in both languages", async ({ page }) => {
    await mkdir(screenshotRoot, { recursive: true });
    const evidence: Record<string, Awaited<ReturnType<typeof viewportMetrics>>> = {};

    for (const locale of [
      { label: "en", route: "/" },
      { label: "ar", route: "/ar" },
    ] as const) {
      for (const viewport of [
        { label: "1920", width: 1920, height: 1080 },
        { label: "430", width: 430, height: 932 },
        { label: "390", width: 390, height: 844 },
      ] as const) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        const response = await page.goto(locale.route);
        expect(response?.ok()).toBeTruthy();
        await settle(page);

        await expect(page.locator("h1")).toBeVisible();
        await expect(page.locator("#work")).toBeVisible();
        await expect(page.locator("#method")).toBeVisible();
        await expect(page.locator("#writing")).toBeVisible();
        await expect(page.locator("#contact")).toBeVisible();
        await expectNoHorizontalOverflow(page);

        const metrics = await viewportMetrics(page);
        if (viewport.width >= 1900) expect(metrics.viewportCount).toBeLessThanOrEqual(7.25);
        if (viewport.width <= 430) expect(metrics.viewportCount).toBeLessThanOrEqual(10);

        evidence[`${locale.label}-${viewport.label}`] = metrics;
        await page.screenshot({
          path: path.join(screenshotRoot, `phase-l-${locale.label}-home-${viewport.label}.png`),
          fullPage: true,
        });
      }
    }

    await writeFile(path.join(artifactRoot, "home-matrix-metrics.json"), JSON.stringify(evidence, null, 2));
  });

  test("final About matrix remains readable at desktop and mobile in both languages", async ({ page }) => {
    await mkdir(screenshotRoot, { recursive: true });

    for (const locale of [
      { label: "en", route: "/about" },
      { label: "ar", route: "/ar/about" },
    ] as const) {
      for (const viewport of [
        { label: "1920", width: 1920, height: 1080 },
        { label: "390", width: 390, height: 844 },
      ] as const) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        const response = await page.goto(locale.route);
        expect(response?.ok()).toBeTruthy();
        await settle(page);
        await expect(page.locator("h1")).toBeVisible();
        await expectNoHorizontalOverflow(page);
        await page.screenshot({
          path: path.join(screenshotRoot, `phase-l-${locale.label}-about-${viewport.label}.png`),
          fullPage: true,
        });
      }
    }
  });

  test("reduced-motion and no-JS fallbacks preserve the core Home narrative in both languages", async ({ browser }) => {
    for (const route of ["/", "/ar"] as const) {
      const reducedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
      const reducedPage = await reducedContext.newPage();
      await reducedPage.goto(route);
      await settle(reducedPage);
      await expect(reducedPage.locator("h1")).toBeVisible();
      await expect(reducedPage.locator("#work")).toBeVisible();
      await expect(reducedPage.locator("#contact")).toBeVisible();
      await expectNoHorizontalOverflow(reducedPage);
      expect(await reducedPage.locator(".credibility-track").evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
      await reducedContext.close();

      const noJsContext = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
      const noJsPage = await noJsContext.newPage();
      const response = await noJsPage.goto(route);
      expect(response?.ok()).toBeTruthy();
      await expect(noJsPage.locator("h1")).toBeVisible();
      await expect(noJsPage.locator("#work")).toBeVisible();
      await expect(noJsPage.locator("#method")).toBeVisible();
      await expect(noJsPage.locator("#writing")).toBeVisible();
      await expect(noJsPage.locator("#contact")).toBeVisible();
      await expectNoHorizontalOverflow(noJsPage);
      await noJsContext.close();
    }
  });

  test("writes a machine-readable final release evidence manifest", async () => {
    await mkdir(artifactRoot, { recursive: true });
    await writeFile(path.join(artifactRoot, "release-evidence.json"), JSON.stringify({
      phase: "L",
      contract: "Final EN/AR/responsive production hardening and acceptance",
      routePairs: routePairs.map(([en, ar]) => ({ en, ar })),
      topLevelAxeRoutes: topLevelLaunchRoutes,
      homeViewports: ["1920x1080", "430x932", "390x844"],
      aboutViewports: ["1920x1080", "390x844"],
      requirements: [
        "self-canonical bilingual HTML",
        "reciprocal hreflang and x-default",
        "structured data present",
        "full-page accessibility on top-level launch surfaces",
        "zero horizontal overflow",
        "reduced-motion fallback",
        "no-JS semantic fallback",
      ],
    }, null, 2));
  });
});
