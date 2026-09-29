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
          expect(metrics.cardHeight, `${slug} mobile compact card height`).toBeLessThanOrEqual(
            slug === "opportunityos" ? 360 : 350,
          );
          expect(metrics.visualShare, `${slug} evidence share`).toBeGreaterThanOrEqual(0.58);
          expect(metrics.visualShare, `${slug} evidence share`).toBeLessThanOrEqual(0.68);
          expect(metrics.copyOverflow, `${slug} narrative fits its card`).toBe(false);
          expect(metrics.summaryOverflow, `${slug} summary fits`).toBe(false);
          expect(metrics.proofOverflow, `${slug} proof overflow`).toBe(false);
          expect(metrics.cardWidth, `${slug} mobile card width`).toBeLessThan(400);
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

  test("mobile rail is transparent and exposes only a narrow neighboring-card hint", async ({ page }) => {
    for (const width of [320, 390, 430]) {
      await page.setViewportSize({ width, height: 844 });
      await settle(page);
      await selectSlide(page, 0);
      const geometry = await page.evaluate(() => {
        const carousel = document.querySelector<HTMLElement>(".selected-work-carousel")!;
        const window = document.querySelector<HTMLElement>(".selected-work-carousel-window")!;
        const track = document.querySelector<HTMLElement>(".selected-work-carousel-track")!;
        const slides = [...document.querySelectorAll<HTMLElement>(".selected-work-carousel-slide")];
        const card = slides[0].querySelector<HTMLElement>(".selected-work-carousel-card")!;
        const viewport = window.getBoundingClientRect();
        const cardBounds = card.getBoundingClientRect();
        const nextBounds = slides[1].getBoundingClientRect();
        const visibleNext = Math.max(0, Math.min(nextBounds.right, viewport.right) - Math.max(nextBounds.left, viewport.left));
        return {
          backgrounds: [carousel, window, track].map((element) => getComputedStyle(element).backgroundColor),
          cardWidth: cardBounds.width,
          viewportWidth: viewport.width,
          visibleNext,
          visibleNextRatio: visibleNext / viewport.width,
          documentWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        };
      });

      expect(geometry.backgrounds, `${width}px carousel surfaces stay transparent`).toEqual([
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
        "rgba(0, 0, 0, 0)",
      ]);
      expect(geometry.cardWidth / geometry.viewportWidth, `${width}px card fills the viewport`).toBeGreaterThanOrEqual(0.9);
      expect(geometry.cardWidth / geometry.viewportWidth, `${width}px card fits the viewport`).toBeLessThanOrEqual(0.94);
      expect(geometry.visibleNextRatio, `${width}px peek stays subtle`).toBeLessThanOrEqual(0.13);
      expect(geometry.documentWidth, `${width}px document has no horizontal overflow`).toBeLessThanOrEqual(geometry.clientWidth + 1);
      if (width === 390) {
        expect(geometry.visibleNextRatio, "390px next-card hint is visible").toBeGreaterThanOrEqual(0.06);
        await page.locator("[data-selected-work]").screenshot({ path: path.join(outputRoot, "mobile-390-transparent-rail.png") });
      }
    }
  });

  test("all six mobile cards use the approved copy and evidence-first treatments", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await settle(page);
    const intro = page.locator("[data-selected-work] .selected-work-intro-copy");
    await expect(intro.locator(".selected-work-intro-desktop")).toHaveText(
      "Each project opens to a full case study with inspectable evidence.",
    );
    await expect(intro.locator(".selected-work-intro-mobile")).toHaveText(
      "Each project is backed by a full case study and inspectable evidence.",
    );

    const contracts = [
      {
        slug: "presaira",
        kicker: "Probabilistic forecasting",
        summary: "Forecasted all 104 matches of the 2026 World Cup with reproducible simulation and post-event evaluation.",
        proof: "Data science · Forecasting · Calibration",
      },
      {
        slug: "opportunityos",
        kicker: "Governed AI system",
        summary: "A governed agent workflow built around provenance, controlled generation and explicit action boundaries.",
        proof: "AI engineering · Multi-agent · Governance",
      },
      {
        slug: "oil-spill-detection",
        kicker: "SAR computer vision",
        summary: "Sentinel-1 SAR segmentation for marine oil-spill detection, evaluation and georeferenced outputs.",
        proof: "Computer vision · Remote sensing · Validation",
      },
      {
        slug: "solar-site-selection",
        kicker: "Geospatial decision system",
        summary: "A geospatial siting engine combining AHP scoring, suitability mapping and ranked candidate sites.",
        proof: "Geospatial · AHP · Decision support",
      },
      {
        slug: "ghareeb-oglu",
        kicker: "End-to-end commerce platform",
        summary: "An end-to-end commerce platform spanning storefront, backend, payments and fulfillment.",
        proof: "Product ownership · Architecture · Ecommerce",
      },
      {
        slug: "makhbazy",
        kicker: "Mobile product leadership",
        summary: "Led UI/UX and Android/iOS product delivery from concept through release approval.",
        proof: "Product leadership · UI/UX · Mobile delivery",
      },
    ];

    for (const [index, item] of contracts.entries()) {
      await selectSlide(page, index);
      const slide = page.locator(`.selected-work-carousel-slide[data-project-slug="${item.slug}"]`);
      await expect(slide.locator(".selected-work-meta-mobile")).toHaveText(item.kicker);
      await expect(slide.locator(".selected-work-summary-mobile")).toHaveText(item.summary);
      await expect(slide.locator(".selected-work-proof-mobile")).toHaveText(item.proof);
      await expect(slide.locator(".selected-work-case-link")).toHaveText("View case study ↗");
    }

    const presaira = page.locator('.selected-work-carousel-slide[data-project-slug="presaira"]');
    await expect(presaira.locator(".presaira-proof-mobile")).toHaveText(["104 matches", "Post-event evaluation"]);
    await expect(presaira.locator(".presaira-caption-mobile")).toHaveText("Predicted probabilities vs. observed outcomes across all 104 matches.");
    await expect(presaira.locator(".selected-work-summary-mobile")).toHaveText(contracts[0].summary);

    const opportunity = page.locator('.selected-work-carousel-slide[data-project-slug="opportunityos"]');
    expect(
      await opportunity.locator("[data-opportunity-stage]").evaluateAll((stages) =>
        stages.map((stage) => stage.getAttribute("data-opportunity-stage")),
      ),
    ).toEqual(["Discover", "Ingest", "Qualify", "Score", "Truth-lock", "Prepare"]);
    await expect(opportunity.locator(".opportunity-card-authority strong")).toHaveText("Truth Graph");
    await expect(opportunity.locator(".opportunity-card-mode")).toHaveText(["Dry run", "Assisted", "Controlled submit"]);
    await expect(opportunity.locator(".opportunity-card-caption")).toBeHidden();

    const oil = page.locator('.selected-work-carousel-slide[data-project-slug="oil-spill-detection"]');
    const oilImage = oil.locator('[class*="oilImageWrap"] img');
    await expect(oilImage).toBeVisible();
    const oilImageBounds = await oilImage.boundingBox();
    expect(oilImageBounds?.height).toBeGreaterThanOrEqual(105);
    expect(oilImageBounds?.height).toBeLessThanOrEqual(135);
    await expect(oil.locator('[class*="metricGrid"] strong')).toHaveText(["0.566", "0.764", "0.696", "0.802"]);

    const solar = page.locator('.selected-work-carousel-slide[data-project-slug="solar-site-selection"]');
    await expect(solar.locator('[class*="solarLayer"] span')).toHaveText(["AOI", "Criteria", "Suitability"]);
    await expect(solar.locator(".solar-caption-mobile")).toHaveText("Five-class Land Suitability Index");
    expect((await solar.locator('[class*="solarStack"]').boundingBox())?.height).toBeGreaterThanOrEqual(130);
    await expect(solar.locator(".solar-description-desktop")).toBeHidden();

    const ghareeb = page.locator('.selected-work-carousel-slide[data-project-slug="ghareeb-oglu"]');
    await expect(ghareeb.locator("[data-ghareeb-wordmark]")).toHaveText("Ghareeb Oglu");
    await expect(ghareeb.locator('[class*="commerceStages"] span')).toContainText(["Browse", "Product", "Cart", "Fulfillment"]);
    await expect(ghareeb.locator(".ghareeb-card-caption")).toBeHidden();
    const logoStyle = await ghareeb.locator("[data-ghareeb-wordmark]").evaluate((node) => getComputedStyle(node).backgroundColor);
    expect(logoStyle).toBe("rgba(0, 0, 0, 0)");

    const makhbazy = page.locator('.selected-work-carousel-slide[data-project-slug="makhbazy"]');
    await expect(makhbazy.locator('[class*="phoneShell"] b')).toHaveText(["Discover", "Order", "Track", "Receive"]);
    await expect(makhbazy.locator(".makhbazy-caption-mobile")).toHaveText("Public-safe journey without protected internal screens.");
    const phoneLabels = await makhbazy.locator('[class*="phoneShell"]').evaluateAll((shells) => shells.map((shell) => {
      const text = shell.querySelector("b")!.getBoundingClientRect();
      const frame = shell.getBoundingClientRect();
      return text.left >= frame.left && text.right <= frame.right && text.top >= frame.top && text.bottom <= frame.bottom;
    }));
    expect(phoneLabels.every(Boolean)).toBe(true);
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
    await active.evaluate((element) => {
      const ring = element as HTMLElement;
      ring.style.setProperty("--carousel-progress", "0%");
      ring.style.animation = "none";
      void ring.offsetWidth;
      ring.style.animation = "";
    });
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
    expect(initial.ringInset).toBe("8px");
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
