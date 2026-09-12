import { expect, test } from "@playwright/test";

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForTimeout(450);
}

test.describe("Phase D production visual foundation", () => {
  test("English home exposes the system hero, reduced nav and truthful credibility rail", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    const hero = page.locator(".overhaul-hero");
    await expect(hero).toBeVisible();
    await expect(hero.locator("h1")).toContainText("Mohammed Ehab");
    await expect(hero.locator("h1")).toContainText("ElNomany");
    await expect(page.locator(".hero-evidence-atlas")).toBeVisible();

    const heroHeight = await hero.evaluate((element) => element.getBoundingClientRect().height);
    expect(heroHeight).toBeLessThanOrEqual(920);

    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(nav).toBeVisible();
    const navText = (await nav.innerText()).replace(/\s+/g, " ");
    expect(navText).toContain("Work");
    expect(navText).toContain("About");
    expect(navText).toContain("Writing");
    expect(navText).toContain("Contact");
    expect(navText).toContain("AR");
    expect(navText).not.toContain("Expertise");
    expect(navText).not.toContain("Experience");

    const rail = page.locator(".credibility-rail");
    await expect(rail).toBeVisible();
    await expect(rail).toContainText("Experience across");
    await expect(rail).toContainText("Learning & credentials");
    await expect(rail.locator('[aria-label="Employment: Network International"]').first()).toBeVisible();
    await expect(rail.locator('[aria-label="Credential: Databricks"]').first()).toBeVisible();
    await expect(rail.locator('[aria-label="Credential: McKinsey Forward"]').first()).toBeVisible();
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
    await expect(page.locator(".hero-evidence-atlas")).toBeVisible();
    await expect(page.locator(".credibility-rail")).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath("phase-d-home-390.png"), fullPage: true });
  });

  test("reduced motion stops the evidence entrance and credibility loop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    const railAnimation = await page.locator(".credibility-track").evaluate((element) => getComputedStyle(element).animationName);
    expect(railAnimation).toBe("none");

    const atlasAnimations = await page.locator(".atlas-panel").evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).animationName),
    );
    expect(atlasAnimations.every((name) => name === "none")).toBeTruthy();

    const railOverflow = await page.locator(".credibility-viewport").evaluate((element) => getComputedStyle(element).overflowX);
    expect(["auto", "scroll"]).toContain(railOverflow);
  });
});
