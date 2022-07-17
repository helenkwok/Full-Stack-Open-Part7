import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container } from '@mui/material'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blogs = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

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

  return (
    <Container>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <div key={blog.id} className="blog">
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      ))}
    </Container>
  )
}

export default Blogs