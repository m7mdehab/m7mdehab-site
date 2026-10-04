import { expect, test } from "@playwright/test";

const slugs = [
  "presaira",
  "opportunityos",
  "ghareeb-oglu",
  "oil-spill-detection",
  "solar-site-selection",
  "makhbazy",
] as const;

async function settle(page: import("@playwright/test").Page) {
  await page.waitForLoadState("domcontentloaded");
  await page.evaluate(async () => { await document.fonts.ready; });
}

test("work directory keeps the heading to two intentional lines and separates row accents from numbers", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/work");
  await settle(page);

  const lines = page.locator(".work-index-title-line");
  await expect(lines).toHaveCount(2);

  const geometry = await page.evaluate(() => {
    const headingLines = [...document.querySelectorAll<HTMLElement>(".work-index-title-line")].map((line) => line.getBoundingClientRect());
    const row = document.querySelector<HTMLElement>(".work-index-row")!;
    const number = row.querySelector<HTMLElement>(".work-index-number")!;
    const accent = getComputedStyle(row, "::before");
    return {
      firstBottom: headingLines[0].bottom,
      secondTop: headingLines[1].top,
      lineGap: headingLines[1].top - headingLines[0].bottom,
      numberPadding: Number.parseFloat(getComputedStyle(number).paddingInlineStart),
      accentWidth: Number.parseFloat(accent.width),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    };
  });

  expect(geometry.secondTop).toBeGreaterThan(geometry.firstBottom);
  expect(geometry.lineGap).toBeGreaterThanOrEqual(20);
  expect(geometry.numberPadding).toBeGreaterThanOrEqual(14);
  expect(geometry.accentWidth).toBeLessThanOrEqual(3);
  expect(geometry.overflow).toBeLessThanOrEqual(1);
});

test("all project routes use the same governed case-study shell", async ({ page }) => {
  test.setTimeout(180_000);

  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });

    for (const slug of slugs) {
      await page.goto(`/work/${slug}`);
      await settle(page);

      await expect(page.locator("[data-project-case-study]")).toHaveCount(1);
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      await expect(page.locator(".case-hero-artboard-anchor")).toBeVisible();
      await expect(page.getByRole("heading", { name: "What this case study covers." })).toBeVisible();
      await expect(page.getByRole("heading", { name: "How the system earns the result." })).toBeVisible();
      await expect(page.getByRole("heading", { name: "What the case study does not pretend." })).toBeVisible();
      await expect(page.getByRole("heading", { name: "What is publishable, and where the evidence lives." })).toBeVisible();
      await expect(page.locator("[data-case-next]")).toBeVisible();

      const geometry = await page.evaluate(() => {
        const h1 = document.querySelector<HTMLElement>("main h1")!;
        const caseStudy = document.querySelector<HTMLElement>("[data-project-case-study]")!;
        const visualAnchor = document.querySelector<HTMLElement>(".case-hero-artboard-anchor")!;
        const visualStage = document.querySelector<HTMLElement>("[data-project-visual-stage]")!;
        return {
          h1FontSize: Number.parseFloat(getComputedStyle(h1).fontSize),
          caseWidth: caseStudy.getBoundingClientRect().width,
          visualHeight: visualAnchor.getBoundingClientRect().height,
          stageHeight: visualStage.getBoundingClientRect().height,
          stageWidth: visualStage.getBoundingClientRect().width,
          frameWidth: visualStage.parentElement?.getBoundingClientRect().width ?? 0,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        };
      });

      expect(geometry.overflow).toBeLessThanOrEqual(1);
      if (width >= 1000) {
        if (slug === "presaira") {
          expect(geometry.stageHeight).toBeLessThanOrEqual(351);
          expect(geometry.stageHeight).toBeGreaterThanOrEqual(319);
          expect(geometry.visualHeight).toBeLessThanOrEqual(351);
        } else {
          expect(geometry.stageHeight).toBeLessThanOrEqual(241);
          expect(geometry.stageHeight).toBeGreaterThanOrEqual(209);
          expect(geometry.visualHeight).toBeLessThanOrEqual(241);
        }
        expect(geometry.stageWidth).toBeGreaterThanOrEqual(geometry.frameWidth * 0.98);
        expect(geometry.h1FontSize).toBeGreaterThanOrEqual(46);
        expect(geometry.h1FontSize).toBeLessThanOrEqual(82);
      } else {
        if (slug === "presaira") {
          expect(geometry.stageHeight).toBeLessThanOrEqual(281);
          expect(geometry.stageHeight).toBeGreaterThanOrEqual(249);
          expect(geometry.visualHeight).toBeLessThanOrEqual(281);
        } else {
          expect(geometry.stageHeight).toBeLessThanOrEqual(201);
          expect(geometry.stageHeight).toBeGreaterThanOrEqual(169);
          expect(geometry.visualHeight).toBeLessThanOrEqual(201);
        }
        expect(geometry.stageWidth).toBeGreaterThanOrEqual(geometry.frameWidth * 0.98);
      }

      const contents = page.getByRole("navigation", { name: "Case study contents" });
      await expect(contents).toBeVisible();
    }
  }
});


test("Presaira case visual stacks a wide graph above proofs and calibration caption", async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    await page.goto("/work/presaira");
    await settle(page);

    const geometry = await page.evaluate(() => {
      const stage = document.querySelector<HTMLElement>('[data-project-visual-stage][data-project-slug="presaira"]')!;
      const chart = document.querySelector<HTMLElement>("[data-presaira-chart]")!;
      const proof = document.querySelector<HTMLElement>("[data-presaira-proof]")!;
      const caption = document.querySelector<HTMLElement>("[data-presaira-caption]")!;
      const svg = chart.querySelector<SVGElement>("svg")!;
      const stageRect = stage.getBoundingClientRect();
      const chartRect = chart.getBoundingClientRect();
      const proofRect = proof.getBoundingClientRect();
      const captionRect = caption.getBoundingClientRect();
      return {
        stageWidth: stageRect.width,
        chartWidth: chartRect.width,
        chartBottom: chartRect.bottom,
        proofTop: proofRect.top,
        proofBottom: proofRect.bottom,
        captionTop: captionRect.top,
        viewBox: svg.getAttribute("viewBox"),
      };
    });

    expect(geometry.chartWidth).toBeGreaterThanOrEqual(geometry.stageWidth * 0.94);
    expect(geometry.chartBottom).toBeLessThanOrEqual(geometry.proofTop + 1);
    expect(geometry.proofBottom).toBeLessThanOrEqual(geometry.captionTop + 1);
    expect(geometry.viewBox).toBe("0 0 1200 180");
  }
});
