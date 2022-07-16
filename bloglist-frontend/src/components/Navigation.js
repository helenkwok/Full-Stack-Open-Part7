import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { loggedUser, logout } from '../reducers/loginReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/userReducer'

const Navigation = () => {
  const currentUser = useSelector(state => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loggedUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const handleLogout = async () => {
    dispatch(logout())
  }
  return (
    <div>
      <div className='navBar'>
        <Link className='nav' to="/">blogs</Link>
        <Link className='nav' to="/users">users</Link>
        <span className='nav'>{currentUser.name} logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>
      <h2>blog app</h2>
    </div>
  )
}

export default Navigation