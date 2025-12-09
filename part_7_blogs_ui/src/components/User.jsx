import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import UserContext from '../contexts/UserContext'
import userService from '../services/users'

const User = () => {
  const { id: userId } = useParams()
  const { userState } = useContext(UserContext)

  const {
    data: user = null,
    isLoading,
    isError,
    error: _,
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => userService.getOne(userId, true),
    enabled: !!userState.user,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  if (isLoading) {
    return <p>Loading users...</p>
  }
  if (!userState.user) {
    return <p>No user logged in!</p>
  }
  if (!isError && user) {
    return (
      <div>
        <h3>{user.name}</h3>
        <h4>Added blogs:</h4>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default User
