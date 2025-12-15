import { useState } from 'react'
import { useMutation } from '@apollo/client/react'
import queries from '../helpers/queries'

const NewBook = ({ show = true }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])


  const [addBook] = useMutation(queries.ADD_BOOK, {
    refetchQueries: [],
    onError: (error) => handleError(error),
    onCompleted: (data) => handleCompleted(data),
  })

  const submit = async (event) => {
    event.preventDefault()

    const genreList = genres
    if (genre && !genreList.find(g => g === genre)) {
      genreList.push(genre) //Add by default. Need to do it like this since setGenres is not fast enough.
    }
    console.log('add book...')
    await addBook({ variables: { title, author, published: Number(published), genres: genreList } })
  }

  const handleCompleted = (data) => {
    console.log(data)
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const handleError = (error) => {
    console.error('Apollo error:', error.message)
    console.error('GraphQL errors:', error.graphQLErrors)

    alert(`Error adding book: ${error.message}`)
  }

  const addGenre = () => {
    if (genre) {
      setGenres(genres.concat(genre))
      setGenre('')
    }
  }

  if (!show) {
    return null
  }
  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
