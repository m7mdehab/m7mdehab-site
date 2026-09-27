import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";

const screenshotDirectory = path.resolve(
  process.cwd(),
  "../../outputs/hero-credibility-pass-03",
);

async function waitForMeasuredLoop(page: import("@playwright/test").Page) {
  await expect(page.locator(".credibility-track")).toHaveAttribute(
    "data-loop-ready",
    "true",
  );
  await page.evaluate(() => document.fonts.ready);
}

test.describe("Surgical pass 02 credibility geometry and mobile composition", () => {
  test("caption stages align on one line at mobile and desktop widths", async ({
    page,
  }) => {
    for (const width of [390, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await waitForMeasuredLoop(page);
      const result = await page
        .locator(".credibility-logo-sequence")
        .first()
        .locator(".relationship-caption")
        .evaluateAll((captions) => {
          const boxes = captions.map((caption) => {
            const rect = caption.getBoundingClientRect();
            const text = caption.querySelector("strong")!;
            const logoStage = caption
              .closest(".credibility-brand-item")!
              .querySelector<HTMLElement>(".credibility-logo-stage")!;
            const logoImages = [
              ...logoStage.querySelectorAll<HTMLImageElement>("img"),
            ];
            const stageRect = logoStage.getBoundingClientRect();
            const textStyle = getComputedStyle(text);
            return {
              top: rect.top,
              height: rect.height,
              stageBottom: stageRect.bottom,
              logoBottom: Math.max(
                ...logoImages.map(
                  (image) => image.getBoundingClientRect().bottom,
                ),
              ),
              textHeight: text.getBoundingClientRect().height,
              textScrollWidth: text.scrollWidth,
              textClientWidth: text.clientWidth,
              whiteSpace: textStyle.whiteSpace,
              lineHeight: Number.parseFloat(textStyle.lineHeight),
            };
          });
          return boxes;
        });
      const tops = result.map((caption) => caption.top);
      expect(
        Math.max(...tops) - Math.min(...tops),
        `${width}px caption baseline`,
      ).toBeLessThanOrEqual(2);
      for (const caption of result) {
        expect(caption.whiteSpace).toBe("nowrap");
        expect(caption.textScrollWidth).toBeLessThanOrEqual(
          caption.textClientWidth + 1,
        );
        expect(caption.height).toBeLessThanOrEqual(caption.lineHeight + 1);
        expect(caption.textHeight).toBeLessThanOrEqual(caption.lineHeight + 1);
        expect(caption.logoBottom).toBeLessThanOrEqual(caption.stageBottom + 1);
        expect(caption.top - caption.stageBottom).toBeCloseTo(
          width <= 700 ? 8 : 12,
          0,
        );
      }
    }
  });

  test("measured duplicated groups fill 390, 1440 and 1920px at five animation positions", async ({
    page,
  }) => {
    for (const width of [390, 1440, 1920]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/");
      await waitForMeasuredLoop(page);
      const track = page.locator(".credibility-track");
      const initial = await track.evaluate((node) => {
        const groups = [
          ...node.querySelectorAll<HTMLElement>(".credibility-sequence"),
        ];
        const firstItems = [
          ...groups[0].querySelectorAll<HTMLElement>(".credibility-brand-item"),
        ];
        const secondItems = [
          ...groups[1].querySelectorAll<HTMLElement>(".credibility-brand-item"),
        ];
        const identity = (item: HTMLElement) => ({
          organization: item.dataset.organization,
          caption: item
            .querySelector(".relationship-caption")
            ?.textContent?.trim(),
          images: [...item.querySelectorAll<HTMLImageElement>("img")].map(
            (image) => image.currentSrc,
          ),
        });
        const viewport = node.closest<HTMLElement>(".credibility-viewport")!;
        const style = getComputedStyle(viewport);
        return {
          loopWidth: Number(viewport.dataset.loopWidth),
          viewportWidth: viewport.clientWidth,
          speed: Number(viewport.dataset.loopSpeed),
          repeatCount: Number(groups[0].dataset.sourceRepeats),
          sourceCount: Number(viewport.dataset.sourceItemCount),
          firstWidth: groups[0].getBoundingClientRect().width,
          secondWidth: groups[1].getBoundingClientRect().width,
          first: firstItems.map(identity),
          second: secondItems.map(identity),
          gap: Number.parseFloat(
            style.getPropertyValue("--credibility-item-gap"),
          ),
        };
      });
      expect(
        initial.loopWidth,
        `${width}px measured logical group`,
      ).toBeGreaterThanOrEqual(width * 1.2);
      expect(initial.firstWidth).toBeCloseTo(initial.secondWidth, 1);
      expect(initial.loopWidth).toBeCloseTo(initial.firstWidth, 1);
      expect(initial.sourceCount).toBe(9);
      expect(initial.speed).toBe(width <= 700 ? 52 : 30);
      expect(initial.first).toEqual(initial.second);

      const coverage = await track.evaluate((node) => {
        const viewport = node.closest<HTMLElement>(".credibility-viewport")!;
        const animation = node.getAnimations()[0];
        animation.pause();
        const duration = Number(animation.effect?.getComputedTiming().duration);
        const samples = [0, 0.25, 0.5, 0.75, 0.99];
        return samples.map((progress) => {
          animation.currentTime = duration * progress;
          const viewportRect = viewport.getBoundingClientRect();
          const intervals = [
            ...node.querySelectorAll<HTMLElement>(".credibility-brand-item"),
          ]
            .map((item) => item.getBoundingClientRect())
            .filter(
              (rect) =>
                rect.right > viewportRect.left &&
                rect.left < viewportRect.right,
            )
            .map((rect) => ({
              left: Math.max(rect.left, viewportRect.left) - viewportRect.left,
              right:
                Math.min(rect.right, viewportRect.right) - viewportRect.left,
            }))
            .sort((left, right) => left.left - right.left);
          let maxGap = intervals.length
            ? intervals[0].left
            : viewport.clientWidth;
          let edge = intervals.length ? intervals[0].right : 0;
          for (const interval of intervals.slice(1)) {
            maxGap = Math.max(maxGap, interval.left - edge);
            edge = Math.max(edge, interval.right);
          }
          maxGap = Math.max(maxGap, viewport.clientWidth - edge);
          return { progress, maxGap };
        });
      });
      for (const sample of coverage) {
        expect(
          sample.maxGap,
          `${width}px at ${sample.progress * 100}%`,
        ).toBeLessThanOrEqual(initial.gap * 2 + 1);
      }
    }
  });

  test("mobile content starts early, brings the rail close to the CTAs, and meets Work without a seam", async ({
    page,
  }) => {
    for (const width of [360, 390, 430]) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await waitForMeasuredLoop(page);
      const metrics = await page.evaluate(() => {
        const box = (selector: string) => {
          const rect = document
            .querySelector<HTMLElement>(selector)!
            .getBoundingClientRect();
          return { top: rect.top, bottom: rect.bottom, height: rect.height };
        };
        const hero = box(".overhaul-hero");
        const location = box(".overhaul-hero-meta");
        const actions = box(".overhaul-hero-actions");
        const rail = box(".credibility-rail");
        const work = box(".selected-work");
        const heroColor = getComputedStyle(
          document.querySelector(".overhaul-hero")!,
        ).backgroundColor;
        const railColor = getComputedStyle(
          document.querySelector(".credibility-rail")!,
        ).backgroundColor;
        return {
          hero,
          location,
          actions,
          rail,
          work,
          locationOffset: location.top,
          ctaRailGap: rail.top - actions.bottom,
          railWorkGap: work.top - rail.bottom,
          heroColor,
          railColor,
          documentWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        };
      });
      expect(
        metrics.locationOffset,
        `${width}px metadata position`,
      ).toBeGreaterThanOrEqual(844 * 0.12);
      expect(
        metrics.locationOffset,
        `${width}px metadata position`,
      ).toBeLessThanOrEqual(844 * 0.2);
      expect(
        metrics.ctaRailGap,
        `${width}px CTA to rail`,
      ).toBeGreaterThanOrEqual(40);
      expect(metrics.ctaRailGap, `${width}px CTA to rail`).toBeLessThanOrEqual(
        80,
      );
      expect(
        metrics.rail.height,
        `${width}px rail height`,
      ).toBeGreaterThanOrEqual(90);
      expect(metrics.rail.height, `${width}px rail height`).toBeLessThanOrEqual(
        135,
      );
      expect(metrics.railWorkGap, `${width}px dark-to-light transition`).toBe(
        0,
      );
      expect(metrics.hero.bottom).toBeCloseTo(metrics.rail.top, 0);
      expect(metrics.heroColor).toBe(metrics.railColor);
      expect(
        metrics.documentWidth - metrics.clientWidth,
        `${width}px document overflow`,
      ).toBeLessThanOrEqual(1);
    }
  });

  test("reduced motion keeps a single manually scrollable source sequence", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.waitForTimeout(100);
    const viewport = page.locator(".credibility-viewport");
    await expect(page.locator(".credibility-track")).toHaveCSS(
      "animation-name",
      "none",
    );
    await expect(
      page.locator('.credibility-sequence[aria-hidden="true"]'),
    ).toBeHidden();
    await expect(
      page
        .locator(".credibility-sequence")
        .first()
        .locator(".credibility-brand-item"),
    ).toHaveCount(9);
    await expect(viewport).toHaveCSS("overflow-x", "auto");
    await expect(page.locator(".relationship-caption").first()).toBeVisible();
  });

  test("renders the requested visual QA screenshots across mobile and desktop widths", async ({
    page,
  }) => {
    await mkdir(screenshotDirectory, { recursive: true });
    for (const width of [320, 360, 390, 430, 480, 1440, 1920]) {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      await page.goto("/");
      await waitForMeasuredLoop(page);
      await page.evaluate(() => {
        const animation = document
          .querySelector(".credibility-track")
          ?.getAnimations()[0];
        animation?.pause();
        if (animation?.effect)
          animation.currentTime =
            Number(animation.effect.getComputedTiming().duration) * 0.25;
      });
      await page.screenshot({
        path: path.join(screenshotDirectory, `home-${width}.png`),
        fullPage: true,
        animations: "disabled",
      });
    }
  });
});
