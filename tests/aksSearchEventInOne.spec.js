import { expect, test } from '@playwright/test';

test.use({
  launchOptions: { args: ['--deny-permission-prompts'] }
});

test.describe('AKC @AKC', () => {
  test('Search for events by button calendar link', async ({ context, page }) => {
    await page.goto("https://www.akc.org/");
    await handleCookies(page);

    const eventSearchUpperLink = await page.locator("#site-header > div > div.desktop-header > div > div.utility-header > nav:nth-child(1) > a:nth-child(1)");
    
    // Wait for the new page to be created
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      eventSearchUpperLink.click()
    ]);

    // Interacting with elements on the search page (https://webapps.akc.org/event-search/#/search)
    await expect(newPage.url()).toContain('https://webapps.akc.org/event-search/');
    await handleCookies(newPage);
    let bottonCalendar = await newPage.locator("//a[@class='custom-link' and contains(text(), 'Events Calendar')]");
    

   // Wait for the new page to be created after clicking the "Events Calendar" link
    const [calendarPage] = await Promise.all([
      context.waitForEvent('page'),
      bottonCalendar.click()
    ]);

    // Verify the URL of the event calendar page
    await expect(calendarPage.url()).toBe('https://www.apps.akc.org/apps/event_calendar/index.cfm');
    let eventType = await calendarPage.locator("//span[contains(text(), 'Select Event Type')]");
    await eventType.click();
    let allBreed = await calendarPage.locator("#control-box--event-type > div.control-box__content > div.pure-g > div:nth-child(1) > label:nth-child(1) > span");
    await allBreed.click();
    let applyButton = await calendarPage.locator("#control-box--event-type > div.control-box__content > div.control-box__head > button.pure-button.control-box__submit.btn.redorange");
    await applyButton.click();
    let eventLocation = await calendarPage.locator("//div[@id='input--location']");
    await eventLocation.click();
    let locationPA = await calendarPage.locator("//input[@value = 'PA']");
    await locationPA.click();
    let applyLocation = await calendarPage.locator("//div[@id='control-box--location']/div[2]/div[1]/button[3]");
    await applyLocation.click();
    let eventMonth = await calendarPage.locator("//input[@id= 'default_widget']");
    await eventMonth.click();
    let march = await calendarPage.locator("//td[@data-month='3']");
    await march.click();
    let findEventButton = await calendarPage.locator("//div[@class='calendar-form__actions']//button");
    await findEventButton.click();

    await clickingEventAndVerifyingCriterias(calendarPage);
  });
});

async function handleCookies(page) {
  try {
    await page.waitForSelector("//button[@id='onetrust-accept-btn-handler']", { timeout: 5000 });
    await page.click("//button[@id='onetrust-accept-btn-handler']");
  } catch (error) {
    console.log("Cookie acceptance button not found or not clickable");
  }
}

async function clickingEventAndVerifyingCriterias(page) {
  const eventLinks = await page.locator('.calendar-day--events');
  const count = await eventLinks.count();

  for (let i = 0; i < count; i++) {
    // Re-locate the element to avoid stale element reference
    await eventLinks.nth(i).click();

    // Wait for elements to be visible after clicking
    await page.waitForSelector('.calendar-list-item__info-misc', { state: 'visible' });
    await page.waitForSelector('span[itemprop="addressRegion"]', { state: 'visible' });
    await page.waitForSelector('.calendar-list-title', { state: 'visible' });

    const allBreedConfirmation = page.locator('.calendar-list-item__info-misc');
    const locationRegionConfirmation = page.locator('span[itemprop="addressRegion"]');
    const eventDateConfirmation = page.locator('.calendar-list-title');

    // Perform assertions
    await expect(allBreedConfirmation).toBeVisible();
    await expect(locationRegionConfirmation).toBeVisible();
    await expect(eventDateConfirmation).toBeVisible();

    await expect(allBreedConfirmation).toContainText('/all breed/i');
    await expect(locationRegionConfirmation).toContainText('PA');
    await expect(eventDateConfirmation).toContainText('2025');
    await expect(eventDateConfirmation).toContainText('/mar/i');
    console.log(await eventDateConfirmation.textContent());
    

    await page.goBack();
    // Wait for the calendar to reload and be interactive
    await page.waitForSelector('.calendar-day--events', { state: 'visible' });
  }
}
