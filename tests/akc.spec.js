import { expect, test } from '@playwright/test';

test.describe('AKC @AKC', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.akc.org/");
    await page.waitForTimeout(10000);
    
  });
  test('Search for dogs', async ({ page }) => {
    let cookiesBtn = page.locator("//button[@id='onetrust-accept-btn-handler']");
    cookiesBtn.click;
    await page.waitForTimeout(10000);
    await page.locator("//nav[@class='utility-nav']//a[@href='https://www.apps.akc.org/event-search']").click;
    await page.waitForTimeout(10000);


});
});