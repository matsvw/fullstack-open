import { useState } from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {

  const [token, setToken] = useState(null)

  return (
    <div>
      <div>
        <Link to='/authors'>authors</Link>&nbsp;&nbsp;
        <Link to='/books'>books</Link>&nbsp;&nbsp;
        <Link to='/login'>login</Link>&nbsp;&nbsp;
        {token &&
          <Link to='/add'>add book</Link>
        }
        <br />
        <br />
      </div>

      <Routes>
        <Route path="/login" element={<LoginForm setToken={setToken} />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook token={token} />} />
        <Route path="/" element={<Authors />} />
      </Routes>
    </div>
  )
}

export default App
