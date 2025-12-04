import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(anecdote => state.filter === 'ALL' || anecdote.content.includes(state.filter)).sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = id => {
    console.log('vote', id)
    dispatch(voteForAnecdote(id))
  }

  return (
    <div>
    {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteForm
