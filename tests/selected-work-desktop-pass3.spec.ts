import { expect, test, type Page } from "@playwright/test";

async function openSelectedWork(page: Page, width = 1440) {
  await page.setViewportSize({ width, height: 1000 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const carousel = page.locator(".selected-work-carousel");
  await carousel.scrollIntoViewIfNeeded();
  return carousel;
}

async function selectSlide(carousel: ReturnType<Page["locator"]>, index: number) {
  await carousel.getByRole("button", { name: `Go to project ${index + 1} of 6` }).click();
  const slugs = ["presaira", "opportunityos", "oil-spill-detection", "solar-site-selection", "ghareeb-oglu", "makhbazy"];
  await expect(carousel).toHaveAttribute("data-active-project", slugs[index]);
  return carousel.locator(`[data-project-slug="${slugs[index]}"] [data-project-artboard]`);
}

test.describe("Selected Work desktop surgical pass 3", () => {
  test("Presaira uses live traced wordmark and transparent competition marks with separated graph labels", async ({ page }) => {
    const carousel = await openSelectedWork(page);
    const board = await selectSlide(carousel, 0);
    const result = await board.evaluate((root) => {
      const wordmark = root.querySelector<SVGSVGElement>("[data-artboard-node='wordmark'] svg")!;
      const semanticTitle = root.querySelector<HTMLElement>("[data-project-title]")!;
      const chart = root.querySelector<SVGSVGElement>("[data-artboard-node='calibrationChart'] svg")!;
      const xTitle = chart.querySelector<SVGTextElement>("[data-axis-label='x']")!;
      const yTitle = chart.querySelector<SVGTextElement>("[data-axis-label='y']")!;
      const xTicks = [...chart.querySelectorAll<SVGTextElement>("[data-axis-tick='x']")];
      const yTicks = [...chart.querySelectorAll<SVGTextElement>("[data-axis-tick='y']")];
      const rect = (node: SVGGraphicsElement) => {
        const r = node.getBoundingClientRect();
        return { left: r.left, right: r.right, top: r.top, bottom: r.bottom };
      };
      const logos = [...root.querySelectorAll<HTMLImageElement>("[data-artboard-node='competitionRail'] img")].slice(0, 2).map((image) => {
        const stage = image.parentElement!;
        const style = getComputedStyle(stage);
        const imageUrl = new URL(image.src);
        const src = imageUrl.pathname === "/_next/image" ? imageUrl.searchParams.get("url") : imageUrl.pathname;
        return { src, background: style.backgroundColor, before: getComputedStyle(stage, "::before").content, natural: [image.naturalWidth, image.naturalHeight] };
      });
      const chartBox = root.querySelector<HTMLElement>("[data-artboard-node='calibrationChart']")!.getBoundingClientRect();
      const plotWidth = Number(chart.dataset.plotWidth);
      const plotHeight = Number(chart.dataset.plotHeight);
      const plotRight = chartBox.left + chartBox.width * (72 + plotWidth) / 1120;
      const plotBottom = chartBox.top + chartBox.height * (24 + plotHeight) / 470;
      return {
        wordmarkViewBox: wordmark.getAttribute("viewBox"),
        wordmarkPaths: wordmark.querySelectorAll("path").length,
        semanticTitle: semanticTitle.textContent,
        semanticTitleVisible: semanticTitle.getBoundingClientRect().width > 1 && getComputedStyle(semanticTitle).clipPath !== "none",
        logos,
        plotWidth,
        plotHeight,
        plotBounds: { right: plotRight, bottom: plotBottom },
        xLabel: rect(xTitle),
        xTickBottom: Math.max(...xTicks.map((tick) => rect(tick).bottom)),
        yLabel: rect(yTitle),
        yTicks: yTicks.map(rect),
        chart: chartBox.toJSON(),
      };
    });

    expect(result.wordmarkViewBox).toBeTruthy();
    expect(result.wordmarkPaths).toBeGreaterThanOrEqual(8);
    expect(result.semanticTitle).toBe("PRESAIRA");
    expect(result.semanticTitleVisible).toBe(false);
    expect(result.logos.map((logo) => logo.src)).toEqual([
      "/selected-work/logos/world-cup-light.png",
      "/selected-work/logos/champions-league-light.png",
    ]);
    expect(result.logos.every((logo) => logo.background === "rgba(0, 0, 0, 0)" && logo.before === "none" && logo.natural[0] === 1254)).toBe(true);
    expect(result.plotWidth).toBe(990);
    expect(result.plotHeight).toBe(359);
    expect(result.xLabel.top - result.xTickBottom).toBeGreaterThan(8);
    expect(result.yTicks.every((tick) => result.yLabel.right + 5 < tick.left || tick.right + 5 < result.yLabel.left || result.yLabel.bottom + 5 < tick.top || tick.bottom + 5 < result.yLabel.top)).toBe(true);
    expect(result.plotBounds.right).toBeLessThan(result.chart.right);
    expect(result.plotBounds.bottom).toBeLessThan(result.chart.bottom);
  });

  test("OpportunityOS keeps five equal nodes and fully contains the Authority Gate check", async ({ page }) => {
    const carousel = await openSelectedWork(page);
    const board = await selectSlide(carousel, 1);
    const layout = await board.evaluate((root) => {
      const svg = root.querySelector<SVGSVGElement>("[data-artboard-node='truthFlow'] svg:not(.mobileFlow)")!;
      const circles = [...svg.querySelectorAll<SVGCircleElement>("circle[data-flow-node]")];
      const mark = svg.querySelector<SVGPathElement>("[data-gate-check]")!;
      const ring = circles.at(-1)!;
      const cx = Number(ring.getAttribute("cx"));
      const cy = Number(ring.getAttribute("cy"));
      const radius = Number(ring.getAttribute("r"));
      const markBox = mark.getBBox();
      const title = root.querySelector<HTMLElement>("[data-flow-stage='0'] > b")!;
      const gate = root.querySelector<HTMLElement>("[data-flow-stage='4']")!;
      const gateTitle = gate.querySelector<HTMLElement>("b")!;
      const support = root.querySelector<HTMLElement>("[data-flow-stage='0'] > span > span")!;
      const gateSupport = gate.querySelector<HTMLElement>("span > span")!;
      const metrics = (node: HTMLElement) => {
        const style = getComputedStyle(node);
        return [style.fontFamily, style.fontSize, style.fontWeight, style.letterSpacing, style.lineHeight];
      };
      return {
        circles: circles.map((circle) => ({ cx: Number(circle.getAttribute("cx")), cy: Number(circle.getAttribute("cy")), r: Number(circle.getAttribute("r")) })),
        mark: { left: markBox.x, right: markBox.x + markBox.width, top: markBox.y, bottom: markBox.y + markBox.height },
        ring: { left: cx - radius, right: cx + radius, top: cy - radius, bottom: cy + radius },
        titleMetrics: [metrics(title), metrics(gateTitle)],
        supportMetrics: [metrics(support), metrics(gateSupport)],
        gateTitleText: gate.querySelector<HTMLElement>("b > span:first-child")?.textContent?.trim(),
      };
    });
    expect(layout.circles).toHaveLength(5);
    expect(layout.circles.map((node) => node.r)).toEqual([12, 12, 12, 12, 12]);
    expect(layout.circles.map((node) => node.cy)).toEqual([80.5, 80.5, 80.5, 80.5, 80.5]);
    expect(layout.circles.map((node) => node.cx)).toEqual([91.5, 313.5, 536.5, 759.5, 982.5]);
    expect(layout.mark.left).toBeGreaterThan(layout.ring.left);
    expect(layout.mark.right).toBeLessThan(layout.ring.right);
    expect(layout.mark.top).toBeGreaterThan(layout.ring.top);
    expect(layout.mark.bottom).toBeLessThan(layout.ring.bottom);
    expect(layout.titleMetrics[0]).toEqual(layout.titleMetrics[1]);
    expect(layout.supportMetrics[0]).toEqual(layout.supportMetrics[1]);
    expect(layout.gateTitleText).toBe("AUTHORITY GATE");
  });

  test("Solar candidate callouts accumulate in order, reset forward, and remain static for reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const carousel = await openSelectedWork(page);
    const board = await selectSlide(carousel, 3);
    const visibility = async () => board.locator("[data-candidate-callout]").evaluateAll((nodes) => nodes.map((node) => Number(getComputedStyle(node).opacity) > 0.96));

    await page.waitForTimeout(850);
    await expect.poll(visibility).toEqual([true, false, false]);
    await page.waitForTimeout(1_050);
    await expect.poll(visibility).toEqual([true, true, false]);
    await page.waitForTimeout(1_200);
    await expect.poll(visibility).toEqual([true, true, true]);
    await page.waitForTimeout(2_500);
    await expect.poll(visibility).toEqual([false, false, false]);
    await page.waitForTimeout(850);
    await expect.poll(visibility).toEqual([true, false, false]);

    const legend = await board.locator("[data-artboard-node='classLegend']").evaluate((node) => {
      const box = node.getBoundingClientRect();
      const last = node.lastElementChild!.getBoundingClientRect();
      const style = getComputedStyle(node);
      return { width: box.width, height: box.height, trailingSpace: box.bottom - last.bottom, paddingBottom: Number.parseFloat(style.paddingBottom), lastRowBottom: last.bottom };
    });
    expect(legend.width).toBeGreaterThan(0);
    expect(legend.height).toBeLessThan(220);
    expect(legend.trailingSpace - legend.paddingBottom).toBeLessThan(3);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    const reducedCarousel = page.locator(".selected-work-carousel");
    await reducedCarousel.scrollIntoViewIfNeeded();
    const reducedBoard = await selectSlide(reducedCarousel, 3);
    const reduced = await reducedBoard.locator("[data-candidate-callout]").evaluateAll((nodes) => nodes.map((node) => Number(getComputedStyle(node).opacity)));
    expect(reduced).toEqual([1, 1, 1]);
    const reducedMapMarks = await reducedBoard.locator("[data-artboard-node='suitabilityMap']").evaluate((map) => [
      ...map.querySelectorAll("[data-candidate-region], [data-candidate-point], [data-candidate-leader]"),
    ].map((node) => Number(getComputedStyle(node).opacity)));
    expect(reducedMapMarks.every((opacity) => opacity === 1)).toBe(true);
  });

  test("Ghareeb stages have equal spacing and its path passes through each stage center", async ({ page }) => {
    const carousel = await openSelectedWork(page);
    const board = await selectSlide(carousel, 4);
    const geometry = await board.locator("[data-artboard-node='commerceJourney']").evaluate((journey) => {
      const svg = journey.querySelector<SVGSVGElement>("svg")!;
      const circles = [...svg.querySelectorAll<SVGCircleElement>("circle[data-commerce-node]")];
      const stages = [...journey.querySelectorAll<HTMLElement>("[data-stage-anchor]")];
      const path = svg.querySelector<SVGPathElement>("path")!;
      const centers = stages.map((stage) => { const rect = stage.getBoundingClientRect(); return { x: rect.left + rect.width / 2 }; });
      const nodeCenters = circles.map((circle) => { const point = new DOMPoint(Number(circle.getAttribute("cx")), Number(circle.getAttribute("cy"))).matrixTransform(svg.getScreenCTM()!); return { x: point.x, y: point.y, localX: Number(circle.getAttribute("cx")), localY: Number(circle.getAttribute("cy")) }; });
      const steps = centers.slice(1).map((center, index) => center.x - centers[index].x);
      const pathLength = path.getTotalLength();
      const pathDistances = nodeCenters.map((node) => {
        let nearest = Number.POSITIVE_INFINITY;
        for (let index = 0; index <= 1200; index++) {
          const point = path.getPointAtLength(pathLength * index / 1200);
          nearest = Math.min(nearest, Math.hypot(point.x - node.localX, point.y - node.localY));
        }
        return nearest;
      });
      return { centers, nodeCenters, steps, pathDistances, path: path.getAttribute("d"), logo: journey.closest("[data-project-artboard]")!.querySelector<HTMLElement>("[data-artboard-node='officialLogo']")!.getBoundingClientRect().toJSON(), journey: journey.getBoundingClientRect().toJSON() };
    });
    expect(geometry.centers).toHaveLength(4);
    expect(Math.max(...geometry.steps) - Math.min(...geometry.steps)).toBeLessThan(2);
    expect(geometry.pathDistances.every((distance) => distance < 0.75)).toBe(true);
    for (const [index, node] of geometry.nodeCenters.entries()) {
      expect(Math.abs(node.x - geometry.centers[index].x)).toBeLessThan(2);
    }
    expect(geometry.path).toContain("H1120");
    expect(geometry.logo.width).toBeGreaterThan(0);
  });

  test("Makhbazy actions align to connector centers, with slightly enlarged secondary utilities", async ({ page }) => {
    const carousel = await openSelectedWork(page);
    const board = await selectSlide(carousel, 5);
    const geometry = await board.locator("[data-artboard-node='journeyAbstraction']").evaluate((journey) => {
      const svg = journey.querySelector<SVGSVGElement>("[data-action-connector]")!;
      const path = svg.querySelector<SVGPathElement>("path")!;
      const nodes = [...svg.querySelectorAll<SVGCircleElement>("circle[data-action-node]")];
      const controls = [...journey.querySelectorAll<SVGSVGElement>("[data-stage-anchor] > svg")];
      const labels = [...journey.querySelectorAll<HTMLElement>("[data-stage-anchor] > span")];
      const center = (rect: DOMRect) => ({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      const utility = journey.closest("[data-project-artboard]")!.querySelector<HTMLElement>("[data-artboard-node='secondaryFeatures']")!;
      const utilityItems = [...utility.children].map((item) => ({ fontSize: getComputedStyle(item).fontSize, icon: getComputedStyle(item.querySelector("svg")!).width }));
      return {
        points: nodes.map((node) => { const localX = Number(node.getAttribute("cx")); const localY = Number(node.getAttribute("cy")); const point = new DOMPoint(localX, localY).matrixTransform(svg.getScreenCTM()!); return { x: point.x, y: point.y, localX, localY, radius: Number(node.getAttribute("r")) }; }),
        controls: controls.map((control) => ({ ...center(control.getBoundingClientRect()), width: control.getBoundingClientRect().width, height: control.getBoundingClientRect().height })),
        labels: labels.map((label) => center(label.getBoundingClientRect())),
        pathDistances: nodes.map((node) => {
          const x = Number(node.getAttribute("cx"));
          const y = Number(node.getAttribute("cy"));
          const pathLength = path.getTotalLength();
          let nearest = Number.POSITIVE_INFINITY;
          for (let index = 0; index <= 1200; index++) {
            const point = path.getPointAtLength(pathLength * index / 1200);
            nearest = Math.min(nearest, Math.hypot(point.x - x, point.y - y));
          }
          return nearest;
        }),
        utilityItems,
        utilityBox: utility.getBoundingClientRect().toJSON(),
      };
    });
    expect(geometry.points).toHaveLength(4);
    expect(geometry.controls).toHaveLength(4);
    expect(geometry.labels).toHaveLength(4);
    expect(geometry.pathDistances.every((distance) => distance < 0.75)).toBe(true);
    for (const [index, point] of geometry.points.entries()) {
      expect(Math.abs(point.x - geometry.controls[index].x)).toBeLessThan(2);
      expect(Math.abs(point.y - geometry.controls[index].y)).toBeLessThan(2);
      expect(Math.abs(geometry.labels[index].x - geometry.controls[index].x)).toBeLessThan(2);
    }
    expect(geometry.controls.every((control) => Math.abs(control.width - control.height) < 0.2)).toBe(true);
    expect(geometry.utilityItems).toHaveLength(3);
    expect(geometry.utilityBox.height).toBeGreaterThan(0);
  });

  test("Oil Spill card stays visually identical to the pre-pass capture", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const carousel = await openSelectedWork(page);
    const board = await selectSlide(carousel, 2);
    await expect(board).toHaveScreenshot("oil-spill-1440.png", { maxDiffPixelRatio: 0.01 });
  });
});
