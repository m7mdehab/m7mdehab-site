import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";

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

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(Array.from(document.images).map((image) => image.complete
      ? Promise.resolve()
      : new Promise<void>((resolve) => {
          const finish = () => resolve();
          image.addEventListener("load", finish, { once: true });
          image.addEventListener("error", finish, { once: true });
          window.setTimeout(finish, 5_000);
        })));
  });
}

async function hideFixedChrome(page: import("@playwright/test").Page) {
  await page.evaluate(() => {
    if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
    for (const selector of [".site-nav-wrap", ".skip-link"]) {
      const element = document.querySelector<HTMLElement>(selector);
      if (element) element.style.visibility = "hidden";
    }
  });
}

async function assertCardGeometry(
  section: import("@playwright/test").Locator,
  viewportWidth: number,
) {
  const report = await section.locator("[data-writing-card]").evaluateAll((cards) =>
    cards.map((card) => {
      const coverFrame = card.querySelector<HTMLElement>(".writing-system-cover-frame")!;
      const meta = card.querySelector<HTMLElement>(".writing-system-cover-meta")!;
      const title = card.querySelector<HTMLElement>("h2, h3")!;
      const excerpt = card.querySelector<HTMLElement>("p")!;
      const frameBox = coverFrame.getBoundingClientRect();
      const metaBox = meta.getBoundingClientRect();
      const titleStyle = getComputedStyle(title);
      const excerptStyle = getComputedStyle(excerpt);
      return {
        metaInside:
          metaBox.left >= frameBox.left - 1 &&
          metaBox.right <= frameBox.right + 1 &&
          metaBox.top >= frameBox.top - 1 &&
          metaBox.bottom <= frameBox.bottom + 1,
        titleHeight: title.getBoundingClientRect().height,
        titleLineHeight: Number.parseFloat(titleStyle.lineHeight),
        excerptDisplay: excerptStyle.display,
        excerptHeight: excerpt.getBoundingClientRect().height,
        excerptLineHeight: Number.parseFloat(excerptStyle.lineHeight),
        metaText: meta.textContent ?? "",
        metaClientWidth: meta.clientWidth,
        metaScrollWidth: meta.scrollWidth,
        coverRatio: coverFrame.getBoundingClientRect().width / coverFrame.getBoundingClientRect().height,
      };
    }),
  );

  for (const card of report) {
    expect(card.metaInside).toBe(true);
    expect(card.coverRatio).toBeCloseTo(16 / 9, 1);
    expect(card.titleHeight).toBeLessThanOrEqual(
      card.titleLineHeight * (viewportWidth < 720 ? 1.15 : 2.1),
    );
    expect(card.metaScrollWidth).toBeLessThanOrEqual(card.metaClientWidth + 1);
    expect(card.metaText).toMatch(/min read/i);
    expect(card.metaText).toMatch(/~\d+ min listen/i);

    if (viewportWidth < 720) {
      expect(card.excerptDisplay).toBe("none");
    } else {
      expect(card.excerptDisplay).not.toBe("none");
      expect(card.excerptHeight).toBeLessThanOrEqual(card.excerptLineHeight * 2.1);
    }
  }
}

test("capture and validate the locked Writing v1.2 render matrix", async ({ page }) => {
  test.setTimeout(180_000);
  await mkdir(output, { recursive: true });

  for (const viewport of homeTargets) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await settle(page);

    const section = page.locator("[data-writing-home]");
    const heading = section.getByRole("heading", { level: 2, name: "What I’m thinking through." });
    await expect(heading).toBeVisible();
    await expect(section).toContainText("Ideas, experiments, and everything that piques my curiosity as I navigate my career.");
    await expect(section).not.toContainText("Notes on AI, technology, work, projects, and whatever else I’m thinking through.");

    const headerGeometry = await section.locator(".writing-system-home-header").evaluate((header) => {
      const title = header.querySelector<HTMLElement>("h2")!;
      const subtitle = header.querySelector<HTMLElement>("p")!;
      const titleStyle = getComputedStyle(title);
      const subtitleStyle = getComputedStyle(subtitle);
      return {
        titleHeight: title.getBoundingClientRect().height,
        titleLineHeight: Number.parseFloat(titleStyle.lineHeight),
        titleClient: title.clientWidth,
        titleScroll: title.scrollWidth,
        subtitleHeight: subtitle.getBoundingClientRect().height,
        subtitleLineHeight: Number.parseFloat(subtitleStyle.lineHeight),
        subtitleClient: subtitle.clientWidth,
        subtitleScroll: subtitle.scrollWidth,
      };
    });
    expect(headerGeometry.titleHeight).toBeLessThanOrEqual(headerGeometry.titleLineHeight * 1.1);
    expect(headerGeometry.titleScroll).toBeLessThanOrEqual(headerGeometry.titleClient + 1);
    expect(headerGeometry.subtitleHeight).toBeLessThanOrEqual(headerGeometry.subtitleLineHeight * 1.1);
    expect(headerGeometry.subtitleScroll).toBeLessThanOrEqual(headerGeometry.subtitleClient + 1);
    await expect(section.locator("[data-writing-card]")).toHaveCount(3);
    await expect(section.locator(".writing-system-card-meta")).toHaveCount(0);
    await expect(section.locator(".writing-system-cover-label")).toHaveCount(0);

    const columns = await section
      .locator(".writing-system-grid")
      .evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(" ").length);
    expect(columns, viewport.name).toBe(viewport.width >= 1120 ? 3 : 2);

    await assertCardGeometry(section, viewport.width);

    const ctaGeometry = await section.evaluate((element) => {
      const cards = [...element.querySelectorAll<HTMLElement>("[data-writing-card]")];
      const cta = element.querySelector<HTMLElement>(".writing-system-footer a")!;
      const finalCardBottom = Math.max(...cards.map((card) => card.getBoundingClientRect().bottom));
      return {
        ctaTop: cta.getBoundingClientRect().top,
        finalCardBottom,
      };
    });
    expect(ctaGeometry.ctaTop).toBeGreaterThan(ctaGeometry.finalCardBottom);

    await hideFixedChrome(page);
    await section.screenshot({ path: path.join(output, `${viewport.name}.png`) });
  }

  for (const viewport of [
    { width: 1440, height: 1000, name: "archive-1440x1000" },
    { width: 390, height: 844, name: "archive-390x844" },
    { width: 320, height: 568, name: "archive-320x568" },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/writing");
    await settle(page);
    const archiveHeading = page.getByRole("heading", { level: 1, name: "What I’m thinking through." });
    await expect(archiveHeading).toBeVisible();
    const archive = page.locator(".writing-system-archive");
    await expect(archive).toContainText("Ideas, experiments, and everything that piques my curiosity as I navigate my career.");
    await expect(archive).not.toContainText("Notes on AI, technology, work, projects, and whatever else I’m thinking through.");

    const archiveHeaderGeometry = await archive.locator(".writing-system-archive-header").evaluate((header) => {
      const title = header.querySelector<HTMLElement>("h1")!;
      const subtitle = header.querySelector<HTMLElement>(".writing-system-archive-subtitle")!;
      const titleStyle = getComputedStyle(title);
      const subtitleStyle = getComputedStyle(subtitle);
      return {
        titleHeight: title.getBoundingClientRect().height,
        titleLineHeight: Number.parseFloat(titleStyle.lineHeight),
        titleClient: title.clientWidth,
        titleScroll: title.scrollWidth,
        subtitleHeight: subtitle.getBoundingClientRect().height,
        subtitleLineHeight: Number.parseFloat(subtitleStyle.lineHeight),
        subtitleClient: subtitle.clientWidth,
        subtitleScroll: subtitle.scrollWidth,
      };
    });
    expect(archiveHeaderGeometry.titleHeight).toBeLessThanOrEqual(archiveHeaderGeometry.titleLineHeight * 1.1);
    expect(archiveHeaderGeometry.titleScroll).toBeLessThanOrEqual(archiveHeaderGeometry.titleClient + 1);
    expect(archiveHeaderGeometry.subtitleHeight).toBeLessThanOrEqual(archiveHeaderGeometry.subtitleLineHeight * 1.1);
    expect(archiveHeaderGeometry.subtitleScroll).toBeLessThanOrEqual(archiveHeaderGeometry.subtitleClient + 1);
    await expect(page.locator('[data-writing-card][data-writing-context="archive"]')).toHaveCount(3);
    await assertCardGeometry(archive, viewport.width);
    if (viewport.width < 720) {
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      expect(overflow, `${viewport.name} horizontal overflow`).toBe(false);
    }
    await hideFixedChrome(page);
    await page.screenshot({ path: path.join(output, `${viewport.name}.png`) });
    await page.screenshot({ path: path.join(output, `${viewport.name}-full.png`), fullPage: true });
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
    await hideFixedChrome(page);
    await page.screenshot({ path: path.join(output, `${viewport.name}.png`) });
    await page.screenshot({ path: path.join(output, `${viewport.name}-full.png`), fullPage: true });
  }

  for (const viewport of [
    { width: 1920, height: 1080, name: "full-home-1920x1080" },
    { width: 390, height: 844, name: "full-home-390x844" },
  ]) {
    await page.setViewportSize(viewport);
    await page.goto("/");
    await settle(page);
    await hideFixedChrome(page);
    await page.screenshot({ path: path.join(output, `${viewport.name}-viewport.png`) });
    await page.screenshot({ path: path.join(output, `${viewport.name}.png`), fullPage: true });
  }
});
