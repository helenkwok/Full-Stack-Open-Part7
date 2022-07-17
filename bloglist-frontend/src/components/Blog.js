import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { Container, Button, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import { setNotification } from '../reducers/notificationReducer'
import { addLike, removeBlog, addComment } from '../reducers/blogReducer'
import CommentForm from './CommentForm'

const Blog = () => {
  const dispatch = useDispatch()

  const loggedUser = useSelector(state =>
    state.login
  )
  const blogs = useSelector(state => state.blogs )

  const match = useMatch('/blogs/:id')

  const blog = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  if (!blog) return null

  const like = async () => {
    dispatch(addLike(blog)).then(
      response => {
        if (response !== 'ok') {
          throw response
        }
      }
    ).catch (() => {
      dispatch(setNotification('Failed to update blog', 'error', 5))
    })
  }

  const remove = async () => {
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

  const createComment = async (comment) => {
    dispatch(addComment(comment, blog)).then(
      response => {
        if (response !== 'ok') {
          throw response
        }
      }
    ).catch ((error) => {
      console.log(error)
      dispatch(setNotification('Failed to add comment', 'error', 5))
    })
  }

  return (
    <Container>
      <Typography variant='h6'>
        <span className="title">{blog.title}</span>
        <span> </span>
        <span className="author">{blog.author}</span>
      </Typography>
      <a href={blog.url} alt={blog.url} className='url' target='_blank' rel='noreferrer'>
        {blog.url}
      </a>
      <div className="likes">
        <Typography>
          {blog.likes} likes
          <Button variant='contained' className="likeButton" onClick={() => like()}>
            like
          </Button>
        </Typography>
      </div>
      <Typography>added by {blog.user.name}</Typography>
      <Button
        variant='contained'
        color="error"
        style={{
          display: loggedUser.name === blog.user.name ? '' : 'none',
        }}
        onClick={() => remove()}
      >
        remove
      </Button>
      <div>
        <Typography variant='h6'>comments</Typography>
        <CommentForm createComment={createComment} />
        <List>
          {blog.comments.length > 0?
            blog.comments.map(comment =>
              <ListItem key={comment}>
                <ListItemIcon>
                  <CommentIcon />
                </ListItemIcon>
                <ListItemText>
                  {comment}
                </ListItemText>
              </ListItem>
            )
            :
            <Typography>no comment</Typography>
          }
        </List>
      </div>
    </Container>
  )
}

export default Blog