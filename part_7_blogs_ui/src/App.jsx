import { useState, useEffect, useRef } from "react";
import Togglable from "./components/Toggable";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const loginCookieName = "loggedNoteAppUser";

const App = () => {
  const blogFormRef = useRef();
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);
  const [sortAscending, setSortAscending] = useState(true);

  const setTimeoutMsg = (message, isError = true) => {
    if (isError) {
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      setInfoMessage(message);
      setTimeout(() => {
        setInfoMessage(null);
      }, 5000);
    }
  };

  const sortBlogsByLikes = () => {
    const sortedBlogs = [...blogs].sort((a, b) => {
      return sortAscending ? a.likes - b.likes : b.likes - a.likes;
    });
    setBlogs(sortedBlogs);
    setSortAscending(!sortAscending);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAllExpanded();
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(loginCookieName);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

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
      setTimeoutMsg("wrong credentials", true);
    }
  };

  const handeLogout = async () => {
    setUser(null);
    window.localStorage.removeItem(loginCookieName);
  };

  const handleBlogCreated = (newBlog) => {
    setBlogs(blogs.concat(newBlog));
    blogFormRef.current.toggleVisibility();
    setTimeoutMsg(
      `a new blog '${newBlog.title}' by ${newBlog.author} added`,
      false,
    );
  };

  const handleBlogUpdated = (updatedBlog) => {
    setBlogs(
      blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)),
    );
  };

  const handleBlogRemoved = (removedBlog) => {
    setBlogs(blogs.filter((blog) => blog.id !== removedBlog.id));
    setTimeoutMsg(`blog '${removedBlog.title}' removed`, false);
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
                  setTimeoutMessage={setTimeoutMsg}
                  handleBlogCreated={handleBlogCreated}
                />
                <br />
              </Togglable>
            </div>
            <div style={{ float: "right", textAlign: "right" }}>
              <button onClick={sortBlogsByLikes}>
                sort likes {sortAscending ? "ascending" : "descending"}
              </button>
            </div>
          </div>
          <br />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleBlogUpdated={handleBlogUpdated}
              handleBlogRemoved={handleBlogRemoved}
              setTimeoutMessage={setTimeoutMsg}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} isError={true} />
      <Notification message={infoMessage} isError={false} />
      {loginForm()}
      <br />
      {blogList()}
    </div>
  );
};

export default App;
