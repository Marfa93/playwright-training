import { test, expect } from "@playwright/test";

test(`Read date from all table pages`, async ({ page }) => {
  await page.goto(
    `https://datatables.net/examples/basic_init/zero_configuration.html`,
  );

  let morePages = true;

  while (morePages) {
    const rows = await page.locator(`table#example tbody tr`).all();

    for (const row of rows) {
      console.log(await row.innerText());
    }

    await page.waitForTimeout(2000);

    const nextButton = page.getByLabel(`Next`);
    (await nextButton.isEnabled())
      ? await nextButton.click()
      : (morePages = false);
  }

  await page.waitForTimeout(2000);
});

test(`Filter the rows numbers and check the rows count`, async ({ page }) => {
  await page.goto(
    `https://datatables.net/examples/basic_init/zero_configuration.html`,
  );

  const dropdown = page.locator(`select#dt-length-0`);
  const options = await dropdown.locator(`option`).allInnerTexts();
  console.log(options);

  for (const option of options) {
    await dropdown.selectOption(option);
    const nbRows = await page.locator(`table#example tbody tr`).count();
    expect(nbRows).toBeLessThanOrEqual(parseInt(option));
  }

  await page.waitForTimeout(2000);
});

test(`Search for specific data in a table`, async ({ page }) => {
  await page.goto(
    `https://datatables.net/examples/basic_init/zero_configuration.html`,
  );

  const userEntry = `sho`;

  const searchBox = page.locator(`input#dt-search-0`);
  await expect(searchBox).toBeVisible();
  await expect(searchBox).toBeEnabled();

  await searchBox.pressSequentially(userEntry, { delay: 500 });

  const rows = await page.locator(`table#example tbody tr`).all();

  expect(rows.length).toBeGreaterThanOrEqual(1);

  let matchFound = false;
  for (const row of rows) {
    const text = await row.innerText();
    const regex = new RegExp(`${userEntry}`, "i");
    if (regex.test(text)) {
      matchFound = true;
      break;
    }
  }

  expect(matchFound).toBeTruthy();
});
