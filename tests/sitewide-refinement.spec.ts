import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const htmlRoutes = [
  "/", "/about", "/work",
  "/work/presaira", "/work/opportunityos", "/work/ghareeb-oglu",
  "/work/oil-spill-detection", "/work/solar-site-selection", "/work/makhbazy",
  "/services", "/writing",
  "/writing/when-to-trust-a-probabilistic-forecast",
  "/writing/why-accuracy-is-not-enough-for-oil-spill-detection",
  "/writing/what-an-ai-agent-should-do-when-evidence-is-missing",
] as const;

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(220);
}

async function noHorizontalOverflow(page: Page) {
  expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(2);
}

test.describe("sitewide visual refinement contract", () => {
  test("all public HTML routes are free of em dashes and horizontal overflow", async ({ page }) => {
    for (const route of htmlRoutes) {
      const response = await page.goto(route);
      expect(response?.ok(), route).toBeTruthy();
      await settle(page);
      const html = await page.content();
      const publicMarkup = html
        .replace(/<script[\s\S]*?<\/script>/gi, "")
        .replace(/<style[\s\S]*?<\/style>/gi, "");
      expect(publicMarkup, `${route} contains an em dash in public markup`).not.toContain("—");
      await noHorizontalOverflow(page);
    }
  });

  test("homepage removes redundant scaffolding and uses durable section language", async ({ page }) => {
    await page.goto("/");
    await settle(page);

    await expect(page.getByText("M7 / 01", { exact: true })).toHaveCount(0);
    await expect(page.getByText("DATA · AI · PRODUCT", { exact: true })).toHaveCount(0);
    await expect(page.getByText("CAIRO, EGYPT", { exact: true })).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Different problems. One standard." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Ideas, lessons and field notes." })).toBeVisible();
    await expect(page.getByText(/6 projects/i)).toHaveCount(0);
    await expect(page.getByText(/Six public projects/i)).toHaveCount(0);
  });

  test("opportunity paths are symmetric siblings with matched CTA geometry", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#contact");
    await settle(page);

    const paths = page.locator(".closing-path");
    await expect(paths).toHaveCount(2);
    for (const path of await paths.all()) await expect(path.locator(".closing-path-actions a")).toHaveCount(2);

    const geometry = await paths.evaluateAll((elements) => elements.map((element) => {
      const rect = element.getBoundingClientRect();
      const action = element.querySelector<HTMLElement>(".closing-path-actions");
      const actionRect = action?.getBoundingClientRect();
      return {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        actionY: actionRect ? Math.round(actionRect.top - rect.top) : -1,
      };
    }));
    expect(Math.abs(geometry[0].width - geometry[1].width)).toBeLessThanOrEqual(2);
    expect(Math.abs(geometry[0].height - geometry[1].height)).toBeLessThanOrEqual(2);
    expect(Math.abs(geometry[0].actionY - geometry[1].actionY)).toBeLessThanOrEqual(3);
  });

  test("carousel holds one consistent frame and long project titles stay inside the copy panel", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/#work");
    await settle(page);

    const cards = page.locator(".selected-work-carousel-card");
    await expect(cards).toHaveCount(6);
    const heights = await cards.evaluateAll((elements) => elements.map((element) => Math.round(element.getBoundingClientRect().height)));
    expect(new Set(heights).size).toBe(1);

    const next = page.getByRole("button", { name: "Next project" });
    await next.click();
    await page.waitForTimeout(450);
    const active = page.locator('.selected-work-carousel-slide[data-project-slug="opportunityos"]');
    const copy = active.locator(".selected-work-carousel-copy");
    const title = copy.locator("h3");
    const bounds = await Promise.all([copy.boundingBox(), title.boundingBox()]);
    expect(bounds[0]).not.toBeNull();
    expect(bounds[1]).not.toBeNull();
    expect(bounds[1]!.x).toBeGreaterThanOrEqual(bounds[0]!.x - 1);
    expect(bounds[1]!.x + bounds[1]!.width).toBeLessThanOrEqual(bounds[0]!.x + bounds[0]!.width + 1);
  });

  test("modernized top-level and editorial surfaces remain accessible", async ({ page }) => {
    for (const route of ["/about", "/work", "/services", "/writing", "/work/opportunityos", "/writing/when-to-trust-a-probabilistic-forecast"] as const) {
      await page.goto(route);
      await settle(page);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations, route).toEqual([]);
    }
  });

  test("retired prototype routes use the polished 404 surface", async ({ page }) => {
    for (const route of ["/prototypes", "/prototypes/cinematic", "/prototypes/spatial", "/prototypes/kinetic"] as const) {
      const response = await page.goto(route);
      expect(response?.status(), route).toBe(404);
      await expect(page.getByRole("heading", { name: "This route is no longer part of the public site." })).toBeVisible();
      await noHorizontalOverflow(page);
    }
  });
});
