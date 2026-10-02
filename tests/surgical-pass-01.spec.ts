import { expect, test } from "@playwright/test";

const mobileWidths = [320, 360, 375, 390, 412, 430, 480] as const;

test.describe("Surgical pass 01 homepage identity and navigation", () => {
  test("mobile name, five-role line and dock fit each target width", async ({
    page,
  }) => {
    for (const width of mobileWidths) {
      await page.setViewportSize({ width, height: 844 });
      await page.goto("/");
      await page.evaluate(() => document.fonts.ready);

      const metrics = await page.evaluate(() => {
        const box = (selector: string) => {
          const node = document.querySelector<HTMLElement>(selector)!;
          const rect = node.getBoundingClientRect();
          return {
            width: rect.width,
            height: rect.height,
            top: rect.top,
            fontSize: Number.parseFloat(getComputedStyle(node).fontSize),
            lineHeight: Number.parseFloat(getComputedStyle(node).lineHeight),
            bottom: rect.bottom,
          };
        };
        return {
          documentWidth: document.documentElement.scrollWidth,
          hero: box(".overhaul-hero"),
          name: box(".overhaul-hero-signature"),
          title: box(".overhaul-hero-title"),
          roles: box(".overhaul-hero-roles"),
          proposition: box(".overhaul-hero-proposition"),
          dock: box(".site-nav"),
          rail: box(".credibility-rail"),
          visibleIcons: [
            ...document.querySelectorAll<HTMLElement>(".hero-ambient-icon"),
          ].filter((node) => getComputedStyle(node).display !== "none").length,
        };
      });

      expect(metrics.documentWidth, `${width}px page overflow`).toBe(width);
      expect(metrics.hero.height, `${width}px content-led hero`).toBeLessThan(
        844 * 0.8,
      );
      expect(
        metrics.name.width / metrics.hero.width,
        `${width}px name width`,
      ).toBeGreaterThanOrEqual(0.87);
      expect(
        metrics.name.width / metrics.hero.width,
        `${width}px name width`,
      ).toBeLessThan(1);
      expect(
        metrics.name.width,
        `${width}px name fits inside heading`,
      ).toBeLessThanOrEqual(metrics.title.width);
      expect(metrics.roles.height, `${width}px role row`).toBeLessThanOrEqual(
        metrics.roles.lineHeight + 1,
      );
      expect(
        metrics.roles.fontSize,
        `${width}px role type below name`,
      ).toBeLessThan(metrics.name.fontSize);
      expect(
        metrics.proposition.fontSize,
        `${width}px proposition below name`,
      ).toBeLessThan(metrics.name.fontSize);
      expect(
        metrics.visibleIcons,
        `${width}px mobile ambient icons`,
        ).toBeGreaterThanOrEqual(18);
      expect(
        metrics.visibleIcons,
        `${width}px mobile ambient icons`,
        ).toBeLessThanOrEqual(26);
      expect(
        metrics.rail.bottom <= metrics.dock.top ||
          metrics.rail.top >= metrics.dock.bottom,
        `${width}px rail does not overlap dock`,
      ).toBeTruthy();
      await expect(page.locator(".overhaul-hero-title")).toContainText(
        "Mohammed Ehab ElNomany",
      );
      await expect(page.locator(".overhaul-hero-roles")).toContainText(
        "Business Analyst",
      );
      await expect(page.locator(".overhaul-hero-roles")).toContainText(
        "Data Analyst",
      );
    }
  });

  test("mobile header exposes all destinations and hides down / returns up", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Primary navigation" });
    for (const [name, href] of [
      ["M7 — back to top", "/#top"],
      ["Work", "/#work"],
      ["About", "/about"],
      ["Writing", "/writing"],
      ["Contact", "/#contact"],
    ]) {
      await expect(nav.getByRole("link", { name })).toHaveAttribute(
        "href",
        href,
      );
      const target = nav.getByRole("link", { name });
      const rect = await target.boundingBox();
      expect(rect?.height, `${name} tap target height`).toBeGreaterThanOrEqual(
        44,
      );
    }

    const wrap = page.locator(".site-nav-wrap");
    const initial = await wrap.boundingBox();
    expect(initial?.y).toBeGreaterThanOrEqual(0);
    expect(initial?.y).toBeLessThan(40);

    await page.evaluate(() => window.scrollTo(0, 900));
    await expect(wrap).toHaveAttribute("data-nav-hidden", "true");
    await page.waitForTimeout(420);
    const hidden = await wrap.boundingBox();
    expect(hidden?.bottom ?? 0).toBeLessThanOrEqual(8);

    await page.evaluate(() => window.scrollBy(0, -240));
    await expect(wrap).toHaveAttribute("data-nav-hidden", "false");
    await page.waitForTimeout(420);
    const visible = await wrap.boundingBox();
    expect(visible?.y).toBeGreaterThanOrEqual(0);
    expect(visible?.y).toBeLessThan(40);
  });

  test("logo rail uses image assets, relationship titles, marquee and an accessible hover label", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto("/");
    const firstSequence = page.locator(".credibility-sequence").first();
    await expect(firstSequence.locator(".credibility-brand-item")).toHaveCount(
      9,
    );
    const broken = await firstSequence
      .locator(".brand-logo img")
      .evaluateAll(
        (images) =>
          images.filter((image) => !(image as HTMLImageElement).naturalWidth)
            .length,
      );
    expect(broken).toBe(0);
    await expect(
      firstSequence.locator(".credibility-brand-copy strong"),
    ).toHaveCount(9);
    await expect(
      firstSequence.locator(".credibility-brand-copy strong"),
    ).toContainText([
      "Data Engineer",
      "Business Analyst Team Lead",
      "Private Tutor · Computer Science & Data",
      "Data / ML Intern",
      "ML Intern",
      "Certified Data Engineer Associate",
      "Foundation & Advanced",
      "BSc Computer Science · Data Science Major",
      "Data Science & AI Scholarship",
    ]);
    const relationshipCopy = await firstSequence
      .locator(".credibility-brand-copy")
      .allTextContents();
    const organizationNames = [
      "Network International",
      "Al Tayseer",
      "Orcas",
      "NARSS",
      "Zewail City",
      "Databricks",
      "McKinsey Forward",
      "Canadian International College",
      "ExploreAI / ALX",
    ];
    expect(
      organizationNames.some((name) =>
        relationshipCopy.some((text) => text.includes(name)),
      ),
    ).toBe(false);
    await expect(firstSequence).not.toContainText("Credibility, compressed");
    await expect(
      page.getByRole("link", { name: "View full background ↗" }),
    ).toHaveCount(0);
    const track = page.locator(".credibility-track");
    await expect(track).toHaveCSS("animation-name", "none");
    await expect(track).toHaveCSS("transform", "none");
    // Pause the live scroll before targeting a moving child so Playwright can
    // resolve a stable hover position on slower hosted browsers.
    const viewport = page.locator(".credibility-viewport");
    await viewport.hover();
    const pausedScrollLeft = await viewport.evaluate((node) => node.scrollLeft);
    await page.waitForTimeout(120);
    await expect
      .poll(() => viewport.evaluate((node) => node.scrollLeft))
      .toBe(pausedScrollLeft);
    const networkItems = page.locator(
      ".credibility-viewport .credibility-brand-item[data-brand-card='network']",
    );
    await viewport.evaluate((node) => {
      const viewportBounds = node.getBoundingClientRect();
      const nextNetwork = Array.from(
        node.querySelectorAll<HTMLElement>(
          ".credibility-brand-item[data-brand-card='network']",
        ),
      )
        .map((item) => ({ item, bounds: item.getBoundingClientRect() }))
        .filter(({ bounds }) => bounds.left >= viewportBounds.right)
        .sort((a, b) => a.bounds.left - b.bounds.left)[0];
      if (nextNetwork) node.scrollLeft += nextNetwork.bounds.left - viewportBounds.left;
    });
    await page.waitForTimeout(120);
    const visibleNetworkIndex = await networkItems.evaluateAll((items) => {
      const viewportBounds = items[0]?.closest(".credibility-viewport")?.getBoundingClientRect();
      if (!viewportBounds) return -1;
      return items.findIndex((item) => {
        const bounds = item.getBoundingClientRect();
        return bounds.left >= viewportBounds.left && bounds.right <= viewportBounds.right;
      });
    });
    expect(visibleNetworkIndex).toBeGreaterThanOrEqual(0);
    const item = networkItems.nth(visibleNetworkIndex);
    const itemBounds = await item.boundingBox();
    expect(itemBounds).not.toBeNull();
    await page.mouse.move(
      itemBounds!.x + itemBounds!.width / 2,
      itemBounds!.y + itemBounds!.height / 2,
    );
    await expect(page.getByRole("tooltip")).toHaveText("Network International");
    const networkAlphaRange = await item
      .locator(".brand-logo img")
      .evaluate(async (node) => {
        const img = node as HTMLImageElement;
        await img.decode();
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const context = canvas.getContext("2d")!;
        context.drawImage(img, 0, 0);
        const rgba = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        ).data;
        const alpha = Array.from(
          { length: rgba.length / 4 },
          (_, index) => rgba[index * 4 + 3],
        );
        return { min: Math.min(...alpha), max: Math.max(...alpha) };
      });
    expect(networkAlphaRange.min).toBeLessThan(255);
    expect(networkAlphaRange.max).toBe(255);
  });

  test("reduced motion shows the full name immediately and makes the rail static", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.locator(".overhaul-hero-signature")).toHaveCSS(
      "clip-path",
      "none",
    );
    await expect(page.locator(".credibility-track")).toHaveCSS(
      "animation-name",
      "none",
    );
    await expect(page.locator(".site-nav-wrap")).toBeVisible();
  });
});
