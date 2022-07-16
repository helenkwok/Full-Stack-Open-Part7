import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Togglable from './Togglable'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { initializeBlogs, addBlog, addLike, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const user = useSelector(state =>
    state.login
  )

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const blogs = useSelector(state =>
    state.blogs.slice().sort(
      (a, b) => b.likes - a.likes
    )
  )

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

  return (
    <div>
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
  )
}

export default Blogs