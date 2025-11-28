const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const expand = request.query.expand === 'true'

  let blogs
  if (expand) {
    blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  } else {
    blogs = await Blog.find({})
  }

  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  }
  else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const user = await User.findById(body.userId)

    if (!user) {
      return response.status(400).json({ error: 'userId missing or not valid' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.notes.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

  }
  catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body

    const oldBlog = await Blog.findById(request.params.id)
    if (!oldBlog) {
      return response.status(404).end()
    }

    oldBlog.title = title
    oldBlog.author = author
    oldBlog.url = url
    oldBlog.likes = likes

    const updatedBlog = await oldBlog.save()
    response.json(updatedBlog)
  }
  catch (error) {
    next(error)
  }
})

module.exports = blogsRouter