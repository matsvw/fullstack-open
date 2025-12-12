import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import queries from '../helpers/queries'


const Books = ({ show = true }) => {
  const result = useQuery(queries.ALL_BOOKS, { skip: !show })
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [genreFilter, setGenreFilter] = useState('')

  useEffect(() => {
    const setData = async () => {
      console.log('Set data')
      const allBooks = result.data.allBooks
      //console.log('Books: ', allBooks)
      setBooks(allBooks)
      const uniqueGenres = [...new Set(allBooks.flatMap(b => b.genres ? b.genres.filter(g => g.trim() != '') : []))];
      setGenres(uniqueGenres)
      console.log('Genres: ', uniqueGenres)
    }

    if (!result.loading && !result.error) {
      setData()
    }

  }, [result])

  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  if (result.error) {
    return <div>error loading data: {result.error}</div>
  }

  const filterGenre = (genre) => {
    // I guess this could also be done with an effect
    setGenreFilter(genre)
    const allBooks = result.data.allBooks
    if (!genre) {
      setBooks(allBooks)
    } else {
      setBooks(allBooks.filter(b => b.genres.find(g => g === genre)))
    }
  }

  return (
    <div>
      <h2>books</h2>
      {genreFilter && <p>in genre <b>{genreFilter}</b></p>}
      <table>
        <tbody>
          <tr>
            <th style={{ textAlign: 'left' }}>title</th>
            <th style={{ textAlign: 'left' }}>author</th>
            <th style={{ textAlign: 'left' }}>published</th>
            <th style={{ textAlign: 'left' }}>genres</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td style={{ paddingRight: '30px', maxWidth: '250px' }}>{b.title}</td>
              <td style={{ paddingRight: '30px' }}>{b.author.name}</td>
              <td style={{ paddingRight: '60px' }}>{b.published}</td>
              <td>{b.genres.join(',')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div>
        {genres.map(g => (
          <button key={`bt_${g}`} onClick={() => filterGenre(g)} >{g}</button>
        ))}
        <button onClick={() => filterGenre('')} >all genres</button>
      </div>
    </div >
  )
}

export default Books
