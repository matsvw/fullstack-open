import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import queries from '../helpers/queries'


const Books = ({ show = true }) => {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [genreFilter, setGenreFilter] = useState('')

  const filteredBooks = useQuery(queries.FILTER_BOOKS, { variables: { author: undefined, genre: genreFilter ? genreFilter : undefined }, skip: !show })

  useEffect(() => {
    const setData = async () => {
      console.log('Set data')
      const allBooks = filteredBooks.data.allBooks
      //console.log('Books: ', allBooks)
      setBooks(allBooks)
      if (!genreFilter) {  // only reset genere list when getting all books
        const uniqueGenres = [...new Set(allBooks.flatMap(b => b.genres ? b.genres.filter(g => g.trim() != '') : []))];
        setGenres(uniqueGenres)
        console.log('Genres: ', uniqueGenres)
      }
    }

    if (!filteredBooks.loading && !filteredBooks.error) {
      setData()
    }

  }, [filteredBooks, genreFilter])

  if (!show) {
    return null
  }
  if (filteredBooks.loading) {
    return <div>loading...</div>
  }
  if (filteredBooks.error) {
    return <div>error loading data: {filteredBooks.error}</div>
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
          <button key={`bt_${g}`} onClick={() => setGenreFilter(g)} >{g}</button>
        ))}
        <button onClick={() => setGenreFilter('')} >all genres</button>
      </div>
    </div >
  )
}

export default Books
