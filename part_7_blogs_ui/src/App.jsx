import { useState, useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'

import UserContext from './contexts/UserContext'

import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import Notification from './components/Notification'

const Menu = () => {
  const { login, logout, userState } = useContext(UserContext)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    await login({ username, password })

    if (userState.status === 'authenticated') {
      setUsername('')
      setPassword('')
    }
  }

  const handeLogout = async () => {
    await logout()
    setUsername('')
    setPassword('')
  }

  if (userState.user) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px', // spacing between items
          backgroundColor: '#f0f0f0', // light grey background
          padding: '12px',
          borderRadius: '6px',
        }}
      >
        <Link to="/blogs" style={{ padding: '4px 8px' }}>
          blogs
        </Link>
        <Link to="/users" style={{ padding: '4px 8px' }}>
          users
        </Link>
        <p style={{ margin: 0 }}>{`${userState.user.name} logged in`}</p>
        <button onClick={handeLogout}>logout</button>
      </div>
    )
  } else {
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
}

const App = () => {
  return (
    <div>
      <Menu />
      <h1>Blogs Galore!</h1>
      <Notification />
      <br />
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App
