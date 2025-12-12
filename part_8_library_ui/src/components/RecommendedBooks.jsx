import { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client/react'
import queries from '../helpers/queries'


const RecommendedBooks = ({ show = true }) => {
  const userData = useQuery(queries.ME, { skip: !show })
  const [genre, setGenre] = useState(null)
  const filteredBooks = useQuery(queries.FILTER_BOOKS, { variables: { author: undefined, genre: genre }, skip: !userData?.data?.me })

  useEffect(() => {
    const setData = async () => {
      console.log('Set data')
      setGenre(userData.data?.me.favoriteGenre)
    }

    if (!userData.loading && !userData.error) {
      setData()
    }

  }, [userData])

  if (!show) {
    return null
  }
  if (userData.loading || filteredBooks.loading) {
    return <div>loading...</div>
  }
  if (userData.error || filteredBooks.error) {
    return <div>error loading data: {userData.error ?? filteredBooks.error}</div>
  }

  //console.log(filteredBooks)
  const books = filteredBooks.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      {genre && <p>books in your favorite genre <b>{genre}</b></p>}
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
    </div >
  )
}

export default RecommendedBooks
