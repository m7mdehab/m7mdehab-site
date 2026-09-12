import { expect, test, type Locator, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const artifactRoot = path.resolve("artifacts", "phase-i");
const screenshotRoot = path.join(artifactRoot, "screenshots");

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = Array.from(document.images);
    await Promise.all(
      images.map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              const done = () => resolve();
              image.addEventListener("load", done, { once: true });
              image.addEventListener("error", done, { once: true });
              window.setTimeout(done, 5_000);
            }),
      ),
    );
  });
  await page.waitForTimeout(350);
}

async function capture(locator: Locator, filename: string) {
  await locator.scrollIntoViewIfNeeded();
  await locator.screenshot({ path: path.join(screenshotRoot, filename) });
}

test.describe("Phase I English desktop visual acceptance", () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test("full English Home stays inside the accepted attention and hierarchy budget", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await settle(page);
    await mkdir(screenshotRoot, { recursive: true });

    const metrics = await page.evaluate(() => {
      const viewportHeight = window.innerHeight;
      const viewportWidth = document.documentElement.clientWidth;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollWidth = document.documentElement.scrollWidth;

      const chapterSelectors = [
        ["hero", ".overhaul-hero"],
        ["credibility", ".credibility-rail"],
        ["work", "#work"],
        ["method", "#method"],
        ["writing", "#writing"],
        ["opportunity", "#contact"],
        ["footer", ".closing-directory"],
      ] as const;

      const chapters = Object.fromEntries(
        chapterSelectors.map(([name, selector]) => {
          const element = document.querySelector<HTMLElement>(selector);
          if (!element) return [name, null];
          const rect = element.getBoundingClientRect();
          return [name, {
            top: Math.round(rect.top + window.scrollY),
            height: Math.round(rect.height),
            bottom: Math.round(rect.bottom + window.scrollY),
          }];
        }),
      );

      const headingLines = Array.from(document.querySelectorAll<HTMLElement>("main h2"))
        .filter((heading) => heading.offsetParent !== null)
        .map((heading) => {
          const style = getComputedStyle(heading);
          const lineHeight = Number.parseFloat(style.lineHeight);
          const height = heading.getBoundingClientRect().height;
          const lines = Number.isFinite(lineHeight) && lineHeight > 0 ? Math.max(1, Math.round(height / lineHeight)) : 1;
          return {
            text: (heading.textContent ?? "").trim().replace(/\s+/g, " "),
            lines,
            height: Math.round(height),
            lineHeight: Number.isFinite(lineHeight) ? Math.round(lineHeight * 10) / 10 : null,
          };
        });

      return {
        viewportWidth,
        viewportHeight,
        scrollWidth,
        scrollHeight,
        viewportCount: Math.round((scrollHeight / viewportHeight) * 100) / 100,
        chapters,
        headingLines,
      };
    });

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.viewportWidth + 1);
    expect(metrics.viewportCount).toBeLessThanOrEqual(7);
    expect(metrics.viewportCount).toBeGreaterThanOrEqual(4.5);

    for (const chapter of Object.values(metrics.chapters)) {
      expect(chapter).not.toBeNull();
    }

    const ordinaryLongHeadings = metrics.headingLines.filter((heading) => heading.lines > 2);
    expect(ordinaryLongHeadings, `uncontrolled H2 wrapping: ${JSON.stringify(ordinaryLongHeadings, null, 2)}`).toEqual([]);

    await expect(page.locator(".timeline")).toHaveCount(0);
    await expect(page.locator(".credential-grid")).toHaveCount(0);
    await expect(page.locator(".compact-grid")).toHaveCount(0);
    await expect(page.getByText("WordPress", { exact: true })).toHaveCount(0);

    await writeFile(path.join(artifactRoot, "desktop-metrics.json"), JSON.stringify(metrics, null, 2));
    await page.screenshot({ path: path.join(screenshotRoot, "phase-i-home-1920.png"), fullPage: true });
  });

  test("all final homepage chapters receive dedicated desktop acceptance captures", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    await mkdir(screenshotRoot, { recursive: true });

    await capture(page.locator(".overhaul-hero"), "phase-i-01-hero.png");
    await capture(page.locator(".credibility-rail"), "phase-i-02-credibility.png");
    await capture(page.locator("#work"), "phase-i-03-work.png");
    await capture(page.locator("#method"), "phase-i-04-method.png");
    await capture(page.locator("#writing"), "phase-i-05-writing.png");
    await capture(page.locator("#contact"), "phase-i-06-opportunity.png");
    await capture(page.locator(".closing-directory"), "phase-i-07-footer.png");
  });

  test("desktop navigation remains legible through top, middle and closing states", async ({ page }) => {
    await page.goto("/");
    await settle(page);
    await mkdir(screenshotRoot, { recursive: true });

    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    await expect(nav).toBeVisible();
    await nav.screenshot({ path: path.join(screenshotRoot, "phase-i-nav-top.png") });

    await page.locator("#method").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.mouse.wheel(0, -220);
    await page.waitForTimeout(300);
    await expect(nav).toBeVisible();
    await nav.screenshot({ path: path.join(screenshotRoot, "phase-i-nav-middle.png") });

    await page.locator("#contact").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.mouse.wheel(0, -160);
    await page.waitForTimeout(300);
    await expect(nav).toBeVisible();
    await nav.screenshot({ path: path.join(screenshotRoot, "phase-i-nav-closing.png") });

    const navBox = await nav.boundingBox();
    expect(navBox).not.toBeNull();
    expect(navBox!.y).toBeGreaterThanOrEqual(0);
    expect(navBox!.y + navBox!.height).toBeLessThanOrEqual(1080);
  });
});
