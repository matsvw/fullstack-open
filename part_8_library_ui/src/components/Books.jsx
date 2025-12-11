import { useQuery } from '@apollo/client/react'
import queries from '../helpers/queries'


const Books = ({ show = true }) => {
  const result = useQuery(queries.ALL_BOOKS, { skip: !show })

  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  if (result.error) {
    return <div>error loading data: {result.error}</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
