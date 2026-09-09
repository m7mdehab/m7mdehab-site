import { expect, test } from "@playwright/test";

const domain = "https://m7mdehab.com";
const projectSlugs = [
  "presaira",
  "opportunityos",
  "ghareeb-oglu",
  "oil-spill-detection",
  "solar-site-selection",
  "makhbazy",
] as const;

const serviceIds = [
  "data-migration-reconciliation",
  "analytics-power-bi",
  "ml-ai-product-development",
  "product-web-development",
] as const;

test.describe("Iteration 8 discoverability architecture", () => {
  test("indexable HTML routes self-canonicalize and project Open Graph URLs match", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${domain}/`);

    for (const slug of projectSlugs) {
      await page.goto(`/work/${slug}`);
      const canonical = `${domain}/work/${slug}`;
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", canonical);
    }
  });

  test("structured identity exposes governed services and canonical case studies", async ({ page }) => {
    await page.goto("/");
    const graph = await page.locator('script[type="application/ld+json"]').evaluate((node) => {
      const parsed = JSON.parse(node.textContent ?? "{}");
      return parsed["@graph"] as Array<Record<string, unknown>>;
    });

    const profilePage = graph.find((node) => node["@type"] === "ProfilePage");
    const person = graph.find((node) => node["@type"] === "Person") as Record<string, unknown> | undefined;
    const creativeWorks = graph.filter((node) => node["@type"] === "CreativeWork");

    expect(profilePage).toBeTruthy();
    expect(person).toBeTruthy();
    expect(person?.sameAs).toEqual([
      "https://github.com/m7mdehab",
      "https://www.linkedin.com/in/mohammed-ehab",
    ]);
    expect(JSON.stringify(person)).not.toContain("presaira.com");
    expect(person?.makesOffer).toHaveLength(4);
    expect(creativeWorks).toHaveLength(6);
    expect(creativeWorks.map((item) => item.url).sort()).toEqual(
      projectSlugs.map((slug) => `${domain}/work/${slug}`).sort(),
    );
  });

  test("profile, project and service JSON stay synchronized with the public conversion model", async ({ request }) => {
    const profileResponse = await request.get("/profile.json");
    expect(profileResponse.ok()).toBeTruthy();
    const profile = await profileResponse.json();
    expect(profile.services).toHaveLength(4);
    expect(profile.machineReadable.services).toBe(`${domain}/services.json`);

    const projectResponse = await request.get("/projects.json");
    expect(projectResponse.ok()).toBeTruthy();
    const projects = await projectResponse.json();
    expect(projects).toHaveLength(6);
    for (const project of projects) {
      expect(project.caseStudyUrl).toBe(`${domain}/work/${project.slug}`);
    }

    const presaira = projects.find((project: { slug: string }) => project.slug === "presaira");
    expect(presaira.directServices.map((service: { id: string }) => service.id).sort()).toEqual([
      "ml-ai-product-development",
      "product-web-development",
    ]);

    const serviceResponse = await request.get("/services.json");
    expect(serviceResponse.ok()).toBeTruthy();
    const services = await serviceResponse.json();
    expect(services.map((service: { id: string }) => service.id)).toEqual(serviceIds);

    const analytics = services.find((service: { id: string }) => service.id === "analytics-power-bi");
    expect(analytics.evidenceBoundary).toContain("not Power BI artifacts");
    expect(analytics.relatedProjects.every((project: { relationship: string }) => project.relationship === "adjacent")).toBeTruthy();

    const migration = services.find((service: { id: string }) => service.id === "data-migration-reconciliation");
    expect(migration.evidenceBoundary).toContain("not reconstructed into fake public screenshots");
  });

  test("LLM discovery surface carries service proof and interpretation boundaries", async ({ request }) => {
    const response = await request.get("/llms.txt");
    expect(response.ok()).toBeTruthy();
    const body = await response.text();
    expect(body).toContain("## Services");
    expect(body).toContain("## Interpretation notes");
    expect(body).toContain(`${domain}/services.json`);
    expect(body).toContain("not represented as Power BI artifacts");
    expect(body).toContain("confidential client systems, mappings and outputs are not reconstructed");
  });

  test("sitemap contains only canonical indexable HTML routes without artificial lastmod", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.ok()).toBeTruthy();
    const xml = await response.text();
    const locations = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

    expect(locations).toHaveLength(7);
    expect(locations).toEqual([
      domain,
      ...projectSlugs.map((slug) => `${domain}/work/${slug}`),
    ]);
    expect(xml).not.toContain("<lastmod>");
    expect(xml).not.toContain(".json");
    expect(xml).not.toContain("llms.txt");
  });

  test("robots keeps the site crawlable and advertises the canonical sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.ok()).toBeTruthy();
    const body = await response.text();
    expect(body).toContain("User-Agent: *");
    expect(body).toContain("Allow: /");
    expect(body).toContain(`Sitemap: ${domain}/sitemap.xml`);
  });
});
