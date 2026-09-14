import { expect, test } from "@playwright/test";

const retiredPrototypeRoutes = [
  "/prototypes",
  "/prototypes/cinematic",
  "/prototypes/spatial",
  "/prototypes/kinetic",
] as const;

test.describe("retired frontend prototype routes", () => {
  for (const route of retiredPrototypeRoutes) {
    test(`${route} stays unpublished`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(404);
      await expect(page.getByRole("heading", { name: "This route is no longer part of the public site." })).toBeVisible();
      await expect(page.getByRole("link", { name: "Back home" })).toHaveAttribute("href", "/");
      await expect(page.getByRole("link", { name: "View work" })).toHaveAttribute("href", "/work");
    });
  }
});
