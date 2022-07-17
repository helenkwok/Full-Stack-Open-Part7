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
          <input {...comment.input} />
        </div>
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

export default CommentForm