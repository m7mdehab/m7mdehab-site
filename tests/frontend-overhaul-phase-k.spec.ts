import { expect, test, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const artifactRoot = path.resolve("artifacts", "phase-k");
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

async function hideCaptureChrome(page: Page) {
  for (const selector of [".site-nav-wrap", ".skip-link"]) {
    const locator = page.locator(selector);
    if (await locator.count()) {
      await locator.evaluate((element) => { (element as HTMLElement).style.visibility = "hidden"; });
    }
  }
}

async function pageMetrics(page: Page) {
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
    const visibleNavTargets = allNavTargets.flatMap((target) => {
      const rect = target.getBoundingClientRect();
      const style = getComputedStyle(target);
      const opacity = Number.parseFloat(style.opacity);
      const visible = rect.width > 0
        && rect.height > 0
        && style.display !== "none"
        && style.visibility !== "hidden"
        && style.pointerEvents !== "none"
        && (!Number.isFinite(opacity) || opacity > 0);
      if (!visible) return [];
      return [{
        text: (target.textContent ?? "").trim(),
        href: target.getAttribute("href"),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      }];
    });

    return {
      viewportWidth: document.documentElement.clientWidth,
      viewportHeight: innerHeight,
      scrollWidth: document.documentElement.scrollWidth,
      scrollHeight: document.documentElement.scrollHeight,
      viewportCount: Math.round((document.documentElement.scrollHeight / innerHeight) * 100) / 100,
      heroLines: lineCount(".overhaul-hero-title"),
      workHeadingLines: lineCount(".selected-work-intro h2"),
      methodHeadingLines: lineCount(".solve-think-intro h2"),
      writingHeadingLines: lineCount(".closing-heading h2"),
      opportunityHeadingLines: lineCount(".closing-opportunity-head h2"),
      navTargetCount: allNavTargets.length,
      visibleNavTargets,
    };
  });
}

function expectVisibleTargets(metrics: Awaited<ReturnType<typeof pageMetrics>>) {
  expect(metrics.navTargetCount).toBe(6);
  expect(metrics.visibleNavTargets.length).toBeGreaterThanOrEqual(3);
  for (const target of metrics.visibleNavTargets) {
    expect(target.height, `visible Arabic nav target ${target.text || "mark"} is too short`).toBeGreaterThanOrEqual(36);
  }
}

test.describe("Phase K Arabic art direction and editorial rewrite", () => {
  test("Arabic Home uses the selective evidence-led architecture, not the retired CV stack", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const response = await page.goto("/ar");
    expect(response?.ok()).toBeTruthy();
    await settle(page);
    await mkdir(screenshotRoot, { recursive: true });

    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator(".hero-evidence-atlas")).toBeVisible();
    await expect(page.locator(".credibility-rail")).toBeVisible();
    await expect(page.locator("[data-selected-work-ar]")).toBeVisible();
    await expect(page.locator("[data-solve-think-ar]")).toBeVisible();
    await expect(page.locator("#writing")).toBeVisible();
    await expect(page.locator("#contact")).toBeVisible();

    expect(await page.locator(".skills-section").count()).toBe(0);
    expect(await page.locator(".timeline").count()).toBe(0);
    expect(await page.locator(".credential-grid").count()).toBe(0);
    expect(await page.locator(".compact-section").count()).toBe(0);
    expect(await page.locator("#services").count()).toBe(0);

    const metrics = await pageMetrics(page);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
    expect(metrics.viewportCount).toBeLessThanOrEqual(7.25);
    expect(metrics.workHeadingLines).toBeLessThanOrEqual(2);
    expect(metrics.methodHeadingLines).toBeLessThanOrEqual(2);
    expect(metrics.writingHeadingLines).toBeLessThanOrEqual(2);
    expect(metrics.opportunityHeadingLines).toBeLessThanOrEqual(2);

    await writeFile(path.join(artifactRoot, "arabic-desktop-metrics.json"), JSON.stringify(metrics, null, 2));
    await page.screenshot({ path: path.join(screenshotRoot, "phase-k-ar-home-1920.png"), fullPage: true });
  });

  test("390px Arabic Home is touch-first, compact and free of horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto("/ar");
    expect(response?.ok()).toBeTruthy();
    await settle(page);
    await mkdir(screenshotRoot, { recursive: true });

    const metrics = await pageMetrics(page);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
    expect(metrics.viewportCount).toBeLessThanOrEqual(9.5);
    expect(metrics.heroLines).toBeLessThanOrEqual(2);
    expect(metrics.workHeadingLines).toBeLessThanOrEqual(3);
    expect(metrics.methodHeadingLines).toBeLessThanOrEqual(3);
    expect(metrics.writingHeadingLines).toBeLessThanOrEqual(3);
    expect(metrics.opportunityHeadingLines).toBeLessThanOrEqual(3);
    expectVisibleTargets(metrics);

    const track = page.locator(".credibility-track");
    const viewport = page.locator(".credibility-viewport");
    await expect(track).toHaveCSS("animation-name", "none");
    expect(["auto", "scroll"]).toContain(await viewport.evaluate((element) => getComputedStyle(element).overflowX));

    await writeFile(path.join(artifactRoot, "arabic-mobile-390-metrics.json"), JSON.stringify(metrics, null, 2));
    await page.screenshot({ path: path.join(screenshotRoot, "phase-k-ar-home-390.png"), fullPage: true });

    await hideCaptureChrome(page);
    await page.locator(".overhaul-hero").screenshot({ path: path.join(screenshotRoot, "phase-k-ar-hero-390.png") });
    await page.locator("#work").screenshot({ path: path.join(screenshotRoot, "phase-k-ar-work-390.png") });
    await page.locator("#method").screenshot({ path: path.join(screenshotRoot, "phase-k-ar-method-390.png") });
    await page.locator("#writing").screenshot({ path: path.join(screenshotRoot, "phase-k-ar-writing-390.png") });
    await page.locator("#contact").screenshot({ path: path.join(screenshotRoot, "phase-k-ar-opportunity-390.png") });
  });

  test("430px Arabic Home preserves hierarchy without overflow", async ({ page }) => {
    await page.setViewportSize({ width: 430, height: 932 });
    const response = await page.goto("/ar");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    const metrics = await pageMetrics(page);
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
    expect(metrics.viewportCount).toBeLessThanOrEqual(9);
    expect(metrics.heroLines).toBeLessThanOrEqual(2);
    expectVisibleTargets(metrics);

    await writeFile(path.join(artifactRoot, "arabic-mobile-430-metrics.json"), JSON.stringify(metrics, null, 2));
    await page.screenshot({ path: path.join(screenshotRoot, "phase-k-ar-home-430.png"), fullPage: true });
  });

  test("Arabic About is substantive and reciprocal with English About", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    const response = await page.goto("/ar/about");
    expect(response?.ok()).toBeTruthy();
    await settle(page);

    await expect(page.locator("h1")).toContainText("الخيط");
    await expect(page.getByText("مهندس بيانات", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Databricks Certified Data Engineer Associate", { exact: true })).toBeVisible();
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /\/ar\/about$/);
    await expect(page.locator('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", /\/about$/);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);

    await page.screenshot({ path: path.join(screenshotRoot, "phase-k-ar-about-1920.png"), fullPage: true });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    await settle(page);
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    await page.screenshot({ path: path.join(screenshotRoot, "phase-k-ar-about-390.png"), fullPage: true });

    await page.goto("/about");
    await settle(page);
    await expect(page.locator('link[rel="alternate"][hreflang="ar"]')).toHaveAttribute("href", /\/ar\/about$/);
  });

  test("reduced motion preserves a complete static Arabic composition", async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    await page.goto("/ar");
    await settle(page);

    await expect(page.locator('.credibility-sequence[aria-hidden="true"]')).toBeHidden();
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

  test("Arabic Home remains meaningful without JavaScript", async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const response = await page.goto("/ar");
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator("h1")).toContainText("Mohammed Ehab");
    await expect(page.locator("#work")).toContainText("ثلاثة مداخل");
    await expect(page.locator("#contact")).toContainText("ابدأ من السياق الصحيح");
    expect(await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBeLessThanOrEqual(1);
    await context.close();
  });
});
