import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, addBlog, addLike, removeBlog } from './reducers/blogReducer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const blogs = useSelector(state =>
    state.blogs.slice().sort(
      (a, b) => b.likes - a.likes
    )
  )

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      dispatch(setNotification('wrong username or password', 'error', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      dispatch(addBlog(blogObject))

      dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'notification', 5))
    } catch (exception) {
      dispatch(setNotification('Failed to create new blog', 'error', 5))
    }
  }

  const like = async (likedBlogObject) => {
    try {
      dispatch(addLike(likedBlogObject))
    } catch (exception) {
      dispatch(setNotification('Failed to update blog', 'error', 5))
    }
  }

  const remove = async (blog) => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    ) {
      try {
        dispatch(removeBlog(blog.id))
        //await blogService.remove(removeBlog.id)

      } catch (exception) {
        dispatch(setNotification('Failed to remove blog', 'error', 5))
      }
    }
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
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <Togglable buttonLabel="new note" ref={blogFormRef}>
          <BlogForm createBlog={createBlog} />
        </Togglable>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={user}
            like={like}
            remove={remove}
          />
        ))}
      </div>
    </div>
  )
}

export default App
