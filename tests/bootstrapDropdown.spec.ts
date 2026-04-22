import { test, expect } from "@playwright/test";

test("Bootstrap dropdown", async ({ page }) => {
  await page.goto("https://opensource-demo.orangehrmlive.com");

  //Connect to the app and go to PIM
  const username = (await page.getByText(`Username`).nth(0).innerText()).split(
    " : ",
  )[1];
  const password = (await page.getByText(`Password`).nth(0).innerText()).split(
    " : ",
  )[1];

  await page.getByRole("textbox", { name: "username" }).fill(username);
  await page.getByRole("textbox", { name: "password" }).fill(password);
  await page.locator("button[type='submit']").click();
  await page.getByText(`PIM`).click();

  //Get the dropdowns
  await page.locator(`form i`).nth(2).click();
  await page.waitForTimeout(1000);

  // Get all the options
  const options = page.locator(`div[role="listbox"] span`);
  console.log(await options.count());

  for (const option of await options.allInnerTexts()) {
    console.log(option);
  }

  // Select a value
  await options.nth(15).click();

  await page.waitForTimeout(2000);
});
