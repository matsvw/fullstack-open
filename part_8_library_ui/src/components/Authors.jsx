import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client/react'
import queries from '../helpers/queries'

const UpdateForm = ({ authors, show = true }) => {
  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const [setBornYear] = useMutation(queries.EDIT_AUTHOR, {
    onError: (error) => handleError(error),
    onCompleted: (data) => handleCompleted(data),
  })

  const submitYear = async (event) => {
    event.preventDefault()
    console.log(event)
    await setBornYear({ variables: { author, born: Number(born) } }) // need to await to get the onCompleted event
  }

  const handleCompleted = (data) => {
    console.log('Completed: ', data)
    if (!data?.editAuthor) {
      alert('Author not found!')
    } else {
      setAuthor('')
      setBorn('')
    }
  }

  const handleError = (error) => {
    console.error('Apollo error:', error.message)
    console.error('GraphQL errors:', error.graphQLErrors)

    alert(`Error updating birthyear: ${error.message}`)
  }

  if (!show || !authors) {
    return null
  }
  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submitYear}>
        <div>
          author
          <select onChange={({ target }) => setAuthor(target.value)} >
            <option value='' selected={'' === author}>Select author</option>
            {authors.map((a) => (
              <option key={a.id} value={a.name} selected={a.name === author}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form >
    </div>
  )
}


const Authors = ({ show = true, token }) => {
  const authorsResult = useQuery(queries.ALL_AUTHORS, { skip: !show })
  const authors = authorsResult?.data?.allAuthors

  if (!show) {
    return null
  }
  if (authorsResult.loading) {
    return <div>loading...</div>
  }
  if (authorsResult.error) {
    return <div>error loading data: {authorsResult.error}</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <UpdateForm show={Boolean(token)} authors={authors} />
    </div >
  )
}

export default Authors