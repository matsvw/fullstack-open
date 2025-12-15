const Notification = ({ message, isError=true }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={isError ? "error" : "notification"}>
      {message}
    </div>
  )
}

export default Notification