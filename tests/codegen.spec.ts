import { test, expect } from "@playwright/test";

test.skip("test", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.getByRole("button", { name: "Tout refuser" }).click();
  await page.getByRole("combobox", { name: "Rech." }).click();
  await page
    .getByRole("combobox", { name: "Rech." })
    .fill("Stade Français Paris");
  await page.goto(
    "https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3DStade%2BFran%25C3%25A7ais%2BParis%26sca_esv%3D2a30541cd13cdf7a%26source%3Dhp%26ei%3DUhfqacXNMZ3JnsEP3_b4kAw%26iflsig%3DAFdpzrgAAAAAaeolYjmBAZRKLpI_PdzDvfEWo9HLwZYP%26ved%3D0ahUKEwjFvo2Tg4SUAxWdpCcCHV87HsIQ4dUDCA8%26uact%3D5%26oq%3DStade%2BFran%25C3%25A7ais%2BParis%26gs_lp%3DEgdnd3Mtd2l6IhVTdGFkZSBGcmFuw6dhaXMgUGFyaXMyBRAuGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAESOhUULAuWP9ScAF4AJABAJgBcqAB4gaqAQQxOS4xuAEDyAEA-AEBmAIVoALLB6gCCsICChAAGAMYjwEY6gLCAgoQLhgDGI8BGOoCwgIREC4YgAQYsQMYgwEYxwEY0QPCAg4QLhiABBixAxjHARjRA8ICCBAAGIAEGLEDwgIREC4YgAQYsQMYxwEYrwEYjgXCAg4QABiABBiKBRixAxiDAcICCBAuGIAEGLEDwgIOEC4YgAQYigUYsQMYgwHCAgsQLhiABBixAxiDAcICDhAAGIAEGLEDGIMBGMkDwgIOEAAYgAQYigUYkgMYuATCAgsQABiABBiKBRiSA8ICCxAAGIAEGLEDGIMBwgIOEC4YgAQYxwEYrwEYjgXCAgsQLhiABBjHARivAcICExAuGK8BGMcBGLEDGIAEGI4FGArCAggQLhixAxiABJgDCPEF1UpHeQF-D4-SBwQyMC4xoAfptwKyBwQxOS4xuAfDB8IHCDAuMTEuOC4yyAdSgAgB%26sclient%3Dgws-wiz%26sei%3DaRfqaY-uB_3skdUPgorDoQE&q=EhAqAcsAAJpQAJnDnru6gDMpGOmuqM8GIjBhZ9VZUa-DHCvkazf19GxHyxQVEFBTPfJGqrb_ZmB5ClW_0ky6JAfW5nntiFYxf4EyAVJaAUM",
  );
  await page
    .locator('iframe[title="reCAPTCHA"]')
    .contentFrame()
    .getByRole("checkbox", { name: /Je ne suis pas un robot|I'm not a robot/ })
    .click();
  await page
    .getByRole("link", { name: "Stade Français stade.fr https" })
    .click();
  await page
    .locator("#menu-item-498")
    .getByRole("link", { name: "Billetterie" })
    .click();
});
