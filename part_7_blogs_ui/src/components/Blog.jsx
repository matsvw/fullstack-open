import { useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'
import blogService from '../services/blogs'

const Blog = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { userState } = useContext(UserContext)
  const { notificationDispatch } = useContext(NotificationContext)
  const user = userState.user
  const { id: blogId } = useParams()

  const {
    data: blog = null,
    isLoading,
    isError,
    error: _,
  } = useQuery({
    queryKey: ['blog', blogId],
    queryFn: () => blogService.getOne(blogId, true),
    enabled: !!userState.user,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const updateBlogMutation = useMutation({
    mutationFn: (blog) => blogService.update(blog),
    onSuccess: (updatedBlog) => {
      updatedBlog.user = blog.user // copy user details as they are not expanded here
      queryClient.setQueryData(['blogs'], (prev) => {
        // If there is no data yet, skip this
        if (!prev) return prev

        return prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      })

      queryClient.setQueryData(['blog', updatedBlog.id], () => {
        return updatedBlog
      })

      notificationDispatch({
        type: 'SHOW_MESSAGE',
        payload: `updated blog '${updatedBlog.title}'`,
      })
    },
    onError: (error) => {
      console.log(error)
      notificationDispatch({
        type: 'SHOW_ERROR',
        payload: `Error updating blog: ${error.response.data.error}`,
      })
    },
  })

  const commentBlogMutation = useMutation({
    mutationFn: ({ blog, comment }) => blogService.comment(blog.id, comment),
    onSuccess: (updatedBlog) => {
      updatedBlog.user = blog.user // copy user details as they are not expanded here
      queryClient.setQueryData(['blogs'], (prev) => {
        // If there is no data yet, skip this
        if (!prev) return prev

        return prev.map((b) => (b.id === updatedBlog.id ? updatedBlog : b))
      })

      queryClient.setQueryData(['blog', updatedBlog.id], () => {
        return updatedBlog
      })

      notificationDispatch({
        type: 'SHOW_MESSAGE',
        payload: `commented on blog '${updatedBlog.title}'`,
      })
    },
    onError: (error) => {
      console.log(error)
      notificationDispatch({
        type: 'SHOW_ERROR',
        payload: `Error commenting blog: ${error.response.data.error}`,
      })
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => blogService.remove(blog.id),
    onSuccess: (_, blog) => {
      queryClient.setQueryData(['blogs'], (prev) => {
        // If there is no data yet, skip this
        if (!prev) return prev

        return prev.filter((b) => b.id !== blog.id)
      })

      notificationDispatch({
        type: 'SHOW_MESSAGE',
        payload: `blog with title '${blog.title}' was removed`,
      })
      navigate('/blogs')
    },
    onError: (error) => {
      console.log(error)
      notificationDispatch({
        type: 'SHOW_ERROR',
        payload: `Error removing blog: ${error.response.data.error}`,
      })
    },
  })

  const likeBlog = (blogToLike) => {
    updateBlogMutation.mutate({ ...blogToLike, likes: blogToLike.likes + 1 })
  }

  const removeBlog = (blogToRemove) => {
    deleteBlogMutation.mutate(blogToRemove)
  }

  const commentBlog = async (event, blog) => {
    event.preventDefault()
    const comment = event.target.comment.value
    commentBlogMutation.mutate({ blog, comment })
  }

  if (isLoading) {
    return <p>Loading users...</p>
  }
  if (!userState.user) {
    return <p>No user logged in!</p>
  }
  if (!isError && user) {
    return (
      <div>
        <h3>{blog.title}</h3>
        <div>
          <div>{blog.author}</div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button
              onClick={() => likeBlog(blog)}
              style={{ marginLeft: '10px' }}
            >
              like
            </button>
          </div>
          <div>added by {blog.user?.name ?? 'unknown user'}</div>
          <button
            onClick={() => removeBlog(blog)}
            style={{
              visibility:
                user?.username && user.username === blog.user?.username
                  ? 'visible'
                  : 'hidden',
            }}
          >
            remove
          </button>
        </div>
        <h3>Comments</h3>
        <form onSubmit={(event) => commentBlog(event, blog)}>
          <input id="comment" type="text" />
          <button type="submit" style={{ gridColumn: 'span 2' }}>
            add comment
          </button>
        </form>
        <ul>
          {blog.comments &&
            blog.comments.map((comment) => (
              <li key={`${comment._id}`}>{comment.comment}</li>
            ))}
        </ul>
      </div>
    )
  }
}

export default Blog
