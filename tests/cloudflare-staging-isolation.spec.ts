import { readFileSync } from "node:fs";
import { join } from "node:path";
import { expect, test } from "@playwright/test";

const root = process.cwd();
const parseConfig = (name: string) =>
  JSON.parse(readFileSync(join(root, name), "utf8")) as {
    name: string;
    workers_dev: boolean;
    preview_urls: boolean;
    routes?: Array<{ pattern: string; custom_domain: boolean }>;
    assets: { directory: string; not_found_handling: string };
  };

test("staging and production cannot mutate the same Cloudflare Worker", () => {
  const staging = parseConfig("wrangler.static.jsonc");
  const production = parseConfig("wrangler.production.jsonc");
  expect(staging.name).toBe("m7mdehab-site-staging");
  expect(production.name).toBe("m7mdehab-site");
  expect(staging.name).not.toBe(production.name);
  expect(staging.workers_dev).toBe(true);
  expect(production.workers_dev).toBe(false);
  expect(staging.preview_urls).toBe(true);
  expect(production.preview_urls).toBe(false);
  expect(staging.routes).toBeUndefined();
  expect(production.routes?.[0]).toMatchObject({
    pattern: "m7mdehab.com",
    custom_domain: true,
  });
  expect(staging.assets.directory).toBe("./out");
  expect(production.assets.directory).toBe("./out");
});

test("staging deployment checks its own noncanonical Worker URL", () => {
  const staging = parseConfig("wrangler.static.jsonc");
  const workflow = readFileSync(
    join(root, ".github/workflows/deploy-cloudflare-staging.yml"),
    "utf8",
  );
  const expected = `https://${staging.name}.m7mdehab.workers.dev`;
  expect(workflow).toContain(expected);
  expect(workflow).toContain("--config wrangler.static.jsonc");
  expect(workflow).not.toContain(
    "https://m7mdehab-site.m7mdehab.workers.dev",
  );
  expect(workflow).toContain("X-Robots-Tag");
});
