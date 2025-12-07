
// store/listenerMiddleware.js
import { createListenerMiddleware, isAnyOf, current } from '@reduxjs/toolkit';
import { updateAnecdote } from './reducers/anecdoteReducer';
import { setNotification, hideNotification } from './reducers/notificationReducer';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(updateAnecdote),
  effect: async (action, listenerApi) => {
    const { dispatch, delay, getState } = listenerApi
    console.log('Listener detected updateAnecdote action:', action);
    const id = action.payload.id
    // Look up the anecdote text from current state so the notification can show human-readable content instead of just an id.
    const anecdotes = getState().anecdotes || []
    const anecdote = anecdotes.find(a => a.id === id)
    const text = anecdote ? anecdote.content : id
    dispatch(setNotification(`Update anecdote: ${text}`))
    await delay(3000);
    dispatch(hideNotification())
  },
});

export default listenerMiddleware;