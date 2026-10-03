import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test, type Locator, type Page } from "@playwright/test";

const output = path.resolve("artifacts", "writing-system", "screenshots");
const homeTargets = [
  { width: 1920, height: 1080, name: "home-writing-1920x1080" },
  { width: 1440, height: 1000, name: "home-writing-1440x1000" },
  { width: 1280, height: 800, name: "home-writing-1280x800" },
  { width: 1024, height: 768, name: "home-writing-1024x768" },
  { width: 430, height: 932, name: "home-writing-430x932" },
  { width: 390, height: 844, name: "home-writing-390x844" },
  { width: 320, height: 568, name: "home-writing-320x568" },
] as const;

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images).map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              const finish = () => resolve();
              image.addEventListener("load", finish, { once: true });
              image.addEventListener("error", finish, { once: true });
              window.setTimeout(finish, 5_000);
            }),
      ),
    );
  });
}

async function hideFixedChrome(page: Page) {
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    for (const selector of [".site-nav-wrap", ".skip-link"]) {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) element.style.visibility = "hidden";
    }
  });
}

async function assertCardGeometry(cards: Locator) {
  const metrics = await cards.evaluateAll((items) =>
    items.map((item) => {
      const title = item.querySelector<HTMLElement>(".writing-system-card-title")!;
      const description = item.querySelector<HTMLElement>(
        ".writing-system-card-description",
      )!;
      const frame = item.querySelector<HTMLElement>(".writing-system-cover-frame")!;
      const cover = item.querySelector<HTMLElement>(".writing-system-cover")!;
      const overlay = item.querySelector<HTMLElement>(
        ".writing-system-card-overlay",
      )!;
      const titleStyle = getComputedStyle(title);
      const descriptionStyle = getComputedStyle(description);
      const titleLineHeight = Number.parseFloat(titleStyle.lineHeight);
      const descriptionLineHeight = Number.parseFloat(descriptionStyle.lineHeight);
      const titleBox = title.getBoundingClientRect();
      const descriptionBox = description.getBoundingClientRect();
      const frameBox = frame.getBoundingClientRect();
      const coverBox = cover.getBoundingClientRect();
      const overlayBox = overlay.getBoundingClientRect();

      return {
        titleHeight: titleBox.height,
        titleLineHeight,
        descriptionHeight: descriptionBox.height,
        descriptionLineHeight,
        overlayInside:
          overlayBox.left >= frameBox.left - 1 &&
          overlayBox.right <= frameBox.right + 1 &&
          overlayBox.top >= frameBox.top - 1 &&
          overlayBox.bottom <= frameBox.bottom + 1,
        overlayBottomDelta: Math.abs(overlayBox.bottom - coverBox.bottom),
        coverRatio: coverBox.width / coverBox.height,
      };
    }),
  );

  for (const metric of metrics) {
    expect(metric.titleHeight).toBeLessThanOrEqual(metric.titleLineHeight * 2.1);
    expect(metric.descriptionHeight).toBeLessThanOrEqual(
      metric.descriptionLineHeight * 2.1,
    );
    expect(metric.overlayInside).toBe(true);
    expect(metric.overlayBottomDelta).toBeLessThanOrEqual(1);
    expect(metric.coverRatio).toBeCloseTo(16 / 9, 1);
  }
}

test("capture and enforce the Writing v1.1 render matrix", async ({ page }) => {
  test.setTimeout(180_000);
  await mkdir(output, { recursive: true });

  for (const viewport of homeTargets) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await settle(page);

    const section = page.locator("[data-writing-home]");
    const cards = section.locator("[data-writing-card]");

    await expect(
      section.getByRole("heading", {
        level: 2,
        name: "What I’m thinking through.",
      }),
    ).toBeVisible();
    await expect(cards).toHaveCount(3);
    await expect(section).not.toContainText(
      "Notes on AI, technology, work, projects, and whatever else I’m thinking through.",
    );
    await expect(section.locator(".writing-system-cover-label")).toHaveCount(0);
    await expect(section.locator(".writing-system-card-meta")).toHaveCount(0);
    await expect(section.locator(".writing-system-card-overlay")).toHaveCount(3);

    const columns = await section
      .locator(".writing-system-grid")
      .evaluate(
        (element) =>
          getComputedStyle(element).gridTemplateColumns.split(" ").length,
      );
    expect(columns, viewport.name).toBe(
      viewport.width >= 1120 ? 3 : viewport.width >= 720 ? 2 : 1,
    );

    await assertCardGeometry(cards);

    const cta = section.getByRole("link", { name: /All writing/i });
    await expect(cta).toHaveAttribute("href", "/writing");
    const ctaAfterGrid = await section.evaluate(() => {
      const grid = document.querySelector<HTMLElement>(
        "[data-writing-home] .writing-system-grid",
      )!;
      const cta = document.querySelector<HTMLElement>(
        "[data-writing-home] .writing-system-home-footer",
      )!;
      return cta.getBoundingClientRect().top >= grid.getBoundingClientRect().bottom;
    });
    expect(ctaAfterGrid).toBe(true);

    await hideFixedChrome(page);
    await section.screenshot({
      path: path.join(output, `${viewport.name}.png`),
    });
  }

  for (const viewport of [
    { width: 1440, height: 1000, name: "archive-1440x1000" },
    { width: 390, height: 844, name: "archive-390x844" },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/writing");
    await settle(page);

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: "What I’m thinking through.",
      }),
    ).toBeVisible();
    const cards = page.locator(
      '[data-writing-card][data-writing-context="archive"]',
    );
    await expect(cards).toHaveCount(3);
    await assertCardGeometry(cards);

    await hideFixedChrome(page);
    await page.screenshot({
      path: path.join(output, `${viewport.name}.png`),
      fullPage: true,
    });
  }

  for (const viewport of [
    { width: 1440, height: 1000, name: "article-1440x1000" },
    { width: 390, height: 844, name: "article-390x844" },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/writing/when-to-trust-a-probabilistic-forecast");
    await settle(page);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("[data-writing-listen]")).toHaveCount(0);
    await expect(page.getByText("9 min read · ~8 min listen")).toBeVisible();

    await hideFixedChrome(page);
    await page.screenshot({
      path: path.join(output, `${viewport.name}.png`),
      fullPage: true,
    });
  }

  for (const viewport of [
    { width: 1920, height: 1080, name: "full-home-1920x1080" },
    { width: 390, height: 844, name: "full-home-390x844" },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await settle(page);
    await hideFixedChrome(page);
    await page.screenshot({
      path: path.join(output, `${viewport.name}.png`),
      fullPage: true,
    });
  }
});
