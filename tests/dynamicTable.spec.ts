import { test, expect } from "@playwright/test";

test.skip(`Verify Chrome CPU load in dynamic table`, async ({ page }) => {
  await page.goto(`https://practice.expandtesting.com/dynamic-table`);

  const table = page.locator(`table.table tbody`);
  await expect(table).toBeVisible();

  //Get CPU load of Chrome process
  const rows = await table.locator(`tr`).all();
  expect(rows).toHaveLength(4);

  let cpuLoad = ``;
  for (const row of rows) {
    const processName = await row.locator(`td`).nth(0).innerText();

    if (processName === `Chrome`) {
      cpuLoad = await row.locator(`td:has-text("%")`).innerText();
      // cpuLoad = await row.locator(`td`, { hasText: `%` }).innerText();
      break;
    }
  }

  const expectedCPULoad = (await page.locator(`div p#chrome-cpu`).innerText())
    .split(`:`)[1]
    .trim();

  expect(cpuLoad).toBe(expectedCPULoad);
});
