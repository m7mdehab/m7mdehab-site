import { expect, test } from "@playwright/test";

test.describe("September 2026 career truth refresh", () => {
  test("machine-readable profile uses the current role, skills and credentials", async ({ page }) => {
    const response = await page.request.get("/profile.json");
    expect(response.ok()).toBeTruthy();
    const profile = await response.json();

    expect(profile.currentRole).toBe("Data Engineer");
    expect(profile.currentEmployer).toBe("Network International");
    expect(JSON.stringify(profile)).toContain("Databricks");
    expect(JSON.stringify(profile)).not.toContain("WordPress");
    expect(JSON.stringify(profile)).not.toContain("Marketing Team Lead");
    expect(JSON.stringify(profile)).not.toContain("Supply Chain Specialist & Data Analyst");
  });

  test("visible English career surfaces match the September CV corrections", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByText("Data Engineer", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("Business Analyst Team Lead", { exact: true })).toBeVisible();
    await expect(page.getByText("Data Analyst & Supply Chain Analyst", { exact: true })).toBeVisible();
    await expect(page.getByText("Databricks Certified Data Engineer Associate", { exact: true })).toBeVisible();
    await expect(page.getByText("WordPress", { exact: true })).toHaveCount(0);

    await page.goto("/");
    const rail = page.locator(".credibility-rail");
    await expect(rail.locator('[aria-label^="Databricks:"]').first()).toBeVisible();
    await expect(rail).toContainText("Data Engineer Associate");
    await expect(rail).not.toContainText("Udacity / ITIDA");
  });

  test("the former Arabic projection is no longer public", async ({ page }) => {
    expect((await page.goto("/ar"))?.status()).toBe(404);
    expect((await page.goto("/ar/about"))?.status()).toBe(404);
  });
});
