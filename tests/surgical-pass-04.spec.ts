import { expect, test } from "@playwright/test";

test.describe("Surgical pass 04 mobile micro-polish", () => {
  test("uses the supplied native Network asset without stretching and keeps it within a 2x source density", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto("/");
    const logo = page
      .locator('.credibility-brand-item[data-brand-card="network"] img')
      .first();
    await expect(logo).toBeVisible();
    const metrics = await logo.evaluate(async (node) => {
      const image = node as HTMLImageElement;
      await image.decode();
      const rect = image.getBoundingClientRect();
      const style = getComputedStyle(image);
      return {
        src: image.currentSrc,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        renderedWidth: rect.width,
        renderedHeight: rect.height,
        intrinsicToRendered: image.naturalWidth / rect.width,
        naturalRatio: image.naturalWidth / image.naturalHeight,
        renderedRatio: rect.width / rect.height,
        objectFit: style.objectFit,
        width: style.width,
        height: style.height,
        devicePixelRatio: window.devicePixelRatio,
      };
    });

    expect(metrics.src).toContain("data:image/webp");
    expect(metrics.naturalWidth).toBe(140);
    expect(metrics.naturalHeight).toBe(32);
    expect(metrics.renderedWidth).toBeLessThanOrEqual(70.5);
    expect(metrics.intrinsicToRendered).toBeGreaterThanOrEqual(1.98);
    expect(Math.abs(metrics.naturalRatio - metrics.renderedRatio)).toBeLessThan(
      0.03,
    );
    expect(metrics.objectFit).toBe("contain");
    expect(metrics.devicePixelRatio).toBe(2);
    await context.close();
  });

  test("keeps mobile rail dense, aligned, caption-safe, and faster across viewport widths", async ({
    page,
  }) => {
    for (const width of [320, 390, 430]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      const rail = page.locator(".credibility-viewport");
      await expect(rail).toHaveAttribute("data-loop-speed", "52");
      await expect(page.locator(".credibility-track")).toHaveAttribute(
        "data-loop-ready",
        "true",
      );

      const metrics = await page.evaluate(() => {
        const viewport = document.querySelector<HTMLElement>(
          ".credibility-viewport",
        )!;
        const items = [
          ...document.querySelectorAll<HTMLElement>(
            '.credibility-sequence:not([aria-hidden="true"]) .credibility-brand-item',
          ),
        ].slice(0, 9);
        const byBrand = (brand: string) =>
          items.find((item) => item.dataset.brandCard === brand)!;
        const first = items[0];
        const firstImage = first.querySelector("img")!;
        const logoSizeStyle = getComputedStyle(
          items[1].querySelector(".brand-logo")!,
        );
        const stage = first.querySelector<HTMLElement>(
          ".credibility-logo-stage",
        )!;
        const caption = first.querySelector<HTMLElement>(
          ".relationship-caption strong",
        )!;
        const gap = parseFloat(
          getComputedStyle(viewport).getPropertyValue(
            "--credibility-item-gap",
          ),
        );
        const loopWidth = Number(viewport.dataset.loopWidth);
        const group = document.querySelector<HTMLElement>(
          ".credibility-logo-sequence:not([aria-hidden='true'])",
        )!;
        const groupItems = [...group.querySelectorAll<HTMLElement>(
          ".credibility-brand-item",
        )].slice(0, 9);
        const itemRects = groupItems.map((item) => item.getBoundingClientRect());
        const viewportRect = viewport.getBoundingClientRect();
        const visibleEquivalent = itemRects.reduce((total, rect) => {
          const visible = Math.max(
            0,
            Math.min(rect.right, viewportRect.right) -
              Math.max(rect.left, viewportRect.left),
          );
          return total + visible / rect.width;
        }, 0);
        const longCaptions = [byBrand("orcas"), byBrand("cic")].map(
          (item) => ({
            brand: item.dataset.brandCard,
            width: item.getBoundingClientRect().width,
            captionWidth: item.querySelector("strong")!.clientWidth,
            captionScrollWidth: item.querySelector("strong")!.scrollWidth,
          }),
        );
        return {
          defaultItemWidth: first.getBoundingClientRect().width,
          gap,
          speed: Number(viewport.dataset.loopSpeed),
          loopWidth,
          logoMaxWidth: parseFloat(logoSizeStyle.maxWidth),
          logoMaxHeight: parseFloat(logoSizeStyle.maxHeight),
          logoRenderedWidth: firstImage.getBoundingClientRect().width,
          stageHeight: stage.getBoundingClientRect().height,
          captionFontSize: parseFloat(getComputedStyle(caption).fontSize),
          captionTop: caption.getBoundingClientRect().top,
          itemCaptionTops: items.map(
            (item) =>
              item.querySelector(".relationship-caption")!.getBoundingClientRect()
                .top,
          ),
          visibleEquivalent,
          longCaptions,
        };
      });

      expect(metrics.defaultItemWidth).toBe(160);
      expect(metrics.gap).toBe(9);
      expect(metrics.speed).toBe(52);
      expect(metrics.loopWidth).toBeGreaterThan(0);
      expect(metrics.logoMaxWidth).toBeLessThanOrEqual(114);
      expect(metrics.logoMaxHeight).toBeLessThanOrEqual(29);
      expect(metrics.logoRenderedWidth).toBeLessThanOrEqual(70.5);
      expect(metrics.stageHeight).toBe(40);
      expect(metrics.captionFontSize).toBe(8);
      expect(Math.max(...metrics.itemCaptionTops) - Math.min(...metrics.itemCaptionTops)).toBeLessThanOrEqual(1);
      for (const item of metrics.longCaptions) {
        expect(item.width).toBeCloseTo(180, 1);
        expect(item.captionScrollWidth).toBeLessThanOrEqual(item.captionWidth);
      }
      if (width === 390) {
        expect(metrics.visibleEquivalent).toBeGreaterThanOrEqual(2.25);
        expect(metrics.visibleEquivalent).toBeLessThanOrEqual(2.7);
      }
    }
  });

  test("uses responsive scrollLeft autoplay at the accepted desktop and mobile speeds", async ({
    page,
  }) => {
    for (const [width, speed] of [[390, 52], [1440, 30]] as const) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      const viewport = page.locator(".credibility-viewport");
      const track = page.locator(".credibility-track");
      await expect(track).toHaveAttribute("data-loop-ready", "true");
      await viewport.scrollIntoViewIfNeeded();
      await page.mouse.move(0, 0);
      const initial = await viewport.evaluate((node) => {
        const groupWidth = Number(node.dataset.loopWidth);
        node.scrollLeft = groupWidth + 100;
        return { scrollLeft: node.scrollLeft, timestamp: performance.now() };
      });
      await page.waitForTimeout(5000);
      const final = await viewport.evaluate((node) => ({
        scrollLeft: node.scrollLeft,
        timestamp: performance.now(),
      }));
      const elapsedSeconds = (final.timestamp - initial.timestamp) / 1000;
      const measuredSpeed =
        (final.scrollLeft - initial.scrollLeft) / elapsedSeconds;
      expect(measuredSpeed).toBeGreaterThan(speed - 2);
      expect(measuredSpeed).toBeLessThan(speed + 2);
      await expect(viewport).toHaveAttribute("data-loop-speed", String(speed));
      await expect(track).toHaveCSS("animation-name", "none");
      await expect(track).toHaveCSS("transform", "none");
    }

    for (const width of [700, 701, 390, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(100);
      const expectedSpeed = width <= 700 ? "52" : "30";
      await expect(page.locator(".credibility-viewport")).toHaveAttribute(
        "data-loop-speed",
        expectedSpeed,
      );
      await expect(page.locator(".credibility-track")).toHaveAttribute(
        "data-loop-ready",
        "true",
      );
      const geometry = await page.locator(".credibility-track").evaluate((node) => {
        const track = node as HTMLElement;
        const style = getComputedStyle(track);
        const viewport = document.querySelector<HTMLElement>(
          ".credibility-viewport",
        )!;
        const width = Number(viewport.dataset.loopWidth);
        const sequences = [
          ...track.querySelectorAll<HTMLElement>(".credibility-logo-sequence"),
        ];
        const sequenceItems = sequences.map((sequence) => [
          ...sequence.querySelectorAll<HTMLElement>(".credibility-brand-item"),
        ]);
        const gap = parseFloat(
          getComputedStyle(viewport).getPropertyValue(
            "--credibility-item-gap",
          ),
        );
        return {
          loopWidth: width,
          trackWidth: track.getBoundingClientRect().width,
          viewportWidth: viewport.getBoundingClientRect().width,
          gap,
          groupWidths: sequences.map((sequence) =>
            sequence.getBoundingClientRect().width,
          ),
          seamGaps: [0, 1].map((index) => {
            const priorItems = sequenceItems[index];
            const nextItems = sequenceItems[index + 1];
            return (
              nextItems[0].getBoundingClientRect().left -
              priorItems[priorItems.length - 1].getBoundingClientRect().right
            );
          }),
          animation: style.animationName,
          transform: style.transform,
        };
      });
      expect(geometry.groupWidths).toHaveLength(3);
      expect(geometry.groupWidths[0]).toBeGreaterThanOrEqual(
        geometry.viewportWidth * 1.2,
      );
      expect(geometry.groupWidths[1]).toBeCloseTo(geometry.groupWidths[0], 1);
      expect(geometry.groupWidths[2]).toBeCloseTo(geometry.groupWidths[0], 1);
      expect(geometry.trackWidth).toBeCloseTo(geometry.groupWidths[0] * 3, 0);
      expect(geometry.seamGaps[0]).toBeCloseTo(geometry.gap, 1);
      expect(geometry.seamGaps[1]).toBeCloseTo(geometry.gap, 1);
      expect(geometry.animation).toBe("none");
      expect(geometry.transform).toBe("none");
    }
  });

  test("keeps the mobile signature on one line with relaxed tracking at supported widths", async ({
    page,
  }) => {
    const measurements = [];
    for (const width of [320, 360, 375, 390, 412, 430, 480]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.waitForTimeout(1800);
      const result = await page.locator(".overhaul-hero-title").evaluate((title) => {
        const titleNode = title as HTMLElement;
        const signature = titleNode.querySelector<HTMLElement>(
          ".overhaul-hero-signature",
        )!;
        const spans = [...signature.children] as HTMLElement[];
        const rects = spans.map((span) => span.getBoundingClientRect());
        const titleStyle = getComputedStyle(titleNode);
        const signatureStyle = getComputedStyle(signature);
        return {
        fontSize: parseFloat(titleStyle.fontSize),
        letterSpacing: parseFloat(titleStyle.letterSpacing),
        wordSpacing: parseFloat(titleStyle.wordSpacing),
          renderedWidth: signature.getBoundingClientRect().width,
          containerWidth: titleNode.clientWidth,
          scrollWidth: titleNode.scrollWidth,
          lineCount: new Set(rects.map((rect) => Math.round(rect.top))).size,
          secondSpanGap: rects[1].left - rects[0].right,
          signatureClipPath: signatureStyle.clipPath,
        };
      });
      expect(result.lineCount).toBe(1);
      expect(result.renderedWidth).toBeLessThanOrEqual(result.containerWidth);
      expect(result.scrollWidth).toBeLessThanOrEqual(result.containerWidth);
      expect(result.letterSpacing).toBeCloseTo(-result.fontSize * 0.005, 2);
      expect(result.wordSpacing).toBeCloseTo(result.fontSize * 0.08, 2);
      expect(result.signatureClipPath).toContain("inset(-");
      expect(result.secondSpanGap).toBeGreaterThan(0);
      measurements.push({ width, ...result });
    }
    expect(measurements).toHaveLength(7);
  });
});
