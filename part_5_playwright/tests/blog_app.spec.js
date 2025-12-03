const { test, expect, describe, beforeEach } = require('@playwright/test')

const testBlog = {
  title: 'Test blog title',
  author: 'Test author',
  url: 'http://example.com/test-blog'
}

const testUser = {
  name: 'Superuser',
  username: 'root',
  password: 'salainen'
}

const login = async (page) => {
  await page.getByLabel('username').fill(testUser.username)
  await page.getByLabel('password').fill(testUser.password)
  await page.getByRole('button', { name: 'login' }).click()
  //console.log(await page.textContent('body'))
  await expect(page.locator('body')).toContainText(`${testUser.name} logged in`);
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', { data: testUser })

    await page.goto('/')
  })

  test('login form is shown', async ({ page }) => {

    const title = page.getByText('blogs')
    await expect(title).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await login(page)
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByLabel('username').fill(testUser.username)
      await page.getByLabel('password').fill('wrongpassword')

      await page.getByRole('button', { name: 'login' }).click()
      const errorDiv = page.locator('.error') //ensure notification is shown in with correct style
      await expect(errorDiv).toContainText('wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)') //RGB color code for red
      await expect(page.getByText(`${testUser.name} logged in`)).not.toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page)
    })

    test('a new blog can be created', async ({ page }) => {

      //create new blog
      await page.getByRole('button', { name: 'new blog' }).click()

      await page.getByRole('textbox', { name: 'title' }).fill(testBlog.title)
      await page.getByRole('textbox', { name: 'author' }).fill(testBlog.author)
      await page.getByRole('textbox', { name: 'url' }).fill(testBlog.url)

      await page.getByRole('button', { name: 'create' }).click()

      const newBlog = page.locator('#blogentry').getByText(testBlog.title, { exact: false }); // ignore the nofification text

      await expect(newBlog).toBeVisible()

    })

  })
})
