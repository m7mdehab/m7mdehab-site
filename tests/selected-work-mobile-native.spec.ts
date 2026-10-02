import { devices, expect, test, webkit } from "@playwright/test";

const projects = [
  "presaira",
  "opportunityos",
  "oil-spill-detection",
  "solar-site-selection",
  "ghareeb-oglu",
  "makhbazy",
] as const;

const mobileWidths = [320, 360, 375, 390, 412, 430, 480];

async function oneLineFailures(page: import("@playwright/test").Page) {
  return page.locator("[data-mobile-one-line]").evaluateAll((elements) =>
    elements.flatMap((element) => {
      const node = element as HTMLElement;
      if (!node.getClientRects().length) return [];
      const containingSlide = node.closest("article[data-project-slug]");
      if (containingSlide?.getAttribute("aria-hidden") === "true") return [];
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
      const textRects: DOMRect[] = [];
      while (walker.nextNode()) {
        const range = document.createRange();
        range.selectNodeContents(walker.currentNode);
        textRects.push(...range.getClientRects());
      }
      const sortedLineTops = textRects
        .map((rect) => rect.top + rect.height / 2)
        .sort((a, b) => a - b);
      const lineTops = sortedLineTops.reduce<number[]>((groups, baseline) => {
        if (!groups.length || baseline - groups[groups.length - 1] > 3) groups.push(baseline);
        return groups;
      }, []);
      const width = node.getBoundingClientRect().width;
      return lineTops.length !== 1 || node.scrollWidth > width + 1
        ? [{
            label: node.dataset.mobileOneLine?.trim() && node.dataset.mobileOneLine !== "true"
              ? node.dataset.mobileOneLine.trim()
              : node.innerText?.trim(),
            lines: lineTops.length,
            width,
            scrollWidth: node.scrollWidth,
          }]
        : [];
    }),
  );
}

test.describe("Selected Work native mobile composition", () => {
  test("keeps copy on one line, landscape cards, CTA-only navigation and no page overflow at phone widths", async ({ page }) => {
    test.setTimeout(180_000);
    await page.goto("/");
    const section = page.locator("[data-selected-work]");
    await section.scrollIntoViewIfNeeded();

    for (const width of mobileWidths) {
      await page.setViewportSize({ width, height: 860 });
      await expect(page.locator('[data-mobile-one-line="section-heading"]')).toBeVisible();
      await expect(page.locator('[data-mobile-one-line="section-supporting-copy"]')).toBeVisible();
      await expect(page.locator('[data-mobile-one-line="section-heading"]')).toHaveText(
        "Six projects. One standard.",
      );
      await expect(page.locator('[data-mobile-one-line="section-supporting-copy"]')).toHaveText(
        "Each project is backed by a full case study and inspectable evidence.",
      );
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
        `horizontal page overflow at ${width}px`,
      ).toBe(true);

      for (const [index, slug] of projects.entries()) {
        const dot = page.locator(".carousel-dot").nth(index);
        await dot.click();
        await expect(page.locator(".selected-work-carousel")).toHaveAttribute(
          "data-active-project",
          slug,
        );
        await expect(dot).toHaveAttribute("aria-current", "step");
        const artboard = page.locator(`[data-project-artboard="${slug}"]`);
        const dimensions = await artboard.evaluate((element) => {
          const { width: cardWidth, height: cardHeight } = element.getBoundingClientRect();
          return { cardWidth, cardHeight, ratio: cardWidth / cardHeight };
        });
        expect(dimensions.ratio, `${slug} ratio at ${width}px`).toBeGreaterThan(1.5);
        expect(dimensions.ratio, `${slug} ratio at ${width}px`).toBeLessThan(1.6);
        const slide = page.locator(`article[data-project-slug="${slug}"]`);
        await expect(slide).not.toHaveAttribute("href", /.+/);
        await expect(slide.locator("a")).toHaveCount(1);
        const cta = artboard.locator('[data-conversion="selected-work-to-case-study"]');
        await expect(cta).toContainText("View case study");
        expect(await cta.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThanOrEqual(44);
        await expect(page.locator('[data-motion-active="true"]')).toHaveCount(1);
        await expect(page.locator(`[data-project-artboard="${slug}"][data-motion-active="true"]`)).toHaveCount(1);
        if (slug === "solar-site-selection") await page.waitForTimeout(3_200);
        expect(await oneLineFailures(page), `${slug} one-line copy at ${width}px`).toEqual([]);
      }
    }
  });

  test("keeps accepted desktop proof, diagrams and supporting details present in each mobile artboard", async ({ page }) => {
    test.setTimeout(90_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.locator("[data-selected-work]").scrollIntoViewIfNeeded();
    const activate = async (index: number, slug: string) => {
      await page.locator(".carousel-dot").nth(index).click();
      const artboard = page.locator(`[data-project-artboard="${slug}"]`);
      await expect(artboard).toBeVisible();
      return artboard;
    };

    const presaira = await activate(0, "presaira");
    await expect(presaira.locator("[data-mobile-required='presaira-calibration-chart'] svg[role='img']")).toBeVisible();
    await expect(presaira.locator("[data-mobile-required='presaira-match-proof']")).toContainText("World Cup matches scored");
    await expect(presaira.locator("[data-mobile-required='presaira-match-proof']")).toContainText("UCL 2026/27");
    await expect(presaira.locator("[data-mobile-required='presaira-match-proof']")).toContainText("COMING SOON");
    await expect(presaira.locator("[data-mobile-required='presaira-competition-rail']")).toContainText("WORLD CUP 2026");
    await expect(presaira.locator("[data-mobile-required='presaira-competition-rail'] [data-status-node]")).toHaveCount(4);

    const opportunity = await activate(1, "opportunityos");
    await expect(opportunity.locator("[data-flow-stage]")).toHaveCount(5);
    await expect(opportunity.locator("[data-flow-stage] > span")).toHaveCount(5);
    await expect(opportunity.locator("[data-artboard-node='authorityGate']")).toContainText("AUTHORITY GATE");
    await expect(opportunity.locator("[data-artboard-node='authorityGate']")).toContainText("SUFFICIENT EVIDENCE");
    await expect(opportunity.locator("[data-artboard-node='authorityGate']")).toContainText("VALID AUTHORITY");
    await expect(opportunity.locator("[data-artboard-node='authorityGate']")).toContainText("ALLOWED ACTION");
    const gateGeometry = await opportunity.evaluate((board) => {
      const svg = board.querySelector("[data-artboard-node='truthFlow'] svg");
      const circles = [...(svg?.querySelectorAll("circle") ?? [])].map((circle) => {
        const rect = circle.getBoundingClientRect();
        return rect.left + rect.width / 2;
      });
      const nodes = [...board.querySelectorAll("[data-flow-stage]")].map((node) => {
        const rect = node.getBoundingClientRect();
        return rect.left + rect.width / 2;
      });
      return circles.map((center, index) => Math.abs(center - nodes[index]));
    });
    expect(gateGeometry.length).toBe(5);
    expect(gateGeometry.every((delta) => delta < 1)).toBe(true);
    const checkInsideGate = await opportunity.locator("[data-artboard-node='truthFlow'] svg").evaluate((svg) => {
      const circles = svg.querySelectorAll("circle");
      const circle = circles[circles.length - 1].getBoundingClientRect();
      const check = svg.querySelector("[data-gate-check]")?.getBoundingClientRect();
      return Boolean(check && check.left >= circle.left && check.right <= circle.right && check.top >= circle.top && check.bottom <= circle.bottom);
    });
    expect(checkInsideGate).toBe(true);
    const modesBox = await opportunity.locator("[data-artboard-node='actionModes']").boundingBox();
    const ctaBox = await opportunity.locator("[data-conversion='selected-work-to-case-study']").boundingBox();
    expect(modesBox && ctaBox && (
      modesBox.x + modesBox.width <= ctaBox.x ||
      ctaBox.x + ctaBox.width <= modesBox.x ||
      modesBox.y + modesBox.height <= ctaBox.y ||
      ctaBox.y + ctaBox.height <= modesBox.y
    )).toBe(true);

    const oil = await activate(2, "oil-spill-detection");
    await expect(oil.locator("[data-mobile-one-line='oil-lookalike']")).toBeVisible();
    await expect(oil.locator("[data-mobile-one-line='oil-lookalike']")).toContainText("LOOKALIKE");
    await expect(oil.locator("[data-mobile-one-line='oil-detected-label']")).toContainText("OIL SPILL");

    const solar = await activate(3, "solar-site-selection");
    await expect(solar.locator("[data-mobile-required='solar-workflow']")).toBeVisible();
    await expect(solar.locator("[data-mobile-required='solar-workflow']")).toContainText("DRAW");
    await expect(solar.locator("[data-mobile-required='solar-workflow']")).toContainText("ANALYZE");
    await expect(solar.locator("[data-mobile-required='solar-workflow']")).toContainText("RANK");
    await expect(solar.locator("[data-mobile-required='solar-workflow']")).toContainText("REPORT");
    await expect(solar.locator("[data-mobile-required='solar-legend']")).toBeVisible();
    await expect(solar.getByRole("group", { name: "AHP consistency checks" })).toBeVisible();
    await page.waitForTimeout(3_200);
    const candidateBoxes = await solar.locator("[data-candidate-callout]").evaluateAll((nodes) => nodes.map((node) => {
      const rect = node.getBoundingClientRect();
      return { left: rect.left, right: rect.right, top: rect.top, bottom: rect.bottom, opacity: Number.parseFloat(getComputedStyle(node).opacity) };
    }));
    expect(candidateBoxes).toHaveLength(3);
    expect(candidateBoxes.every((box) => box.opacity > 0.95)).toBe(true);
    for (let i = 0; i < candidateBoxes.length; i++) for (let j = i + 1; j < candidateBoxes.length; j++) {
      const a = candidateBoxes[i];
      const b = candidateBoxes[j];
      expect(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top).toBe(true);
    }

    const ghareeb = await activate(4, "ghareeb-oglu");
    await expect(ghareeb.locator("[data-mobile-one-line='ghareeb-subtitle']")).toHaveText("An end to end commerce product from storefront to delivery.");
    await expect(ghareeb.locator("[data-stage-anchor]")).toHaveCount(4);
    await expect(ghareeb.locator("[data-mobile-one-line='ghareeb-capabilities']")).toContainText("STOREFRONT");
    const journeyGeometry = await ghareeb.evaluate((board) => {
      const svg = board.querySelector("[data-commerce-node]")?.closest("svg");
      const centers = [...(svg?.querySelectorAll("circle") ?? [])].map((circle) => {
        const rect = circle.getBoundingClientRect();
        return rect.left + rect.width / 2;
      });
      return [...board.querySelectorAll("[data-stage-anchor]")].map((node, index) => {
        const rect = node.getBoundingClientRect();
        return Math.abs(rect.left + rect.width / 2 - centers[index]);
      });
    });
    expect(journeyGeometry.every((delta) => delta < 1)).toBe(true);

    const makhbazy = await activate(5, "makhbazy");
    await expect(makhbazy.locator("[data-mobile-required='makhbazy-statement']")).toContainText("Designing the whole journey");
    await expect(makhbazy.locator("[data-mobile-required='makhbazy-statement']")).toContainText("not isolated screens.");
    await expect(makhbazy.locator("[data-stage-anchor]")).toHaveCount(4);
    await expect(makhbazy.locator("[data-mobile-required='makhbazy-utilities']")).toContainText("Repeat ordering");
    await expect(makhbazy.locator("[data-mobile-required='makhbazy-utilities']")).toContainText("Support when needed");
    await expect(makhbazy.locator("[data-mobile-required='makhbazy-utilities']")).toContainText("Invoices and history");
    await expect(makhbazy.locator("[data-mobile-required='makhbazy-capabilities']")).toContainText("UI/UX Design");
    await expect(makhbazy.locator("[data-mobile-required='makhbazy-capabilities']")).toContainText("Product Leadership");
    await expect(makhbazy.locator("[data-mobile-required='makhbazy-capabilities']")).toContainText("Implementation Supervision");
    await expect(makhbazy.locator("[data-mobile-required='makhbazy-capabilities']")).toContainText("Android + iOS");
    const phoneRatios = await makhbazy.locator("[data-phone-screen]").evaluateAll((phones) => phones.map((phone) => {
      const rect = phone.getBoundingClientRect();
      return rect.height / rect.width;
    }));
    expect(phoneRatios).toHaveLength(4);
    expect(phoneRatios.every((ratio) => ratio > 1.45 && ratio < 2.1)).toBe(true);
    const mobileNodeGeometry = await makhbazy.evaluate((board) => {
      const nodes = [...board.querySelectorAll("[data-mobile-action-node]")];
      const glyphs = [...board.querySelectorAll("[data-stage-anchor] > svg")];
      return nodes.map((node, index) => {
        const nodeRect = node.getBoundingClientRect();
        const glyphRect = glyphs[index].getBoundingClientRect();
        return Math.max(
          Math.abs(nodeRect.left + nodeRect.width / 2 - (glyphRect.left + glyphRect.width / 2)),
          Math.abs(nodeRect.top + nodeRect.height / 2 - (glyphRect.top + glyphRect.height / 2)),
        );
      });
    });
    expect(mobileNodeGeometry).toHaveLength(4);
    expect(mobileNodeGeometry.every((delta) => delta < 1)).toBe(true);
  });

  test("supports touch-like drag, reveals all Solar ranks once, and renders static under reduced motion", async ({ page }) => {
    test.setTimeout(60_000);
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const section = page.locator("[data-selected-work]");
    await section.scrollIntoViewIfNeeded();
    const viewport = page.locator(".selected-work-carousel-window-artboards");
    const box = await viewport.boundingBox();
    if (!box) throw new Error("Selected Work carousel viewport is missing");
    await page.mouse.move(box.x + box.width * 0.82, box.y + box.height * 0.5);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width * 0.18, box.y + box.height * 0.5, { steps: 12 });
    await page.mouse.up();
    await expect(page.locator(".selected-work-carousel")).toHaveAttribute(
      "data-active-project",
      "opportunityos",
    );
    await page.locator(".carousel-dot").nth(3).click();
    await expect(page.locator(".selected-work-carousel")).toHaveAttribute(
      "data-active-project",
      "solar-site-selection",
    );
    await expect(page.locator("[data-candidate-callout]")).toHaveCount(3);
    await page.waitForTimeout(3_200);
    const ranks = await page.locator("[data-candidate-callout]").evaluateAll(
      (nodes) => nodes.map((node) => ({
        text: node.querySelector("b")?.textContent?.trim(),
        opacity: Number.parseFloat(getComputedStyle(node).opacity),
      })),
    );
    expect(ranks.map((rank) => rank.text)).toEqual(["#01", "#02", "#03"]);
    expect(ranks.every((rank) => rank.opacity > 0.95)).toBe(true);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.locator(".carousel-dot").nth(1).click();
    await expect(page.locator('[data-project-artboard="opportunityos"]')).toBeVisible();
    await expect(page.locator('[data-motion-active="true"]')).toHaveCount(0);
    const nav = page.locator(".site-nav-wrap");
    const navMetrics = await nav.evaluate((element) => {
      const box = element.getBoundingClientRect();
      return { bottom: box.bottom, viewport: window.innerHeight, position: getComputedStyle(element).position };
    });
    expect(navMetrics.position).toBe("fixed");
    expect(navMetrics.viewport - navMetrics.bottom).toBeGreaterThanOrEqual(12);
    await page.locator('[data-project-artboard="opportunityos"] [data-conversion="selected-work-to-case-study"]').click();
    await expect(page).toHaveURL(/\/work\/opportunityos$/);
  });

  test("Chrome Android profile keeps Selected Work within the viewport", async ({ browser }) => {
    const context = await browser.newContext({
      ...devices["Pixel 7"],
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto("/");
    await page.locator("[data-selected-work]").scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      await page.evaluate(() => window.innerWidth),
    );
    for (const [index, slug] of projects.entries()) {
      await page.locator(".carousel-dot").nth(index).click();
      await expect(page.locator(".selected-work-carousel")).toHaveAttribute(
        "data-active-project",
        slug,
      );
      const ratio = await page.locator(`[data-project-artboard="${slug}"]`).evaluate((element) => {
        const box = element.getBoundingClientRect();
        return box.width / box.height;
      });
      expect(ratio).toBeGreaterThan(1.5);
      expect(ratio).toBeLessThan(1.6);
    }
    await context.close();
  });

  test("iPhone WebKit keeps the rail, one-line labels and fixed navigation safe", async () => {
    const browser = await webkit.launch();
    const context = await browser.newContext({
      ...devices["iPhone 13"],
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();
    await page.goto("/");
    await page.locator("[data-selected-work]").scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      await page.evaluate(() => window.innerWidth),
    );
    for (const [index, slug] of projects.entries()) {
      await page.locator(".carousel-dot").nth(index).click();
      await expect(page.locator(".selected-work-carousel")).toHaveAttribute(
        "data-active-project",
        slug,
      );
      if (slug === "solar-site-selection") await page.waitForTimeout(3_200);
      expect(await oneLineFailures(page), `${slug} iPhone copy`).toEqual([]);
    }
    const navMetrics = await page.locator(".site-nav-wrap").evaluate((element) => {
      const box = element.getBoundingClientRect();
      return { bottom: box.bottom, viewport: window.innerHeight, position: getComputedStyle(element).position };
    });
    expect(navMetrics.position).toBe("fixed");
    expect(navMetrics.viewport - navMetrics.bottom).toBeGreaterThanOrEqual(12);
    await context.close();
    await browser.close();
  });

  test("desktop keeps its landscape artboard geometry and one-line section heading", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    await page.emulateMedia({ reducedMotion: "reduce" });
    const section = page.locator("[data-selected-work]");
    await section.scrollIntoViewIfNeeded();
    await expect(page.locator('[data-mobile-one-line="section-heading"]')).toHaveText(
      "Six projects. One standard.",
    );
    await expect(page.locator(".selected-work-intro-desktop")).toHaveText(
      "Each project opens to a full case study with inspectable evidence.",
    );
    for (const slug of projects) {
      await page.locator(".carousel-dot").nth(projects.indexOf(slug)).click();
      const ratio = await page.locator(`[data-project-artboard="${slug}"]`).evaluate((element) => {
        const box = element.getBoundingClientRect();
        return box.width / box.height;
      });
      expect(ratio, `${slug} desktop artboard ratio`).toBeGreaterThan(1.79);
      expect(ratio, `${slug} desktop artboard ratio`).toBeLessThan(1.81);
    }
  });
});
