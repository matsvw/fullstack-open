const { test, expect, describe, beforeEach, beforeAll } = require('@playwright/test')

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

const altUser = {
  name: 'Another User',
  username: 'altuser',
  password: 'salainen'
}

const login = async (page, user) => {
  await page.getByLabel('username').fill(user.username)
  await page.getByLabel('password').fill(user.password)
  await page.getByRole('button', { name: 'login' }).click()

  await expect(page.locator('body')).toContainText(`${user.name} logged in`)
}

const createBlog = async (page, blog) => {
  //create new blog
  await page.getByRole('button', { name: 'new blog' }).click()

  //fill blog details
  await page.getByRole('textbox', { name: 'title' }).fill(blog.title)
  await page.getByRole('textbox', { name: 'author' }).fill(blog.author)
  await page.getByRole('textbox', { name: 'url' }).fill(blog.url)

  //submit blog
  await page.getByRole('button', { name: 'create' }).click()

  const newBlog = page.locator('#blogentry').getByText(blog.title, { exact: false }) // ignore the nofification text
  await expect(newBlog).toBeVisible()
}

// REset users only once before all tests
test.beforeAll(async ({ browser }) => {
  console.log(`Running setup for browser: ${browser.browserType().name()}`)

  // ✅ Create a standalone API context (not tied to test fixtures)
   const apiContext = await browser.newContext();

  await apiContext.request.post('/api/testing/reset/users');
  await apiContext.request.post('/api/users', { data: testUser });
  await apiContext.request.post('/api/users', { data: altUser });

})

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.request.post('/api/testing/reset/blogs') //reset blogs before each test
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
      await login(page, testUser)
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
      await login(page, testUser)
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, testBlog)
    })

    test('a blog can be liked', async ({ page }) => {
      
      await createBlog(page, testBlog) 
      const newBlog = page.locator('#blogentry').filter({ hasText: testBlog.title }).last()
      //console.log(await newBlog.textContent())
      await newBlog.getByRole('button', { name: 'view' }).click()
      await newBlog.getByRole('button', { name: 'like', exact: true }).click()
      await expect(newBlog).toContainText('likes 1')
      await newBlog.getByRole('button', { name: 'like', exact: true }).click()
      //console.log(await newBlog.textContent())
      await expect(newBlog).toContainText('likes 2')
    })

    test('a blog can be deleted', async ({ page }) => {

      await createBlog(page, testBlog)
      const newBlog = page.locator('#blogentry').filter({ hasText: testBlog.title }).last()
      await newBlog.getByRole('button', { name: 'view' }).click()

      // Register the dialog handler BEFORE the action that triggers it
      page.once('dialog', async (dialog) => {
        console.log(`Dialog message: ${dialog.message()}`)
        await dialog.accept() // Clicks "OK"
      })
      console.log(await newBlog.textContent())
      await newBlog.getByRole('button', { name: 'remove' }).click()
      const deletedBlog = page.locator('#blogentry').getByText(testBlog.title, { exact: false })
      await expect(deletedBlog).not.toBeVisible()
    })

    test('a blog cannot be deleted by another user', async ({ page }) => {

      await createBlog(page, testBlog)
      await page.getByRole('button', { name: 'logout' }).click()
      await login(page, altUser)
      const newBlog = page.locator('#blogentry').filter({ hasText: testBlog.title }).last()
      await newBlog.getByRole('button', { name: 'view' }).click()
      console.log(await newBlog.textContent())
      await expect(newBlog.getByRole('button', { name: 'remove' })).not.toBeVisible() // remove button should not be visible

    })

  })
})


