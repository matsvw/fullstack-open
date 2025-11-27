const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

// TODO - this file still needs to be checked and updated as necessary

blogsRouter.get('/', (request, response) => {
  Blog.find({}).then(blogs => {
    response.json(blogs)
  })
})

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (request, response, next) => {
  const body = request.body

  const blog = new Blog({
    content: body.content,
    important: body.important || false,
  })

  blog.save()
    .then(savedNote => {
      response.json(savedNote)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

blogsRouter.put('/:id', (request, response, next) => {
  const { content, important } = request.body

  Blog.findById(request.params.id)
    .then(note => {
      if (!note) {
        return response.status(404).end()
      }

      Blog.content = content
      Blog.important = important

      return Blog.save().then((updatedNote) => {
        response.json(updatedNote)
      })
    })
    .catch(error => next(error))
})

module.exports = blogsRouter