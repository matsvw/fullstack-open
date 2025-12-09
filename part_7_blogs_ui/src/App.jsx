import { useState, useContext } from 'react'
import { Routes, Route } from 'react-router-dom'

import UserContext from './contexts/UserContext'

import BlogList from './components/BlogList'
import UserList from './components/UserList'
import Notification from './components/Notification'

const App = () => {
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

  const loginForm = () => {
    if (userState.user) {
      return (
        <div>
          <p>{`${userState.user.name} logged in`}</p>
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

  return (
    <div>
      <h1>Blogs Galore!</h1>
      <Notification />
      <br />
      {loginForm()}
      <br />
      <Routes>
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<p>Implement this!</p>} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/blogs/:id" element={<p>Implement this!</p>} />
        <Route path="/" element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App
