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
  test("Presaira is a live artboard with supplied logos and public calibration data", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await settle(page);
    const card = page.locator('.selected-work-carousel-slide[data-project-slug="presaira"] .selected-work-carousel-artboard');
    await expect(card.locator("h3[data-project-title]")).toHaveText("PRESAIRA");
    await expect(card).toContainText("Sports forecasting, on the record.");
    await expect(card).toContainText("CHAMPION");
    await expect(card).toContainText("EXACT MATCHUP");
    await expect(card).toContainText("SEMIFINALISTS");
    await expect(card.locator('[data-artboard-node="scoreNumber"]')).toHaveAttribute("aria-label", "104 / 104");
    await expect(card.locator("[data-artboard-node=calibrationChart] svg")).toHaveAttribute("role", "img");
    await expect(card.locator("[data-artboard-node=calibrationChart] svg desc")).toContainText("public Presaira calibration evidence");
    await expect(card.locator('img[alt$="logo"]')).toHaveCount(4);
    const assets = await card.locator("img").evaluateAll((images) => (images as HTMLImageElement[]).map((image) => ({ src: image.currentSrc, loaded: image.complete && image.naturalWidth > 0 })));
    expect(assets.every((asset) => asset.loaded)).toBe(true);
    expect(assets.some((asset) => asset.src.includes("reference/full"))).toBe(false);
    expect(assets.some((asset) => asset.src.includes("backgrounds/presaira-1683.webp"))).toBe(true);
  });

  test("all project cards render at desktop and mobile with consistent evidence geometry", async ({
    page,
  }) => {
    test.setTimeout(180_000);
    await mkdir(outputRoot, { recursive: true });
    const records: Array<Record<string, number | string | boolean>> = [];

    for (const viewport of [
      { width: 390, height: 844, label: "mobile-390" },
      { width: 430, height: 932, label: "mobile-430" },
      { width: 1440, height: 1000, label: "desktop-1440" },
      { width: 1920, height: 1080, label: "desktop-1920" },
    ]) {
      await page.setViewportSize(viewport);
      await settle(page);
      const section = page.locator("[data-selected-work]");
      for (const [index, slug] of slugs.entries()) {
        await selectSlide(page, index);
        const card = page.locator(
          `.selected-work-carousel-slide[data-project-slug="${slug}"] .selected-work-carousel-artboard`,
        );
        const metrics = await card.evaluate((element) => {
          const box = element.getBoundingClientRect();
          const visual = element.querySelector<HTMLElement>("[data-evidence-region]")!;
          const visualBox = visual.getBoundingClientRect();
          const title = element.querySelector<HTMLElement>("[data-project-title]")!;
          const copy = element.querySelector<HTMLElement>(".selected-work-carousel-copy");
          const summary = element.querySelector<HTMLElement>(".selected-work-summary-mobile");
          const proof = element.querySelector<HTMLElement>(".selected-work-carousel-proof");
          const titleStyle = getComputedStyle(title);
          const titleLineHeight = Number.parseFloat(titleStyle.lineHeight);
          const artboard = element.querySelector<HTMLElement>("[data-project-artboard]");
          const artboardBox = artboard?.getBoundingClientRect();
          const identity = title.closest<HTMLElement>("[data-artboard-node='wordmark']");
          const liveWordmark = identity?.querySelector<HTMLImageElement>("img[data-presaira-wordmark]");
          const visibleTitle = liveWordmark?.getBoundingClientRect();
          const identityBox = identity?.getBoundingClientRect();
          const visibleInk = visibleTitle ? {
            left: visibleTitle.left + visibleTitle.width * 115 / 2172,
            right: visibleTitle.left + visibleTitle.width * 2058 / 2172,
            top: visibleTitle.top + visibleTitle.height * 287 / 724,
            bottom: visibleTitle.top + visibleTitle.height * 457 / 724,
          } : null;
          return {
            cardWidth: box.width,
            cardHeight: box.height,
            visualHeight: visualBox.height,
            copyHeight: copy?.getBoundingClientRect().height ?? 0,
            visualShare: visualBox.height / box.height,
            titleLines: Math.max(1, Math.round(title.getBoundingClientRect().height / titleLineHeight)),
            titleOverflow: visibleInk && identityBox
              ? visibleInk.left < identityBox.left - 1
                || visibleInk.right > identityBox.right + 1
                || visibleInk.top < identityBox.top - 1
                || visibleInk.bottom > identityBox.bottom + 1
              : title.scrollWidth > title.clientWidth + 1,
            copyOverflow: copy ? copy.scrollHeight > copy.clientHeight + 1 : false,
            summaryOverflow: summary ? summary.scrollWidth > summary.clientWidth + 1 : false,
            proofOverflow: proof ? proof.scrollWidth > proof.clientWidth + 1 : false,
            artboardAspect: artboardBox ? artboardBox.width / artboardBox.height : 0,
            artboardPresent: Boolean(artboard),
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
          expect(metrics.artboardPresent, `${slug} artboard renders`).toBe(true);
          expect(metrics.artboardAspect, `${slug} uses landscape art direction`).toBeCloseTo(1.55, 1);
          expect(metrics.visualShare, `${slug} fills its landscape card`).toBeCloseTo(1, 2);
          expect(metrics.copyOverflow, `${slug} narrative fits its card`).toBe(false);
          expect(metrics.summaryOverflow, `${slug} summary fits`).toBe(false);
          expect(metrics.proofOverflow, `${slug} proof overflow`).toBe(false);
          expect(metrics.cardWidth, `${slug} mobile card width`).toBeLessThan(400);
          if (slug === "opportunityos") {
            const gate = page.locator(
              '.selected-work-carousel-slide[data-project-slug="opportunityos"] [data-artboard-node="authorityGate"]',
            );
            const modes = page.locator(
              '.selected-work-carousel-slide[data-project-slug="opportunityos"] [data-artboard-node="actionModes"]',
            );
            const gateBox = (await gate.boundingBox())!;
            const modesBox = (await modes.boundingBox())!;
            const overlaps = gateBox.x < modesBox.x + modesBox.width && gateBox.x + gateBox.width > modesBox.x && gateBox.y < modesBox.y + modesBox.height && gateBox.y + gateBox.height > modesBox.y;
            expect(overlaps, "OpportunityOS authority gate and action modes remain separate").toBe(false);
            await expect(modes).toContainText("DRY RUN");
            await expect(modes).toContainText("ASSISTED");
            await expect(modes).toContainText("CONTROLLED SUBMIT");
          }
          await card.screenshot({ path: path.join(outputRoot, `${viewport.label}-${slug}.png`) });
        } else {
          expect(metrics.artboardPresent, `${slug} artboard renders`).toBe(true);
          expect(metrics.artboardAspect, `${slug} preserves canonical artboard ratio`).toBeCloseTo(1.8, 1);
          expect(metrics.visualShare, `${slug} fills its landscape artboard`).toBeCloseTo(1, 2);
          expect(metrics.visualHeight, `${slug} desktop evidence region`).toBeGreaterThan(0);
          await card.screenshot({ path: path.join(outputRoot, `${viewport.label}-${slug}.png`) });
        }
      }
      await section.screenshot({ path: path.join(outputRoot, `${viewport.label}-section.png`) });
    }
    await writeFile(path.join(outputRoot, "geometry.json"), JSON.stringify(records, null, 2));
  });

  test("Ghareeb uses the supplied transparent official logo and four-stage path", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await settle(page);
    await selectSlide(page, 4);
    const card = page.locator('.selected-work-carousel-slide[data-project-slug="ghareeb-oglu"]');
    await expect(card.locator('img[alt="Ghareeb Oglu official white and gold logo"]')).toHaveCount(1);
    await expect(card.locator('[data-artboard-node="commerceJourney"]')).toContainText("BROWSE");
    await expect(card.locator('[data-artboard-node="commerceJourney"]')).toContainText("PRODUCT");
    await expect(card.locator('[data-artboard-node="commerceJourney"]')).toContainText("CART");
    await expect(card.locator('[data-artboard-node="commerceJourney"]')).toContainText("FULFILLMENT");
    await expect(card.locator("[data-project-artboard] a")).toHaveCount(1);
    await expect(card.locator("[data-project-artboard] a")).toHaveAttribute("href", "/work/ghareeb-oglu");
  });

  test("mobile rail is transparent and exposes only a narrow neighboring-card hint", async ({ page }) => {
    for (const width of [320, 360, 390, 430, 480]) {
      await page.setViewportSize({ width, height: 844 });
      await settle(page);
      await selectSlide(page, 0);
      const geometry = await page.evaluate(() => {
        const carousel = document.querySelector<HTMLElement>(".selected-work-carousel")!;
        const window = document.querySelector<HTMLElement>(".selected-work-carousel-window")!;
        const track = document.querySelector<HTMLElement>(".selected-work-carousel-track")!;
        const slides = [...document.querySelectorAll<HTMLElement>(".selected-work-carousel-slide")];
        const card = slides[0].querySelector<HTMLElement>(".selected-work-carousel-artboard")!;
        const viewport = window.getBoundingClientRect();
        const cardBounds = card.getBoundingClientRect();
        const nextBounds = slides[1].getBoundingClientRect();
        const visibleNext = Math.max(0, Math.min(nextBounds.right, viewport.right) - Math.max(nextBounds.left, viewport.left));
        const dots = document.querySelector<HTMLElement>(".carousel-dots")!.getBoundingClientRect();
        const navigation = document.querySelector<HTMLElement>(".site-nav-wrap")!.getBoundingClientRect();
        return {
          backgrounds: [carousel, window, track].map((element) => getComputedStyle(element).backgroundColor),
          cardWidth: cardBounds.width,
          viewportWidth: viewport.width,
          visibleNext,
          visibleNextRatio: visibleNext / viewport.width,
          documentWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
          dotsOverNavigation: dots.left < navigation.right && dots.right > navigation.left && dots.top < navigation.bottom && dots.bottom > navigation.top,
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
      expect(geometry.dotsOverNavigation, `${width}px carousel dots clear the fixed navigation`).toBe(false);
      if (width === 390) {
        expect(geometry.visibleNextRatio, "390px next-card hint is visible").toBeGreaterThanOrEqual(0.06);
        await page.locator("[data-selected-work]").screenshot({ path: path.join(outputRoot, "mobile-390-transparent-rail.png") });
      }
    }
  });

  test("all six landscape artboards retain project-specific copy, evidence, and one-card navigation", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await settle(page);
    const expectedHeadings = [
      "PRESAIRA",
      "OpportunityOS",
      "Oil Spill Detection",
      "Solar Site Selection",
      "Browse to fulfillment.",
      "Designing the whole journey with customer experience in mind, not isolated screens.",
    ];
    for (const [index, slug] of slugs.entries()) {
      await selectSlide(page, index);
      const slide = page.locator(`.selected-work-carousel-slide[data-project-slug="${slug}"]`);
      const card = slide.locator(".selected-work-carousel-artboard");
      const title = card.locator("[data-project-title]");
      if (["oil-spill-detection", "solar-site-selection", "makhbazy"].includes(slug)) {
        await expect(title).toHaveAccessibleName(expectedHeadings[index]);
      } else {
        await expect(title).toContainText(expectedHeadings[index]);
      }
      await expect(card.locator("[data-project-artboard]")).toBeVisible();
      const visibleCopy = await card.evaluate((element) => (element as HTMLElement).innerText);
      expect(visibleCopy, `${slug} visible card copy has no dash punctuation`).not.toMatch(/[—–-]/);
      await expect(card.locator("a")).toHaveCount(1);
      await expect(card.locator("a")).toHaveText("View case study ↗");
      await expect(card.locator("a")).toHaveAttribute("href", `/work/${slug}`);
    }

    const presaira = page.locator('.selected-work-carousel-slide[data-project-slug="presaira"]');
    await expect(presaira.locator('[data-artboard-node="scoreNumber"]')).toHaveAttribute("aria-label", "104 / 104");
    await expect(presaira.locator("[data-artboard-node=competitionRail]")).toContainText("PROOF RECORD");
    await expect(presaira.locator("[data-artboard-node=competitionRail]")).toContainText("ACTIVE");

    const opportunity = page.locator('.selected-work-carousel-slide[data-project-slug="opportunityos"]');
    await expect(opportunity.locator("[data-artboard-node=taxonomy]")).toContainText("SOURCES");
    await expect(opportunity.locator("[data-artboard-node=taxonomy]")).toContainText("AUTHORITY");
    await expect(opportunity.locator("[data-artboard-node=authorityGate]")).toContainText("SUFFICIENT EVIDENCE");
    await expect(opportunity.locator("[data-artboard-node=actionModes]")).toContainText("CONTROLLED SUBMIT");

    const oil = page.locator('.selected-work-carousel-slide[data-project-slug="oil-spill-detection"]');
    await expect(oil.locator("[data-artboard-node=detectedLabel]")).toContainText("DETECTED");
    await expect(oil.locator("[data-artboard-node=lookalikeLabel]")).toContainText("LOOKALIKE");
    await expect(oil.locator("[data-artboard-node=detectionContour] path")).toHaveCount(5);

    const solar = page.locator('.selected-work-carousel-slide[data-project-slug="solar-site-selection"]');
    await expect(solar.locator("[data-artboard-node=validatedMeasures]")).toContainText("12");
    await expect(solar.locator("[data-artboard-node=validatedMeasures]")).toContainText("AHP");
    await expect(solar.locator("[data-artboard-node=classLegend]")).toContainText("Most suitable");
    await expect(solar.locator("[data-artboard-node=classLegend]")).toContainText("Least suitable");
    await expect(solar).not.toContainText("320 GWh/yr");
    await expect(solar).not.toContainText("210 GWh/yr");

    const ghareeb = page.locator('.selected-work-carousel-slide[data-project-slug="ghareeb-oglu"]');
    await expect(ghareeb.locator('img[alt="Ghareeb Oglu official white and gold logo"]')).toBeVisible();
    await expect(ghareeb.locator("[data-artboard-node=commerceJourney]")).toContainText("FULFILLMENT");

    const makhbazy = page.locator('.selected-work-carousel-slide[data-project-slug="makhbazy"]');
    await expect(makhbazy.locator('img[alt="Makhbazy official light logo"]')).toBeVisible();
    await expect(makhbazy.locator("[data-artboard-node=journeyAbstraction]")).toContainText("DISCOVER");
    await expect(makhbazy.locator("[data-artboard-node=journeyAbstraction]")).toContainText("RECEIVE");
    await expect(makhbazy).not.toContainText("protected internal screens");
  });

  test("project path motion is limited to the active card and disabled for reduced motion", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await settle(page);
    const carousel = page.locator(".selected-work-carousel");
    await carousel.scrollIntoViewIfNeeded();
    const presaira = page.locator('[data-project-slug="presaira"] [data-project-artboard]');
    const oil = page.locator('[data-project-slug="oil-spill-detection"] [data-project-artboard]');
    await expect(presaira).toHaveAttribute("data-motion-active", "true");
    await expect(oil).not.toHaveAttribute("data-motion-active", "true");
    await carousel.getByRole("button", { name: "Go to project 3 of 6" }).click();
    await expect(carousel).toHaveAttribute("data-active-project", "oil-spill-detection");
    await expect(oil).toHaveAttribute("data-motion-active", "true");
    await expect(presaira).not.toHaveAttribute("data-motion-active", "true");

    await carousel.hover();
    await expect(carousel).toHaveAttribute("data-carousel-paused", "true");
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await page.mouse.move(10, 10);
    await expect(carousel).not.toHaveAttribute("data-carousel-paused", "true");

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await settle(page);
    await page.locator(".selected-work-carousel").scrollIntoViewIfNeeded();
    await expect(page.locator('[data-project-slug="presaira"] [data-project-artboard]'))
      .not.toHaveAttribute("data-motion-active", "true");
    await page.locator(".selected-work-carousel")
      .getByRole("button", { name: "Go to project 3 of 6" })
      .click();
    await expect(page.locator('[data-project-slug="oil-spill-detection"] [data-project-artboard]'))
      .not.toHaveAttribute("data-motion-active", "true");
  });

  test("active artboard shares a progressive transition anchor with its case study link", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.addInitScript(() => {
      window.addEventListener("pageswap", (event) => {
        if ((event as Event & { viewTransition?: unknown }).viewTransition) {
          sessionStorage.setItem("selected-work-cross-document-transition", "true");
        }
      });
    });
    await settle(page);
    const activeArtboard = page.locator('[data-project-slug="presaira"] [data-project-artboard]');
    await expect(activeArtboard).toHaveCSS("view-transition-name", "project-presaira");
    await expect(page.locator('[data-project-slug="opportunityos"] [data-project-artboard]'))
      .toHaveCSS("view-transition-name", "none");

    await page.locator('[data-project-slug="presaira"] [data-conversion="selected-work-to-case-study"]').click();
    await expect(page).toHaveURL(/\/work\/presaira$/);
    const destinationAnchor = page.locator(".case-hero-artboard-anchor");
    await expect(destinationAnchor).toHaveCSS("view-transition-name", "project-presaira");
    await expect(destinationAnchor).toBeVisible();
    const supportsCrossDocumentViewTransitions = await page.evaluate(() => "onpageswap" in window);
    if (supportsCrossDocumentViewTransitions) {
      await expect.poll(() => page.evaluate(() => sessionStorage.getItem("selected-work-cross-document-transition"))).toBe("true");
    }

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await page.locator('[data-project-slug="presaira"] [data-conversion="selected-work-to-case-study"]').click();
    await expect(page).toHaveURL(/\/work\/presaira$/);
  });

  test("desktop and tablet section geometry stays in bounds at every review width", async ({ page }) => {
    for (const width of [768, 900, 1024, 1280, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      await settle(page);
      const metrics = await page.locator(".selected-work-carousel-artboard").first().evaluate((card) => {
        const box = card.getBoundingClientRect();
        const evidence = card.querySelector<HTMLElement>("[data-evidence-region]")!.getBoundingClientRect();
        const window = document.querySelector<HTMLElement>(".selected-work-carousel-window")!;
        const windowStyle = getComputedStyle(window);
        return {
          viewportWidth: document.documentElement.clientWidth,
          documentWidth: document.documentElement.scrollWidth,
          cardWidth: box.width,
          cardHeight: box.height,
          evidenceHeight: evidence.height,
          railBackground: windowStyle.backgroundColor,
          railBorderWidth: windowStyle.borderWidth,
        };
      });
      expect(metrics.documentWidth, `${width}px document overflow`).toBeLessThanOrEqual(metrics.viewportWidth + 1);
      expect(metrics.cardWidth, `${width}px card width`).toBeLessThan(2000);
      expect(metrics.evidenceHeight, `${width}px evidence area`).toBeGreaterThan(0);
      expect(metrics.railBackground, `${width}px artboards have no dark rail`).toBe("rgba(0, 0, 0, 0)");
      expect(metrics.railBorderWidth, `${width}px artboards have no frame`).toBe("0px");
      await page.locator("[data-selected-work]").screenshot({
        path: path.join(outputRoot, `selected-work-${width}.png`),
      });
    }
  });

  test("mobile header uses the safe-area top and removes retired dock padding", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await settle(page);
    const values = await page.evaluate(() => {
      const wrap = document.querySelector<HTMLElement>(".site-nav-wrap")!;
      const nav = document.querySelector<HTMLElement>(".site-nav")!;
      const bounds = wrap.getBoundingClientRect();
      return {
        position: getComputedStyle(wrap).position,
        headerTop: bounds.top,
        headerHeight: nav.getBoundingClientRect().height,
        computedBottom: getComputedStyle(wrap).bottom,
        bodyPadding: getComputedStyle(document.body).paddingBottom,
      };
    });
    expect(values.position).toBe("fixed");
    expect(values.headerTop).toBeGreaterThanOrEqual(0);
    expect(values.headerTop).toBeLessThan(40);
    expect(values.headerHeight).toBeGreaterThanOrEqual(56);
    expect(values.computedBottom).not.toBe("12px");
    expect(Number.parseFloat(values.bodyPadding)).toBeLessThanOrEqual(1);
  });

  test("active carousel dot reads as a stationary countdown ring", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await settle(page);
    const carousel = page.locator(".selected-work-carousel");
    await carousel.scrollIntoViewIfNeeded();
    const active = carousel.locator(".carousel-dot.is-active");
    await active.focus();
    await expect(carousel).toHaveAttribute("data-carousel-paused", "true");
    const initial = await active.evaluate((element) => {
      const style = getComputedStyle(element, "::after");
      const button = element.getBoundingClientRect();
      return {
        animation: style.animationName,
        progress: Number.parseFloat(getComputedStyle(element).getPropertyValue("--carousel-progress")),
        background: style.backgroundImage,
        ringInset: style.inset,
        hitTarget: button.width,
      };
    });
    await page.waitForTimeout(350);
    const frozen = await active.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).getPropertyValue("--carousel-progress")),
    );
    expect(frozen).toBe(initial.progress);
    await page.evaluate(() => (document.activeElement as HTMLElement | null)?.blur());
    await expect(carousel).not.toHaveAttribute("data-carousel-paused", "true");
    await page.waitForFunction(() => Number.parseFloat(
      getComputedStyle(document.querySelector(".carousel-dot.is-active")!).getPropertyValue("--carousel-progress"),
    ) > 0);
    const resumed = await active.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).getPropertyValue("--carousel-progress")),
    );
    await page.waitForTimeout(350);
    const progress = await active.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).getPropertyValue("--carousel-progress")),
    );
    expect(initial.animation).toBe("none");
    expect(initial.background).toContain("conic-gradient");
    expect(initial.progress).toBeGreaterThanOrEqual(0);
    expect(progress).toBeGreaterThan(resumed);
    expect(initial.ringInset).toBe("8px");
    expect(initial.hitTarget).toBeGreaterThanOrEqual(44);
  });

  test("mobile artboard geometry remains landscape and contained at narrow and wide phone widths", async ({
    page,
  }) => {
    const records = [];
    for (const width of [320, 360, 375, 412, 430, 480]) {
      await page.setViewportSize({ width, height: 844 });
      await settle(page);
      const sample = await page.locator(".selected-work-carousel-artboard").first().evaluate((card) => {
        const artboard = card.querySelector<HTMLElement>("[data-project-artboard]")!;
        const evidence = card.querySelector<HTMLElement>("[data-evidence-region]")!;
        const bounds = card.getBoundingClientRect();
        const artboardBounds = artboard.getBoundingClientRect();
        return {
          cardWidth: bounds.width,
          cardHeight: bounds.height,
          evidenceHeight: evidence.getBoundingClientRect().height,
          aspectRatio: artboardBounds.width / artboardBounds.height,
          artboardHeight: artboardBounds.height,
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: document.documentElement.clientWidth,
        };
      });
      records.push({ width, ...sample });
      expect(sample.documentWidth, `${width}px page overflow`).toBeLessThanOrEqual(sample.viewportWidth + 1);
      expect(sample.aspectRatio, `${width}px artboard is landscape`).toBeCloseTo(1.55, 1);
      expect(sample.evidenceHeight, `${width}px artboard fills its visual frame`).toBeCloseTo(sample.artboardHeight, 1);
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
