import { expect, test } from "@playwright/test";

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

test.describe("Iteration 13 layout refinement", () => {
  test.use({ viewport: { width: 1440, height: 1000 } });

  test("homepage uses a denser hero and non-button skill treatment", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    const heroHeight = await page.locator(".hero").evaluate((element) => element.getBoundingClientRect().height);
    expect(heroHeight).toBeLessThanOrEqual(920);

    const firstSkill = page.locator(".skill-chip").first();
    await expect(firstSkill).toBeVisible();
    expect(await firstSkill.evaluate((element) => element.tagName)).toBe("SPAN");
    const skillStyle = await firstSkill.evaluate((element) => {
      const style = getComputedStyle(element);
      return { color: style.color, background: style.backgroundColor, boxShadow: style.boxShadow, borderStyle: style.borderStyle };
    });
    expect(skillStyle.boxShadow).toBe("none");
    expect(skillStyle.borderStyle).toBe("solid");

    await expect(page.locator(".display-script").first()).toBeVisible();
    expect(await page.locator(".display-script").first().evaluate((element) => getComputedStyle(element).fontStyle)).toBe("italic");
    await expect(page.locator(".display-strong").first()).toBeVisible();
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

  test("reduced motion keeps the navigation present and emphasis readable", async ({ page }) => {
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

    const emphasis = page.locator(".display-script").first();
    await expect(emphasis).toBeVisible();
    expect(await emphasis.evaluate((element) => getComputedStyle(element).transform)).toBe("none");
  });
});
