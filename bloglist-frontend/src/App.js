import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { setNotification } from './reducers/notificationReducer'
import { loggedUser, login, logout } from './reducers/userReducer'
import { initializeBlogs, addBlog, addLike, removeBlog } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const user = useSelector(state =>
    state.user
  )

  const blogs = useSelector(state =>
    state.blogs.slice().sort(
      (a, b) => b.likes - a.likes
    )
  )

  useEffect(() => {
    dispatch(loggedUser())
    dispatch(initializeBlogs())
  }, [])

  const handleLogin = async (userObject) => {
    dispatch(login(userObject)).then(
      response => {
        if (response !== 'ok') {
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

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()

    dispatch(addBlog(blogObject)).then(
      response => {
        if (response === 'ok') {
          dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'notification', 5))
        } else throw response
      }
    ).catch (() => {
      dispatch(setNotification('Failed to create new blog', 'error', 5))
    })
  }

  const like = async (likedBlogObject) => {
    dispatch(addLike(likedBlogObject)).then(
      response => {
        if (response !== 'ok') {
          throw response
        }
      }
    ).catch (() => {
      dispatch(setNotification('Failed to update blog', 'error', 5))
    })
  }

  const remove = async (blog) => {
    if (
      window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    ) {
      dispatch(removeBlog(blog.id)).then(
        response => {
          if (response !== 'ok') {
            throw response
          }
        }
      ).catch (() => {
        dispatch(setNotification('Failed to remove blog', 'error', 5))
      })
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
