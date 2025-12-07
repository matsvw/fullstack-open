import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'

import { getAnecdotes } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    refetchOnWindowFocus: false,
    retry: 1,
  })
 
  console.log(JSON.parse(JSON.stringify(result)))
 
  if (result.isError) {
    console.log(result.error)
    return <div>anecdote service not available due to problems in server</div>
  }
  else if (result.isLoading) {
    return <div>loading data...</div>
  }
  else if (result.isSuccess) {
    const anecdotes = result.data

    return (
      <div>
        <h3>Anecdote app</h3>
  
        <Notification />
        <AnecdoteForm />
        <AnecdoteList anecdoteList={anecdotes} />
      </div>
    )
  }
}

export default App
