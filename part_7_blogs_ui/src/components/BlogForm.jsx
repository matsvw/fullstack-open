import { useState, useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'

import blogService from '../services/blogs'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const { notificationDispatch } = useContext(NotificationContext)
  const { userState } = useContext(UserContext)
  const user = userState.user

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      // add expanded user details, as the return from the backend will not contain this
      newBlog.user = { username: user.username, name: user.name, id: user.id }
      queryClient.setQueryData(['blogs'], (prev) => {
        // If there is no data yet, skip this
        if (!prev) return prev

        return prev.concat(newBlog)
      })

      notificationDispatch({
        type: 'SHOW_MESSAGE',
        payload: `a new blog '${newBlog.title}' by ${newBlog.author} added`,
      })
    },
    onError: (error) => {
      console.log(error)
      notificationDispatch({
        type: 'SHOW_ERROR',
        payload: `Error creating blog: ${error.response.data.error}`,
      })
    },
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async (event) => {
    event.preventDefault()

    newBlogMutation.mutate({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create blog</h2>

      {/* Thanks to Copilot for the improved form styling suggestion! */}
      <form
        onSubmit={createBlog}
        style={{
          display: 'grid',
          gridTemplateColumns: '100px 1fr',
          gap: '10px',
          maxWidth: '400px',
        }}
      >
        <label htmlFor="title">title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <label htmlFor="author">author</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />

        <label htmlFor="url">url</label>
        <input
          id="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />

        <button type="submit" style={{ gridColumn: 'span 2' }}>
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
