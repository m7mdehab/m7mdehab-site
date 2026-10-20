import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const fromJson = (file) => JSON.parse(readFileSync(new URL(`../${file}`, import.meta.url), "utf8"));
const staging = fromJson("wrangler.static.jsonc");
const production = fromJson("wrangler.production.jsonc");
const workflow = readFileSync(new URL("../.github/workflows/deploy-cloudflare-staging.yml", import.meta.url), "utf8");

assert.equal(staging.name, "m7mdehab-site-staging", "Dedicated staging Worker name must stay stable");
assert.equal(production.name, "m7mdehab-site", "Preserve the existing production Worker and custom domain");
assert.notEqual(staging.name, production.name, "Staging and production must never overwrite the same Worker");
assert.equal(staging.workers_dev, true, "Staging must have workers.dev for acceptance tests");
assert.equal(production.workers_dev, false, "Production Worker must not expose the staging workers.dev hostname");
assert.equal(staging.assets.directory, "./out");
assert.equal(production.assets.directory, "./out");
assert.equal(staging.assets.not_found_handling, production.assets.not_found_handling);
assert.equal(staging.assets.html_handling, production.assets.html_handling);
const stagingUrl = `https://${staging.name}.m7mdehab.workers.dev`;
assert.ok(workflow.includes(stagingUrl), "Staging smoke and browser tests must target the isolated Worker");
assert.ok(!workflow.includes("https://m7mdehab-site.m7mdehab.workers.dev"), "Legacy production Worker name must not be used as staging hostname");

console.log(`Verified distinct Cloudflare Workers: staging=${staging.name}, production=${production.name}; staged tests=${stagingUrl}`);
