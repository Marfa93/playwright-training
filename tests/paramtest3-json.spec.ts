import { test, expect } from "@playwright/test";
import { readJSONFile } from "./utils/commonUtils";
import { LoginData } from "./types/loginData.types";

//Test data
const jsonPath = "testdata/data.json";
const loginTestData: LoginData[] = readJSONFile(jsonPath);

test.describe(`Login data driven test`, async () => {
  for (const { email, password, validity } of loginTestData) {
    test(`Login test for "${email}"`, async ({ page }) => {
      await page.goto(`https://demowebshop.tricentis.com/login`);
      await page.getByRole("textbox", { name: "Email" }).fill(email);
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
