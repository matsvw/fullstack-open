import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, handleBlogUpdated, handleBlogRemoved, setTimeoutMessage, }) => {
  const [showDetails, setShowDetails] = useState(false)

  const likeBlog = async () => {
    try {
      console.log(`Liked blog: ${blog.title}`)
      // handling the user not needed as the backend will default to the authenticated user
      const newBlog = { ...blog, likes: blog.likes + 1 }
      await blogService.update(blog.id, newBlog)
      handleBlogUpdated(newBlog)
    } catch (error) {
      setTimeoutMessage(
        `error liking blog: ${error.response.data.error}`,
        true
      )
    }
  }

  const removeBlog = async (blog) => {
    try {
      if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}?`)) {
        console.log('Removing blog: ',blog)
        await blogService.remove(blog.id)
        // Notify parent component to remove blog from list
        handleBlogRemoved(blog)
      }
    } catch (error) {
      setTimeoutMessage(
        `error removing blog: ${error.response.data.error}`,
        true
      )
    }
  }

  return (
    <div className='blogStyle' id="blogentry">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <b>{blog.title}</b>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <p style={{ margin: '0 30px 0 0' }} >{blog.likes}</p>
          <input type='button' value={showDetails ? 'hide' : 'view'} onClick={() => setShowDetails(!showDetails)} />
        </div>
      </div>
      {showDetails &&
        <div>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={likeBlog} style={{ marginLeft: '10px' }}>like</button>
          </div>
          <div>added by {blog.user?.name}</div>
          <button onClick={() => removeBlog(blog)} style={{ visibility: (user?.username && user.username === blog.user?.username) ? 'visible' : 'hidden' }}>remove</button>
        </div>
      }
    </div>
  )
}

export default Blog