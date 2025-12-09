import { useState, useEffect, useRef, useContext, useMemo } from "react";
import { useQuery } from '@tanstack/react-query'

import NotificationContext from './contexts/NotificationContext'
import Togglable from "./components/Toggable";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const loginCookieName = "loggedNoteAppUser";

const App = () => {
  const { notificationDispatch } = useContext(NotificationContext)

  const blogFormRef = useRef();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loginCookieName);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  
  // Conditionally fetch when user exists
  const {
    data: blogs = [],
    isLoading,
    isError,
    error: loadingError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAllExpanded,
    enabled: !!user, 
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const sortedBlogs = useMemo(() => {
    const list = blogs ?? []
    const copy = [...list]
    copy.sort((a, b) => (sortAscending ? a.likes - b.likes : b.likes - a.likes))
    return copy
  }, [blogs, sortAscending])

  const toggleSort = () => setSortAscending((s) => !s)

  useEffect(() => {
    if (isError) {
      notificationDispatch({
        type: 'SHOW_ERROR',
        payload: loadingError?.message ?? 'Failed to load blogs',
      })
    }
  }, [isError, loadingError, notificationDispatch])

  // If token depends on user changes later:
  useEffect(() => {
    if (user?.token) {
      blogService.setToken(user.token)
    }
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem(loginCookieName, JSON.stringify(user));
      blogService.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      notificationDispatch({ type: 'SHOW_ERROR', payload: 'wrong credentials', })
    }
  };

  const handeLogout = async () => {
    setUser(null);
    window.localStorage.removeItem(loginCookieName);
  };

  const loginForm = () => {
    if (user) {
      return (
        <div>
          <p>{`${user.name} logged in`}</p>
          <button onClick={handeLogout}>logout</button>
        </div>
      );
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
    );
  };

  const blogList = () => {
    if (isLoading) {
      <p>Loading blogs...</p>
    }
    if (user) {
      return (
        <div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "50% 50%",
              gap: "10px",
              maxWidth: "50%",
            }}
          >
            <div>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <BlogForm
                  user={user}
                />
                <br />
              </Togglable>
            </div>
            <div style={{ float: "right", textAlign: "right" }}>
              <button onClick={toggleSort}>
                sort likes {sortAscending ? "ascending" : "descending"}
              </button>
            </div>
          </div>
          <br />
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {loginForm()}
      <br />
      {blogList()}
    </div>
  );
};

export default App;
