import { useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../global/globalProvider'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const [searchParams] = useSearchParams()

  const [username, setUsername] = useState('tcruise')
  const [password, setPassword] = useState('123456')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    auth.signin?.({ username, password }, () => {
      const from = searchParams.get('from')
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.
      navigate(from ?? '', { replace: true })
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password:
          <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login
