export default Notification;

import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

const Notification = () => {
  const { notification, notificationDispatch } =
    useContext(NotificationContext);
  console.log("Notification: ", notification);

  if (!notification) {
    return null;
  }

  setTimeout(() => {
    notificationDispatch({ type: "HIDE" });
  }, 3000);

  return (
    <div className={notification.isError ? "error" : "notification"}>
      {notification.message}
    </div>
  );
};
