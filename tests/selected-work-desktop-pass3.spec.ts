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
  test("Presaira uses the supplied transparent wordmark and transparent competition marks with separated graph labels", async ({ page }) => {
    const carousel = await openSelectedWork(page);
    const board = await selectSlide(carousel, 0);
    const result = await board.evaluate((root) => {
      const wordmark = root.querySelector<HTMLImageElement>("[data-artboard-node='wordmark'] img[data-presaira-wordmark]")!;
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
        wordmarkSrc: new URL(wordmark.currentSrc).pathname,
        wordmarkNatural: [wordmark.naturalWidth, wordmark.naturalHeight],
        wordmarkRendered: [wordmark.getBoundingClientRect().width, wordmark.getBoundingClientRect().height],
        wordmarkFit: getComputedStyle(wordmark).objectFit,
        wordmarkFilter: getComputedStyle(wordmark).filter,
        wordmarkRatio: wordmark.getBoundingClientRect().width / wordmark.getBoundingClientRect().height,
        wordmarkDensity: wordmark.naturalWidth / wordmark.getBoundingClientRect().width / window.devicePixelRatio,
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

    expect(result.wordmarkSrc).toBe("/selected-work/logos/presaira-wordmark.png");
    expect(result.wordmarkNatural).toEqual([2172, 724]);
    expect(result.wordmarkRatio).toBeCloseTo(3, 3);
    expect(result.wordmarkFit).toBe("contain");
    expect(result.wordmarkFilter).toBe("none");
    expect(result.wordmarkDensity).toBeGreaterThanOrEqual(1);
    expect(result.semanticTitle).toBe("PRESAIRA");
    expect(result.semanticTitleVisible).toBe(false);
    expect(result.logos.map((logo) => logo.src)).toEqual([
      "/selected-work/logos/world-cup-light.png",
      "/selected-work/logos/champions-league-light.png",
    ]);
    expect(result.logos.every((logo) => logo.background === "rgba(0, 0, 0, 0)" && logo.before === "none" && logo.natural[0] === 1254)).toBe(true);
    expect(result.plotWidth).toBe(1020);
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
      const conditionLines = [...gate.querySelectorAll<HTMLElement>(":scope > span > span")];
      const textCenter = (node: HTMLElement) => {
        const range = document.createRange();
        range.selectNodeContents(node);
        const rect = range.getBoundingClientRect();
        return rect.left + rect.width / 2;
      };
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
        gateTitleLines: gateTitle.querySelector<HTMLElement>("[data-gate-desktop-label]")!.getClientRects().length,
        gateConditionTexts: conditionLines.map((line) => line.textContent?.trim()),
        gateConditionLines: conditionLines.map((line) => {
          const range = document.createRange();
          range.selectNodeContents(line);
          return range.getClientRects().length;
        }),
        gateTitleCenter: textCenter(gateTitle.querySelector<HTMLElement>("[data-gate-desktop-label]")!),
        gateConditionCenters: conditionLines.map(textCenter),
        nodeCenter: new DOMPoint(cx, cy).matrixTransform(svg.getScreenCTM()!).x,
        trackingRatio: Number.parseFloat(getComputedStyle(root.querySelector<HTMLElement>("[data-project-title]")!).letterSpacing)
          / Number.parseFloat(getComputedStyle(root.querySelector<HTMLElement>("[data-project-title]")!).fontSize),
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
    expect(layout.gateTitleLines).toBe(1);
    expect(layout.gateConditionTexts).toEqual(["SUFFICIENT EVIDENCE", "VALID AUTHORITY", "ALLOWED ACTION"]);
    expect(layout.gateConditionLines).toEqual([1, 1, 1]);
    expect(Math.abs(layout.gateTitleCenter - layout.nodeCenter)).toBeLessThan(2);
    expect(layout.gateConditionCenters.every((center) => Math.abs(center - layout.nodeCenter) < 2)).toBe(true);
    expect(layout.trackingRatio).toBeCloseTo(0.028, 3);
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
      const artboard = journey.closest("[data-project-artboard]")!;
      const logo = artboard.querySelector<HTMLElement>("[data-artboard-node='officialLogo']")!;
      const capabilities = artboard.querySelector<HTMLElement>("[data-artboard-node='capabilities']")!;
      const labels = [...capabilities.querySelectorAll<HTMLElement>("span")];
      const separators = [...capabilities.querySelectorAll<HTMLElement>("i")];
      const separatorOffsets = separators.map((separator, index) => {
        const rect = separator.getBoundingClientRect();
        const leftLabel = labels[index].getBoundingClientRect();
        const rightLabel = labels[index + 1].getBoundingClientRect();
        const midpoint = (leftLabel.right + rightLabel.left) / 2;
        return Math.abs(rect.left + rect.width / 2 - midpoint);
      });
      const icons = [...journey.querySelectorAll<SVGSVGElement>("[data-stage-anchor] > svg")];
      const labelFontSizes = [...journey.querySelectorAll<HTMLElement>("[data-stage-anchor] > b")].map((label) => Number.parseFloat(getComputedStyle(label).fontSize));
      return {
        centers,
        nodeCenters,
        steps,
        pathDistances,
        path: path.getAttribute("d"),
        logo: { ...logo.getBoundingClientRect().toJSON(), sourceWidth: Number(logo.getAttribute("data-artboard-w")), sourceHeight: Number(logo.getAttribute("data-artboard-h")) },
        journey: journey.getBoundingClientRect().toJSON(),
        capabilities: {
          y: Number(capabilities.getAttribute("data-artboard-y")),
          firstLabelSourceX: (labels[0].getBoundingClientRect().left - artboard.getBoundingClientRect().left) / artboard.getBoundingClientRect().width * 1683,
          labelGroupWidth: labels.at(-1)!.getBoundingClientRect().right - labels[0].getBoundingClientRect().left,
          groupCenterOffset: Math.abs((labels[0].getBoundingClientRect().left + labels.at(-1)!.getBoundingClientRect().right) / 2 - (artboard.getBoundingClientRect().left + artboard.getBoundingClientRect().width / 2)),
          separatorOffsets,
        },
        icons: icons.map((icon) => Number.parseFloat(getComputedStyle(icon).width)),
        labelFontSizes,
      };
    });
    expect(geometry.centers).toHaveLength(4);
    expect(Math.max(...geometry.steps) - Math.min(...geometry.steps)).toBeLessThan(2);
    expect(geometry.pathDistances.every((distance) => distance < 0.75)).toBe(true);
    for (const [index, node] of geometry.nodeCenters.entries()) {
      expect(Math.abs(node.x - geometry.centers[index].x)).toBeLessThan(2);
    }
    expect(geometry.path).toContain("H980");
    expect(geometry.logo.width).toBeGreaterThan(0);
    expect(geometry.logo.sourceWidth).toBe(320);
    expect(geometry.logo.sourceHeight).toBe(216);
    expect(geometry.icons.every((size) => size < 42)).toBe(true);
    expect(geometry.labelFontSizes.every((size) => size < 19)).toBe(true);
    expect(geometry.capabilities.y).toBe(787);
    expect(geometry.capabilities.labelGroupWidth).toBeLessThan(700);
    expect(geometry.capabilities.firstLabelSourceX).toBeGreaterThan(400);
    expect(geometry.capabilities.groupCenterOffset).toBeLessThan(1);
    expect(geometry.capabilities.separatorOffsets.every((offset) => offset < 1)).toBe(true);
  });

  test("desktop artboard micro-polish remains aligned at 1280, 1440, and 1920", async ({ page }) => {
    const carousel = await openSelectedWork(page, 1280);

    for (const width of [1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => document.fonts.ready);

      const presaira = await selectSlide(carousel, 0);
      const wordmark = await presaira.evaluate((root) => {
        const image = root.querySelector<HTMLImageElement>("img[data-presaira-wordmark]")!;
        const ink = image.getBoundingClientRect();
        const identity = root.querySelector<HTMLElement>("[data-artboard-node='wordmark']")!.getBoundingClientRect();
        const visible = {
          left: ink.left + ink.width * 115 / 2172,
          right: ink.left + ink.width * 2058 / 2172,
          top: ink.top + ink.height * 287 / 724,
          bottom: ink.top + ink.height * 457 / 724,
        };
        return {
          src: new URL(image.currentSrc).pathname,
          natural: [image.naturalWidth, image.naturalHeight],
          fit: getComputedStyle(image).objectFit,
          filter: getComputedStyle(image).filter,
          ratio: ink.width / ink.height,
          densityAtDpr: image.naturalWidth / ink.width / devicePixelRatio,
          inkInsideBox: visible.left >= identity.left - 1 && visible.right <= identity.right + 1
            && visible.top >= identity.top - 1 && visible.bottom <= identity.bottom + 1,
        };
      });
      expect(wordmark.src).toBe("/selected-work/logos/presaira-wordmark.png");
      expect(wordmark.natural).toEqual([2172, 724]);
      expect(wordmark.fit).toBe("contain");
      expect(wordmark.filter).toBe("none");
      expect(wordmark.ratio).toBeCloseTo(3, 3);
      expect(wordmark.densityAtDpr).toBeGreaterThanOrEqual(1);
      expect(wordmark.inkInsideBox).toBe(true);

      const opportunity = await selectSlide(carousel, 1);
      const gate = await opportunity.evaluate((root) => {
        const node = root.querySelector<HTMLElement>("[data-flow-stage='4']")!;
        const flow = root.querySelector<SVGSVGElement>("[data-artboard-node='truthFlow'] svg:not(.mobileFlow)")!;
        const ring = [...flow.querySelectorAll<SVGCircleElement>("circle[data-flow-node]")].at(-1)!;
        const nodeCenter = new DOMPoint(Number(ring.getAttribute("cx")), Number(ring.getAttribute("cy"))).matrixTransform(flow.getScreenCTM()!).x;
        const ranges = [...node.querySelectorAll<HTMLElement>("[data-gate-desktop-label], :scope > span > span")].map((line) => {
          const range = document.createRange();
          range.selectNodeContents(line);
          const rect = range.getBoundingClientRect();
          return { text: line.textContent?.trim(), lines: range.getClientRects().length, center: rect.left + rect.width / 2 };
        });
        const title = root.querySelector<HTMLElement>("[data-project-title]")!;
        const titleStyle = getComputedStyle(title);
        return {
          lines: ranges,
          nodeCenter,
          trackingRatio: Number.parseFloat(titleStyle.letterSpacing) / Number.parseFloat(titleStyle.fontSize),
          titleText: title.textContent?.replace(/\s+/g, "").trim(),
        };
      });
      expect(gate.titleText).toBe("OpportunityOS");
      expect(gate.trackingRatio).toBeGreaterThanOrEqual(0.02);
      expect(gate.trackingRatio).toBeLessThanOrEqual(0.035);
      expect(gate.lines.map(({ text }) => text)).toEqual(["AUTHORITY GATE", "SUFFICIENT EVIDENCE", "VALID AUTHORITY", "ALLOWED ACTION"]);
      expect(gate.lines.every(({ lines, center }) => lines === 1 && Math.abs(center - gate.nodeCenter) < 2)).toBe(true);

      const oil = await selectSlide(carousel, 2);
      const oilLabel = await oil.evaluate((root) => {
        const label = root.querySelector<HTMLElement>("[data-artboard-node='detectedLabel']")!;
        const contour = root.querySelector<SVGSVGElement>("[data-artboard-node='detectionContour']")!;
        const artboardRect = root.getBoundingClientRect();
        const labelRect = label.getBoundingClientRect();
        const overlayX = Number(contour.dataset.artboardX);
        const overlayY = Number(contour.dataset.artboardY);
        const labelX = Number(label.dataset.artboardX);
        const labelY = Number(label.dataset.artboardY);
        const markerEnd = new DOMPoint(614, 238).matrixTransform(contour.getScreenCTM()!);
        const renderedLabelX = (labelRect.left - artboardRect.left) / artboardRect.width * 1683;
        const renderedLabelY = (labelRect.top - artboardRect.top) / artboardRect.width * 1683;
        return { labelX, labelY, renderedLabelX, renderedLabelY, markerEndX: overlayX + 614, markerEndY: overlayY + 238, gap: labelX - (overlayX + 614), renderedGap: labelRect.left - markerEnd.x };
      });
      expect(oilLabel.labelX).toBe(1418);
      expect(oilLabel.labelY).toBe(302);
      expect(oilLabel.renderedLabelX).toBeCloseTo(1418, 0);
      expect(oilLabel.renderedLabelY).toBeCloseTo(302, 0);
      expect(oilLabel.markerEndX).toBe(1404);
      expect(oilLabel.markerEndY).toBe(338);
      expect(oilLabel.gap).toBe(14);
      expect(oilLabel.renderedGap).toBeGreaterThan(0);

      const solar = await selectSlide(carousel, 3);
      const metrics = await solar.locator("[data-artboard-node='validatedMeasures']").evaluate((row) => {
        const blocks = [...row.children] as HTMLElement[];
        const blockRects = blocks.map((block) => block.getBoundingClientRect());
        const values = blocks.map((block) => block.querySelector<HTMLElement>("b")!.getBoundingClientRect());
        const labels = blocks.map((block) => block.querySelector<HTMLElement>("strong")!);
        const labelRects = labels.map((label) => label.getBoundingClientRect());
        const labelLines = labels.map((label) => {
          const range = document.createRange();
          range.selectNodeContents(label);
          return range.getClientRects().length;
        });
        const valueStyles = blocks.map((block) => getComputedStyle(block.querySelector("b")!));
        return {
          widths: blockRects.map((rect) => rect.width),
          heights: blockRects.map((rect) => rect.height),
          valueCenterOffsets: values.map((rect, index) => Math.abs((rect.left + rect.width / 2) - (blockRects[index].left + blockRects[index].width / 2))),
          valueTops: values.map((rect) => rect.top),
          labelTops: labelRects.map((rect) => rect.top),
          labelLines,
          valueFonts: valueStyles.map((style) => [style.fontSize, style.fontWeight, style.lineHeight]),
        };
      });
      expect(Math.max(...metrics.widths) - Math.min(...metrics.widths)).toBeLessThan(1);
      expect(Math.max(...metrics.heights) - Math.min(...metrics.heights)).toBeLessThan(1);
      expect(metrics.valueCenterOffsets.every((offset) => offset < 1), JSON.stringify(metrics)).toBe(true);
      expect(Math.max(...metrics.valueTops) - Math.min(...metrics.valueTops)).toBeLessThan(1);
      expect(Math.max(...metrics.labelTops) - Math.min(...metrics.labelTops)).toBeLessThan(1);
      expect(metrics.labelLines).toEqual([1, 1, 1]);
      expect(metrics.valueFonts[0]).toEqual(metrics.valueFonts[1]);
      expect(metrics.valueFonts[1]).toEqual(metrics.valueFonts[2]);

      const ghareeb = await selectSlide(carousel, 4);
      const ghareebGeometry = await ghareeb.evaluate((root) => {
        const logo = root.querySelector<HTMLElement>("[data-artboard-node='officialLogo']")!;
        const stages = root.querySelector<HTMLElement>("[data-artboard-node='commerceJourney']")!;
        const capabilities = root.querySelector<HTMLElement>("[data-artboard-node='capabilities']")!;
        const stageCenters = [...stages.querySelectorAll<HTMLElement>("[data-stage-anchor]")].map((stage) => {
          const rect = stage.getBoundingClientRect();
          return rect.left + rect.width / 2;
        });
        const capBox = capabilities.getBoundingClientRect();
        const artboardBox = root.getBoundingClientRect();
        const labels = [...capabilities.querySelectorAll<HTMLElement>("span")];
        const separators = [...capabilities.querySelectorAll<HTMLElement>("i")];
        const firstLabel = labels[0].getBoundingClientRect();
        const lastLabel = labels.at(-1)!.getBoundingClientRect();
        const offsets = separators.map((separator, index) => {
          const dot = separator.getBoundingClientRect();
          const previous = labels[index].getBoundingClientRect();
          const next = labels[index + 1].getBoundingClientRect();
          return Math.abs(dot.left + dot.width / 2 - (previous.right + next.left) / 2);
        });
        return {
          logo: [Number(logo.dataset.artboardX), Number(logo.dataset.artboardY), Number(logo.dataset.artboardW), Number(logo.dataset.artboardH)],
          journey: [Number(stages.dataset.artboardX), Number(stages.dataset.artboardY), Number(stages.dataset.artboardW)],
          stageCenters,
          capabilityY: Number(capabilities.dataset.artboardY),
          capabilityCenterOffset: Math.abs((capBox.left + capBox.right) / 2 - (artboardBox.left + artboardBox.width / 2)),
          capabilityGroupCenterOffset: Math.abs((firstLabel.left + lastLabel.right) / 2 - (artboardBox.left + artboardBox.width / 2)),
          separatorOffsets: offsets,
          ornamentCount: root.querySelectorAll("[data-artboard-node='commerceJourney'] .ornament, [data-artboard-node='commerceJourney'] [data-stage-ornament]").length,
        };
      });
      expect(ghareebGeometry.logo).toEqual([681.5, 10, 320, 216]);
      expect(ghareebGeometry.journey).toEqual([281.5, 595, 1120]);
      const stepSizes = ghareebGeometry.stageCenters.slice(1).map((center, index) => center - ghareebGeometry.stageCenters[index]);
      expect(Math.max(...stepSizes) - Math.min(...stepSizes)).toBeLessThan(1);
      expect(ghareebGeometry.capabilityY).toBe(787);
      expect(ghareebGeometry.capabilityCenterOffset).toBeLessThan(1);
      expect(ghareebGeometry.capabilityGroupCenterOffset).toBeLessThan(1);
      expect(ghareebGeometry.separatorOffsets.every((offset) => offset < 1)).toBe(true);
      expect(ghareebGeometry.ornamentCount).toBe(0);
    }
  });

  test("Makhbazy actions align to connector centers, with slightly enlarged secondary utilities", async ({ page }) => {
    const carousel = await openSelectedWork(page);
    const board = await selectSlide(carousel, 5);
    const geometry = await board.locator("[data-artboard-node='journeyAbstraction']").evaluate((journey) => {
      const svg = journey.querySelector<SVGSVGElement>("[data-action-connector]")!;
      const path = svg.querySelector<SVGPathElement>("path")!;
      const nodes = [...svg.querySelectorAll<SVGCircleElement>("circle[data-action-node]")];
      const controls = [...journey.querySelectorAll<SVGSVGElement>("[data-stage-anchor] > svg")].filter((control) => control.getClientRects().length > 0);
      const labels = [...journey.querySelectorAll<HTMLElement>("[data-stage-anchor] > span")].filter((label) => label.getClientRects().length > 0);
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

  test("Makhbazy desktop statement preserves the approved layout in three lines", async ({ page }) => {
    const carousel = await openSelectedWork(page);
    const board = await selectSlide(carousel, 5);
    const statement = board.locator("[data-artboard-node='productStatement']");
    await expect(statement).toHaveAccessibleName("Designing the whole journey with customer experience in mind, not isolated screens.");
    const layout = await statement.evaluate((element) => {
      const visibleContent = [...element.children].filter((child) => getComputedStyle(child).display !== "none");
      const lineElements = visibleContent.flatMap((content) =>
        content.children.length ? [...content.children] : [content],
      ).filter((line) => line.getClientRects().length > 0);
      const lineTops = new Set(lineElements.map((line) => Math.round(line.getBoundingClientRect().top)));
      return { visualLines: lineTops.size, text: (element as HTMLElement).innerText.replace(/\s+/g, " ").trim() };
    });
    expect(layout).toEqual({ visualLines: 3, text: "Designing the whole journey with customer experience in mind, not isolated screens." });
  });

  test("Oil Spill artboard matches the final expected desktop capture", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    const carousel = await openSelectedWork(page);
    const board = await selectSlide(carousel, 2);
    await expect(board).toHaveScreenshot("oil-spill-1440.png", { maxDiffPixelRatio: 0.025 });
  });
});
