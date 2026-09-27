import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";

const evidenceDirectory = path.resolve(
  process.cwd(),
  "../../outputs/hero-credibility-pass-05",
);

async function waitForLoop(page: import("@playwright/test").Page) {
  await expect(page.locator(".credibility-track")).toHaveAttribute(
    "data-loop-ready",
    "true",
  );
  await page.evaluate(() => document.fonts.ready);
}

test.describe("Surgical pass 05 interaction polish", () => {
  test("keeps the signature on one line with relaxed spacing and an expanded reveal at every phone width", async ({
    page,
  }) => {
    for (const width of [320, 360, 375, 390, 412, 430, 480]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await page.waitForTimeout(1800);
      const metrics = await page.locator(".overhaul-hero-title").evaluate((title) => {
        const heading = title as HTMLElement;
        const signature = heading.querySelector<HTMLElement>(
          ".overhaul-hero-signature",
        )!;
        const spans = [...signature.children] as HTMLElement[];
        const titleStyle = getComputedStyle(heading);
        const signatureStyle = getComputedStyle(signature);
        return {
          fontSize: parseFloat(titleStyle.fontSize),
          letterSpacing: parseFloat(titleStyle.letterSpacing),
          wordSpacing: parseFloat(titleStyle.wordSpacing),
          spanGap: parseFloat(getComputedStyle(spans[1]).marginInlineStart),
          renderedWidth: signature.getBoundingClientRect().width,
          containerWidth: heading.clientWidth,
          lineCount: new Set(
            spans.map((span) => Math.round(span.getBoundingClientRect().top)),
          ).size,
          clipPath: signatureStyle.clipPath,
        };
      });

      expect(metrics.lineCount, `${width}px line count`).toBe(1);
      expect(metrics.renderedWidth, `${width}px signature fit`).toBeLessThanOrEqual(
        metrics.containerWidth,
      );
      expect(metrics.letterSpacing).toBeCloseTo(-metrics.fontSize * 0.005, 2);
      expect(metrics.wordSpacing).toBeCloseTo(metrics.fontSize * 0.08, 2);
      expect(metrics.spanGap).toBeCloseTo(metrics.fontSize * 0.08, 2);
      expect(metrics.clipPath).toContain("inset(-");
    }
  });

  test("captures matched final-y clip and no-clip comparisons at 390 and 1440", async ({
    page,
  }) => {
    await mkdir(evidenceDirectory, { recursive: true });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/");
      await page.waitForTimeout(1800);
      const signature = page.locator(
        ".overhaul-hero-title > .overhaul-hero-signature",
      );
      const before = await signature.boundingBox();
      const heading = await page.locator(".overhaul-hero-title").boundingBox();
      expect(before).not.toBeNull();
      expect(heading).not.toBeNull();
      const crop = {
        x: Math.max(0, Math.floor(before!.x - 14)),
        y: Math.max(0, Math.floor(before!.y - 24)),
        width: Math.min(
          width - Math.max(0, Math.floor(before!.x - 14)),
          Math.ceil(before!.width + 28),
        ),
        height: Math.ceil(before!.height + 60),
      };
      await page.screenshot({
        path: path.join(evidenceDirectory, `signature-y-${width}-expanded-clip.png`),
        clip: crop,
        animations: "disabled",
      });

      const legacy = await signature.evaluate((node) => {
        const element = node as HTMLElement;
        const headingNode = element.closest<HTMLElement>(".overhaul-hero-title")!;
        const titleStyle = getComputedStyle(headingNode);
        const rect = element.getBoundingClientRect();
        const oldVisibility = element.style.visibility;
        const copy = element.cloneNode(true) as HTMLElement;
        copy.dataset.signatureDiagnostic = "legacy-border-clip";
        Object.assign(copy.style, {
          position: "fixed",
          left: `${rect.left}px`,
          top: `${rect.top}px`,
          zIndex: "2147483001",
          display: "inline-block",
          width: "max-content",
          maxWidth: "none",
          whiteSpace: "nowrap",
          overflow: "visible",
          clipPath: "inset(0px)",
          animation: "none",
          color: titleStyle.color,
          fontFamily: titleStyle.fontFamily,
          fontSize: titleStyle.fontSize,
          fontWeight: titleStyle.fontWeight,
          lineHeight: titleStyle.lineHeight,
          letterSpacing: titleStyle.letterSpacing,
          wordSpacing: titleStyle.wordSpacing,
        });
        element.style.visibility = "hidden";
        document.body.append(copy);
        return oldVisibility;
      });
      await page.screenshot({
        path: path.join(evidenceDirectory, `signature-y-${width}-legacy-clip.png`),
        clip: crop,
        animations: "disabled",
      });

      await page.locator('[data-signature-diagnostic="legacy-border-clip"]').evaluate((node) => {
        const element = node as HTMLElement;
        element.style.clipPath = "none";
      });
      await page.screenshot({
        path: path.join(evidenceDirectory, `signature-y-${width}-diagnostic-no-clip.png`),
        clip: crop,
        animations: "disabled",
      });
      await signature.evaluate((node, oldVisibility) => {
        (node as HTMLElement).style.visibility = oldVisibility;
        document
          .querySelector('[data-signature-diagnostic="legacy-border-clip"]')
          ?.remove();
      }, legacy);

      const final = await signature.boundingBox();
      expect(final?.width).toBeCloseTo(before!.width, 1);
      expect(final?.height).toBeCloseTo(before!.height, 1);
      expect(heading!.width).toBeGreaterThan(0);
    }
  });

  test("floats most visible ambient objects independently on mobile and desktop and stops under reduced motion", async ({
    page,
  }) => {
    await mkdir(evidenceDirectory, { recursive: true });
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/");
      await page.mouse.move(width - 2, 998);
      await page.waitForTimeout(300);
      const initial = await page.evaluate(() => {
        const field = document.querySelector<HTMLElement>(
          ".overhaul-hero > .hero-ambient-field",
        )!;
        const visible = [
          ...field.querySelectorAll<HTMLElement>("[data-ambient-item]"),
        ].filter((item) => getComputedStyle(item).display !== "none");
        const animated = visible
          .map((item) => item.querySelector<HTMLElement>(".hero-ambient-orbit")!)
          .filter((orbit) => getComputedStyle(orbit).animationName !== "none");
        const sample = animated.slice(0, 6);
        return {
          visibleCount: visible.length,
          animatedCount: animated.length,
          names: sample.map((orbit) => getComputedStyle(orbit).animationName),
          durations: sample.map((orbit) =>
            parseFloat(getComputedStyle(orbit).animationDuration),
          ),
          centers: sample.map((orbit) => {
            const rect = orbit.getBoundingClientRect();
            return [rect.left + rect.width / 2, rect.top + rect.height / 2];
          }),
        };
      });
      expect(initial.visibleCount).toBeGreaterThanOrEqual(20);
      expect(initial.animatedCount / initial.visibleCount).toBeGreaterThanOrEqual(
        0.65,
      );
      expect(initial.animatedCount / initial.visibleCount).toBeLessThanOrEqual(
        0.8,
      );
      expect(new Set(initial.names).size).toBe(3);
      expect(
        initial.durations.every((duration) =>
          width <= 700
            ? duration >= 8 && duration <= 16
            : duration >= 9 && duration <= 18,
        ),
      ).toBe(true);
      await page.screenshot({
        path: path.join(evidenceDirectory, `ambient-${width}-t0.png`),
        animations: "allow",
      });

      await page.waitForTimeout(2000);
      const atTwo = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>(
          ".overhaul-hero > .hero-ambient-field .hero-ambient-orbit",
        )]
          .filter((orbit) => getComputedStyle(orbit).animationName !== "none")
          .slice(0, 6)
          .map((orbit) => {
            const rect = orbit.getBoundingClientRect();
            return [rect.left + rect.width / 2, rect.top + rect.height / 2];
          }),
      );
      await page.screenshot({
        path: path.join(evidenceDirectory, `ambient-${width}-t2.png`),
        animations: "allow",
      });
      await page.waitForTimeout(2000);
      const atFour = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>(
          ".overhaul-hero > .hero-ambient-field .hero-ambient-orbit",
        )]
          .filter((orbit) => getComputedStyle(orbit).animationName !== "none")
          .slice(0, 6)
          .map((orbit) => {
            const rect = orbit.getBoundingClientRect();
            return [rect.left + rect.width / 2, rect.top + rect.height / 2];
          }),
      );
      await page.screenshot({
        path: path.join(evidenceDirectory, `ambient-${width}-t4.png`),
        animations: "allow",
      });
      const movement = initial.centers.map((origin, index) => {
        const distance = (point: number[]) =>
          Math.hypot(point[0] - origin[0], point[1] - origin[1]);
        return Math.max(distance(atTwo[index]), distance(atFour[index]));
      });
      expect(movement.filter((distance) => distance >= 3).length).toBeGreaterThanOrEqual(
        4,
      );
      expect(Math.max(...movement)).toBeLessThan(40);
    }

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    const animations = await page
      .locator(".overhaul-hero > .hero-ambient-field .hero-ambient-orbit")
      .evaluateAll((nodes) =>
        nodes.map((node) => getComputedStyle(node).animationName),
      );
    expect(animations.every((name) => name === "none")).toBe(true);
  });

  test("keeps three scroll groups aligned and recenters silently in both directions", async ({
    page,
  }) => {
    for (const width of [390, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto("/");
      await waitForLoop(page);
      const result = await page.locator(".credibility-viewport").evaluate((node) => {
        const viewport = node as HTMLElement;
        const track = viewport.querySelector<HTMLElement>(".credibility-track")!;
        const groups = [
          ...track.querySelectorAll<HTMLElement>(".credibility-sequence"),
        ];
        const groupWidth = Number(viewport.dataset.loopWidth);
        const gap = parseFloat(
          getComputedStyle(viewport).getPropertyValue("--credibility-item-gap"),
        );
        const visibleNames = () => {
          const bounds = viewport.getBoundingClientRect();
          return [...track.querySelectorAll<HTMLElement>(".credibility-brand-item")]
            .filter((item) => {
              const rect = item.getBoundingClientRect();
              return rect.right > bounds.left + 1 && rect.left < bounds.right - 1;
            })
            .map((item) => item.dataset.organization);
        };
        const seams = [0, 1].map((index) => {
          const previousItems = [
            ...groups[index].querySelectorAll<HTMLElement>(".credibility-brand-item"),
          ];
          const nextFirst = groups[index + 1].querySelector<HTMLElement>(
            ".credibility-brand-item",
          )!;
          return (
            nextFirst.getBoundingClientRect().left -
            previousItems[previousItems.length - 1].getBoundingClientRect().right
          );
        });
        const normalize = (position: number) => {
          viewport.scrollLeft = position;
          const before = visibleNames();
          viewport.dispatchEvent(new Event("scroll"));
          return { after: viewport.scrollLeft, before, afterNames: visibleNames() };
        };
        const right = normalize(groupWidth * 2 + 40);
        const left = normalize(groupWidth - 40);
        const rects = [...track.querySelectorAll<HTMLElement>(".credibility-brand-item")]
          .map((item) => item.getBoundingClientRect())
          .filter((rect) => rect.right > viewport.getBoundingClientRect().left && rect.left < viewport.getBoundingClientRect().right)
          .map((rect) => ({ left: rect.left, right: rect.right }))
          .sort((a, b) => a.left - b.left);
        let maxGap = rects.length ? rects[0].left - viewport.getBoundingClientRect().left : viewport.clientWidth;
        let edge = rects.length ? rects[0].right : 0;
        for (const rect of rects.slice(1)) {
          maxGap = Math.max(maxGap, rect.left - edge);
          edge = Math.max(edge, rect.right);
        }
        maxGap = Math.max(maxGap, viewport.getBoundingClientRect().right - edge);
        return {
          groupWidth,
          viewportWidth: viewport.clientWidth,
          trackWidth: track.scrollWidth,
          groups: groups.length,
          groupWidths: groups.map((group) => group.getBoundingClientRect().width),
          seams,
          gap,
          right,
          left,
          maxGap,
          documentOverflow:
            document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });

      expect(result.groups).toBe(3);
      expect(result.groupWidth).toBeGreaterThanOrEqual(result.viewportWidth * 1.2);
      expect(result.groupWidths[1]).toBeCloseTo(result.groupWidth, 1);
      expect(result.groupWidths[2]).toBeCloseTo(result.groupWidth, 1);
      expect(result.trackWidth).toBeCloseTo(result.groupWidth * 3, 0);
      expect(result.seams[0]).toBeCloseTo(result.gap, 1);
      expect(result.seams[1]).toBeCloseTo(result.gap, 1);
      expect(result.right.after).toBeCloseTo(result.groupWidth + 40, 0);
      expect(result.right.before).toEqual(result.right.afterNames);
      expect(result.left.after).toBeCloseTo(result.groupWidth * 2 - 40, 0);
      expect(result.left.before).toEqual(result.left.afterNames);
      expect(result.maxGap).toBeLessThanOrEqual(result.gap + 1);
      expect(result.documentOverflow).toBeLessThanOrEqual(1);
    }
  });

  test("pauses on desktop hover and focus, supports drag and trackpad, then resumes in place", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    await waitForLoop(page);
    const viewport = page.locator(".credibility-viewport");
    await viewport.scrollIntoViewIfNeeded();
    const rect = await viewport.boundingBox();
    expect(rect).not.toBeNull();
    await page.mouse.move(0, 0);
    const groupWidth = Number(await viewport.getAttribute("data-loop-width"));
    await viewport.evaluate((node, width) => {
      node.scrollLeft = width + 100;
    }, groupWidth);

    await page.mouse.move(rect!.x + 220, rect!.y + rect!.height / 2);
    await page.waitForTimeout(120);
    const hoverStart = await viewport.evaluate((node) => node.scrollLeft);
    await page.waitForTimeout(800);
    const hoverEnd = await viewport.evaluate((node) => node.scrollLeft);
    expect(Math.abs(hoverEnd - hoverStart)).toBeLessThanOrEqual(1);

    const dragX = rect!.x + 500;
    const dragY = rect!.y + rect!.height / 2;
    await page.mouse.move(dragX, dragY);
    const beforeDrag = await viewport.evaluate((node) => node.scrollLeft);
    await page.mouse.down();
    await page.mouse.move(dragX - 200, dragY, { steps: 8 });
    await page.mouse.up();
    const afterDrag = await viewport.evaluate((node) => node.scrollLeft);
    expect(afterDrag - beforeDrag).toBeCloseTo(200, 0);
    await expect(viewport).not.toHaveAttribute("data-dragging", "true");
    await page.waitForTimeout(500);
    expect(
      Math.abs((await viewport.evaluate((node) => node.scrollLeft)) - afterDrag),
    ).toBeLessThanOrEqual(1);

    await page.mouse.move(0, 0);
    await page.waitForTimeout(700);
    const afterResume = await viewport.evaluate((node) => node.scrollLeft);
    expect(afterResume - afterDrag).toBeGreaterThan(12);
    expect(afterResume - afterDrag).toBeLessThan(35);

    await page.mouse.move(rect!.x + 240, rect!.y + rect!.height / 2);
    await page.mouse.wheel(260, 0);
    await page.waitForTimeout(100);
    const afterWheel = await viewport.evaluate((node) => node.scrollLeft);
    expect(afterWheel - afterResume).toBeGreaterThan(100);
    await page.mouse.move(0, 0);
    await page.waitForTimeout(900);
    const afterWheelResume = await viewport.evaluate((node) => node.scrollLeft);
    expect(afterWheelResume - afterWheel).toBeGreaterThan(5);

    await viewport.focus();
    await page.waitForTimeout(100);
    const focusStart = await viewport.evaluate((node) => node.scrollLeft);
    await page.waitForTimeout(700);
    const focusEnd = await viewport.evaluate((node) => node.scrollLeft);
    expect(Math.abs(focusEnd - focusStart)).toBeLessThanOrEqual(1);
    await viewport.evaluate((node) => node.blur());
    await page.waitForTimeout(100);
    const blurStart = await viewport.evaluate((node) => node.scrollLeft);
    await page.waitForTimeout(650);
    expect(
      (await viewport.evaluate((node) => node.scrollLeft)) - blurStart,
    ).toBeGreaterThan(10);
  });

  test("supports native mobile touch scroll, waits for idle, and resumes without resetting", async ({
    browser,
  }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
      deviceScaleFactor: 2,
    });
    const page = await context.newPage();
    await page.goto("/");
    await waitForLoop(page);
    const viewport = page.locator(".credibility-viewport");
    await viewport.scrollIntoViewIfNeeded();
    const rect = await viewport.boundingBox();
    expect(rect).not.toBeNull();
    const groupWidth = Number(await viewport.getAttribute("data-loop-width"));
    await viewport.evaluate((node, width) => {
      node.scrollLeft = width + 100;
    }, groupWidth);
    await page.waitForTimeout(600);
    const autoStart = await viewport.evaluate((node) => node.scrollLeft);
    await page.waitForTimeout(600);
    const autoAdvanced = await viewport.evaluate((node) => node.scrollLeft);
    expect(autoAdvanced - autoStart).toBeGreaterThan(15);

    const cdp = await context.newCDPSession(page);
    await cdp.send("Emulation.setTouchEmulationEnabled", {
      enabled: true,
      maxTouchPoints: 1,
    });
    const x = rect!.x + rect!.width * 0.7;
    const y = rect!.y + rect!.height / 2;
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [{ x, y, radiusX: 8, radiusY: 8, force: 1, id: 1 }],
    });
    for (const offset of [45, 95, 150, 210]) {
      await cdp.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: x - offset, y, radiusX: 8, radiusY: 8, force: 1, id: 1 }],
      });
      await page.waitForTimeout(35);
    }
    const manuallyScrolled = await viewport.evaluate((node) => node.scrollLeft);
    await cdp.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    expect(manuallyScrolled - autoAdvanced).toBeGreaterThan(120);
    await page.waitForTimeout(300);
    const duringInertia = await viewport.evaluate((node) => node.scrollLeft);
    await page.waitForTimeout(500);
    const afterIdle = await viewport.evaluate((node) => node.scrollLeft);
    expect(afterIdle - duringInertia).toBeGreaterThan(5);
    expect(afterIdle - manuallyScrolled).toBeGreaterThan(5);
    await context.close();
  });

  test("shows tooltips on canonical and visual clone items, while clones stay out of keyboard order", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    await waitForLoop(page);
    const viewport = page.locator(".credibility-viewport");
    const groupWidth = Number(await viewport.getAttribute("data-loop-width"));
    await viewport.evaluate((node, width) => {
      node.scrollLeft = width * 1.5;
    }, groupWidth);

    const canonical = page
      .locator('.credibility-sequence[data-logical-group="canonical"] .credibility-brand-item')
      .nth(5);
    await canonical.hover();
    const canonicalName = await canonical.getAttribute("data-organization");
    await expect(page.getByRole("tooltip")).toHaveText(canonicalName!);

    const clone = page
      .locator('.credibility-sequence[aria-hidden="true"]')
      .last()
      .locator(".credibility-brand-item")
      .first();
    expect(await clone.getAttribute("tabindex")).toBe("-1");
    await clone.hover();
    await expect(page.getByRole("tooltip")).toHaveText("Network International");
    await expect(clone.locator("img").first()).toBeVisible();
  });

  test("pauses while hidden or substantially offscreen and preserves relative position on resize", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto("/");
    await waitForLoop(page);
    const viewport = page.locator(".credibility-viewport");
    await viewport.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    const groupWidth = Number(await viewport.getAttribute("data-loop-width"));
    await viewport.evaluate((node, width) => {
      node.scrollLeft = width * 1.4;
    }, groupWidth);
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        value: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.waitForTimeout(650);
    const hiddenStart = await viewport.evaluate((node) => node.scrollLeft);
    await page.waitForTimeout(650);
    const hiddenEnd = await viewport.evaluate((node) => node.scrollLeft);
    expect(Math.abs(hiddenEnd - hiddenStart)).toBeLessThanOrEqual(1);
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        value: false,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.waitForTimeout(650);
    expect(
      (await viewport.evaluate((node) => node.scrollLeft)) - hiddenEnd,
    ).toBeGreaterThan(15);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    const offscreenStart = await viewport.evaluate((node) => node.scrollLeft);
    await page.waitForTimeout(650);
    const offscreenEnd = await viewport.evaluate((node) => node.scrollLeft);
    expect(Math.abs(offscreenEnd - offscreenStart)).toBeLessThanOrEqual(1);
    await viewport.scrollIntoViewIfNeeded();
    await page.waitForTimeout(650);
    expect(
      (await viewport.evaluate((node) => node.scrollLeft)) - offscreenEnd,
    ).toBeGreaterThan(15);

    const oldWidth = Number(await viewport.getAttribute("data-loop-width"));
    const priorProgress = await viewport.evaluate((node, width) => {
      const fraction = 0.37;
      node.scrollLeft = width * (1 + fraction);
      return ((node.scrollLeft % width) + width) % width / width;
    }, oldWidth);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect(viewport).toHaveAttribute("data-loop-speed", "30");
    await expect
      .poll(async () => Number(await viewport.getAttribute("data-loop-width")))
      .toBeGreaterThan(0);
    await page.waitForTimeout(200);
    const newWidth = Number(await viewport.getAttribute("data-loop-width"));
    const newProgress = await viewport.evaluate((node, width) => {
      return ((node.scrollLeft % width) + width) % width / width;
    }, newWidth);
    expect(Math.abs(newProgress - priorProgress)).toBeLessThan(0.03);
  });
});
