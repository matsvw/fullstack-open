import { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ setTimeoutMessage, handleBlogCreated }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    try {
      event.preventDefault()
      const result = await blogService.create({
        title,
        author,
        url
      })

      setTitle('')
      setAuthor('')
      setUrl('')
      handleBlogCreated(result)
    }
    catch (error) {
      setTimeoutMessage(
        `error creating blog: ${error.response.data.error}`,
        true
      )
    }
  }

  return (
    <div>
      <h2>create blog</h2>

      {/* Thanks to Copilot for the improved form styling suggestion! */}
      <form onSubmit={createBlog} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '10px', maxWidth: '400px' }} >
        <label htmlFor="title">title</label>
        <input id="title" type="text" onChange={({ target }) => setTitle(target.value)} />

        <label htmlFor="author">author</label>
        <input id="author" type="text" onChange={({ target }) => setAuthor(target.value)} />

        <label htmlFor="url">url</label>
        <input id="url" type="text" onChange={({ target }) => setUrl(target.value)} />

        <button type="submit" style={{ gridColumn: 'span 2' }}>
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm