
// store/listenerMiddleware.js
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { updateAnecdoteAction } from './reducers/anecdoteReducer';
import { triggerNotification } from './reducers/notificationReducer';

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(updateAnecdoteAction),
  effect: async (action, listenerApi) => {
    const { getState, dispatch } = listenerApi
    console.log('Listener detected updateAnecdote action:', action);
    const id = action.payload.id
    // Look up the anecdote text from current state so the notification can show human-readable content instead of just an id.
    const anecdotes = getState().anecdotes || []
    const anecdote = anecdotes.find(a => a.id === id)
    const text = anecdote ? anecdote.content : id
    dispatch(triggerNotification(`Update anecdote: ${text}`, 3000))
  },
});

export default listenerMiddleware;