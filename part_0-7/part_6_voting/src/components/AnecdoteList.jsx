import { useDispatch, useSelector } from 'react-redux'
import { saveAnecdote, selectSortedByVotes } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const anecdotes = useSelector(selectSortedByVotes)
  const dispatch = useDispatch()

  const vote = async(id) => {
    console.log('vote', id)
    const target = anecdotes.find(a => a.id === id);
    if (target) {
      console.log(target)
      dispatch(saveAnecdote({ ...target, votes: target.votes + 1 }))
    }
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
