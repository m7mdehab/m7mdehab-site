import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const domain = "https://m7mdehab.com";
const englishRoutes = [
  "/",
  "/about",
  "/work",
  "/services",
  "/writing",
  "/work/presaira",
  "/work/opportunityos",
  "/work/ghareeb-oglu",
  "/work/oil-spill-detection",
  "/work/solar-site-selection",
  "/work/makhbazy",
] as const;
const retiredArabicRoutes = [
  "/ar",
  "/ar/about",
  "/ar/work",
  "/ar/work/presaira",
  "/ar/services",
  "/ar/writing",
  "/ar/writing/when-to-trust-a-probabilistic-forecast",
] as const;

async function assertNoHorizontalOverflow(page: import("@playwright/test").Page) {
  const { documentWidth, viewportWidth } = await page.evaluate(() => ({
    documentWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.clientWidth,
  }));
  expect(documentWidth).toBeLessThanOrEqual(viewportWidth + 1);
}

test.describe("English-only public language boundary", () => {
  test("English root is canonical and does not advertise an Arabic alternate", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", domain);
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveCount(0);
    await expect(page.locator('a[href="/ar"]')).toHaveCount(0);
    await expect(page.getByRole("link", { name: "AR", exact: true })).toHaveCount(0);
  });

  test("retired Arabic routes remain unpublished", async ({ page }) => {
    for (const route of retiredArabicRoutes) {
      const response = await page.goto(route);
      expect(response?.status(), `${route} should remain retired`).toBe(404);
    }
  });

  test("English structured identity remains the sole published language", async ({ page }) => {
    await page.goto("/");
    const graph = await page.locator('script[type="application/ld+json"]').evaluate((node) => {
      const parsed = JSON.parse(node.textContent ?? "{}");
      return parsed["@graph"] as Array<Record<string, unknown>>;
    });

    const profilePage = graph.find((node) => node["@type"] === "ProfilePage");
    const creativeWorks = graph.filter((node) => node["@type"] === "CreativeWork");
    expect(profilePage?.inLanguage).toBe("en");
    expect(creativeWorks).toHaveLength(6);
    expect(creativeWorks.every((work) => work.inLanguage === "en")).toBeTruthy();
  });

  test("sitemap contains only the 14 English canonical HTML URLs", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBeTruthy();
    const xml = await response.text();
    expect(xml).not.toContain("/ar");
    expect(xml.match(/<url>/g) ?? []).toHaveLength(14);
    expect(xml).not.toContain('hreflang="ar"');
  });

  test("English launch routes remain accessible on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const route of englishRoutes) {
      const response = await page.goto(route);
      expect(response?.ok(), `${route} should load`).toBeTruthy();
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `${route} axe violations`).toEqual([]);
    }
  });

  test("English launch routes fit the 390px mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of englishRoutes) {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      await assertNoHorizontalOverflow(page);
    }
  });
});
