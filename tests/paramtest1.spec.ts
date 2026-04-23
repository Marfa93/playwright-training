import { test, expect } from "@playwright/test";

//Test data
const searchItems = ["laptop", "gift card", "smartphone", "monitor"];

test.describe(`Searching items`, async () => {
  for (const searchItem of searchItems) {
    test(`Search test ${searchItem}`, async ({ page }) => {
      await page.goto(`https://demowebshop.tricentis.com`);
      await page.locator(`input#small-searchterms`).fill(searchItem);
      await page.locator(`input[value="Search"]`).click();
      await expect
        .soft(page.locator(`h2 a`).nth(0))
        .toContainText(searchItem, { ignoreCase: true });
    });
  }
});
