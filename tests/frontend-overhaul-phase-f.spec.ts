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

  test("mobile sticky story keeps one measured signal across all five states", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settle(page);

    const section = page.locator("[data-method-story]");
    const connectors = section.locator("[data-mobile-connectors]");
    await expect(connectors).toHaveCount(5);
    await expect(section.locator('[data-mobile-geometry="measured"]')).toHaveCount(5);

    for (const stage of ["messy", "expose", "reduce", "build", "outcomes"]) {
      await expect(
        section.locator(`[data-mobile-connectors="${stage}"]`),
      ).toHaveCount(1);
    }

    await expect(
      section.locator('[data-mobile-connectors="messy"] [data-mobile-handoff="out"]'),
    ).toHaveCount(1);

    for (const stage of ["expose", "reduce", "build"]) {
      const connector = section.locator(`[data-mobile-connectors="${stage}"]`);
      await expect(connector.locator('[data-mobile-handoff="in"]')).toHaveCount(1);
      await expect(connector.locator('[data-mobile-handoff="out"]')).toHaveCount(1);
    }

    await expect(
      section.locator('[data-mobile-connectors="outcomes"] [data-mobile-handoff="in"]'),
    ).toHaveCount(1);

    const handoffPaths = section.locator("[data-mobile-handoff]");
    const handoffGeometry = await handoffPaths.evaluateAll((paths) =>
      paths.map((path) => {
        const svgPath = path as SVGPathElement;
        const svg = svgPath.ownerSVGElement!;
        const box = svg.viewBox.baseVal;
        const length = svgPath.getTotalLength();
        const startPoint = svgPath.getPointAtLength(0);
        const endPoint = svgPath.getPointAtLength(length);
        return {
          direction: path.getAttribute("data-mobile-handoff"),
          width: box.width,
          height: box.height,
          start: { x: startPoint.x, y: startPoint.y },
          end: { x: endPoint.x, y: endPoint.y },
        };
      }),
    );

    for (const path of handoffGeometry) {
      const centerY = path.height / 2;
      if (path.direction === "in") {
        expect(Math.abs(path.start.x)).toBeLessThanOrEqual(0.05);
        expect(Math.abs(path.start.y - centerY)).toBeLessThanOrEqual(0.05);
      } else {
        expect(Math.abs(path.end.x - path.width)).toBeLessThanOrEqual(0.05);
        expect(Math.abs(path.end.y - centerY)).toBeLessThanOrEqual(0.05);
      }
    }

    // The fan exists only in Expose. Reduce must not recreate it after convergence.
    await expect(
      section.locator('[data-mobile-connectors="expose"] [data-mobile-path^="expose-fan-"]'),
    ).toHaveCount(10);
    await expect(
      section.locator('[data-mobile-connectors="reduce"] path'),
    ).toHaveCount(2);

    // The five-node output bus belongs only to stage 05, never stage 04.
    await expect(
      section.locator('[data-mobile-connectors="build"] circle'),
    ).toHaveCount(0);
    await expect(
      section.locator('[data-mobile-connectors="outcomes"] circle'),
    ).toHaveCount(5);

    // The sticky viewport is transparent over one solid Method Story paint field.
    const paint = await section.evaluate((element) => {
      const sticky = element.querySelector<HTMLElement>(".method-story__mobile-sticky")!;
      const sectionStyle = getComputedStyle(element);
      const stickyStyle = getComputedStyle(sticky);
      return {
        sectionImage: sectionStyle.backgroundImage,
        stickyImage: stickyStyle.backgroundImage,
        stickyColor: stickyStyle.backgroundColor,
      };
    });
    expect(paint.sectionImage).toBe("none");
    expect(paint.stickyImage).toBe("none");
    expect(paint.stickyColor).toBe("rgba(0, 0, 0, 0)");

    const cues = section.locator(".method-story__mobile-swipe-cue");
    await expect(cues).toHaveCount(5);
    await expect(cues.first()).toHaveText("↓");
    await expect(section.getByText("Swipe down to progress")).toHaveCount(0);
    await expect(section.locator(".method-story__mobile-description")).toHaveCount(5);
    await expect(section.locator(".method-story__mobile-description span")).toHaveCount(15);
    const cueFontSize = await cues.first().evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize),
    );
    expect(cueFontSize).toBeGreaterThanOrEqual(16);

    // Messy Reality must leave each rotated card from its true transformed
    // right-edge midpoint, then stay clear of every sibling card.
    const messyVisual = section.locator(".method-story__mobile-visual--messy");
    const messyPaths = section.locator(
      '[data-mobile-connectors="messy"] [data-mobile-path^="messy-"]:not([data-mobile-path="messy-out"])',
    );
    await expect(messyPaths).toHaveCount(4);
    const messyCards = section.locator(
      '[data-method-stage="messy"] [data-method-input]',
    );

    for (let index = 0; index < 4; index += 1) {
      const path = messyPaths.nth(index);
      const endpoints = await readSvgPathEndpoints(path);
      const portRect = await readLocalRect(
        messyVisual,
        section.locator(
          `[data-method-stage="messy"] [data-method-port="messy-${index + 1}-out"]`,
        ),
      );
      expect(
        pointError(endpoints.start, {
          x: portRect.centerX,
          y: portRect.centerY,
        }),
      ).toBeLessThanOrEqual(1);

      const blockers = await Promise.all(
        Array.from({ length: 4 }, (_, blockerIndex) => blockerIndex)
          .filter((blockerIndex) => blockerIndex !== index)
          .map((blockerIndex) =>
            readLocalRect(messyVisual, messyCards.nth(blockerIndex)),
          ),
      );
      const samples = await readSvgPathSamples(path, 100);
      const crossesSibling = samples.some((point) =>
        blockers.some(
          (rect) =>
            point.x > rect.left + 1 &&
            point.x < rect.right - 1 &&
            point.y > rect.top + 1 &&
            point.y < rect.bottom - 1,
        ),
      );
      expect(crossesSibling).toBe(false);
    }

    // Expose should have enough room for the fan to read clearly.
    const exposeFanLengths = await section
      .locator('[data-mobile-connectors="expose"] [data-mobile-path^="expose-fan-"]')
      .evaluateAll((paths) =>
        paths.map((path) => (path as SVGPathElement).getTotalLength()),
      );
    expect(Math.min(...exposeFanLengths)).toBeGreaterThan(50);

    // Reduce and Build are optically centered; Outcomes centers the whole
    // bus+rows composition and places its hot middle node on the shared axis.
    for (const [stage, selector] of [
      ["reduce", ".method-story__decision-module"],
      ["build", ".method-story__system-stack"],
    ] as const) {
      const visual = section.locator(`.method-story__mobile-visual--${stage}`);
      const width = await visual.evaluate(
        (element) => element.getBoundingClientRect().width,
      );
      const rect = await readLocalRect(visual, section.locator(selector));
      expect(Math.abs(rect.centerX - width / 2)).toBeLessThanOrEqual(4);
    }

    // Build must visibly touch the middle system layer on both sides while
    // preserving the shared viewport handoff axis.
    const buildVisual = section.locator(".method-story__mobile-visual--build");
    const buildIn = section.locator(
      '[data-mobile-connectors="build"] [data-mobile-path="build-in"]',
    );
    const buildOutPath = section.locator(
      '[data-mobile-connectors="build"] [data-mobile-path="build-out"]',
    );
    const buildFrontRect = await readLocalRect(
      buildVisual,
      section.locator(
        '[data-method-stage="build"] .method-story__system-layer--2 .method-story__system-front',
      ),
    );
    const buildSideRect = await readLocalRect(
      buildVisual,
      section.locator(
        '[data-method-stage="build"] .method-story__system-layer--2 .method-story__system-side',
      ),
    );
    const buildInEndpoints = await readSvgPathEndpoints(buildIn);
    const buildOutEndpoints = await readSvgPathEndpoints(buildOutPath);
    expect(
      pointError(buildInEndpoints.end, {
        x: buildFrontRect.left,
        y: buildFrontRect.centerY,
      }),
    ).toBeLessThanOrEqual(1);
    expect(
      pointError(buildOutEndpoints.start, {
        x: buildSideRect.right,
        y: buildSideRect.centerY,
      }),
    ).toBeLessThanOrEqual(1);

    const outcomeVisual = section.locator(
      ".method-story__mobile-visual--outcomes",
    );
    const outcomeSize = await outcomeVisual.evaluate((element) => {
      const rect = element.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    });
    const outcomeRowsRect = await readLocalRect(
      outcomeVisual,
      section.locator(
        '[data-method-stage="outcomes"] .method-story__outputs',
      ),
    );
    const firstOutcomeNode = section.locator(
      '[data-mobile-node="outcomes-node-1"]',
    );
    const middleOutcomeNode = section.locator(
      '[data-mobile-node="outcomes-node-3"]',
    );
    const busX = Number(await firstOutcomeNode.getAttribute("cx"));
    const middleNodeY = Number(await middleOutcomeNode.getAttribute("cy"));
    expect(
      Math.abs((busX + outcomeRowsRect.right) / 2 - outcomeSize.width / 2),
    ).toBeLessThanOrEqual(8);
    expect(Math.abs(middleNodeY - outcomeSize.height / 2)).toBeLessThanOrEqual(1);

    // The stage-04 exit and stage-05 entry must occupy the same absolute Y
    // position while both panels sit on the shared rail.
    const buildOut = section.locator(
      '[data-mobile-connectors="build"] [data-mobile-handoff="out"]',
    );
    const outcomesIn = section.locator(
      '[data-mobile-connectors="outcomes"] [data-mobile-handoff="in"]',
    );
    const absoluteHandoffY = async (
      locator: import("@playwright/test").Locator,
      atEnd: boolean,
    ) =>
      locator.evaluate((element, useEnd) => {
        const path = element as SVGPathElement;
        const svg = path.ownerSVGElement!;
        const rect = svg.getBoundingClientRect();
        const box = svg.viewBox.baseVal;
        const point = path.getPointAtLength(
          useEnd ? path.getTotalLength() : 0,
        );
        return rect.top + (point.y / box.height) * rect.height;
      }, atEnd);
    expect(
      Math.abs(
        (await absoluteHandoffY(buildOut, true)) -
          (await absoluteHandoffY(outcomesIn, false)),
      ),
    ).toBeLessThanOrEqual(0.5);

    const decisionAnimation = await section
      .locator(
        '[data-method-stage="reduce"] .method-story__decision-module',
      )
      .evaluate(
        (element) => getComputedStyle(element, "::after").animationName,
      );
    expect(decisionAnimation).toContain("method-story-decision-scan");

    await expectNoHorizontalOverflow(page);
  });

  test("mobile intro stays compact and stage 05 owns the CTA/status", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settle(page);

    const section = page.locator("[data-method-story]");
    const introLines = await section.evaluate((element) => {
      const heading = element.querySelector<HTMLElement>(".method-story__intro h2")!;
      const support = element.querySelector<HTMLElement>(".method-story__support")!;
      const lineCount = (node: HTMLElement) => {
        const lineHeight = Number.parseFloat(getComputedStyle(node).lineHeight);
        return Math.round(node.getBoundingClientRect().height / lineHeight);
      };
      return {
        heading: lineCount(heading),
        support: lineCount(support),
      };
    });

    expect(introLines.heading).toBe(2);
    expect(introLines.support).toBeLessThanOrEqual(2);

    const track = section.locator("[data-mobile-method-story]");
    await track.evaluate((element) => {
      const bounds = element.getBoundingClientRect();
      const top = window.scrollY + bounds.top;
      const distance = Math.max(0, bounds.height - window.innerHeight);
      window.scrollTo({
        top: top + distance * 0.86,
        behavior: "instant",
      });
    });
    await page.waitForTimeout(180);

    await expect(section.locator("[data-mobile-stage-cta]")).toBeVisible();
    await expect(section.locator(".method-story__mobile-stage-status")).toBeVisible();
    await expect(section.locator(".method-story__footer")).toBeHidden();
    await expectNoHorizontalOverflow(page);
  });

  test("captures all five normal-motion mobile story states", async ({ page }) => {
    await mkdir(screenshotRoot, { recursive: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await settle(page);

    const track = page.locator("[data-mobile-method-story]");
    const sticky = page.locator(".method-story__mobile-sticky");
    await expect(track).toHaveAttribute("data-motion-mode", "enhanced");

    const checkpoints = [
      { progress: 0, file: "method-story-mobile-01-messy.png" },
      { progress: 0.25, file: "method-story-mobile-02-expose.png" },
      { progress: 0.45, file: "method-story-mobile-03-reduce.png" },
      { progress: 0.65, file: "method-story-mobile-04-build.png" },
      { progress: 0.9, file: "method-story-mobile-05-outcomes.png" },
    ] as const;

    for (const checkpoint of checkpoints) {
      await track.evaluate((element, progress) => {
        const bounds = element.getBoundingClientRect();
        const top = window.scrollY + bounds.top;
        const distance = Math.max(0, bounds.height - window.innerHeight);
        window.scrollTo({
          top: top + distance * progress,
          behavior: "instant",
        });
      }, checkpoint.progress);
      await page.waitForTimeout(520);
      await expectNoHorizontalOverflow(page);
      await sticky.screenshot({
        path: path.join(screenshotRoot, checkpoint.file),
      });
    }
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
