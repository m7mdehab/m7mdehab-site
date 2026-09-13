import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const domain = "https://m7mdehab.com";
const slugs = [
  "when-to-trust-a-probabilistic-forecast",
  "why-accuracy-is-not-enough-for-oil-spill-detection",
  "what-an-ai-agent-should-do-when-evidence-is-missing",
] as const;
const englishRoutes = ["/writing", ...slugs.map((slug) => `/writing/${slug}`)];

async function assertNoHorizontalOverflow(page: import("@playwright/test").Page, route: string) {
  const widths = await page.evaluate(() => ({ viewportWidth: document.documentElement.clientWidth, documentWidth: document.documentElement.scrollWidth }));
  expect(widths.documentWidth, `${route} horizontal overflow`).toBeLessThanOrEqual(widths.viewportWidth + 1);
}

test.describe("Iteration 12 evidence-backed authority writing", () => {
  test("writing hub and every essay self-canonicalize without Arabic alternates", async ({ page }) => {
    await page.goto("/writing");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${domain}/writing`);
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(0);

    for (const slug of slugs) {
      const canonical = `${domain}/writing/${slug}`;
      await page.goto(`/writing/${slug}`);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
      await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(0);
      expect((await page.goto(`/ar/writing/${slug}`))?.status()).toBe(404);
    }
    expect((await page.goto("/ar/writing"))?.status()).toBe(404);
  });

  test("authority essays expose substantive TechArticle schema, project provenance and inspectable sources", async ({ page }) => {
    for (const slug of slugs) {
      await page.goto(`/writing/${slug}`);
      const schema = await page.locator('script[type="application/ld+json"]').last().evaluate((node) => JSON.parse(node.textContent ?? "{}"));
      expect(schema["@type"]).toBe("TechArticle");
      expect(schema.author.name).toBe("Mohammed Ehab ElNomany");
      expect(schema.url).toBe(`${domain}/writing/${slug}`);
      expect(schema.dateCreated).toBe("2026-09-11");
      expect(schema.citation.length).toBeGreaterThanOrEqual(3);
      expect(await page.locator("article section").count()).toBeGreaterThanOrEqual(9);
      await expect(page.locator('[data-authority-link="article-to-project"]')).toHaveCount(1);
      expect(await page.locator('a[target="_blank"]').count()).toBeGreaterThanOrEqual(3);
    }
  });

  test("English Home promotes the evidence-backed writing signal", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".site-nav-wrap").getByRole("link", { name: "Writing", exact: true })).toHaveAttribute("href", "/writing");
    await expect(page.locator('#writing [data-authority-link="article"]')).toHaveCount(2);
    await expect(page.locator('#writing a[href="/writing/when-to-trust-a-probabilistic-forecast"]')).toBeVisible();
    await expect(page.locator('a[href="/ar/writing"]')).toHaveCount(0);
  });

  test("all English writing surfaces pass axe on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const route of englishRoutes) {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `${route} axe violations`).toEqual([]);
    }
  });

  test("all English writing surfaces fit a 390px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of englishRoutes) {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      await assertNoHorizontalOverflow(page, route);
    }
  });

  test.describe("writing progressive enhancement without JavaScript", () => {
    test.use({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    test("English essays remain readable and retain evidence links", async ({ page }) => {
      const route = "/writing/when-to-trust-a-probabilistic-forecast";
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      await page.waitForLoadState("domcontentloaded");
      await assertNoHorizontalOverflow(page, route);
      await expect(page.locator("article")).toBeVisible();
      expect(await page.locator("article section").count()).toBeGreaterThanOrEqual(9);
      await expect(page.locator('[data-authority-link="article-to-project"]')).toBeVisible();
    });
  });
});
