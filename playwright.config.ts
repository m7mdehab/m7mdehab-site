import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  expect: { timeout: 8_000 },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: [["line"]],
  use: {
    baseURL: process.env.BASE_URL ?? "http://127.0.0.1:3000",
    colorScheme: "light",
    locale: "en-US",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  outputDir: "artifacts/playwright-results",
});
