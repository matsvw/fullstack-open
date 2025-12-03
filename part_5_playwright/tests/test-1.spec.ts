import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
await page.goto('http://localhost:5173/');
await page.getByRole('textbox', { name: 'username' }).click();
await page.getByRole('textbox', { name: 'username' }).fill('root');
await page.getByRole('textbox', { name: 'username' }).press('Tab');
await page.getByRole('textbox', { name: 'password' }).fill('salainen');
await page.getByRole('button', { name: 'login' }).click();
await page.getByRole('button', { name: 'new blog' }).click();
await page.getByRole('textbox', { name: 'title' }).click();
await page.getByRole('textbox', { name: 'title' }).fill('blog 1');
await page.getByRole('textbox', { name: 'title' }).press('Tab');
await page.getByRole('textbox', { name: 'author' }).fill('auth 1');
await page.getByRole('textbox', { name: 'author' }).press('Tab');
await page.getByRole('textbox', { name: 'url' }).fill('https://url.com/');
await page.getByRole('button', { name: 'create' }).click();
await page.getByText('blog 10view').click();
await page.getByText('blog 10view').click();
await page.getByText('blog 10view').click();
await page.locator('#blogentry').nth(1).click();
await page.getByRole('button', { name: 'view' }).first().click();
await page.getByRole('button', { name: 'view' }).click();
await page.getByRole('button', { name: 'hide' }).first().click();
await page.getByRole('button', { name: 'like', exact: true }).click();
await page.getByRole('button', { name: 'like', exact: true }).click();
});