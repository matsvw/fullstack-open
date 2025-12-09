import { useState, useContext, HTMLElement } from 'react'
import { Routes, Route, Link, NavLink } from 'react-router-dom'

import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Container,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

import UserContext from './contexts/UserContext'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import Notification from './components/Notification'

const LoginForm = () => {
  const { login, userState } = useContext(UserContext)

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

const MenuBar = () => {
  const { userState, logout } = useContext(UserContext)
  const [anchorEl, setAnchorEl] = useState(null)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <AppBar position="static">
      <Toolbar>
        {isMobile && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" component="div">
          Blogs!
        </Typography>

        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 2 }}>
            <Button
              component={NavLink}
              to="/blogs"
              sx={{
                color: 'inherit',
                '&.active': {
                  fontWeight: 600,
                },
              }}
              variant="outlined"
            >
              Blogs
            </Button>
            <Button
              component={NavLink}
              to="/users"
              sx={{
                color: 'inherit',
                '&.active': {
                  fontWeight: 600,
                },
              }}
              variant="outlined"
            >
              Users
            </Button>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
          <Typography variant="subtitle1" component="div" sx={{ mr: 2 }}>
            {userState?.user?.name ?? 'Nobody'}
          </Typography>
          <Button color="inherit" onClick={handleLogout}>
            LOGOUT
          </Button>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={NavLink} to="/blogs" onClick={handleMenuClose}>
            Blogs
          </MenuItem>
          <MenuItem component={NavLink} to="/users" onClick={handleMenuClose}>
            Users
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

const App = () => {
  const { userState } = useContext(UserContext)
  return (
    <>
      <CssBaseline enableColorScheme />
      {userState.user && <MenuBar />}
      {!userState.user && <LoginForm />}
      <Notification />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Routes>
            <Route path="/users" element={<UserList />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/" element={<BlogList />} />
          </Routes>
        </Box>
      </Container>

      <Box component="footer" sx={{ py: 3, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Blogs Galore Ltd.
          </Typography>
        </Container>
      </Box>
    </>
  )
}

export default App
