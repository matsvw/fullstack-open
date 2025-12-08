import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

const Notification = () => {
  const { notification, notificationDispatch } =
    useContext(NotificationContext);
  
  if (!notification) {
    return null;
  }

  console.log("Notification triggered: ", notification);

  setTimeout(() => {
    notificationDispatch({ type: "HIDE" });
  }, 3000);

  return (
    <div className={notification.isError ? "error" : "notification"}>
      {notification.message}
    </div>
  );
};

export default Notification;