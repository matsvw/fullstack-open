import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleBlogUpdated, setTimeoutMessage, }) => {
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

  return (
    <div className="blogStyle">
      <b>{blog.title}</b>
      <input type="button" value={showDetails ? "hide" : "view"} onClick={() => setShowDetails(!showDetails)} style={{ float: "right" }} />
      {showDetails &&
        <div>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={likeBlog} style={{ marginLeft: "10px" }}>like</button>
          </div>
          <div>added by {blog.user?.name}</div>
        </div>
      }
    </div>
  )
}

export default Blog