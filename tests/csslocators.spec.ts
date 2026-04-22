import { test, expect } from "@playwright/test";

test("Verify CSS Locators", async ({ page }) => {
  await page.goto("https://demowebshop.tricentis.com");

  const inputSearch = page.locator("input#small-searchterms");
  await expect(inputSearch).toBeVisible();
  await inputSearch.fill("Computer");

  await page.locator("input.search-box-text").fill("Hello");

  await page.waitForTimeout(2000);
});
