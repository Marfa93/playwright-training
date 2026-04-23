import { test, expect } from "@playwright/test";

test("Sorted Select Dropdown", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com");

  const colorsSelect = page.locator("#colors");
  const animalsSelect = page.locator("#animals");

  await expect(colorsSelect).toBeVisible();
  await expect(colorsSelect).toBeEnabled();

  await expect(animalsSelect).toBeVisible();
  await expect(animalsSelect).toBeEnabled();

  //Check number of options
  const colorsOptions = (
    await page.locator("#colors > option").allTextContents()
  ).map((text) => text.trim());
  expect(colorsOptions).toHaveLength(7);

  const animalsOptions = (
    await page.locator("#animals > option").allTextContents()
  ).map((text) => text.trim());
  expect(animalsOptions).toHaveLength(10);

  const sortedColorsList = [...colorsOptions].sort();
  const sortedAnimalsList = [...animalsOptions].sort();

  expect(animalsOptions).toEqual(sortedAnimalsList);
  expect(colorsOptions).not.toEqual(sortedColorsList);
});
