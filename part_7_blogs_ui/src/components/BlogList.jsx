import { useState, useContext, useRef, useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'
import blogService from '../services/blogs'
import Toggable from './Toggable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogList = () => {
  const { userState } = useContext(UserContext)
  const { notificationDispatch } = useContext(NotificationContext)
  const [sortAscending, setSortAscending] = useState(true)
  const blogFormRef = useRef()

  // Conditionally fetch when user exists
  const {
    data: blogs = [],
    isLoading,
    isError,
    error: loadingError,
  } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => blogService.getAll(true),
    enabled: !!userState.user,
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

  if (isLoading) {
    return <p>Loading blogs...</p>
  }
  if (!userState.user) {
    return <p>No user logged in!</p>
  }
  return (
    <div>
      <h3>Blogs</h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '50% 50%',
          gap: '10px',
          maxWidth: '50%',
        }}
      >
        <div>
          <Toggable buttonLabel="new blog" ref={blogFormRef}>
            <BlogForm />
            <br />
          </Toggable>
        </div>
        <div style={{ float: 'right', textAlign: 'right' }}>
          <button onClick={toggleSort}>
            sort likes {sortAscending ? 'ascending' : 'descending'}
          </button>
        </div>
      </div>
      <br />
      {sortedBlogs.map((blog) => (
        <div key={`div_${blog.id}`} className="blogStyle" id="blogentry">
          <Link key={`link_${blog.id}`} to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
