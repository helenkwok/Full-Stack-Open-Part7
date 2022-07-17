import { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material'
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
          dispatch(setNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'success', 5))
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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>
                  {blog.author}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Blogs