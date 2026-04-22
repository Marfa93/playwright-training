import { test, expect } from "@playwright/test";

// Fixture - global variable: page, browser
test("Verify page url", async ({ page }) => {
  await page.goto("https://www.youtube.com");

  const url = page.url();
  console.log("Url: " + url);

  await expect(page).toHaveURL(/youtube/);
});
