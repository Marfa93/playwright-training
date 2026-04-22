import { test, expect, Locator } from "@playwright/test";

test("Verify Playwright Locators", async ({ page }) => {
  await page.goto("https://demo.competethemes.com/");

  const iframe = page.locator("#iframe").contentFrame();

  //1
  const logo: Locator = iframe.getByAltText("Modern Store");
  await logo.click();
  await expect(logo).toBeVisible();

  //2
  await expect(iframe.getByText("On Sale Products")).toBeVisible();

  //3
  const aboutButton = iframe.getByRole("link", { name: "Login" });
  await aboutButton.click();

  await expect(iframe.getByRole("heading", { name: "Login" })).toBeVisible();
  await expect(aboutButton).toBeVisible();

  //4
  const inputLogin = iframe.getByLabel("Username or Email Address *");
  const inputPassword = iframe.getByLabel("Password *");
  await expect(inputLogin).toBeVisible();
  await expect(inputPassword).toBeVisible();
  await inputLogin.fill("Mory");
  await inputPassword.fill("TOTOTOTOTO");

  //5
  await expect(iframe.getByPlaceholder("Search...")).toBeVisible();
  await iframe.getByPlaceholder("Search...").fill("Test");
});
