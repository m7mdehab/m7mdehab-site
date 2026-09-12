import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const routes = [
  { name: "home", path: "/" },
  { name: "presaira", path: "/work/presaira" },
  { name: "opportunityos", path: "/work/opportunityos" },
  { name: "ghareeb-oglu", path: "/work/ghareeb-oglu" },
  { name: "oil-spill-detection", path: "/work/oil-spill-detection" },
  { name: "solar-site-selection", path: "/work/solar-site-selection" },
  { name: "makhbazy", path: "/work/makhbazy" },
] as const;

const artifactRoot = path.resolve("artifacts");

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = Array.from(document.images);
    await Promise.all(
      images.map(
        (image) =>
          image.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                const done = () => resolve();
                image.addEventListener("load", done, { once: true });
                image.addEventListener("error", done, { once: true });
                window.setTimeout(done, 6_000);
              }),
      ),
    );
  });
}

async function assertNoHorizontalOverflow(page: Page) {
  const overflow = await page.evaluate(() => {
    const clientWidth = document.documentElement.clientWidth;
    const scrollWidth = document.documentElement.scrollWidth;
    const offenders = Array.from(document.querySelectorAll<HTMLElement>("body *"))
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          tag: element.tagName.toLowerCase(),
          className: typeof element.className === "string" ? element.className : "",
          text: (element.textContent ?? "").trim().replace(/\s+/g, " ").slice(0, 90),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
        };
      })
      .filter((item) => item.right > clientWidth + 1 || item.left < -1)
      .slice(0, 20);

    return { clientWidth, scrollWidth, offenders };
  });

  expect(
    overflow.scrollWidth,
    `horizontal overflow: ${JSON.stringify(overflow, null, 2)}`,
  ).toBeLessThanOrEqual(overflow.clientWidth + 1);
}

async function assertImagesLoaded(page: Page) {
  const broken = await page.evaluate(() =>
    Array.from(document.images)
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => ({ alt: image.alt, src: image.src })),
  );
  expect(broken, `broken rendered evidence images: ${JSON.stringify(broken, null, 2)}`).toEqual([]);
}

async function writeAxeReport(page: Page, name: string) {
  const results = await new AxeBuilder({ page }).analyze();
  await mkdir(path.join(artifactRoot, "axe"), { recursive: true });
  await writeFile(path.join(artifactRoot, "axe", `${name}.json`), JSON.stringify(results, null, 2));
  expect(results.violations, `axe violations on ${name}: ${JSON.stringify(results.violations, null, 2)}`).toEqual([]);
}

test.describe("desktop rendered QA", () => {
  test.use({ viewport: { width: 1440, height: 1000 } });

  for (const route of routes) {
    test(`${route.name}: render, evidence assets, overflow and accessibility`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.ok()).toBeTruthy();
      await settle(page);
      await assertNoHorizontalOverflow(page);
      await assertImagesLoaded(page);
      await writeAxeReport(page, `desktop-${route.name}`);
      await mkdir(path.join(artifactRoot, "screenshots"), { recursive: true });
      await page.screenshot({ path: path.join(artifactRoot, "screenshots", `desktop-${route.name}.png`), fullPage: true });
    });
  }
});

test.describe("mobile rendered QA", () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  for (const route of routes) {
    test(`${route.name}: mobile layout and overflow`, async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.ok()).toBeTruthy();
      await settle(page);
      await assertNoHorizontalOverflow(page);
      await assertImagesLoaded(page);
      await mkdir(path.join(artifactRoot, "screenshots"), { recursive: true });
      await page.screenshot({ path: path.join(artifactRoot, "screenshots", `mobile-${route.name}.png`), fullPage: true });
    });
  }
});

test("reduced-motion keeps the homepage readable without smooth-scroll ownership", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const response = await page.goto("/");
  expect(response?.ok()).toBeTruthy();
  await settle(page);
  expect(await page.evaluate(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(true);
  const rootClasses = await page.evaluate(() => document.documentElement.className);
  expect(rootClasses).not.toMatch(/\blenis\b/);
  await assertNoHorizontalOverflow(page);
  await mkdir(path.join(artifactRoot, "screenshots"), { recursive: true });
  await page.screenshot({ path: path.join(artifactRoot, "screenshots", "reduced-motion-home.png"), fullPage: true });
});

test("keyboard navigation exposes skip link and primary anchors", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await settle(page);

  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();

  await page.getByRole("link", { name: "Work", exact: true }).click();
  await expect(page.locator("#work")).toBeInViewport();

  await page.goto("/work/presaira");
  await settle(page);
  const nextProject = page.getByRole("link", { name: /OpportunityOS/i }).last();
  await expect(nextProject).toBeVisible();
  await nextProject.click();
  await expect(page).toHaveURL(/\/work\/opportunityos$/);
});

test.describe("progressive enhancement without JavaScript", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });

  test("homepage evidence and narrative remain visible", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    await page.waitForLoadState("domcontentloaded");

    for (const selector of ["#work", "#method", "#experience", "#contact"]) {
      const section = page.locator(selector);
      await expect(section).toBeAttached();
      await expect(section).toBeVisible();
    }

    await mkdir(path.join(artifactRoot, "screenshots"), { recursive: true });
    await page.screenshot({ path: path.join(artifactRoot, "screenshots", "no-js-home.png"), fullPage: true });
  });
});