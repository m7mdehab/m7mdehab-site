import { expect, test } from "@playwright/test";

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

test.describe("Iteration 13 layout refinement", () => {
  test.use({ viewport: { width: 1440, height: 1000 } });

  test("homepage preserves the identity-led hero without restoring button-like skill UI", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    const hero = page.locator(".overhaul-hero");
    await expect(hero).toBeVisible();
    const heroHeight = await hero.evaluate((element) => element.getBoundingClientRect().height);
    expect(heroHeight).toBeLessThanOrEqual(920);

    await expect(page.locator("[data-solve-think]")).toBeVisible();
    await expect(page.locator(".skill-chip")).toHaveCount(0);

    const signature = page.locator(".overhaul-hero-signature");
    await expect(signature).toBeVisible();
    await expect(signature).toHaveText("Mohammed Ehab ElNomany");
    const signatureStyle = await signature.evaluate((element) => {
      const style = getComputedStyle(element);
      return { family: style.fontFamily, whiteSpace: style.whiteSpace };
    });
    expect(signatureStyle.family.toLowerCase()).toContain("italianno");
    expect(signatureStyle.whiteSpace).toBe("nowrap");
  });

  test("floating navigation yields to downward scrolling and returns on upward intent", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    const navWrap = page.locator(".site-nav-wrap");
    await expect(navWrap).toHaveAttribute("data-nav-hidden", "false");

    await page.evaluate(() => window.scrollTo(0, 1800));
    await page.waitForTimeout(180);
    await expect(navWrap).toHaveAttribute("data-nav-hidden", "true");

    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(180);
    await expect(navWrap).toHaveAttribute("data-nav-hidden", "false");
  });

  test("reduced motion keeps the navigation present and signature readable", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    await page.evaluate(() => window.scrollTo(0, 1800));
    await page.waitForTimeout(160);

    const navState = await page.locator(".site-nav-wrap").evaluate((element) => {
      const style = getComputedStyle(element);
      return { opacity: style.opacity, pointerEvents: style.pointerEvents, transform: style.transform };
    });
    expect(navState.opacity).toBe("1");
    expect(navState.pointerEvents).toBe("auto");
    expect(navState.transform).toBe("none");

    const signature = page.locator(".overhaul-hero-signature");
    await expect(signature).toBeVisible();
    expect(await signature.evaluate((element) => getComputedStyle(element).transform)).toBe("none");
  });
});