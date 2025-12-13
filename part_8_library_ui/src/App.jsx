import { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client/react'
import { Link, Routes, Route } from 'react-router-dom'
import queries from './helpers/queries'

import { bookAdded, authorAdded } from './helpers/cacheManager'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedBooks from './components/RecommendedBooks'

const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(localStorage.getItem('library-user-token')) //try to get from local storage by default

  const logout = async () => {
    setToken(null)
    localStorage.clear()
    await client.resetStore() // this needs to be awaited to prevent navigation before it has completed
  }

  useSubscription(queries.AUTHOR_ADDED, {
    onData: ({ data, client }) => {
      authorAdded(data, client)
    },
  })

  useSubscription(queries.BOOK_ADDED, {
    onData: ({ data, client }) => {
      bookAdded(data, client)
    },
  })

  return (
    <div>
      <div>
        <Link style={{ paddingRight: '10px' }} to='/authors'>authors</Link>
        <Link style={{ paddingRight: '10px' }} to='/books'>books</Link>
        {token && <Link style={{ paddingRight: '10px' }} to='/add'>add book</Link>}
        {token && <Link style={{ paddingRight: '10px' }} to='/recommendations'>recommendations</Link>}
        {!token && <Link style={{ paddingRight: '10px' }} to='/login'>login</Link>}
        {token && <Link style={{ paddingRight: '10px' }} to='/' onClick={logout}>logout</Link>}
        <br />
        <br />
      </div>

      <Routes>
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/authors" element={<Authors token={token} />} />
        <Route path="/books" element={<Books />} />
        <Route path="/recommendations" element={<RecommendedBooks />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/" element={<Authors />} />
      </Routes>
    </div>
  )
}

export default App
