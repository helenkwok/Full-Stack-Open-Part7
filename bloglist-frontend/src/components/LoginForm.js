import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import Notification from './Notification'
import useField from '../hooks/useField'

const LoginForm = ({ handleLogin }) => {
  const navigate = useNavigate()
  const username = useField('text', 'username')
  const password = useField('password', 'password')

  const loginInput = (event) => {
    event.preventDefault()

    handleLogin({
      username: username.input.value,
      password: password.input.value,
    })

    username.reset()
    password.reset()
    navigate('/')
  }

  return (
    <div>
      <h2>log in to application</h2>

      <Notification />

      <form onSubmit={loginInput}>
        <div>
          username
          <input {...username.input} />
        </div>
        <div>
          password
          <input {...password.input} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
