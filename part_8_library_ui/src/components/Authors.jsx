//import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client/react'
import queries from '../helpers/queries'


const Authors = ({ show = true }) => {
  const result = useQuery(queries.ALL_AUTHORS, { skip: !show })

  if (!show) {
    return null
  }
  if (result.loading) {
    return <div>loading...</div>
  }
  if (result.error) {
    return <div>error loading data: {result.error}</div>
  }

  const authors = result.data.allAuthors

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
    </div>
  )
}

export default Authors