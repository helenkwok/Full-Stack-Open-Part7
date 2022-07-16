import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import { setNotification } from './reducers/notificationReducer'
import { loggedUser, login, logout } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

const App = () => {
  const currentUser = useSelector(state => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loggedUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
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

  if (currentUser === null) {
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
        {currentUser.name} logged in
      </p>
      <button onClick={handleLogout}>logout</button>

      <Routes>
        <Route path="users">
          <Route path=":userId" element={<User />} />
          <Route path='' element={<Users />} />
        </Route>
        <Route path="/">
          <Route path="blogs/:blogId" element={<Blog />} />
          <Route path='' element={<Blogs />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
