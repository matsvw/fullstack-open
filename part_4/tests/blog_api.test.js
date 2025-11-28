const { test, after, before, describe } = require('node:test')
const assert = require('node:assert')

const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

let blogsAdded = 0

// using before intead of beforeEach as we can use the same data set through all tests
before(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.blogList)
})

describe('initial tests retrieving blogs', () => {
  test('total number of blogs returned with GET is correct', async () => {
    const response = await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.length, helper.blogList.length)
  })

  test('get one and check content (incl. id)', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const expectedBlog = blogsAtStart.at(-1) // check last
    const response = await api.get(`/api/blogs/${expectedBlog.id}`).expect(200)

    assert.deepStrictEqual(response.body, expectedBlog)
    assert(expectedBlog.id && !expectedBlog._id, 'Blog from DB does not expose correct id field')
    assert(response.body.id && !response.body._id, 'Blog from API does not expose correct id field')
  })
})

describe('adding a new blog', () => {

  test('a valid blog can be added', async () => {
    const title = `API POST test: ${Date.now()}`
    const newBlog = {
      title: title,
      author: 'Timo Testaaja',
      url: 'https://dummy.org',
      likes: 0
    }

    const resultBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, { ...newBlog, id: resultBlog.body.id })

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.blogList.length + blogsAdded + 1)
    blogsAdded++

    const contents = blogsAtEnd.map(b => b.title)
    assert(contents.includes(title))

  })

  test('likes defaults to zero', async () => {
    const title = `API POST default likes test: ${Date.now()}`
    const newBlog = {
      title: title,
      author: 'Timo Testaaja',
      url: 'https://dummy.org',
    }

    const resultBlog = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultBlog.body, { ...newBlog, id: resultBlog.body.id, likes: 0 })

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.blogList.length + blogsAdded + 1)
    blogsAdded++

    const contents = blogsAtEnd.map(b => b.title)
    assert(contents.includes(title))

  })

  test('blog without url is not added', async () => {
    const newBlog = {
      title: 'Testing',
      author: 'Timo Testaaja',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.blogList.length + blogsAdded)
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Timo Testaaja',
      url: 'https://dummy.org',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.blogList.length + blogsAdded)
  })

})

describe('update blog', () => {

  test('update existing blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const oldBlog = blogsAtStart.at(-1)
    const newTitle = `API PUT test: ${Date.now()}`

    oldBlog.title = newTitle
    await api
      .put(`/api/blogs/${oldBlog.id}`)
      .send(oldBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.blogList.length + blogsAdded)

    const savedBlog = blogsAtEnd.find(b => b.title === newTitle)
    assert(savedBlog, 'Updated blog not found with new title')
    assert(savedBlog.id === oldBlog.id, `ID of updated blog does not match: ${savedBlog.id} != ${oldBlog.id}`)
  })

})

describe('delete blog', () => {

  test('delete one and check count', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.blogList.length + blogsAdded - 1) // we have added and removed one, so the length should be the same
    blogsAdded--
  })

})

after(async () => {
  await mongoose.connection.close()
})