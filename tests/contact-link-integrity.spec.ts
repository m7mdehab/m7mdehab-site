import { expect, test, type Locator } from "@playwright/test";

const email = "M7mdehab999@gmail.com";
const linkedin = "https://www.linkedin.com/in/mohammed-ehab";
const github = "https://github.com/m7mdehab";

async function expectComposeLink(link: Locator, subject?: string) {
  const href = await link.getAttribute("href");
  expect(href).toBeTruthy();
  const url = new URL(href!);
  expect(url.origin).toBe("https://mail.google.com");
  expect(url.pathname).toBe("/mail/");
  expect(url.searchParams.get("view")).toBe("cm");
  expect(url.searchParams.get("fs")).toBe("1");
  expect(url.searchParams.get("to")).toBe(email);
  if (subject) expect(url.searchParams.get("su")).toBe(subject);
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute("rel", /noreferrer/);
}

test.describe("public contact link integrity", () => {
  test("homepage email, LinkedIn and GitHub actions point to the canonical public contact details", async ({ page }) => {
    await page.goto("/");

    await expectComposeLink(page.locator('[data-conversion="hero-contact"]'), "Role or project opportunity");
    await expectComposeLink(page.locator('[data-conversion="contact-role-email"]'), "Technical role opportunity");
    await expectComposeLink(page.locator('[data-conversion="contact-project-email"]'), "Project or system opportunity");
    await expectComposeLink(page.locator('[data-conversion="footer-email"]'));

    const visibleEmail = page.locator(".closing-directory-email");
    await expect(visibleEmail).toContainText(email);
    await expectComposeLink(visibleEmail);

    const linkedinLinks = page.locator(`a[href="${linkedin}"]`);
    expect(await linkedinLinks.count()).toBeGreaterThanOrEqual(2);
    for (let index = 0; index < await linkedinLinks.count(); index += 1) {
      await expect(linkedinLinks.nth(index)).toHaveAttribute("target", "_blank");
      await expect(linkedinLinks.nth(index)).toHaveAttribute("rel", /noreferrer/);
    }

    const githubLinks = page.locator(`a[href="${github}"]`);
    expect(await githubLinks.count()).toBeGreaterThanOrEqual(2);
    for (let index = 0; index < await githubLinks.count(); index += 1) {
      await expect(githubLinks.nth(index)).toHaveAttribute("target", "_blank");
      await expect(githubLinks.nth(index)).toHaveAttribute("rel", /noreferrer/);
    }

    await expect(page.locator('.closing-directory-icons a[aria-label^="Email"]')).toHaveCount(1);
    await expect(page.locator('.closing-directory-icons a[aria-label$="on LinkedIn"]')).toHaveCount(1);
    await expect(page.locator('.closing-directory-icons a[aria-label$="on GitHub"]')).toHaveCount(1);
  });

  test("About, Services and project conversion actions use browser-reliable email compose links", async ({ page }) => {
    await page.goto("/about");
    await expectComposeLink(page.locator('[data-conversion="about-contact"]'), "Role or project opportunity");

    await page.goto("/services");
    const serviceLinks = page.locator('[data-conversion="service-to-contact"]');
    expect(await serviceLinks.count()).toBeGreaterThan(0);
    for (let index = 0; index < await serviceLinks.count(); index += 1) {
      await expectComposeLink(serviceLinks.nth(index));
    }

    await page.goto("/work/presaira");
    const projectContact = page.locator('[data-conversion="project-service-to-contact"]').first();
    await expect(projectContact).toBeVisible();
    await expectComposeLink(projectContact);
  });

  test("public prototypes do not depend on an operating-system mail handler", async ({ page }) => {
    for (const route of ["/prototypes/cinematic", "/prototypes/spatial", "/prototypes/kinetic"]) {
      await page.goto(route);
      const mailtoLinks = page.locator('a[href^="mailto:"]');
      await expect(mailtoLinks).toHaveCount(0);
      const composeLinks = page.locator('a[href^="https://mail.google.com/mail/"]');
      expect(await composeLinks.count()).toBeGreaterThanOrEqual(2);
    }
  });
});
