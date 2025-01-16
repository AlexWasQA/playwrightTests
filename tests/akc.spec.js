import { expect, test } from '@playwright/test';

test.use({
  launchOptions: { args: ['--deny-permission-prompts'] }
});

test.describe('AKC @AKC', () => {
  test('Search for events by botton calendar link', async ({ page }) => {
    await page.goto("https://www.akc.org/");
    let cookiesAcceptBtn = await page.locator("//button[@id='onetrust-accept-btn-handler']");
    await cookiesAcceptBtn.click();
    let eventSearchUpperLink = await page.locator("#site-header > div > div.desktop-header > div > div.utility-header > nav:nth-child(1) > a:nth-child(1)");
    await eventSearchUpperLink.click();
    //await page.waitForSelector("#onetrust-accept-btn-handler", { visible: true, clickable : true });
    
});
    });