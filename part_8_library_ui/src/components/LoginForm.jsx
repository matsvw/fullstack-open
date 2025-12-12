import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client/react'
import queries from '../helpers/queries'

const LoginForm = ({ setToken }) => {
  const nav = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [login, result] = useMutation(queries.LOGIN, {
    onError: (error) => {
      console.log(error)
      alert(error.message)
    },
    onCompleted: (data) => {
      console.log('Success: ', data)
      //alert('User logged in successfully')
      setUsername('')
      setPassword('')
      nav('/')
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data, setToken])

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            autoComplete='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            autoComplete='current-password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm