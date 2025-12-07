import { useDispatch, useSelector } from 'react-redux'
import { updateAnecdote, selectSortedByVotes } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes.js'


const AnecdoteForm = () => {
  const anecdotes = useSelector(selectSortedByVotes)
  const dispatch = useDispatch()

  const vote = async(id) => {
    console.log('vote', id)
    const target = anecdotes.find(a => a.id === id);
    if (target) {
      console.log(target)
      const updatedAnecdote = await anecdoteService.updateExisting({ ...target, votes: target.votes + 1 })
      dispatch(updateAnecdote(updatedAnecdote))
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
