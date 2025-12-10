import { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'

import { Typography, Box, Button, TextField } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteIcon from '@mui/icons-material/Delete'

import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'
import blogService from '../services/blogs'
import NoContent from './NoContent'
import Alert from './Alert'

const Blog = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [alertOpen, setAlertOpen] = useState(false)
  const [alertTitle, setAlertTitle] = useState('')
  const [alertPrompt, setAlertPrompt] = useState('')
  const [alertPayload, setAlertPayload] = useState('')
  const [alertAction, setAlertAction] = useState('')
  const [blogComment, setBlogComment] = useState('')

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
    mutationFn: ({ blog }) => blogService.update(blog),
    onSuccess: (updatedBlog, payload) => {
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
        payload: `${payload.action === 'like' ? 'Liked' : 'Updated'} blog '${updatedBlog.title}'`,
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
        payload: `Commented on blog '${updatedBlog.title}'`,
      })
      setBlogComment('')
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
        payload: `Blog with title '${blog.title}' was removed`,
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

  const onCloseAlert = (action, payload) => {
    setAlertOpen(false)
    switch (action) {
      case 'cancel':
        console.log('Alert action cancelled')
        break
      case 'remove':
        deleteBlogMutation.mutate(payload)
        break
      default:
        console.log('Unknown alert action: ', action)
    }
    setAlertTitle('')
    setAlertPrompt('')
    setAlertAction('')
    setAlertPayload(null)
  }

  const likeBlog = (blogToLike) => {
    updateBlogMutation.mutate({
      blog: { ...blogToLike, likes: blogToLike.likes + 1 },
      action: 'like',
    })
  }

  const removeBlog = (blogToRemove) => {
    setAlertTitle('Delete blog')
    setAlertPrompt(`Are you sure you want to remove '${blogToRemove.title}'?`)
    setAlertAction('remove')
    setAlertPayload(blogToRemove)
    setAlertOpen(true)
  }

  const commentBlog = (event, blog) => {
    event.preventDefault()
    console.log(blogComment)
    commentBlogMutation.mutate({ blog, comment: blogComment })
  }

  if (isLoading || !userState.user) {
    return (
      <NoContent
        isError={false}
        isLoading={isLoading}
        noUser={!userState.user}
      />
    )
  }
  if (!isError && user) {
    return (
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Alert
          open={alertOpen}
          action={alertAction}
          title={alertTitle}
          prompt={alertPrompt}
          payload={alertPayload}
          onClose={onCloseAlert}
        />
        <Typography variant="h6" component="div" sx={{ mb: '1.5rem' }}>
          {blog.title}
        </Typography>
        <Typography variant="body1" component="div" sx={{ mb: '1rem' }}>
          Author: {blog.author}
        </Typography>
        <Typography variant="body1" component="div" sx={{ mb: '1rem' }}>
          Url:{' '}
          <a href={blog.url} target="_blank">
            {blog.url}
          </a>
        </Typography>
        <Typography
          variant="body1"
          component="div"
          sx={{ mb: '1rem', alignItems: 'center' }}
        >
          Likes: {blog.likes}
        </Typography>
        <Typography variant="body1" component="div" sx={{ mb: '1rem' }}>
          Added by: {blog.user?.name ?? 'unknown user'}
        </Typography>
        <br />
        <Button
          variant="outlined"
          onClick={() => removeBlog(blog)}
          disabled={!(user?.username && user.username === blog.user?.username)}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          onClick={() => likeBlog(blog)}
          sx={{ ml: '2rem' }}
          startIcon={<ThumbUpIcon />}
        >
          Like
        </Button>

        <form
          onSubmit={(event) => commentBlog(event, blog)}
          id="comment-blog-form"
          style={{ marginTop: '1rem' }}
        >
          <TextField
            required
            margin="dense"
            id="comment"
            name="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            value={blogComment}
            onChange={(e) => setBlogComment(e.target.value)}
          />
        </form>
        <Button
          type="submit"
          variant="outlined"
          form="comment-blog-form"
          disabled={blogComment.length < 3}
        >
          Add Comment
        </Button>

        <Typography
          variant="h6"
          component="div"
          sx={{ mb: '1.5rem', mt: '1.5rem' }}
        >
          Comments
        </Typography>
        <ul>
          {blog.comments &&
            blog.comments.map((comment) => (
              <li key={`${comment._id}`}>{comment.comment}</li>
            ))}
        </ul>
      </Box>
    )
  }
}

export default Blog
