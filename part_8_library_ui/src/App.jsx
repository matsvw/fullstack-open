import { Link, Routes, Route } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {

  return (
    <div>
      <div>
        <Link to='/authors'>authors</Link>&nbsp;&nbsp;
        <Link to='/books'>books</Link>&nbsp;&nbsp;
        <Link to='/add'>add book</Link>
        <br />
        <br />
      </div>

      <Routes>
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
        <Route path="/" element={<Authors />} />
      </Routes>
    </div>
  )
}

export default App
