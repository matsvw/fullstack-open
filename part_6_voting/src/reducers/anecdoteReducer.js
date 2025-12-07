import { createSlice, createSelector } from '@reduxjs/toolkit'
import { selectFilter } from './filterReducer'
import anecdoteService from '../services/anecdotes'

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

const { setAnecdotes, createAnecdote , updateAnecdote } = anecdoteSlice.actions
export const { updateAnecdote: updateAnecdoteAction } = anecdoteSlice.actions // Need to use unique name for listener, otherwise it starts a loop

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const saveAnecdote = (anecdote) => {
  return async (dispatch) => {
    const updatedAnecdote= await anecdoteService.updateExisting(anecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export const selectAnecdotes = state => state.anecdotes

export const selectFilteredAnecdotes = createSelector(
   [selectAnecdotes, selectFilter],
  (anecdotes, filter) => filter ? anecdotes.filter(a => a.content.includes(filter)) : anecdotes
)

export const selectSortedByVotes = createSelector(
  [selectFilteredAnecdotes],
  anecdotes => [...anecdotes].sort((a, b) => b.votes - a.votes)
)


export default anecdoteSlice.reducer