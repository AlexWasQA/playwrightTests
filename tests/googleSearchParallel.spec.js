import { test } from '@playwright/test';

test.describe("Parallel searching @parExample", async () => {
  
  test.beforeEach(async ({page}) => {
    await page.goto("https://google.com/");
  });
  test.afterEach(async ({page}) => {
    await page.close();
});


test('Searching French Bulldog', async ({ page }) => {
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

test('Searching German Shepherd', async ({ page }) => {
  let searchBox = page.locator("//textarea[@class='gLFyf']");
  await searchBox.fill("German Shepherd");
  await searchBox.press("Enter");
  //verifying that every link contains the search words
  const links = await page.locator('h3').all();
  for (const link of links) {
    const linkText = await link.textContent();
    expect(linkText.toLowerCase()).toContain('german shepherd', 'Link does not contain search term');
  }
});

test('Searching Cane Corso', async ({ page }) => {
  let searchBox = page.locator("//textarea[@class='gLFyf']");
  await searchBox.fill("Cane Corso");
  await searchBox.press("Enter");
  //verifying that every link contains the search words
  const links = await page.locator('h3').all();
  for (const link of links) {
    const linkText = await link.textContent();
    expect(linkText.toLowerCase()).toContain('cane corso', 'Link does not contain search term');
  }
});
});