import { expect, test } from "@playwright/test";
import {
  SELECTED_WORK_FORWARD_OPACITY,
  SELECTED_WORK_FORWARD_PATH,
  selectedWorkPathLoop,
} from "@/components/selected-work-motion";

const slugs = ["presaira", "opportunityos", "oil-spill-detection", "solar-site-selection", "ghareeb-oglu", "makhbazy"];

async function openSelectedWork(page: import("@playwright/test").Page, width = 1440) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const carousel = page.locator(".selected-work-carousel");
  await carousel.scrollIntoViewIfNeeded();
  await expect(carousel.locator("[data-project-artboard]").first()).toBeVisible();
  return carousel;
}

test.describe("Selected Work desktop surgical pass 2", () => {
  test("directional progress loops forward and hides its reset", () => {
    expect(SELECTED_WORK_FORWARD_PATH).toEqual([0, 1, 1, 1, 1]);
    expect(SELECTED_WORK_FORWARD_PATH.every((value, index, values) => index === 0 || value >= values[index - 1])).toBe(true);
    expect(SELECTED_WORK_FORWARD_OPACITY.at(-1)).toBe(0);
    expect(selectedWorkPathLoop(2.4).times.every((value, index, values) => index === 0 || value > values[index - 1])).toBe(true);
  });

  test("each slide has one CTA and blank artboard/title clicks never navigate", async ({ page }) => {
    const carousel = await openSelectedWork(page);
    for (const [index, slug] of slugs.entries()) {
      await carousel.getByRole("button", { name: `Go to project ${index + 1} of 6` }).click();
      await expect(carousel).toHaveAttribute("data-active-project", slug);
      const slide = carousel.locator(`[data-project-slug="${slug}"]`);
      const board = slide.locator("[data-project-artboard]");
      await expect(board.locator("a[data-conversion=selected-work-to-case-study]")).toHaveCount(1);
      await expect(board.locator("a")).toHaveAttribute("href", `/work/${slug}`);
      const bounds = await board.boundingBox();
      if (!bounds) throw new Error(`Missing artboard bounds for ${slug}`);
      await board.click({ position: { x: bounds.width * 0.48, y: bounds.height * 0.48 } });
      await expect(page).toHaveURL("/");
      const title = board.locator("[data-project-title]");
      await title.click();
      await expect(page).toHaveURL("/");
    }
  });

  test("shared arrows, drag threshold and timer reset change slides without card navigation", async ({ page }) => {
    const carousel = await openSelectedWork(page);
    const next = carousel.getByRole("button", { name: "Next project after Presaira" });
    await expect(next).toBeVisible();
    expect((await next.boundingBox())?.width).toBeGreaterThanOrEqual(44);
    await next.click();
    await expect(carousel).toHaveAttribute("data-active-project", "opportunityos");
    await expect(page).toHaveURL("/");
    await carousel.getByRole("button", { name: "Previous project before OpportunityOS" }).click();
    await expect(carousel).toHaveAttribute("data-active-project", "presaira");

    const activeDot = carousel.locator(".carousel-dot.is-active");
    await expect(activeDot).toHaveCSS("--carousel-progress", "0%");
    await activeDot.focus();
    await carousel.getByRole("button", { name: "Next project after Presaira" }).click();
    await expect(carousel).toHaveAttribute("data-active-project", "opportunityos");
    const resetDot = carousel.locator(".carousel-dot.is-active");
    await expect(resetDot).toHaveCSS("--carousel-progress", "0%");
    await page.waitForTimeout(250);
    await expect(carousel).toHaveAttribute("data-active-project", "opportunityos");

    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    const viewport = carousel.locator(".selected-work-carousel-window");
    const bounds = await viewport.boundingBox();
    if (!bounds) throw new Error("Missing carousel viewport bounds");
    await page.mouse.move(bounds.x + bounds.width * 0.72, bounds.y + bounds.height * 0.48);
    await page.mouse.down();
    await page.mouse.move(bounds.x + bounds.width * 0.2, bounds.y + bounds.height * 0.48, { steps: 8 });
    await page.mouse.up();
    await expect(carousel).toHaveAttribute("data-active-project", "oil-spill-detection");
    await expect(page).toHaveURL("/");
  });

  test("Presaira competition nodes share a baseline and the proof graph uses its enlarged plot", async ({ page }) => {
    const carousel = await openSelectedWork(page);
    const presaira = carousel.locator('[data-project-slug="presaira"] [data-project-artboard]');
    await expect(presaira.locator("[data-artboard-node=proofMetrics]")).toContainText("EXACT MATCHUP");
    const metrics = await presaira.evaluate((board) => {
      const nodes = [...board.querySelectorAll<HTMLElement>("[data-status-node]")].map((node) => {
        const rect = node.getBoundingClientRect();
        return { center: rect.top + rect.height / 2, box: rect.toJSON() };
      });
      const svg = board.querySelector<SVGSVGElement>("[data-artboard-node=calibrationChart] svg")!;
      const score = board.querySelector<HTMLElement>("[data-artboard-node=proof]")!.getBoundingClientRect();
      return { nodes, plotWidth: Number(svg.dataset.plotWidth), plotHeight: Number(svg.dataset.plotHeight), scoreHeight: score.height };
    });
    expect(metrics.nodes).toHaveLength(4);
    expect(Math.max(...metrics.nodes.map((node) => node.center)) - Math.min(...metrics.nodes.map((node) => node.center))).toBeLessThan(0.5);
    expect(metrics.plotWidth).toBe(900);
    expect(metrics.plotHeight).toBe(326);
    expect(metrics.scoreHeight).toBeGreaterThan(0);
  });

  test("OpportunityOS gate order and check containment are deliberate", async ({ page }) => {
    const carousel = await openSelectedWork(page);
    await carousel.getByRole("button", { name: "Go to project 2 of 6" }).click();
    const gate = carousel.locator('[data-project-slug="opportunityos"] [data-artboard-node="authorityGate"]');
    const layout = await gate.evaluate((element) => {
      const check = element.querySelector<HTMLElement>("[data-gate-check]")!;
      const label = element.querySelector<HTMLElement>("b")!;
      const circleBox = check.getBoundingClientRect();
      const labelBox = label.getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents(check);
      const glyph = range.getBoundingClientRect();
      return { circleBox: circleBox.toJSON(), labelTop: labelBox.top, glyph: glyph.toJSON() };
    });
    expect(layout.labelTop).toBeGreaterThan(layout.circleBox.bottom);
    expect(layout.glyph.left).toBeGreaterThan(layout.circleBox.left + 2);
    expect(layout.glyph.right).toBeLessThan(layout.circleBox.right - 2);
    expect(layout.glyph.top).toBeGreaterThan(layout.circleBox.top + 2);
    expect(layout.glyph.bottom).toBeLessThan(layout.circleBox.bottom - 2);
  });

  test("Solar tessellation cells do not overlap and exactly three ranked candidates are present", async ({ page }) => {
    const carousel = await openSelectedWork(page);
    await carousel.getByRole("button", { name: "Go to project 4 of 6" }).click();
    const map = carousel.locator('[data-project-slug="solar-site-selection"] [data-artboard-node="suitabilityMap"]');
    const result = await map.evaluate((element) => {
      const cells = [...element.querySelectorAll<SVGRectElement>("[data-suitability-cell]")].map((cell) => cell.getBoundingClientRect());
      let overlapPairs = 0;
      for (let left = 0; left < cells.length; left++) {
        for (let right = left + 1; right < cells.length; right++) {
          if (Math.min(cells[left].right, cells[right].right) - Math.max(cells[left].left, cells[right].left) > 0.1
            && Math.min(cells[left].bottom, cells[right].bottom) - Math.max(cells[left].top, cells[right].top) > 0.1) overlapPairs += 1;
        }
      }
      return { cellCount: cells.length, overlapPairs, candidateRegions: element.querySelectorAll("[data-candidate-region]").length, callouts: [...element.querySelectorAll<HTMLElement>("[data-candidate-callout]")].map((node) => node.dataset.candidateCallout) };
    });
    expect(result.cellCount).toBe(64);
    expect(result.overlapPairs).toBe(0);
    expect(result.candidateRegions).toBe(3);
    expect(result.callouts).toEqual(["#01", "#02", "#03"]);
  });

  test("Ghareeb bars are gone and Makhbazy footer columns are centered", async ({ page }) => {
    const carousel = await openSelectedWork(page);
    await carousel.getByRole("button", { name: "Go to project 5 of 6" }).click();
    const ghareeb = carousel.locator('[data-project-slug="ghareeb-oglu"] [data-artboard-node="commerceJourney"]');
    await expect(ghareeb.locator(".stage > i")).toHaveCount(0);
    await carousel.getByRole("button", { name: "Go to project 6 of 6" }).click();
    const makhbazy = carousel.locator('[data-project-slug="makhbazy"] [data-artboard-node="capabilities"]');
    const alignments = await makhbazy.locator(":scope > div").evaluateAll((columns) => columns.map((column) => getComputedStyle(column).textAlign));
    expect(alignments).toEqual(["center", "center", "center", "center"]);
    await expect(carousel.locator('[data-project-slug="makhbazy"] [data-artboard-node="secondaryFeatures"]')).toContainText("Invoices and history");
  });
});
