import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { expect, test, type Page } from "@playwright/test";

const slugs = [
  "presaira",
  "opportunityos",
  "oil-spill-detection",
  "solar-site-selection",
  "ghareeb-oglu",
  "makhbazy",
] as const;
const outputRoot = path.resolve(
  process.cwd(),
  "..",
  "..",
  "outputs",
  "selected-work-pass",
);

async function settle(page: Page) {
  await page.goto("/");
  await page.evaluate(async () => {
    await document.fonts.ready;
    await Promise.all(
      Array.from(document.images).map((image) =>
        image.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              image.addEventListener("load", () => resolve(), { once: true });
              image.addEventListener("error", () => resolve(), { once: true });
              setTimeout(resolve, 5_000);
            }),
      ),
    );
  });
  await page.locator("[data-selected-work]").scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
}

async function selectSlide(page: Page, index: number) {
  const carousel = page.locator(".selected-work-carousel");
  await carousel.getByRole("button", { name: `Go to project ${index + 1} of 6` }).click();
  await expect(carousel).toHaveAttribute("data-active-project", slugs[index]);
  await page.waitForTimeout(900);
}

test.describe("Selected Work refinement", () => {
  test("all project cards render at desktop and mobile with consistent evidence geometry", async ({
    page,
  }) => {
    await mkdir(outputRoot, { recursive: true });
    const records: Array<Record<string, number | string | boolean>> = [];

    for (const viewport of [
      { width: 1440, height: 1000, label: "desktop-1440" },
      { width: 390, height: 844, label: "mobile-390" },
    ]) {
      await page.setViewportSize(viewport);
      await settle(page);
      const section = page.locator("[data-selected-work]");
      for (const [index, slug] of slugs.entries()) {
        await selectSlide(page, index);
        const card = page.locator(
          `.selected-work-carousel-slide[data-project-slug="${slug}"] .selected-work-carousel-card`,
        );
        const metrics = await card.evaluate((element) => {
          const box = element.getBoundingClientRect();
          const visual = element.querySelector<HTMLElement>("[data-evidence-region]")!;
          const visualBox = visual.getBoundingClientRect();
          const title = element.querySelector<HTMLElement>("[data-project-title]")!;
          const copy = element.querySelector<HTMLElement>(".selected-work-carousel-copy")!;
          const summary = element.querySelector<HTMLElement>(".selected-work-summary-mobile")!;
          const proof = element.querySelector<HTMLElement>(".selected-work-carousel-proof")!;
          const titleStyle = getComputedStyle(title);
          const titleLineHeight = Number.parseFloat(titleStyle.lineHeight);
          return {
            cardWidth: box.width,
            cardHeight: box.height,
            visualHeight: visualBox.height,
            copyHeight: copy.getBoundingClientRect().height,
            visualShare: visualBox.height / box.height,
            titleLines: Math.max(1, Math.round(title.getBoundingClientRect().height / titleLineHeight)),
            titleOverflow: title.scrollWidth > title.clientWidth + 1,
            copyOverflow: copy.scrollHeight > copy.clientHeight + 1,
            summaryOverflow: summary.scrollWidth > summary.clientWidth + 1,
            proofOverflow: proof.scrollWidth > proof.clientWidth + 1,
            documentOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          };
        });
        records.push({ ...metrics, project: slug, viewport: viewport.label });
        expect(metrics.documentOverflow, `${viewport.label} ${slug} document overflow`).toBe(false);
        expect(metrics.titleOverflow, `${viewport.label} ${slug} title overflow`).toBe(false);
        if (viewport.width <= 700) {
        expect(metrics.cardHeight, `${slug} mobile compact card height`).toBeLessThanOrEqual(390);
        expect(metrics.visualShare, `${slug} evidence share`).toBeGreaterThanOrEqual(0.48);
          expect(metrics.proofOverflow, `${slug} proof overflow`).toBe(false);
          expect(metrics.cardWidth, `${slug} mobile card width`).toBeLessThanOrEqual(360);
          if (slug === "opportunityos") {
            const authorityRow = page.locator(
              '.selected-work-carousel-slide[data-project-slug="opportunityos"] .opportunity-card-authority > div:first-child',
            );
            const modes = page.locator(
              '.selected-work-carousel-slide[data-project-slug="opportunityos"] .opportunity-card-mode',
            );
            const factRight = (await authorityRow.boundingBox())!.x +
              (await authorityRow.boundingBox())!.width;
            const firstMode = (await modes.first().boundingBox())!;
            expect(firstMode.x, "OpportunityOS modes clear authority label").toBeGreaterThanOrEqual(factRight - 1);
            await expect(modes).toHaveText(["Dry run", "Assisted", "Controlled submit"]);
          }
          await card.screenshot({ path: path.join(outputRoot, `${viewport.label}-${slug}.png`) });
        } else {
          expect(metrics.cardHeight, `${slug} desktop card height`).toBeGreaterThanOrEqual(580);
          expect(metrics.visualHeight, `${slug} desktop evidence region`).toBeGreaterThan(0);
          await card.screenshot({ path: path.join(outputRoot, `${viewport.label}-${slug}.png`) });
        }
      }
      await section.screenshot({ path: path.join(outputRoot, `${viewport.label}-section.png`) });
    }
    await writeFile(path.join(outputRoot, "geometry.json"), JSON.stringify(records, null, 2));
  });

  test("Ghareeb homepage visual avoids the supplied opaque logo tile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await settle(page);
    await selectSlide(page, 4);
    const card = page.locator('.selected-work-carousel-slide[data-project-slug="ghareeb-oglu"]');
    await expect(card.locator("[data-ghareeb-wordmark]")).toHaveText("Ghareeb Oglu");
    await expect(card.locator(".ghareeb-storefront-brand img")).toHaveCount(0);
  });

  test("desktop and tablet section geometry stays in bounds at every review width", async ({ page }) => {
    for (const width of [768, 900, 1024, 1280, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      await settle(page);
      const metrics = await page.locator(".selected-work-carousel-card").first().evaluate((card) => {
        const box = card.getBoundingClientRect();
        const evidence = card.querySelector<HTMLElement>("[data-evidence-region]")!.getBoundingClientRect();
        return {
          viewportWidth: document.documentElement.clientWidth,
          documentWidth: document.documentElement.scrollWidth,
          cardWidth: box.width,
          cardHeight: box.height,
          evidenceHeight: evidence.height,
        };
      });
      expect(metrics.documentWidth, `${width}px document overflow`).toBeLessThanOrEqual(metrics.viewportWidth + 1);
      expect(metrics.cardWidth, `${width}px card width`).toBeLessThan(2000);
      expect(metrics.evidenceHeight, `${width}px evidence area`).toBeGreaterThan(0);
      await page.locator("[data-selected-work]").screenshot({
        path: path.join(outputRoot, `selected-work-${width}.png`),
      });
    }
  });

  test("mobile dock uses the 12px plus safe-area bottom offset", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await settle(page);
    const values = await page.evaluate(() => ({
      dockBottom: getComputedStyle(document.querySelector<HTMLElement>(".site-nav-wrap")!).bottom,
      dockHeight: getComputedStyle(document.querySelector<HTMLElement>(".site-nav")!).height,
      bodyPadding: getComputedStyle(document.body).paddingBottom,
    }));
    expect(values.dockBottom).toBe("12px");
    expect(Number.parseFloat(values.dockHeight)).toBeGreaterThanOrEqual(60);
    expect(Number.parseFloat(values.bodyPadding)).toBeGreaterThanOrEqual(72);
  });

  test("active carousel dot reads as a stationary countdown ring", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await settle(page);
    const carousel = page.locator(".selected-work-carousel");
    const active = carousel.locator(".carousel-dot.is-active");
    const initial = await active.evaluate((element) => {
      const style = getComputedStyle(element, "::after");
      const button = element.getBoundingClientRect();
      return {
        animation: style.animationName,
        duration: style.animationDuration,
        progress: Number.parseFloat(style.getPropertyValue("--carousel-progress")),
        ringInset: style.inset,
        hitTarget: button.width,
      };
    });
    await page.waitForTimeout(700);
    const progress = await active.evaluate((element) =>
      Number.parseFloat(
        getComputedStyle(element, "::after").getPropertyValue("--carousel-progress"),
      ),
    );
    expect(initial.animation).toBe("carousel-dot-countdown");
    expect(initial.duration).toBe("6s");
    expect(initial.progress).toBeGreaterThanOrEqual(0);
    expect(progress).toBeGreaterThan(initial.progress);
    expect(initial.ringInset).toBe("6px");
    expect(initial.hitTarget).toBeGreaterThanOrEqual(44);
  });

  test("mobile summary and proof remain contained at narrow and wide phone widths", async ({
    page,
  }) => {
    const records = [];
    for (const width of [320, 360, 375, 412, 430, 480]) {
      await page.setViewportSize({ width, height: 844 });
      await settle(page);
      const sample = await page.locator(".selected-work-carousel-card").first().evaluate((card) => {
        const copy = card.querySelector<HTMLElement>(".selected-work-carousel-copy")!;
        const proof = card.querySelector<HTMLElement>(".selected-work-carousel-proof")!;
        const evidence = card.querySelector<HTMLElement>("[data-evidence-region]")!;
        const bounds = card.getBoundingClientRect();
        return {
          cardWidth: bounds.width,
          cardHeight: bounds.height,
          evidenceHeight: evidence.getBoundingClientRect().height,
          copyHeight: copy.getBoundingClientRect().height,
          proofScrollWidth: proof.scrollWidth,
          proofClientWidth: proof.clientWidth,
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: document.documentElement.clientWidth,
        };
      });
      records.push({ width, ...sample });
      expect(sample.documentWidth, `${width}px page overflow`).toBeLessThanOrEqual(sample.viewportWidth + 1);
      expect(sample.proofScrollWidth, `${width}px proof overflow`).toBeLessThanOrEqual(sample.proofClientWidth + 1);
      if (width === 320 || width === 430) {
        await page.locator("[data-selected-work]").screenshot({
          path: path.join(outputRoot, `mobile-${width}-selected-work.png`),
        });
      }
    }
    await mkdir(outputRoot, { recursive: true });
    await writeFile(path.join(outputRoot, "phone-widths.json"), JSON.stringify(records, null, 2));
  });
});
