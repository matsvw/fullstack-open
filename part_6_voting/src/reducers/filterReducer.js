import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filters',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      console.log(`Current filter: ${state}, new value: ${action.payload}`);
      return action.payload
    },
  },
})

export const selectFilter = (state) => state.filter ?? ''

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer