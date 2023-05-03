import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../global/globalProvider'

const Login: React.FC = () => {
  const navigate = useNavigate()
  const auth = useAuth()

  const [searchParams] = useSearchParams()

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

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
          Username: <input name="username" type="text" value="tcruise" />
        </label>
        <label>
          Password: <input name="password" type="password" value="123" />
        </label>
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default Login
