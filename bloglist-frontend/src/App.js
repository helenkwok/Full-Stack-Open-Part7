import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Navigation from './components/Navigation'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import { setNotification } from './reducers/notificationReducer'
import { loggedUser, login } from './reducers/loginReducer'

const App = () => {
  const currentUser = useSelector(state => state.login)

  const dispatch = useDispatch()

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

  return (
    <div>
      {currentUser
        ?
        <>
          <Navigation />
          <Notification />
        </>
        :
        null
      }

      <Routes>
        <Route path="users">
          <Route path=":userId" element={currentUser? <User /> : <Navigate replace to="/login" />} />
          <Route path='' element={currentUser? <Users /> : <Navigate replace to="/login" />} />
        </Route>
        <Route path='login' element={currentUser?
          <Navigate replace to="/" />
          :
          <LoginForm handleLogin={handleLogin} />
        } />
        <Route path="/">
          <Route path="blogs/:blogId" element={currentUser? <Blog /> : <Navigate replace to="/login" />} />
          <Route path='' element={currentUser? <Blogs /> : <Navigate replace to="/login" />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
