import { createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
  console.log("Notification reducer action:", action);
  switch (action.type) {
    case "SHOW":
      return action.payload;
    case "HIDE":
      return "";
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  );

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;
