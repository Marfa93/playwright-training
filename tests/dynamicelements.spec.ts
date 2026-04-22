import { test } from "@playwright/test";

test("Handle Dynamic Elements using XPath", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com");

  // Loop to click the button 5 times
  for (let i = 0; i < 5; i++) {
    const button = page.locator('//button[text()="STOP" or text()="START"]');
    await button.click();
    await page.waitForTimeout(2000);
  }
});
