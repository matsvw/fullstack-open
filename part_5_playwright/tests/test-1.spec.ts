import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
await page.goto('chrome-error://chromewebdata/');await page.goto('chrome-error://chromewebdata/');
});