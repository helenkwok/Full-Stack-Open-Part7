import { useSelector, useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
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
    <div>
      <h2>
        <span className="title">{blog.title}</span>
        <span> </span>
        <span className="author">{blog.author}</span>
      </h2>
      <a href={blog.url} alt={blog.url} className='url' target='_blank' rel='noreferrer'>
        {blog.url}
      </a>
      <div className="likes">
        <span>{blog.likes} likes</span>
        <button className="likeButton" onClick={() => like()}>
          like
        </button>
      </div>
      <div>added by {blog.user.name}</div>
      <button
        style={{
          display: loggedUser.name === blog.user.name ? '' : 'none',
        }}
        onClick={() => remove()}
      >
        remove
      </button>
      <div>
        <h3>comments</h3>
        <CommentForm createComment={createComment} />
        <ul>
          {blog.comments.length > 0?
            blog.comments.map(comment =>
              <li key={comment}>{comment}</li>
            )
            :
            <div>no comment</div>
          }
        </ul>
      </div>
    </div>
  )
}

export default Blog