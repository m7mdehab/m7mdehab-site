import { expect, test } from "@playwright/test";

const services = [
  "data-migration-reconciliation",
  "analytics-power-bi",
  "ml-ai-product-development",
  "product-web-development",
] as const;

test.describe("Iteration 7 conversion architecture", () => {
  test("method bridge replaces homepage capability anchors while service proof lives on the dedicated route", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("[data-solve-think]")).toBeVisible();
    await expect(page.locator('[data-conversion="capability-to-service"]')).toHaveCount(0);
    await expect(page.locator('[data-conversion="method-to-work"]')).toHaveAttribute("href", "/work");
    await expect(page.locator("#services")).toHaveCount(0);
    await expect(page.locator('[data-conversion="home-to-services"]')).toHaveAttribute("href", "/services");

    await page.goto("/services");
    await expect(page.locator("#services")).toBeVisible();
    for (const service of services) {
      await expect(page.locator(`#service-${service}`)).toBeAttached();
    }
  });

  test("service cards expose governed evidence and browser-reliable contact intents", async ({ page }) => {
    await page.goto("/services");

    const serviceCards = page.locator("#services .service-card");
    await expect(serviceCards).toHaveCount(4);

    const contactLinks = page.locator('[data-conversion="service-to-contact"]');
    await expect(contactLinks).toHaveCount(4);
    for (const link of await contactLinks.all()) {
      const href = await link.getAttribute("href");
      expect(href).toBeTruthy();
      const url = new URL(href!);
      expect(url.origin).toBe("https://mail.google.com");
      expect(url.pathname).toBe("/mail/");
      expect(url.searchParams.get("view")).toBe("cm");
      expect(url.searchParams.get("fs")).toBe("1");
      expect(url.searchParams.get("to")).toBe("M7mdehab999@gmail.com");
      expect(url.searchParams.get("su")).toBeTruthy();
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", /noreferrer/);
    }

    const analytics = page.locator("#service-analytics-power-bi");
    await expect(analytics).toContainText("no publishable Power BI screenshot claimed");
    await expect(analytics).toContainText("not Power BI artifacts");

    const migration = page.locator("#service-data-migration-reconciliation");
    await expect(migration).toContainText("public visual evidence intentionally limited");
    await expect(migration).toContainText("not reconstructed into fake public screenshots");
  });

  test("case studies link only to directly supported services on the dedicated service route", async ({ page }) => {
    await page.goto("/work/presaira");

    const presairaBridge = page.locator('[data-conversion="project-to-service"]');
    await expect(presairaBridge).toHaveCount(2);
    await expect(presairaBridge.filter({ hasText: "Service context" }).first()).toBeVisible();
    await expect(page.locator('[data-service-id="analytics-power-bi"][data-conversion="project-to-service"]')).toHaveCount(0);
    await expect(page.locator('[data-service-id="ml-ai-product-development"][data-conversion="project-to-service"]')).toHaveCount(1);
    await expect(page.locator('[data-service-id="product-web-development"][data-conversion="project-to-service"]')).toHaveCount(1);
    for (const link of await presairaBridge.all()) {
      await expect(link).toHaveAttribute("href", /^\/services#service-/);
    }

    await page.goto("/work/makhbazy");
    await expect(page.locator('[data-conversion="project-to-service"]')).toHaveCount(1);
    await expect(page.locator('[data-service-id="product-web-development"][data-conversion="project-to-service"]')).toHaveCount(1);
    await expect(page.locator('[data-conversion="project-to-service"]')).toHaveAttribute("href", "/services#service-product-web-development");
  });
});

test.describe("Iteration 7 progressive enhancement", () => {
  test.use({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });

  test("service proof and contact links remain available without JavaScript", async ({ page }) => {
    await page.goto("/services");
    await expect(page.locator("#services")).toBeVisible();
    await expect(page.locator('[data-conversion="service-to-contact"]')).toHaveCount(4);
    await expect(page.locator("#service-ml-ai-product-development")).toContainText("Strong public project evidence");
  });
});
