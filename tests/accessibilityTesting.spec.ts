import { test, expect } from "@playwright/test";
import path from "path";
import AxeBuilder from "@axe-core/playwright";
import { createHtmlReport } from "axe-html-reporter";

test.describe("Accessibility testing", () => {
  test("On Tricentris", async ({ page }, testInfo) => {
    await page.goto("https://demowebshop.tricentis.com");
    await page.waitForLoadState("networkidle");

    //Run accessibility scan
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();

    await testInfo.attach("accessibility scan results", {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: "application/json",
    });

    createHtmlReport({
      results: accessibilityScanResults,
      options: {
        outputDir: path.join("test-results", "accessibility-results"),
        reportFileName: `my-report.html`,
      },
    });

    // expect(accessibilityScanResults.violations.length).toBe(0);
  });
});
