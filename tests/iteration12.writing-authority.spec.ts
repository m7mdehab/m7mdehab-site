import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const domain = "https://m7mdehab.com";
const slugs = [
  "when-to-trust-a-probabilistic-forecast",
  "why-accuracy-is-not-enough-for-oil-spill-detection",
  "what-an-ai-agent-should-do-when-evidence-is-missing",
] as const;
const englishRoutes = ["/writing", ...slugs.map((slug) => `/writing/${slug}`)];
const arabicRoutes = ["/ar/writing", ...slugs.map((slug) => `/ar/writing/${slug}`)];

async function assertNoHorizontalOverflow(page: import("@playwright/test").Page, route: string) {
  const overflow = await page.evaluate(() => {
    const viewportWidth = document.documentElement.clientWidth;
    const documentWidth = document.documentElement.scrollWidth;
    const offenders = Array.from(document.querySelectorAll<HTMLElement>("body *"))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === "string" ? element.className : "",
          text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 90),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      })
      .filter((item) => item.right > viewportWidth + 1 || item.left < -1)
      .slice(0, 20);
    return { documentWidth, viewportWidth, offenders };
  });

  expect(
    overflow.documentWidth,
    `${route} horizontal overflow: ${JSON.stringify(overflow, null, 2)}`,
  ).toBeLessThanOrEqual(overflow.viewportWidth + 1);
}

test.describe("Iteration 12 evidence-backed authority writing", () => {
  test("writing hubs and every essay self-canonicalize with reciprocal language alternates", async ({ page }) => {
    await page.goto("/writing");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${domain}/writing`);
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute("href", `${domain}/ar/writing`);

    await page.goto("/ar/writing");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${domain}/ar/writing`);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", `${domain}/writing`);

    for (const slug of slugs) {
      const english = `${domain}/writing/${slug}`;
      const arabic = `${domain}/ar/writing/${slug}`;

      await page.goto(`/writing/${slug}`);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", english);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", english);
      await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute("href", arabic);

      await page.goto(`/ar/writing/${slug}`);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", arabic);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", arabic);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", english);
    }
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
      expect(schema.about.url).toMatch(new RegExp(`^${domain.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/work/`));
      expect(await page.locator("article section").count()).toBeGreaterThanOrEqual(9);
      await expect(page.locator('[data-authority-link="article-to-project"]')).toHaveCount(1);
      expect(await page.locator('a[target="_blank"]').count()).toBeGreaterThanOrEqual(3);
    }
  });

  test("homepages promote real essays and primary navigation exposes the writing hub", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("link", { name: "Writing", exact: true })).toHaveAttribute("href", "/writing");
    await expect(page.locator('#writing [data-authority-link="article"]')).toHaveCount(3);
    await expect(page.locator('#writing a[href="/writing/when-to-trust-a-probabilistic-forecast"]')).toBeVisible();

    await page.goto("/ar");
    await expect(page.getByRole("link", { name: "الكتابة", exact: true })).toHaveAttribute("href", "/ar/writing");
    await expect(page.locator('#writing [data-authority-link="article"]')).toHaveCount(3);
    await expect(page.locator('#writing a[href="/ar/writing/what-an-ai-agent-should-do-when-evidence-is-missing"]')).toBeVisible();
  });

  test("all English and Arabic writing surfaces pass axe on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const route of [...englishRoutes, ...arabicRoutes]) {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `${route} axe violations`).toEqual([]);
    }
  });

  test("all writing surfaces fit a 390px viewport in both directions", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of [...englishRoutes, ...arabicRoutes]) {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      await assertNoHorizontalOverflow(page, route);
    }
  });

  test.describe("writing progressive enhancement without JavaScript", () => {
    test.use({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });

    test("English and Arabic essays remain readable and retain evidence links", async ({ page }) => {
      for (const route of [
        "/writing/when-to-trust-a-probabilistic-forecast",
        "/ar/writing/when-to-trust-a-probabilistic-forecast",
      ]) {
        const response = await page.goto(route);
        expect(response?.ok()).toBeTruthy();
        await page.waitForLoadState("domcontentloaded");
        await assertNoHorizontalOverflow(page, route);
        await expect(page.locator("article")).toBeVisible();
        expect(await page.locator("article section").count()).toBeGreaterThanOrEqual(9);
        await expect(page.locator('[data-authority-link="article-to-project"]')).toBeVisible();
      }
    });
  });
});