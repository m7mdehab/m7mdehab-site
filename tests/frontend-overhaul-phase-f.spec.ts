import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";

const screenshotRoot = path.join(process.cwd(), "artifacts", "screenshots");

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
}

async function expectNoHorizontalOverflow(
  page: import("@playwright/test").Page,
) {
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(1);
}

async function hideAcceptanceCaptureChrome(
  page: import("@playwright/test").Page,
) {
  for (const selector of [".site-nav-wrap", ".skip-link"]) {
    const locator = page.locator(selector);
    if (await locator.count()) {
      await locator.evaluate((element) => {
        (element as HTMLElement).style.visibility = "hidden";
      });
    }
  }
}

async function expectMethodContract(page: import("@playwright/test").Page) {
  const section = page.locator("[data-method-story]");
  await expect(section).toBeVisible();

  await expect(
    section.getByRole("heading", {
      level: 2,
      name: "I turn messy reality into reliable systems.",
    }),
  ).toBeVisible();

  await expect(section.locator("[data-method-input]")).toHaveCount(4);
  await expect(section.locator("[data-method-stage]")).toHaveCount(5);
  await expect(section.locator('[data-method-stage="expose"]')).toContainText(
    "Expose the truth",
  );
  await expect(section.locator('[data-method-stage="reduce"]')).toContainText(
    "Reduce ambiguity",
  );
  await expect(section.locator('[data-method-stage="build"]')).toContainText(
    "Build the system",
  );
  await expect(section.locator("[data-method-output]")).toHaveCount(5);
  await expect(section).toContainText("DECISION-READY");

  const cta = section.getByRole("link", { name: /Inspect the evidence/i });
  await expect(cta).toHaveAttribute("href", "/work");

  await expect(section.locator('[role="tab"]')).toHaveCount(0);
  await expect(page.locator(".capability-list")).toHaveCount(0);
  await expect(page.locator(".skills-section")).toHaveCount(0);
  await expect(page.locator(".about-section")).toHaveCount(0);

  return section;
}

test.describe("Method story rebuild", () => {
  test.use({ viewport: { width: 1440, height: 1000 } });

  test("renders the locked transformation story and primary acceptance capture", async ({
    page,
  }) => {
    await mkdir(screenshotRoot, { recursive: true });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    const section = await expectMethodContract(page);
    await expectNoHorizontalOverflow(page);

    await hideAcceptanceCaptureChrome(page);
    await section.screenshot({
      path: path.join(screenshotRoot, "method-story-1440.png"),
    });
  });

  test("captures the large-desktop composition", async ({ page }) => {
    await mkdir(screenshotRoot, { recursive: true });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");
    await settle(page);

    const section = await expectMethodContract(page);
    await expectNoHorizontalOverflow(page);
    await hideAcceptanceCaptureChrome(page);
    await section.screenshot({
      path: path.join(screenshotRoot, "method-story-1920.png"),
    });
  });

  test("captures the tablet composition", async ({ page }) => {
    await mkdir(screenshotRoot, { recursive: true });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("/");
    await settle(page);

    const section = await expectMethodContract(page);
    await expectNoHorizontalOverflow(page);
    await hideAcceptanceCaptureChrome(page);
    await section.screenshot({
      path: path.join(screenshotRoot, "method-story-1024.png"),
    });
  });

  test("passes axe on desktop", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    await expectMethodContract(page);

    const results = await new AxeBuilder({ page })
      .include("[data-method-story]")
      .analyze();
    expect(
      results.violations,
      JSON.stringify(results.violations, null, 2),
    ).toEqual([]);
  });

  test("recomposes into a readable vertical story at 390px", async ({
    page,
  }) => {
    await mkdir(screenshotRoot, { recursive: true });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settle(page);

    const section = await expectMethodContract(page);
    await expectNoHorizontalOverflow(page);

    await expect(section.locator('[role="tab"]')).toHaveCount(0);
    await expect(section.locator("[data-method-output]")).toHaveCount(5);

    await hideAcceptanceCaptureChrome(page);
    await section.screenshot({
      path: path.join(screenshotRoot, "method-story-390.png"),
    });
  });

  test("reduced motion keeps the complete story visible without staged motion", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await settle(page);

    const section = await expectMethodContract(page);
    await expect(section.locator("[data-method-canvas]")).toHaveAttribute(
      "data-motion-mode",
      "reduced",
    );
    await expect(section.locator("[data-method-stage]")).toHaveCount(5);
    await expect(section.locator("[data-method-output]")).toHaveCount(5);
  });

  test("desktop animation is complete when the story is centered in the viewport", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    await settle(page);

    const section = page.locator("[data-method-story]");
    const canvas = section.locator("[data-method-canvas]");
    await expect(canvas).toHaveAttribute("data-motion-mode", "enhanced");

    await section.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const absoluteTop = window.scrollY + bounds.top;
      window.scrollTo({
        top: absoluteTop + bounds.height / 2 - window.innerHeight / 2,
        behavior: "instant",
      });
    });
    await page.waitForTimeout(1200);

    const opacities = await section
      .locator("[data-method-stage], [data-method-output]")
      .evaluateAll((elements) =>
        elements.map((element) =>
          Number.parseFloat(getComputedStyle(element).opacity),
        ),
      );
    expect(opacities).toHaveLength(10);
    expect(
      opacities.every((opacity) => opacity >= 0.99),
      `Centered desktop stage/output opacities: ${JSON.stringify(opacities)}`,
    ).toBeTruthy();

    await expect(
      section.locator('[data-method-connector="input-to-expose"]'),
    ).toHaveCount(4);
    await expect(
      section.locator('[data-method-connector="expose-to-reduce"]'),
    ).toHaveCount(7);

    const geometry = await section.evaluate((root) => {
      const centerX = (selector: string) => {
        const box = root.querySelector<HTMLElement>(selector)!.getBoundingClientRect();
        return box.left + box.width / 2;
      };
      const overlaps = (aSelector: string, bSelector: string) => {
        const a = root.querySelector<HTMLElement>(aSelector)!.getBoundingClientRect();
        const b = root.querySelector<HTMLElement>(bSelector)!.getBoundingClientRect();
        return (
          a.left < b.right &&
          a.right > b.left &&
          a.top < b.bottom &&
          a.bottom > b.top
        );
      };

      return {
        reduceCenterDelta: Math.abs(
          centerX('[data-method-stage="reduce"]') -
            centerX(".method-story__decision-module"),
        ),
        buildCenterDelta: Math.abs(
          centerX('[data-method-stage="build"]') -
            centerX(".method-story__system-stack"),
        ),
        constraintsOverlapsStack: overlaps(
          ".method-story__evidence-tag--teal",
          ".method-story__evidence-stack",
        ),
      };
    });

    expect(geometry.reduceCenterDelta).toBeLessThanOrEqual(2);
    expect(geometry.buildCenterDelta).toBeLessThanOrEqual(2);
    expect(geometry.constraintsOverlapsStack).toBe(false);
  });
});
