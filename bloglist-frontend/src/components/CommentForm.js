import {
  Button,
  TextField
} from '@mui/material'
import useField from '../hooks/useField'

const CommentForm = ({ createComment }) => {
  const comment = useField('text', 'comment')

  const handleComment = (event) => {
    event.preventDefault()
    createComment(comment.input.value)
    comment.reset()
  }

  return (
    <div>
      <form onSubmit={handleComment}>
        <div>
          <TextField
            label='comment'
            variant='filled'
            InputProps={{ ...comment.input }}
          />
        </div>
        <Button variant='contained' type="submit">add comment</Button>
      </form>
    </div>
  )
}

export default CommentForm