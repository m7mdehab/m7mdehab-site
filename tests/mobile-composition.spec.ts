import AxeBuilder from "@axe-core/playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

const artifactRoot = path.resolve("artifacts", "mobile-composition");
const screenshotRoot = path.join(artifactRoot, "screenshots");
const phoneWidths = [320, 360, 375, 390, 412, 430, 480] as const;

async function settle(page: Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images).map((image) =>
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
  await page.waitForTimeout(650);
}

async function viewportMetrics(page: Page) {
  return page.evaluate(() => {
    const rect = (selector: string) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return null;
      const box = element.getBoundingClientRect();
      return {
        left: box.left,
        right: box.right,
        top: box.top,
        bottom: box.bottom,
        width: box.width,
        height: box.height,
      };
    };
    const offenders = Array.from(
      document.body.querySelectorAll<HTMLElement>("*"),
    )
      .filter((element) => {
        const box = element.getBoundingClientRect();
        if (
          !box.width ||
          !box.height ||
          getComputedStyle(element).display === "none"
        )
          return false;
        if (
          element.closest(
            ".credibility-viewport, .selected-work-carousel-window, .closing-notes",
          )
        )
          return false;
        return box.left < -1 || box.right > window.innerWidth + 1;
      })
      .slice(0, 8)
      .map((element) => ({
        selector: element.className.toString().slice(0, 70),
        left: Math.round(element.getBoundingClientRect().left),
        right: Math.round(element.getBoundingClientRect().right),
      }));
    return {
      viewportWidth: document.documentElement.clientWidth,
      documentWidth: document.documentElement.scrollWidth,
      documentHeight: document.documentElement.scrollHeight,
      hero: rect(".overhaul-hero"),
      name: rect(".overhaul-hero-title"),
      primaryAction: rect(".overhaul-action-primary"),
      secondaryAction: rect(".overhaul-action-secondary"),
      nav: rect(".site-nav"),
      identity: rect(".nav-identity"),
      offenders,
    };
  });
}

test.describe("Phone composition", () => {
  test("full page fits every target phone width and keeps identity, navigation and actions in bounds", async ({
    page,
  }) => {
    const reports = [];
    for (const width of phoneWidths) {
      await page.setViewportSize({ width, height: 844 });
      const response = await page.goto("/");
      expect(response?.ok(), `${width}px homepage response`).toBeTruthy();
      await settle(page);

      const metrics = await viewportMetrics(page);
      reports.push({ width, ...metrics });
      expect(
        metrics.documentWidth,
        `${width}px document width`,
      ).toBeLessThanOrEqual(metrics.viewportWidth + 1);
      expect(
        metrics.offenders,
        `${width}px visible elements outside the viewport`,
      ).toEqual([]);

      const title = page.getByRole("heading", { level: 1 });
      await expect(title).toContainText("Mohammed Ehab");
      await expect(title).toContainText("ElNomany");
      await expect(page.locator(".nav-identity")).toBeVisible();
      await expect(page.locator('.site-nav a[href="/#work"]')).toBeVisible();
      await expect(
        page
          .getByRole("navigation", { name: "Primary navigation" })
          .getByRole("link", { name: "M7 — back to top" }),
      ).toBeVisible();

      for (const selector of [
        ".overhaul-hero-title",
        ".overhaul-action-primary",
        ".overhaul-action-secondary",
        ".site-nav",
      ]) {
        const box = await page.locator(selector).boundingBox();
        expect(box, `${width}px ${selector} bounds`).not.toBeNull();
        expect(box!.x).toBeGreaterThanOrEqual(-1);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width + 1);
      }

      if ([320, 390, 430].includes(width)) {
        await mkdir(screenshotRoot, { recursive: true });
        await page.screenshot({
          path: path.join(screenshotRoot, `home-${width}.png`),
          fullPage: true,
        });
      }
    }
    await mkdir(artifactRoot, { recursive: true });
    await writeFile(
      path.join(artifactRoot, "viewport-metrics.json"),
      JSON.stringify(reports, null, 2),
    );
  });

  test("section anchors leave content below the floating navigation", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    for (const [anchor, heading] of [
      ["work", ".selected-work-intro h2"],
      ["method", ".solve-think-intro h2"],
      ["writing", ".closing-heading h2"],
      ["contact", ".closing-opportunity-head h2"],
    ]) {
      await page.goto(`/#${anchor}`);
      await settle(page);
      const boxes = await page.evaluate((selector) => {
        const heading = document.querySelector<HTMLElement>(selector)!;
        const nav = document.querySelector<HTMLElement>(".site-nav-wrap")!;
        const h = heading.getBoundingClientRect();
        const n = nav.getBoundingClientRect();
        return {
          headingTop: h.top,
          navBottom: n.bottom,
          navHidden: nav.classList.contains("nav-hidden"),
        };
      }, heading);
      expect(boxes.headingTop, `#${anchor} heading position`).toBeGreaterThan(
        boxes.navHidden ? -20 : boxes.navBottom,
      );
    }
  });

  test("work browser swipes between all six evidence cards and keeps controls outside the card", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settle(page);
    const carousel = page.locator(".selected-work-carousel");
    const window = page.locator(".selected-work-carousel-window");
    await expect(page.locator("[data-project-slug]")).toHaveCount(6);
    await expect(carousel).toHaveAttribute("data-active-project", "presaira");
    await expect(
      carousel.getByRole("button", { name: "Previous project" }),
    ).toBeDisabled();
    await expect(
      carousel.getByRole("button", { name: "Next project" }),
    ).toBeEnabled();

    await carousel.getByRole("button", { name: "Next project" }).click();
    await expect(carousel).toHaveAttribute(
      "data-active-project",
      "opportunityos",
    );
    await expect(
      carousel.locator(".selected-work-carousel-status"),
    ).toContainText("02 / 06");
    const cardBox = await carousel
      .locator(".selected-work-carousel-card")
      .first()
      .boundingBox();
    const controlsBox = await carousel
      .locator(".selected-work-carousel-controls")
      .boundingBox();
    expect(cardBox && controlsBox && controlsBox.y).toBeGreaterThan(
      cardBox!.y + cardBox!.height,
    );

    await window.evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
    await expect(carousel).toHaveAttribute("data-active-project", "makhbazy");
    await expect(
      carousel.getByRole("button", { name: "Next project" }),
    ).toBeDisabled();
    await expect(
      page.getByRole("link", { name: "Open Makhbazy case study" }),
    ).toHaveAttribute("href", "/work/makhbazy");
  });

  test("method stepper exposes SEE by default, arrow-key browsing and only one phone panel", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settle(page);
    const tabs = page.getByRole("tablist", { name: "How I work" });
    await expect(page.locator(".solve-think-process")).toHaveClass(
      /is-mobile-enhanced/,
    );
    await expect(tabs.getByRole("tab", { name: /SEE/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.locator("#method [role=tabpanel]:visible")).toHaveCount(
      1,
    );
    await tabs.getByRole("tab", { name: /REDUCE/ }).click();
    await expect(tabs.getByRole("tab", { name: /REDUCE/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await tabs.getByRole("tab", { name: /REDUCE/ }).press("ArrowRight");
    await expect(tabs.getByRole("tab", { name: /BUILD/ })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.locator(".solve-think-step")).toHaveCount(3);
    await expect(
      page.locator('.solve-think-step[aria-hidden="true"] a:visible'),
    ).toHaveCount(0);
  });

  test("writing cards browse horizontally and opportunity tabs switch paths by keyboard", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settle(page);
    const writing = page.locator(".closing-notes");
    await expect(writing.locator(".closing-note")).toHaveCount(2);
    await expect(
      writing.getByRole("link", { name: /Read the field note/i }).first(),
    ).toHaveAttribute("href", /\/writing\//);
    await expect(
      page
        .locator(".closing-heading-side")
        .getByRole("link", { name: /All writing/ }),
    ).toHaveAttribute("href", "/writing");
    await writing.evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
    expect(
      await writing.evaluate((element) => element.scrollLeft),
    ).toBeGreaterThan(0);

    const tabs = page.getByRole("tablist", {
      name: "Choose an opportunity path",
    });
    await expect(page.locator(".closing-paths")).toHaveClass(
      /is-mobile-enhanced/,
    );
    const roleTab = tabs.locator('[role="tab"]').nth(0);
    const projectTab = tabs.locator('[role="tab"]').nth(1);
    await expect(roleTab).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#contact [role=tabpanel]:visible")).toHaveCount(
      1,
    );
    await roleTab.press("ArrowRight");
    await expect(projectTab).toHaveAttribute("aria-selected", "true");
    await expect(
      page.getByRole("link", { name: /Service context/ }),
    ).toHaveAttribute("href", "/services");
    await expect(
      page.getByRole("link", { name: /Discuss the problem/ }),
    ).toBeVisible();
  });

  test("reduced motion keeps the rail static and mobile content usable; mobile home passes axe", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await settle(page);
    await expect(
      page.locator('.credibility-sequence[aria-hidden="true"]'),
    ).toBeHidden();
    expect(
      await page
        .locator(".credibility-track")
        .evaluate((element) => getComputedStyle(element).animationName),
    ).toBe("none");
    await expect(
      page.getByRole("heading", { name: "I like the messy part." }),
    ).toBeVisible();
    const results = await new AxeBuilder({ page }).analyze();
    expect(
      results.violations,
      JSON.stringify(results.violations, null, 2),
    ).toEqual([]);
  });

  test("small-phone landscape and desktop regression widths do not overflow", async ({
    page,
  }) => {
    for (const viewport of [
      { width: 844, height: 390 },
      { width: 1440, height: 1050 },
      { width: 1920, height: 1080 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto("/");
      await settle(page);
      const metrics = await viewportMetrics(page);
      expect(
        metrics.documentWidth,
        `${viewport.width}x${viewport.height}`,
      ).toBeLessThanOrEqual(metrics.viewportWidth + 1);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        "Mohammed Ehab ElNomany",
      );
      if (viewport.width >= 1440)
        await expect(
          page.locator(".nav-links a[href='/writing']"),
        ).toBeVisible();
    }
  });
});
