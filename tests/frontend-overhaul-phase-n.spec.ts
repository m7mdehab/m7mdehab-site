import { expect, test } from "@playwright/test";

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(300);
}

test.describe("Phase N brand evidence and computational atmosphere", () => {
  test("hero signature is spaced, roles are discipline-only and ambient objects react independently", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await settle(page);

    const signature = page.locator(".overhaul-hero-title");
    const letterSpacing = await signature.evaluate((element) => Number.parseFloat(getComputedStyle(element).letterSpacing));
    expect(letterSpacing).toBeGreaterThan(0);

    const roleLabels = await page.locator(".overhaul-hero-roles > span").evaluateAll((elements) =>
      elements.map((element) => (element.textContent ?? "").trim()),
    );
    expect(roleLabels).toEqual(["Data Engineer", "AI Engineer", "Business Analyst", "Data Analyst"]);
    expect(roleLabels.join(" ")).not.toContain("Team Lead");

    const items = page.locator("[data-ambient-item]");
    expect(await items.count()).toBeGreaterThanOrEqual(32);
    const target = items.nth(8);
    const far = items.nth(23);
    const box = await target.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.waitForTimeout(120);
    const targetProximity = Number(await target.evaluate((element) => (element as HTMLElement).style.getPropertyValue("--pointer-proximity") || "0"));
    const farProximity = Number(await far.evaluate((element) => (element as HTMLElement).style.getPropertyValue("--pointer-proximity") || "0"));
    expect(targetProximity).toBeGreaterThan(.45);
    expect(targetProximity).toBeGreaterThan(farProximity);
  });

  test("brand evidence uses one uniform card system and loops in native colour", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await settle(page);

    const rail = page.locator(".credibility-rail");
    const sequences = rail.locator(".credibility-logo-sequence");
    await expect(sequences).toHaveCount(2);
    await expect(sequences.nth(1)).toHaveAttribute("aria-hidden", "true");
    await expect(sequences.first().locator(".credibility-brand-item")).toHaveCount(9);
    expect(await sequences.first().locator("[data-brand-logo]").count()).toBe(10);
    expect(await rail.locator("[data-brand-logo]").count()).toBe(20);
    await expect(rail.locator(".credibility-group")).toHaveCount(0);

    const track = rail.locator(".credibility-logo-track");
    expect(await track.evaluate((element) => getComputedStyle(element).animationName)).toContain("credibility-loop");

    const cards = sequences.first().locator(".credibility-brand-item");
    const cardGeometry = await cards.evaluateAll((elements) => elements.map((element) => {
      const rect = element.getBoundingClientRect();
      const logoStage = element.querySelector<HTMLElement>(".credibility-brand-marks");
      const logoRect = logoStage?.getBoundingClientRect();
      const style = getComputedStyle(element);
      return {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        display: style.display,
        logoWidth: logoRect ? Math.round(logoRect.width) : 0,
        logoHeight: logoRect ? Math.round(logoRect.height) : 0,
      };
    }));
    expect(new Set(cardGeometry.map((item) => item.width)).size).toBe(1);
    expect(new Set(cardGeometry.map((item) => item.height)).size).toBe(1);
    expect(new Set(cardGeometry.map((item) => item.logoWidth)).size).toBe(1);
    expect(new Set(cardGeometry.map((item) => item.logoHeight)).size).toBe(1);
    expect(cardGeometry.every((item) => item.display === "grid")).toBeTruthy();

    const network = sequences.first().locator('.credibility-brand-item[aria-label^="Network International:"]');
    await expect(network).toContainText("Network International");
    await expect(network).toContainText("Data engineering & migration");

    const nativeLogos = sequences.first().locator(".brand-logo-native");
    expect(await nativeLogos.count()).toBe(10);
    const firstImage = nativeLogos.first().locator("img");
    expect(await firstImage.evaluate((element) => getComputedStyle(element).filter)).toBe("none");

    await expect(rail).toContainText("Canadian International College");
    await expect(rail).toContainText("BSc Computer Science · Data Science");
    await expect(rail.locator('[data-brand-logo="exploreai"]').first()).toBeVisible();
    await expect(rail.locator('[data-brand-logo="alx"]').first()).toBeVisible();

    await page.goto("/about");
    await settle(page);
    const aboutLogos = page.locator("[data-brand-logo]");
    expect(await aboutLogos.count()).toBeGreaterThanOrEqual(8);
    expect(await page.locator(".brand-logo-native").count()).toBeGreaterThanOrEqual(8);

    await page.goto("/work/ghareeb-oglu");
    await settle(page);
    await expect(page.locator('[data-brand-logo="ghareeb"].brand-logo-native')).toBeVisible();
  });

  test("mobile keeps the one-line signature, one manual rail sequence and no horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settle(page);
    const title = page.locator(".overhaul-hero-title");
    await expect(title).toBeVisible();
    expect(await title.evaluate((element) => getComputedStyle(element).whiteSpace)).toBe("nowrap");

    const railTrack = page.locator(".credibility-logo-track");
    expect(await railTrack.evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
    await expect(page.locator('.credibility-logo-sequence[aria-hidden="true"]')).toBeHidden();

    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(2);
  });
});
