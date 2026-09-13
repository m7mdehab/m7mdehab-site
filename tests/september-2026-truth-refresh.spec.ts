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
    await expect(rail.locator('[aria-label="Credential: Databricks"]').first()).toBeVisible();
    await expect(rail).not.toContainText("Udacity / ITIDA");
  });

  test("Arabic factual projection inherits the same refreshed career truth on its dedicated history route", async ({ page }) => {
    await page.goto("/ar/about");
    await expect(page.getByText("مهندس بيانات", { exact: true }).first()).toBeVisible();
    await expect(page.getByText("قائد فريق تحليل الأعمال", { exact: true })).toBeVisible();
    await expect(page.getByText("محلل بيانات ومحلل سلاسل إمداد", { exact: true })).toBeVisible();
    await expect(page.getByText("Databricks Certified Data Engineer Associate", { exact: true })).toBeVisible();
    await expect(page.getByText("WordPress", { exact: true })).toHaveCount(0);

    await page.goto("/ar");
    const rail = page.locator(".credibility-rail");
    await expect(rail.locator('[aria-label="شهادة: Databricks"]').first()).toBeVisible();
    await expect(page.getByRole("link", { name: "السيرة المهنية كاملة" })).toHaveAttribute("href", "/ar/about");
  });
});
