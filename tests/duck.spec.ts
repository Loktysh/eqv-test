import { test, expect } from '@playwright/test';
import exp from 'constants';

test.describe('Integration tests ', () => {
  test('Duck searching video and return', async ({ page }) => {
    await page.goto('/');
    await page.locator('#searchbox_input').fill('rickrol');
    await page.click('//button[@aria-label="Search"]');
    const videoLinkElement = await page.getByTestId('result-title-a').first();
    const videoLink = await videoLinkElement.getAttribute('href');
    await videoLinkElement.click();
    await page.url();
    await expect(page).toHaveURL(videoLink as string);
    // We can also use this for accurate verification that the page has loaded and not just opened
    // await page.waitForURL(videoLink as string);
    // await expect(page).toHaveURL(videoLink as string);
    // await expect(page).toHaveTitle(/YouTube/);
    await page.goBack();
    await page.waitForURL(/^https?:\/\/duckduckgo\.com\/\?t=h_&q=rickrol/);
    await page.close();
  });
});
