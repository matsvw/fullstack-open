import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('textbox', { name: 'username' }).click();
  await page.getByRole('textbox', { name: 'username' }).fill('root');
  await page.getByRole('textbox', { name: 'username' }).press('Tab');
  await page.getByRole('textbox', { name: 'password' }).fill('salainen');
  await page.getByRole('button', { name: 'login' }).click();
  await page.getByRole('button', { name: 'new blog' }).click();
  await page.getByRole('textbox', { name: 'title' }).click();
  await page.getByRole('textbox', { name: 'title' }).fill('Blog to delete');
  await page.getByRole('textbox', { name: 'title' }).press('Tab');
  await page.getByRole('textbox', { name: 'author' }).click();
  await page.getByRole('textbox', { name: 'author' }).fill('Author');
  await page.getByRole('textbox', { name: 'author' }).press('Tab');
  await page.getByRole('textbox', { name: 'url' }).click();
  await page.getByRole('textbox', { name: 'url' }).fill('https://test.com');
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByRole('button', { name: 'view' }).nth(1).click();
  await page.getByRole('button', { name: 'view' }).click();
  await page.getByRole('button', { name: 'hide' }).first().click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'remove' }).click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'remove' }).click();
  await expect(page.locator('#root')).toContainText('remove');
  await expect(page.locator('#root')).toContainText('remove');
});