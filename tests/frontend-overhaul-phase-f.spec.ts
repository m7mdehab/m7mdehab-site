import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";
import {
  edgeCenter,
  pointError,
  readLocalRect,
  readSvgPathEndpoints,
  readSvgPathSamples,
} from "./helpers/method-story-geometry";

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

  test("mobile scroll drives one pinned transformation through all five stages", async ({
    page,
  }) => {
    await mkdir(screenshotRoot, { recursive: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settle(page);

    const section = await expectMethodContract(page);
    const canvas = section.locator("[data-method-canvas]");
    const shell = section.locator(".method-story__stage-shell");
    const stages = section.locator("[data-method-stage]");

    await expect(canvas).toHaveAttribute("data-mobile-enhanced", "true");
    await expect(shell).toHaveCSS("position", "sticky");
    await expect(
      section.locator(".method-story__mobile-progress-labels span"),
    ).toHaveCount(5);
    await expectNoHorizontalOverflow(page);

    const checkpoints = [
      { progress: 0.05, id: "messy", file: "method-story-mobile-01-messy.png" },
      { progress: 0.28, id: "expose", file: "method-story-mobile-02-expose.png" },
      { progress: 0.5, id: "reduce", file: "method-story-mobile-03-reduce.png" },
      { progress: 0.72, id: "build", file: "method-story-mobile-04-build.png" },
      { progress: 0.98, id: "outcomes", file: "method-story-mobile-05-outcomes.png" },
    ] as const;

    for (const checkpoint of checkpoints) {
      await canvas.evaluate((element, targetProgress) => {
        const rect = element.getBoundingClientRect();
        const absoluteTop = window.scrollY + rect.top;
        const viewport = window.innerHeight;
        const progressRange = Math.max(1, rect.height - viewport * 0.76);
        const targetScroll =
          absoluteTop - viewport * 0.12 + progressRange * targetProgress;
        window.scrollTo({ top: targetScroll, behavior: "instant" });
      }, checkpoint.progress);
      await page.waitForTimeout(650);

      const active = section.locator(
        `[data-method-stage="${checkpoint.id}"]`,
      );
      const activeOpacity = await active.evaluate((element) =>
        Number.parseFloat(getComputedStyle(element).opacity),
      );
      expect(
        activeOpacity,
        `${checkpoint.id} opacity at progress ${checkpoint.progress}`,
      ).toBeGreaterThanOrEqual(0.85);

      await shell.screenshot({
        path: path.join(screenshotRoot, checkpoint.file),
      });
    }

    const stageRects = await stages.evaluateAll((elements) =>
      elements.map((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom };
      }),
    );
    expect(
      stageRects.every(
        (rect) => rect.left >= -1 && rect.right <= 391,
      ),
    ).toBeTruthy();
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

  test("normal scrolling resolves every stage and output", async ({ page }) => {
    await page.goto("/");
    await settle(page);

    const canvas = page.locator("[data-method-canvas]");
    await expect(canvas).toHaveAttribute("data-motion-mode", "enhanced");
    await page.locator("[data-method-story]").evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      window.scrollTo({
        top: window.scrollY + bounds.bottom - window.innerHeight * 0.28,
        behavior: "instant",
      });
    });
    await page.waitForTimeout(1400);

    const opacities = await page
      .locator("[data-method-stage], [data-method-output]")
      .evaluateAll((elements) =>
        elements.map((element) =>
          Number.parseFloat(getComputedStyle(element).opacity),
        ),
      );
    expect(opacities).toHaveLength(10);
    expect(
      opacities.every((opacity) => opacity >= 0.99),
      `Final stage/output opacities: ${JSON.stringify(opacities)}`,
    ).toBeTruthy();
  });

  test("desktop pass 02 precision anchors and single-line intro are staged", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    await settle(page);

    const section = page.locator("[data-method-story]");
    await expect(section.locator('[data-method-anchor^="messy-"]')).toHaveCount(4);
    await expect(section.locator('[data-method-anchor="expose-stack"]')).toHaveCount(1);
    await expect(section.locator('[data-method-anchor="reduce-card"]')).toHaveCount(1);
    await expect(section.locator('[data-method-anchor="build-system"]')).toHaveCount(1);
    await expect(section.locator('[data-method-anchor^="outcome-"]')).toHaveCount(5);
    await expect(section.locator("[data-method-bus-node]")).toHaveCount(5);
    await expect(section.locator(".method-story__eyebrow")).toBeHidden();

    const introLines = await section.evaluate((node) => {
      const lineCount = (selector: string) => {
        const element = node.querySelector<HTMLElement>(selector)!;
        const style = getComputedStyle(element);
        const lineHeight = Number.parseFloat(style.lineHeight);
        return Math.round(element.getBoundingClientRect().height / lineHeight);
      };
      return {
        title: lineCount(".method-story__intro h2"),
        support: lineCount(".method-story__support"),
      };
    });

    expect(introLines.title).toBe(1);
    expect(introLines.support).toBe(1);
  });

  test("desktop measured connectors touch their exact source and destination edges", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    await settle(page);

    const section = page.locator("[data-method-story]");
    const canvas = section.locator("[data-method-canvas]");

    await section.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const absoluteTop = window.scrollY + bounds.top;
      window.scrollTo({
        top: absoluteTop + bounds.height / 2 - window.innerHeight / 2,
        behavior: "instant",
      });
    });

    const measured = section.locator("[data-method-measured-connectors]");
    await expect(measured).toBeVisible();
    await page.waitForTimeout(900);

    const connectorZIndex = Number(
      await measured.evaluate((element) => getComputedStyle(element).zIndex),
    );
    const journeyZIndex = Number(
      await section
        .locator(".method-story__journey")
        .evaluate((element) => getComputedStyle(element).zIndex),
    );
    expect(connectorZIndex).toBeLessThan(journeyZIndex);

    const inputPaths = measured.locator(
      '[data-method-connectors="input-expose"] path',
    );
    const exposePaths = measured.locator(
      '[data-method-connectors="expose-reduce"] path',
    );
    const outcomePaths = measured.locator(
      '[data-method-connectors="build-outcomes"] path',
    );

    await expect(inputPaths).toHaveCount(4);
    await expect(exposePaths).toHaveCount(12);
    await expect(
      measured.locator('[data-method-measured-connector="reduce-build"]'),
    ).toHaveCount(1);
    await expect(measured.locator("[data-method-measured-node]")).toHaveCount(5);
    await expect(outcomePaths).toHaveCount(5);

    const inputRects = await Promise.all(
      Array.from({ length: 4 }, (_, index) =>
        readLocalRect(
          canvas,
          section.locator("[data-method-input]").nth(index),
        ),
      ),
    );
    const evidenceRects = await Promise.all(
      Array.from({ length: 5 }, (_, index) =>
        readLocalRect(
          canvas,
          section.locator(`[data-method-evidence-sheet="${index + 1}"]`),
        ),
      ),
    );
    const evidenceTagRects = await Promise.all(
      Array.from(
        {
          length: await section.locator(".method-story__evidence-tag").count(),
        },
        (_, index) =>
          readLocalRect(
            canvas,
            section.locator(".method-story__evidence-tag").nth(index),
          ),
      ),
    );
    const crossesRect = (
      point: { x: number; y: number },
      rect: Awaited<ReturnType<typeof readLocalRect>>,
    ) =>
      point.x > rect.left + 1 &&
      point.x < rect.right - 1 &&
      point.y > rect.top + 1 &&
      point.y < rect.bottom - 1;

    const errors: number[] = [];

    const exposeInRect = await readLocalRect(
      canvas,
      section.locator('[data-method-port="expose-in"]'),
    );
    const exposeEntry = edgeCenter(exposeInRect, "left");
    const messyEndpoints: Array<{ x: number; y: number }> = [];

    for (let index = 0; index < 4; index += 1) {
      const endpoints = await readSvgPathEndpoints(inputPaths.nth(index));
      const sourceRect = await readLocalRect(
        canvas,
        section.locator(`[data-method-port="messy-${index + 1}-out"]`),
      );

      errors.push(
        pointError(endpoints.start, edgeCenter(sourceRect, "right")),
        pointError(endpoints.end, exposeEntry),
      );
      messyEndpoints.push(endpoints.end);

      const blockers = [
        ...inputRects.filter((_, blockerIndex) => blockerIndex !== index),
        ...evidenceTagRects,
      ];
      const samples = await readSvgPathSamples(inputPaths.nth(index));
      expect(
        samples.some((point) =>
          blockers.some((rect) => crossesRect(point, rect)),
        ),
      ).toBe(false);
    }

    for (const endpoint of messyEndpoints) {
      expect(pointError(endpoint, messyEndpoints[0])).toBeLessThanOrEqual(0.02);
    }

    const reduceInRect = await readLocalRect(
      canvas,
      section.locator('[data-method-port="reduce-in"]'),
    );
    const frontRatios = [0.07, 0.19, 0.31, 0.43, 0.57, 0.69, 0.81, 0.93];

    for (let index = 0; index < 12; index += 1) {
      const endpoints = await readSvgPathEndpoints(exposePaths.nth(index));
      const sheetIndex = index < 4 ? index : 4;
      const sourceRect = evidenceRects[sheetIndex];

      errors.push(
        Math.abs(endpoints.start.x - sourceRect.right),
        pointError(endpoints.end, edgeCenter(reduceInRect, "left")),
      );
      expect(endpoints.start.y).toBeGreaterThan(sourceRect.top);
      expect(endpoints.start.y).toBeLessThan(sourceRect.bottom);

      if (index >= 4) {
        const expectedY =
          sourceRect.top + sourceRect.height * frontRatios[index - 4];
        expect(Math.abs(endpoints.start.y - expectedY)).toBeLessThanOrEqual(2);
      }

      const blockers = [
        ...inputRects,
        ...evidenceTagRects,
      ];
      const samples = await readSvgPathSamples(exposePaths.nth(index));
      expect(
        samples.some((point) =>
          blockers.some((rect) => crossesRect(point, rect)),
        ),
      ).toBe(false);
    }

    const reduceBuild = await readSvgPathEndpoints(
      measured.locator('[data-method-measured-connector="reduce-build"]'),
    );
    const reduceOutRect = await readLocalRect(
      canvas,
      section.locator('[data-method-port="reduce-out"]'),
    );
    const buildInRect = await readLocalRect(
      canvas,
      section.locator('[data-method-port="build-in"]'),
    );
    errors.push(
      pointError(reduceBuild.start, edgeCenter(reduceOutRect, "right")),
      pointError(reduceBuild.end, edgeCenter(buildInRect, "left")),
    );

    const buildEntry = await readSvgPathEndpoints(
      measured.locator('[data-method-measured-connector="build-entry"]'),
    );
    const buildOutRect = await readLocalRect(
      canvas,
      section.locator('[data-method-port="build-out"]'),
    );
    const middleNode = measured.locator('[data-method-measured-node="3"]');
    const middleNodePoint = await middleNode.evaluate((element) => ({
      x: Number(element.getAttribute("cx")),
      y: Number(element.getAttribute("cy")),
    }));
    errors.push(
      pointError(buildEntry.start, edgeCenter(buildOutRect, "right")),
      pointError(buildEntry.end, middleNodePoint),
    );

    for (let index = 0; index < 5; index += 1) {
      const endpoints = await readSvgPathEndpoints(outcomePaths.nth(index));
      const node = measured.locator(
        `[data-method-measured-node="${index + 1}"]`,
      );
      const nodePoint = await node.evaluate((element) => ({
        x: Number(element.getAttribute("cx")),
        y: Number(element.getAttribute("cy")),
      }));
      const outcomeRect = await readLocalRect(
        canvas,
        section.locator(`[data-method-port="outcome-${index + 1}-in"]`),
      );
      errors.push(
        pointError(endpoints.start, nodePoint),
        pointError(endpoints.end, edgeCenter(outcomeRect, "left")),
      );
    }

    const maxError = Math.max(...errors);
    expect(maxError, `Maximum connector endpoint error: ${maxError}px`).toBeLessThanOrEqual(2);
  });
  test("desktop stages keep explicit breathing room without changing the composition", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    await settle(page);

    const section = page.locator("[data-method-story]");
    const spacing = await section.evaluate((node) => {
      const journey = node.querySelector<HTMLElement>(".method-story__journey")!;
      const transformation = node.querySelector<HTMLElement>(
        ".method-story__transformation-list",
      )!;
      return {
        outer: Number.parseFloat(getComputedStyle(journey).columnGap),
        inner: Number.parseFloat(getComputedStyle(transformation).columnGap),
      };
    });

    expect(spacing.outer).toBeGreaterThanOrEqual(24);
    expect(spacing.inner).toBeGreaterThanOrEqual(20);
  });

  test("desktop connectors and centered viewport resolve before scrolling past the section", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    await settle(page);

    const section = page.locator("[data-method-story]");
    await expect(
      section.locator('[data-method-connectors="input-expose"] path'),
    ).toHaveCount(4);
    await expect(
      section.locator('[data-method-connectors="expose-reduce"] path'),
    ).toHaveCount(12);

    await section.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const absoluteTop = window.scrollY + bounds.top;
      window.scrollTo({
        top: absoluteTop + bounds.height / 2 - window.innerHeight / 2,
        behavior: "instant",
      });
    });
    await page.waitForTimeout(900);

    const opacities = await page
      .locator("[data-method-stage], [data-method-output]")
      .evaluateAll((elements) =>
        elements.map((element) =>
          Number.parseFloat(getComputedStyle(element).opacity),
        ),
      );

    expect(
      opacities.every((opacity) => opacity >= 0.99),
      `Centered-section stage/output opacities: ${JSON.stringify(opacities)}`,
    ).toBeTruthy();

    const geometry = await section.evaluate((node) => {
      const centerX = (selector: string) => {
        const rect = node.querySelector<HTMLElement>(selector)!.getBoundingClientRect();
        return rect.left + rect.width / 2;
      };
      return {
        reduceTitle: centerX('[data-method-stage="reduce"] .method-story__stage-head'),
        reduceDocument: centerX('[data-method-stage="reduce"] .method-story__decision-module'),
        buildTitle: centerX('[data-method-stage="build"] .method-story__stage-head'),
        buildSystem: centerX('[data-method-stage="build"] .method-story__system-stack'),
      };
    });

    expect(Math.abs(geometry.reduceTitle - geometry.reduceDocument)).toBeLessThanOrEqual(12);
    expect(Math.abs(geometry.buildTitle - geometry.buildSystem)).toBeLessThanOrEqual(12);
  });
});
