import { useContext } from 'react'
import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  
  const { notification, notificationDispatch } = useContext(NotificationContext)
  console.log('Notification:', notification)

  if (!notification) return null

  // If not null, we have a notification to show. Set timeout to hide it after 3 seconds.
  setTimeout(() => {
    notificationDispatch({ type: 'HIDE' })
  }, 3000)

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification
