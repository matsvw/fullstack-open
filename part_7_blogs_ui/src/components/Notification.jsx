import { useContext, useState } from 'react'
import Snackbar from '@mui/material/Snackbar'
import NotificationContext from '../contexts/NotificationContext'

const Notification = () => {
  const { notification } = useContext(NotificationContext)
  const [open, setOpen] = useState(notification ? true : false)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      severity={notification?.isError ? 'error' : 'success'}
      open={open}
      autoHideDuration={3000}
      onClose={handleClose}
      message={notification?.message}
    />
  )
}

export default Notification
