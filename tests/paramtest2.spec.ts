import { test, expect } from "@playwright/test";

//Test data
const loginTestData = [
  ["laura.taylor1234@example.com", "test123", "valid"],
  ["invaliduser@example.com", "test321", "invalid"],
  ["validuser@example.com", "testxyz", "invalid"],
  ["", "", "invalid"],
];

test.describe(`Login data driven test`, async () => {
  for (const [login, password, validity] of loginTestData) {
    test(`Login test for "${login}"`, async ({ page }) => {
      await page.goto(`https://demowebshop.tricentis.com/login`);
      await page.getByRole("textbox", { name: "Email" }).fill(login);
      await page.getByRole("textbox", { name: "Password" }).fill(password);
      await page.getByRole("button", { name: "Log in" }).click();

      if (validity === `valid`) {
        const logoutLink = page.getByRole("link", { name: "Log out" });
        await expect(logoutLink).toBeVisible();
      } else {
        const errorMessage = page.locator("div.validation-summary-errors");
        await expect(errorMessage).toBeVisible({ timeout: 5000 });

        await expect(page).toHaveURL(`https://demowebshop.tricentis.com/login`);
      }
    });
  }
});
