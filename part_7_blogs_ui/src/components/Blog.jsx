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
      // add expanded user details, as the return from the backend will not contain this
      updatedBlog.user = {
        username: user.username,
        name: user.name,
        id: user.id,
      }
      const blogs = queryClient.getQueryData(['blogs'])
      //queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)),
      )
      notificationDispatch({
        type: 'SHOW_MESSAGE',
        payload: `updated blog '${updatedBlog.title}'`,
      })
    },
    onError: (error) => {
      console.log(error)
      notificationDispatch({
        type: 'SHOW_ERROR',
        payload: `Error creating blog: ${error.response.data.error}`,
      })
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: (blog) => blogService.remove(blog.id),
    onSuccess: (_, blog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter((b) => b.id !== blog.id),
      )

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
      </div>
    )
  }
}

export default Blog
