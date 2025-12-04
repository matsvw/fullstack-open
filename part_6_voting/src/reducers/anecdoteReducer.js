import { createSlice, createSelector, current } from '@reduxjs/toolkit'
import { selectFilter } from './filterReducer'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      state.push(asObject(action.payload))
    },
    voteForAnecdote(state, action) {
      console.log(current(state))
      const target = state.find(a => a.id === action.payload);
      if (target) {
        target.votes += 1
      }
    },
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

export const { createAnecdote, voteForAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer