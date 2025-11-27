const logger = require('./logger')

const dummy = (blogs) => {
  logger.info(blogs)
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const mostLikes = blogs.reduce((max, current) =>
    current.likes > max.likes ? current : max
  )
  logger.info('Most liked blog:', mostLikes)
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}