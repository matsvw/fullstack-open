import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    setNotification: (_state, action) => action.payload,
    hideNotification: () => '',
  },
})

const { setNotification, hideNotification } = notificationSlice.actions

export const triggerNotification = (message, timeout) => {
  return async (dispatch) => {
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch(hideNotification())
    }, timeout)

  }
}

export const selectNotification = (state) => state.notification ?? '';

export default notificationSlice.reducer