import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) =>
        setBlogs(blogs.slice().sort((a, b) => b.likes - a.likes))
      )
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
      const returnedBlog = await blogService.create(blogObject)
      console.log(returnedBlog)
      setBlogs(blogs.concat(returnedBlog))

      dispatch(setNotification(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'notification', 5))

    } catch (exception) {
      dispatch(setNotification('Failed to create new blog', 'error', 5))
    }
  }

  const addLike = async (likedBlogObject) => {
    try {
      const returnedBlog = await blogService.update(likedBlogObject)

      let blogsUpdated = [...blogs]

      blogsUpdated[
        blogsUpdated.findIndex((blog) => blog.id === returnedBlog.id)
      ].likes = returnedBlog.likes

      setBlogs(blogsUpdated.slice().sort((a, b) => b.likes - a.likes))
    } catch (exception) {
      dispatch(setNotification('Failed to update blog', 'error', 5))
    }
  }

  const removeBlog = async (removeBlog) => {
    if (
      window.confirm(`Remove blog ${removeBlog.title} by ${removeBlog.author}`)
    ) {
      try {
        await blogService.remove(removeBlog.id)

        setBlogs(blogs.filter((blog) => blog.id !== removeBlog.id))
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
            addLike={addLike}
            removeBlog={removeBlog}
          />
        ))}
      </div>
    </div>
  )
}

export default App
