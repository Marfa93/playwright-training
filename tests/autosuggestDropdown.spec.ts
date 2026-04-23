import { test, expect } from "@playwright/test";

test("Autossuggest dropdown", async ({ page }) => {
  await page.goto("https://www.flipkart.com");

  await page.locator(`.b3wTlE`).click();

  await page
    .getByRole("textbox", { name: "Search for Products, Brands" })
    .pressSequentially(`mobile`, { delay: 500 });

  //Get all the suggested options --> Ctrl+Shift+P on Console --> Emulate focused page

  const options = page.locator(`ul > li`);

  //Printing all the option
  for (const option of await options.allTextContents()) {
    console.log(option);
  }

  await page.getByText(`mobile under 7000`).click();
});
