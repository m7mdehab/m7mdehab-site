import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const domain = "https://m7mdehab.com";
const projectSlugs = [
  "presaira",
  "opportunityos",
  "ghareeb-oglu",
  "oil-spill-detection",
  "solar-site-selection",
  "makhbazy",
] as const;
const arabicRoutes = [
  "/ar",
  "/ar/about",
  "/ar/work",
  "/ar/services",
  ...projectSlugs.map((slug) => `/ar/work/${slug}`),
];

async function assertNoHorizontalOverflow(page: import("@playwright/test").Page) {
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
    `Arabic horizontal overflow: ${JSON.stringify(overflow, null, 2)}`,
  ).toBeLessThanOrEqual(overflow.viewportWidth + 1);
}

test.describe("Iteration 11 Arabic localization", () => {
  test("English and Arabic roots expose the correct document language, direction and reciprocal alternates", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute("href", `${domain}/ar`);

    await page.goto("/ar");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${domain}/ar`);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", domain);
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute("href", `${domain}/ar`);
  });

  test("all Arabic project routes self-canonicalize and point back to their English equivalents", async ({ page }) => {
    for (const slug of projectSlugs) {
      const arabic = `${domain}/ar/work/${slug}`;
      const english = `${domain}/work/${slug}`;
      const response = await page.goto(`/ar/work/${slug}`);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", arabic);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", arabic);
      await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", english);
      await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute("href", arabic);
    }
  });

  test("Arabic structured identity preserves the same public entity and service boundaries", async ({ page }) => {
    await page.goto("/ar");
    const graph = await page.locator('script[type="application/ld+json"]').evaluate((node) => {
      const parsed = JSON.parse(node.textContent ?? "{}");
      return parsed["@graph"] as Array<Record<string, unknown>>;
    });

    const profilePage = graph.find((node) => node["@type"] === "ProfilePage");
    const person = graph.find((node) => node["@type"] === "Person") as Record<string, unknown> | undefined;
    const creativeWorks = graph.filter((node) => node["@type"] === "CreativeWork");

    expect(profilePage?.inLanguage).toBe("ar");
    expect(person?.name).toBe("Mohammed Ehab ElNomany");
    expect(person?.sameAs).toEqual([
      "https://github.com/m7mdehab",
      "https://www.linkedin.com/in/mohammed-ehab",
    ]);
    expect(person?.makesOffer).toHaveLength(4);
    expect(creativeWorks).toHaveLength(6);
    expect(creativeWorks.every((work) => work.inLanguage === "ar")).toBeTruthy();
    expect(JSON.stringify(graph)).not.toContain("client count");
  });

  test("Arabic service conversion keeps stable analytics semantics on the dedicated services route", async ({ page }) => {
    await page.goto("/ar");
    await expect(page.locator('[data-conversion="home-to-services-ar"]')).toBeVisible();
    await expect(page.locator('[data-conversion="home-to-services-ar"]')).toHaveAttribute("href", "/ar/services");

    await page.goto("/ar/services");
    await expect(page.locator("#services .service-card")).toHaveCount(4);
    await expect(page.locator('[data-conversion="service-to-contact"]')).toHaveCount(4);

    const projectLinks = page.locator('[data-conversion="service-to-project"]');
    expect(await projectLinks.count()).toBeGreaterThan(0);
    for (let i = 0; i < await projectLinks.count(); i += 1) {
      await expect(projectLinks.nth(i)).toHaveAttribute("href", /^\/ar\/work\//);
      expect(await projectLinks.nth(i).getAttribute("data-service-id")).toBeTruthy();
    }
  });

  test("all Arabic launch routes pass axe on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    for (const route of arabicRoutes) {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, `${route} axe violations`).toEqual([]);
    }
  });

  test("all Arabic launch routes fit the 390px mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const route of arabicRoutes) {
      const response = await page.goto(route);
      expect(response?.ok()).toBeTruthy();
      await assertNoHorizontalOverflow(page);
    }
    await page.goto("/ar");
    await expect(page.getByRole("link", { name: "English" })).toBeVisible();
  });

  test("Arabic reduced-motion mode preserves content without Lenis ownership", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto("/ar");
    expect(response?.ok()).toBeTruthy();
    expect(await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
    expect(await page.evaluate(() => document.documentElement.className)).not.toMatch(/\blenis\b/);
    await expect(page.locator("#work")).toBeVisible();
  });

  test.describe("Arabic progressive enhancement without JavaScript", () => {
    test.use({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });

    test("core Arabic narrative and conversion paths remain visible", async ({ page }) => {
      const response = await page.goto("/ar");
      expect(response?.ok()).toBeTruthy();
      await page.waitForLoadState("domcontentloaded");
      await assertNoHorizontalOverflow(page);

      for (const selector of ["#work", "#method", "#writing", "#contact"]) {
        await expect(page.locator(selector)).toBeVisible();
      }
      await expect(page.getByRole("link", { name: "عني", exact: true })).toHaveAttribute("href", "/ar/about");
      await expect(page.locator('[data-conversion="home-to-services-ar"]')).toHaveAttribute("href", "/ar/services");
      await expect(page.locator('[data-conversion="contact-role-email-ar"]')).toBeVisible();
    });
  });
});
