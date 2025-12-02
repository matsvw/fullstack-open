import { useState, useEffect, useRef } from 'react'
import Togglable from './components/Toggable'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const loginCookieName = 'loggedNoteAppUser'

const App = () => {
  const blogFormRef = useRef()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [infoMessage, setInfoMessage] = useState(null)

  const setTimeoutMsg = (message, isError = true) => {
    if (isError) {
      setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } else {
      setInfoMessage(message)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loginCookieName)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(loginCookieName, JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      setTimeoutMsg('wrong credentials', true)
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handeLogout = async event => {
    setUser(null)
    window.localStorage.removeItem(loginCookieName)
  }

  const handleBlogCreated = (newBlog) => {
    setBlogs(blogs.concat(newBlog))
    blogFormRef.current.toggleVisibility()
    setTimeoutMsg(`a new blog "${newBlog.title}" by ${newBlog.author} added`, false)
  }

  const loginForm = () => {
    if (user) {
      return (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handeLogout}>logout</button>
        </div>
      )
    }
    return (
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    )
  }

  const blogList = () => {
    if (user) {
      return (
        <div>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm setTimeoutMessage={setTimeoutMsg} handleBlogCreated={handleBlogCreated} />
            <br />
          </Togglable>
          <br />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      )
    }
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} isError={true} />
      <Notification message={infoMessage} isError={false} />
      {loginForm()}
      <br />
      {blogList()}
    </div>
  )
}

export default App