import { expect, test } from "@playwright/test";

const organizations = [
  "Network International",
  "Al Tayseer International",
  "Orcas",
  "NARSS",
  "Zewail City",
  "Databricks",
  "McKinsey Forward",
  "Canadian International College",
  "ExploreAI / ALX",
];

test.describe("Surgical pass 03 first chapter closeout", () => {
  test("uses verified relationship titles, keeps captions aligned and restores native Network colors", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    const items = page
      .locator(".credibility-sequence")
      .first()
      .locator(".credibility-brand-item");
    await expect(items).toHaveCount(9);
    await expect(
      items.evaluateAll((nodes) =>
        nodes.map((node) => ({
          organization: node.getAttribute("data-organization"),
          caption: node
            .querySelector(".relationship-caption")
            ?.textContent?.trim(),
          width:
            node.querySelector(".relationship-caption strong")?.clientWidth ??
            0,
          scrollWidth:
            node.querySelector(".relationship-caption strong")?.scrollWidth ??
            0,
          top:
            node.querySelector(".relationship-caption")?.getBoundingClientRect()
              .top ?? 0,
        })),
      ),
    ).resolves.toEqual([
      {
        organization: organizations[0],
        caption: "Data Engineer",
        width: expect.any(Number),
        scrollWidth: expect.any(Number),
        top: expect.any(Number),
      },
      {
        organization: organizations[1],
        caption: "Business Analyst Team Lead",
        width: expect.any(Number),
        scrollWidth: expect.any(Number),
        top: expect.any(Number),
      },
      {
        organization: organizations[2],
        caption: "Private Tutor · Computer Science & Data",
        width: expect.any(Number),
        scrollWidth: expect.any(Number),
        top: expect.any(Number),
      },
      {
        organization: organizations[3],
        caption: "Data / ML Intern",
        width: expect.any(Number),
        scrollWidth: expect.any(Number),
        top: expect.any(Number),
      },
      {
        organization: organizations[4],
        caption: "ML Intern",
        width: expect.any(Number),
        scrollWidth: expect.any(Number),
        top: expect.any(Number),
      },
      {
        organization: organizations[5],
        caption: "Certified Data Engineer Associate",
        width: expect.any(Number),
        scrollWidth: expect.any(Number),
        top: expect.any(Number),
      },
      {
        organization: organizations[6],
        caption: "Foundation & Advanced",
        width: expect.any(Number),
        scrollWidth: expect.any(Number),
        top: expect.any(Number),
      },
      {
        organization: organizations[7],
        caption: "BSc Computer Science · Data Science Major",
        width: expect.any(Number),
        scrollWidth: expect.any(Number),
        top: expect.any(Number),
      },
      {
        organization: organizations[8],
        caption: "Data Science & AI Scholarship",
        width: expect.any(Number),
        scrollWidth: expect.any(Number),
        top: expect.any(Number),
      },
    ]);
    const geometry = await items
      .locator(".relationship-caption strong")
      .evaluateAll((nodes) =>
        nodes.map((node) => ({
          width: node.clientWidth,
          scrollWidth: node.scrollWidth,
          top: node.getBoundingClientRect().top,
        })),
      );
    expect(
      geometry.every((caption) => caption.scrollWidth <= caption.width),
    ).toBeTruthy();
    expect(
      Math.max(...geometry.map((caption) => caption.top)) -
        Math.min(...geometry.map((caption) => caption.top)),
    ).toBeLessThanOrEqual(2);

    const networkLogo = items.first().locator("img");
    const colors = await networkLogo.evaluate(async (node) => {
      const image = node as HTMLImageElement;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d")!;
      context.drawImage(image, 0, 0);
      const rgba = context.getImageData(0, 0, canvas.width, canvas.height).data;
      let blue = 0;
      let red = 0;
      let transparent = 0;
      for (let index = 0; index < rgba.length; index += 4) {
        if (rgba[index + 3] === 0) transparent++;
        if (rgba[index + 3] > 180 && rgba[index + 2] > rgba[index] * 1.35)
          blue++;
        if (rgba[index + 3] > 180 && rgba[index] > rgba[index + 2] * 1.35)
          red++;
      }
      return {
        blue,
        red,
        transparent,
        filter: getComputedStyle(image).filter,
        opacity: getComputedStyle(image).opacity,
      };
    });
    expect(colors.blue).toBeGreaterThan(100);
    expect(colors.red).toBeGreaterThan(10);
    expect(colors.filter).toBe("none");
    expect(colors.opacity).toBe("1");
  });

  test("desktop tooltip follows the pointer, stays outside clipping, and supports focus for all nine source items", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const track = page.locator(".credibility-track");
    await expect(track).toHaveAttribute("data-loop-ready", "true");
    await track.evaluate((node) =>
      node.getAnimations().forEach((animation) => animation.pause()),
    );
    const sourceItems = page
      .locator(
        '.credibility-sequence:not([aria-hidden="true"]) .credibility-brand-item',
      )
      .evaluateAll((nodes) =>
        nodes.slice(0, 9).map((node) => node.getAttribute("data-organization")),
      );
    await expect(sourceItems).resolves.toEqual(organizations);

    for (const organization of organizations) {
      const direct = page
        .locator(
          `.credibility-sequence:not([aria-hidden="true"]) .credibility-brand-item[data-organization="${organization}"]`,
        )
        .first();
      const index = organizations.indexOf(organization);
      await track.evaluate((node, itemIndex) => {
        const trackNode = node as HTMLElement;
        const items = [
          ...trackNode.querySelectorAll<HTMLElement>(
            '.credibility-sequence:not([aria-hidden="true"]) .credibility-brand-item',
          ),
        ].slice(0, 9);
        const firstLeft = items[0].getBoundingClientRect().left;
        const targetLeft = items[itemIndex].getBoundingClientRect().left;
        trackNode.style.animation = "none";
        trackNode.style.transform = `translateX(${firstLeft - targetLeft - 10}px)`;
      }, index);
      await direct.hover();
      const tooltip = page.getByRole("tooltip");
      await expect(tooltip).toHaveText(organization);
      const initialTooltipBox = await tooltip.evaluate((node) =>
        node.getBoundingClientRect().toJSON(),
      );
      const itemRect = await direct.evaluate((node) =>
        node.getBoundingClientRect().toJSON(),
      );
      expect(initialTooltipBox.x).toBeGreaterThanOrEqual(0);
      expect(initialTooltipBox.y).toBeGreaterThanOrEqual(0);
      expect(initialTooltipBox.right).toBeLessThanOrEqual(1440);
      expect(initialTooltipBox.bottom).toBeLessThanOrEqual(900);
      expect(
        await tooltip.evaluate((node) => node.parentElement === document.body),
      ).toBeTruthy();
      const pointer = {
        x: itemRect.x + itemRect.width * 0.72,
        y: itemRect.y + itemRect.height * 0.42,
      };
      await page.mouse.move(pointer.x, pointer.y);
      const moved = await tooltip.evaluate((node) =>
        node.getBoundingClientRect().toJSON(),
      );
      expect(moved.left).toBeGreaterThanOrEqual(0);
      expect(Math.abs(moved.left - initialTooltipBox.left)).toBeGreaterThan(5);
      expect(moved.left).toBeCloseTo(
        Math.min(1440 - moved.width - 8, Math.max(8, pointer.x + 14)),
        0,
      );
      expect(
        await tooltip.evaluate((node) => node.parentElement === document.body),
      ).toBeTruthy();
      await direct.evaluate((node: HTMLElement) => node.focus());
      await expect(tooltip).toHaveText(organization);
      await page.mouse.move(0, 0);
      await expect(tooltip).toHaveCount(0);
    }
  });

  test("ambient field has intentional desktop and mobile density, rail continuity and reduced motion", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const desktop = await page
      .locator("[data-ambient-item]")
      .evaluateAll((nodes) => ({
        visible: nodes.filter(
          (node) => getComputedStyle(node).display !== "none",
        ).length,
        icons: nodes.filter(
          (node) =>
            node.classList.contains("hero-ambient-icon") &&
            getComputedStyle(node).display !== "none",
        ).length,
        rail: document.querySelectorAll(
          ".is-rail-continuation [data-ambient-item]",
        ).length,
      }));
    expect(desktop.visible).toBeGreaterThanOrEqual(40);
    expect(desktop.visible).toBeLessThanOrEqual(55);
    expect(desktop.icons).toBeGreaterThanOrEqual(35);
    expect(desktop.rail).toBeGreaterThan(0);
    expect(
      await page
        .locator(".hero-ambient-field")
        .first()
        .getAttribute("aria-hidden"),
    ).toBe("true");

    await page.setViewportSize({ width: 390, height: 844 });
    await page.reload();
    const mobile = await page
      .locator("[data-ambient-item]")
      .evaluateAll((nodes) => ({
        visible: nodes.filter(
          (node) => getComputedStyle(node).display !== "none",
        ).length,
        icons: nodes.filter(
          (node) =>
            node.classList.contains("hero-ambient-icon") &&
            getComputedStyle(node).display !== "none",
        ).length,
        mobileCoordinates: nodes
          .filter((node) => getComputedStyle(node).display !== "none")
          .every(
            (node) =>
              getComputedStyle(node).left !== "auto" &&
              getComputedStyle(node).top !== "auto",
          ),
      }));
    expect(mobile.visible).toBe(26);
    expect(mobile.icons).toBe(20);
    expect(mobile.mobileCoordinates).toBeTruthy();

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    const animated = await page
      .locator(".hero-ambient-orbit")
      .evaluateAll((nodes) =>
        nodes.map((node) => getComputedStyle(node).animationName),
      );
    expect(animated.every((name) => name === "none")).toBeTruthy();
  });

  test("captures first-chapter viewport evidence and reports final vertical rhythm", async ({
    page,
  }, testInfo) => {
    const metrics: Record<number, Record<string, number>> = {};
    for (const width of [320, 360, 390, 430, 480, 1440, 1920]) {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 1000 });
      await page.goto("/");
      await expect(page.locator(".credibility-track")).toHaveAttribute(
        "data-loop-ready",
        "true",
      );
      metrics[width] = await page.evaluate(() => {
        const box = (selector: string) =>
          document
            .querySelector<HTMLElement>(selector)!
            .getBoundingClientRect();
        const meta = box(".overhaul-hero-meta");
        const name = box(".overhaul-hero-title");
        const roles = box(".overhaul-hero-roles");
        const proposition = box(".overhaul-hero-proposition");
        const cta = box(".overhaul-hero-actions");
        return {
          metadataToName: Math.round(name.top - meta.bottom),
          nameToRoles: Math.round(roles.top - name.bottom),
          rolesToProposition: Math.round(proposition.top - roles.bottom),
          propositionToCta: Math.round(cta.top - proposition.bottom),
          documentOverflow:
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth,
        };
      });
      await page.screenshot({
        path: testInfo.outputPath(`home-${width}.png`),
        fullPage: true,
        animations: "disabled",
      });
    }
    expect(metrics[390].documentOverflow).toBeLessThanOrEqual(1);
    expect(metrics[1440].documentOverflow).toBeLessThanOrEqual(1);
    console.info(
      `Pass 03 hero spacing metrics: ${JSON.stringify({ 390: metrics[390], 1440: metrics[1440] })}`,
    );
  });
});
