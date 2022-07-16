import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import { setNotification } from './reducers/notificationReducer'
import { loggedUser, login, logout } from './reducers/loginReducer'
import Users from './components/Users'

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector(state =>
    state.login
  )

  useEffect(() => {
    dispatch(loggedUser())
  }, [])

  const handleLogin = async (userObject) => {
    dispatch(login(userObject)).then(
      response => {
        if (response === 'Unauthorized') {
          throw response
        }
      }
    ).catch (() => {
      dispatch(setNotification('wrong username or password', 'error', 5))
    })
  }

  const handleLogout = async () => {
    dispatch(logout())
  }

  if (user === null) {
    return (
      <LoginForm
        handleLogin={handleLogin}
      />
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <Routes>
        <Route path="/users" element={<Users />} />
        <Route path="/" element={<Blogs />} />
      </Routes>
    </div>
  )
}

export default App
