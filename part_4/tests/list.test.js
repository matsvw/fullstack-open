const { singleBlog, blogList } = require('./testdata.js')

const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('common', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('total likes', () => {
  test('empty list returns zero', () => {
    const blogs = []
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 0)
  })

  test('list with one entry matches the likes of that entry', () => {
    const result = listHelper.totalLikes([singleBlog])
    assert.strictEqual(result, singleBlog.likes)
  })

  test('list with multiple entries returns the correct total', () => {
    const totLikes = blogList.reduce((sum, blog) => sum + blog.likes, 0)
    const result = listHelper.totalLikes(blogList)
    assert.strictEqual(result, totLikes)
  })

})