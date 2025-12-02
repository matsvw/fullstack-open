import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="blogStyle">
      <b>{blog.title}</b>
      <input type="button" value={showDetails ? "hide" : "view"} onClick={() => setShowDetails(!showDetails)} style={{ float: "right" }} />
      {showDetails && 
        <BlogDetails blog={blog} />
      }
    </div>
  )
}

const BlogDetails = ({ blog }) => {
  return (
    <div>
      <div>{blog.author}</div>
      <div>{blog.url}</div>
      <div>
        likes {blog.likes}
        <button style={{ marginLeft: "10px" }}>like</button>
      </div>
    </div>
  )
}

export default Blog