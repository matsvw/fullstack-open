import { createSlice, createSelector } from '@reduxjs/toolkit'
import { selectFilter } from './filterReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updatedAnecdote = action.payload;
      const index = state.findIndex(a => a.id === updatedAnecdote.id);
      if (index !== -1) {
        state[index] = updatedAnecdote;
      }
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  },
})

export const selectAnecdotes = state => state.anecdotes

export const selectFilteredAnecdotes = createSelector(
   [selectAnecdotes, selectFilter],
  (anecdotes, filter) => filter ? anecdotes.filter(a => a.content.includes(filter)) : anecdotes
)

export const selectSortedByVotes = createSelector(
  [selectFilteredAnecdotes],
  anecdotes => [...anecdotes].sort((a, b) => b.votes - a.votes)
)

export const { createAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer