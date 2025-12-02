const { test, expect, describe, beforeEach } = require('@playwright/test')

const testBlog = {
  title: 'Test blog title', 
  author: 'Test author',
  url: 'http://example.com/test-blog'
}

const login = async (page) => {
  await page.getByLabel('username').fill('root')
  await page.getByLabel('password').fill('salainen')

  await page.getByRole('button', { name: 'login' }).click()
  //console.log(await page.textContent('body'))
  await expect(page.locator('body')).toContainText('Superuser logged in');
}

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'salainen'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('front page can be opened', async ({ page }) => {

    const title = page.getByText('blogs')
    await expect(title).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  test('user can log in', async ({ page }) => {
    await login(page)
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page)
    })

    test('create new blog', async ({ page }) => {

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
