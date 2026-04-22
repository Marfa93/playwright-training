import { test, expect } from "@playwright/test";

// Fixture - global variable: page, browser
test("Verify page title", async ({ page }) => {
  await page.goto("https://www.youtube.com");

  const title = await page.title();
  console.log("Title: " + title);

  await expect(page).toHaveTitle("YouTube");
});
