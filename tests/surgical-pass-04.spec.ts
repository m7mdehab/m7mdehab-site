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
        const duration = parseFloat(
          getComputedStyle(
            document.querySelector<HTMLElement>(".credibility-track")!,
          ).getPropertyValue("--credibility-loop-duration"),
        );
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
          duration,
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
      expect(metrics.duration).toBeCloseTo(metrics.loopWidth / 52, 2);
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

  test("uses responsive measured speed and advances at the configured mobile rate", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const track = page.locator(".credibility-track");
    await expect(track).toHaveAttribute("data-loop-ready", "true");
    const movement = await track.evaluate(async (node) => {
      const element = node as HTMLElement;
      const animation = element.getAnimations()[0];
      if (!animation) throw new Error("Measured marquee animation is missing");
      animation.pause();
      const translationAt = async (time: number) => {
        animation.currentTime = time;
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        return new DOMMatrixReadOnly(getComputedStyle(element).transform).m41;
      };
      return {
        t0: await translationAt(0),
        t5: await translationAt(5000),
        t10: await translationAt(10000),
      };
    });
    expect(movement.t0).toBeCloseTo(0, 0);
    expect(movement.t5 - movement.t0).toBeCloseTo(-260, 0);
    expect(movement.t10 - movement.t0).toBeCloseTo(-520, 0);
    expect(Math.abs(movement.t10 - movement.t0) / 173).toBeGreaterThanOrEqual(
      2.8,
    );

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
      const geometry = await page.locator(".credibility-track").evaluate(async (node) => {
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
        const animation = track.getAnimations()[0];
        if (!animation) throw new Error("Measured marquee animation is missing");
        animation.pause();
        animation.currentTime = 0;
        const durationMs =
          parseFloat(style.getPropertyValue("--credibility-loop-duration")) *
          1000;
        const translationAt = async (fraction: number) => {
          animation.currentTime = durationMs * fraction;
          await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
          return new DOMMatrixReadOnly(getComputedStyle(track).transform).m41;
        };
        return {
          loopWidth: width,
          duration: durationMs / 1000,
          trackWidth: track.getBoundingClientRect().width,
          viewportWidth: viewport.getBoundingClientRect().width,
          gap,
          seamGap:
            sequenceItems[1][0].getBoundingClientRect().left -
            sequenceItems[0][sequenceItems[0].length - 1].getBoundingClientRect()
              .right,
          phase40: await translationAt(0.4),
          phase99: await translationAt(0.99),
          phase140: await translationAt(1.4),
        };
      });
      const speed = Number(expectedSpeed);
      expect(geometry.duration).toBeCloseTo(geometry.loopWidth / speed, 2);
      expect(geometry.trackWidth - geometry.loopWidth).toBeGreaterThanOrEqual(
        geometry.viewportWidth,
      );
      expect(geometry.seamGap).toBeCloseTo(geometry.gap, 1);
      expect(geometry.phase40).toBeCloseTo(-geometry.loopWidth * 0.4, 0);
      expect(geometry.phase99).toBeCloseTo(-geometry.loopWidth * 0.99, 0);
      expect(geometry.phase140).toBeCloseTo(geometry.phase40, 0);
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
      expect(result.letterSpacing).toBeCloseTo(-result.fontSize * 0.015, 2);
      expect(result.wordSpacing).toBeCloseTo(result.fontSize * 0.06, 2);
      expect(result.signatureClipPath).toBe("inset(0px 0% 0px 0px)");
      expect(result.secondSpanGap).toBeGreaterThan(0);
      measurements.push({ width, ...result });
    }
    expect(measurements).toHaveLength(7);
  });
});
