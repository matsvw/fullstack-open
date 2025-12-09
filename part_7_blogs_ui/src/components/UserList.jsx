import { useContext, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import NotificationContext from '../contexts/NotificationContext'
import UserContext from '../contexts/UserContext'
import userService from '../services/users'

const UserList = () => {
  const { userState } = useContext(UserContext)
  const { notificationDispatch } = useContext(NotificationContext)

  // Conditionally fetch when user exists
  const {
    data: users = [],
    isLoading,
    isError,
    error: loadingError,
  } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAllExpanded,
    enabled: !!userState.user,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  useEffect(() => {
    if (isError) {
      notificationDispatch({
        type: 'SHOW_ERROR',
        payload: loadingError?.message ?? 'Failed to load usedrs',
      })
    }
  }, [isError, loadingError, notificationDispatch])

  if (isLoading) {
    return <p>Loading users...</p>
  }
  if (!userState.user) {
    return <p>No user logged in!</p>
  }
  return (
    <div>
      <h3>Users</h3>

      <table>
        <thead>
          <tr>
            <td style={{ width: '150px' }}>Name</td>
            <td style={{ width: '150px' }}>Username</td>
            <td style={{ width: '100px' }}># blogs</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
