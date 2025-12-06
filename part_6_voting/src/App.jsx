import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { setAnecdotes } from './reducers/anecdoteReducer'
import anecdoteService from './services/anecdotes.js'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService.getAll().then(a => dispatch(setAnecdotes(a)))
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
