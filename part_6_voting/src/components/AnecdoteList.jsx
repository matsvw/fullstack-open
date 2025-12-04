import { useDispatch, useSelector } from 'react-redux'
import { voteForAnecdote, selectSortedByVotes } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const anecdotes = useSelector(selectSortedByVotes)
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
