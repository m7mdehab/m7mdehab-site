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
      roles: rect(".overhaul-hero-roles"),
      location: rect(".overhaul-hero-meta"),
      workHeading: rect(".selected-work-intro h2"),
      writingHeading: rect(".closing-heading h2"),
      opportunityHeading: rect(".closing-opportunity-head h2"),
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
      const oneLineSelectors = [
        ".overhaul-hero-title",
        ".overhaul-hero-roles",
        ".overhaul-hero-meta",
        ".closing-heading h2",
        ".closing-opportunity-head h2",
      ];
      for (const selector of oneLineSelectors) {
        const fit = await page.locator(selector).evaluate((element) => {
          const node = element as HTMLElement;
          return {
            client: node.clientWidth,
            scroll: node.scrollWidth,
            height: node.getBoundingClientRect().height,
          };
        });
        expect(
          fit.scroll,
          `${width}px ${selector} horizontal fit`,
        ).toBeLessThanOrEqual(fit.client + 1);
        if ([".overhaul-hero-roles", ".overhaul-hero-meta"].includes(selector))
          expect(fit.height, `${width}px ${selector} is one line`).toBeLessThan(
            24,
          );
      }
      const actionRows = await page
        .locator(".overhaul-action")
        .evaluateAll((items) =>
          items.map((item) => Math.round(item.getBoundingClientRect().top)),
        );
      expect(actionRows[0], `${width}px hero CTA row`).toBe(actionRows[1]);
      const workHeading = await page
        .locator(".selected-work-intro h2")
        .evaluate((element) => {
          const node = element as HTMLElement;
          return {
            height: node.getBoundingClientRect().height,
            lineHeight: Number.parseFloat(getComputedStyle(node).lineHeight),
          };
        });
      expect(
        workHeading.height,
        `${width}px selected work heading uses two lines`,
      ).toBeLessThanOrEqual(workHeading.lineHeight * 2 + 1);
      const opportunityCtas = page.locator(
        ".closing-path.is-active .closing-path-actions a",
      );
      await expect(opportunityCtas).toHaveCount(3);
      const opportunityRows = await opportunityCtas.evaluateAll((items) =>
        items.map((item) => Math.round(item.getBoundingClientRect().top)),
      );
      expect(
        new Set(opportunityRows).size,
        `${width}px opportunity CTA row`,
      ).toBe(1);

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

      await mkdir(screenshotRoot, { recursive: true });
      await page.screenshot({
        path: path.join(screenshotRoot, `home-${width}.png`),
        fullPage: true,
      });
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

  test("work browser swipes between all six evidence cards and exposes timed dot navigation", async ({
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
      carousel.getByRole("button", { name: "Go to project 1 of 6" }),
    ).toHaveAttribute("aria-current", "true");
    await carousel
      .getByRole("button", { name: "Go to project 2 of 6" })
      .click();
    await expect(carousel).toHaveAttribute(
      "data-active-project",
      "opportunityos",
    );
    const cardBox = await carousel
      .locator(".selected-work-carousel-card")
      .first()
      .boundingBox();
    const controlsBox = await carousel.locator(".carousel-dots").boundingBox();
    expect(cardBox && controlsBox && controlsBox.y).toBeGreaterThan(
      cardBox!.y + cardBox!.height - 40,
    );

    await window.evaluate((element) => {
      element.scrollLeft = element.scrollWidth;
    });
    await expect(carousel).toHaveAttribute("data-active-project", "makhbazy");
    await expect(
      carousel.getByRole("button", { name: "Go to project 6 of 6" }),
    ).toHaveAttribute("aria-current", "true");
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
    await page.getByRole("button", { name: "Go to article 2 of 2" }).click();
    await expect(
      page.getByRole("button", { name: "Go to article 2 of 2" }),
    ).toHaveAttribute("aria-current", "true");

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
      page
        .locator("#opportunity-panel-project")
        .getByRole("link", { name: "Services" }),
    ).toHaveAttribute("href", "/services");
    await expect(
      page
        .locator("#opportunity-panel-project")
        .getByRole("link", { name: "Email", exact: true }),
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

  test("390px section and card heights stay within the composition targets", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settle(page);
    const heights = await page.evaluate(() => ({
      method: document.querySelector("#method")!.getBoundingClientRect().height,
      work: document
        .querySelector(".selected-work-carousel-card")!
        .getBoundingClientRect().height,
      writing: document.querySelector(".closing-note")!.getBoundingClientRect()
        .height,
    }));
    expect(heights.method).toBeGreaterThanOrEqual(750);
    expect(heights.method).toBeLessThanOrEqual(900);
    expect(heights.work).toBeGreaterThanOrEqual(480);
    expect(heights.work).toBeLessThanOrEqual(560);
    expect(heights.writing).toBeGreaterThanOrEqual(380);
    expect(heights.writing).toBeLessThanOrEqual(500);
  });

  test("OpportunityOS mobile card keeps all six core workflow states legible", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settle(page);
    const work = page.locator(".selected-work-carousel");
    await work.getByRole("button", { name: "Go to project 2 of 6" }).click();
    const visual = page.locator(
      '.selected-work-carousel-slide[data-project-slug="opportunityos"] .opportunity-card-visual',
    );
    await expect(visual).toBeVisible();
    const stages = visual.locator("[data-opportunity-stage]:visible");
    await expect(stages).toHaveCount(6);
    await expect(stages).toContainText([
      "Discover",
      "Ingest",
      "Qualify",
      "Score",
      "Truth-lock",
      "Prepare",
    ]);
    const fits = await stages.evaluateAll((elements) => {
      const visual = document.querySelector(
        '.selected-work-carousel-slide[data-project-slug="opportunityos"] .opportunity-card-visual',
      )!.getBoundingClientRect();
      return elements.every((element) => {
        const rect = element.getBoundingClientRect();
        return rect.left >= visual.left && rect.right <= visual.right;
      });
    });
    expect(fits).toBe(true);
    const statusModes = visual.locator(".opportunity-card-mode");
    await expect(statusModes).toHaveCount(3);
    expect(
      await statusModes.evaluateAll((elements) =>
        elements.every((element) => {
          const node = element as HTMLElement;
          return (
            getComputedStyle(node).whiteSpace === "nowrap" &&
            node.scrollWidth <= node.clientWidth
          );
        }),
      ),
    ).toBe(true);
  });

  test("work carousel advances after six seconds and pauses while focused", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    const carousel = page.locator(".selected-work-carousel");
    await carousel.scrollIntoViewIfNeeded();
    await expect(carousel).toHaveAttribute("data-active-project", "presaira");
    await expect(
      carousel.getByRole("button", { name: "Go to project 2 of 6" }),
    ).toBeVisible();
    await page.waitForTimeout(6200);
    await expect(carousel).toHaveAttribute(
      "data-active-project",
      "opportunityos",
    );
    await carousel
      .getByRole("button", { name: "Go to project 1 of 6" })
      .focus();
    await page.waitForTimeout(6200);
    await expect(carousel).toHaveAttribute(
      "data-active-project",
      "opportunityos",
    );
  });

  test("mobile work and writing carousels advance on the shared six-second interval", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const work = page.locator(".selected-work-carousel");
    await work.scrollIntoViewIfNeeded();
    await page.waitForTimeout(6200);
    await expect(
      work.getByRole("button", { name: "Go to project 2 of 6" }),
    ).toHaveAttribute("aria-current", "true");

    const writing = page.locator(".closing-notes");
    await writing.scrollIntoViewIfNeeded();
    await page.waitForTimeout(6200);
    await expect(
      page.getByRole("button", { name: "Go to article 2 of 2" }),
    ).toHaveAttribute("aria-current", "true");
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
      if (viewport.width >= 1440) {
        await mkdir(screenshotRoot, { recursive: true });
        await page.screenshot({
          path: path.join(screenshotRoot, `home-${viewport.width}.png`),
          fullPage: true,
        });
      }
      if (viewport.width >= 1440)
        await expect(
          page.locator(".nav-links a[href='/writing']"),
        ).toBeVisible();
    }
  });
});
