import { expect, test } from "@playwright/test";

const tutoring = "https://tutor.m7mdehab.com/";

test.describe("Owner-operated tutoring practice identity reciprocity", () => {
  test("home visibly links to tutoring without a new conversion panel", async ({ page }) => {
    await page.goto("/");
    const link = page.locator('.closing-directory-nav a[href="' + tutoring + '"]');
    await expect(link).toHaveCount(1);
    await expect(link).toBeVisible();
    await expect(link).toHaveText("Tutoring");
    await expect(link).toHaveAttribute("title", "Personal English & STEM tutoring");
    await expect(page.locator(".closing-opportunity")).toHaveCount(1);
  });

  test("Person identity metadata and public profile agree", async ({ page, request }) => {
    await page.goto("/");
    const nodes = await page.locator('script[type="application/ld+json"]').first().evaluate((script) =>
      (JSON.parse(script.textContent ?? "{}")["@graph"] ?? []) as Array<Record<string, unknown>>,
    );
    const person = nodes.find((node) => node["@type"] === "Person");
    expect(person?.sameAs).toContain(tutoring);

    await page.goto("/about");
    const about = await page.locator('script[type="application/ld+json"]').last().evaluate((script) =>
      JSON.parse(script.textContent ?? "{}") as { mainEntity: { sameAs: string[] } },
    );
    expect(about.mainEntity.sameAs).toContain(tutoring);

    const profile = await (await request.get("/profile.json")).json();
    expect(profile.links.tutoring).toBe(tutoring);
    const llms = await (await request.get("/llms.txt")).text();
    expect(llms).toContain(`[Personal tutoring practice](${tutoring})`);
  });

  test("the compact footer still fits mobile widths without horizontal spill", async ({ page }) => {
    for (const width of [320, 360, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 880 });
      await page.goto("/", { waitUntil: "domcontentloaded" });
      const result = await page.evaluate(() => {
        const nav = document.querySelector<HTMLElement>(".closing-directory-nav");
        const link = nav?.querySelector<HTMLAnchorElement>('a[href="https://tutor.m7mdehab.com/"]');
        if (!nav || !link) return { found: false, contained: false, bodyOverflow: true };
        const n = nav.getBoundingClientRect(), l = link.getBoundingClientRect();
        return {
          found: true,
          contained: l.left >= n.left - 1 && l.right <= n.right + 1,
          bodyOverflow: document.documentElement.scrollWidth > innerWidth + 2,
        };
      });
      expect(result.found, `${width}px link exists`).toBe(true);
      expect(result.contained, `${width}px link contained`).toBe(true);
      expect(result.bodyOverflow, `${width}px horizontal overflow`).toBe(false);
    }
  });
});
