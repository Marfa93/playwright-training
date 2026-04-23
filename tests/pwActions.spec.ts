import { test, expect, Locator } from "@playwright/test";

test("Text Input Actions", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com");

  const nameTextbox = page.locator("#name");

  await expect(nameTextbox).toBeVisible();
  await expect(nameTextbox).toBeEnabled();
  await expect(nameTextbox).toHaveAttribute("maxlength", "15");
  await expect(nameTextbox).toHaveAttribute("placeholder", "Enter Name");

  await nameTextbox.fill("Antoine Dupont");
  // console.log("Firstname: " + (await nameTextbox.textContent()));
  console.log("Firstname: " + (await nameTextbox.inputValue()));
  expect(await nameTextbox.inputValue()).toBe("Antoine Dupont");
});

test("Radion Button Actions", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com");

  const maleRadio = page.getByRole("radio", { name: "Male", exact: true });

  await expect(maleRadio).toBeVisible();
  await expect(maleRadio).toBeEnabled();

  const radioChecked = await maleRadio.isChecked();
  console.log("isChecked: " + radioChecked);

  await expect(maleRadio).not.toBeChecked();

  await maleRadio.check();

  await expect(maleRadio).toBeChecked();
});

test("Checkbox Actions", async ({ page }) => {
  await page.goto("https://testautomationpractice.blogspot.com");

  //1. Select one checkbox
  const sundayCheckbox = page.getByLabel("Sunday", { exact: true });

  await expect(sundayCheckbox).toBeVisible();
  await expect(sundayCheckbox).toBeEnabled();

  await expect(sundayCheckbox).not.toBeChecked();

  await sundayCheckbox.check();

  await expect(sundayCheckbox).toBeChecked();
  await sundayCheckbox.uncheck();

  //2. Select all checkboxes
  const allCheckboxes = await page
    .locator('input.form-check-input[type="checkbox"]')
    .all();

  expect(allCheckboxes.length).toBe(7);

  for (const dayCheckbox of allCheckboxes) {
    await expect(dayCheckbox).toBeVisible();
    await expect(dayCheckbox).toBeEnabled();

    await expect(dayCheckbox).not.toBeChecked();

    await dayCheckbox.check();

    await expect(dayCheckbox).toBeChecked();
  }

  for (let i = allCheckboxes.length - 1; i > allCheckboxes.length - 4; i--) {
    await allCheckboxes[i].uncheck();
    await expect(allCheckboxes[i]).not.toBeChecked();
  }

  //Flip checkbox state
  for (const dayCheckbox of allCheckboxes) {
    if (await dayCheckbox.isChecked()) {
      await dayCheckbox.uncheck();
      await expect(dayCheckbox).not.toBeChecked();
    } else {
      await dayCheckbox.check();
      await expect(dayCheckbox).toBeChecked();
    }
  }

  for (const dayCheckbox of allCheckboxes) {
    await dayCheckbox.uncheck();

    await expect(dayCheckbox).not.toBeChecked();
  }

  //Random select checkboxes
  const getRandomCheckboxes = () => {
    const checkboxes: Set<Locator> = new Set();

    while (checkboxes.size !== 3) {
      const randomIndex = Math.floor(Math.random() * allCheckboxes.length);
      checkboxes.add(allCheckboxes[randomIndex]);
    }

    return checkboxes;
  };

  for (const dayCheckbox of getRandomCheckboxes()) {
    await dayCheckbox.check();
    await expect(dayCheckbox).toBeChecked();
  }
});
