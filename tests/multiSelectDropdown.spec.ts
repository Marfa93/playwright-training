import { test, expect } from "@playwright/test";

test("Multiple Select Dropdown", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com");

  //Select one element from dropdown
  const colorsSelect = page.locator("#colors");

  await expect(colorsSelect).toBeVisible();
  await expect(colorsSelect).toBeEnabled();

  await colorsSelect.selectOption(["Blue", "Green"]);

  //Check number of options
  const colorsOptions = page.locator("#colors > option");
  expect(colorsOptions).toHaveCount(7);

  //Check if an option is present in the dropdown
  for (const option of await colorsOptions.allTextContents()) {
    console.log(option.trim());
  }
  await expect(colorsOptions).toContainText(["Red"]);

  await page.waitForTimeout(2000);
});
