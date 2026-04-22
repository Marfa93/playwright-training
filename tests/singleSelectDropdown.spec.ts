import { test, expect } from "@playwright/test";

test("Single Select Dropdown", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com");

  //Select one element from dropdown
  const countryDropdown = page.locator("#country");

  await expect(countryDropdown).toBeVisible();
  await expect(countryDropdown).toBeEnabled();

  await countryDropdown.selectOption("France");
  await countryDropdown.selectOption({ value: "france" });
  await countryDropdown.selectOption({ label: "France" });

  //Check number of options
  const countryOptions = page.locator("#country > option");
  expect(countryOptions).toHaveCount(10);

  //Check if an option is present in the dropdown
  for (const option of await countryOptions.allTextContents()) {
    console.log(option.trim());
  }
  await expect(countryOptions).toContainText(["Japan"]);

  await page.waitForTimeout(2000);
});
