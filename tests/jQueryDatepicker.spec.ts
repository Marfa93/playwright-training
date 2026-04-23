import { test, expect, Page } from "@playwright/test";
import { isTargetDateBeforeCurrent } from "./utils/commonUtils";
import { MonthName, MONTHS } from "./types/month.types";

const selectDate = async (
  targetYear: string,
  targetMonth: MonthName,
  targetDay: string,
  page: Page,
): Promise<void> => {
  const getCurrentMonthYear = async (): Promise<string> =>
    (await page.locator(`.ui-datepicker-title span`).allInnerTexts()).join(` `);

  let currentMonthYear = await getCurrentMonthYear();
  const changeMonthLabel = isTargetDateBeforeCurrent(
    `${targetMonth} ${targetYear}`,
    currentMonthYear,
  )
    ? `Prev`
    : `Next`;
  const changeMonthButton = page.getByTitle(changeMonthLabel, { exact: true });

  while (`${targetMonth} ${targetYear}` !== currentMonthYear) {
    await changeMonthButton.click();
    currentMonthYear = await getCurrentMonthYear();
  }

  await page.locator(`a[data-date="${targetDay}"]`).click();
};

test(`jQuery datepicker`, async ({ page }) => {
  await page.goto(`https://testautomationpractice.blogspot.com`);

  const dateInput = page.locator(`#datepicker`);
  await expect(dateInput).toBeVisible();
  await expect(dateInput).toBeEnabled();

  //With filling method
  // await dateInput.pressSequentially(`02/12/2026`, { delay: 1000 });

  //Select target date
  await dateInput.click();

  const year = `2020`;
  const month: MonthName = `February`;
  const day = `12`;

  await selectDate(year, month, day, page);

  await expect(dateInput).toHaveValue(`${MONTHS[month]}/${day}/${year}`);
});
