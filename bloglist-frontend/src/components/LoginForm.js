import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Container,
  Typography,
  TextField,
  Button
} from '@mui/material'
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
    <>
      <Container>
        <Typography variant='h5'>log in to application</Typography>
      </Container>

      <Notification />

      <Container>
        <form onSubmit={loginInput}>
          <div>
            <TextField
              label='username'
              variant='filled'
              InputProps={{ ...username.input }}
            />
          </div>
          <div>
            <TextField
              label='password'
              variant='filled'
              InputProps={{ ...password.input }}
            />
          </div>
          <div>
            <Button
              type="submit" variant="contained">
                login
            </Button>
          </div>
        </form>
      </Container>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm
