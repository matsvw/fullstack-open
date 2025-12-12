import { useState } from 'react'
import { useApolloClient } from '@apollo/client/react'
import { Link, Routes, Route } from 'react-router-dom'


import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import RecommendedBooks from './components/RecommendedBooks'

const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(localStorage.getItem('library-user-token')) //try to get from local storage by default

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <Link to='/authors'>authors</Link>&nbsp;&nbsp;
        <Link to='/books'>books</Link>&nbsp;&nbsp;
        {token && <Link to='/add'>add book</Link>}&nbsp;&nbsp;
        {token && <Link to='/recommendations'>recommendations</Link>}&nbsp;&nbsp;
        {!token && <Link to='/login'>login</Link>}&nbsp;&nbsp;
        {token && <Link to='/' onClick={logout}>logout</Link>}
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
