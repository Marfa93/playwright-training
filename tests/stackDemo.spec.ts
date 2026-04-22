import { test, expect } from "@playwright/test";

test("Stack Demo page", async ({ page }) => {
  //1. Navigate to the Webpage
  page.goto("https://www.bstackdemo.com");

  //2. Interact with the "Order by" Dropdown
  const orderBySelect = page.locator("div.sort > select");

  await expect(orderBySelect).toBeVisible();
  await expect(orderBySelect).toBeEnabled();

  await orderBySelect.selectOption("Lowest to highest");

  //3. Retrieve and Print Product Information
  const priceList = await page.locator("div.val").allInnerTexts();
  const productNameList = await page
    .locator("p.shelf-item__title")
    .allInnerTexts();

  const buildProductMap = () => {
    const map: Map<string, string> = new Map();
    for (let i = 0; i < productNameList.length; i++) {
      map.set(productNameList[i], priceList[i]);
    }

    return map;
  };

  const productsMap = buildProductMap();

  const pricesAndNamesAreEqual = priceList.length === productNameList.length;
  expect(pricesAndNamesAreEqual).toBeTruthy();

  for (const [name, price] of productsMap) {
    console.log(`${name}: ${price}`);
  }

  const convertPriceToNumber = (price: string) => {
    return parseInt(price.replace("$", ""));
  };

  const maxPrice = [...productsMap.entries()].reduce<[string, string]>(
    (prev, curr) => {
      if (
        prev[1] === "" ||
        convertPriceToNumber(prev[1]) < convertPriceToNumber(curr[1])
      ) {
        return curr;
      }
      return prev;
    },
    ["", ""],
  );

  const minPrice = [...productsMap.entries()].reduce<[string, string]>(
    (prev, curr) => {
      if (
        prev[1] === "" ||
        convertPriceToNumber(prev[1]) > convertPriceToNumber(curr[1])
      ) {
        return curr;
      }
      return prev;
    },
    ["", ""],
  );

  console.log(maxPrice, minPrice);

  await page.waitForTimeout(3000);
});
