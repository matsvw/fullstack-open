import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: '',
  reducers: {
    setNotification: (_state, action) => action.payload,
    hideNotification: () => '',
  },
})

export const selectNotification = (state) => state.notification ?? '';

export const { setNotification, hideNotification } = notificationSlice.actions
export default notificationSlice.reducer