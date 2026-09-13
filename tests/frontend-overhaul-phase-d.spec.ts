import { expect, test } from "@playwright/test";

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForTimeout(450);
}

test.describe("Phase D production visual foundation", () => {
  test("English home exposes the identity hero, reduced nav and truthful credibility rail", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    const hero = page.locator(".overhaul-hero");
    await expect(hero).toBeVisible();
    await expect(hero.locator("h1")).toHaveText("Mohammed Ehab ElNomany");
    await expect(page.locator(".hero-ambient-field")).toBeVisible();
    await expect(page.locator(".hero-evidence-atlas")).toHaveCount(0);
    const ambientCount = await page.locator("[data-ambient-item]").count();
    expect(ambientCount).toBeGreaterThanOrEqual(32);

    const roles = page.locator(".overhaul-hero-roles");
    await expect(roles).toContainText("Data Engineer");
    await expect(roles).toContainText("AI Engineer");
    await expect(roles).toContainText("Business Analyst");
    await expect(roles).toContainText("Data Analyst");
    await expect(roles).not.toContainText("Team Lead");

    const heroHeight = await hero.evaluate((element) => element.getBoundingClientRect().height);
    expect(heroHeight).toBeLessThanOrEqual(920);

    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(nav).toBeVisible();
    const navText = (await nav.innerText()).replace(/\s+/g, " ");
    expect(navText).toContain("Work");
    expect(navText).toContain("About");
    expect(navText).toContain("Writing");
    expect(navText).toContain("Contact");
    expect(navText).not.toContain("AR");
    expect(navText).not.toContain("Expertise");
    expect(navText).not.toContain("Experience");
    await expect(nav.locator('a[href="/ar"]')).toHaveCount(0);

    const rail = page.locator(".credibility-rail");
    await expect(rail).toBeVisible();
    await expect(rail.locator(".credibility-logo-sequence").first().locator(".credibility-brand-item")).toHaveCount(9);
    await expect(rail.locator(".credibility-group")).toHaveCount(0);
    await expect(rail.locator('[aria-label^="Network International:"]').first()).toBeVisible();
    await expect(rail.locator('[aria-label^="Databricks:"]').first()).toBeVisible();
    await expect(rail.locator('[aria-label^="McKinsey Forward:"]').first()).toBeVisible();
    expect(await rail.locator("[data-brand-logo]").count()).toBeGreaterThanOrEqual(18);
    await expect(rail).not.toContainText("Udacity / ITIDA");
    expect((await rail.innerText()).toLowerCase()).not.toContain("trusted by");

    await page.screenshot({ path: testInfo.outputPath("phase-d-home-1440.png"), fullPage: true });
  });

  test("Phase D foundation fits a 390px viewport", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    const dimensions = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    expect(dimensions.width).toBeLessThanOrEqual(dimensions.client + 2);

    await expect(page.locator(".overhaul-hero-title")).toBeVisible();
    await expect(page.locator(".hero-ambient-field")).toBeVisible();
    await expect(page.locator(".credibility-rail")).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath("phase-d-home-390.png"), fullPage: true });
  });

  test("reduced motion stops ambient motion and keeps the brand rail manually available", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    const railAnimation = await page.locator(".credibility-track").evaluate((element) => getComputedStyle(element).animationName);
    expect(railAnimation).toBe("none");

    const ambientAnimations = await page.locator(".hero-ambient-orbit").evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).animationName),
    );
    expect(ambientAnimations.every((name) => name === "none")).toBeTruthy();

    const railOverflow = await page.locator(".credibility-viewport").evaluate((element) => getComputedStyle(element).overflowX);
    expect(["auto", "scroll"]).toContain(railOverflow);
    await expect(page.locator('.credibility-logo-sequence[aria-hidden="true"]')).toBeHidden();
  });
});
