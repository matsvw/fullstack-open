import { createSlice, createSelector, current } from '@reduxjs/toolkit'
import { selectFilter } from './filterReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    voteForAnecdote(state, action) {
      console.log(current(state))
      const target = state.find(a => a.id === action.payload);
      if (target) {
        target.votes += 1
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

export const { createAnecdote, voteForAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer