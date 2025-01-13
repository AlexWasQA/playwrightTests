import { expect, test } from "@playwright/test";

test("Google search from search box,  @googleSearch", async ({ page }) => {
  await page.goto("https://google.com/");
  let searchBox = page.locator("//textarea[@class='gLFyf']");
  await searchBox.fill("French Bulldog");
  await searchBox.press("Enter");
  //verifying that every link contains the search words
  const links = await page.locator('h3').all();
  for (const link of links) {
    const linkText = await link.textContent();
    expect(linkText.toLowerCase()).toContain('french bulldog', 'Link does not contain search term');
  }
});