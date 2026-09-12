import { expect, test, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const artifactRoot = path.resolve("artifacts", "phase-j");
const screenshotRoot = path.join(artifactRoot, "screenshots");

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images).map((image) => image.complete ? Promise.resolve() : new Promise<void>((resolve) => {
      const done = () => resolve();
      image.addEventListener("load", done, { once: true });
      image.addEventListener("error", done, { once: true });
      window.setTimeout(done, 5_000);
    })));
  });
  await page.waitForTimeout(300);
}

async function mobileMetrics(page: Page) {
  return page.evaluate(() => {
    const lineCount = (selector: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return null;
      const style = getComputedStyle(element);
      const lineHeight = Number.parseFloat(style.lineHeight);
      const height = element.getBoundingClientRect().height;
      return Number.isFinite(lineHeight) && lineHeight > 0 ? Math.max(1, Math.round(height / lineHeight)) : null;
    };

    const allNavTargets = Array.from(document.querySelectorAll<HTMLAnchorElement>(".site-nav a"));
    const navTargets = allNavTargets.flatMap((target) => {
      const rect = target.getBoundingClientRect();
      const style = getComputedStyle(target);
      const opacity = Number.parseFloat(style.opacity);
      const visibleAndTappable = rect.width > 0
        && rect.height > 0
        && style.display !== "none"
        && style.visibility !== "hidden"
        && style.pointerEvents !== "none"
        && (!Number.isFinite(opacity) || opacity > 0);

      if (!visibleAndTappable) return [];
      return [{
        text: (target.textContent ?? "").trim(),
        href: target.getAttribute("href"),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      }];
    });

    const track = document.querySelector<HTMLElement>(".credibility-track");
    const viewport = document.querySelector<HTMLElement>(".credibility-viewport");
    const duplicate = document.querySelector<HTMLElement>('.credibility-sequence[aria-hidden="true"]');

    return {
      viewportWidth: document.documentElement.clientWidth,
      viewportHeight: window.innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      viewportCount: Math.round((document.documentElement.scrollHeight / window.innerHeight) * 100) / 100,
      heroLines: lineCount(".overhaul-hero-title"),
      workHeadingLines: lineCount(".selected-work-intro h2"),
      methodHeadingLines: lineCount(".solve-think-intro h2"),
      writingHeadingLines: lineCount(".closing-heading h2"),
      opportunityHeadingLines: lineCount(".closing-opportunity-head h2"),
      credibilityAnimation: track ? getComputedStyle(track).animationName : null,
      credibilityOverflowX: viewport ? getComputedStyle(viewport).overflowX : null,
      duplicateDisplay: duplicate ? getComputedStyle(duplicate).display : null,
      navTargetCount: allNavTargets.length,
      visibleNavTargetCount: navTargets.length,
      navTargets,
    };
  });
}

function expectMobileNavTargets(metrics: Awaited<ReturnType<typeof mobileMetrics>>) {
  expect(metrics.navTargetCount).toBe(6);
  expect(metrics.visibleNavTargetCount).toBe(3);
  expect(metrics.navTargets.map((target) => target.href)).toEqual(["/#top", "/#work", "/ar"]);

  for (const target of metrics.navTargets) {
    expect(target.height, `visible nav target ${target.text || "mark"} is too short`).toBeGreaterThanOrEqual(36);
  }
}

test.describe("Phase J English mobile art direction", () => {
  test("390px Home recomposes into a compact touch-first composition", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);
    await mkdir(screenshotRoot, { recursive: true });

    const metrics = await mobileMetrics(page);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
    expect(metrics.viewportCount).toBeLessThanOrEqual(9.25);
    expect(metrics.heroLines).toBeLessThanOrEqual(2);
    expect(metrics.workHeadingLines).toBeLessThanOrEqual(3);
    expect(metrics.methodHeadingLines).toBeLessThanOrEqual(3);
    expect(metrics.writingHeadingLines).toBeLessThanOrEqual(3);
    expect(metrics.opportunityHeadingLines).toBeLessThanOrEqual(3);
    expect(metrics.credibilityAnimation).toBe("none");
    expect(["auto", "scroll"]).toContain(metrics.credibilityOverflowX);
    expect(metrics.duplicateDisplay).toBe("none");
    expectMobileNavTargets(metrics);

    await writeFile(path.join(artifactRoot, "mobile-390-metrics.json"), JSON.stringify(metrics, null, 2));
    await page.screenshot({ path: path.join(screenshotRoot, "phase-j-home-390.png"), fullPage: true });
    await page.locator(".overhaul-hero").screenshot({ path: path.join(screenshotRoot, "phase-j-hero-390.png") });
    await page.locator("#work").screenshot({ path: path.join(screenshotRoot, "phase-j-work-390.png") });
    await page.locator("#method").screenshot({ path: path.join(screenshotRoot, "phase-j-method-390.png") });
    await page.locator("#writing").screenshot({ path: path.join(screenshotRoot, "phase-j-writing-390.png") });
    await page.locator("#contact").screenshot({ path: path.join(screenshotRoot, "phase-j-opportunity-390.png") });
  });

  test("430px larger-phone composition preserves the same hierarchy without overflow", async ({ page }) => {
    await page.setViewportSize({ width: 430, height: 932 });
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);
    await mkdir(screenshotRoot, { recursive: true });

    const metrics = await mobileMetrics(page);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
    expect(metrics.viewportCount).toBeLessThanOrEqual(8.75);
    expect(metrics.heroLines).toBeLessThanOrEqual(2);
    expect(metrics.credibilityAnimation).toBe("none");
    expectMobileNavTargets(metrics);

    await writeFile(path.join(artifactRoot, "mobile-430-metrics.json"), JSON.stringify(metrics, null, 2));
    await page.screenshot({ path: path.join(screenshotRoot, "phase-j-home-430.png"), fullPage: true });
  });

  test("reduced motion keeps the mobile composition complete and static", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/");
    await settle(page);

    await expect(page.locator(".credibility-sequence[aria-hidden=\"true\"]")).toBeHidden();
    const states = await page.evaluate(() => ({
      track: getComputedStyle(document.querySelector<HTMLElement>(".credibility-track")!).animationName,
      atlas: Array.from(document.querySelectorAll<HTMLElement>(".atlas-panel")).map((panel) => getComputedStyle(panel).animationName),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    }));
    expect(states.track).toBe("none");
    expect(states.atlas.every((name) => name === "none")).toBeTruthy();
    expect(states.overflow).toBeLessThanOrEqual(1);

    await context.close();
  });
});
